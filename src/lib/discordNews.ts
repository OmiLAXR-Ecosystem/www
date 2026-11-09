// Reads the announcements of a Discord channel at build time.
// The bot token never reaches the browser: the posts are rendered into static HTML.
// Without DISCORD_BOT_TOKEN / DISCORD_CHANNEL_ID (e.g. local builds) or on API errors,
// an empty list is returned and the news section is not rendered.

export interface NewsItem {
  id: string;
  date: string; // ISO 8601
  author: string;
  title: string;
  excerpt: string; // plain text for the card
  body: string; // Discord markdown for the dialog, without the title line
}

interface DiscordUser {
  id: string;
  username: string;
  global_name?: string | null;
}

interface DiscordMessage {
  id: string;
  type: number;
  content: string;
  timestamp: string;
  author: DiscordUser;
  mentions?: DiscordUser[];
}

// Normal messages and replies; skips joins, pins, thread notices and other system messages
const CONTENT_MESSAGE_TYPES = [0, 19];

// Discord returns at most 100 messages per request
const MESSAGE_LIMIT = 100;

function env(name: string): string | undefined {
  // import.meta.env covers a local .env file, process.env the CI environment
  return import.meta.env[name] ?? process.env[name];
}

function displayName(user: DiscordUser): string {
  return user.global_name || user.username;
}

// Replaces Discord-only syntax (mentions, custom emoji, timestamps) with readable text
function resolveDiscordSyntax(content: string, mentions: DiscordUser[]): string {
  return content
    .replace(/<@!?(\d+)>/g, (_, id) => {
      const user = mentions.find(u => u.id === id);
      return user ? `@${displayName(user)}` : "";
    })
    .replace(/<@&\d+>/g, "")
    .replace(/<#\d+>/g, "#channel")
    .replace(/<a?:\w+:\d+>/g, "")
    .replace(/<t:(\d+)(:\w)?>/g, (_, s) => new Date(Number(s) * 1000).toLocaleDateString("en-GB"))
    .replace(/@(everyone|here)\b/g, "")
    // <https://…> only suppresses the link preview in Discord
    .replace(/<(https?:\/\/[^>\s]+)>/g, "$1");
}

// Removes markdown so the text fits into a card
function toPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\s*(#{1,3}|-#|>{1,3})\s+/gm, "")
    .replace(/(\*\*|__|~~|\|\||\*|`)/g, "")
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "")
    .join("\n");
}

function toNewsItem(m: DiscordMessage): NewsItem | null {
  const lines = resolveDiscordSyntax(m.content, m.mentions ?? []).split("\n");
  const nextLine = () => {
    while (lines.length > 0 && toPlainText(lines[0]) === "")
      lines.shift();
    return lines.shift();
  };

  let title = nextLine();
  // Skip a greeting line such as "Hello everyone," if something follows
  if (title !== undefined && /^(hi|hey|hello|dear)\b.*,$/i.test(toPlainText(title))) {
    title = nextLine() ?? title;
  }
  if (title === undefined) {
    return null;
  }

  const body = lines.join("\n").trim();
  return {
    id: m.id,
    date: m.timestamp,
    author: displayName(m.author),
    title: toPlainText(title),
    excerpt: toPlainText(body),
    body,
  };
}

// Newest first
export async function fetchDiscordNews(): Promise<NewsItem[]> {
  const token = env("DISCORD_BOT_TOKEN");
  const channelId = env("DISCORD_CHANNEL_ID");
  if (!token || !channelId) {
    console.warn("[discord-news] DISCORD_BOT_TOKEN or DISCORD_CHANNEL_ID not set, skipping news");
    return [];
  }

  try {
    const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages?limit=${MESSAGE_LIMIT}`, {
      headers: { Authorization: `Bot ${token}` },
    });
    if (!response.ok) {
      console.warn(`[discord-news] Discord API returned ${response.status}: ${await response.text()}`);
      return [];
    }
    const messages: DiscordMessage[] = await response.json();
    return messages
      .filter(m => CONTENT_MESSAGE_TYPES.includes(m.type))
      .map(toNewsItem)
      .filter(item => item !== null);
  } catch (error) {
    console.warn("[discord-news] Fetching news failed:", error);
    return [];
  }
}
