/* =====================================================================
   RENDER — builds the page from the data files in /data.
   You should not need to edit this file to change content.
   ===================================================================== */
(function () {
  var D = window.PORTFOLIO;
  var lang = "en";

  // Fixed interface strings (not content).
  var UI = {
    simple: { en: "In short", fr: "En bref" },
    showTech: { en: "See the technical work", fr: "Voir le travail technique" },
    hideTech: { en: "Hide the technical work", fr: "Masquer le travail technique" },
    built: { en: "What I built", fr: "Ce que j'ai construit" },
    architecture: { en: "Architecture", fr: "Architecture" },
    stack: { en: "Stack, and why each piece is there", fr: "La stack, et pourquoi chaque brique est là" }
  };

  // Ids of case studies whose technical block is open (kept across language switches).
  var openCases = {};

  // Pick the right language from a string or an { en, fr } object.
  function t(x) {
    if (x == null) return "";
    if (typeof x === "string") return x;
    return x[lang] || x.en || "";
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* ---------- small building blocks ---------- */

  function legend(items) {
    if (!items || !items.length) return "";
    return '<div class="legend">' + items.map(function (l) {
      return '<span><i style="background:var(--' + l.color + ')"></i>' + t(l.text) + "</span>";
    }).join("") + "</div>";
  }

  var diagrams = []; // diagrams in DOM order, used to translate SVG labels after insertion

  function diagram(d) {
    diagrams.push(d);
    return '<div class="label">' + t(UI.architecture) + "</div>" +
      '<div class="diagram"><svg viewBox="' + d.viewBox + '" role="img" aria-label="' + t(d.aria) + '">' +
      d.svg + "</svg></div>" + legend(d.legend);
  }

  function translateSvgLabels() {
    var svgs = document.querySelectorAll(".diagram svg");
    for (var i = 0; i < svgs.length && i < diagrams.length; i++) {
      var labels = diagrams[i].labels || {};
      svgs[i].querySelectorAll("text").forEach(function (el) {
        var key = el.textContent.trim();
        if (lang !== "en" && labels[key]) el.textContent = labels[key];
      });
    }
  }

  function sectionHead(num, title, text) {
    return '<div class="sec-head"><span class="mono">' + pad(num) + "</span><h2>" + t(title) + "</h2>" +
      (text ? "<p>" + t(text) + "</p>" : "") + "</div>";
  }

  function section(id, num, head, body) {
    return '<section id="' + id + '"><div class="wrap">' + sectionHead(num, head.title, head.text) + body + "</div></section>";
  }

  /* ---------- hero ---------- */

  function hero(P) {
    var h = '<div class="wrap"><div class="hero"><div class="hero-grid"><div>';
    h += '<div class="eyebrow"><i></i>' + t(P.eyebrow) + "</div>";
    h += "<h1>" + P.firstName + " <span>" + P.lastName + "</span></h1>";
    h += '<p class="lede">' + t(P.lede) + "</p>";
    h += '<div class="cta">' + (P.buttons || []).map(function (b) {
      return '<a class="btn' + (b.primary ? " primary" : "") + '" href="' + b.href + '">' + t(b.label) + "</a>";
    }).join("") + "</div></div>";
    if (P.portrait) {
      h += '<div class="portrait"><img src="' + P.portrait.src + '" alt="' + P.portrait.alt + '">';
      if (P.tag) h += '<div class="tag"><b>' + t(P.tag.big) + "</b>" + t(P.tag.text) + "</div>";
      h += "</div>";
    }
    h += "</div>"; // hero-grid
    if (P.trace) {
      h += '<div class="trace" aria-label="' + t(P.trace.aria) + '">';
      h += '<div class="trace-head"><span>' + t(P.trace.title) + "</span><span>" + t(P.trace.stack) + "</span></div>";
      h += '<ol id="trace">' + P.trace.steps.map(function (s, i) {
        return '<li class="' + (i === 0 ? "on" : "") + '"><span class="k' + (s.kind === "data" ? " d" : "") + '">' + s.key +
          '</span><span class="v">' + t(s.text) + "</span></li>";
      }).join("") + "</ol></div>";
    }
    return h + "</div></div>";
  }

  /* ---------- case study (featured experience or featured project) ---------- */

  function caseHtml(it) {
    var right = "";
    if (it.period) right = '<span class="meta">' + t(it.period) + (it.location ? " · " + t(it.location) : "") + "</span>";
    else if (it.link) right = '<a class="btn" href="' + it.link.href + '">' + t(it.link.label) + "</a>";

    var h = '<article class="case" id="case-' + it.id + '">';
    h += '<div class="case-top"><h3>' + t(it.title) + "</h3>" + right + "</div>";
    if (it.role) h += '<div class="role">' + t(it.role) + "</div>";

    // Plain-language view, always visible
    if (it.intro || it.simple) {
      h += '<div class="case-body"><div>' + (it.intro || []).map(function (p) { return "<p>" + t(p) + "</p>"; }).join("") + "</div>";
      if (it.simple) {
        h += '<div><div class="mini-label">' + t(UI.simple) + '</div><ul class="built simple">' +
          it.simple.map(function (b) { return "<li>" + t(b) + "</li>"; }).join("") + "</ul></div>";
      }
      h += "</div>";
    }

    // Technical view, behind a button
    var tech = techHtml(it);
    if (tech) {
      var open = !!openCases[it.id];
      h += '<div class="case-toggle"><button type="button" class="btn" data-toggle="' + it.id + '" aria-expanded="' + open + '" aria-controls="tech-' + it.id + '">' +
        '<span class="show">' + t(UI.showTech) + '</span><span class="hide">' + t(UI.hideTech) + "</span></button></div>";
      h += '<div class="tech-details" id="tech-' + it.id + '"' + (open ? "" : " hidden") + ">" + tech + "</div>";
    }
    return h + "</article>";
  }

  function techHtml(it) {
    var h = "";
    if (it.built) {
      h += '<div class="label">' + t(UI.built) + '</div><ul class="built cols">' +
        it.built.map(function (b) { return "<li>" + t(b) + "</li>"; }).join("") + "</ul>";
    }
    if (it.facts) {
      h += '<div class="facts">' + it.facts.map(function (f) {
        return "<div><b>" + f.value + "</b><span>" + t(f.label) + "</span></div>";
      }).join("") + "</div>";
    }
    if (it.diagram) h += diagram(it.diagram);
    if (it.tools) {
      h += '<div class="label">' + t(it.tools.label) + '</div><div class="tools">' + it.tools.items.map(function (c) {
        return '<span class="chip ' + (c.kind === "write" ? "w" : "r") + '">' + c.name + "</span>";
      }).join("") + "</div>" + legend(it.tools.legend);
    }
    if (it.stack && it.stack.length) {
      h += '<div class="label">' + t(UI.stack) + '</div><div class="why">' + it.stack.map(function (s) {
        return '<div><div class="tech' + (s.kind === "data" ? " d" : "") + '">' + s.tech + "<small>" + t(s.tag) + "</small></div>" +
          '<div class="because">' + t(s.because) + "</div></div>";
      }).join("") + "</div>";
    }
    return h;
  }

  // Open or close the technical block of one case study without re-rendering.
  function toggleTech(id) {
    var open = !openCases[id];
    openCases[id] = open;
    var block = document.getElementById("tech-" + id);
    var btn = document.querySelector('[data-toggle="' + id + '"]');
    if (block) block.hidden = !open;
    if (btn) btn.setAttribute("aria-expanded", open);
    return open;
  }

  /* ---------- compact rows and cards ---------- */

  function rowsHtml(items) {
    if (!items.length) return "";
    return '<div class="rows">' + items.map(function (e) {
      var where = [t(e.company), t(e.location)].filter(Boolean).join(" · ");
      return '<div class="row"><div class="meta">' + t(e.period) + (where ? "<br>" + where : "") + "</div><div>" +
        "<h3>" + t(e.title) + "</h3>" + (e.text ? "<p>" + t(e.text) + "</p>" : "") +
        (e.stack ? '<div class="stack">' + t(e.stack) + "</div>" : "") + "</div></div>";
    }).join("") + "</div>";
  }

  function cardsHtml(items) {
    if (!items.length) return "";
    return '<div class="cards">' + items.map(function (p) {
      var h = '<div class="card"><h3>' + t(p.title) + "</h3><p>" + t(p.text) + "</p>";
      if (p.why) h += '<div class="why-line"><b>' + t(p.why.title) + "</b>" + t(p.why.text) + "</div>";
      if (p.link) h += '<a class="btn" href="' + p.link.href + '">' + t(p.link.label) + "</a>";
      return h + "</div>";
    }).join("") + "</div>";
  }

  /* ---------- skills + education ---------- */

  function skillsHtml(S, edu) {
    var h = '<div class="skills">' + S.groups.map(function (g) {
      return "<div><h3>" + t(g.name) + '</h3><div class="tools">' + g.items.map(function (c) {
        return '<span class="chip">' + c + "</span>";
      }).join("") + "</div></div>";
    }).join("") + "</div>";
    if (edu && edu.length) {
      h += '<div class="edu">' + edu.map(function (e) {
        return "<div><b>" + t(e.title) + "</b>" + (e.sub ? "<span>" + t(e.sub) + "</span>" : "") + "</div>";
      }).join("") + "</div>";
    }
    return h;
  }

  /* ---------- contact ---------- */

  function contactHtml(C) {
    return '<section id="contact" class="contact"><div class="wrap"><h2>' + t(C.title) + "</h2><p>" + t(C.text) + "</p>" +
      '<div class="links">' + C.links.map(function (l) {
        return '<a href="' + l.href + '"><small>' + t(l.label) + "</small><span>" + l.value + "</span></a>";
      }).join("") + "</div></div></section>";
  }

  /* ---------- whole page ---------- */

  function render(l) {
    lang = l || "en";
    diagrams = [];
    var P = D.profile, E = D.experiences, PR = D.projects, S = D.skills;

    document.title = P.pageTitle || (P.firstName + " " + P.lastName);
    document.getElementById("brand").innerHTML = "<b>&gt;</b> " + P.brand;
    document.getElementById("nav").innerHTML = P.nav.map(function (n) {
      return '<a href="' + n.href + '">' + t(n.label) + "</a>";
    }).join("");

    var n = 0, html = hero(P);

    var featuredExp = E.items.filter(function (e) { return e.featured; });
    var earlierExp = E.items.filter(function (e) { return !e.featured; });
    if (featuredExp.length) html += section("work", ++n, E.section, featuredExp.map(caseHtml).join(""));

    PR.items.filter(function (p) { return p.featured; }).forEach(function (p) {
      html += section(p.id, ++n, { title: p.headline || p.title, text: p.summary }, caseHtml(p));
    });

    var cards = PR.items.filter(function (p) { return !p.featured; });
    if (cards.length || earlierExp.length) html += section("projects", ++n, PR.section, cardsHtml(cards) + rowsHtml(earlierExp));

    html += section("stack", ++n, S.section, skillsHtml(S, P.education));
    html += contactHtml(P.contact);

    document.getElementById("top").innerHTML = html;
    document.getElementById("footer").innerHTML = t(P.footer);
    translateSvgLabels();
    document.documentElement.lang = lang;
  }

  window.PortfolioRender = { render: render, toggleTech: toggleTech };
})();
