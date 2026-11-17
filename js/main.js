/* =====================================================================
   MAIN — behaviour: language toggle, progress bar, nav highlight,
   hero trace animation. No content lives here.
   ===================================================================== */
(function () {
  var bEn = document.getElementById("lang-en"), bFr = document.getElementById("lang-fr");
  var observer = null;

  function highlightNav() {
    if (observer) observer.disconnect();
    if (!("IntersectionObserver" in window)) return;
    var links = [].slice.call(document.querySelectorAll("#nav a"));
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("section[id]").forEach(function (s) { observer.observe(s); });
  }

  // Scroll reveals. Blocks fade up once as they enter; groups stagger.
  // On a language switch (re-render) everything already seen shows instantly.
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealer = null, firstRender = true;
  var REVEAL = ".sec-head, .case-top, .case-body, .case-toggle, .facts, .card, .row, .skills > div, .edu > div, .contact h2, .contact p, .links a, .run";
  function setupReveal() {
    if (revealer) revealer.disconnect();
    if (reduce || !("IntersectionObserver" in window)) return;
    var root = document.documentElement;
    if (!firstRender) root.classList.add("instant");
    revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); revealer.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(REVEAL).forEach(function (el) {
      var sib = el.parentElement ? [].indexOf.call(el.parentElement.children, el) : 0;
      if (el.matches(".card, .links a, .edu > div, .skills > div")) el.style.setProperty("--d", Math.min(sib, 5) * 0.08 + "s");
      el.classList.add("rv");
      // on re-render, anything above the fold of the current scroll is shown at once
      var r = el.getBoundingClientRect(), visible = r.top < window.innerHeight && r.bottom > 0;
      if (!firstRender && r.top < window.innerHeight) el.classList.add("in");
      else if (visible) requestAnimationFrame(function () { el.classList.add("in"); }); // on screen at load: animate now
      else revealer.observe(el);
    });
    if (!firstRender) requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.remove("instant"); }); });
    firstRender = false;
  }

  function setLang(lang, save) {
    window.PortfolioRender.render(lang);
    setupReveal();
    bEn.setAttribute("aria-pressed", lang === "en");
    bFr.setAttribute("aria-pressed", lang === "fr");
    highlightNav();
    if (typeof showStep === "function") showStep(step);
    if (save) { try { localStorage.setItem("lang", lang); } catch (x) {} }
  }
  bEn.addEventListener("click", function () { setLang("en", true); });
  bFr.addEventListener("click", function () { setLang("fr", true); });

  // "See the technical work" buttons (event delegation, survives re-renders)
  document.getElementById("top").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-toggle]");
    if (btn) window.PortfolioRender.toggleTech(btn.getAttribute("data-toggle"));
  });

  // Progress bar
  var bar = document.getElementById("progress");
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // Hero agent graph: the pulse walks the steps on its own until the visitor
  // clicks a node, then it stays where they put it. Elements are re-queried
  // every time so a language switch (full re-render) is safe.
  var step = 0, auto = !reduce, hovering = false;

  function showStep(i) {
    var track = document.getElementById("track");
    if (!track) return;
    var items = track.querySelectorAll("li");
    if (!items.length) return;
    step = (i + items.length) % items.length;
    items.forEach(function (li, k) {
      li.classList.toggle("on", k === step);
      li.classList.toggle("done", k < step);
      li.querySelector("button").setAttribute("aria-pressed", k === step);
    });
    var li = items[step];
    track.style.setProperty("--at", step);
    track.style.setProperty("--lane", li.style.getPropertyValue("--lane"));
    var btn = li.querySelector("button"), cap = document.getElementById("run-caption");
    if (cap) cap.innerHTML = "<b>" + btn.firstChild.textContent + "</b> " + btn.querySelector(".v").innerHTML;
  }

  setInterval(function () { if (auto && !hovering && !document.hidden) showStep(step + 1); }, 2200);

  document.getElementById("top").addEventListener("click", function (e) {
    var b = e.target.closest("[data-step]");
    if (!b) return;
    auto = false;
    showStep(+b.getAttribute("data-step"));
  });
  document.getElementById("top").addEventListener("mouseover", function (e) { hovering = !!e.target.closest(".run"); });

  // First render, in the saved language if any
  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (x) {}
  // A deep link (/#coachin) is resolved before the page is built and before the
  // web fonts change the layout, so jump again once everything has settled.
  function jumpToHash() {
    var id = location.hash.slice(1), el = id && document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  }
  setLang(saved === "fr" ? "fr" : "en", false);
  onScroll();
  if (location.hash) {
    jumpToHash();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(jumpToHash);
  }
})();
