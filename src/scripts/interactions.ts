// The site's React components are rendered to static HTML and never hydrated, so no React runtime
// is shipped to the browser. The few interactive parts mark themselves with data-* attributes and
// are wired up here.
import type {AnimatingTextEntry} from "../components/AnimatingText";

// Tailwind's sm breakpoint (tailwind.config.js); the inline nav list replaces the mobile menu from here on
const SM_BREAKPOINT = 540;

function initNavbar() {
    const nav = document.querySelector<HTMLElement>("[data-navbar]");
    const toggle = nav?.querySelector<HTMLButtonElement>("[data-menu-toggle]");
    const menu = toggle && document.getElementById(toggle.getAttribute("aria-controls") ?? "");
    if (!nav || !toggle || !menu)
        return;

    const setMenuOpen = (open: boolean) => {
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        toggle.querySelector('[data-menu-icon="open"]')?.toggleAttribute("hidden", open);
        toggle.querySelector('[data-menu-icon="close"]')?.toggleAttribute("hidden", !open);
        menu.hidden = !open;
    };

    const updateBorder = () => {
        const scrolled = window.scrollY > 0;
        nav.classList.toggle("border-b", scrolled);
        nav.classList.toggle("border-gray-300", scrolled);
        nav.classList.toggle("shadow-none", scrolled);
    };

    toggle.addEventListener("click", () => setMenuOpen(menu.hidden));
    window.addEventListener("resize", () => window.innerWidth >= SM_BREAKPOINT && setMenuOpen(false));
    window.addEventListener("keydown", e => e.key === "Escape" && setMenuOpen(false));
    window.addEventListener("scroll", updateBorder, {passive: true});
    updateBorder();
}

function selectTab(tab: HTMLElement) {
    const container = tab.closest<HTMLElement>("[data-tabs]");
    if (!container)
        return;

    // :scope keeps tabs nested inside a panel out of it
    for (const other of container.querySelectorAll<HTMLElement>(":scope > .tabs > [role=tab]")) {
        other.setAttribute("aria-selected", String(other === tab));
        other.classList.toggle("active", other === tab);
    }
    for (const panel of container.querySelectorAll<HTMLElement>(":scope > .tab-contents > [role=tabpanel]"))
        panel.hidden = panel.dataset.tabPanel !== tab.dataset.tab;
}

function copyToClipboard(button: HTMLElement) {
    navigator.clipboard.writeText(button.dataset.copy ?? "");
    alert("Copied to clipboard!");
}

function filterTable(input: HTMLInputElement) {
    const table = input.closest<HTMLElement>("[data-table]");
    if (!table)
        return;

    const query = input.value.trim().toLowerCase();
    let visible = 0;
    for (const row of table.querySelectorAll<HTMLElement>("[data-table-row]")) {
        const match = row.textContent!.toLowerCase().includes(query);
        row.hidden = !match;
        if (match)
            visible++;
    }
    table.querySelector<HTMLElement>("[data-table-empty]")!.hidden = visible > 0;
}

// Types a word letter by letter, waits, deletes it again and continues with the next one.
function initAnimatingText(root: HTMLElement) {
    const items: AnimatingTextEntry[] = JSON.parse(root.dataset.animatingText!);
    const container = root.querySelector<HTMLElement>(".console-container")!;
    const text = root.querySelector<HTMLElement>(".animating-text-text")!;
    const underscoreColor = root.dataset.underscoreColor;
    const defaultColor = "#fff";

    const applyStyle = (item: AnimatingTextEntry) => {
        const color = item.color ?? defaultColor;
        text.style.color = color;
        container.style.color = underscoreColor ?? color;
        text.style.webkitTextStroke = container.style.webkitTextStroke = item.stroke ?? "";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        text.textContent = items[0].word;
        return;
    }

    let letterCount = 1;
    let x = 1;
    let waiting = false;
    let wait = 0;
    let index = 0;

    window.setInterval(() => {
        const word = items[index].word;
        text.textContent = word.substring(0, letterCount);

        if (waiting)
            wait += 100;
        else
            letterCount += x;

        if (letterCount === 0) {
            waiting = true;

            if (wait >= 1000) {
                index = (index + 1) % items.length;
                applyStyle(items[index]);

                x = 1;
                letterCount += x;
                wait = 0;
                waiting = false;
            }
        } else if (letterCount === word.length + 1) {
            waiting = true;

            if (wait >= 1000) {
                x = -1;
                letterCount += x;
                waiting = false;
                wait = 0;
            }
        }
    }, 100);
}

document.addEventListener("click", e => {
    const target = e.target as Element;

    const tab = target.closest<HTMLElement>("[data-tabs] [role=tab]");
    if (tab)
        selectTab(tab);

    const copyButton = target.closest<HTMLElement>("[data-copy]");
    if (copyButton)
        copyToClipboard(copyButton);
});

document.addEventListener("input", e => {
    const target = e.target as Element;
    if (target instanceof HTMLInputElement && target.matches("[data-table-search]"))
        filterTable(target);
});

initNavbar();
document.querySelectorAll<HTMLElement>("[data-animating-text]").forEach(initAnimatingText);
