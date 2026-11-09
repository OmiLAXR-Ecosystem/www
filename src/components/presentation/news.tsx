import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {faChevronLeft, faChevronRight, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Marked} from "marked";
import type {NewsItem} from "../../lib/discordNews";
import Icon from "../Icon";
import "./news.scss";

interface NewsPresentationProps {
  items: NewsItem[];
}

const SLIDER_ID = "news-slider";

const markdown = new Marked({
  breaks: true, // Discord keeps single line breaks
  walkTokens(token) {
    if (token.type === "link" && !/^(https?:|mailto:)/i.test(token.href))
      token.href = "#";
  },
});

function renderBody(body: string): string {
  // Escaping "<" keeps HTML written in a message from ending up in the page;
  // "-# " marks small subtext in Discord and is dropped
  return markdown.parse(body.replace(/</g, "&lt;").replace(/^-# /gm, ""), {async: false});
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric"});
}

function dialogId(id: string): string {
  return `news-dialog-${id}`;
}

function SliderButton({direction}: {direction: "prev" | "next"}) {
  const label = direction === "prev" ? "Newer news" : "Older news";
  return (
    <button type="button" data-slider-button={direction} aria-controls={SLIDER_ID} aria-label={label} title={label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-blue transition-opacity hover:bg-blue-gray-50 disabled:opacity-30">
      <Icon icon={direction === "prev" ? faChevronLeft : faChevronRight}/>
    </button>
  );
}

function NewsCard({id, date, author, title, excerpt}: NewsItem) {
  return (
    <article className="relative flex w-[85%] shrink-0 snap-start flex-col rounded-lg border border-gray-200 p-6 shadow-sm sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]">
      <p className="mb-2 text-sm text-gray-600">
        <time dateTime={date}>{formatDate(date)}</time> · {author}
      </p>
      <h3 className="mb-3 text-xl font-semibold text-gray-900 break-words">
        {title}
      </h3>
      {excerpt && (
        <p className="line-clamp-5 whitespace-pre-line break-words text-gray-700">
          {excerpt}
        </p>
      )}
      {/* The ::after overlay makes the whole card open the dialog */}
      <button type="button" data-dialog-open={dialogId(id)}
              className="mt-auto self-start pt-4 font-bold text-blue after:absolute after:inset-0 after:rounded-lg">
        Read more
      </button>
    </article>
  );
}

function NewsDialog({id, date, author, title, body}: NewsItem) {
  return (
    <dialog id={dialogId(id)} aria-labelledby={`${dialogId(id)}-title`}
            className="news-dialog m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-lg p-0 shadow-xl backdrop:bg-black/50">
      <div className="p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-sm text-gray-600">
              <time dateTime={date}>{formatDate(date)}</time> · {author}
            </p>
            <h3 id={`${dialogId(id)}-title`} className="text-2xl font-bold text-gray-900 break-words">
              {title}
            </h3>
          </div>
          <form method="dialog">
            <button aria-label="Close" title="Close"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl text-gray-700 hover:bg-blue-gray-50">
              <Icon icon={faXmark}/>
            </button>
          </form>
        </div>
        <div className="news-body text-gray-800" dangerouslySetInnerHTML={{__html: renderBody(body)}}/>
      </div>
    </dialog>
  );
}

export default function NewsPresentation({items}: NewsPresentationProps) {
  if (items.length === 0) {
    // Production builds leave the section out; make dev shows where it would be
    return import.meta.env.DEV ? (
      <section className="px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-0">
        <p className="container mx-auto rounded-lg border border-dashed border-gray-400 p-6 text-gray-600">
          Discord news would appear here. Set <code>DISCORD_BOT_TOKEN</code> and <code>DISCORD_CHANNEL_ID</code> in <code>.env</code> and restart <code>make dev</code>.
        </p>
      </section>
    ) : null;
  }

  return (
    // No top padding on lg: the header above already ends with a large bottom margin
    <section className="bg-white px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-0">
      <div className="container mx-auto">
        <div className="mb-10 flex flex-wrap items-end justify-center gap-6 text-center lg:justify-between lg:text-left">
          <div>
            <p className="font-bold text-lg mb-5 text-blue">
              News from our Discord
            </p>
            <h2 className="leading-tight text-gray-900 text-3xl font-bold">
              What's new in the ecosystem
            </h2>
          </div>
          {/* Shown by interactions.ts when the cards overflow; the wrapper has no display class that would beat [hidden] */}
          <div data-slider-buttons hidden>
            <div className="flex gap-2">
              <SliderButton direction="prev"/>
              <SliderButton direction="next"/>
            </div>
          </div>
        </div>
        {/* Newest first; older posts are further to the right */}
        <div id={SLIDER_ID} data-slider
             className="news-slider -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto px-4 pb-4">
          {items.map(item => <NewsCard key={item.id} {...item}/>)}
        </div>
        {items.map(item => <NewsDialog key={item.id} {...item}/>)}
        <div className="mt-6 flex justify-center lg:justify-start">
          <a href="https://discord.gg/u4gtXTBEx3" target="_blank" rel="noreferrer"
             className="flex items-center gap-2 rounded bg-blue px-4 py-2.5 font-bold text-white">
            <Icon icon={faDiscord}/> Join the discussion on Discord
          </a>
        </div>
      </div>
    </section>
  );
}
