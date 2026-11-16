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
    if (save) { try { localStorage.setItem("lang", lang); } catch (x) {} }
  }
  bEn.addEventListener("click", function () { setLang("en", true); });
  bFr.addEventListener("click", function () { setLang("fr", true); });

  // Progress bar
  var bar = document.getElementById("progress");
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // Hero trace animation (steps are re-queried each tick so re-rendering is safe)
  var step = 0;
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(function () {
      var steps = document.querySelectorAll("#trace li");
      if (!steps.length) return;
      steps.forEach(function (s) { s.classList.remove("on"); });
      step = (step + 1) % steps.length;
      steps[step].classList.add("on");
    }, 1500);
  }

  // First render, in the saved language if any
  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (x) {}
  setLang(saved === "fr" ? "fr" : "en", false);
  onScroll();
})();
