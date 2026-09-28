// Small interaction layer, no library. Every effect is skipped when the
// visitor's device asks for reduced motion, and the page works without it.
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 1. Language switch: the line under the current code follows the pointer.
document.querySelectorAll<HTMLElement>("[data-lang-switch]").forEach((sw) => {
  const line = sw.querySelector<HTMLElement>(".lang-indicator");
  const links = [...sw.querySelectorAll<HTMLAnchorElement>("a")];
  const current = links.find((a) => a.getAttribute("aria-current")) ?? links[0];
  if (!line || !current) return;
  const place = (a: HTMLElement) => {
    const li = a.parentElement as HTMLElement;
    line.style.transform = `translateX(${li.offsetLeft}px)`;
    line.style.width = `${li.offsetWidth}px`;
  };
  place(current);
  sw.classList.add("is-live");
  links.forEach((a) => {
    a.addEventListener("pointerenter", () => place(a));
    a.addEventListener("focus", () => place(a));
  });
  sw.addEventListener("pointerleave", () => place(current));
  sw.addEventListener("focusout", () => place(current));
});

// 2. Header: tightens once the page scrolls.
const header = document.querySelector<HTMLElement>(".site-header");
if (header) {
  const onScroll = () => header.classList.toggle("is-compact", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// 3. Services: open and close with a height transition, one at a time.
function collapse(item: HTMLDetailsElement) {
  const body = item.querySelector<HTMLElement>(".service-body");
  if (!body) {
    item.open = false;
    return;
  }
  const anim = body.animate(
    [
      { height: `${body.scrollHeight}px`, opacity: 1 },
      { height: "0px", opacity: 0 },
    ],
    { duration: 260, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
  );
  anim.onfinish = () => {
    item.open = false;
  };
}

if (!reduce) {
  document.querySelectorAll<HTMLDetailsElement>("details.service").forEach((item) => {
    const summary = item.querySelector("summary");
    const body = item.querySelector<HTMLElement>(".service-body");
    if (!summary || !body) return;
    summary.addEventListener("click", (event) => {
      event.preventDefault();
      if (item.open) {
        collapse(item);
        return;
      }
      document.querySelectorAll<HTMLDetailsElement>("details.service[open]").forEach((other) => {
        if (other !== item) collapse(other);
      });
      item.open = true;
      body.animate(
        [
          { height: "0px", opacity: 0 },
          { height: `${body.scrollHeight}px`, opacity: 1 },
        ],
        { duration: 320, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
      );
    });
  });
}

// 5. Focus groups: selecting an item brings it forward and sets the others back
//    in Blue Slate, until the same item is selected again, Escape is pressed or
//    the visitor clicks elsewhere.
document.querySelectorAll<HTMLElement>("[data-focus-group]").forEach((group) => {
  const items = [...group.querySelectorAll<HTMLElement>("[data-focus-item]")];
  const clear = () => {
    group.classList.remove("has-focus");
    items.forEach((i) => i.removeAttribute("data-focused"));
  };
  const select = (item: HTMLElement) => {
    const on = item.hasAttribute("data-focused");
    clear();
    if (!on) {
      group.classList.add("has-focus");
      item.setAttribute("data-focused", "");
    }
  };
  items.forEach((item) => {
    item.addEventListener("click", () => select(item));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        select(item);
      }
    });
  });
  document.addEventListener("keydown", (e) => e.key === "Escape" && clear());
  document.addEventListener("click", (e) => {
    if (!group.contains(e.target as Node)) clear();
  });
});
