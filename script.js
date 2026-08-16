/* ==========================================================
   訪問神経整体 猫の手 - スクリプト
   ・ヘッダーのスクロール時の見た目変化
   ・スマホ用メニューの開閉
   ・スクロールで要素がふわっと出てくる動き
   ・ボタンを押したときの波紋（マイクロインタラクション）
   ・フッターの年号を自動更新
   ========================================================== */
(function () {
  "use strict";

  /* ---- ヘッダー：スクロールしたら影を付ける ---- */
  var header = document.getElementById("site-header");
  function updateHeaderState() {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  /* ---- スマホ用メニューの開閉 ---- */
  var menuToggle = document.getElementById("menu-toggle");
  var siteNav = document.getElementById("site-nav");
  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    });

    // メニュー内のリンクを押したら自動で閉じる
    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "メニューを開く");
      });
    });
  }

  /* ---- スクロールで、要素がふわっと出てくる動き ---- */
  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    // 対応していない古いブラウザでは、最初から表示しておく
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* ---- ボタンを押したときの波紋アニメーション ---- */
  var rippleButtons = document.querySelectorAll(".btn, .mobile-fixed-btn");
  rippleButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement("span");
      var size = Math.max(rect.width, rect.height) * 1.2;
      var x = (e.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
      var y = (e.clientY || rect.top + rect.height / 2) - rect.top - size / 2;

      ripple.className = "ripple";
      ripple.style.width = size + "px";
      ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";

      btn.appendChild(ripple);
      window.setTimeout(function () {
        ripple.remove();
      }, 650);
    });
  });

  /* ---- フッターの年号を自動更新 ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
