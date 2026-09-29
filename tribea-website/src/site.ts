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

// 6. Pointer ring and button pull. Only for a fine pointer that can hover and
//    when no reduced motion is requested. The native cursor stays visible, the
//    ring trails it, and the loop sleeps once the ring has caught up.
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
if (finePointer && !reduce) {
  const ring = document.createElement("div");
  ring.className = "pointer-ring";
  ring.setAttribute("aria-hidden", "true");
  document.body.append(ring);

  let x = -100, y = -100, rx = -100, ry = -100, running = false;
  const step = () => {
    rx += (x - rx) * 0.2;
    ry += (y - ry) * 0.2;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    if (Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1) requestAnimationFrame(step);
    else running = false;
  };

  const LINKS = "a, summary, label, input, textarea, select, [data-focus-item], [role='button']";
  document.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    x = e.clientX;
    y = e.clientY;
    ring.classList.add("is-visible");
    const target = e.target as Element;
    const onButton = !!target.closest(".button");
    ring.classList.toggle("is-button", onButton);
    ring.classList.toggle("is-link", !onButton && !!target.closest(LINKS));
    if (!running) {
      running = true;
      requestAnimationFrame(step);
    }
  }, { passive: true });
  document.addEventListener("pointerdown", () => ring.classList.add("is-down"));
  document.addEventListener("pointerup", () => ring.classList.remove("is-down"));
  document.documentElement.addEventListener("pointerleave", () => ring.classList.remove("is-visible"));

  // While a text field has focus the ring steps away, so it never sits over
  // what is being typed. It comes back with the next mouse move after the
  // field is left.
  const TYPING = "input:not([type='checkbox']):not([type='radio']):not([type='submit']), textarea, select, [contenteditable]";
  document.addEventListener("focusin", (e) => {
    if ((e.target as Element).matches?.(TYPING)) ring.classList.add("is-typing");
  });
  document.addEventListener("focusout", (e) => {
    if ((e.target as Element).matches?.(TYPING)) ring.classList.remove("is-typing");
  });

  // Buttons lean up to 6px towards the pointer and settle back when it leaves.
  document.querySelectorAll<HTMLElement>(".button").forEach((button) => {
    button.addEventListener("pointermove", (e) => {
      const r = button.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      button.style.setProperty("--pull-x", `${(dx * 6).toFixed(1)}px`);
      button.style.setProperty("--pull-y", `${(dy * 4).toFixed(1)}px`);
    });
    button.addEventListener("pointerleave", () => {
      button.style.removeProperty("--pull-x");
      button.style.removeProperty("--pull-y");
    });
  });
}
