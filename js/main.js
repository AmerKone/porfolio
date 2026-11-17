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

  function setLang(lang, save) {
    window.PortfolioRender.render(lang);
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
  var step = 0, auto = !window.matchMedia("(prefers-reduced-motion: reduce)").matches, hovering = false;

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
  setLang(saved === "fr" ? "fr" : "en", false);
  onScroll();
})();
