/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */
function isQuickSearchVisible() {
  return 1 == $("#cd-search").css("opacity");
}
function showQuickSearch(t) {
  null != t && $("#cd-quicksearch").val(t), $(".cd-search-trigger").click();
}
function showMenuItem(t, e) {
  "study" == t &&
    ($("#menu_" + t).click(),
    $(".cd-nav-trigger").click(),
    setTimeout(function () {
      $("#menu_" + t + "_" + e).addClass("highlighted");
    }, 500));
}
function showLowerMenuItem(t) {
  $("html, body").animate(
    { scrollTop: $(document).height() },
    250,
    function () {
      $("#" + t).addClass("highlighted");
    }
  );
}
function test() {
  alert("Test successful!");
}
function sizeOverlay(t) {
  var e, n;
  t.css({ "box-sizing": "border-box", position: "fixed", display: "block" }),
    $(window).width() > 435
      ? ((n = 0.6 * $(window).width()), (e = 0.4 * $(window).height()))
      : ((n = 0.8 * $(window).width()), (e = 0.6 * $(window).height())),
    setOverlay(t, e, n);
}
function sizeOverlayVarHeight(t) {
  t.css({ "box-sizing": "border-box", position: "fixed", display: "block" });
  let e,
    n,
    i = 4;
  (n =
    $(window).width() > 435
      ? 0.6 * $(window).width()
      : 0.8 * $(window).width()),
    t.css({ width: n, "overflow-y": "visible", height: "auto" }),
    (e = t.innerHeight()) > $(window).height() - i &&
      ((n = $(window).width() - 8), (e = t.height())),
    e > $(window).height() - i &&
      ((i = 4),
      (e = $(window).height() - 8),
      t.css("overflow-y", "scroll"),
      t.css("height", e));
  let r = Math.max(
      ($(window).height() - i - e - parseInt(t.css("padding-top")) / 2) / 2,
      i - parseInt(t.css("padding-top")) / 2
    ),
    o = ($(window).width() - n) / 2;
  t.css({ width: n, top: r, left: o });
}
function sizeOverlayVarHeightMinWidth(t, e) {
  t.css({ "box-sizing": "border-box", position: "fixed", display: "block" });
  var n,
    i = 58;
  e > $(window).width() - 8 && (e = $(window).width() - 8),
    t.css({ width: e, "overflow-y": "visible", height: "auto" }),
    (n = t.height()) > $(window).height() - i &&
      ($(window).width() - 8 > e && (e = $(window).width() - 8),
      (n = t.height())),
    n > $(window).height() - i &&
      ((n = $(window).height() - i),
      t.css("overflow-y", "scroll"),
      t.css("height", n));
  var r = Math.max(($(window).height() - i - n) / 2, i),
    o = ($(window).width() - e) / 2;
  t.css({ width: e, top: r, left: o });
}
function sizeOverlayMinHeightWidth(t, e, n) {
  var i, r;
  sizeOverlay(t),
    t.height() < e &&
      (i = e > $(window).height() - 54 ? $(window).height() - 54 : e),
    t.width() < n && (r = n > $(window).width() ? $(window).width() : n),
    (i == t.height() && r == t.width()) || setOverlay(t, i, r);
}
function setOverlay(t, e, n) {
  var i = Math.max(($(window).height() - 54 - e) / 2, 54),
    r = ($(window).width() - n) / 2;
  t.css({ height: e, width: n, top: i, left: r });
}
function shuffle(t) {
  let e,
    n,
    i = t.length;
  for (; i; )
    (n = Math.floor(Math.random() * i--)),
      (e = t[i]),
      (t[i] = t[n]),
      (t[n] = e);
}
function js_post(t, e, n = "post") {
  const i = document.createElement("form");
  (i.method = n), (i.action = t);
  for (const t in e)
    if (e.hasOwnProperty(t)) {
      const n = document.createElement("input");
      (n.type = "hidden"), (n.name = t), (n.value = e[t]), i.appendChild(n);
    }
  document.body.appendChild(i), i.submit();
}
function logClientError(t, e) {
  console.log("error: " + t),
    $.ajax({
      url: "/api/log_client_error",
      data: { code: t, data: JSON.stringify(e) },
      type: "post",
    });
}
function expressionDetails(t, e) {
  let n = $(e).closest(".exp_link"),
    i = "/worddetails/" + t + "?exp=y";
  n.find("[id^=exp_spinner_]").css("display", "flex"),
    $.ajax({ url: i, type: "post" }).success(function (t) {
      n.removeClass("exp_link").addClass("exp_nolink"),
        n.find("[id^=exp_spinner_]").hide(),
        n.find("[id^=exp_details_]").html(t.html).fadeIn();
    });
}
function hideExpressionDetails(t, e) {
  event.preventDefault();
  let n = $(e).closest(".exp_nolink");
  n.removeClass("exp_nolink").addClass("exp_link"),
    n.find("[id^=exp_details_]").fadeOut();
}
function viDetails(t, e) {
  let n = $(e).closest(".vi_link"),
    i = "/worddetails/" + t + "?vi=y";
  n.find("[id^=vi_spinner_]").css("display", "flex"),
    $.ajax({ url: i, type: "post" }).success(function (t) {
      n.removeClass("vi_link").addClass("vi_nolink"),
        n.find("[id^=vi_spinner_]").hide(),
        n.find("[id^=vi_details_]").html(t.html).fadeIn();
    });
}
function hideViDetails(t, e) {
  event.preventDefault();
  let n = $(e).closest(".vi_nolink");
  n.removeClass("vi_nolink").addClass("vi_link"),
    n.find("[id^=vi_details_]").fadeOut();
}
function wordDetails(t, e, n) {
  let i = $(n).closest(".jukugorow"),
    r = "/worddetails/" + t;
  e != undefined && (r += "?q=" + e),
    i.find("[id^=jk_spinner_]").show(),
    $.ajax({ url: r, type: "post" }).success(function (t) {
      i.find("[id^=jk_spinner_]").hide(),
        i.find("[id^=jk_abbr_]").hide(),
        i.find("[id^=jk_juk_]").addClass("nolink"),
        i.find("[id^=jk_details_]").html(t.html).fadeIn();
    });
  let o = new CustomEvent("vclick", { detail: t });
  document.body.dispatchEvent(o);
}
function hideWordDetails(t, e) {
  let n = $(e).closest(".jukugorow");
  n.find("[id^=jk_juk_]").removeClass("nolink"),
    n.find("[id^=jk_details_]").hide(),
    n.find("[id^=jk_abbr_]").show();
}
function wordInflections(t, e) {
  let n = $(e).closest(".jukugorow");
  $.ajax({ url: "/wordinflections/" + t, type: "post" }).success(function (t) {
    n.find("[id^=jk_inflcall_]").addClass("inactive"),
      n.find("[id^=jk_infl_]").html(t.html).fadeIn();
  });
}
function kanjiDetails(t, e, n, i, r, o, s) {
  let a = $(s).closest(".kanjirow"),
    l = "/kanjidetails/" + t + "?wc=" + e;
  n != undefined && (l += "&r=" + n),
    i != undefined && (l += "&q=" + i),
    r != undefined && (l += "&cf=y"),
    o != undefined && (l += "&xinfo=y"),
    a.find("[id^=k_kan_]").hasClass("kanji_clicked") && 0 == s.id.indexOf("k_")
      ? (location.href = "/kanji/id/" + t)
      : (a.find("[id^=k_spin_]").show(),
        $.ajax({ url: encodeURI(l), type: "post" }).success(function (t) {
          a.find("[id^=k_spin_]").hide(),
            a
              .find("[id^=k_kan_]")
              .removeClass("kanji")
              .removeClass("hyogai")
              .removeClass("jinmeiyo")
              .addClass("kanji_clicked"),
            a.find("[id^=k_details_]").html(t.html).fadeIn();
        }));
}
function hideKanjiDetails(t, e) {
  $(e).closest(".kajax").hide(),
    $(e)
      .closest(".kanjirow")
      .find("[id^=k_kan_]")
      .removeClass("kanji_clicked")
      .addClass("kanji");
}
function tatDetails(t, e, n) {
  let i = $(t).closest(".tatoeba");
  $(".tatvoc").removeClass("selected"), $(t).addClass("selected");
  let r = "<i class='fa fa-spinner fa-spin fa-fw'></i> Loading ...";
  i.find("[id^=tatdd_]").fadeIn().html(r);
  let o = $.ajax({
    url: encodeURI("/example/" + e + "/dd/" + n),
    type: "post",
  });
  o.success(function (t) {
    let r;
    0 == t.result
      ? (r = t.html)
      : 1 == t.result
      ? (r =
          "Please <a href='/login'>LOG IN</a> to view example quick details. View <a href='/example/" +
          e +
          "'>DETAILS</a> for full information on this example.")
      : 2 == t.result &&
        (r =
          "No data found - please see <a href='/example/" +
          e +
          "' class='action'>DETAILS</a> for full information on this example."),
      (r +=
        "<div class='spaced'><a href='/searchq?q=" +
        n +
        "' class='action'><i class='fa fa-search' aria-hidden='true'></i> SEARCH</a></div>"),
      i.find("[id^=tatdd_]").html(r);
  }),
    o.fail(function () {
      i.find("[id^=tatdd_]").html(
        "<div class='errormessage'>Error loading details. Please refresh the page.</div>"
      );
    });
}
function hideTatDetails(t, e) {
  $(e).closest(".tatdd").hide();
}
function getLink(t, e) {
  null == t && (t = document.title),
    null == e && (e = location.href),
    window.prompt("Copy page link", `${t}\n${e}`);
}
function grammarDetails(t, e) {
  let n = $(e).closest(".gp_search"),
    i = "<i class='fa fa-spinner fa-spin fa-fw'></i> Loading ...";
  n.find("[id^=gp_quick_]").fadeIn().html(i),
    n.find("[id^=gp_link_]").hide(),
    n.find("[id^=gp_text_]").show(),
    $.ajax({
      url: encodeURI("/grammar/" + t + "/quick"),
      type: "post",
    }).success(function (t) {
      0 == t.result
        ? n.find("[id^=gp_quick_]").html(t.html)
        : n
            .find("[id^=gp_quick_]")
            .html(
              "<div class='errormessage'>Error loading quick view - please refresh the page.</div>"
            );
    });
}
function hideGrammarDetails(t, e) {
  $(e)
    .closest("#gp_quick_" + t)
    .hide();
  let n = $(e).closest(".gp_search");
  n.find("[id^=gp_link_]").show(), n.find("[id^=gp_text_]").hide();
}
function mediaDetails(t, e, n, i, r) {
  let o = $(e).closest(".m_ctr"),
    s = "<i class='fa fa-spinner fa-spin fa-fw'></i> Loading ...";
  o.find("[id^=m_click_]").hide(),
    o
      .find("[id^=m_quick_]")
      .fadeIn()
      .html(s)
      .click(function (t) {
        t.stopPropagation();
      });
  let a = "/media/" + t + "/quick";
  null != n && (a += "?topic=" + n),
    null != i && (a += "&tsid=" + i),
    0 != r && (a += "&start=" + r),
    $.ajax({ url: encodeURI(a), type: "post" }).success(function (t) {
      0 == t.result
        ? o.find("[id^=m_quick_]").html(t.html)
        : o
            .find("[id^=m_quick_]")
            .html(
              "<div class='errormessage'>Error loading quick view - please refresh the page.</div>"
            );
    });
}
function hideMediaDetails(t, e, n) {
  $(e)
    .closest("#m_quick_" + t)
    .hide(),
    $(e).closest(".m_ctr").find("[id^=m_click_]").hide().show(),
    n.stopPropagation();
}
function readingDetails(t, e, n, i) {
  let r = $(e).closest(".r_ctr"),
    o = "<i class='fa fa-spinner fa-spin fa-fw'></i> Loading ...";
  r.find("[id^=r_click_]").hide(),
    r
      .find("[id^=r_quick_]")
      .fadeIn()
      .html(o)
      .click(function (t) {
        t.stopPropagation();
      });
  let s = "/read/" + t + "/quick";
  null != n && (s += "?topic=" + n),
    null != i && (s += "&tsid=" + i),
    $.ajax({ url: encodeURI(s), type: "post" }).success(function (t) {
      0 == t.result
        ? r.find("[id^=r_quick_]").html(t.html)
        : r
            .find("[id^=r_quick_]")
            .html(
              "<div class='errormessage'>Error loading quick view - please refresh the page.</div>"
            );
    });
}
function hideReadingDetails(t, e, n) {
  $(e)
    .closest("#r_quick_" + t)
    .hide(),
    $(e).closest(".r_ctr").find("[id^=r_click_]").hide().show(),
    n.stopPropagation();
}
function secondsToTime(t) {
  let e = Math.floor(t / 3600),
    n = Math.floor((t - 3600 * e) / 60),
    i = t - 3600 * e - 60 * n,
    r = "";
  return (
    0 !== e && (r = e + ":"),
    (r += (n = n < 10 && e > 0 ? "0" + n : String(n)) + ":"),
    (r += i < 10 ? "0" + i : String(i))
  );
}
function getClientDate() {
  var t = new Date(),
    e = t.getFullYear().toString() + "-",
    n = t.getMonth() + 1;
  n < 10 && (e += "0"), (e += n.toString() + "-");
  var i = t.getDate();
  return i < 10 && (e += "0"), (e += i.toString());
}
function getDeviceDetails() {
  var t = "Device pixel ratio: " + window.devicePixelRatio;
  return (
    (t += " | Height: " + document.documentElement.clientHeight),
    (t += " | Width: " + document.documentElement.clientWidth),
    (t += "<br />Device width: " + window.screen.width),
    (t += " | Device height: " + window.screen.height),
    (t += "<div>User agent: " + navigator.userAgent + "</div>")
  );
}
function ordinalize(t) {
  return 1 === t ? "first" : 2 === t ? "second" : 3 === t ? "third" : t + "th";
}
function click(t) {
  $("html, body").animate(
    { scrollTop: $("#section" + t).offset().top - 60 },
    250,
    function () {
      $("#up" + t).fadeIn();
    }
  );
}
function scrollToSection(t) {
  $("html, body").animate(
    { scrollTop: $("#section" + t).offset().top - 60 },
    250,
    function () {
      $("#up" + t).fadeIn();
    }
  );
}
function amountscrolled() {
  var t = $(window).height(),
    e = $(document).height();
  return $(window).scrollTop() / (e - t);
}
function displayMs(t, e) {
  $("#ms_head").html(t),
    $("#ms_subhead").html(e),
    $("#ms")
      .css({ bottom: -$("#ms").outerHeight() })
      .show(),
    $("#ms_hide").click(function () {
      $("#ms").hide();
    }),
    $("#ms").animate({ bottom: 0 }, 1e3);
}
function displayNotification() {
  $.ajax({ url: "/get_user_notification", type: "post" }).success(function (t) {
    0 === t.result && displayMs(t.head, t.subhead);
  });
}
function insertTextInElement(t, e) {
  var n = $("#" + e),
    i = n[0].selectionStart,
    r = n.val().substring(0, i),
    o = n.val().substring(i, n.val().length);
  n.val(r + t + o),
    (n[0].selectionStart = r.length + t.length),
    (n[0].selectionEnd = r.length + t.length),
    n.focus();
}
function iOSversion() {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    var t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3] || 0, 10)];
  }
}
function toggleFullScreen() {
  if (fullScreen)
    $(".bodyarea").css({
      position: "relative",
      padding: "10px",
      width: "auto",
      height: startHeight,
    }),
      $(".main").css("height", "auto"),
      $("#main-header").show(),
      $("#locator-ctr").show(),
      $("#footer").show(),
      $(".problem_report").show(),
      $(document.body).css("overflow", "visible"),
      (fullScreen = !1);
  else {
    (startHeight = $(".bodyarea").innerHeight()),
      $(".main").css("height", $(window).innerHeight()),
      $(".bodyarea").css({
        position: "absolute",
        top: 0,
        left: 0,
        width: $(window).innerWidth(),
        height: $(window).innerHeight(),
        "z-index": 1e3,
        "box-sizing": "border-box",
        padding: "10px",
      }),
      $("#main-header").hide(),
      $("#locator-ctr").hide(),
      $("#footer").hide(),
      $(".problem_report").hide(),
      $(document.body).css("overflow", "hidden");
    var t = document.getElementById("bodyarea");
    null != t && t.scrollIntoView(), (fullScreen = !0);
  }
}
function toggleEnglish(t) {
  $("#eng_" + t).hasClass("hidden")
    ? ($("#eng_" + t + " > .placeholder").hide(),
      $("#eng_" + t + " > .text").fadeIn(300),
      $("#eng_" + t).removeClass("hidden"))
    : $("#eng_" + t + " > .text").fadeOut(300, function () {
        $("#eng_" + t + " > .placeholder").show(),
          $("#eng_" + t).addClass("hidden");
      });
}
function toggleFurigana(t) {
  $(".tf" + t).toggleClass("hidden");
}
function createStudyEvent(t, e, n) {
  let i = "/studyevent/" + t + "/" + e + "/" + n;
  $.ajax({ url: i, type: "post" });
}
function searchSelection(t) {
  let e = document.getElementById(t),
    n = e.value.substring(e.selectionStart, e.selectionEnd);
  if ("" == n) return;
  let i = "/searchq?q=" + (n = n.replaceAll("|", ""));
  window.open(i, "_blank"), e.focus();
}
function openInTatoebaAdd(t) {
  let e = $("#" + t).val();
  if ("" == e) return;
  let n = "/tatoebas/add?jpn=" + (e = e.replaceAll("|", ""));
  window.open(n, "_blank");
}
function openCategorySearch() {
  $("#sswitch_full").fadeIn(), $("#ss-overlay").addClass("is-visible");
}
function translateSelection(t) {
  let e = document.getElementById(t),
    n = e.selectionStart,
    i = e.selectionEnd;
  n == i && ((n = 0), (i = e.value.length));
  let r = e.value.substring(n, i),
    o = "/sentence_translate?q=" + (r = r.replaceAll("|", ""));
  return window.open(o, "_blank"), !1;
}
function togglePopup(t) {
  let e = t.id.replace("pctr", "");
  $("#pctr" + e).hasClass("popupactive")
    ? ($("#pctr" + e).removeClass("popupactive"),
      $("#pshow" + e).show(),
      $("#phide" + e).hide(),
      $("#popup" + e).fadeOut(200))
    : ($("#pctr" + e).addClass("popupactive"),
      $("#pshow" + e).hide(),
      $("#phide" + e).show(),
      $("#popup" + e).fadeIn(200));
}
function resetImage(t) {
  favorites.indexOf(t) > -1
    ? $("[id=star_" + t + "]").html(
        "<span class='ja-star sd' id='star_span_" + t + "'></span>"
      )
    : $("[id=star_" + t + "]").html(
        "<span class='ja-star_open sd' id='star_span_" + t + "'></span>"
      );
}
function removeFavorite(t) {
  (favorites = favorites.filter((e) => e !== t)),
    notFavorites.indexOf(t) < 0 && notFavorites.push(t),
    resetImage(t);
}
function toggle(t) {
  if (favorites.indexOf(t) > -1)
    0 == t.indexOf("k")
      ? $.ajax("/bookmarks/removefavorite/" + t.replace("k", ""))
      : 0 == t.indexOf("v")
      ? $.ajax("/bookmarks/removefavoritevocab/" + t.replace("v", ""))
      : 0 == t.indexOf("g")
      ? $.ajax("/bookmarks/removefavoritegrammar/" + t.replace("g", ""))
      : 0 == t.indexOf("t")
      ? $.ajax("/bookmarks/removefavoritetatoeba/" + t.replace("t", ""))
      : 0 == t.indexOf("n") &&
        $.ajax("/bookmarks/removefavoritename/" + t.replace("n", "")),
      removeFavorite(t);
  else {
    let e = addBookmark(t);
    favorites.push(t),
      notFavorites.splice(notFavorites.indexOf(t), 1),
      e.success(function (e) {
        0 != e.result && removeFavorite(t),
          1 == e.result
            ? displayMs(
                "Could not add favorite",
                "You may have been logged out - please <a href='/users/sign_in'>LOG IN</a> if necessary."
              )
            : 2 == e.result &&
              displayMs(
                "Could not add favorite",
                "You have reached the Registered User favorites limit of 25. <a href='/pro'>GO PRO</a> to add more favorites!"
              );
      }),
      e.fail(function () {
        removeFavorite(t);
      });
  }
  resetImage(t);
}
function addBookmark(t) {
  return 0 == t.indexOf("k")
    ? $.ajax("/bookmarks/addfavorite/" + t.replace("k", ""))
    : 0 == t.indexOf("v")
    ? $.ajax("/bookmarks/addfavoritevocab/" + t.replace("v", ""))
    : 0 == t.indexOf("g")
    ? $.ajax("/bookmarks/addfavoritegrammar/" + t.replace("g", ""))
    : 0 == t.indexOf("t")
    ? $.ajax("/bookmarks/addfavoritetatoeba/" + t.replace("t", ""))
    : 0 == t.indexOf("n")
    ? $.ajax("/bookmarks/addfavoritename/" + t.replace("n", ""))
    : void 0;
}
function HashTable(t) {
  for (var e in ((this.length = 0), (this.items = {}), t))
    t.hasOwnProperty(e) && ((this.items[e] = t[e]), this.length++);
  (this.setItem = function (t, e) {
    var n = undefined;
    return (
      this.hasItem(t) ? (n = this.items[t]) : this.length++,
      (this.items[t] = e),
      n
    );
  }),
    (this.getItem = function (t) {
      return this.hasItem(t) ? this.items[t] : undefined;
    }),
    (this.hasItem = function (t) {
      return this.items.hasOwnProperty(t);
    }),
    (this.removeItem = function (t) {
      return this.hasItem(t)
        ? ((previous = this.items[t]),
          this.length--,
          delete this.items[t],
          previous)
        : undefined;
    }),
    (this.keys = function () {
      var t = [];
      for (var e in this.items) this.hasItem(e) && t.push(e);
      return t;
    }),
    (this.values = function () {
      var t = [];
      for (var e in this.items) this.hasItem(e) && t.push(this.items[e]);
      return t;
    }),
    (this.each = function (t) {
      for (var e in this.items) this.hasItem(e) && t(e, this.items[e]);
    }),
    (this.clear = function () {
      (this.items = {}), (this.length = 0);
    });
}
function canspeak() {
  return getVoices(), !!Modernizr.speechsynthesis && canSpeakJapanese;
}
function canspeakmod() {
  return Modernizr.speechsynthesis;
}
function speak(t) {
  if (!Modernizr.speechsynthesis)
    return void alert(
      "Unfortunately your browser does not support this feature. Please use Chrome, Safari or Edge."
    );
  let e = new SpeechSynthesisUtterance(t);
  window.speechSynthesis.cancel(),
    (e.lang = "ja-JP"),
    window.speechSynthesis.speak(e);
}
function speakEnglish(t) {
  if (!Modernizr.speechsynthesis)
    return void alert(
      "Unfortunately your browser does not support this feature. Please use Chrome, Safari or Edge."
    );
  let e = new SpeechSynthesisUtterance(t);
  window.speechSynthesis.cancel(),
    (e.lang = "en-US"),
    window.speechSynthesis.speak(e);
}
function speakForceVoice(t) {
  if (!canSpeakJapanese)
    return void alert(
      "Unfortunately your browser does not support this feature. Please use Chrome, Safari or Edge."
    );
  let e = new SpeechSynthesisUtterance(t);
  window.speechSynthesis.cancel(),
    (e.voice = jaVoice),
    window.speechSynthesis.speak(e);
}
function setRate(t) {
  audioRate = t;
}
function speakJapanese(t) {
  0 == voices.length && getVoices();
  let e = new SpeechSynthesisUtterance(t);
  window.speechSynthesis.cancel(),
    canSpeakJapanese ? (e.voice = jaVoice) : (e.lang = "ja-JP"),
    (e.rate = audioRate),
    window.speechSynthesis.speak(e);
}
function getVoices() {
  getJaVoice((voices = window.speechSynthesis.getVoices())),
    jaVoice ||
      (0 == voices.length &&
        (window.speechSynthesis.onvoiceschanged = function () {
          getJaVoice((voices = window.speechSynthesis.getVoices()));
        }));
}
function getJaVoice() {
  if (0 != voices.length) {
    (audioSetupComplete = !0), (voiceSummary = "");
    for (let t = 0; t < voices.length; t++)
      (voiceSummary += voices[t].name + " (" + voices[t].lang + ")"),
        t < voices.length - 1 && (voiceSummary += ", ");
    return (
      (jaVoice = voices.filter(function (t) {
        return "ja-JP" == t.lang || "ja_JP" == t.lang;
      })[0]) && ((canSpeakJapanese = !0), $(".audio").show()),
      jaVoice
    );
  }
}
function setUpAudio() {
  (jaVoice = null),
    $(".audio").hide(),
    (voices = window.speechSynthesis.getVoices()).length > 0
      ? getJaVoice()
      : (voices = window.speechSynthesis.getVoices()).length > 0
      ? getJaVoice()
      : ((window.speechSynthesis.onvoiceschanged = function () {
          (voices = window.speechSynthesis.getVoices()), getJaVoice();
        }),
        (voices = window.speechSynthesis.getVoices()));
}
function setUpS3audio() {
  var t, e;
  return (
    (t = $(".s3audio audio")),
    (e = $(".s3audio span")),
    t.each(function (t, e) {
      return (
        e.addEventListener("play", function () {
          return $(this)
            .siblings("span")
            .removeClass("paused")
            .addClass("playing");
        }),
        e.addEventListener("pause", function () {
          return $(this)
            .siblings("span")
            .removeClass("playing")
            .addClass("paused");
        }),
        e.addEventListener("ended", function () {
          return $(this)
            .siblings("span")
            .removeClass("playing")
            .removeClass("paused");
        })
      );
    }),
    e.on("click", function () {
      var t;
      return !1 === (t = $(this).siblings("audio")[0]).paused
        ? t.pause()
        : t.play();
    })
  );
}
function KanjiAnimator() {
  var t,
    e,
    n,
    i,
    r,
    o,
    s,
    a,
    l = this;
  (this.svg = this.kanji = null),
    (this.initialize = function (c, u, h, d, f, p, g, m, v) {
      (this.kanji = c),
        (t = h),
        (e = d),
        (n = f),
        (r = p),
        (i = g),
        (o = m),
        (s = $(t).width()),
        (a = 250);
      var y = this;
      $(n).load(u, function (e, i) {
        "error" == i
          ? ($(t)
              .css({
                "font-size": (200 * s) / a + "px",
                "line-height": (250 * s) / a + "px",
              })
              .html(c),
            (e = $(t).outerHeight() - $(g).outerHeight()),
            $(g)
              .css({
                position: "absolute",
                top: e + "px",
                left: 5,
                "z-index": 100,
              })
              .show())
          : ($(n).html($(n).html().replace("font-size:8;", "font-size:6pt;")),
            (y.svg = $(n).html()),
            l.loadDone()),
          (i = new CustomEvent("animatorloaded", {
            detail: { id: v, status: i },
          })),
          document.body.dispatchEvent(i);
      });
    }),
    (this.loadDone = function () {
      $(t).svg(), $(e).svg();
      var i = $(e).svg("get");
      void 0 !== i &&
        (i.add($(n + " > *")),
        i.configure({ viewBox: "0 0 110 110" }, !0),
        i.line(55, 0, 55, 110, {
          stroke: "#d9e1e7",
          strokeWidth: "0.5",
          "stroke-dasharray": "2, 2",
        }),
        i.line(0, 55, 110, 55, {
          stroke: "#d9e1e7",
          strokeWidth: "0.5",
          "stroke-dasharray": "2, 2",
        }),
        (i = $(t).svg("get")).add($(n + " > *")),
        i.configure({ viewBox: "0 0 110 110" }, !0),
        $(e + " path").each(function () {
          $(this).attr("stroke", "#d9e1e7");
        }),
        $(r).addClass("visible").show().click(l.animate));
    }),
    (this.animate = function () {
      $(t + " path").each(function () {
        $(this)[0].style.opacity = 0;
      }),
        $(t).each(function () {
          var t,
            e = $("path", this),
            n = 0;
          for (t = e.length; n < t; n++) {
            var i = e[n],
              r = i.getTotalLength();
            (i.style.strokeDashoffset = r),
              $(i).attr("data-length", r),
              $(i).attr("animation", "none");
          }
        }),
        setTimeout(l.animatenext, 200);
    }),
    (this.getStroke = function (e) {
      var n = 0,
        i = null;
      return (
        $(t + " path").each(function () {
          if (n == e) return (i = this), !1;
          n += 1;
        }),
        i
      );
    }),
    (this.animatenext = function () {
      $(t + " path").each(function (t) {
        if (((t = $(this)[0]), "finished" == $(this).attr("animation")))
          return (
            (t.style.transition = t.style.WebkitTransition = "none"), "continue"
          );
        if ("animating" == $(this).attr("animation"))
          return (
            $(this).css("transition", "stroke 1.0s").css("stroke", "black"),
            $(this).attr("animation", "finished"),
            "continue"
          );
        (t.style.opacity = 1),
          (t.style.stroke = "red"),
          $(this).attr("animation", "animating"),
          setTimeout(l.animatenext, 1100);
        var e = $(this).attr("data-length");
        return (
          (t.style.strokeDasharray = e + ", " + e),
          (t.style.transition = "stroke-dashoffset 1000ms 100ms"),
          (t.style.strokeDashoffset = 0),
          !1
        );
      });
    }),
    (this.getPosition = function () {
      return {
        top: $(o).position().top,
        left: $(o).position().left,
        width: $(o).width(),
        height: $(o).height(),
      };
    }),
    (this.reposition = function (n, r, s, l) {
      $(o).css({ position: "absolute", top: n, left: r, width: s, height: l }),
        $(t).css({
          width: s,
          height: l,
          "font-size": (200 * s) / a + "px",
          "line-height": (250 * s) / a + "px",
        }),
        $(e).css({ width: s, height: l }),
        $(i).css({ top: $(o).height() - 15 });
    }),
    (this.show = function () {
      $(o).css({ visibility: "visible", "background-color": "white" }).fadeIn();
    }),
    (this.hide = function () {
      $(o).fadeOut();
    });
}
function mcClick(t, e, n, i) {
  (mcEleId = i.id),
    (mcEle = $(i)),
    (score = mcEle.attr("data-score")),
    $("[id^='mcKind_']").hide(),
    $("#mcKind_" + t).show(),
    "g" === t
      ? setTitle_mcw("Edit grammar mastery manually")
      : "k" === t
      ? setTitle_mcw("Edit kanji mastery manually")
      : "v" === t && setTitle_mcw("Edit word mastery manually"),
    mcUpdating ||
      ($("[id^='mcScore']").removeClass("selected"),
      $("#mcScore" + t + score).addClass("selected"),
      $("#mc_edit").show(),
      (mcId = e),
      show_mcw());
}
function mcSetScore(t, e) {
  if (0 === mcId) return;
  $("#mc_edit").hide(), $("#mc_spinner").show();
  let n = { score: e };
  "g" === t
    ? ((url = "/grammar/setmastery"), (n.grammar_id = mcId))
    : "k" === t
    ? ((url = "/kanji/setmastery"), (n.kanji_id = mcId))
    : ((url = "/word/setmastery"), (n.vocab_id = mcId)),
    $.ajax({ url: url, data: n, type: "post" }).success(function (n) {
      if (($("#mc_spinner").hide(), 0 === n.result)) {
        n.notify && displayNotification(),
          n.circle_html &&
            $('[id="' + mcEleId + '"]')
              .html(n.circle_html)
              .attr("data-score", e),
          (mcUpdating = !1);
        let i = new CustomEvent("mastery_updated", {
          detail: { id: mcId, kind: t, score: e },
        });
        document.body.dispatchEvent(i), hide_mcw();
      }
    });
}
!(function (t, e) {
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = t.document
        ? e(t, !0)
        : function (t) {
            if (!t.document)
              throw new Error("jQuery requires a window with a document");
            return e(t);
          })
    : e(t);
})("undefined" != typeof window ? window : this, function (t, e) {
  function n(t) {
    var e = !!t && "length" in t && t.length,
      n = ft.type(t);
    return (
      "function" !== n &&
      !ft.isWindow(t) &&
      ("array" === n ||
        0 === e ||
        ("number" == typeof e && e > 0 && e - 1 in t))
    );
  }
  function i(t, e, n) {
    if (ft.isFunction(e))
      return ft.grep(t, function (t, i) {
        return !!e.call(t, i, t) !== n;
      });
    if (e.nodeType)
      return ft.grep(t, function (t) {
        return (t === e) !== n;
      });
    if ("string" == typeof e) {
      if (Ct.test(e)) return ft.filter(e, t, n);
      e = ft.filter(e, t);
    }
    return ft.grep(t, function (t) {
      return ft.inArray(t, e) > -1 !== n;
    });
  }
  function r(t, e) {
    do {
      t = t[e];
    } while (t && 1 !== t.nodeType);
    return t;
  }
  function o(t) {
    var e = {};
    return (
      ft.each(t.match(Nt) || [], function (t, n) {
        e[n] = !0;
      }),
      e
    );
  }
  function s() {
    it.addEventListener
      ? (it.removeEventListener("DOMContentLoaded", a),
        t.removeEventListener("load", a))
      : (it.detachEvent("onreadystatechange", a), t.detachEvent("onload", a));
  }
  function a() {
    (it.addEventListener ||
      "load" === t.event.type ||
      "complete" === it.readyState) &&
      (s(), ft.ready());
  }
  function l(t, e, n) {
    if (n === undefined && 1 === t.nodeType) {
      var i = "data-" + e.replace(Bt, "-$1").toLowerCase();
      if ("string" == typeof (n = t.getAttribute(i))) {
        try {
          n =
            "true" === n ||
            ("false" !== n &&
              ("null" === n
                ? null
                : +n + "" === n
                ? +n
                : $t.test(n)
                ? ft.parseJSON(n)
                : n));
        } catch (r) {}
        ft.data(t, e, n);
      } else n = undefined;
    }
    return n;
  }
  function c(t) {
    var e;
    for (e in t)
      if (("data" !== e || !ft.isEmptyObject(t[e])) && "toJSON" !== e)
        return !1;
    return !0;
  }
  function u(t, e, n, i) {
    if (At(t)) {
      var r,
        o,
        s = ft.expando,
        a = t.nodeType,
        l = a ? ft.cache : t,
        c = a ? t[s] : t[s] && s;
      if (
        (c && l[c] && (i || l[c].data)) ||
        n !== undefined ||
        "string" != typeof e
      )
        return (
          c || (c = a ? (t[s] = nt.pop() || ft.guid++) : s),
          l[c] || (l[c] = a ? {} : { toJSON: ft.noop }),
          ("object" != typeof e && "function" != typeof e) ||
            (i
              ? (l[c] = ft.extend(l[c], e))
              : (l[c].data = ft.extend(l[c].data, e))),
          (o = l[c]),
          i || (o.data || (o.data = {}), (o = o.data)),
          n !== undefined && (o[ft.camelCase(e)] = n),
          "string" == typeof e
            ? null == (r = o[e]) && (r = o[ft.camelCase(e)])
            : (r = o),
          r
        );
    }
  }
  function h(t, e, n) {
    if (At(t)) {
      var i,
        r,
        o = t.nodeType,
        s = o ? ft.cache : t,
        a = o ? t[ft.expando] : ft.expando;
      if (s[a]) {
        if (e && (i = n ? s[a] : s[a].data)) {
          r = (e = ft.isArray(e)
            ? e.concat(ft.map(e, ft.camelCase))
            : e in i
            ? [e]
            : (e = ft.camelCase(e)) in i
            ? [e]
            : e.split(" ")).length;
          for (; r--; ) delete i[e[r]];
          if (n ? !c(i) : !ft.isEmptyObject(i)) return;
        }
        (n || (delete s[a].data, c(s[a]))) &&
          (o
            ? ft.cleanData([t], !0)
            : ht.deleteExpando || s != s.window
            ? delete s[a]
            : (s[a] = undefined));
      }
    }
  }
  function d(t, e, n, i) {
    var r,
      o = 1,
      s = 20,
      a = i
        ? function () {
            return i.cur();
          }
        : function () {
            return ft.css(t, e, "");
          },
      l = a(),
      c = (n && n[3]) || (ft.cssNumber[e] ? "" : "px"),
      u = (ft.cssNumber[e] || ("px" !== c && +l)) && qt.exec(ft.css(t, e));
    if (u && u[3] !== c) {
      (c = c || u[3]), (n = n || []), (u = +l || 1);
      do {
        (u /= o = o || ".5"), ft.style(t, e, u + c);
      } while (o !== (o = a() / l) && 1 !== o && --s);
    }
    return (
      n &&
        ((u = +u || +l || 0),
        (r = n[1] ? u + (n[1] + 1) * n[2] : +n[2]),
        i && ((i.unit = c), (i.start = u), (i.end = r))),
      r
    );
  }
  function f(t) {
    var e = Kt.split("|"),
      n = t.createDocumentFragment();
    if (n.createElement) for (; e.length; ) n.createElement(e.pop());
    return n;
  }
  function p(t, e) {
    var n,
      i,
      r = 0,
      o =
        "undefined" != typeof t.getElementsByTagName
          ? t.getElementsByTagName(e || "*")
          : "undefined" != typeof t.querySelectorAll
          ? t.querySelectorAll(e || "*")
          : undefined;
    if (!o)
      for (o = [], n = t.childNodes || t; null != (i = n[r]); r++)
        !e || ft.nodeName(i, e) ? o.push(i) : ft.merge(o, p(i, e));
    return e === undefined || (e && ft.nodeName(t, e)) ? ft.merge([t], o) : o;
  }
  function g(t, e) {
    for (var n, i = 0; null != (n = t[i]); i++)
      ft._data(n, "globalEval", !e || ft._data(e[i], "globalEval"));
  }
  function m(t) {
    zt.test(t.type) && (t.defaultChecked = t.checked);
  }
  function v(t, e, n, i, r) {
    for (
      var o, s, a, l, c, u, h, d = t.length, v = f(e), y = [], b = 0;
      b < d;
      b++
    )
      if ((s = t[b]) || 0 === s)
        if ("object" === ft.type(s)) ft.merge(y, s.nodeType ? [s] : s);
        else if (Gt.test(s)) {
          for (
            l = l || v.appendChild(e.createElement("div")),
              c = (Vt.exec(s) || ["", ""])[1].toLowerCase(),
              h = Xt[c] || Xt._default,
              l.innerHTML = h[1] + ft.htmlPrefilter(s) + h[2],
              o = h[0];
            o--;

          )
            l = l.lastChild;
          if (
            (!ht.leadingWhitespace &&
              Ut.test(s) &&
              y.push(e.createTextNode(Ut.exec(s)[0])),
            !ht.tbody)
          )
            for (
              o =
                (s =
                  "table" !== c || Yt.test(s)
                    ? "<table>" !== h[1] || Yt.test(s)
                      ? 0
                      : l
                    : l.firstChild) && s.childNodes.length;
              o--;

            )
              ft.nodeName((u = s.childNodes[o]), "tbody") &&
                !u.childNodes.length &&
                s.removeChild(u);
          for (ft.merge(y, l.childNodes), l.textContent = ""; l.firstChild; )
            l.removeChild(l.firstChild);
          l = v.lastChild;
        } else y.push(e.createTextNode(s));
    for (
      l && v.removeChild(l),
        ht.appendChecked || ft.grep(p(y, "input"), m),
        b = 0;
      (s = y[b++]);

    )
      if (i && ft.inArray(s, i) > -1) r && r.push(s);
      else if (
        ((a = ft.contains(s.ownerDocument, s)),
        (l = p(v.appendChild(s), "script")),
        a && g(l),
        n)
      )
        for (o = 0; (s = l[o++]); ) Wt.test(s.type || "") && n.push(s);
    return (l = null), v;
  }
  function y() {
    return !0;
  }
  function b() {
    return !1;
  }
  function x() {
    try {
      return it.activeElement;
    } catch (t) {}
  }
  function w(t, e, n, i, r, o) {
    var s, a;
    if ("object" == typeof e) {
      for (a in ("string" != typeof n && ((i = i || n), (n = undefined)), e))
        w(t, a, n, i, e[a], o);
      return t;
    }
    if (
      (null == i && null == r
        ? ((r = n), (i = n = undefined))
        : null == r &&
          ("string" == typeof n
            ? ((r = i), (i = undefined))
            : ((r = i), (i = n), (n = undefined))),
      !1 === r)
    )
      r = b;
    else if (!r) return t;
    return (
      1 === o &&
        ((s = r),
        ((r = function (t) {
          return ft().off(t), s.apply(this, arguments);
        }).guid = s.guid || (s.guid = ft.guid++))),
      t.each(function () {
        ft.event.add(this, e, r, i, n);
      })
    );
  }
  function k(t, e) {
    return ft.nodeName(t, "table") &&
      ft.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr")
      ? t.getElementsByTagName("tbody")[0] ||
          t.appendChild(t.ownerDocument.createElement("tbody"))
      : t;
  }
  function C(t) {
    return (t.type = (null !== ft.find.attr(t, "type")) + "/" + t.type), t;
  }
  function _(t) {
    var e = ae.exec(t.type);
    return e ? (t.type = e[1]) : t.removeAttribute("type"), t;
  }
  function S(t, e) {
    if (1 === e.nodeType && ft.hasData(t)) {
      var n,
        i,
        r,
        o = ft._data(t),
        s = ft._data(e, o),
        a = o.events;
      if (a)
        for (n in (delete s.handle, (s.events = {}), a))
          for (i = 0, r = a[n].length; i < r; i++) ft.event.add(e, n, a[n][i]);
      s.data && (s.data = ft.extend({}, s.data));
    }
  }
  function E(t, e) {
    var n, i, r;
    if (1 === e.nodeType) {
      if (((n = e.nodeName.toLowerCase()), !ht.noCloneEvent && e[ft.expando])) {
        for (i in (r = ft._data(e)).events) ft.removeEvent(e, i, r.handle);
        e.removeAttribute(ft.expando);
      }
      "script" === n && e.text !== t.text
        ? ((C(e).text = t.text), _(e))
        : "object" === n
        ? (e.parentNode && (e.outerHTML = t.outerHTML),
          ht.html5Clone &&
            t.innerHTML &&
            !ft.trim(e.innerHTML) &&
            (e.innerHTML = t.innerHTML))
        : "input" === n && zt.test(t.type)
        ? ((e.defaultChecked = e.checked = t.checked),
          e.value !== t.value && (e.value = t.value))
        : "option" === n
        ? (e.defaultSelected = e.selected = t.defaultSelected)
        : ("input" !== n && "textarea" !== n) ||
          (e.defaultValue = t.defaultValue);
    }
  }
  function T(t, e, n, i) {
    e = ot.apply([], e);
    var r,
      o,
      s,
      a,
      l,
      c,
      u = 0,
      h = t.length,
      d = h - 1,
      f = e[0],
      g = ft.isFunction(f);
    if (g || (h > 1 && "string" == typeof f && !ht.checkClone && se.test(f)))
      return t.each(function (r) {
        var o = t.eq(r);
        g && (e[0] = f.call(this, r, o.html())), T(o, e, n, i);
      });
    if (
      h &&
      ((r = (c = v(e, t[0].ownerDocument, !1, t, i)).firstChild),
      1 === c.childNodes.length && (c = r),
      r || i)
    ) {
      for (s = (a = ft.map(p(c, "script"), C)).length; u < h; u++)
        (o = c),
          u !== d &&
            ((o = ft.clone(o, !0, !0)), s && ft.merge(a, p(o, "script"))),
          n.call(t[u], o, u);
      if (s)
        for (l = a[a.length - 1].ownerDocument, ft.map(a, _), u = 0; u < s; u++)
          (o = a[u]),
            Wt.test(o.type || "") &&
              !ft._data(o, "globalEval") &&
              ft.contains(l, o) &&
              (o.src
                ? ft._evalUrl && ft._evalUrl(o.src)
                : ft.globalEval(
                    (o.text || o.textContent || o.innerHTML || "").replace(
                      le,
                      ""
                    )
                  ));
      c = r = null;
    }
    return t;
  }
  function j(t, e, n) {
    for (var i, r = e ? ft.filter(e, t) : t, o = 0; null != (i = r[o]); o++)
      n || 1 !== i.nodeType || ft.cleanData(p(i)),
        i.parentNode &&
          (n && ft.contains(i.ownerDocument, i) && g(p(i, "script")),
          i.parentNode.removeChild(i));
    return t;
  }
  function D(t, e) {
    var n = ft(e.createElement(t)).appendTo(e.body),
      i = ft.css(n[0], "display");
    return n.detach(), i;
  }
  function N(t) {
    var e = it,
      n = he[t];
    return (
      n ||
        (("none" !== (n = D(t, e)) && n) ||
          ((e = (
            (ue = (
              ue || ft("<iframe frameborder='0' width='0' height='0'/>")
            ).appendTo(e.documentElement))[0].contentWindow ||
            ue[0].contentDocument
          ).document).write(),
          e.close(),
          (n = D(t, e)),
          ue.detach()),
        (he[t] = n)),
      n
    );
  }
  function F(t, e) {
    return {
      get: function () {
        if (!t()) return (this.get = e).apply(this, arguments);
        delete this.get;
      },
    };
  }
  function A(t) {
    if (t in Ee) return t;
    for (var e = t.charAt(0).toUpperCase() + t.slice(1), n = Se.length; n--; )
      if ((t = Se[n] + e) in Ee) return t;
  }
  function $(t, e) {
    for (var n, i, r, o = [], s = 0, a = t.length; s < a; s++)
      (i = t[s]).style &&
        ((o[s] = ft._data(i, "olddisplay")),
        (n = i.style.display),
        e
          ? (o[s] || "none" !== n || (i.style.display = ""),
            "" === i.style.display &&
              Ht(i) &&
              (o[s] = ft._data(i, "olddisplay", N(i.nodeName))))
          : ((r = Ht(i)),
            ((n && "none" !== n) || !r) &&
              ft._data(i, "olddisplay", r ? n : ft.css(i, "display"))));
    for (s = 0; s < a; s++)
      (i = t[s]).style &&
        ((e && "none" !== i.style.display && "" !== i.style.display) ||
          (i.style.display = e ? o[s] || "" : "none"));
    return t;
  }
  function B(t, e, n) {
    var i = ke.exec(e);
    return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : e;
  }
  function P(t, e, n, i, r) {
    for (
      var o = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0,
        s = 0;
      o < 4;
      o += 2
    )
      "margin" === n && (s += ft.css(t, n + Ot[o], !0, r)),
        i
          ? ("content" === n && (s -= ft.css(t, "padding" + Ot[o], !0, r)),
            "margin" !== n &&
              (s -= ft.css(t, "border" + Ot[o] + "Width", !0, r)))
          : ((s += ft.css(t, "padding" + Ot[o], !0, r)),
            "padding" !== n &&
              (s += ft.css(t, "border" + Ot[o] + "Width", !0, r)));
    return s;
  }
  function M(t, e, n) {
    var i = !0,
      r = "width" === e ? t.offsetWidth : t.offsetHeight,
      o = me(t),
      s = ht.boxSizing && "border-box" === ft.css(t, "boxSizing", !1, o);
    if (r <= 0 || null == r) {
      if (
        (((r = ve(t, e, o)) < 0 || null == r) && (r = t.style[e]), fe.test(r))
      )
        return r;
      (i = s && (ht.boxSizingReliable() || r === t.style[e])),
        (r = parseFloat(r) || 0);
    }
    return r + P(t, e, n || (s ? "border" : "content"), i, o) + "px";
  }
  function L(t, e, n, i, r) {
    return new L.prototype.init(t, e, n, i, r);
  }
  function I() {
    return (
      t.setTimeout(function () {
        Te = undefined;
      }),
      (Te = ft.now())
    );
  }
  function q(t, e) {
    var n,
      i = { height: t },
      r = 0;
    for (e = e ? 1 : 0; r < 4; r += 2 - e)
      i["margin" + (n = Ot[r])] = i["padding" + n] = t;
    return e && (i.opacity = i.width = t), i;
  }
  function O(t, e, n) {
    for (
      var i,
        r = (z.tweeners[e] || []).concat(z.tweeners["*"]),
        o = 0,
        s = r.length;
      o < s;
      o++
    )
      if ((i = r[o].call(n, e, t))) return i;
  }
  function H(t, e, n) {
    var i,
      r,
      o,
      s,
      a,
      l,
      c,
      u = this,
      h = {},
      d = t.style,
      f = t.nodeType && Ht(t),
      p = ft._data(t, "fxshow");
    for (i in (n.queue ||
      (null == (a = ft._queueHooks(t, "fx")).unqueued &&
        ((a.unqueued = 0),
        (l = a.empty.fire),
        (a.empty.fire = function () {
          a.unqueued || l();
        })),
      a.unqueued++,
      u.always(function () {
        u.always(function () {
          a.unqueued--, ft.queue(t, "fx").length || a.empty.fire();
        });
      })),
    1 === t.nodeType &&
      ("height" in e || "width" in e) &&
      ((n.overflow = [d.overflow, d.overflowX, d.overflowY]),
      "inline" ===
        ("none" === (c = ft.css(t, "display"))
          ? ft._data(t, "olddisplay") || N(t.nodeName)
          : c) &&
        "none" === ft.css(t, "float") &&
        (ht.inlineBlockNeedsLayout && "inline" !== N(t.nodeName)
          ? (d.zoom = 1)
          : (d.display = "inline-block"))),
    n.overflow &&
      ((d.overflow = "hidden"),
      ht.shrinkWrapBlocks() ||
        u.always(function () {
          (d.overflow = n.overflow[0]),
            (d.overflowX = n.overflow[1]),
            (d.overflowY = n.overflow[2]);
        })),
    e))
      if (((r = e[i]), De.exec(r))) {
        if (
          (delete e[i], (o = o || "toggle" === r), r === (f ? "hide" : "show"))
        ) {
          if ("show" !== r || !p || p[i] === undefined) continue;
          f = !0;
        }
        h[i] = (p && p[i]) || ft.style(t, i);
      } else c = undefined;
    if (ft.isEmptyObject(h))
      "inline" === ("none" === c ? N(t.nodeName) : c) && (d.display = c);
    else
      for (i in (p
        ? "hidden" in p && (f = p.hidden)
        : (p = ft._data(t, "fxshow", {})),
      o && (p.hidden = !f),
      f
        ? ft(t).show()
        : u.done(function () {
            ft(t).hide();
          }),
      u.done(function () {
        var e;
        for (e in (ft._removeData(t, "fxshow"), h)) ft.style(t, e, h[e]);
      }),
      h))
        (s = O(f ? p[i] : 0, i, u)),
          i in p ||
            ((p[i] = s.start),
            f &&
              ((s.end = s.start),
              (s.start = "width" === i || "height" === i ? 1 : 0)));
  }
  function R(t, e) {
    var n, i, r, o, s;
    for (n in t)
      if (
        ((r = e[(i = ft.camelCase(n))]),
        (o = t[n]),
        ft.isArray(o) && ((r = o[1]), (o = t[n] = o[0])),
        n !== i && ((t[i] = o), delete t[n]),
        (s = ft.cssHooks[i]) && "expand" in s)
      )
        for (n in ((o = s.expand(o)), delete t[i], o))
          n in t || ((t[n] = o[n]), (e[n] = r));
      else e[i] = r;
  }
  function z(t, e, n) {
    var i,
      r,
      o = 0,
      s = z.prefilters.length,
      a = ft.Deferred().always(function () {
        delete l.elem;
      }),
      l = function () {
        if (r) return !1;
        for (
          var e = Te || I(),
            n = Math.max(0, c.startTime + c.duration - e),
            i = 1 - (n / c.duration || 0),
            o = 0,
            s = c.tweens.length;
          o < s;
          o++
        )
          c.tweens[o].run(i);
        return (
          a.notifyWith(t, [c, i, n]),
          i < 1 && s ? n : (a.resolveWith(t, [c]), !1)
        );
      },
      c = a.promise({
        elem: t,
        props: ft.extend({}, e),
        opts: ft.extend(
          !0,
          { specialEasing: {}, easing: ft.easing._default },
          n
        ),
        originalProperties: e,
        originalOptions: n,
        startTime: Te || I(),
        duration: n.duration,
        tweens: [],
        createTween: function (e, n) {
          var i = ft.Tween(
            t,
            c.opts,
            e,
            n,
            c.opts.specialEasing[e] || c.opts.easing
          );
          return c.tweens.push(i), i;
        },
        stop: function (e) {
          var n = 0,
            i = e ? c.tweens.length : 0;
          if (r) return this;
          for (r = !0; n < i; n++) c.tweens[n].run(1);
          return (
            e
              ? (a.notifyWith(t, [c, 1, 0]), a.resolveWith(t, [c, e]))
              : a.rejectWith(t, [c, e]),
            this
          );
        },
      }),
      u = c.props;
    for (R(u, c.opts.specialEasing); o < s; o++)
      if ((i = z.prefilters[o].call(c, t, u, c.opts)))
        return (
          ft.isFunction(i.stop) &&
            (ft._queueHooks(c.elem, c.opts.queue).stop = ft.proxy(i.stop, i)),
          i
        );
    return (
      ft.map(u, O, c),
      ft.isFunction(c.opts.start) && c.opts.start.call(t, c),
      ft.fx.timer(ft.extend(l, { elem: t, anim: c, queue: c.opts.queue })),
      c
        .progress(c.opts.progress)
        .done(c.opts.done, c.opts.complete)
        .fail(c.opts.fail)
        .always(c.opts.always)
    );
  }
  function V(t) {
    return ft.attr(t, "class") || "";
  }
  function W(t) {
    return function (e, n) {
      "string" != typeof e && ((n = e), (e = "*"));
      var i,
        r = 0,
        o = e.toLowerCase().match(Nt) || [];
      if (ft.isFunction(n))
        for (; (i = o[r++]); )
          "+" === i.charAt(0)
            ? ((i = i.slice(1) || "*"), (t[i] = t[i] || []).unshift(n))
            : (t[i] = t[i] || []).push(n);
    };
  }
  function U(t, e, n, i) {
    function r(a) {
      var l;
      return (
        (o[a] = !0),
        ft.each(t[a] || [], function (t, a) {
          var c = a(e, n, i);
          return "string" != typeof c || s || o[c]
            ? s
              ? !(l = c)
              : void 0
            : (e.dataTypes.unshift(c), r(c), !1);
        }),
        l
      );
    }
    var o = {},
      s = t === tn;
    return r(e.dataTypes[0]) || (!o["*"] && r("*"));
  }
  function K(t, e) {
    var n,
      i,
      r = ft.ajaxSettings.flatOptions || {};
    for (i in e) e[i] !== undefined && ((r[i] ? t : n || (n = {}))[i] = e[i]);
    return n && ft.extend(!0, t, n), t;
  }
  function X(t, e, n) {
    for (var i, r, o, s, a = t.contents, l = t.dataTypes; "*" === l[0]; )
      l.shift(),
        r === undefined &&
          (r = t.mimeType || e.getResponseHeader("Content-Type"));
    if (r)
      for (s in a)
        if (a[s] && a[s].test(r)) {
          l.unshift(s);
          break;
        }
    if (l[0] in n) o = l[0];
    else {
      for (s in n) {
        if (!l[0] || t.converters[s + " " + l[0]]) {
          o = s;
          break;
        }
        i || (i = s);
      }
      o = o || i;
    }
    if (o) return o !== l[0] && l.unshift(o), n[o];
  }
  function G(t, e, n, i) {
    var r,
      o,
      s,
      a,
      l,
      c = {},
      u = t.dataTypes.slice();
    if (u[1]) for (s in t.converters) c[s.toLowerCase()] = t.converters[s];
    for (o = u.shift(); o; )
      if (
        (t.responseFields[o] && (n[t.responseFields[o]] = e),
        !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)),
        (l = o),
        (o = u.shift()))
      )
        if ("*" === o) o = l;
        else if ("*" !== l && l !== o) {
          if (!(s = c[l + " " + o] || c["* " + o]))
            for (r in c)
              if (
                (a = r.split(" "))[1] === o &&
                (s = c[l + " " + a[0]] || c["* " + a[0]])
              ) {
                !0 === s
                  ? (s = c[r])
                  : !0 !== c[r] && ((o = a[0]), u.unshift(a[1]));
                break;
              }
          if (!0 !== s)
            if (s && t.throws) e = s(e);
            else
              try {
                e = s(e);
              } catch (h) {
                return {
                  state: "parsererror",
                  error: s ? h : "No conversion from " + l + " to " + o,
                };
              }
        }
    return { state: "success", data: e };
  }
  function Y(t) {
    return (t.style && t.style.display) || ft.css(t, "display");
  }
  function Q(t) {
    if (!ft.contains(t.ownerDocument || it, t)) return !0;
    for (; t && 1 === t.nodeType; ) {
      if ("none" === Y(t) || "hidden" === t.type) return !0;
      t = t.parentNode;
    }
    return !1;
  }
  function J(t, e, n, i) {
    var r;
    if (ft.isArray(e))
      ft.each(e, function (e, r) {
        n || sn.test(t)
          ? i(t, r)
          : J(
              t + "[" + ("object" == typeof r && null != r ? e : "") + "]",
              r,
              n,
              i
            );
      });
    else if (n || "object" !== ft.type(e)) i(t, e);
    else for (r in e) J(t + "[" + r + "]", e[r], n, i);
  }
  function Z() {
    try {
      return new t.XMLHttpRequest();
    } catch (e) {}
  }
  function tt() {
    try {
      return new t.ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
  }
  function et(t) {
    return ft.isWindow(t)
      ? t
      : 9 === t.nodeType && (t.defaultView || t.parentWindow);
  }
  var nt = [],
    it = t.document,
    rt = nt.slice,
    ot = nt.concat,
    st = nt.push,
    at = nt.indexOf,
    lt = {},
    ct = lt.toString,
    ut = lt.hasOwnProperty,
    ht = {},
    dt = "1.12.4",
    ft = function (t, e) {
      return new ft.fn.init(t, e);
    },
    pt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    gt = /^-ms-/,
    mt = /-([\da-z])/gi,
    vt = function (t, e) {
      return e.toUpperCase();
    };
  (ft.fn = ft.prototype =
    {
      jquery: dt,
      constructor: ft,
      selector: "",
      length: 0,
      toArray: function () {
        return rt.call(this);
      },
      get: function (t) {
        return null != t
          ? t < 0
            ? this[t + this.length]
            : this[t]
          : rt.call(this);
      },
      pushStack: function (t) {
        var e = ft.merge(this.constructor(), t);
        return (e.prevObject = this), (e.context = this.context), e;
      },
      each: function (t) {
        return ft.each(this, t);
      },
      map: function (t) {
        return this.pushStack(
          ft.map(this, function (e, n) {
            return t.call(e, n, e);
          })
        );
      },
      slice: function () {
        return this.pushStack(rt.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      eq: function (t) {
        var e = this.length,
          n = +t + (t < 0 ? e : 0);
        return this.pushStack(n >= 0 && n < e ? [this[n]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor();
      },
      push: st,
      sort: nt.sort,
      splice: nt.splice,
    }),
    (ft.extend = ft.fn.extend =
      function () {
        var t,
          e,
          n,
          i,
          r,
          o,
          s = arguments[0] || {},
          a = 1,
          l = arguments.length,
          c = !1;
        for (
          "boolean" == typeof s && ((c = s), (s = arguments[a] || {}), a++),
            "object" == typeof s || ft.isFunction(s) || (s = {}),
            a === l && ((s = this), a--);
          a < l;
          a++
        )
          if (null != (r = arguments[a]))
            for (i in r)
              (t = s[i]),
                s !== (n = r[i]) &&
                  (c && n && (ft.isPlainObject(n) || (e = ft.isArray(n)))
                    ? (e
                        ? ((e = !1), (o = t && ft.isArray(t) ? t : []))
                        : (o = t && ft.isPlainObject(t) ? t : {}),
                      (s[i] = ft.extend(c, o, n)))
                    : n !== undefined && (s[i] = n));
        return s;
      }),
    ft.extend({
      expando: "jQuery" + (dt + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (t) {
        throw new Error(t);
      },
      noop: function () {},
      isFunction: function (t) {
        return "function" === ft.type(t);
      },
      isArray:
        Array.isArray ||
        function (t) {
          return "array" === ft.type(t);
        },
      isWindow: function (t) {
        return null != t && t == t.window;
      },
      isNumeric: function (t) {
        var e = t && t.toString();
        return !ft.isArray(t) && e - parseFloat(e) + 1 >= 0;
      },
      isEmptyObject: function (t) {
        var e;
        for (e in t) return !1;
        return !0;
      },
      isPlainObject: function (t) {
        var e;
        if (!t || "object" !== ft.type(t) || t.nodeType || ft.isWindow(t))
          return !1;
        try {
          if (
            t.constructor &&
            !ut.call(t, "constructor") &&
            !ut.call(t.constructor.prototype, "isPrototypeOf")
          )
            return !1;
        } catch (n) {
          return !1;
        }
        if (!ht.ownFirst) for (e in t) return ut.call(t, e);
        for (e in t);
        return e === undefined || ut.call(t, e);
      },
      type: function (t) {
        return null == t
          ? t + ""
          : "object" == typeof t || "function" == typeof t
          ? lt[ct.call(t)] || "object"
          : typeof t;
      },
      globalEval: function (e) {
        e &&
          ft.trim(e) &&
          (
            t.execScript ||
            function (e) {
              t.eval.call(t, e);
            }
          )(e);
      },
      camelCase: function (t) {
        return t.replace(gt, "ms-").replace(mt, vt);
      },
      nodeName: function (t, e) {
        return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
      },
      each: function (t, e) {
        var i,
          r = 0;
        if (n(t))
          for (i = t.length; r < i && !1 !== e.call(t[r], r, t[r]); r++);
        else for (r in t) if (!1 === e.call(t[r], r, t[r])) break;
        return t;
      },
      trim: function (t) {
        return null == t ? "" : (t + "").replace(pt, "");
      },
      makeArray: function (t, e) {
        var i = e || [];
        return (
          null != t &&
            (n(Object(t))
              ? ft.merge(i, "string" == typeof t ? [t] : t)
              : st.call(i, t)),
          i
        );
      },
      inArray: function (t, e, n) {
        var i;
        if (e) {
          if (at) return at.call(e, t, n);
          for (
            i = e.length, n = n ? (n < 0 ? Math.max(0, i + n) : n) : 0;
            n < i;
            n++
          )
            if (n in e && e[n] === t) return n;
        }
        return -1;
      },
      merge: function (t, e) {
        for (var n = +e.length, i = 0, r = t.length; i < n; ) t[r++] = e[i++];
        if (n != n) for (; e[i] !== undefined; ) t[r++] = e[i++];
        return (t.length = r), t;
      },
      grep: function (t, e, n) {
        for (var i = [], r = 0, o = t.length, s = !n; r < o; r++)
          !e(t[r], r) !== s && i.push(t[r]);
        return i;
      },
      map: function (t, e, i) {
        var r,
          o,
          s = 0,
          a = [];
        if (n(t))
          for (r = t.length; s < r; s++)
            null != (o = e(t[s], s, i)) && a.push(o);
        else for (s in t) null != (o = e(t[s], s, i)) && a.push(o);
        return ot.apply([], a);
      },
      guid: 1,
      proxy: function (t, e) {
        var n, i, r;
        return (
          "string" == typeof e && ((r = t[e]), (e = t), (t = r)),
          ft.isFunction(t)
            ? ((n = rt.call(arguments, 2)),
              ((i = function () {
                return t.apply(e || this, n.concat(rt.call(arguments)));
              }).guid = t.guid =
                t.guid || ft.guid++),
              i)
            : undefined
        );
      },
      now: function () {
        return +new Date();
      },
      support: ht,
    }),
    "function" == typeof Symbol &&
      (ft.fn[Symbol.iterator] = nt[Symbol.iterator]),
    ft.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
        " "
      ),
      function (t, e) {
        lt["[object " + e + "]"] = e.toLowerCase();
      }
    );
  var yt =
    /*!
     * Sizzle CSS Selector Engine v2.2.1
     * http://sizzlejs.com/
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: 2015-10-17
     */
    (function (t) {
      function e(t, e, n, i) {
        var r,
          o,
          s,
          a,
          l,
          c,
          h,
          f,
          p = e && e.ownerDocument,
          g = e ? e.nodeType : 9;
        if (
          ((n = n || []),
          "string" != typeof t || !t || (1 !== g && 9 !== g && 11 !== g))
        )
          return n;
        if (
          !i &&
          ((e ? e.ownerDocument || e : O) !== A && F(e), (e = e || A), B)
        ) {
          if (11 !== g && (c = vt.exec(t)))
            if ((r = c[1])) {
              if (9 === g) {
                if (!(s = e.getElementById(r))) return n;
                if (s.id === r) return n.push(s), n;
              } else if (
                p &&
                (s = p.getElementById(r)) &&
                I(e, s) &&
                s.id === r
              )
                return n.push(s), n;
            } else {
              if (c[2]) return J.apply(n, e.getElementsByTagName(t)), n;
              if (
                (r = c[3]) &&
                w.getElementsByClassName &&
                e.getElementsByClassName
              )
                return J.apply(n, e.getElementsByClassName(r)), n;
            }
          if (w.qsa && !W[t + " "] && (!P || !P.test(t))) {
            if (1 !== g) (p = e), (f = t);
            else if ("object" !== e.nodeName.toLowerCase()) {
              for (
                (a = e.getAttribute("id"))
                  ? (a = a.replace(bt, "\\$&"))
                  : e.setAttribute("id", (a = q)),
                  o = (h = S(t)).length,
                  l = dt.test(a) ? "#" + a : "[id='" + a + "']";
                o--;

              )
                h[o] = l + " " + d(h[o]);
              (f = h.join(",")), (p = (yt.test(t) && u(e.parentNode)) || e);
            }
            if (f)
              try {
                return J.apply(n, p.querySelectorAll(f)), n;
              } catch (m) {
              } finally {
                a === q && e.removeAttribute("id");
              }
          }
        }
        return T(t.replace(at, "$1"), e, n, i);
      }
      function n() {
        function t(n, i) {
          return (
            e.push(n + " ") > k.cacheLength && delete t[e.shift()],
            (t[n + " "] = i)
          );
        }
        var e = [];
        return t;
      }
      function i(t) {
        return (t[q] = !0), t;
      }
      function r(t) {
        var e = A.createElement("div");
        try {
          return !!t(e);
        } catch (n) {
          return !1;
        } finally {
          e.parentNode && e.parentNode.removeChild(e), (e = null);
        }
      }
      function o(t, e) {
        for (var n = t.split("|"), i = n.length; i--; ) k.attrHandle[n[i]] = e;
      }
      function s(t, e) {
        var n = e && t,
          i =
            n &&
            1 === t.nodeType &&
            1 === e.nodeType &&
            (~e.sourceIndex || K) - (~t.sourceIndex || K);
        if (i) return i;
        if (n) for (; (n = n.nextSibling); ) if (n === e) return -1;
        return t ? 1 : -1;
      }
      function a(t) {
        return function (e) {
          return "input" === e.nodeName.toLowerCase() && e.type === t;
        };
      }
      function l(t) {
        return function (e) {
          var n = e.nodeName.toLowerCase();
          return ("input" === n || "button" === n) && e.type === t;
        };
      }
      function c(t) {
        return i(function (e) {
          return (
            (e = +e),
            i(function (n, i) {
              for (var r, o = t([], n.length, e), s = o.length; s--; )
                n[(r = o[s])] && (n[r] = !(i[r] = n[r]));
            })
          );
        });
      }
      function u(t) {
        return t && "undefined" != typeof t.getElementsByTagName && t;
      }
      function h() {}
      function d(t) {
        for (var e = 0, n = t.length, i = ""; e < n; e++) i += t[e].value;
        return i;
      }
      function f(t, e, n) {
        var i = e.dir,
          r = n && "parentNode" === i,
          o = R++;
        return e.first
          ? function (e, n, o) {
              for (; (e = e[i]); ) if (1 === e.nodeType || r) return t(e, n, o);
            }
          : function (e, n, s) {
              var a,
                l,
                c,
                u = [H, o];
              if (s) {
                for (; (e = e[i]); )
                  if ((1 === e.nodeType || r) && t(e, n, s)) return !0;
              } else
                for (; (e = e[i]); )
                  if (1 === e.nodeType || r) {
                    if (
                      (a = (l =
                        (c = e[q] || (e[q] = {}))[e.uniqueID] ||
                        (c[e.uniqueID] = {}))[i]) &&
                      a[0] === H &&
                      a[1] === o
                    )
                      return (u[2] = a[2]);
                    if (((l[i] = u), (u[2] = t(e, n, s)))) return !0;
                  }
            };
      }
      function p(t) {
        return t.length > 1
          ? function (e, n, i) {
              for (var r = t.length; r--; ) if (!t[r](e, n, i)) return !1;
              return !0;
            }
          : t[0];
      }
      function g(t, n, i) {
        for (var r = 0, o = n.length; r < o; r++) e(t, n[r], i);
        return i;
      }
      function m(t, e, n, i, r) {
        for (var o, s = [], a = 0, l = t.length, c = null != e; a < l; a++)
          (o = t[a]) && ((n && !n(o, i, r)) || (s.push(o), c && e.push(a)));
        return s;
      }
      function v(t, e, n, r, o, s) {
        return (
          r && !r[q] && (r = v(r)),
          o && !o[q] && (o = v(o, s)),
          i(function (i, s, a, l) {
            var c,
              u,
              h,
              d = [],
              f = [],
              p = s.length,
              v = i || g(e || "*", a.nodeType ? [a] : a, []),
              y = !t || (!i && e) ? v : m(v, d, t, a, l),
              b = n ? (o || (i ? t : p || r) ? [] : s) : y;
            if ((n && n(y, b, a, l), r))
              for (c = m(b, f), r(c, [], a, l), u = c.length; u--; )
                (h = c[u]) && (b[f[u]] = !(y[f[u]] = h));
            if (i) {
              if (o || t) {
                if (o) {
                  for (c = [], u = b.length; u--; )
                    (h = b[u]) && c.push((y[u] = h));
                  o(null, (b = []), c, l);
                }
                for (u = b.length; u--; )
                  (h = b[u]) &&
                    (c = o ? tt(i, h) : d[u]) > -1 &&
                    (i[c] = !(s[c] = h));
              }
            } else (b = m(b === s ? b.splice(p, b.length) : b)), o ? o(null, s, b, l) : J.apply(s, b);
          })
        );
      }
      function y(t) {
        for (
          var e,
            n,
            i,
            r = t.length,
            o = k.relative[t[0].type],
            s = o || k.relative[" "],
            a = o ? 1 : 0,
            l = f(
              function (t) {
                return t === e;
              },
              s,
              !0
            ),
            c = f(
              function (t) {
                return tt(e, t) > -1;
              },
              s,
              !0
            ),
            u = [
              function (t, n, i) {
                var r =
                  (!o && (i || n !== j)) ||
                  ((e = n).nodeType ? l(t, n, i) : c(t, n, i));
                return (e = null), r;
              },
            ];
          a < r;
          a++
        )
          if ((n = k.relative[t[a].type])) u = [f(p(u), n)];
          else {
            if ((n = k.filter[t[a].type].apply(null, t[a].matches))[q]) {
              for (i = ++a; i < r && !k.relative[t[i].type]; i++);
              return v(
                a > 1 && p(u),
                a > 1 &&
                  d(
                    t
                      .slice(0, a - 1)
                      .concat({ value: " " === t[a - 2].type ? "*" : "" })
                  ).replace(at, "$1"),
                n,
                a < i && y(t.slice(a, i)),
                i < r && y((t = t.slice(i))),
                i < r && d(t)
              );
            }
            u.push(n);
          }
        return p(u);
      }
      function b(t, n) {
        var r = n.length > 0,
          o = t.length > 0,
          s = function (i, s, a, l, c) {
            var u,
              h,
              d,
              f = 0,
              p = "0",
              g = i && [],
              v = [],
              y = j,
              b = i || (o && k.find.TAG("*", c)),
              x = (H += null == y ? 1 : Math.random() || 0.1),
              w = b.length;
            for (
              c && (j = s === A || s || c);
              p !== w && null != (u = b[p]);
              p++
            ) {
              if (o && u) {
                for (
                  h = 0, s || u.ownerDocument === A || (F(u), (a = !B));
                  (d = t[h++]);

                )
                  if (d(u, s || A, a)) {
                    l.push(u);
                    break;
                  }
                c && (H = x);
              }
              r && ((u = !d && u) && f--, i && g.push(u));
            }
            if (((f += p), r && p !== f)) {
              for (h = 0; (d = n[h++]); ) d(g, v, s, a);
              if (i) {
                if (f > 0) for (; p--; ) g[p] || v[p] || (v[p] = Y.call(l));
                v = m(v);
              }
              J.apply(l, v),
                c && !i && v.length > 0 && f + n.length > 1 && e.uniqueSort(l);
            }
            return c && ((H = x), (j = y)), g;
          };
        return r ? i(s) : s;
      }
      var x,
        w,
        k,
        C,
        _,
        S,
        E,
        T,
        j,
        D,
        N,
        F,
        A,
        $,
        B,
        P,
        M,
        L,
        I,
        q = "sizzle" + 1 * new Date(),
        O = t.document,
        H = 0,
        R = 0,
        z = n(),
        V = n(),
        W = n(),
        U = function (t, e) {
          return t === e && (N = !0), 0;
        },
        K = 1 << 31,
        X = {}.hasOwnProperty,
        G = [],
        Y = G.pop,
        Q = G.push,
        J = G.push,
        Z = G.slice,
        tt = function (t, e) {
          for (var n = 0, i = t.length; n < i; n++) if (t[n] === e) return n;
          return -1;
        },
        et =
          "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        nt = "[\\x20\\t\\r\\n\\f]",
        it = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        rt =
          "\\[" +
          nt +
          "*(" +
          it +
          ")(?:" +
          nt +
          "*([*^$|!~]?=)" +
          nt +
          "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
          it +
          "))|)" +
          nt +
          "*\\]",
        ot =
          ":(" +
          it +
          ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
          rt +
          ")*)|.*)\\)|)",
        st = new RegExp(nt + "+", "g"),
        at = new RegExp(
          "^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$",
          "g"
        ),
        lt = new RegExp("^" + nt + "*," + nt + "*"),
        ct = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
        ut = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"),
        ht = new RegExp(ot),
        dt = new RegExp("^" + it + "$"),
        ft = {
          ID: new RegExp("^#(" + it + ")"),
          CLASS: new RegExp("^\\.(" + it + ")"),
          TAG: new RegExp("^(" + it + "|[*])"),
          ATTR: new RegExp("^" + rt),
          PSEUDO: new RegExp("^" + ot),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
              nt +
              "*(even|odd|(([+-]|)(\\d*)n|)" +
              nt +
              "*(?:([+-]|)" +
              nt +
              "*(\\d+)|))" +
              nt +
              "*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + et + ")$", "i"),
          needsContext: new RegExp(
            "^" +
              nt +
              "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              nt +
              "*((?:-\\d)?\\d*)" +
              nt +
              "*\\)|)(?=[^-]|$)",
            "i"
          ),
        },
        pt = /^(?:input|select|textarea|button)$/i,
        gt = /^h\d$/i,
        mt = /^[^{]+\{\s*\[native \w/,
        vt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        yt = /[+~]/,
        bt = /'|\\/g,
        xt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"),
        wt = function (t, e, n) {
          var i = "0x" + e - 65536;
          return i != i || n
            ? e
            : i < 0
            ? String.fromCharCode(i + 65536)
            : String.fromCharCode((i >> 10) | 55296, (1023 & i) | 56320);
        },
        kt = function () {
          F();
        };
      try {
        J.apply((G = Z.call(O.childNodes)), O.childNodes),
          G[O.childNodes.length].nodeType;
      } catch (Ct) {
        J = {
          apply: G.length
            ? function (t, e) {
                Q.apply(t, Z.call(e));
              }
            : function (t, e) {
                for (var n = t.length, i = 0; (t[n++] = e[i++]); );
                t.length = n - 1;
              },
        };
      }
      for (x in ((w = e.support = {}),
      (_ = e.isXML =
        function (t) {
          var e = t && (t.ownerDocument || t).documentElement;
          return !!e && "HTML" !== e.nodeName;
        }),
      (F = e.setDocument =
        function (t) {
          var e,
            n,
            i = t ? t.ownerDocument || t : O;
          return i !== A && 9 === i.nodeType && i.documentElement
            ? (($ = (A = i).documentElement),
              (B = !_(A)),
              (n = A.defaultView) &&
                n.top !== n &&
                (n.addEventListener
                  ? n.addEventListener("unload", kt, !1)
                  : n.attachEvent && n.attachEvent("onunload", kt)),
              (w.attributes = r(function (t) {
                return (t.className = "i"), !t.getAttribute("className");
              })),
              (w.getElementsByTagName = r(function (t) {
                return (
                  t.appendChild(A.createComment("")),
                  !t.getElementsByTagName("*").length
                );
              })),
              (w.getElementsByClassName = mt.test(A.getElementsByClassName)),
              (w.getById = r(function (t) {
                return (
                  ($.appendChild(t).id = q),
                  !A.getElementsByName || !A.getElementsByName(q).length
                );
              })),
              w.getById
                ? ((k.find.ID = function (t, e) {
                    if ("undefined" != typeof e.getElementById && B) {
                      var n = e.getElementById(t);
                      return n ? [n] : [];
                    }
                  }),
                  (k.filter.ID = function (t) {
                    var e = t.replace(xt, wt);
                    return function (t) {
                      return t.getAttribute("id") === e;
                    };
                  }))
                : (delete k.find.ID,
                  (k.filter.ID = function (t) {
                    var e = t.replace(xt, wt);
                    return function (t) {
                      var n =
                        "undefined" != typeof t.getAttributeNode &&
                        t.getAttributeNode("id");
                      return n && n.value === e;
                    };
                  })),
              (k.find.TAG = w.getElementsByTagName
                ? function (t, e) {
                    return "undefined" != typeof e.getElementsByTagName
                      ? e.getElementsByTagName(t)
                      : w.qsa
                      ? e.querySelectorAll(t)
                      : void 0;
                  }
                : function (t, e) {
                    var n,
                      i = [],
                      r = 0,
                      o = e.getElementsByTagName(t);
                    if ("*" === t) {
                      for (; (n = o[r++]); ) 1 === n.nodeType && i.push(n);
                      return i;
                    }
                    return o;
                  }),
              (k.find.CLASS =
                w.getElementsByClassName &&
                function (t, e) {
                  if ("undefined" != typeof e.getElementsByClassName && B)
                    return e.getElementsByClassName(t);
                }),
              (M = []),
              (P = []),
              (w.qsa = mt.test(A.querySelectorAll)) &&
                (r(function (t) {
                  ($.appendChild(t).innerHTML =
                    "<a id='" +
                    q +
                    "'></a><select id='" +
                    q +
                    "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                    t.querySelectorAll("[msallowcapture^='']").length &&
                      P.push("[*^$]=" + nt + "*(?:''|\"\")"),
                    t.querySelectorAll("[selected]").length ||
                      P.push("\\[" + nt + "*(?:value|" + et + ")"),
                    t.querySelectorAll("[id~=" + q + "-]").length ||
                      P.push("~="),
                    t.querySelectorAll(":checked").length || P.push(":checked"),
                    t.querySelectorAll("a#" + q + "+*").length ||
                      P.push(".#.+[+~]");
                }),
                r(function (t) {
                  var e = A.createElement("input");
                  e.setAttribute("type", "hidden"),
                    t.appendChild(e).setAttribute("name", "D"),
                    t.querySelectorAll("[name=d]").length &&
                      P.push("name" + nt + "*[*^$|!~]?="),
                    t.querySelectorAll(":enabled").length ||
                      P.push(":enabled", ":disabled"),
                    t.querySelectorAll("*,:x"),
                    P.push(",.*:");
                })),
              (w.matchesSelector = mt.test(
                (L =
                  $.matches ||
                  $.webkitMatchesSelector ||
                  $.mozMatchesSelector ||
                  $.oMatchesSelector ||
                  $.msMatchesSelector)
              )) &&
                r(function (t) {
                  (w.disconnectedMatch = L.call(t, "div")),
                    L.call(t, "[s!='']:x"),
                    M.push("!=", ot);
                }),
              (P = P.length && new RegExp(P.join("|"))),
              (M = M.length && new RegExp(M.join("|"))),
              (e = mt.test($.compareDocumentPosition)),
              (I =
                e || mt.test($.contains)
                  ? function (t, e) {
                      var n = 9 === t.nodeType ? t.documentElement : t,
                        i = e && e.parentNode;
                      return (
                        t === i ||
                        !(
                          !i ||
                          1 !== i.nodeType ||
                          !(n.contains
                            ? n.contains(i)
                            : t.compareDocumentPosition &&
                              16 & t.compareDocumentPosition(i))
                        )
                      );
                    }
                  : function (t, e) {
                      if (e)
                        for (; (e = e.parentNode); ) if (e === t) return !0;
                      return !1;
                    }),
              (U = e
                ? function (t, e) {
                    if (t === e) return (N = !0), 0;
                    var n =
                      !t.compareDocumentPosition - !e.compareDocumentPosition;
                    return (
                      n ||
                      (1 &
                        (n =
                          (t.ownerDocument || t) === (e.ownerDocument || e)
                            ? t.compareDocumentPosition(e)
                            : 1) ||
                      (!w.sortDetached && e.compareDocumentPosition(t) === n)
                        ? t === A || (t.ownerDocument === O && I(O, t))
                          ? -1
                          : e === A || (e.ownerDocument === O && I(O, e))
                          ? 1
                          : D
                          ? tt(D, t) - tt(D, e)
                          : 0
                        : 4 & n
                        ? -1
                        : 1)
                    );
                  }
                : function (t, e) {
                    if (t === e) return (N = !0), 0;
                    var n,
                      i = 0,
                      r = t.parentNode,
                      o = e.parentNode,
                      a = [t],
                      l = [e];
                    if (!r || !o)
                      return t === A
                        ? -1
                        : e === A
                        ? 1
                        : r
                        ? -1
                        : o
                        ? 1
                        : D
                        ? tt(D, t) - tt(D, e)
                        : 0;
                    if (r === o) return s(t, e);
                    for (n = t; (n = n.parentNode); ) a.unshift(n);
                    for (n = e; (n = n.parentNode); ) l.unshift(n);
                    for (; a[i] === l[i]; ) i++;
                    return i
                      ? s(a[i], l[i])
                      : a[i] === O
                      ? -1
                      : l[i] === O
                      ? 1
                      : 0;
                  }),
              A)
            : A;
        }),
      (e.matches = function (t, n) {
        return e(t, null, null, n);
      }),
      (e.matchesSelector = function (t, n) {
        if (
          ((t.ownerDocument || t) !== A && F(t),
          (n = n.replace(ut, "='$1']")),
          w.matchesSelector &&
            B &&
            !W[n + " "] &&
            (!M || !M.test(n)) &&
            (!P || !P.test(n)))
        )
          try {
            var i = L.call(t, n);
            if (
              i ||
              w.disconnectedMatch ||
              (t.document && 11 !== t.document.nodeType)
            )
              return i;
          } catch (Ct) {}
        return e(n, A, null, [t]).length > 0;
      }),
      (e.contains = function (t, e) {
        return (t.ownerDocument || t) !== A && F(t), I(t, e);
      }),
      (e.attr = function (t, e) {
        (t.ownerDocument || t) !== A && F(t);
        var n = k.attrHandle[e.toLowerCase()],
          i =
            n && X.call(k.attrHandle, e.toLowerCase())
              ? n(t, e, !B)
              : undefined;
        return i !== undefined
          ? i
          : w.attributes || !B
          ? t.getAttribute(e)
          : (i = t.getAttributeNode(e)) && i.specified
          ? i.value
          : null;
      }),
      (e.error = function (t) {
        throw new Error("Syntax error, unrecognized expression: " + t);
      }),
      (e.uniqueSort = function (t) {
        var e,
          n = [],
          i = 0,
          r = 0;
        if (
          ((N = !w.detectDuplicates),
          (D = !w.sortStable && t.slice(0)),
          t.sort(U),
          N)
        ) {
          for (; (e = t[r++]); ) e === t[r] && (i = n.push(r));
          for (; i--; ) t.splice(n[i], 1);
        }
        return (D = null), t;
      }),
      (C = e.getText =
        function (t) {
          var e,
            n = "",
            i = 0,
            r = t.nodeType;
          if (r) {
            if (1 === r || 9 === r || 11 === r) {
              if ("string" == typeof t.textContent) return t.textContent;
              for (t = t.firstChild; t; t = t.nextSibling) n += C(t);
            } else if (3 === r || 4 === r) return t.nodeValue;
          } else for (; (e = t[i++]); ) n += C(e);
          return n;
        }),
      ((k = e.selectors =
        {
          cacheLength: 50,
          createPseudo: i,
          match: ft,
          attrHandle: {},
          find: {},
          relative: {
            ">": { dir: "parentNode", first: !0 },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: !0 },
            "~": { dir: "previousSibling" },
          },
          preFilter: {
            ATTR: function (t) {
              return (
                (t[1] = t[1].replace(xt, wt)),
                (t[3] = (t[3] || t[4] || t[5] || "").replace(xt, wt)),
                "~=" === t[2] && (t[3] = " " + t[3] + " "),
                t.slice(0, 4)
              );
            },
            CHILD: function (t) {
              return (
                (t[1] = t[1].toLowerCase()),
                "nth" === t[1].slice(0, 3)
                  ? (t[3] || e.error(t[0]),
                    (t[4] = +(t[4]
                      ? t[5] + (t[6] || 1)
                      : 2 * ("even" === t[3] || "odd" === t[3]))),
                    (t[5] = +(t[7] + t[8] || "odd" === t[3])))
                  : t[3] && e.error(t[0]),
                t
              );
            },
            PSEUDO: function (t) {
              var e,
                n = !t[6] && t[2];
              return ft.CHILD.test(t[0])
                ? null
                : (t[3]
                    ? (t[2] = t[4] || t[5] || "")
                    : n &&
                      ht.test(n) &&
                      (e = S(n, !0)) &&
                      (e = n.indexOf(")", n.length - e) - n.length) &&
                      ((t[0] = t[0].slice(0, e)), (t[2] = n.slice(0, e))),
                  t.slice(0, 3));
            },
          },
          filter: {
            TAG: function (t) {
              var e = t.replace(xt, wt).toLowerCase();
              return "*" === t
                ? function () {
                    return !0;
                  }
                : function (t) {
                    return t.nodeName && t.nodeName.toLowerCase() === e;
                  };
            },
            CLASS: function (t) {
              var e = z[t + " "];
              return (
                e ||
                ((e = new RegExp("(^|" + nt + ")" + t + "(" + nt + "|$)")) &&
                  z(t, function (t) {
                    return e.test(
                      ("string" == typeof t.className && t.className) ||
                        ("undefined" != typeof t.getAttribute &&
                          t.getAttribute("class")) ||
                        ""
                    );
                  }))
              );
            },
            ATTR: function (t, n, i) {
              return function (r) {
                var o = e.attr(r, t);
                return null == o
                  ? "!=" === n
                  : !n ||
                      ((o += ""),
                      "=" === n
                        ? o === i
                        : "!=" === n
                        ? o !== i
                        : "^=" === n
                        ? i && 0 === o.indexOf(i)
                        : "*=" === n
                        ? i && o.indexOf(i) > -1
                        : "$=" === n
                        ? i && o.slice(-i.length) === i
                        : "~=" === n
                        ? (" " + o.replace(st, " ") + " ").indexOf(i) > -1
                        : "|=" === n &&
                          (o === i || o.slice(0, i.length + 1) === i + "-"));
              };
            },
            CHILD: function (t, e, n, i, r) {
              var o = "nth" !== t.slice(0, 3),
                s = "last" !== t.slice(-4),
                a = "of-type" === e;
              return 1 === i && 0 === r
                ? function (t) {
                    return !!t.parentNode;
                  }
                : function (e, n, l) {
                    var c,
                      u,
                      h,
                      d,
                      f,
                      p,
                      g = o !== s ? "nextSibling" : "previousSibling",
                      m = e.parentNode,
                      v = a && e.nodeName.toLowerCase(),
                      y = !l && !a,
                      b = !1;
                    if (m) {
                      if (o) {
                        for (; g; ) {
                          for (d = e; (d = d[g]); )
                            if (
                              a
                                ? d.nodeName.toLowerCase() === v
                                : 1 === d.nodeType
                            )
                              return !1;
                          p = g = "only" === t && !p && "nextSibling";
                        }
                        return !0;
                      }
                      if (((p = [s ? m.firstChild : m.lastChild]), s && y)) {
                        for (
                          b =
                            (f =
                              (c =
                                (u =
                                  (h = (d = m)[q] || (d[q] = {}))[d.uniqueID] ||
                                  (h[d.uniqueID] = {}))[t] || [])[0] === H &&
                              c[1]) && c[2],
                            d = f && m.childNodes[f];
                          (d = (++f && d && d[g]) || (b = f = 0) || p.pop());

                        )
                          if (1 === d.nodeType && ++b && d === e) {
                            u[t] = [H, f, b];
                            break;
                          }
                      } else if (
                        (y &&
                          (b = f =
                            (c =
                              (u =
                                (h = (d = e)[q] || (d[q] = {}))[d.uniqueID] ||
                                (h[d.uniqueID] = {}))[t] || [])[0] === H &&
                            c[1]),
                        !1 === b)
                      )
                        for (
                          ;
                          (d = (++f && d && d[g]) || (b = f = 0) || p.pop()) &&
                          ((a
                            ? d.nodeName.toLowerCase() !== v
                            : 1 !== d.nodeType) ||
                            !++b ||
                            (y &&
                              ((u =
                                (h = d[q] || (d[q] = {}))[d.uniqueID] ||
                                (h[d.uniqueID] = {}))[t] = [H, b]),
                            d !== e));

                        );
                      return (b -= r) === i || (b % i == 0 && b / i >= 0);
                    }
                  };
            },
            PSEUDO: function (t, n) {
              var r,
                o =
                  k.pseudos[t] ||
                  k.setFilters[t.toLowerCase()] ||
                  e.error("unsupported pseudo: " + t);
              return o[q]
                ? o(n)
                : o.length > 1
                ? ((r = [t, t, "", n]),
                  k.setFilters.hasOwnProperty(t.toLowerCase())
                    ? i(function (t, e) {
                        for (var i, r = o(t, n), s = r.length; s--; )
                          t[(i = tt(t, r[s]))] = !(e[i] = r[s]);
                      })
                    : function (t) {
                        return o(t, 0, r);
                      })
                : o;
            },
          },
          pseudos: {
            not: i(function (t) {
              var e = [],
                n = [],
                r = E(t.replace(at, "$1"));
              return r[q]
                ? i(function (t, e, n, i) {
                    for (var o, s = r(t, null, i, []), a = t.length; a--; )
                      (o = s[a]) && (t[a] = !(e[a] = o));
                  })
                : function (t, i, o) {
                    return (
                      (e[0] = t), r(e, null, o, n), (e[0] = null), !n.pop()
                    );
                  };
            }),
            has: i(function (t) {
              return function (n) {
                return e(t, n).length > 0;
              };
            }),
            contains: i(function (t) {
              return (
                (t = t.replace(xt, wt)),
                function (e) {
                  return (e.textContent || e.innerText || C(e)).indexOf(t) > -1;
                }
              );
            }),
            lang: i(function (t) {
              return (
                dt.test(t || "") || e.error("unsupported lang: " + t),
                (t = t.replace(xt, wt).toLowerCase()),
                function (e) {
                  var n;
                  do {
                    if (
                      (n = B
                        ? e.lang
                        : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                    )
                      return (
                        (n = n.toLowerCase()) === t || 0 === n.indexOf(t + "-")
                      );
                  } while ((e = e.parentNode) && 1 === e.nodeType);
                  return !1;
                }
              );
            }),
            target: function (e) {
              var n = t.location && t.location.hash;
              return n && n.slice(1) === e.id;
            },
            root: function (t) {
              return t === $;
            },
            focus: function (t) {
              return (
                t === A.activeElement &&
                (!A.hasFocus || A.hasFocus()) &&
                !!(t.type || t.href || ~t.tabIndex)
              );
            },
            enabled: function (t) {
              return !1 === t.disabled;
            },
            disabled: function (t) {
              return !0 === t.disabled;
            },
            checked: function (t) {
              var e = t.nodeName.toLowerCase();
              return (
                ("input" === e && !!t.checked) ||
                ("option" === e && !!t.selected)
              );
            },
            selected: function (t) {
              return (
                t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
              );
            },
            empty: function (t) {
              for (t = t.firstChild; t; t = t.nextSibling)
                if (t.nodeType < 6) return !1;
              return !0;
            },
            parent: function (t) {
              return !k.pseudos.empty(t);
            },
            header: function (t) {
              return gt.test(t.nodeName);
            },
            input: function (t) {
              return pt.test(t.nodeName);
            },
            button: function (t) {
              var e = t.nodeName.toLowerCase();
              return ("input" === e && "button" === t.type) || "button" === e;
            },
            text: function (t) {
              var e;
              return (
                "input" === t.nodeName.toLowerCase() &&
                "text" === t.type &&
                (null == (e = t.getAttribute("type")) ||
                  "text" === e.toLowerCase())
              );
            },
            first: c(function () {
              return [0];
            }),
            last: c(function (t, e) {
              return [e - 1];
            }),
            eq: c(function (t, e, n) {
              return [n < 0 ? n + e : n];
            }),
            even: c(function (t, e) {
              for (var n = 0; n < e; n += 2) t.push(n);
              return t;
            }),
            odd: c(function (t, e) {
              for (var n = 1; n < e; n += 2) t.push(n);
              return t;
            }),
            lt: c(function (t, e, n) {
              for (var i = n < 0 ? n + e : n; --i >= 0; ) t.push(i);
              return t;
            }),
            gt: c(function (t, e, n) {
              for (var i = n < 0 ? n + e : n; ++i < e; ) t.push(i);
              return t;
            }),
          },
        }).pseudos.nth = k.pseudos.eq),
      { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
        k.pseudos[x] = a(x);
      for (x in { submit: !0, reset: !0 }) k.pseudos[x] = l(x);
      return (
        (h.prototype = k.filters = k.pseudos),
        (k.setFilters = new h()),
        (S = e.tokenize =
          function (t, n) {
            var i,
              r,
              o,
              s,
              a,
              l,
              c,
              u = V[t + " "];
            if (u) return n ? 0 : u.slice(0);
            for (a = t, l = [], c = k.preFilter; a; ) {
              for (s in ((i && !(r = lt.exec(a))) ||
                (r && (a = a.slice(r[0].length) || a), l.push((o = []))),
              (i = !1),
              (r = ct.exec(a)) &&
                ((i = r.shift()),
                o.push({ value: i, type: r[0].replace(at, " ") }),
                (a = a.slice(i.length))),
              k.filter))
                !(r = ft[s].exec(a)) ||
                  (c[s] && !(r = c[s](r))) ||
                  ((i = r.shift()),
                  o.push({ value: i, type: s, matches: r }),
                  (a = a.slice(i.length)));
              if (!i) break;
            }
            return n ? a.length : a ? e.error(t) : V(t, l).slice(0);
          }),
        (E = e.compile =
          function (t, e) {
            var n,
              i = [],
              r = [],
              o = W[t + " "];
            if (!o) {
              for (e || (e = S(t)), n = e.length; n--; )
                (o = y(e[n]))[q] ? i.push(o) : r.push(o);
              (o = W(t, b(r, i))).selector = t;
            }
            return o;
          }),
        (T = e.select =
          function (t, e, n, i) {
            var r,
              o,
              s,
              a,
              l,
              c = "function" == typeof t && t,
              h = !i && S((t = c.selector || t));
            if (((n = n || []), 1 === h.length)) {
              if (
                (o = h[0] = h[0].slice(0)).length > 2 &&
                "ID" === (s = o[0]).type &&
                w.getById &&
                9 === e.nodeType &&
                B &&
                k.relative[o[1].type]
              ) {
                if (
                  !(e = (k.find.ID(s.matches[0].replace(xt, wt), e) || [])[0])
                )
                  return n;
                c && (e = e.parentNode), (t = t.slice(o.shift().value.length));
              }
              for (
                r = ft.needsContext.test(t) ? 0 : o.length;
                r-- && ((s = o[r]), !k.relative[(a = s.type)]);

              )
                if (
                  (l = k.find[a]) &&
                  (i = l(
                    s.matches[0].replace(xt, wt),
                    (yt.test(o[0].type) && u(e.parentNode)) || e
                  ))
                ) {
                  if ((o.splice(r, 1), !(t = i.length && d(o))))
                    return J.apply(n, i), n;
                  break;
                }
            }
            return (
              (c || E(t, h))(
                i,
                e,
                !B,
                n,
                !e || (yt.test(t) && u(e.parentNode)) || e
              ),
              n
            );
          }),
        (w.sortStable = q.split("").sort(U).join("") === q),
        (w.detectDuplicates = !!N),
        F(),
        (w.sortDetached = r(function (t) {
          return 1 & t.compareDocumentPosition(A.createElement("div"));
        })),
        r(function (t) {
          return (
            (t.innerHTML = "<a href='#'></a>"),
            "#" === t.firstChild.getAttribute("href")
          );
        }) ||
          o("type|href|height|width", function (t, e, n) {
            if (!n)
              return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2);
          }),
        (w.attributes &&
          r(function (t) {
            return (
              (t.innerHTML = "<input/>"),
              t.firstChild.setAttribute("value", ""),
              "" === t.firstChild.getAttribute("value")
            );
          })) ||
          o("value", function (t, e, n) {
            if (!n && "input" === t.nodeName.toLowerCase())
              return t.defaultValue;
          }),
        r(function (t) {
          return null == t.getAttribute("disabled");
        }) ||
          o(et, function (t, e, n) {
            var i;
            if (!n)
              return !0 === t[e]
                ? e.toLowerCase()
                : (i = t.getAttributeNode(e)) && i.specified
                ? i.value
                : null;
          }),
        e
      );
    })(t);
  (ft.find = yt),
    (ft.expr = yt.selectors),
    (ft.expr[":"] = ft.expr.pseudos),
    (ft.uniqueSort = ft.unique = yt.uniqueSort),
    (ft.text = yt.getText),
    (ft.isXMLDoc = yt.isXML),
    (ft.contains = yt.contains);
  var bt = function (t, e, n) {
      for (var i = [], r = n !== undefined; (t = t[e]) && 9 !== t.nodeType; )
        if (1 === t.nodeType) {
          if (r && ft(t).is(n)) break;
          i.push(t);
        }
      return i;
    },
    xt = function (t, e) {
      for (var n = []; t; t = t.nextSibling)
        1 === t.nodeType && t !== e && n.push(t);
      return n;
    },
    wt = ft.expr.match.needsContext,
    kt = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
    Ct = /^.[^:#\[\.,]*$/;
  (ft.filter = function (t, e, n) {
    var i = e[0];
    return (
      n && (t = ":not(" + t + ")"),
      1 === e.length && 1 === i.nodeType
        ? ft.find.matchesSelector(i, t)
          ? [i]
          : []
        : ft.find.matches(
            t,
            ft.grep(e, function (t) {
              return 1 === t.nodeType;
            })
          )
    );
  }),
    ft.fn.extend({
      find: function (t) {
        var e,
          n = [],
          i = this,
          r = i.length;
        if ("string" != typeof t)
          return this.pushStack(
            ft(t).filter(function () {
              for (e = 0; e < r; e++) if (ft.contains(i[e], this)) return !0;
            })
          );
        for (e = 0; e < r; e++) ft.find(t, i[e], n);
        return (
          ((n = this.pushStack(r > 1 ? ft.unique(n) : n)).selector = this
            .selector
            ? this.selector + " " + t
            : t),
          n
        );
      },
      filter: function (t) {
        return this.pushStack(i(this, t || [], !1));
      },
      not: function (t) {
        return this.pushStack(i(this, t || [], !0));
      },
      is: function (t) {
        return !!i(
          this,
          "string" == typeof t && wt.test(t) ? ft(t) : t || [],
          !1
        ).length;
      },
    });
  var _t,
    St = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
  ((ft.fn.init = function (t, e, n) {
    var i, r;
    if (!t) return this;
    if (((n = n || _t), "string" == typeof t)) {
      if (
        !(i =
          "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3
            ? [null, t, null]
            : St.exec(t)) ||
        (!i[1] && e)
      )
        return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
      if (i[1]) {
        if (
          ((e = e instanceof ft ? e[0] : e),
          ft.merge(
            this,
            ft.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : it, !0)
          ),
          kt.test(i[1]) && ft.isPlainObject(e))
        )
          for (i in e)
            ft.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
        return this;
      }
      if ((r = it.getElementById(i[2])) && r.parentNode) {
        if (r.id !== i[2]) return _t.find(t);
        (this.length = 1), (this[0] = r);
      }
      return (this.context = it), (this.selector = t), this;
    }
    return t.nodeType
      ? ((this.context = this[0] = t), (this.length = 1), this)
      : ft.isFunction(t)
      ? "undefined" != typeof n.ready
        ? n.ready(t)
        : t(ft)
      : (t.selector !== undefined &&
          ((this.selector = t.selector), (this.context = t.context)),
        ft.makeArray(t, this));
  }).prototype = ft.fn),
    (_t = ft(it));
  var Et = /^(?:parents|prev(?:Until|All))/,
    Tt = { children: !0, contents: !0, next: !0, prev: !0 };
  ft.fn.extend({
    has: function (t) {
      var e,
        n = ft(t, this),
        i = n.length;
      return this.filter(function () {
        for (e = 0; e < i; e++) if (ft.contains(this, n[e])) return !0;
      });
    },
    closest: function (t, e) {
      for (
        var n,
          i = 0,
          r = this.length,
          o = [],
          s = wt.test(t) || "string" != typeof t ? ft(t, e || this.context) : 0;
        i < r;
        i++
      )
        for (n = this[i]; n && n !== e; n = n.parentNode)
          if (
            n.nodeType < 11 &&
            (s
              ? s.index(n) > -1
              : 1 === n.nodeType && ft.find.matchesSelector(n, t))
          ) {
            o.push(n);
            break;
          }
      return this.pushStack(o.length > 1 ? ft.uniqueSort(o) : o);
    },
    index: function (t) {
      return t
        ? "string" == typeof t
          ? ft.inArray(this[0], ft(t))
          : ft.inArray(t.jquery ? t[0] : t, this)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (t, e) {
      return this.pushStack(ft.uniqueSort(ft.merge(this.get(), ft(t, e))));
    },
    addBack: function (t) {
      return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
    },
  }),
    ft.each(
      {
        parent: function (t) {
          var e = t.parentNode;
          return e && 11 !== e.nodeType ? e : null;
        },
        parents: function (t) {
          return bt(t, "parentNode");
        },
        parentsUntil: function (t, e, n) {
          return bt(t, "parentNode", n);
        },
        next: function (t) {
          return r(t, "nextSibling");
        },
        prev: function (t) {
          return r(t, "previousSibling");
        },
        nextAll: function (t) {
          return bt(t, "nextSibling");
        },
        prevAll: function (t) {
          return bt(t, "previousSibling");
        },
        nextUntil: function (t, e, n) {
          return bt(t, "nextSibling", n);
        },
        prevUntil: function (t, e, n) {
          return bt(t, "previousSibling", n);
        },
        siblings: function (t) {
          return xt((t.parentNode || {}).firstChild, t);
        },
        children: function (t) {
          return xt(t.firstChild);
        },
        contents: function (t) {
          return ft.nodeName(t, "iframe")
            ? t.contentDocument || t.contentWindow.document
            : ft.merge([], t.childNodes);
        },
      },
      function (t, e) {
        ft.fn[t] = function (n, i) {
          var r = ft.map(this, e, n);
          return (
            "Until" !== t.slice(-5) && (i = n),
            i && "string" == typeof i && (r = ft.filter(i, r)),
            this.length > 1 &&
              (Tt[t] || (r = ft.uniqueSort(r)),
              Et.test(t) && (r = r.reverse())),
            this.pushStack(r)
          );
        };
      }
    );
  var jt,
    Dt,
    Nt = /\S+/g;
  for (Dt in ((ft.Callbacks = function (t) {
    t = "string" == typeof t ? o(t) : ft.extend({}, t);
    var e,
      n,
      i,
      r,
      s = [],
      a = [],
      l = -1,
      c = function () {
        for (r = t.once, i = e = !0; a.length; l = -1)
          for (n = a.shift(); ++l < s.length; )
            !1 === s[l].apply(n[0], n[1]) &&
              t.stopOnFalse &&
              ((l = s.length), (n = !1));
        t.memory || (n = !1), (e = !1), r && (s = n ? [] : "");
      },
      u = {
        add: function () {
          return (
            s &&
              (n && !e && ((l = s.length - 1), a.push(n)),
              (function i(e) {
                ft.each(e, function (e, n) {
                  ft.isFunction(n)
                    ? (t.unique && u.has(n)) || s.push(n)
                    : n && n.length && "string" !== ft.type(n) && i(n);
                });
              })(arguments),
              n && !e && c()),
            this
          );
        },
        remove: function () {
          return (
            ft.each(arguments, function (t, e) {
              for (var n; (n = ft.inArray(e, s, n)) > -1; )
                s.splice(n, 1), n <= l && l--;
            }),
            this
          );
        },
        has: function (t) {
          return t ? ft.inArray(t, s) > -1 : s.length > 0;
        },
        empty: function () {
          return s && (s = []), this;
        },
        disable: function () {
          return (r = a = []), (s = n = ""), this;
        },
        disabled: function () {
          return !s;
        },
        lock: function () {
          return (r = !0), n || u.disable(), this;
        },
        locked: function () {
          return !!r;
        },
        fireWith: function (t, n) {
          return (
            r ||
              ((n = [t, (n = n || []).slice ? n.slice() : n]),
              a.push(n),
              e || c()),
            this
          );
        },
        fire: function () {
          return u.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!i;
        },
      };
    return u;
  }),
  ft.extend({
    Deferred: function (t) {
      var e = [
          ["resolve", "done", ft.Callbacks("once memory"), "resolved"],
          ["reject", "fail", ft.Callbacks("once memory"), "rejected"],
          ["notify", "progress", ft.Callbacks("memory")],
        ],
        n = "pending",
        i = {
          state: function () {
            return n;
          },
          always: function () {
            return r.done(arguments).fail(arguments), this;
          },
          then: function () {
            var t = arguments;
            return ft
              .Deferred(function (n) {
                ft.each(e, function (e, o) {
                  var s = ft.isFunction(t[e]) && t[e];
                  r[o[1]](function () {
                    var t = s && s.apply(this, arguments);
                    t && ft.isFunction(t.promise)
                      ? t
                          .promise()
                          .progress(n.notify)
                          .done(n.resolve)
                          .fail(n.reject)
                      : n[o[0] + "With"](
                          this === i ? n.promise() : this,
                          s ? [t] : arguments
                        );
                  });
                }),
                  (t = null);
              })
              .promise();
          },
          promise: function (t) {
            return null != t ? ft.extend(t, i) : i;
          },
        },
        r = {};
      return (
        (i.pipe = i.then),
        ft.each(e, function (t, o) {
          var s = o[2],
            a = o[3];
          (i[o[1]] = s.add),
            a &&
              s.add(
                function () {
                  n = a;
                },
                e[1 ^ t][2].disable,
                e[2][2].lock
              ),
            (r[o[0]] = function () {
              return r[o[0] + "With"](this === r ? i : this, arguments), this;
            }),
            (r[o[0] + "With"] = s.fireWith);
        }),
        i.promise(r),
        t && t.call(r, r),
        r
      );
    },
    when: function (t) {
      var e,
        n,
        i,
        r = 0,
        o = rt.call(arguments),
        s = o.length,
        a = 1 !== s || (t && ft.isFunction(t.promise)) ? s : 0,
        l = 1 === a ? t : ft.Deferred(),
        c = function (t, n, i) {
          return function (r) {
            (n[t] = this),
              (i[t] = arguments.length > 1 ? rt.call(arguments) : r),
              i === e ? l.notifyWith(n, i) : --a || l.resolveWith(n, i);
          };
        };
      if (s > 1)
        for (e = new Array(s), n = new Array(s), i = new Array(s); r < s; r++)
          o[r] && ft.isFunction(o[r].promise)
            ? o[r]
                .promise()
                .progress(c(r, n, e))
                .done(c(r, i, o))
                .fail(l.reject)
            : --a;
      return a || l.resolveWith(i, o), l.promise();
    },
  }),
  (ft.fn.ready = function (t) {
    return ft.ready.promise().done(t), this;
  }),
  ft.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function (t) {
      t ? ft.readyWait++ : ft.ready(!0);
    },
    ready: function (t) {
      (!0 === t ? --ft.readyWait : ft.isReady) ||
        ((ft.isReady = !0),
        (!0 !== t && --ft.readyWait > 0) ||
          (jt.resolveWith(it, [ft]),
          ft.fn.triggerHandler &&
            (ft(it).triggerHandler("ready"), ft(it).off("ready"))));
    },
  }),
  (ft.ready.promise = function (e) {
    if (!jt)
      if (
        ((jt = ft.Deferred()),
        "complete" === it.readyState ||
          ("loading" !== it.readyState && !it.documentElement.doScroll))
      )
        t.setTimeout(ft.ready);
      else if (it.addEventListener)
        it.addEventListener("DOMContentLoaded", a),
          t.addEventListener("load", a);
      else {
        it.attachEvent("onreadystatechange", a), t.attachEvent("onload", a);
        var n = !1;
        try {
          n = null == t.frameElement && it.documentElement;
        } catch (i) {}
        n &&
          n.doScroll &&
          (function e() {
            if (!ft.isReady) {
              try {
                n.doScroll("left");
              } catch (i) {
                return t.setTimeout(e, 50);
              }
              s(), ft.ready();
            }
          })();
      }
    return jt.promise(e);
  }),
  ft.ready.promise(),
  ft(ht)))
    break;
  (ht.ownFirst = "0" === Dt),
    (ht.inlineBlockNeedsLayout = !1),
    ft(function () {
      var t, e, n, i;
      (n = it.getElementsByTagName("body")[0]) &&
        n.style &&
        ((e = it.createElement("div")),
        ((i = it.createElement("div")).style.cssText =
          "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
        n.appendChild(i).appendChild(e),
        "undefined" != typeof e.style.zoom &&
          ((e.style.cssText =
            "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"),
          (ht.inlineBlockNeedsLayout = t = 3 === e.offsetWidth),
          t && (n.style.zoom = 1)),
        n.removeChild(i));
    }),
    (function () {
      var t = it.createElement("div");
      ht.deleteExpando = !0;
      try {
        delete t.test;
      } catch (e) {
        ht.deleteExpando = !1;
      }
      t = null;
    })();
  var Ft,
    At = function (t) {
      var e = ft.noData[(t.nodeName + " ").toLowerCase()],
        n = +t.nodeType || 1;
      return (
        (1 === n || 9 === n) &&
        (!e || (!0 !== e && t.getAttribute("classid") === e))
      );
    },
    $t = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    Bt = /([A-Z])/g;
  ft.extend({
    cache: {},
    noData: {
      "applet ": !0,
      "embed ": !0,
      "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
    },
    hasData: function (t) {
      return (
        !!(t = t.nodeType ? ft.cache[t[ft.expando]] : t[ft.expando]) && !c(t)
      );
    },
    data: function (t, e, n) {
      return u(t, e, n);
    },
    removeData: function (t, e) {
      return h(t, e);
    },
    _data: function (t, e, n) {
      return u(t, e, n, !0);
    },
    _removeData: function (t, e) {
      return h(t, e, !0);
    },
  }),
    ft.fn.extend({
      data: function (t, e) {
        var n,
          i,
          r,
          o = this[0],
          s = o && o.attributes;
        if (t === undefined) {
          if (
            this.length &&
            ((r = ft.data(o)), 1 === o.nodeType && !ft._data(o, "parsedAttrs"))
          ) {
            for (n = s.length; n--; )
              s[n] &&
                0 === (i = s[n].name).indexOf("data-") &&
                l(o, (i = ft.camelCase(i.slice(5))), r[i]);
            ft._data(o, "parsedAttrs", !0);
          }
          return r;
        }
        return "object" == typeof t
          ? this.each(function () {
              ft.data(this, t);
            })
          : arguments.length > 1
          ? this.each(function () {
              ft.data(this, t, e);
            })
          : o
          ? l(o, t, ft.data(o, t))
          : undefined;
      },
      removeData: function (t) {
        return this.each(function () {
          ft.removeData(this, t);
        });
      },
    }),
    ft.extend({
      queue: function (t, e, n) {
        var i;
        if (t)
          return (
            (e = (e || "fx") + "queue"),
            (i = ft._data(t, e)),
            n &&
              (!i || ft.isArray(n)
                ? (i = ft._data(t, e, ft.makeArray(n)))
                : i.push(n)),
            i || []
          );
      },
      dequeue: function (t, e) {
        e = e || "fx";
        var n = ft.queue(t, e),
          i = n.length,
          r = n.shift(),
          o = ft._queueHooks(t, e),
          s = function () {
            ft.dequeue(t, e);
          };
        "inprogress" === r && ((r = n.shift()), i--),
          r &&
            ("fx" === e && n.unshift("inprogress"),
            delete o.stop,
            r.call(t, s, o)),
          !i && o && o.empty.fire();
      },
      _queueHooks: function (t, e) {
        var n = e + "queueHooks";
        return (
          ft._data(t, n) ||
          ft._data(t, n, {
            empty: ft.Callbacks("once memory").add(function () {
              ft._removeData(t, e + "queue"), ft._removeData(t, n);
            }),
          })
        );
      },
    }),
    ft.fn.extend({
      queue: function (t, e) {
        var n = 2;
        return (
          "string" != typeof t && ((e = t), (t = "fx"), n--),
          arguments.length < n
            ? ft.queue(this[0], t)
            : e === undefined
            ? this
            : this.each(function () {
                var n = ft.queue(this, t, e);
                ft._queueHooks(this, t),
                  "fx" === t && "inprogress" !== n[0] && ft.dequeue(this, t);
              })
        );
      },
      dequeue: function (t) {
        return this.each(function () {
          ft.dequeue(this, t);
        });
      },
      clearQueue: function (t) {
        return this.queue(t || "fx", []);
      },
      promise: function (t, e) {
        var n,
          i = 1,
          r = ft.Deferred(),
          o = this,
          s = this.length,
          a = function () {
            --i || r.resolveWith(o, [o]);
          };
        for (
          "string" != typeof t && ((e = t), (t = undefined)), t = t || "fx";
          s--;

        )
          (n = ft._data(o[s], t + "queueHooks")) &&
            n.empty &&
            (i++, n.empty.add(a));
        return a(), r.promise(e);
      },
    }),
    (ht.shrinkWrapBlocks = function () {
      return null != Ft
        ? Ft
        : ((Ft = !1),
          (e = it.getElementsByTagName("body")[0]) && e.style
            ? ((t = it.createElement("div")),
              ((n = it.createElement("div")).style.cssText =
                "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
              e.appendChild(n).appendChild(t),
              "undefined" != typeof t.style.zoom &&
                ((t.style.cssText =
                  "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1"),
                (t.appendChild(it.createElement("div")).style.width = "5px"),
                (Ft = 3 !== t.offsetWidth)),
              e.removeChild(n),
              Ft)
            : void 0);
      var t, e, n;
    });
  var Pt,
    Mt,
    Lt,
    It = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    qt = new RegExp("^(?:([+-])=|)(" + It + ")([a-z%]*)$", "i"),
    Ot = ["Top", "Right", "Bottom", "Left"],
    Ht = function (t, e) {
      return (
        (t = e || t),
        "none" === ft.css(t, "display") || !ft.contains(t.ownerDocument, t)
      );
    },
    Rt = function (t, e, n, i, r, o, s) {
      var a = 0,
        l = t.length,
        c = null == n;
      if ("object" === ft.type(n))
        for (a in ((r = !0), n)) Rt(t, e, a, n[a], !0, o, s);
      else if (
        i !== undefined &&
        ((r = !0),
        ft.isFunction(i) || (s = !0),
        c &&
          (s
            ? (e.call(t, i), (e = null))
            : ((c = e),
              (e = function (t, e, n) {
                return c.call(ft(t), n);
              }))),
        e)
      )
        for (; a < l; a++) e(t[a], n, s ? i : i.call(t[a], a, e(t[a], n)));
      return r ? t : c ? e.call(t) : l ? e(t[0], n) : o;
    },
    zt = /^(?:checkbox|radio)$/i,
    Vt = /<([\w:-]+)/,
    Wt = /^$|\/(?:java|ecma)script/i,
    Ut = /^\s+/,
    Kt =
      "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
  (Pt = it.createElement("div")),
    (Mt = it.createDocumentFragment()),
    (Lt = it.createElement("input")),
    (Pt.innerHTML =
      "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
    (ht.leadingWhitespace = 3 === Pt.firstChild.nodeType),
    (ht.tbody = !Pt.getElementsByTagName("tbody").length),
    (ht.htmlSerialize = !!Pt.getElementsByTagName("link").length),
    (ht.html5Clone =
      "<:nav></:nav>" !== it.createElement("nav").cloneNode(!0).outerHTML),
    (Lt.type = "checkbox"),
    (Lt.checked = !0),
    Mt.appendChild(Lt),
    (ht.appendChecked = Lt.checked),
    (Pt.innerHTML = "<textarea>x</textarea>"),
    (ht.noCloneChecked = !!Pt.cloneNode(!0).lastChild.defaultValue),
    Mt.appendChild(Pt),
    (Lt = it.createElement("input")).setAttribute("type", "radio"),
    Lt.setAttribute("checked", "checked"),
    Lt.setAttribute("name", "t"),
    Pt.appendChild(Lt),
    (ht.checkClone = Pt.cloneNode(!0).cloneNode(!0).lastChild.checked),
    (ht.noCloneEvent = !!Pt.addEventListener),
    (Pt[ft.expando] = 1),
    (ht.attributes = !Pt.getAttribute(ft.expando));
  var Xt = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    legend: [1, "<fieldset>", "</fieldset>"],
    area: [1, "<map>", "</map>"],
    param: [1, "<object>", "</object>"],
    thead: [1, "<table>", "</table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: ht.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
  };
  (Xt.optgroup = Xt.option),
    (Xt.tbody = Xt.tfoot = Xt.colgroup = Xt.caption = Xt.thead),
    (Xt.th = Xt.td);
  var Gt = /<|&#?\w+;/,
    Yt = /<tbody/i;
  !(function () {
    var e,
      n,
      i = it.createElement("div");
    for (e in { submit: !0, change: !0, focusin: !0 })
      (n = "on" + e),
        (ht[e] = n in t) ||
          (i.setAttribute(n, "t"), (ht[e] = !1 === i.attributes[n].expando));
    i = null;
  })();
  var Qt = /^(?:input|select|textarea)$/i,
    Jt = /^key/,
    Zt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    te = /^(?:focusinfocus|focusoutblur)$/,
    ee = /^([^.]*)(?:\.(.+)|)/;
  (ft.event = {
    global: {},
    add: function (t, e, n, i, r) {
      var o,
        s,
        a,
        l,
        c,
        u,
        h,
        d,
        f,
        p,
        g,
        m = ft._data(t);
      if (m) {
        for (
          n.handler && ((n = (l = n).handler), (r = l.selector)),
            n.guid || (n.guid = ft.guid++),
            (s = m.events) || (s = m.events = {}),
            (u = m.handle) ||
              ((u = m.handle =
                function (t) {
                  return void 0 === ft || (t && ft.event.triggered === t.type)
                    ? undefined
                    : ft.event.dispatch.apply(u.elem, arguments);
                }).elem = t),
            a = (e = (e || "").match(Nt) || [""]).length;
          a--;

        )
          (f = g = (o = ee.exec(e[a]) || [])[1]),
            (p = (o[2] || "").split(".").sort()),
            f &&
              ((c = ft.event.special[f] || {}),
              (f = (r ? c.delegateType : c.bindType) || f),
              (c = ft.event.special[f] || {}),
              (h = ft.extend(
                {
                  type: f,
                  origType: g,
                  data: i,
                  handler: n,
                  guid: n.guid,
                  selector: r,
                  needsContext: r && ft.expr.match.needsContext.test(r),
                  namespace: p.join("."),
                },
                l
              )),
              (d = s[f]) ||
                (((d = s[f] = []).delegateCount = 0),
                (c.setup && !1 !== c.setup.call(t, i, p, u)) ||
                  (t.addEventListener
                    ? t.addEventListener(f, u, !1)
                    : t.attachEvent && t.attachEvent("on" + f, u))),
              c.add &&
                (c.add.call(t, h), h.handler.guid || (h.handler.guid = n.guid)),
              r ? d.splice(d.delegateCount++, 0, h) : d.push(h),
              (ft.event.global[f] = !0));
        t = null;
      }
    },
    remove: function (t, e, n, i, r) {
      var o,
        s,
        a,
        l,
        c,
        u,
        h,
        d,
        f,
        p,
        g,
        m = ft.hasData(t) && ft._data(t);
      if (m && (u = m.events)) {
        for (c = (e = (e || "").match(Nt) || [""]).length; c--; )
          if (
            ((f = g = (a = ee.exec(e[c]) || [])[1]),
            (p = (a[2] || "").split(".").sort()),
            f)
          ) {
            for (
              h = ft.event.special[f] || {},
                d = u[(f = (i ? h.delegateType : h.bindType) || f)] || [],
                a =
                  a[2] &&
                  new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                l = o = d.length;
              o--;

            )
              (s = d[o]),
                (!r && g !== s.origType) ||
                  (n && n.guid !== s.guid) ||
                  (a && !a.test(s.namespace)) ||
                  (i && i !== s.selector && ("**" !== i || !s.selector)) ||
                  (d.splice(o, 1),
                  s.selector && d.delegateCount--,
                  h.remove && h.remove.call(t, s));
            l &&
              !d.length &&
              ((h.teardown && !1 !== h.teardown.call(t, p, m.handle)) ||
                ft.removeEvent(t, f, m.handle),
              delete u[f]);
          } else for (f in u) ft.event.remove(t, f + e[c], n, i, !0);
        ft.isEmptyObject(u) && (delete m.handle, ft._removeData(t, "events"));
      }
    },
    trigger: function (e, n, i, r) {
      var o,
        s,
        a,
        l,
        c,
        u,
        h,
        d = [i || it],
        f = ut.call(e, "type") ? e.type : e,
        p = ut.call(e, "namespace") ? e.namespace.split(".") : [];
      if (
        ((a = u = i = i || it),
        3 !== i.nodeType &&
          8 !== i.nodeType &&
          !te.test(f + ft.event.triggered) &&
          (f.indexOf(".") > -1 && ((f = (p = f.split(".")).shift()), p.sort()),
          (s = f.indexOf(":") < 0 && "on" + f),
          ((e = e[ft.expando]
            ? e
            : new ft.Event(f, "object" == typeof e && e)).isTrigger = r
            ? 2
            : 3),
          (e.namespace = p.join(".")),
          (e.rnamespace = e.namespace
            ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (e.result = undefined),
          e.target || (e.target = i),
          (n = null == n ? [e] : ft.makeArray(n, [e])),
          (c = ft.event.special[f] || {}),
          r || !c.trigger || !1 !== c.trigger.apply(i, n)))
      ) {
        if (!r && !c.noBubble && !ft.isWindow(i)) {
          for (
            l = c.delegateType || f, te.test(l + f) || (a = a.parentNode);
            a;
            a = a.parentNode
          )
            d.push(a), (u = a);
          u === (i.ownerDocument || it) &&
            d.push(u.defaultView || u.parentWindow || t);
        }
        for (h = 0; (a = d[h++]) && !e.isPropagationStopped(); )
          (e.type = h > 1 ? l : c.bindType || f),
            (o =
              (ft._data(a, "events") || {})[e.type] && ft._data(a, "handle")) &&
              o.apply(a, n),
            (o = s && a[s]) &&
              o.apply &&
              At(a) &&
              ((e.result = o.apply(a, n)),
              !1 === e.result && e.preventDefault());
        if (
          ((e.type = f),
          !r &&
            !e.isDefaultPrevented() &&
            (!c._default || !1 === c._default.apply(d.pop(), n)) &&
            At(i) &&
            s &&
            i[f] &&
            !ft.isWindow(i))
        ) {
          (u = i[s]) && (i[s] = null), (ft.event.triggered = f);
          try {
            i[f]();
          } catch (g) {}
          (ft.event.triggered = undefined), u && (i[s] = u);
        }
        return e.result;
      }
    },
    dispatch: function (t) {
      t = ft.event.fix(t);
      var e,
        n,
        i,
        r,
        o,
        s = [],
        a = rt.call(arguments),
        l = (ft._data(this, "events") || {})[t.type] || [],
        c = ft.event.special[t.type] || {};
      if (
        ((a[0] = t),
        (t.delegateTarget = this),
        !c.preDispatch || !1 !== c.preDispatch.call(this, t))
      ) {
        for (
          s = ft.event.handlers.call(this, t, l), e = 0;
          (r = s[e++]) && !t.isPropagationStopped();

        )
          for (
            t.currentTarget = r.elem, n = 0;
            (o = r.handlers[n++]) && !t.isImmediatePropagationStopped();

          )
            (t.rnamespace && !t.rnamespace.test(o.namespace)) ||
              ((t.handleObj = o),
              (t.data = o.data),
              (i = (
                (ft.event.special[o.origType] || {}).handle || o.handler
              ).apply(r.elem, a)) !== undefined &&
                !1 === (t.result = i) &&
                (t.preventDefault(), t.stopPropagation()));
        return c.postDispatch && c.postDispatch.call(this, t), t.result;
      }
    },
    handlers: function (t, e) {
      var n,
        i,
        r,
        o,
        s = [],
        a = e.delegateCount,
        l = t.target;
      if (
        a &&
        l.nodeType &&
        ("click" !== t.type || isNaN(t.button) || t.button < 1)
      )
        for (; l != this; l = l.parentNode || this)
          if (1 === l.nodeType && (!0 !== l.disabled || "click" !== t.type)) {
            for (i = [], n = 0; n < a; n++)
              i[(r = (o = e[n]).selector + " ")] === undefined &&
                (i[r] = o.needsContext
                  ? ft(r, this).index(l) > -1
                  : ft.find(r, this, null, [l]).length),
                i[r] && i.push(o);
            i.length && s.push({ elem: l, handlers: i });
          }
      return a < e.length && s.push({ elem: this, handlers: e.slice(a) }), s;
    },
    fix: function (t) {
      if (t[ft.expando]) return t;
      var e,
        n,
        i,
        r = t.type,
        o = t,
        s = this.fixHooks[r];
      for (
        s ||
          (this.fixHooks[r] = s =
            Zt.test(r) ? this.mouseHooks : Jt.test(r) ? this.keyHooks : {}),
          i = s.props ? this.props.concat(s.props) : this.props,
          t = new ft.Event(o),
          e = i.length;
        e--;

      )
        t[(n = i[e])] = o[n];
      return (
        t.target || (t.target = o.srcElement || it),
        3 === t.target.nodeType && (t.target = t.target.parentNode),
        (t.metaKey = !!t.metaKey),
        s.filter ? s.filter(t, o) : t
      );
    },
    props:
      "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
        " "
      ),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function (t, e) {
        return (
          null == t.which &&
            (t.which = null != e.charCode ? e.charCode : e.keyCode),
          t
        );
      },
    },
    mouseHooks: {
      props:
        "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
          " "
        ),
      filter: function (t, e) {
        var n,
          i,
          r,
          o = e.button,
          s = e.fromElement;
        return (
          null == t.pageX &&
            null != e.clientX &&
            ((r = (i = t.target.ownerDocument || it).documentElement),
            (n = i.body),
            (t.pageX =
              e.clientX +
              ((r && r.scrollLeft) || (n && n.scrollLeft) || 0) -
              ((r && r.clientLeft) || (n && n.clientLeft) || 0)),
            (t.pageY =
              e.clientY +
              ((r && r.scrollTop) || (n && n.scrollTop) || 0) -
              ((r && r.clientTop) || (n && n.clientTop) || 0))),
          !t.relatedTarget &&
            s &&
            (t.relatedTarget = s === t.target ? e.toElement : s),
          t.which ||
            o === undefined ||
            (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
          t
        );
      },
    },
    special: {
      load: { noBubble: !0 },
      focus: {
        trigger: function () {
          if (this !== x() && this.focus)
            try {
              return this.focus(), !1;
            } catch (t) {}
        },
        delegateType: "focusin",
      },
      blur: {
        trigger: function () {
          if (this === x() && this.blur) return this.blur(), !1;
        },
        delegateType: "focusout",
      },
      click: {
        trigger: function () {
          if (
            ft.nodeName(this, "input") &&
            "checkbox" === this.type &&
            this.click
          )
            return this.click(), !1;
        },
        _default: function (t) {
          return ft.nodeName(t.target, "a");
        },
      },
      beforeunload: {
        postDispatch: function (t) {
          t.result !== undefined &&
            t.originalEvent &&
            (t.originalEvent.returnValue = t.result);
        },
      },
    },
    simulate: function (t, e, n) {
      var i = ft.extend(new ft.Event(), n, { type: t, isSimulated: !0 });
      ft.event.trigger(i, null, e),
        i.isDefaultPrevented() && n.preventDefault();
    },
  }),
    (ft.removeEvent = it.removeEventListener
      ? function (t, e, n) {
          t.removeEventListener && t.removeEventListener(e, n);
        }
      : function (t, e, n) {
          var i = "on" + e;
          t.detachEvent &&
            ("undefined" == typeof t[i] && (t[i] = null), t.detachEvent(i, n));
        }),
    (ft.Event = function (t, e) {
      if (!(this instanceof ft.Event)) return new ft.Event(t, e);
      t && t.type
        ? ((this.originalEvent = t),
          (this.type = t.type),
          (this.isDefaultPrevented =
            t.defaultPrevented ||
            (t.defaultPrevented === undefined && !1 === t.returnValue)
              ? y
              : b))
        : (this.type = t),
        e && ft.extend(this, e),
        (this.timeStamp = (t && t.timeStamp) || ft.now()),
        (this[ft.expando] = !0);
    }),
    (ft.Event.prototype = {
      constructor: ft.Event,
      isDefaultPrevented: b,
      isPropagationStopped: b,
      isImmediatePropagationStopped: b,
      preventDefault: function () {
        var t = this.originalEvent;
        (this.isDefaultPrevented = y),
          t && (t.preventDefault ? t.preventDefault() : (t.returnValue = !1));
      },
      stopPropagation: function () {
        var t = this.originalEvent;
        (this.isPropagationStopped = y),
          t &&
            !this.isSimulated &&
            (t.stopPropagation && t.stopPropagation(), (t.cancelBubble = !0));
      },
      stopImmediatePropagation: function () {
        var t = this.originalEvent;
        (this.isImmediatePropagationStopped = y),
          t && t.stopImmediatePropagation && t.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    ft.each(
      {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout",
      },
      function (t, e) {
        ft.event.special[t] = {
          delegateType: e,
          bindType: e,
          handle: function (t) {
            var n,
              i = this,
              r = t.relatedTarget,
              o = t.handleObj;
            return (
              (r && (r === i || ft.contains(i, r))) ||
                ((t.type = o.origType),
                (n = o.handler.apply(this, arguments)),
                (t.type = e)),
              n
            );
          },
        };
      }
    ),
    ht.submit ||
      (ft.event.special.submit = {
        setup: function () {
          if (ft.nodeName(this, "form")) return !1;
          ft.event.add(this, "click._submit keypress._submit", function (t) {
            var e = t.target,
              n =
                ft.nodeName(e, "input") || ft.nodeName(e, "button")
                  ? ft.prop(e, "form")
                  : undefined;
            n &&
              !ft._data(n, "submit") &&
              (ft.event.add(n, "submit._submit", function (t) {
                t._submitBubble = !0;
              }),
              ft._data(n, "submit", !0));
          });
        },
        postDispatch: function (t) {
          t._submitBubble &&
            (delete t._submitBubble,
            this.parentNode &&
              !t.isTrigger &&
              ft.event.simulate("submit", this.parentNode, t));
        },
        teardown: function () {
          if (ft.nodeName(this, "form")) return !1;
          ft.event.remove(this, "._submit");
        },
      }),
    ht.change ||
      (ft.event.special.change = {
        setup: function () {
          if (Qt.test(this.nodeName))
            return (
              ("checkbox" !== this.type && "radio" !== this.type) ||
                (ft.event.add(this, "propertychange._change", function (t) {
                  "checked" === t.originalEvent.propertyName &&
                    (this._justChanged = !0);
                }),
                ft.event.add(this, "click._change", function (t) {
                  this._justChanged && !t.isTrigger && (this._justChanged = !1),
                    ft.event.simulate("change", this, t);
                })),
              !1
            );
          ft.event.add(this, "beforeactivate._change", function (t) {
            var e = t.target;
            Qt.test(e.nodeName) &&
              !ft._data(e, "change") &&
              (ft.event.add(e, "change._change", function (t) {
                !this.parentNode ||
                  t.isSimulated ||
                  t.isTrigger ||
                  ft.event.simulate("change", this.parentNode, t);
              }),
              ft._data(e, "change", !0));
          });
        },
        handle: function (t) {
          var e = t.target;
          if (
            this !== e ||
            t.isSimulated ||
            t.isTrigger ||
            ("radio" !== e.type && "checkbox" !== e.type)
          )
            return t.handleObj.handler.apply(this, arguments);
        },
        teardown: function () {
          return ft.event.remove(this, "._change"), !Qt.test(this.nodeName);
        },
      }),
    ht.focusin ||
      ft.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
        var n = function (t) {
          ft.event.simulate(e, t.target, ft.event.fix(t));
        };
        ft.event.special[e] = {
          setup: function () {
            var i = this.ownerDocument || this,
              r = ft._data(i, e);
            r || i.addEventListener(t, n, !0), ft._data(i, e, (r || 0) + 1);
          },
          teardown: function () {
            var i = this.ownerDocument || this,
              r = ft._data(i, e) - 1;
            r
              ? ft._data(i, e, r)
              : (i.removeEventListener(t, n, !0), ft._removeData(i, e));
          },
        };
      }),
    ft.fn.extend({
      on: function (t, e, n, i) {
        return w(this, t, e, n, i);
      },
      one: function (t, e, n, i) {
        return w(this, t, e, n, i, 1);
      },
      off: function (t, e, n) {
        var i, r;
        if (t && t.preventDefault && t.handleObj)
          return (
            (i = t.handleObj),
            ft(t.delegateTarget).off(
              i.namespace ? i.origType + "." + i.namespace : i.origType,
              i.selector,
              i.handler
            ),
            this
          );
        if ("object" == typeof t) {
          for (r in t) this.off(r, e, t[r]);
          return this;
        }
        return (
          (!1 !== e && "function" != typeof e) || ((n = e), (e = undefined)),
          !1 === n && (n = b),
          this.each(function () {
            ft.event.remove(this, t, n, e);
          })
        );
      },
      trigger: function (t, e) {
        return this.each(function () {
          ft.event.trigger(t, e, this);
        });
      },
      triggerHandler: function (t, e) {
        var n = this[0];
        if (n) return ft.event.trigger(t, e, n, !0);
      },
    });
  var ne = / jQuery\d+="(?:null|\d+)"/g,
    ie = new RegExp("<(?:" + Kt + ")[\\s/>]", "i"),
    re =
      /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
    oe = /<script|<style|<link/i,
    se = /checked\s*(?:[^=]|=\s*.checked.)/i,
    ae = /^true\/(.*)/,
    le = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    ce = f(it).appendChild(it.createElement("div"));
  ft.extend({
    htmlPrefilter: function (t) {
      return t.replace(re, "<$1></$2>");
    },
    clone: function (t, e, n) {
      var i,
        r,
        o,
        s,
        a,
        l = ft.contains(t.ownerDocument, t);
      if (
        (ht.html5Clone || ft.isXMLDoc(t) || !ie.test("<" + t.nodeName + ">")
          ? (o = t.cloneNode(!0))
          : ((ce.innerHTML = t.outerHTML), ce.removeChild((o = ce.firstChild))),
        !(
          (ht.noCloneEvent && ht.noCloneChecked) ||
          (1 !== t.nodeType && 11 !== t.nodeType) ||
          ft.isXMLDoc(t)
        ))
      )
        for (i = p(o), a = p(t), s = 0; null != (r = a[s]); ++s)
          i[s] && E(r, i[s]);
      if (e)
        if (n)
          for (a = a || p(t), i = i || p(o), s = 0; null != (r = a[s]); s++)
            S(r, i[s]);
        else S(t, o);
      return (
        (i = p(o, "script")).length > 0 && g(i, !l && p(t, "script")),
        (i = a = r = null),
        o
      );
    },
    cleanData: function (t, e) {
      for (
        var n,
          i,
          r,
          o,
          s = 0,
          a = ft.expando,
          l = ft.cache,
          c = ht.attributes,
          u = ft.event.special;
        null != (n = t[s]);
        s++
      )
        if ((e || At(n)) && (o = (r = n[a]) && l[r])) {
          if (o.events)
            for (i in o.events)
              u[i] ? ft.event.remove(n, i) : ft.removeEvent(n, i, o.handle);
          l[r] &&
            (delete l[r],
            c || "undefined" == typeof n.removeAttribute
              ? (n[a] = undefined)
              : n.removeAttribute(a),
            nt.push(r));
        }
    },
  }),
    ft.fn.extend({
      domManip: T,
      detach: function (t) {
        return j(this, t, !0);
      },
      remove: function (t) {
        return j(this, t);
      },
      text: function (t) {
        return Rt(
          this,
          function (t) {
            return t === undefined
              ? ft.text(this)
              : this.empty().append(
                  ((this[0] && this[0].ownerDocument) || it).createTextNode(t)
                );
          },
          null,
          t,
          arguments.length
        );
      },
      append: function () {
        return T(this, arguments, function (t) {
          (1 !== this.nodeType &&
            11 !== this.nodeType &&
            9 !== this.nodeType) ||
            k(this, t).appendChild(t);
        });
      },
      prepend: function () {
        return T(this, arguments, function (t) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var e = k(this, t);
            e.insertBefore(t, e.firstChild);
          }
        });
      },
      before: function () {
        return T(this, arguments, function (t) {
          this.parentNode && this.parentNode.insertBefore(t, this);
        });
      },
      after: function () {
        return T(this, arguments, function (t) {
          this.parentNode && this.parentNode.insertBefore(t, this.nextSibling);
        });
      },
      empty: function () {
        for (var t, e = 0; null != (t = this[e]); e++) {
          for (1 === t.nodeType && ft.cleanData(p(t, !1)); t.firstChild; )
            t.removeChild(t.firstChild);
          t.options && ft.nodeName(t, "select") && (t.options.length = 0);
        }
        return this;
      },
      clone: function (t, e) {
        return (
          (t = null != t && t),
          (e = null == e ? t : e),
          this.map(function () {
            return ft.clone(this, t, e);
          })
        );
      },
      html: function (t) {
        return Rt(
          this,
          function (t) {
            var e = this[0] || {},
              n = 0,
              i = this.length;
            if (t === undefined)
              return 1 === e.nodeType ? e.innerHTML.replace(ne, "") : undefined;
            if (
              "string" == typeof t &&
              !oe.test(t) &&
              (ht.htmlSerialize || !ie.test(t)) &&
              (ht.leadingWhitespace || !Ut.test(t)) &&
              !Xt[(Vt.exec(t) || ["", ""])[1].toLowerCase()]
            ) {
              t = ft.htmlPrefilter(t);
              try {
                for (; n < i; n++)
                  1 === (e = this[n] || {}).nodeType &&
                    (ft.cleanData(p(e, !1)), (e.innerHTML = t));
                e = 0;
              } catch (r) {}
            }
            e && this.empty().append(t);
          },
          null,
          t,
          arguments.length
        );
      },
      replaceWith: function () {
        var t = [];
        return T(
          this,
          arguments,
          function (e) {
            var n = this.parentNode;
            ft.inArray(this, t) < 0 &&
              (ft.cleanData(p(this)), n && n.replaceChild(e, this));
          },
          t
        );
      },
    }),
    ft.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (t, e) {
        ft.fn[t] = function (t) {
          for (var n, i = 0, r = [], o = ft(t), s = o.length - 1; i <= s; i++)
            (n = i === s ? this : this.clone(!0)),
              ft(o[i])[e](n),
              st.apply(r, n.get());
          return this.pushStack(r);
        };
      }
    );
  var ue,
    he = { HTML: "block", BODY: "block" },
    de = /^margin/,
    fe = new RegExp("^(" + It + ")(?!px)[a-z%]+$", "i"),
    pe = function (t, e, n, i) {
      var r,
        o,
        s = {};
      for (o in e) (s[o] = t.style[o]), (t.style[o] = e[o]);
      for (o in ((r = n.apply(t, i || [])), e)) t.style[o] = s[o];
      return r;
    },
    ge = it.documentElement;
  !(function () {
    function e() {
      var e,
        u,
        h = it.documentElement;
      h.appendChild(l),
        (c.style.cssText =
          "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%"),
        (n = r = a = !1),
        (i = s = !0),
        t.getComputedStyle &&
          ((u = t.getComputedStyle(c)),
          (n = "1%" !== (u || {}).top),
          (a = "2px" === (u || {}).marginLeft),
          (r = "4px" === (u || { width: "4px" }).width),
          (c.style.marginRight = "50%"),
          (i = "4px" === (u || { marginRight: "4px" }).marginRight),
          ((e = c.appendChild(it.createElement("div"))).style.cssText =
            c.style.cssText =
              "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
          (e.style.marginRight = e.style.width = "0"),
          (c.style.width = "1px"),
          (s = !parseFloat((t.getComputedStyle(e) || {}).marginRight)),
          c.removeChild(e)),
        (c.style.display = "none"),
        (o = 0 === c.getClientRects().length) &&
          ((c.style.display = ""),
          (c.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
          (c.childNodes[0].style.borderCollapse = "separate"),
          ((e = c.getElementsByTagName("td"))[0].style.cssText =
            "margin:0;border:0;padding:0;display:none"),
          (o = 0 === e[0].offsetHeight) &&
            ((e[0].style.display = ""),
            (e[1].style.display = "none"),
            (o = 0 === e[0].offsetHeight))),
        h.removeChild(l);
    }
    var n,
      i,
      r,
      o,
      s,
      a,
      l = it.createElement("div"),
      c = it.createElement("div");
    c.style &&
      ((c.style.cssText = "float:left;opacity:.5"),
      (ht.opacity = "0.5" === c.style.opacity),
      (ht.cssFloat = !!c.style.cssFloat),
      (c.style.backgroundClip = "content-box"),
      (c.cloneNode(!0).style.backgroundClip = ""),
      (ht.clearCloneStyle = "content-box" === c.style.backgroundClip),
      ((l = it.createElement("div")).style.cssText =
        "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute"),
      (c.innerHTML = ""),
      l.appendChild(c),
      (ht.boxSizing =
        "" === c.style.boxSizing ||
        "" === c.style.MozBoxSizing ||
        "" === c.style.WebkitBoxSizing),
      ft.extend(ht, {
        reliableHiddenOffsets: function () {
          return null == n && e(), o;
        },
        boxSizingReliable: function () {
          return null == n && e(), r;
        },
        pixelMarginRight: function () {
          return null == n && e(), i;
        },
        pixelPosition: function () {
          return null == n && e(), n;
        },
        reliableMarginRight: function () {
          return null == n && e(), s;
        },
        reliableMarginLeft: function () {
          return null == n && e(), a;
        },
      }));
  })();
  var me,
    ve,
    ye = /^(top|right|bottom|left)$/;
  t.getComputedStyle
    ? ((me = function (e) {
        var n = e.ownerDocument.defaultView;
        return (n && n.opener) || (n = t), n.getComputedStyle(e);
      }),
      (ve = function (t, e, n) {
        var i,
          r,
          o,
          s,
          a = t.style;
        return (
          ("" !==
            (s = (n = n || me(t))
              ? n.getPropertyValue(e) || n[e]
              : undefined) &&
            s !== undefined) ||
            ft.contains(t.ownerDocument, t) ||
            (s = ft.style(t, e)),
          n &&
            !ht.pixelMarginRight() &&
            fe.test(s) &&
            de.test(e) &&
            ((i = a.width),
            (r = a.minWidth),
            (o = a.maxWidth),
            (a.minWidth = a.maxWidth = a.width = s),
            (s = n.width),
            (a.width = i),
            (a.minWidth = r),
            (a.maxWidth = o)),
          s === undefined ? s : s + ""
        );
      }))
    : ge.currentStyle &&
      ((me = function (t) {
        return t.currentStyle;
      }),
      (ve = function (t, e, n) {
        var i,
          r,
          o,
          s,
          a = t.style;
        return (
          null == (s = (n = n || me(t)) ? n[e] : undefined) &&
            a &&
            a[e] &&
            (s = a[e]),
          fe.test(s) &&
            !ye.test(e) &&
            ((i = a.left),
            (o = (r = t.runtimeStyle) && r.left) &&
              (r.left = t.currentStyle.left),
            (a.left = "fontSize" === e ? "1em" : s),
            (s = a.pixelLeft + "px"),
            (a.left = i),
            o && (r.left = o)),
          s === undefined ? s : s + "" || "auto"
        );
      }));
  var be = /alpha\([^)]*\)/i,
    xe = /opacity\s*=\s*([^)]*)/i,
    we = /^(none|table(?!-c[ea]).+)/,
    ke = new RegExp("^(" + It + ")(.*)$", "i"),
    Ce = { position: "absolute", visibility: "hidden", display: "block" },
    _e = { letterSpacing: "0", fontWeight: "400" },
    Se = ["Webkit", "O", "Moz", "ms"],
    Ee = it.createElement("div").style;
  ft.extend({
    cssHooks: {
      opacity: {
        get: function (t, e) {
          if (e) {
            var n = ve(t, "opacity");
            return "" === n ? "1" : n;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: { float: ht.cssFloat ? "cssFloat" : "styleFloat" },
    style: function (t, e, n, i) {
      if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
        var r,
          o,
          s,
          a = ft.camelCase(e),
          l = t.style;
        if (
          ((e = ft.cssProps[a] || (ft.cssProps[a] = A(a) || a)),
          (s = ft.cssHooks[e] || ft.cssHooks[a]),
          n === undefined)
        )
          return s && "get" in s && (r = s.get(t, !1, i)) !== undefined
            ? r
            : l[e];
        if (
          ("string" === (o = typeof n) &&
            (r = qt.exec(n)) &&
            r[1] &&
            ((n = d(t, e, r)), (o = "number")),
          null != n &&
            n == n &&
            ("number" === o &&
              (n += (r && r[3]) || (ft.cssNumber[a] ? "" : "px")),
            ht.clearCloneStyle ||
              "" !== n ||
              0 !== e.indexOf("background") ||
              (l[e] = "inherit"),
            !(s && "set" in s && (n = s.set(t, n, i)) === undefined)))
        )
          try {
            l[e] = n;
          } catch (c) {}
      }
    },
    css: function (t, e, n, i) {
      var r,
        o,
        s,
        a = ft.camelCase(e);
      return (
        (e = ft.cssProps[a] || (ft.cssProps[a] = A(a) || a)),
        (s = ft.cssHooks[e] || ft.cssHooks[a]) &&
          "get" in s &&
          (o = s.get(t, !0, n)),
        o === undefined && (o = ve(t, e, i)),
        "normal" === o && e in _e && (o = _e[e]),
        "" === n || n
          ? ((r = parseFloat(o)), !0 === n || isFinite(r) ? r || 0 : o)
          : o
      );
    },
  }),
    ft.each(["height", "width"], function (t, e) {
      ft.cssHooks[e] = {
        get: function (t, n, i) {
          if (n)
            return we.test(ft.css(t, "display")) && 0 === t.offsetWidth
              ? pe(t, Ce, function () {
                  return M(t, e, i);
                })
              : M(t, e, i);
        },
        set: function (t, n, i) {
          var r = i && me(t);
          return B(
            t,
            n,
            i
              ? P(
                  t,
                  e,
                  i,
                  ht.boxSizing &&
                    "border-box" === ft.css(t, "boxSizing", !1, r),
                  r
                )
              : 0
          );
        },
      };
    }),
    ht.opacity ||
      (ft.cssHooks.opacity = {
        get: function (t, e) {
          return xe.test(
            (e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || ""
          )
            ? 0.01 * parseFloat(RegExp.$1) + ""
            : e
            ? "1"
            : "";
        },
        set: function (t, e) {
          var n = t.style,
            i = t.currentStyle,
            r = ft.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
            o = (i && i.filter) || n.filter || "";
          (n.zoom = 1),
            ((e >= 1 || "" === e) &&
              "" === ft.trim(o.replace(be, "")) &&
              n.removeAttribute &&
              (n.removeAttribute("filter"), "" === e || (i && !i.filter))) ||
              (n.filter = be.test(o) ? o.replace(be, r) : o + " " + r);
        },
      }),
    (ft.cssHooks.marginRight = F(ht.reliableMarginRight, function (t, e) {
      if (e) return pe(t, { display: "inline-block" }, ve, [t, "marginRight"]);
    })),
    (ft.cssHooks.marginLeft = F(ht.reliableMarginLeft, function (t, e) {
      if (e)
        return (
          (parseFloat(ve(t, "marginLeft")) ||
            (ft.contains(t.ownerDocument, t)
              ? t.getBoundingClientRect().left -
                pe(t, { marginLeft: 0 }, function () {
                  return t.getBoundingClientRect().left;
                })
              : 0)) + "px"
        );
    })),
    ft.each({ margin: "", padding: "", border: "Width" }, function (t, e) {
      (ft.cssHooks[t + e] = {
        expand: function (n) {
          for (
            var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n];
            i < 4;
            i++
          )
            r[t + Ot[i] + e] = o[i] || o[i - 2] || o[0];
          return r;
        },
      }),
        de.test(t) || (ft.cssHooks[t + e].set = B);
    }),
    ft.fn.extend({
      css: function (t, e) {
        return Rt(
          this,
          function (t, e, n) {
            var i,
              r,
              o = {},
              s = 0;
            if (ft.isArray(e)) {
              for (i = me(t), r = e.length; s < r; s++)
                o[e[s]] = ft.css(t, e[s], !1, i);
              return o;
            }
            return n !== undefined ? ft.style(t, e, n) : ft.css(t, e);
          },
          t,
          e,
          arguments.length > 1
        );
      },
      show: function () {
        return $(this, !0);
      },
      hide: function () {
        return $(this);
      },
      toggle: function (t) {
        return "boolean" == typeof t
          ? t
            ? this.show()
            : this.hide()
          : this.each(function () {
              Ht(this) ? ft(this).show() : ft(this).hide();
            });
      },
    }),
    (ft.Tween = L),
    (L.prototype = {
      constructor: L,
      init: function (t, e, n, i, r, o) {
        (this.elem = t),
          (this.prop = n),
          (this.easing = r || ft.easing._default),
          (this.options = e),
          (this.start = this.now = this.cur()),
          (this.end = i),
          (this.unit = o || (ft.cssNumber[n] ? "" : "px"));
      },
      cur: function () {
        var t = L.propHooks[this.prop];
        return t && t.get ? t.get(this) : L.propHooks._default.get(this);
      },
      run: function (t) {
        var e,
          n = L.propHooks[this.prop];
        return (
          this.options.duration
            ? (this.pos = e =
                ft.easing[this.easing](
                  t,
                  this.options.duration * t,
                  0,
                  1,
                  this.options.duration
                ))
            : (this.pos = e = t),
          (this.now = (this.end - this.start) * e + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          n && n.set ? n.set(this) : L.propHooks._default.set(this),
          this
        );
      },
    }),
    (L.prototype.init.prototype = L.prototype),
    (L.propHooks = {
      _default: {
        get: function (t) {
          var e;
          return 1 !== t.elem.nodeType ||
            (null != t.elem[t.prop] && null == t.elem.style[t.prop])
            ? t.elem[t.prop]
            : (e = ft.css(t.elem, t.prop, "")) && "auto" !== e
            ? e
            : 0;
        },
        set: function (t) {
          ft.fx.step[t.prop]
            ? ft.fx.step[t.prop](t)
            : 1 !== t.elem.nodeType ||
              (null == t.elem.style[ft.cssProps[t.prop]] &&
                !ft.cssHooks[t.prop])
            ? (t.elem[t.prop] = t.now)
            : ft.style(t.elem, t.prop, t.now + t.unit);
        },
      },
    }),
    (L.propHooks.scrollTop = L.propHooks.scrollLeft =
      {
        set: function (t) {
          t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
        },
      }),
    (ft.easing = {
      linear: function (t) {
        return t;
      },
      swing: function (t) {
        return 0.5 - Math.cos(t * Math.PI) / 2;
      },
      _default: "swing",
    }),
    (ft.fx = L.prototype.init),
    (ft.fx.step = {});
  var Te,
    je,
    De = /^(?:toggle|show|hide)$/,
    Ne = /queueHooks$/;
  (ft.Animation = ft.extend(z, {
    tweeners: {
      "*": [
        function (t, e) {
          var n = this.createTween(t, e);
          return d(n.elem, t, qt.exec(e), n), n;
        },
      ],
    },
    tweener: function (t, e) {
      ft.isFunction(t) ? ((e = t), (t = ["*"])) : (t = t.match(Nt));
      for (var n, i = 0, r = t.length; i < r; i++)
        (n = t[i]),
          (z.tweeners[n] = z.tweeners[n] || []),
          z.tweeners[n].unshift(e);
    },
    prefilters: [H],
    prefilter: function (t, e) {
      e ? z.prefilters.unshift(t) : z.prefilters.push(t);
    },
  })),
    (ft.speed = function (t, e, n) {
      var i =
        t && "object" == typeof t
          ? ft.extend({}, t)
          : {
              complete: n || (!n && e) || (ft.isFunction(t) && t),
              duration: t,
              easing: (n && e) || (e && !ft.isFunction(e) && e),
            };
      return (
        (i.duration = ft.fx.off
          ? 0
          : "number" == typeof i.duration
          ? i.duration
          : i.duration in ft.fx.speeds
          ? ft.fx.speeds[i.duration]
          : ft.fx.speeds._default),
        (null != i.queue && !0 !== i.queue) || (i.queue = "fx"),
        (i.old = i.complete),
        (i.complete = function () {
          ft.isFunction(i.old) && i.old.call(this),
            i.queue && ft.dequeue(this, i.queue);
        }),
        i
      );
    }),
    ft.fn.extend({
      fadeTo: function (t, e, n, i) {
        return this.filter(Ht)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: e }, t, n, i);
      },
      animate: function (t, e, n, i) {
        var r = ft.isEmptyObject(t),
          o = ft.speed(e, n, i),
          s = function () {
            var e = z(this, ft.extend({}, t), o);
            (r || ft._data(this, "finish")) && e.stop(!0);
          };
        return (
          (s.finish = s),
          r || !1 === o.queue ? this.each(s) : this.queue(o.queue, s)
        );
      },
      stop: function (t, e, n) {
        var i = function (t) {
          var e = t.stop;
          delete t.stop, e(n);
        };
        return (
          "string" != typeof t && ((n = e), (e = t), (t = undefined)),
          e && !1 !== t && this.queue(t || "fx", []),
          this.each(function () {
            var e = !0,
              r = null != t && t + "queueHooks",
              o = ft.timers,
              s = ft._data(this);
            if (r) s[r] && s[r].stop && i(s[r]);
            else for (r in s) s[r] && s[r].stop && Ne.test(r) && i(s[r]);
            for (r = o.length; r--; )
              o[r].elem !== this ||
                (null != t && o[r].queue !== t) ||
                (o[r].anim.stop(n), (e = !1), o.splice(r, 1));
            (!e && n) || ft.dequeue(this, t);
          })
        );
      },
      finish: function (t) {
        return (
          !1 !== t && (t = t || "fx"),
          this.each(function () {
            var e,
              n = ft._data(this),
              i = n[t + "queue"],
              r = n[t + "queueHooks"],
              o = ft.timers,
              s = i ? i.length : 0;
            for (
              n.finish = !0,
                ft.queue(this, t, []),
                r && r.stop && r.stop.call(this, !0),
                e = o.length;
              e--;

            )
              o[e].elem === this &&
                o[e].queue === t &&
                (o[e].anim.stop(!0), o.splice(e, 1));
            for (e = 0; e < s; e++)
              i[e] && i[e].finish && i[e].finish.call(this);
            delete n.finish;
          })
        );
      },
    }),
    ft.each(["toggle", "show", "hide"], function (t, e) {
      var n = ft.fn[e];
      ft.fn[e] = function (t, i, r) {
        return null == t || "boolean" == typeof t
          ? n.apply(this, arguments)
          : this.animate(q(e, !0), t, i, r);
      };
    }),
    ft.each(
      {
        slideDown: q("show"),
        slideUp: q("hide"),
        slideToggle: q("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" },
      },
      function (t, e) {
        ft.fn[t] = function (t, n, i) {
          return this.animate(e, t, n, i);
        };
      }
    ),
    (ft.timers = []),
    (ft.fx.tick = function () {
      var t,
        e = ft.timers,
        n = 0;
      for (Te = ft.now(); n < e.length; n++)
        (t = e[n])() || e[n] !== t || e.splice(n--, 1);
      e.length || ft.fx.stop(), (Te = undefined);
    }),
    (ft.fx.timer = function (t) {
      ft.timers.push(t), t() ? ft.fx.start() : ft.timers.pop();
    }),
    (ft.fx.interval = 13),
    (ft.fx.start = function () {
      je || (je = t.setInterval(ft.fx.tick, ft.fx.interval));
    }),
    (ft.fx.stop = function () {
      t.clearInterval(je), (je = null);
    }),
    (ft.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (ft.fn.delay = function (e, n) {
      return (
        (e = (ft.fx && ft.fx.speeds[e]) || e),
        (n = n || "fx"),
        this.queue(n, function (n, i) {
          var r = t.setTimeout(n, e);
          i.stop = function () {
            t.clearTimeout(r);
          };
        })
      );
    }),
    (function () {
      var t,
        e = it.createElement("input"),
        n = it.createElement("div"),
        i = it.createElement("select"),
        r = i.appendChild(it.createElement("option"));
      (n = it.createElement("div")).setAttribute("className", "t"),
        (n.innerHTML =
          "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
        (t = n.getElementsByTagName("a")[0]),
        e.setAttribute("type", "checkbox"),
        n.appendChild(e),
        ((t = n.getElementsByTagName("a")[0]).style.cssText = "top:1px"),
        (ht.getSetAttribute = "t" !== n.className),
        (ht.style = /top/.test(t.getAttribute("style"))),
        (ht.hrefNormalized = "/a" === t.getAttribute("href")),
        (ht.checkOn = !!e.value),
        (ht.optSelected = r.selected),
        (ht.enctype = !!it.createElement("form").enctype),
        (i.disabled = !0),
        (ht.optDisabled = !r.disabled),
        (e = it.createElement("input")).setAttribute("value", ""),
        (ht.input = "" === e.getAttribute("value")),
        (e.value = "t"),
        e.setAttribute("type", "radio"),
        (ht.radioValue = "t" === e.value);
    })();
  var Fe = /\r/g,
    Ae = /[\x20\t\r\n\f]+/g;
  ft.fn.extend({
    val: function (t) {
      var e,
        n,
        i,
        r = this[0];
      return arguments.length
        ? ((i = ft.isFunction(t)),
          this.each(function (n) {
            var r;
            1 === this.nodeType &&
              (null == (r = i ? t.call(this, n, ft(this).val()) : t)
                ? (r = "")
                : "number" == typeof r
                ? (r += "")
                : ft.isArray(r) &&
                  (r = ft.map(r, function (t) {
                    return null == t ? "" : t + "";
                  })),
              ((e =
                ft.valHooks[this.type] ||
                ft.valHooks[this.nodeName.toLowerCase()]) &&
                "set" in e &&
                e.set(this, r, "value") !== undefined) ||
                (this.value = r));
          }))
        : r
        ? (e = ft.valHooks[r.type] || ft.valHooks[r.nodeName.toLowerCase()]) &&
          "get" in e &&
          (n = e.get(r, "value")) !== undefined
          ? n
          : "string" == typeof (n = r.value)
          ? n.replace(Fe, "")
          : null == n
          ? ""
          : n
        : void 0;
    },
  }),
    ft.extend({
      valHooks: {
        option: {
          get: function (t) {
            var e = ft.find.attr(t, "value");
            return null != e ? e : ft.trim(ft.text(t)).replace(Ae, " ");
          },
        },
        select: {
          get: function (t) {
            for (
              var e,
                n,
                i = t.options,
                r = t.selectedIndex,
                o = "select-one" === t.type || r < 0,
                s = o ? null : [],
                a = o ? r + 1 : i.length,
                l = r < 0 ? a : o ? r : 0;
              l < a;
              l++
            )
              if (
                ((n = i[l]).selected || l === r) &&
                (ht.optDisabled
                  ? !n.disabled
                  : null === n.getAttribute("disabled")) &&
                (!n.parentNode.disabled ||
                  !ft.nodeName(n.parentNode, "optgroup"))
              ) {
                if (((e = ft(n).val()), o)) return e;
                s.push(e);
              }
            return s;
          },
          set: function (t, e) {
            for (
              var n, i, r = t.options, o = ft.makeArray(e), s = r.length;
              s--;

            )
              if (((i = r[s]), ft.inArray(ft.valHooks.option.get(i), o) > -1))
                try {
                  i.selected = n = !0;
                } catch (a) {
                  i.scrollHeight;
                }
              else i.selected = !1;
            return n || (t.selectedIndex = -1), r;
          },
        },
      },
    }),
    ft.each(["radio", "checkbox"], function () {
      (ft.valHooks[this] = {
        set: function (t, e) {
          if (ft.isArray(e))
            return (t.checked = ft.inArray(ft(t).val(), e) > -1);
        },
      }),
        ht.checkOn ||
          (ft.valHooks[this].get = function (t) {
            return null === t.getAttribute("value") ? "on" : t.value;
          });
    });
  var $e,
    Be,
    Pe = ft.expr.attrHandle,
    Me = /^(?:checked|selected)$/i,
    Le = ht.getSetAttribute,
    Ie = ht.input;
  ft.fn.extend({
    attr: function (t, e) {
      return Rt(this, ft.attr, t, e, arguments.length > 1);
    },
    removeAttr: function (t) {
      return this.each(function () {
        ft.removeAttr(this, t);
      });
    },
  }),
    ft.extend({
      attr: function (t, e, n) {
        var i,
          r,
          o = t.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return "undefined" == typeof t.getAttribute
            ? ft.prop(t, e, n)
            : ((1 === o && ft.isXMLDoc(t)) ||
                ((e = e.toLowerCase()),
                (r =
                  ft.attrHooks[e] || (ft.expr.match.bool.test(e) ? Be : $e))),
              n !== undefined
                ? null === n
                  ? void ft.removeAttr(t, e)
                  : r && "set" in r && (i = r.set(t, n, e)) !== undefined
                  ? i
                  : (t.setAttribute(e, n + ""), n)
                : r && "get" in r && null !== (i = r.get(t, e))
                ? i
                : null == (i = ft.find.attr(t, e))
                ? undefined
                : i);
      },
      attrHooks: {
        type: {
          set: function (t, e) {
            if (!ht.radioValue && "radio" === e && ft.nodeName(t, "input")) {
              var n = t.value;
              return t.setAttribute("type", e), n && (t.value = n), e;
            }
          },
        },
      },
      removeAttr: function (t, e) {
        var n,
          i,
          r = 0,
          o = e && e.match(Nt);
        if (o && 1 === t.nodeType)
          for (; (n = o[r++]); )
            (i = ft.propFix[n] || n),
              ft.expr.match.bool.test(n)
                ? (Ie && Le) || !Me.test(n)
                  ? (t[i] = !1)
                  : (t[ft.camelCase("default-" + n)] = t[i] = !1)
                : ft.attr(t, n, ""),
              t.removeAttribute(Le ? n : i);
      },
    }),
    (Be = {
      set: function (t, e, n) {
        return (
          !1 === e
            ? ft.removeAttr(t, n)
            : (Ie && Le) || !Me.test(n)
            ? t.setAttribute((!Le && ft.propFix[n]) || n, n)
            : (t[ft.camelCase("default-" + n)] = t[n] = !0),
          n
        );
      },
    }),
    ft.each(ft.expr.match.bool.source.match(/\w+/g), function (t, e) {
      var n = Pe[e] || ft.find.attr;
      (Ie && Le) || !Me.test(e)
        ? (Pe[e] = function (t, e, i) {
            var r, o;
            return (
              i ||
                ((o = Pe[e]),
                (Pe[e] = r),
                (r = null != n(t, e, i) ? e.toLowerCase() : null),
                (Pe[e] = o)),
              r
            );
          })
        : (Pe[e] = function (t, e, n) {
            if (!n)
              return t[ft.camelCase("default-" + e)] ? e.toLowerCase() : null;
          });
    }),
    (Ie && Le) ||
      (ft.attrHooks.value = {
        set: function (t, e, n) {
          if (!ft.nodeName(t, "input")) return $e && $e.set(t, e, n);
          t.defaultValue = e;
        },
      }),
    Le ||
      (($e = {
        set: function (t, e, n) {
          var i = t.getAttributeNode(n);
          if (
            (i || t.setAttributeNode((i = t.ownerDocument.createAttribute(n))),
            (i.value = e += ""),
            "value" === n || e === t.getAttribute(n))
          )
            return e;
        },
      }),
      (Pe.id =
        Pe.name =
        Pe.coords =
          function (t, e, n) {
            var i;
            if (!n)
              return (i = t.getAttributeNode(e)) && "" !== i.value
                ? i.value
                : null;
          }),
      (ft.valHooks.button = {
        get: function (t, e) {
          var n = t.getAttributeNode(e);
          if (n && n.specified) return n.value;
        },
        set: $e.set,
      }),
      (ft.attrHooks.contenteditable = {
        set: function (t, e, n) {
          $e.set(t, "" !== e && e, n);
        },
      }),
      ft.each(["width", "height"], function (t, e) {
        ft.attrHooks[e] = {
          set: function (t, n) {
            if ("" === n) return t.setAttribute(e, "auto"), n;
          },
        };
      })),
    ht.style ||
      (ft.attrHooks.style = {
        get: function (t) {
          return t.style.cssText || undefined;
        },
        set: function (t, e) {
          return (t.style.cssText = e + "");
        },
      });
  var qe = /^(?:input|select|textarea|button|object)$/i,
    Oe = /^(?:a|area)$/i;
  ft.fn.extend({
    prop: function (t, e) {
      return Rt(this, ft.prop, t, e, arguments.length > 1);
    },
    removeProp: function (t) {
      return (
        (t = ft.propFix[t] || t),
        this.each(function () {
          try {
            (this[t] = undefined), delete this[t];
          } catch (e) {}
        })
      );
    },
  }),
    ft.extend({
      prop: function (t, e, n) {
        var i,
          r,
          o = t.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return (
            (1 === o && ft.isXMLDoc(t)) ||
              ((e = ft.propFix[e] || e), (r = ft.propHooks[e])),
            n !== undefined
              ? r && "set" in r && (i = r.set(t, n, e)) !== undefined
                ? i
                : (t[e] = n)
              : r && "get" in r && null !== (i = r.get(t, e))
              ? i
              : t[e]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (t) {
            var e = ft.find.attr(t, "tabindex");
            return e
              ? parseInt(e, 10)
              : qe.test(t.nodeName) || (Oe.test(t.nodeName) && t.href)
              ? 0
              : -1;
          },
        },
      },
      propFix: { for: "htmlFor", class: "className" },
    }),
    ht.hrefNormalized ||
      ft.each(["href", "src"], function (t, e) {
        ft.propHooks[e] = {
          get: function (t) {
            return t.getAttribute(e, 4);
          },
        };
      }),
    ht.optSelected ||
      (ft.propHooks.selected = {
        get: function (t) {
          var e = t.parentNode;
          return (
            e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex),
            null
          );
        },
        set: function (t) {
          var e = t.parentNode;
          e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
        },
      }),
    ft.each(
      [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable",
      ],
      function () {
        ft.propFix[this.toLowerCase()] = this;
      }
    ),
    ht.enctype || (ft.propFix.enctype = "encoding");
  var He = /[\t\r\n\f]/g;
  ft.fn.extend({
    addClass: function (t) {
      var e,
        n,
        i,
        r,
        o,
        s,
        a,
        l = 0;
      if (ft.isFunction(t))
        return this.each(function (e) {
          ft(this).addClass(t.call(this, e, V(this)));
        });
      if ("string" == typeof t && t)
        for (e = t.match(Nt) || []; (n = this[l++]); )
          if (
            ((r = V(n)),
            (i = 1 === n.nodeType && (" " + r + " ").replace(He, " ")))
          ) {
            for (s = 0; (o = e[s++]); )
              i.indexOf(" " + o + " ") < 0 && (i += o + " ");
            r !== (a = ft.trim(i)) && ft.attr(n, "class", a);
          }
      return this;
    },
    removeClass: function (t) {
      var e,
        n,
        i,
        r,
        o,
        s,
        a,
        l = 0;
      if (ft.isFunction(t))
        return this.each(function (e) {
          ft(this).removeClass(t.call(this, e, V(this)));
        });
      if (!arguments.length) return this.attr("class", "");
      if ("string" == typeof t && t)
        for (e = t.match(Nt) || []; (n = this[l++]); )
          if (
            ((r = V(n)),
            (i = 1 === n.nodeType && (" " + r + " ").replace(He, " ")))
          ) {
            for (s = 0; (o = e[s++]); )
              for (; i.indexOf(" " + o + " ") > -1; )
                i = i.replace(" " + o + " ", " ");
            r !== (a = ft.trim(i)) && ft.attr(n, "class", a);
          }
      return this;
    },
    toggleClass: function (t, e) {
      var n = typeof t;
      return "boolean" == typeof e && "string" === n
        ? e
          ? this.addClass(t)
          : this.removeClass(t)
        : ft.isFunction(t)
        ? this.each(function (n) {
            ft(this).toggleClass(t.call(this, n, V(this), e), e);
          })
        : this.each(function () {
            var e, i, r, o;
            if ("string" === n)
              for (i = 0, r = ft(this), o = t.match(Nt) || []; (e = o[i++]); )
                r.hasClass(e) ? r.removeClass(e) : r.addClass(e);
            else
              (t !== undefined && "boolean" !== n) ||
                ((e = V(this)) && ft._data(this, "__className__", e),
                ft.attr(
                  this,
                  "class",
                  e || !1 === t ? "" : ft._data(this, "__className__") || ""
                ));
          });
    },
    hasClass: function (t) {
      var e,
        n,
        i = 0;
      for (e = " " + t + " "; (n = this[i++]); )
        if (
          1 === n.nodeType &&
          (" " + V(n) + " ").replace(He, " ").indexOf(e) > -1
        )
          return !0;
      return !1;
    },
  }),
    ft.each(
      "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
        " "
      ),
      function (t, e) {
        ft.fn[e] = function (t, n) {
          return arguments.length > 0
            ? this.on(e, null, t, n)
            : this.trigger(e);
        };
      }
    ),
    ft.fn.extend({
      hover: function (t, e) {
        return this.mouseenter(t).mouseleave(e || t);
      },
    });
  var Re = t.location,
    ze = ft.now(),
    Ve = /\?/,
    We =
      /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  (ft.parseJSON = function (e) {
    if (t.JSON && t.JSON.parse) return t.JSON.parse(e + "");
    var n,
      i = null,
      r = ft.trim(e + "");
    return r &&
      !ft.trim(
        r.replace(We, function (t, e, r, o) {
          return (
            n && e && (i = 0), 0 === i ? t : ((n = r || e), (i += !o - !r), "")
          );
        })
      )
      ? Function("return " + r)()
      : ft.error("Invalid JSON: " + e);
  }),
    (ft.parseXML = function (e) {
      var n;
      if (!e || "string" != typeof e) return null;
      try {
        t.DOMParser
          ? (n = new t.DOMParser().parseFromString(e, "text/xml"))
          : (((n = new t.ActiveXObject("Microsoft.XMLDOM")).async = "false"),
            n.loadXML(e));
      } catch (i) {
        n = undefined;
      }
      return (
        (n &&
          n.documentElement &&
          !n.getElementsByTagName("parsererror").length) ||
          ft.error("Invalid XML: " + e),
        n
      );
    });
  var Ue = /#.*$/,
    Ke = /([?&])_=[^&]*/,
    Xe = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Ge = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Ye = /^(?:GET|HEAD)$/,
    Qe = /^\/\//,
    Je = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    Ze = {},
    tn = {},
    en = "*/".concat("*"),
    nn = Re.href,
    rn = Je.exec(nn.toLowerCase()) || [];
  ft.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: nn,
      type: "GET",
      isLocal: Ge.test(rn[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": en,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript",
      },
      contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON",
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": ft.parseJSON,
        "text xml": ft.parseXML,
      },
      flatOptions: { url: !0, context: !0 },
    },
    ajaxSetup: function (t, e) {
      return e ? K(K(t, ft.ajaxSettings), e) : K(ft.ajaxSettings, t);
    },
    ajaxPrefilter: W(Ze),
    ajaxTransport: W(tn),
    ajax: function (e, n) {
      function i(e, n, i, r) {
        var o,
          h,
          y,
          b,
          w,
          C = n;
        2 !== x &&
          ((x = 2),
          l && t.clearTimeout(l),
          (u = undefined),
          (a = r || ""),
          (k.readyState = e > 0 ? 4 : 0),
          (o = (e >= 200 && e < 300) || 304 === e),
          i && (b = X(d, k, i)),
          (b = G(d, b, k, o)),
          o
            ? (d.ifModified &&
                ((w = k.getResponseHeader("Last-Modified")) &&
                  (ft.lastModified[s] = w),
                (w = k.getResponseHeader("etag")) && (ft.etag[s] = w)),
              204 === e || "HEAD" === d.type
                ? (C = "nocontent")
                : 304 === e
                ? (C = "notmodified")
                : ((C = b.state), (h = b.data), (o = !(y = b.error))))
            : ((y = C), (!e && C) || ((C = "error"), e < 0 && (e = 0))),
          (k.status = e),
          (k.statusText = (n || C) + ""),
          o ? g.resolveWith(f, [h, C, k]) : g.rejectWith(f, [k, C, y]),
          k.statusCode(v),
          (v = undefined),
          c && p.trigger(o ? "ajaxSuccess" : "ajaxError", [k, d, o ? h : y]),
          m.fireWith(f, [k, C]),
          c &&
            (p.trigger("ajaxComplete", [k, d]),
            --ft.active || ft.event.trigger("ajaxStop")));
      }
      "object" == typeof e && ((n = e), (e = undefined)), (n = n || {});
      var r,
        o,
        s,
        a,
        l,
        c,
        u,
        h,
        d = ft.ajaxSetup({}, n),
        f = d.context || d,
        p = d.context && (f.nodeType || f.jquery) ? ft(f) : ft.event,
        g = ft.Deferred(),
        m = ft.Callbacks("once memory"),
        v = d.statusCode || {},
        y = {},
        b = {},
        x = 0,
        w = "canceled",
        k = {
          readyState: 0,
          getResponseHeader: function (t) {
            var e;
            if (2 === x) {
              if (!h)
                for (h = {}; (e = Xe.exec(a)); ) h[e[1].toLowerCase()] = e[2];
              e = h[t.toLowerCase()];
            }
            return null == e ? null : e;
          },
          getAllResponseHeaders: function () {
            return 2 === x ? a : null;
          },
          setRequestHeader: function (t, e) {
            var n = t.toLowerCase();
            return x || ((t = b[n] = b[n] || t), (y[t] = e)), this;
          },
          overrideMimeType: function (t) {
            return x || (d.mimeType = t), this;
          },
          statusCode: function (t) {
            var e;
            if (t)
              if (x < 2) for (e in t) v[e] = [v[e], t[e]];
              else k.always(t[k.status]);
            return this;
          },
          abort: function (t) {
            var e = t || w;
            return u && u.abort(e), i(0, e), this;
          },
        };
      if (
        ((g.promise(k).complete = m.add),
        (k.success = k.done),
        (k.error = k.fail),
        (d.url = ((e || d.url || nn) + "")
          .replace(Ue, "")
          .replace(Qe, rn[1] + "//")),
        (d.type = n.method || n.type || d.method || d.type),
        (d.dataTypes = ft
          .trim(d.dataType || "*")
          .toLowerCase()
          .match(Nt) || [""]),
        null == d.crossDomain &&
          ((r = Je.exec(d.url.toLowerCase())),
          (d.crossDomain = !(
            !r ||
            (r[1] === rn[1] &&
              r[2] === rn[2] &&
              (r[3] || ("http:" === r[1] ? "80" : "443")) ===
                (rn[3] || ("http:" === rn[1] ? "80" : "443")))
          ))),
        d.data &&
          d.processData &&
          "string" != typeof d.data &&
          (d.data = ft.param(d.data, d.traditional)),
        U(Ze, d, n, k),
        2 === x)
      )
        return k;
      for (o in ((c = ft.event && d.global) &&
        0 == ft.active++ &&
        ft.event.trigger("ajaxStart"),
      (d.type = d.type.toUpperCase()),
      (d.hasContent = !Ye.test(d.type)),
      (s = d.url),
      d.hasContent ||
        (d.data &&
          ((s = d.url += (Ve.test(s) ? "&" : "?") + d.data), delete d.data),
        !1 === d.cache &&
          (d.url = Ke.test(s)
            ? s.replace(Ke, "$1_=" + ze++)
            : s + (Ve.test(s) ? "&" : "?") + "_=" + ze++)),
      d.ifModified &&
        (ft.lastModified[s] &&
          k.setRequestHeader("If-Modified-Since", ft.lastModified[s]),
        ft.etag[s] && k.setRequestHeader("If-None-Match", ft.etag[s])),
      ((d.data && d.hasContent && !1 !== d.contentType) || n.contentType) &&
        k.setRequestHeader("Content-Type", d.contentType),
      k.setRequestHeader(
        "Accept",
        d.dataTypes[0] && d.accepts[d.dataTypes[0]]
          ? d.accepts[d.dataTypes[0]] +
              ("*" !== d.dataTypes[0] ? ", " + en + "; q=0.01" : "")
          : d.accepts["*"]
      ),
      d.headers))
        k.setRequestHeader(o, d.headers[o]);
      if (d.beforeSend && (!1 === d.beforeSend.call(f, k, d) || 2 === x))
        return k.abort();
      for (o in ((w = "abort"), { success: 1, error: 1, complete: 1 }))
        k[o](d[o]);
      if ((u = U(tn, d, n, k))) {
        if (((k.readyState = 1), c && p.trigger("ajaxSend", [k, d]), 2 === x))
          return k;
        d.async &&
          d.timeout > 0 &&
          (l = t.setTimeout(function () {
            k.abort("timeout");
          }, d.timeout));
        try {
          (x = 1), u.send(y, i);
        } catch (C) {
          if (!(x < 2)) throw C;
          i(-1, C);
        }
      } else i(-1, "No Transport");
      return k;
    },
    getJSON: function (t, e, n) {
      return ft.get(t, e, n, "json");
    },
    getScript: function (t, e) {
      return ft.get(t, undefined, e, "script");
    },
  }),
    ft.each(["get", "post"], function (t, e) {
      ft[e] = function (t, n, i, r) {
        return (
          ft.isFunction(n) && ((r = r || i), (i = n), (n = undefined)),
          ft.ajax(
            ft.extend(
              { url: t, type: e, dataType: r, data: n, success: i },
              ft.isPlainObject(t) && t
            )
          )
        );
      };
    }),
    (ft._evalUrl = function (t) {
      return ft.ajax({
        url: t,
        type: "GET",
        dataType: "script",
        cache: !0,
        async: !1,
        global: !1,
        throws: !0,
      });
    }),
    ft.fn.extend({
      wrapAll: function (t) {
        if (ft.isFunction(t))
          return this.each(function (e) {
            ft(this).wrapAll(t.call(this, e));
          });
        if (this[0]) {
          var e = ft(t, this[0].ownerDocument).eq(0).clone(!0);
          this[0].parentNode && e.insertBefore(this[0]),
            e
              .map(function () {
                for (
                  var t = this;
                  t.firstChild && 1 === t.firstChild.nodeType;

                )
                  t = t.firstChild;
                return t;
              })
              .append(this);
        }
        return this;
      },
      wrapInner: function (t) {
        return ft.isFunction(t)
          ? this.each(function (e) {
              ft(this).wrapInner(t.call(this, e));
            })
          : this.each(function () {
              var e = ft(this),
                n = e.contents();
              n.length ? n.wrapAll(t) : e.append(t);
            });
      },
      wrap: function (t) {
        var e = ft.isFunction(t);
        return this.each(function (n) {
          ft(this).wrapAll(e ? t.call(this, n) : t);
        });
      },
      unwrap: function () {
        return this.parent()
          .each(function () {
            ft.nodeName(this, "body") || ft(this).replaceWith(this.childNodes);
          })
          .end();
      },
    }),
    (ft.expr.filters.hidden = function (t) {
      return ht.reliableHiddenOffsets()
        ? t.offsetWidth <= 0 &&
            t.offsetHeight <= 0 &&
            !t.getClientRects().length
        : Q(t);
    }),
    (ft.expr.filters.visible = function (t) {
      return !ft.expr.filters.hidden(t);
    });
  var on = /%20/g,
    sn = /\[\]$/,
    an = /\r?\n/g,
    ln = /^(?:submit|button|image|reset|file)$/i,
    cn = /^(?:input|select|textarea|keygen)/i;
  (ft.param = function (t, e) {
    var n,
      i = [],
      r = function (t, e) {
        (e = ft.isFunction(e) ? e() : null == e ? "" : e),
          (i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e));
      };
    if (
      (e === undefined && (e = ft.ajaxSettings && ft.ajaxSettings.traditional),
      ft.isArray(t) || (t.jquery && !ft.isPlainObject(t)))
    )
      ft.each(t, function () {
        r(this.name, this.value);
      });
    else for (n in t) J(n, t[n], e, r);
    return i.join("&").replace(on, "+");
  }),
    ft.fn.extend({
      serialize: function () {
        return ft.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var t = ft.prop(this, "elements");
          return t ? ft.makeArray(t) : this;
        })
          .filter(function () {
            var t = this.type;
            return (
              this.name &&
              !ft(this).is(":disabled") &&
              cn.test(this.nodeName) &&
              !ln.test(t) &&
              (this.checked || !zt.test(t))
            );
          })
          .map(function (t, e) {
            var n = ft(this).val();
            return null == n
              ? null
              : ft.isArray(n)
              ? ft.map(n, function (t) {
                  return { name: e.name, value: t.replace(an, "\r\n") };
                })
              : { name: e.name, value: n.replace(an, "\r\n") };
          })
          .get();
      },
    }),
    (ft.ajaxSettings.xhr =
      t.ActiveXObject !== undefined
        ? function () {
            return this.isLocal
              ? tt()
              : it.documentMode > 8
              ? Z()
              : (/^(get|post|head|put|delete|options)$/i.test(this.type) &&
                  Z()) ||
                tt();
          }
        : Z);
  var un = 0,
    hn = {},
    dn = ft.ajaxSettings.xhr();
  t.attachEvent &&
    t.attachEvent("onunload", function () {
      for (var t in hn) hn[t](undefined, !0);
    }),
    (ht.cors = !!dn && "withCredentials" in dn),
    (dn = ht.ajax = !!dn) &&
      ft.ajaxTransport(function (e) {
        var n;
        if (!e.crossDomain || ht.cors)
          return {
            send: function (i, r) {
              var o,
                s = e.xhr(),
                a = ++un;
              if (
                (s.open(e.type, e.url, e.async, e.username, e.password),
                e.xhrFields)
              )
                for (o in e.xhrFields) s[o] = e.xhrFields[o];
              for (o in (e.mimeType &&
                s.overrideMimeType &&
                s.overrideMimeType(e.mimeType),
              e.crossDomain ||
                i["X-Requested-With"] ||
                (i["X-Requested-With"] = "XMLHttpRequest"),
              i))
                i[o] !== undefined && s.setRequestHeader(o, i[o] + "");
              s.send((e.hasContent && e.data) || null),
                (n = function (t, i) {
                  var o, l, c;
                  if (n && (i || 4 === s.readyState))
                    if (
                      (delete hn[a],
                      (n = undefined),
                      (s.onreadystatechange = ft.noop),
                      i)
                    )
                      4 !== s.readyState && s.abort();
                    else {
                      (c = {}),
                        (o = s.status),
                        "string" == typeof s.responseText &&
                          (c.text = s.responseText);
                      try {
                        l = s.statusText;
                      } catch (u) {
                        l = "";
                      }
                      o || !e.isLocal || e.crossDomain
                        ? 1223 === o && (o = 204)
                        : (o = c.text ? 200 : 404);
                    }
                  c && r(o, l, c, s.getAllResponseHeaders());
                }),
                e.async
                  ? 4 === s.readyState
                    ? t.setTimeout(n)
                    : (s.onreadystatechange = hn[a] = n)
                  : n();
            },
            abort: function () {
              n && n(undefined, !0);
            },
          };
      }),
    ft.ajaxSetup({
      accepts: {
        script:
          "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
      },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        "text script": function (t) {
          return ft.globalEval(t), t;
        },
      },
    }),
    ft.ajaxPrefilter("script", function (t) {
      t.cache === undefined && (t.cache = !1),
        t.crossDomain && ((t.type = "GET"), (t.global = !1));
    }),
    ft.ajaxTransport("script", function (t) {
      if (t.crossDomain) {
        var e,
          n = it.head || ft("head")[0] || it.documentElement;
        return {
          send: function (i, r) {
            ((e = it.createElement("script")).async = !0),
              t.scriptCharset && (e.charset = t.scriptCharset),
              (e.src = t.url),
              (e.onload = e.onreadystatechange =
                function (t, n) {
                  (n ||
                    !e.readyState ||
                    /loaded|complete/.test(e.readyState)) &&
                    ((e.onload = e.onreadystatechange = null),
                    e.parentNode && e.parentNode.removeChild(e),
                    (e = null),
                    n || r(200, "success"));
                }),
              n.insertBefore(e, n.firstChild);
          },
          abort: function () {
            e && e.onload(undefined, !0);
          },
        };
      }
    });
  var fn = [],
    pn = /(=)\?(?=&|$)|\?\?/;
  ft.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var t = fn.pop() || ft.expando + "_" + ze++;
      return (this[t] = !0), t;
    },
  }),
    ft.ajaxPrefilter("json jsonp", function (e, n, i) {
      var r,
        o,
        s,
        a =
          !1 !== e.jsonp &&
          (pn.test(e.url)
            ? "url"
            : "string" == typeof e.data &&
              0 ===
                (e.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              pn.test(e.data) &&
              "data");
      if (a || "jsonp" === e.dataTypes[0])
        return (
          (r = e.jsonpCallback =
            ft.isFunction(e.jsonpCallback)
              ? e.jsonpCallback()
              : e.jsonpCallback),
          a
            ? (e[a] = e[a].replace(pn, "$1" + r))
            : !1 !== e.jsonp &&
              (e.url += (Ve.test(e.url) ? "&" : "?") + e.jsonp + "=" + r),
          (e.converters["script json"] = function () {
            return s || ft.error(r + " was not called"), s[0];
          }),
          (e.dataTypes[0] = "json"),
          (o = t[r]),
          (t[r] = function () {
            s = arguments;
          }),
          i.always(function () {
            o === undefined ? ft(t).removeProp(r) : (t[r] = o),
              e[r] && ((e.jsonpCallback = n.jsonpCallback), fn.push(r)),
              s && ft.isFunction(o) && o(s[0]),
              (s = o = undefined);
          }),
          "script"
        );
    }),
    (ft.parseHTML = function (t, e, n) {
      if (!t || "string" != typeof t) return null;
      "boolean" == typeof e && ((n = e), (e = !1)), (e = e || it);
      var i = kt.exec(t),
        r = !n && [];
      return i
        ? [e.createElement(i[1])]
        : ((i = v([t], e, r)),
          r && r.length && ft(r).remove(),
          ft.merge([], i.childNodes));
    });
  var gn = ft.fn.load;
  (ft.fn.load = function (t, e, n) {
    if ("string" != typeof t && gn) return gn.apply(this, arguments);
    var i,
      r,
      o,
      s = this,
      a = t.indexOf(" ");
    return (
      a > -1 && ((i = ft.trim(t.slice(a, t.length))), (t = t.slice(0, a))),
      ft.isFunction(e)
        ? ((n = e), (e = undefined))
        : e && "object" == typeof e && (r = "POST"),
      s.length > 0 &&
        ft
          .ajax({ url: t, type: r || "GET", dataType: "html", data: e })
          .done(function (t) {
            (o = arguments),
              s.html(i ? ft("<div>").append(ft.parseHTML(t)).find(i) : t);
          })
          .always(
            n &&
              function (t, e) {
                s.each(function () {
                  n.apply(this, o || [t.responseText, e, t]);
                });
              }
          ),
      this
    );
  }),
    ft.each(
      [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend",
      ],
      function (t, e) {
        ft.fn[e] = function (t) {
          return this.on(e, t);
        };
      }
    ),
    (ft.expr.filters.animated = function (t) {
      return ft.grep(ft.timers, function (e) {
        return t === e.elem;
      }).length;
    }),
    (ft.offset = {
      setOffset: function (t, e, n) {
        var i,
          r,
          o,
          s,
          a,
          l,
          c = ft.css(t, "position"),
          u = ft(t),
          h = {};
        "static" === c && (t.style.position = "relative"),
          (a = u.offset()),
          (o = ft.css(t, "top")),
          (l = ft.css(t, "left")),
          ("absolute" === c || "fixed" === c) && ft.inArray("auto", [o, l]) > -1
            ? ((s = (i = u.position()).top), (r = i.left))
            : ((s = parseFloat(o) || 0), (r = parseFloat(l) || 0)),
          ft.isFunction(e) && (e = e.call(t, n, ft.extend({}, a))),
          null != e.top && (h.top = e.top - a.top + s),
          null != e.left && (h.left = e.left - a.left + r),
          "using" in e ? e.using.call(t, h) : u.css(h);
      },
    }),
    ft.fn.extend({
      offset: function (t) {
        if (arguments.length)
          return t === undefined
            ? this
            : this.each(function (e) {
                ft.offset.setOffset(this, t, e);
              });
        var e,
          n,
          i = { top: 0, left: 0 },
          r = this[0],
          o = r && r.ownerDocument;
        return o
          ? ((e = o.documentElement),
            ft.contains(e, r)
              ? ("undefined" != typeof r.getBoundingClientRect &&
                  (i = r.getBoundingClientRect()),
                (n = et(o)),
                {
                  top:
                    i.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                  left:
                    i.left +
                    (n.pageXOffset || e.scrollLeft) -
                    (e.clientLeft || 0),
                })
              : i)
          : void 0;
      },
      position: function () {
        if (this[0]) {
          var t,
            e,
            n = { top: 0, left: 0 },
            i = this[0];
          return (
            "fixed" === ft.css(i, "position")
              ? (e = i.getBoundingClientRect())
              : ((t = this.offsetParent()),
                (e = this.offset()),
                ft.nodeName(t[0], "html") || (n = t.offset()),
                (n.top += ft.css(t[0], "borderTopWidth", !0)),
                (n.left += ft.css(t[0], "borderLeftWidth", !0))),
            {
              top: e.top - n.top - ft.css(i, "marginTop", !0),
              left: e.left - n.left - ft.css(i, "marginLeft", !0),
            }
          );
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (
            var t = this.offsetParent;
            t && !ft.nodeName(t, "html") && "static" === ft.css(t, "position");

          )
            t = t.offsetParent;
          return t || ge;
        });
      },
    }),
    ft.each(
      { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
      function (t, e) {
        var n = /Y/.test(e);
        ft.fn[t] = function (i) {
          return Rt(
            this,
            function (t, i, r) {
              var o = et(t);
              if (r === undefined)
                return o
                  ? e in o
                    ? o[e]
                    : o.document.documentElement[i]
                  : t[i];
              o
                ? o.scrollTo(
                    n ? ft(o).scrollLeft() : r,
                    n ? r : ft(o).scrollTop()
                  )
                : (t[i] = r);
            },
            t,
            i,
            arguments.length,
            null
          );
        };
      }
    ),
    ft.each(["top", "left"], function (t, e) {
      ft.cssHooks[e] = F(ht.pixelPosition, function (t, n) {
        if (n)
          return (n = ve(t, e)), fe.test(n) ? ft(t).position()[e] + "px" : n;
      });
    }),
    ft.each({ Height: "height", Width: "width" }, function (t, e) {
      ft.each(
        { padding: "inner" + t, content: e, "": "outer" + t },
        function (n, i) {
          ft.fn[i] = function (i, r) {
            var o = arguments.length && (n || "boolean" != typeof i),
              s = n || (!0 === i || !0 === r ? "margin" : "border");
            return Rt(
              this,
              function (e, n, i) {
                var r;
                return ft.isWindow(e)
                  ? e.document.documentElement["client" + t]
                  : 9 === e.nodeType
                  ? ((r = e.documentElement),
                    Math.max(
                      e.body["scroll" + t],
                      r["scroll" + t],
                      e.body["offset" + t],
                      r["offset" + t],
                      r["client" + t]
                    ))
                  : i === undefined
                  ? ft.css(e, n, s)
                  : ft.style(e, n, i, s);
              },
              e,
              o ? i : undefined,
              o,
              null
            );
          };
        }
      );
    }),
    ft.fn.extend({
      bind: function (t, e, n) {
        return this.on(t, null, e, n);
      },
      unbind: function (t, e) {
        return this.off(t, null, e);
      },
      delegate: function (t, e, n, i) {
        return this.on(e, t, n, i);
      },
      undelegate: function (t, e, n) {
        return 1 === arguments.length
          ? this.off(t, "**")
          : this.off(e, t || "**", n);
      },
    }),
    (ft.fn.size = function () {
      return this.length;
    }),
    (ft.fn.andSelf = ft.fn.addBack),
    "function" == typeof define &&
      define.amd &&
      define("jquery", [], function () {
        return ft;
      });
  var mn = t.jQuery,
    vn = t.$;
  return (
    (ft.noConflict = function (e) {
      return (
        t.$ === ft && (t.$ = vn), e && t.jQuery === ft && (t.jQuery = mn), ft
      );
    }),
    e || (t.jQuery = t.$ = ft),
    ft
  );
}),
  (function (t, e) {
    "use strict";
    var n;
    t.rails !== e && t.error("jquery-ujs has already been loaded!");
    var i = t(document);
    (t.rails = n =
      {
        linkClickSelector:
          "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
        buttonClickSelector:
          "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
        inputChangeSelector:
          "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector:
          "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        disableSelector:
          "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector:
          "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector:
          "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
        fileInputSelector: "input[name][type=file]:not([disabled])",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector:
          "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        csrfToken: function () {
          return t("meta[name=csrf-token]").attr("content");
        },
        csrfParam: function () {
          return t("meta[name=csrf-param]").attr("content");
        },
        CSRFProtection: function (t) {
          var e = n.csrfToken();
          e && t.setRequestHeader("X-CSRF-Token", e);
        },
        refreshCSRFTokens: function () {
          t('form input[name="' + n.csrfParam() + '"]').val(n.csrfToken());
        },
        fire: function (e, n, i) {
          var r = t.Event(n);
          return e.trigger(r, i), !1 !== r.result;
        },
        confirm: function (t) {
          return confirm(t);
        },
        ajax: function (e) {
          return t.ajax(e);
        },
        href: function (t) {
          return t[0].href;
        },
        isRemote: function (t) {
          return t.data("remote") !== e && !1 !== t.data("remote");
        },
        handleRemote: function (i) {
          var r, o, s, a, l, c;
          if (n.fire(i, "ajax:before")) {
            if (
              ((a = i.data("with-credentials") || null),
              (l =
                i.data("type") || (t.ajaxSettings && t.ajaxSettings.dataType)),
              i.is("form"))
            ) {
              (r = i.data("ujs:submit-button-formmethod") || i.attr("method")),
                (o =
                  i.data("ujs:submit-button-formaction") || i.attr("action")),
                (s = t(i[0]).serializeArray());
              var u = i.data("ujs:submit-button");
              u && (s.push(u), i.data("ujs:submit-button", null)),
                i.data("ujs:submit-button-formmethod", null),
                i.data("ujs:submit-button-formaction", null);
            } else
              i.is(n.inputChangeSelector)
                ? ((r = i.data("method")),
                  (o = i.data("url")),
                  (s = i.serialize()),
                  i.data("params") && (s = s + "&" + i.data("params")))
                : i.is(n.buttonClickSelector)
                ? ((r = i.data("method") || "get"),
                  (o = i.data("url")),
                  (s = i.serialize()),
                  i.data("params") && (s = s + "&" + i.data("params")))
                : ((r = i.data("method")),
                  (o = n.href(i)),
                  (s = i.data("params") || null));
            return (
              (c = {
                type: r || "GET",
                data: s,
                dataType: l,
                beforeSend: function (t, r) {
                  if (
                    (r.dataType === e &&
                      t.setRequestHeader(
                        "accept",
                        "*/*;q=0.5, " + r.accepts.script
                      ),
                    !n.fire(i, "ajax:beforeSend", [t, r]))
                  )
                    return !1;
                  i.trigger("ajax:send", t);
                },
                success: function (t, e, n) {
                  i.trigger("ajax:success", [t, e, n]);
                },
                complete: function (t, e) {
                  i.trigger("ajax:complete", [t, e]);
                },
                error: function (t, e, n) {
                  i.trigger("ajax:error", [t, e, n]);
                },
                crossDomain: n.isCrossDomain(o),
              }),
              a && (c.xhrFields = { withCredentials: a }),
              o && (c.url = o),
              n.ajax(c)
            );
          }
          return !1;
        },
        isCrossDomain: function (t) {
          var e = document.createElement("a");
          e.href = location.href;
          var n = document.createElement("a");
          try {
            return (
              (n.href = t),
              (n.href = n.href),
              !(
                ((!n.protocol || ":" === n.protocol) && !n.host) ||
                e.protocol + "//" + e.host == n.protocol + "//" + n.host
              )
            );
          } catch (i) {
            return !0;
          }
        },
        handleMethod: function (i) {
          var r = n.href(i),
            o = i.data("method"),
            s = i.attr("target"),
            a = n.csrfToken(),
            l = n.csrfParam(),
            c = t('<form method="post" action="' + r + '"></form>'),
            u = '<input name="_method" value="' + o + '" type="hidden" />';
          l === e ||
            a === e ||
            n.isCrossDomain(r) ||
            (u += '<input name="' + l + '" value="' + a + '" type="hidden" />'),
            s && c.attr("target", s),
            c.hide().append(u).appendTo("body"),
            c.submit();
        },
        formElements: function (e, n) {
          return e.is("form") ? t(e[0].elements).filter(n) : e.find(n);
        },
        disableFormElements: function (e) {
          n.formElements(e, n.disableSelector).each(function () {
            n.disableFormElement(t(this));
          });
        },
        disableFormElement: function (t) {
          var n, i;
          (n = t.is("button") ? "html" : "val"),
            (i = t.data("disable-with")) !== e &&
              (t.data("ujs:enable-with", t[n]()), t[n](i)),
            t.prop("disabled", !0),
            t.data("ujs:disabled", !0);
        },
        enableFormElements: function (e) {
          n.formElements(e, n.enableSelector).each(function () {
            n.enableFormElement(t(this));
          });
        },
        enableFormElement: function (t) {
          var n = t.is("button") ? "html" : "val";
          t.data("ujs:enable-with") !== e &&
            (t[n](t.data("ujs:enable-with")), t.removeData("ujs:enable-with")),
            t.prop("disabled", !1),
            t.removeData("ujs:disabled");
        },
        allowAction: function (t) {
          var e,
            i = t.data("confirm"),
            r = !1;
          if (!i) return !0;
          if (n.fire(t, "confirm")) {
            try {
              r = n.confirm(i);
            } catch (o) {
              (console.error || console.log).call(console, o.stack || o);
            }
            e = n.fire(t, "confirm:complete", [r]);
          }
          return r && e;
        },
        blankInputs: function (e, n, i) {
          var r,
            o,
            s,
            a = t(),
            l = n || "input,textarea",
            c = e.find(l),
            u = {};
          return (
            c.each(function () {
              (r = t(this)).is("input[type=radio]")
                ? ((s = r.attr("name")),
                  u[s] ||
                    (0 ===
                      e.find('input[type=radio]:checked[name="' + s + '"]')
                        .length &&
                      ((o = e.find('input[type=radio][name="' + s + '"]')),
                      (a = a.add(o))),
                    (u[s] = s)))
                : (r.is("input[type=checkbox],input[type=radio]")
                    ? r.is(":checked")
                    : !!r.val()) === i && (a = a.add(r));
            }),
            !!a.length && a
          );
        },
        nonBlankInputs: function (t, e) {
          return n.blankInputs(t, e, !0);
        },
        stopEverything: function (e) {
          return (
            t(e.target).trigger("ujs:everythingStopped"),
            e.stopImmediatePropagation(),
            !1
          );
        },
        disableElement: function (t) {
          var i = t.data("disable-with");
          i !== e && (t.data("ujs:enable-with", t.html()), t.html(i)),
            t.bind("click.railsDisable", function (t) {
              return n.stopEverything(t);
            }),
            t.data("ujs:disabled", !0);
        },
        enableElement: function (t) {
          t.data("ujs:enable-with") !== e &&
            (t.html(t.data("ujs:enable-with")),
            t.removeData("ujs:enable-with")),
            t.unbind("click.railsDisable"),
            t.removeData("ujs:disabled");
        },
      }),
      n.fire(i, "rails:attachBindings") &&
        (t.ajaxPrefilter(function (t, e, i) {
          t.crossDomain || n.CSRFProtection(i);
        }),
        t(window).on("pageshow.rails", function () {
          t(t.rails.enableSelector).each(function () {
            var e = t(this);
            e.data("ujs:disabled") && t.rails.enableFormElement(e);
          }),
            t(t.rails.linkDisableSelector).each(function () {
              var e = t(this);
              e.data("ujs:disabled") && t.rails.enableElement(e);
            });
        }),
        i.on("ajax:complete", n.linkDisableSelector, function () {
          n.enableElement(t(this));
        }),
        i.on("ajax:complete", n.buttonDisableSelector, function () {
          n.enableFormElement(t(this));
        }),
        i.on("click.rails", n.linkClickSelector, function (e) {
          var i = t(this),
            r = i.data("method"),
            o = i.data("params"),
            s = e.metaKey || e.ctrlKey;
          if (!n.allowAction(i)) return n.stopEverything(e);
          if (
            (!s && i.is(n.linkDisableSelector) && n.disableElement(i),
            n.isRemote(i))
          ) {
            if (s && (!r || "GET" === r) && !o) return !0;
            var a = n.handleRemote(i);
            return (
              !1 === a
                ? n.enableElement(i)
                : a.fail(function () {
                    n.enableElement(i);
                  }),
              !1
            );
          }
          return r ? (n.handleMethod(i), !1) : void 0;
        }),
        i.on("click.rails", n.buttonClickSelector, function (e) {
          var i = t(this);
          if (!n.allowAction(i) || !n.isRemote(i)) return n.stopEverything(e);
          i.is(n.buttonDisableSelector) && n.disableFormElement(i);
          var r = n.handleRemote(i);
          return (
            !1 === r
              ? n.enableFormElement(i)
              : r.fail(function () {
                  n.enableFormElement(i);
                }),
            !1
          );
        }),
        i.on("change.rails", n.inputChangeSelector, function (e) {
          var i = t(this);
          return n.allowAction(i) && n.isRemote(i)
            ? (n.handleRemote(i), !1)
            : n.stopEverything(e);
        }),
        i.on("submit.rails", n.formSubmitSelector, function (i) {
          var r,
            o,
            s = t(this),
            a = n.isRemote(s);
          if (!n.allowAction(s)) return n.stopEverything(i);
          if (s.attr("novalidate") === e)
            if (s.data("ujs:formnovalidate-button") === e) {
              if (
                (r = n.blankInputs(s, n.requiredInputSelector, !1)) &&
                n.fire(s, "ajax:aborted:required", [r])
              )
                return n.stopEverything(i);
            } else s.data("ujs:formnovalidate-button", e);
          if (a) {
            if ((o = n.nonBlankInputs(s, n.fileInputSelector))) {
              setTimeout(function () {
                n.disableFormElements(s);
              }, 13);
              var l = n.fire(s, "ajax:aborted:file", [o]);
              return (
                l ||
                  setTimeout(function () {
                    n.enableFormElements(s);
                  }, 13),
                l
              );
            }
            return n.handleRemote(s), !1;
          }
          setTimeout(function () {
            n.disableFormElements(s);
          }, 13);
        }),
        i.on("click.rails", n.formInputClickSelector, function (e) {
          var i = t(this);
          if (!n.allowAction(i)) return n.stopEverything(e);
          var r = i.attr("name"),
            o = r ? { name: r, value: i.val() } : null,
            s = i.closest("form");
          0 === s.length && (s = t("#" + i.attr("form"))),
            s.data("ujs:submit-button", o),
            s.data("ujs:formnovalidate-button", i.attr("formnovalidate")),
            s.data("ujs:submit-button-formaction", i.attr("formaction")),
            s.data("ujs:submit-button-formmethod", i.attr("formmethod"));
        }),
        i.on("ajax:send.rails", n.formSubmitSelector, function (e) {
          this === e.target && n.disableFormElements(t(this));
        }),
        i.on("ajax:complete.rails", n.formSubmitSelector, function (e) {
          this === e.target && n.enableFormElements(t(this));
        }),
        t(function () {
          n.refreshCSRFTokens();
        }));
  })(jQuery),
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery"], t)
      : t(jQuery);
  })(function (t) {
    return (t.ui = t.ui || {}), (t.ui.version = "1.12.1");
  }),
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery", "./version"], t)
      : t(jQuery);
  })(function (t) {
    return (t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()));
  }),
  /*!
   * jQuery UI Widget 1.12.1
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   */
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery", "./version"], t)
      : t(jQuery);
  })(function (t) {
    var e,
      n = 0,
      i = Array.prototype.slice;
    return (
      (t.cleanData =
        ((e = t.cleanData),
        function (n) {
          var i, r, o;
          for (o = 0; null != (r = n[o]); o++)
            try {
              (i = t._data(r, "events")) &&
                i.remove &&
                t(r).triggerHandler("remove");
            } catch (s) {}
          e(n);
        })),
      (t.widget = function (e, n, i) {
        var r,
          o,
          s,
          a = {},
          l = e.split(".")[0],
          c = l + "-" + (e = e.split(".")[1]);
        return (
          i || ((i = n), (n = t.Widget)),
          t.isArray(i) && (i = t.extend.apply(null, [{}].concat(i))),
          (t.expr[":"][c.toLowerCase()] = function (e) {
            return !!t.data(e, c);
          }),
          (t[l] = t[l] || {}),
          (r = t[l][e]),
          (o = t[l][e] =
            function (t, e) {
              if (!this._createWidget) return new o(t, e);
              arguments.length && this._createWidget(t, e);
            }),
          t.extend(o, r, {
            version: i.version,
            _proto: t.extend({}, i),
            _childConstructors: [],
          }),
          ((s = new n()).options = t.widget.extend({}, s.options)),
          t.each(i, function (e, i) {
            t.isFunction(i)
              ? (a[e] = (function () {
                  function t() {
                    return n.prototype[e].apply(this, arguments);
                  }
                  function r(t) {
                    return n.prototype[e].apply(this, t);
                  }
                  return function () {
                    var e,
                      n = this._super,
                      o = this._superApply;
                    return (
                      (this._super = t),
                      (this._superApply = r),
                      (e = i.apply(this, arguments)),
                      (this._super = n),
                      (this._superApply = o),
                      e
                    );
                  };
                })())
              : (a[e] = i);
          }),
          (o.prototype = t.widget.extend(
            s,
            { widgetEventPrefix: (r && s.widgetEventPrefix) || e },
            a,
            { constructor: o, namespace: l, widgetName: e, widgetFullName: c }
          )),
          r
            ? (t.each(r._childConstructors, function (e, n) {
                var i = n.prototype;
                t.widget(i.namespace + "." + i.widgetName, o, n._proto);
              }),
              delete r._childConstructors)
            : n._childConstructors.push(o),
          t.widget.bridge(e, o),
          o
        );
      }),
      (t.widget.extend = function (e) {
        for (
          var n, r, o = i.call(arguments, 1), s = 0, a = o.length;
          s < a;
          s++
        )
          for (n in o[s])
            (r = o[s][n]),
              o[s].hasOwnProperty(n) &&
                r !== undefined &&
                (t.isPlainObject(r)
                  ? (e[n] = t.isPlainObject(e[n])
                      ? t.widget.extend({}, e[n], r)
                      : t.widget.extend({}, r))
                  : (e[n] = r));
        return e;
      }),
      (t.widget.bridge = function (e, n) {
        var r = n.prototype.widgetFullName || e;
        t.fn[e] = function (o) {
          var s = "string" == typeof o,
            a = i.call(arguments, 1),
            l = this;
          return (
            s
              ? this.length || "instance" !== o
                ? this.each(function () {
                    var n,
                      i = t.data(this, r);
                    return "instance" === o
                      ? ((l = i), !1)
                      : i
                      ? t.isFunction(i[o]) && "_" !== o.charAt(0)
                        ? (n = i[o].apply(i, a)) !== i && n !== undefined
                          ? ((l = n && n.jquery ? l.pushStack(n.get()) : n), !1)
                          : void 0
                        : t.error(
                            "no such method '" +
                              o +
                              "' for " +
                              e +
                              " widget instance"
                          )
                      : t.error(
                          "cannot call methods on " +
                            e +
                            " prior to initialization; attempted to call method '" +
                            o +
                            "'"
                        );
                  })
                : (l = undefined)
              : (a.length && (o = t.widget.extend.apply(null, [o].concat(a))),
                this.each(function () {
                  var e = t.data(this, r);
                  e
                    ? (e.option(o || {}), e._init && e._init())
                    : t.data(this, r, new n(o, this));
                })),
            l
          );
        };
      }),
      (t.Widget = function () {}),
      (t.Widget._childConstructors = []),
      (t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: { classes: {}, disabled: !1, create: null },
        _createWidget: function (e, i) {
          (i = t(i || this.defaultElement || this)[0]),
            (this.element = t(i)),
            (this.uuid = n++),
            (this.eventNamespace = "." + this.widgetName + this.uuid),
            (this.bindings = t()),
            (this.hoverable = t()),
            (this.focusable = t()),
            (this.classesElementLookup = {}),
            i !== this &&
              (t.data(i, this.widgetFullName, this),
              this._on(!0, this.element, {
                remove: function (t) {
                  t.target === i && this.destroy();
                },
              }),
              (this.document = t(i.style ? i.ownerDocument : i.document || i)),
              (this.window = t(
                this.document[0].defaultView || this.document[0].parentWindow
              ))),
            (this.options = t.widget.extend(
              {},
              this.options,
              this._getCreateOptions(),
              e
            )),
            this._create(),
            this.options.disabled &&
              this._setOptionDisabled(this.options.disabled),
            this._trigger("create", null, this._getCreateEventData()),
            this._init();
        },
        _getCreateOptions: function () {
          return {};
        },
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function () {
          var e = this;
          this._destroy(),
            t.each(this.classesElementLookup, function (t, n) {
              e._removeClass(n, t);
            }),
            this.element
              .off(this.eventNamespace)
              .removeData(this.widgetFullName),
            this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
            this.bindings.off(this.eventNamespace);
        },
        _destroy: t.noop,
        widget: function () {
          return this.element;
        },
        option: function (e, n) {
          var i,
            r,
            o,
            s = e;
          if (0 === arguments.length) return t.widget.extend({}, this.options);
          if ("string" == typeof e)
            if (((s = {}), (e = (i = e.split(".")).shift()), i.length)) {
              for (
                r = s[e] = t.widget.extend({}, this.options[e]), o = 0;
                o < i.length - 1;
                o++
              )
                (r[i[o]] = r[i[o]] || {}), (r = r[i[o]]);
              if (((e = i.pop()), 1 === arguments.length))
                return r[e] === undefined ? null : r[e];
              r[e] = n;
            } else {
              if (1 === arguments.length)
                return this.options[e] === undefined ? null : this.options[e];
              s[e] = n;
            }
          return this._setOptions(s), this;
        },
        _setOptions: function (t) {
          var e;
          for (e in t) this._setOption(e, t[e]);
          return this;
        },
        _setOption: function (t, e) {
          return (
            "classes" === t && this._setOptionClasses(e),
            (this.options[t] = e),
            "disabled" === t && this._setOptionDisabled(e),
            this
          );
        },
        _setOptionClasses: function (e) {
          var n, i, r;
          for (n in e)
            (r = this.classesElementLookup[n]),
              e[n] !== this.options.classes[n] &&
                r &&
                r.length &&
                ((i = t(r.get())),
                this._removeClass(r, n),
                i.addClass(
                  this._classes({ element: i, keys: n, classes: e, add: !0 })
                ));
        },
        _setOptionDisabled: function (t) {
          this._toggleClass(
            this.widget(),
            this.widgetFullName + "-disabled",
            null,
            !!t
          ),
            t &&
              (this._removeClass(this.hoverable, null, "ui-state-hover"),
              this._removeClass(this.focusable, null, "ui-state-focus"));
        },
        enable: function () {
          return this._setOptions({ disabled: !1 });
        },
        disable: function () {
          return this._setOptions({ disabled: !0 });
        },
        _classes: function (e) {
          function n(n, o) {
            var s, a;
            for (a = 0; a < n.length; a++)
              (s = r.classesElementLookup[n[a]] || t()),
                (s = e.add
                  ? t(t.unique(s.get().concat(e.element.get())))
                  : t(s.not(e.element).get())),
                (r.classesElementLookup[n[a]] = s),
                i.push(n[a]),
                o && e.classes[n[a]] && i.push(e.classes[n[a]]);
          }
          var i = [],
            r = this;
          return (
            (e = t.extend(
              { element: this.element, classes: this.options.classes || {} },
              e
            )),
            this._on(e.element, { remove: "_untrackClassesElement" }),
            e.keys && n(e.keys.match(/\S+/g) || [], !0),
            e.extra && n(e.extra.match(/\S+/g) || []),
            i.join(" ")
          );
        },
        _untrackClassesElement: function (e) {
          var n = this;
          t.each(n.classesElementLookup, function (i, r) {
            -1 !== t.inArray(e.target, r) &&
              (n.classesElementLookup[i] = t(r.not(e.target).get()));
          });
        },
        _removeClass: function (t, e, n) {
          return this._toggleClass(t, e, n, !1);
        },
        _addClass: function (t, e, n) {
          return this._toggleClass(t, e, n, !0);
        },
        _toggleClass: function (t, e, n, i) {
          i = "boolean" == typeof i ? i : n;
          var r = "string" == typeof t || null === t,
            o = {
              extra: r ? e : n,
              keys: r ? t : e,
              element: r ? this.element : t,
              add: i,
            };
          return o.element.toggleClass(this._classes(o), i), this;
        },
        _on: function (e, n, i) {
          var r,
            o = this;
          "boolean" != typeof e && ((i = n), (n = e), (e = !1)),
            i
              ? ((n = r = t(n)), (this.bindings = this.bindings.add(n)))
              : ((i = n), (n = this.element), (r = this.widget())),
            t.each(i, function (i, s) {
              function a() {
                if (
                  e ||
                  (!0 !== o.options.disabled &&
                    !t(this).hasClass("ui-state-disabled"))
                )
                  return ("string" == typeof s ? o[s] : s).apply(o, arguments);
              }
              "string" != typeof s &&
                (a.guid = s.guid = s.guid || a.guid || t.guid++);
              var l = i.match(/^([\w:-]*)\s*(.*)$/),
                c = l[1] + o.eventNamespace,
                u = l[2];
              u ? r.on(c, u, a) : n.on(c, a);
            });
        },
        _off: function (e, n) {
          (n =
            (n || "").split(" ").join(this.eventNamespace + " ") +
            this.eventNamespace),
            e.off(n).off(n),
            (this.bindings = t(this.bindings.not(e).get())),
            (this.focusable = t(this.focusable.not(e).get())),
            (this.hoverable = t(this.hoverable.not(e).get()));
        },
        _delay: function (t, e) {
          function n() {
            return ("string" == typeof t ? i[t] : t).apply(i, arguments);
          }
          var i = this;
          return setTimeout(n, e || 0);
        },
        _hoverable: function (e) {
          (this.hoverable = this.hoverable.add(e)),
            this._on(e, {
              mouseenter: function (e) {
                this._addClass(t(e.currentTarget), null, "ui-state-hover");
              },
              mouseleave: function (e) {
                this._removeClass(t(e.currentTarget), null, "ui-state-hover");
              },
            });
        },
        _focusable: function (e) {
          (this.focusable = this.focusable.add(e)),
            this._on(e, {
              focusin: function (e) {
                this._addClass(t(e.currentTarget), null, "ui-state-focus");
              },
              focusout: function (e) {
                this._removeClass(t(e.currentTarget), null, "ui-state-focus");
              },
            });
        },
        _trigger: function (e, n, i) {
          var r,
            o,
            s = this.options[e];
          if (
            ((i = i || {}),
            ((n = t.Event(n)).type = (
              e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e
            ).toLowerCase()),
            (n.target = this.element[0]),
            (o = n.originalEvent))
          )
            for (r in o) r in n || (n[r] = o[r]);
          return (
            this.element.trigger(n, i),
            !(
              (t.isFunction(s) &&
                !1 === s.apply(this.element[0], [n].concat(i))) ||
              n.isDefaultPrevented()
            )
          );
        },
      }),
      t.each({ show: "fadeIn", hide: "fadeOut" }, function (e, n) {
        t.Widget.prototype["_" + e] = function (i, r, o) {
          var s;
          "string" == typeof r && (r = { effect: r });
          var a = r
            ? !0 === r || "number" == typeof r
              ? n
              : r.effect || n
            : e;
          "number" == typeof (r = r || {}) && (r = { duration: r }),
            (s = !t.isEmptyObject(r)),
            (r.complete = o),
            r.delay && i.delay(r.delay),
            s && t.effects && t.effects.effect[a]
              ? i[e](r)
              : a !== e && i[a]
              ? i[a](r.duration, r.easing, o)
              : i.queue(function (n) {
                  t(this)[e](), o && o.call(i[0]), n();
                });
        };
      }),
      t.widget
    );
  }),
  /*!
   * jQuery UI Mouse 1.12.1
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   */
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery", "../ie", "../version", "../widget"], t)
      : t(jQuery);
  })(function (t) {
    var e = !1;
    return (
      t(document).on("mouseup", function () {
        e = !1;
      }),
      t.widget("ui.mouse", {
        version: "1.12.1",
        options: {
          cancel: "input, textarea, button, select, option",
          distance: 1,
          delay: 0,
        },
        _mouseInit: function () {
          var e = this;
          this.element
            .on("mousedown." + this.widgetName, function (t) {
              return e._mouseDown(t);
            })
            .on("click." + this.widgetName, function (n) {
              if (!0 === t.data(n.target, e.widgetName + ".preventClickEvent"))
                return (
                  t.removeData(n.target, e.widgetName + ".preventClickEvent"),
                  n.stopImmediatePropagation(),
                  !1
                );
            }),
            (this.started = !1);
        },
        _mouseDestroy: function () {
          this.element.off("." + this.widgetName),
            this._mouseMoveDelegate &&
              this.document
                .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
                .off("mouseup." + this.widgetName, this._mouseUpDelegate);
        },
        _mouseDown: function (n) {
          if (!e) {
            (this._mouseMoved = !1),
              this._mouseStarted && this._mouseUp(n),
              (this._mouseDownEvent = n);
            var i = this,
              r = 1 === n.which,
              o =
                !(
                  "string" != typeof this.options.cancel || !n.target.nodeName
                ) && t(n.target).closest(this.options.cancel).length;
            return (
              !(r && !o && this._mouseCapture(n)) ||
              ((this.mouseDelayMet = !this.options.delay),
              this.mouseDelayMet ||
                (this._mouseDelayTimer = setTimeout(function () {
                  i.mouseDelayMet = !0;
                }, this.options.delay)),
              this._mouseDistanceMet(n) &&
              this._mouseDelayMet(n) &&
              ((this._mouseStarted = !1 !== this._mouseStart(n)),
              !this._mouseStarted)
                ? (n.preventDefault(), !0)
                : (!0 ===
                    t.data(n.target, this.widgetName + ".preventClickEvent") &&
                    t.removeData(
                      n.target,
                      this.widgetName + ".preventClickEvent"
                    ),
                  (this._mouseMoveDelegate = function (t) {
                    return i._mouseMove(t);
                  }),
                  (this._mouseUpDelegate = function (t) {
                    return i._mouseUp(t);
                  }),
                  this.document
                    .on("mousemove." + this.widgetName, this._mouseMoveDelegate)
                    .on("mouseup." + this.widgetName, this._mouseUpDelegate),
                  n.preventDefault(),
                  (e = !0),
                  !0))
            );
          }
        },
        _mouseMove: function (e) {
          if (this._mouseMoved) {
            if (
              t.ui.ie &&
              (!document.documentMode || document.documentMode < 9) &&
              !e.button
            )
              return this._mouseUp(e);
            if (!e.which)
              if (
                e.originalEvent.altKey ||
                e.originalEvent.ctrlKey ||
                e.originalEvent.metaKey ||
                e.originalEvent.shiftKey
              )
                this.ignoreMissingWhich = !0;
              else if (!this.ignoreMissingWhich) return this._mouseUp(e);
          }
          return (
            (e.which || e.button) && (this._mouseMoved = !0),
            this._mouseStarted
              ? (this._mouseDrag(e), e.preventDefault())
              : (this._mouseDistanceMet(e) &&
                  this._mouseDelayMet(e) &&
                  ((this._mouseStarted =
                    !1 !== this._mouseStart(this._mouseDownEvent, e)),
                  this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
                !this._mouseStarted)
          );
        },
        _mouseUp: function (n) {
          this.document
            .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
            .off("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted &&
              ((this._mouseStarted = !1),
              n.target === this._mouseDownEvent.target &&
                t.data(n.target, this.widgetName + ".preventClickEvent", !0),
              this._mouseStop(n)),
            this._mouseDelayTimer &&
              (clearTimeout(this._mouseDelayTimer),
              delete this._mouseDelayTimer),
            (this.ignoreMissingWhich = !1),
            (e = !1),
            n.preventDefault();
        },
        _mouseDistanceMet: function (t) {
          return (
            Math.max(
              Math.abs(this._mouseDownEvent.pageX - t.pageX),
              Math.abs(this._mouseDownEvent.pageY - t.pageY)
            ) >= this.options.distance
          );
        },
        _mouseDelayMet: function () {
          return this.mouseDelayMet;
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
          return !0;
        },
      })
    );
  }),
  /*!
   * jQuery UI :data 1.12.1
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   */
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery", "./version"], t)
      : t(jQuery);
  })(function (t) {
    return t.extend(t.expr[":"], {
      data: t.expr.createPseudo
        ? t.expr.createPseudo(function (e) {
            return function (n) {
              return !!t.data(n, e);
            };
          })
        : function (e, n, i) {
            return !!t.data(e, i[3]);
          },
    });
  }),
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery", "./version"], t)
      : t(jQuery);
  })(function (t) {
    return (t.ui.plugin = {
      add: function (e, n, i) {
        var r,
          o = t.ui[e].prototype;
        for (r in i)
          (o.plugins[r] = o.plugins[r] || []), o.plugins[r].push([n, i[r]]);
      },
      call: function (t, e, n, i) {
        var r,
          o = t.plugins[e];
        if (
          o &&
          (i ||
            (t.element[0].parentNode &&
              11 !== t.element[0].parentNode.nodeType))
        )
          for (r = 0; r < o.length; r++)
            t.options[o[r][0]] && o[r][1].apply(t.element, n);
      },
    });
  }),
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery", "./version"], t)
      : t(jQuery);
  })(function (t) {
    return (t.ui.safeActiveElement = function (t) {
      var e;
      try {
        e = t.activeElement;
      } catch (n) {
        e = t.body;
      }
      return e || (e = t.body), e.nodeName || (e = t.body), e;
    });
  }),
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery", "./version"], t)
      : t(jQuery);
  })(function (t) {
    return (t.ui.safeBlur = function (e) {
      e && "body" !== e.nodeName.toLowerCase() && t(e).trigger("blur");
    });
  }),
  /*!
   * jQuery UI Scroll Parent 1.12.1
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   */
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery", "./version"], t)
      : t(jQuery);
  })(function (t) {
    return (t.fn.scrollParent = function (e) {
      var n = this.css("position"),
        i = "absolute" === n,
        r = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
        o = this.parents()
          .filter(function () {
            var e = t(this);
            return (
              (!i || "static" !== e.css("position")) &&
              r.test(
                e.css("overflow") + e.css("overflow-y") + e.css("overflow-x")
              )
            );
          })
          .eq(0);
      return "fixed" !== n && o.length
        ? o
        : t(this[0].ownerDocument || document);
    });
  }),
  /*!
   * jQuery UI Draggable 1.12.1
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   */
  (function (t) {
    "function" == typeof define && define.amd
      ? define(
          [
            "jquery",
            "./mouse",
            "../data",
            "../plugin",
            "../safe-active-element",
            "../safe-blur",
            "../scroll-parent",
            "../version",
            "../widget",
          ],
          t
        )
      : t(jQuery);
  })(function (t) {
    return (
      t.widget("ui.draggable", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "drag",
        options: {
          addClasses: !0,
          appendTo: "parent",
          axis: !1,
          connectToSortable: !1,
          containment: !1,
          cursor: "auto",
          cursorAt: !1,
          grid: !1,
          handle: !1,
          helper: "original",
          iframeFix: !1,
          opacity: !1,
          refreshPositions: !1,
          revert: !1,
          revertDuration: 500,
          scope: "default",
          scroll: !0,
          scrollSensitivity: 20,
          scrollSpeed: 20,
          snap: !1,
          snapMode: "both",
          snapTolerance: 20,
          stack: !1,
          zIndex: !1,
          drag: null,
          start: null,
          stop: null,
        },
        _create: function () {
          "original" === this.options.helper && this._setPositionRelative(),
            this.options.addClasses && this._addClass("ui-draggable"),
            this._setHandleClassName(),
            this._mouseInit();
        },
        _setOption: function (t, e) {
          this._super(t, e),
            "handle" === t &&
              (this._removeHandleClassName(), this._setHandleClassName());
        },
        _destroy: function () {
          (this.helper || this.element).is(".ui-draggable-dragging")
            ? (this.destroyOnClear = !0)
            : (this._removeHandleClassName(), this._mouseDestroy());
        },
        _mouseCapture: function (e) {
          var n = this.options;
          return (
            !(
              this.helper ||
              n.disabled ||
              t(e.target).closest(".ui-resizable-handle").length > 0
            ) &&
            ((this.handle = this._getHandle(e)),
            !!this.handle &&
              (this._blurActiveElement(e),
              this._blockFrames(!0 === n.iframeFix ? "iframe" : n.iframeFix),
              !0))
          );
        },
        _blockFrames: function (e) {
          this.iframeBlocks = this.document.find(e).map(function () {
            var e = t(this);
            return t("<div>")
              .css("position", "absolute")
              .appendTo(e.parent())
              .outerWidth(e.outerWidth())
              .outerHeight(e.outerHeight())
              .offset(e.offset())[0];
          });
        },
        _unblockFrames: function () {
          this.iframeBlocks &&
            (this.iframeBlocks.remove(), delete this.iframeBlocks);
        },
        _blurActiveElement: function (e) {
          var n = t.ui.safeActiveElement(this.document[0]);
          t(e.target).closest(n).length || t.ui.safeBlur(n);
        },
        _mouseStart: function (e) {
          var n = this.options;
          return (
            (this.helper = this._createHelper(e)),
            this._addClass(this.helper, "ui-draggable-dragging"),
            this._cacheHelperProportions(),
            t.ui.ddmanager && (t.ui.ddmanager.current = this),
            this._cacheMargins(),
            (this.cssPosition = this.helper.css("position")),
            (this.scrollParent = this.helper.scrollParent(!0)),
            (this.offsetParent = this.helper.offsetParent()),
            (this.hasFixedAncestor =
              this.helper.parents().filter(function () {
                return "fixed" === t(this).css("position");
              }).length > 0),
            (this.positionAbs = this.element.offset()),
            this._refreshOffsets(e),
            (this.originalPosition = this.position =
              this._generatePosition(e, !1)),
            (this.originalPageX = e.pageX),
            (this.originalPageY = e.pageY),
            n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt),
            this._setContainment(),
            !1 === this._trigger("start", e)
              ? (this._clear(), !1)
              : (this._cacheHelperProportions(),
                t.ui.ddmanager &&
                  !n.dropBehaviour &&
                  t.ui.ddmanager.prepareOffsets(this, e),
                this._mouseDrag(e, !0),
                t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e),
                !0)
          );
        },
        _refreshOffsets: function (t) {
          (this.offset = {
            top: this.positionAbs.top - this.margins.top,
            left: this.positionAbs.left - this.margins.left,
            scroll: !1,
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset(),
          }),
            (this.offset.click = {
              left: t.pageX - this.offset.left,
              top: t.pageY - this.offset.top,
            });
        },
        _mouseDrag: function (e, n) {
          if (
            (this.hasFixedAncestor &&
              (this.offset.parent = this._getParentOffset()),
            (this.position = this._generatePosition(e, !0)),
            (this.positionAbs = this._convertPositionTo("absolute")),
            !n)
          ) {
            var i = this._uiHash();
            if (!1 === this._trigger("drag", e, i))
              return this._mouseUp(new t.Event("mouseup", e)), !1;
            this.position = i.position;
          }
          return (
            (this.helper[0].style.left = this.position.left + "px"),
            (this.helper[0].style.top = this.position.top + "px"),
            t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
            !1
          );
        },
        _mouseStop: function (e) {
          var n = this,
            i = !1;
          return (
            t.ui.ddmanager &&
              !this.options.dropBehaviour &&
              (i = t.ui.ddmanager.drop(this, e)),
            this.dropped && ((i = this.dropped), (this.dropped = !1)),
            ("invalid" === this.options.revert && !i) ||
            ("valid" === this.options.revert && i) ||
            !0 === this.options.revert ||
            (t.isFunction(this.options.revert) &&
              this.options.revert.call(this.element, i))
              ? t(this.helper).animate(
                  this.originalPosition,
                  parseInt(this.options.revertDuration, 10),
                  function () {
                    !1 !== n._trigger("stop", e) && n._clear();
                  }
                )
              : !1 !== this._trigger("stop", e) && this._clear(),
            !1
          );
        },
        _mouseUp: function (e) {
          return (
            this._unblockFrames(),
            t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e),
            this.handleElement.is(e.target) && this.element.trigger("focus"),
            t.ui.mouse.prototype._mouseUp.call(this, e)
          );
        },
        cancel: function () {
          return (
            this.helper.is(".ui-draggable-dragging")
              ? this._mouseUp(
                  new t.Event("mouseup", { target: this.element[0] })
                )
              : this._clear(),
            this
          );
        },
        _getHandle: function (e) {
          return (
            !this.options.handle ||
            !!t(e.target).closest(this.element.find(this.options.handle)).length
          );
        },
        _setHandleClassName: function () {
          (this.handleElement = this.options.handle
            ? this.element.find(this.options.handle)
            : this.element),
            this._addClass(this.handleElement, "ui-draggable-handle");
        },
        _removeHandleClassName: function () {
          this._removeClass(this.handleElement, "ui-draggable-handle");
        },
        _createHelper: function (e) {
          var n = this.options,
            i = t.isFunction(n.helper),
            r = i
              ? t(n.helper.apply(this.element[0], [e]))
              : "clone" === n.helper
              ? this.element.clone().removeAttr("id")
              : this.element;
          return (
            r.parents("body").length ||
              r.appendTo(
                "parent" === n.appendTo
                  ? this.element[0].parentNode
                  : n.appendTo
              ),
            i && r[0] === this.element[0] && this._setPositionRelative(),
            r[0] === this.element[0] ||
              /(fixed|absolute)/.test(r.css("position")) ||
              r.css("position", "absolute"),
            r
          );
        },
        _setPositionRelative: function () {
          /^(?:r|a|f)/.test(this.element.css("position")) ||
            (this.element[0].style.position = "relative");
        },
        _adjustOffsetFromHelper: function (e) {
          "string" == typeof e && (e = e.split(" ")),
            t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
            "left" in e &&
              (this.offset.click.left = e.left + this.margins.left),
            "right" in e &&
              (this.offset.click.left =
                this.helperProportions.width - e.right + this.margins.left),
            "top" in e && (this.offset.click.top = e.top + this.margins.top),
            "bottom" in e &&
              (this.offset.click.top =
                this.helperProportions.height - e.bottom + this.margins.top);
        },
        _isRootNode: function (t) {
          return /(html|body)/i.test(t.tagName) || t === this.document[0];
        },
        _getParentOffset: function () {
          var e = this.offsetParent.offset(),
            n = this.document[0];
          return (
            "absolute" === this.cssPosition &&
              this.scrollParent[0] !== n &&
              t.contains(this.scrollParent[0], this.offsetParent[0]) &&
              ((e.left += this.scrollParent.scrollLeft()),
              (e.top += this.scrollParent.scrollTop())),
            this._isRootNode(this.offsetParent[0]) && (e = { top: 0, left: 0 }),
            {
              top:
                e.top +
                (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
              left:
                e.left +
                (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
            }
          );
        },
        _getRelativeOffset: function () {
          if ("relative" !== this.cssPosition) return { top: 0, left: 0 };
          var t = this.element.position(),
            e = this._isRootNode(this.scrollParent[0]);
          return {
            top:
              t.top -
              (parseInt(this.helper.css("top"), 10) || 0) +
              (e ? 0 : this.scrollParent.scrollTop()),
            left:
              t.left -
              (parseInt(this.helper.css("left"), 10) || 0) +
              (e ? 0 : this.scrollParent.scrollLeft()),
          };
        },
        _cacheMargins: function () {
          this.margins = {
            left: parseInt(this.element.css("marginLeft"), 10) || 0,
            top: parseInt(this.element.css("marginTop"), 10) || 0,
            right: parseInt(this.element.css("marginRight"), 10) || 0,
            bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
          };
        },
        _cacheHelperProportions: function () {
          this.helperProportions = {
            width: this.helper.outerWidth(),
            height: this.helper.outerHeight(),
          };
        },
        _setContainment: function () {
          var e,
            n,
            i,
            r = this.options,
            o = this.document[0];
          (this.relativeContainer = null),
            r.containment
              ? "window" !== r.containment
                ? "document" !== r.containment
                  ? r.containment.constructor !== Array
                    ? ("parent" === r.containment &&
                        (r.containment = this.helper[0].parentNode),
                      (i = (n = t(r.containment))[0]) &&
                        ((e = /(scroll|auto)/.test(n.css("overflow"))),
                        (this.containment = [
                          (parseInt(n.css("borderLeftWidth"), 10) || 0) +
                            (parseInt(n.css("paddingLeft"), 10) || 0),
                          (parseInt(n.css("borderTopWidth"), 10) || 0) +
                            (parseInt(n.css("paddingTop"), 10) || 0),
                          (e
                            ? Math.max(i.scrollWidth, i.offsetWidth)
                            : i.offsetWidth) -
                            (parseInt(n.css("borderRightWidth"), 10) || 0) -
                            (parseInt(n.css("paddingRight"), 10) || 0) -
                            this.helperProportions.width -
                            this.margins.left -
                            this.margins.right,
                          (e
                            ? Math.max(i.scrollHeight, i.offsetHeight)
                            : i.offsetHeight) -
                            (parseInt(n.css("borderBottomWidth"), 10) || 0) -
                            (parseInt(n.css("paddingBottom"), 10) || 0) -
                            this.helperProportions.height -
                            this.margins.top -
                            this.margins.bottom,
                        ]),
                        (this.relativeContainer = n)))
                    : (this.containment = r.containment)
                  : (this.containment = [
                      0,
                      0,
                      t(o).width() -
                        this.helperProportions.width -
                        this.margins.left,
                      (t(o).height() || o.body.parentNode.scrollHeight) -
                        this.helperProportions.height -
                        this.margins.top,
                    ])
                : (this.containment = [
                    t(window).scrollLeft() -
                      this.offset.relative.left -
                      this.offset.parent.left,
                    t(window).scrollTop() -
                      this.offset.relative.top -
                      this.offset.parent.top,
                    t(window).scrollLeft() +
                      t(window).width() -
                      this.helperProportions.width -
                      this.margins.left,
                    t(window).scrollTop() +
                      (t(window).height() || o.body.parentNode.scrollHeight) -
                      this.helperProportions.height -
                      this.margins.top,
                  ])
              : (this.containment = null);
        },
        _convertPositionTo: function (t, e) {
          e || (e = this.position);
          var n = "absolute" === t ? 1 : -1,
            i = this._isRootNode(this.scrollParent[0]);
          return {
            top:
              e.top +
              this.offset.relative.top * n +
              this.offset.parent.top * n -
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.top
                : i
                ? 0
                : this.offset.scroll.top) *
                n,
            left:
              e.left +
              this.offset.relative.left * n +
              this.offset.parent.left * n -
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.left
                : i
                ? 0
                : this.offset.scroll.left) *
                n,
          };
        },
        _generatePosition: function (t, e) {
          var n,
            i,
            r,
            o,
            s = this.options,
            a = this._isRootNode(this.scrollParent[0]),
            l = t.pageX,
            c = t.pageY;
          return (
            (a && this.offset.scroll) ||
              (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft(),
              }),
            e &&
              (this.containment &&
                (this.relativeContainer
                  ? ((i = this.relativeContainer.offset()),
                    (n = [
                      this.containment[0] + i.left,
                      this.containment[1] + i.top,
                      this.containment[2] + i.left,
                      this.containment[3] + i.top,
                    ]))
                  : (n = this.containment),
                t.pageX - this.offset.click.left < n[0] &&
                  (l = n[0] + this.offset.click.left),
                t.pageY - this.offset.click.top < n[1] &&
                  (c = n[1] + this.offset.click.top),
                t.pageX - this.offset.click.left > n[2] &&
                  (l = n[2] + this.offset.click.left),
                t.pageY - this.offset.click.top > n[3] &&
                  (c = n[3] + this.offset.click.top)),
              s.grid &&
                ((r = s.grid[1]
                  ? this.originalPageY +
                    Math.round((c - this.originalPageY) / s.grid[1]) * s.grid[1]
                  : this.originalPageY),
                (c = n
                  ? r - this.offset.click.top >= n[1] ||
                    r - this.offset.click.top > n[3]
                    ? r
                    : r - this.offset.click.top >= n[1]
                    ? r - s.grid[1]
                    : r + s.grid[1]
                  : r),
                (o = s.grid[0]
                  ? this.originalPageX +
                    Math.round((l - this.originalPageX) / s.grid[0]) * s.grid[0]
                  : this.originalPageX),
                (l = n
                  ? o - this.offset.click.left >= n[0] ||
                    o - this.offset.click.left > n[2]
                    ? o
                    : o - this.offset.click.left >= n[0]
                    ? o - s.grid[0]
                    : o + s.grid[0]
                  : o)),
              "y" === s.axis && (l = this.originalPageX),
              "x" === s.axis && (c = this.originalPageY)),
            {
              top:
                c -
                this.offset.click.top -
                this.offset.relative.top -
                this.offset.parent.top +
                ("fixed" === this.cssPosition
                  ? -this.offset.scroll.top
                  : a
                  ? 0
                  : this.offset.scroll.top),
              left:
                l -
                this.offset.click.left -
                this.offset.relative.left -
                this.offset.parent.left +
                ("fixed" === this.cssPosition
                  ? -this.offset.scroll.left
                  : a
                  ? 0
                  : this.offset.scroll.left),
            }
          );
        },
        _clear: function () {
          this._removeClass(this.helper, "ui-draggable-dragging"),
            this.helper[0] === this.element[0] ||
              this.cancelHelperRemoval ||
              this.helper.remove(),
            (this.helper = null),
            (this.cancelHelperRemoval = !1),
            this.destroyOnClear && this.destroy();
        },
        _trigger: function (e, n, i) {
          return (
            (i = i || this._uiHash()),
            t.ui.plugin.call(this, e, [n, i, this], !0),
            /^(drag|start|stop)/.test(e) &&
              ((this.positionAbs = this._convertPositionTo("absolute")),
              (i.offset = this.positionAbs)),
            t.Widget.prototype._trigger.call(this, e, n, i)
          );
        },
        plugins: {},
        _uiHash: function () {
          return {
            helper: this.helper,
            position: this.position,
            originalPosition: this.originalPosition,
            offset: this.positionAbs,
          };
        },
      }),
      t.ui.plugin.add("draggable", "connectToSortable", {
        start: function (e, n, i) {
          var r = t.extend({}, n, { item: i.element });
          (i.sortables = []),
            t(i.options.connectToSortable).each(function () {
              var n = t(this).sortable("instance");
              n &&
                !n.options.disabled &&
                (i.sortables.push(n),
                n.refreshPositions(),
                n._trigger("activate", e, r));
            });
        },
        stop: function (e, n, i) {
          var r = t.extend({}, n, { item: i.element });
          (i.cancelHelperRemoval = !1),
            t.each(i.sortables, function () {
              var t = this;
              t.isOver
                ? ((t.isOver = 0),
                  (i.cancelHelperRemoval = !0),
                  (t.cancelHelperRemoval = !1),
                  (t._storedCSS = {
                    position: t.placeholder.css("position"),
                    top: t.placeholder.css("top"),
                    left: t.placeholder.css("left"),
                  }),
                  t._mouseStop(e),
                  (t.options.helper = t.options._helper))
                : ((t.cancelHelperRemoval = !0),
                  t._trigger("deactivate", e, r));
            });
        },
        drag: function (e, n, i) {
          t.each(i.sortables, function () {
            var r = !1,
              o = this;
            (o.positionAbs = i.positionAbs),
              (o.helperProportions = i.helperProportions),
              (o.offset.click = i.offset.click),
              o._intersectsWith(o.containerCache) &&
                ((r = !0),
                t.each(i.sortables, function () {
                  return (
                    (this.positionAbs = i.positionAbs),
                    (this.helperProportions = i.helperProportions),
                    (this.offset.click = i.offset.click),
                    this !== o &&
                      this._intersectsWith(this.containerCache) &&
                      t.contains(o.element[0], this.element[0]) &&
                      (r = !1),
                    r
                  );
                })),
              r
                ? (o.isOver ||
                    ((o.isOver = 1),
                    (i._parent = n.helper.parent()),
                    (o.currentItem = n.helper
                      .appendTo(o.element)
                      .data("ui-sortable-item", !0)),
                    (o.options._helper = o.options.helper),
                    (o.options.helper = function () {
                      return n.helper[0];
                    }),
                    (e.target = o.currentItem[0]),
                    o._mouseCapture(e, !0),
                    o._mouseStart(e, !0, !0),
                    (o.offset.click.top = i.offset.click.top),
                    (o.offset.click.left = i.offset.click.left),
                    (o.offset.parent.left -=
                      i.offset.parent.left - o.offset.parent.left),
                    (o.offset.parent.top -=
                      i.offset.parent.top - o.offset.parent.top),
                    i._trigger("toSortable", e),
                    (i.dropped = o.element),
                    t.each(i.sortables, function () {
                      this.refreshPositions();
                    }),
                    (i.currentItem = i.element),
                    (o.fromOutside = i)),
                  o.currentItem && (o._mouseDrag(e), (n.position = o.position)))
                : o.isOver &&
                  ((o.isOver = 0),
                  (o.cancelHelperRemoval = !0),
                  (o.options._revert = o.options.revert),
                  (o.options.revert = !1),
                  o._trigger("out", e, o._uiHash(o)),
                  o._mouseStop(e, !0),
                  (o.options.revert = o.options._revert),
                  (o.options.helper = o.options._helper),
                  o.placeholder && o.placeholder.remove(),
                  n.helper.appendTo(i._parent),
                  i._refreshOffsets(e),
                  (n.position = i._generatePosition(e, !0)),
                  i._trigger("fromSortable", e),
                  (i.dropped = !1),
                  t.each(i.sortables, function () {
                    this.refreshPositions();
                  }));
          });
        },
      }),
      t.ui.plugin.add("draggable", "cursor", {
        start: function (e, n, i) {
          var r = t("body"),
            o = i.options;
          r.css("cursor") && (o._cursor = r.css("cursor")),
            r.css("cursor", o.cursor);
        },
        stop: function (e, n, i) {
          var r = i.options;
          r._cursor && t("body").css("cursor", r._cursor);
        },
      }),
      t.ui.plugin.add("draggable", "opacity", {
        start: function (e, n, i) {
          var r = t(n.helper),
            o = i.options;
          r.css("opacity") && (o._opacity = r.css("opacity")),
            r.css("opacity", o.opacity);
        },
        stop: function (e, n, i) {
          var r = i.options;
          r._opacity && t(n.helper).css("opacity", r._opacity);
        },
      }),
      t.ui.plugin.add("draggable", "scroll", {
        start: function (t, e, n) {
          n.scrollParentNotHidden ||
            (n.scrollParentNotHidden = n.helper.scrollParent(!1)),
            n.scrollParentNotHidden[0] !== n.document[0] &&
              "HTML" !== n.scrollParentNotHidden[0].tagName &&
              (n.overflowOffset = n.scrollParentNotHidden.offset());
        },
        drag: function (e, n, i) {
          var r = i.options,
            o = !1,
            s = i.scrollParentNotHidden[0],
            a = i.document[0];
          s !== a && "HTML" !== s.tagName
            ? ((r.axis && "x" === r.axis) ||
                (i.overflowOffset.top + s.offsetHeight - e.pageY <
                r.scrollSensitivity
                  ? (s.scrollTop = o = s.scrollTop + r.scrollSpeed)
                  : e.pageY - i.overflowOffset.top < r.scrollSensitivity &&
                    (s.scrollTop = o = s.scrollTop - r.scrollSpeed)),
              (r.axis && "y" === r.axis) ||
                (i.overflowOffset.left + s.offsetWidth - e.pageX <
                r.scrollSensitivity
                  ? (s.scrollLeft = o = s.scrollLeft + r.scrollSpeed)
                  : e.pageX - i.overflowOffset.left < r.scrollSensitivity &&
                    (s.scrollLeft = o = s.scrollLeft - r.scrollSpeed)))
            : ((r.axis && "x" === r.axis) ||
                (e.pageY - t(a).scrollTop() < r.scrollSensitivity
                  ? (o = t(a).scrollTop(t(a).scrollTop() - r.scrollSpeed))
                  : t(window).height() - (e.pageY - t(a).scrollTop()) <
                      r.scrollSensitivity &&
                    (o = t(a).scrollTop(t(a).scrollTop() + r.scrollSpeed))),
              (r.axis && "y" === r.axis) ||
                (e.pageX - t(a).scrollLeft() < r.scrollSensitivity
                  ? (o = t(a).scrollLeft(t(a).scrollLeft() - r.scrollSpeed))
                  : t(window).width() - (e.pageX - t(a).scrollLeft()) <
                      r.scrollSensitivity &&
                    (o = t(a).scrollLeft(t(a).scrollLeft() + r.scrollSpeed)))),
            !1 !== o &&
              t.ui.ddmanager &&
              !r.dropBehaviour &&
              t.ui.ddmanager.prepareOffsets(i, e);
        },
      }),
      t.ui.plugin.add("draggable", "snap", {
        start: function (e, n, i) {
          var r = i.options;
          (i.snapElements = []),
            t(
              r.snap.constructor !== String
                ? r.snap.items || ":data(ui-draggable)"
                : r.snap
            ).each(function () {
              var e = t(this),
                n = e.offset();
              this !== i.element[0] &&
                i.snapElements.push({
                  item: this,
                  width: e.outerWidth(),
                  height: e.outerHeight(),
                  top: n.top,
                  left: n.left,
                });
            });
        },
        drag: function (e, n, i) {
          var r,
            o,
            s,
            a,
            l,
            c,
            u,
            h,
            d,
            f,
            p = i.options,
            g = p.snapTolerance,
            m = n.offset.left,
            v = m + i.helperProportions.width,
            y = n.offset.top,
            b = y + i.helperProportions.height;
          for (d = i.snapElements.length - 1; d >= 0; d--)
            (c =
              (l = i.snapElements[d].left - i.margins.left) +
              i.snapElements[d].width),
              (h =
                (u = i.snapElements[d].top - i.margins.top) +
                i.snapElements[d].height),
              v < l - g ||
              m > c + g ||
              b < u - g ||
              y > h + g ||
              !t.contains(
                i.snapElements[d].item.ownerDocument,
                i.snapElements[d].item
              )
                ? (i.snapElements[d].snapping &&
                    i.options.snap.release &&
                    i.options.snap.release.call(
                      i.element,
                      e,
                      t.extend(i._uiHash(), {
                        snapItem: i.snapElements[d].item,
                      })
                    ),
                  (i.snapElements[d].snapping = !1))
                : ("inner" !== p.snapMode &&
                    ((r = Math.abs(u - b) <= g),
                    (o = Math.abs(h - y) <= g),
                    (s = Math.abs(l - v) <= g),
                    (a = Math.abs(c - m) <= g),
                    r &&
                      (n.position.top = i._convertPositionTo("relative", {
                        top: u - i.helperProportions.height,
                        left: 0,
                      }).top),
                    o &&
                      (n.position.top = i._convertPositionTo("relative", {
                        top: h,
                        left: 0,
                      }).top),
                    s &&
                      (n.position.left = i._convertPositionTo("relative", {
                        top: 0,
                        left: l - i.helperProportions.width,
                      }).left),
                    a &&
                      (n.position.left = i._convertPositionTo("relative", {
                        top: 0,
                        left: c,
                      }).left)),
                  (f = r || o || s || a),
                  "outer" !== p.snapMode &&
                    ((r = Math.abs(u - y) <= g),
                    (o = Math.abs(h - b) <= g),
                    (s = Math.abs(l - m) <= g),
                    (a = Math.abs(c - v) <= g),
                    r &&
                      (n.position.top = i._convertPositionTo("relative", {
                        top: u,
                        left: 0,
                      }).top),
                    o &&
                      (n.position.top = i._convertPositionTo("relative", {
                        top: h - i.helperProportions.height,
                        left: 0,
                      }).top),
                    s &&
                      (n.position.left = i._convertPositionTo("relative", {
                        top: 0,
                        left: l,
                      }).left),
                    a &&
                      (n.position.left = i._convertPositionTo("relative", {
                        top: 0,
                        left: c - i.helperProportions.width,
                      }).left)),
                  !i.snapElements[d].snapping &&
                    (r || o || s || a || f) &&
                    i.options.snap.snap &&
                    i.options.snap.snap.call(
                      i.element,
                      e,
                      t.extend(i._uiHash(), {
                        snapItem: i.snapElements[d].item,
                      })
                    ),
                  (i.snapElements[d].snapping = r || o || s || a || f));
        },
      }),
      t.ui.plugin.add("draggable", "stack", {
        start: function (e, n, i) {
          var r,
            o = i.options,
            s = t.makeArray(t(o.stack)).sort(function (e, n) {
              return (
                (parseInt(t(e).css("zIndex"), 10) || 0) -
                (parseInt(t(n).css("zIndex"), 10) || 0)
              );
            });
          s.length &&
            ((r = parseInt(t(s[0]).css("zIndex"), 10) || 0),
            t(s).each(function (e) {
              t(this).css("zIndex", r + e);
            }),
            this.css("zIndex", r + s.length));
        },
      }),
      t.ui.plugin.add("draggable", "zIndex", {
        start: function (e, n, i) {
          var r = t(n.helper),
            o = i.options;
          r.css("zIndex") && (o._zIndex = r.css("zIndex")),
            r.css("zIndex", o.zIndex);
        },
        stop: function (e, n, i) {
          var r = i.options;
          r._zIndex && t(n.helper).css("zIndex", r._zIndex);
        },
      }),
      t.ui.draggable
    );
  }),
  /*!
   * jQuery UI Droppable 1.12.1
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   */
  (function (t) {
    "function" == typeof define && define.amd
      ? define(
          ["jquery", "./draggable", "./mouse", "../version", "../widget"],
          t
        )
      : t(jQuery);
  })(function (t) {
    t.widget("ui.droppable", {
      version: "1.12.1",
      widgetEventPrefix: "drop",
      options: {
        accept: "*",
        addClasses: !0,
        greedy: !1,
        scope: "default",
        tolerance: "intersect",
        activate: null,
        deactivate: null,
        drop: null,
        out: null,
        over: null,
      },
      _create: function () {
        var e,
          n = this.options,
          i = n.accept;
        (this.isover = !1),
          (this.isout = !0),
          (this.accept = t.isFunction(i)
            ? i
            : function (t) {
                return t.is(i);
              }),
          (this.proportions = function () {
            if (!arguments.length)
              return (
                e ||
                (e = {
                  width: this.element[0].offsetWidth,
                  height: this.element[0].offsetHeight,
                })
              );
            e = arguments[0];
          }),
          this._addToManager(n.scope),
          n.addClasses && this._addClass("ui-droppable");
      },
      _addToManager: function (e) {
        (t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || []),
          t.ui.ddmanager.droppables[e].push(this);
      },
      _splice: function (t) {
        for (var e = 0; e < t.length; e++) t[e] === this && t.splice(e, 1);
      },
      _destroy: function () {
        var e = t.ui.ddmanager.droppables[this.options.scope];
        this._splice(e);
      },
      _setOption: function (e, n) {
        if ("accept" === e)
          this.accept = t.isFunction(n)
            ? n
            : function (t) {
                return t.is(n);
              };
        else if ("scope" === e) {
          var i = t.ui.ddmanager.droppables[this.options.scope];
          this._splice(i), this._addToManager(n);
        }
        this._super(e, n);
      },
      _activate: function (e) {
        var n = t.ui.ddmanager.current;
        this._addActiveClass(), n && this._trigger("activate", e, this.ui(n));
      },
      _deactivate: function (e) {
        var n = t.ui.ddmanager.current;
        this._removeActiveClass(),
          n && this._trigger("deactivate", e, this.ui(n));
      },
      _over: function (e) {
        var n = t.ui.ddmanager.current;
        n &&
          (n.currentItem || n.element)[0] !== this.element[0] &&
          this.accept.call(this.element[0], n.currentItem || n.element) &&
          (this._addHoverClass(), this._trigger("over", e, this.ui(n)));
      },
      _out: function (e) {
        var n = t.ui.ddmanager.current;
        n &&
          (n.currentItem || n.element)[0] !== this.element[0] &&
          this.accept.call(this.element[0], n.currentItem || n.element) &&
          (this._removeHoverClass(), this._trigger("out", e, this.ui(n)));
      },
      _drop: function (n, i) {
        var r = i || t.ui.ddmanager.current,
          o = !1;
        return (
          !(!r || (r.currentItem || r.element)[0] === this.element[0]) &&
          (this.element
            .find(":data(ui-droppable)")
            .not(".ui-draggable-dragging")
            .each(function () {
              var i = t(this).droppable("instance");
              if (
                i.options.greedy &&
                !i.options.disabled &&
                i.options.scope === r.options.scope &&
                i.accept.call(i.element[0], r.currentItem || r.element) &&
                e(
                  r,
                  t.extend(i, { offset: i.element.offset() }),
                  i.options.tolerance,
                  n
                )
              )
                return (o = !0), !1;
            }),
          !o &&
            !!this.accept.call(this.element[0], r.currentItem || r.element) &&
            (this._removeActiveClass(),
            this._removeHoverClass(),
            this._trigger("drop", n, this.ui(r)),
            this.element))
        );
      },
      ui: function (t) {
        return {
          draggable: t.currentItem || t.element,
          helper: t.helper,
          position: t.position,
          offset: t.positionAbs,
        };
      },
      _addHoverClass: function () {
        this._addClass("ui-droppable-hover");
      },
      _removeHoverClass: function () {
        this._removeClass("ui-droppable-hover");
      },
      _addActiveClass: function () {
        this._addClass("ui-droppable-active");
      },
      _removeActiveClass: function () {
        this._removeClass("ui-droppable-active");
      },
    });
    var e = (t.ui.intersect = (function () {
      function t(t, e, n) {
        return t >= e && t < e + n;
      }
      return function (e, n, i, r) {
        if (!n.offset) return !1;
        var o = (e.positionAbs || e.position.absolute).left + e.margins.left,
          s = (e.positionAbs || e.position.absolute).top + e.margins.top,
          a = o + e.helperProportions.width,
          l = s + e.helperProportions.height,
          c = n.offset.left,
          u = n.offset.top,
          h = c + n.proportions().width,
          d = u + n.proportions().height;
        switch (i) {
          case "fit":
            return c <= o && a <= h && u <= s && l <= d;
          case "intersect":
            return (
              c < o + e.helperProportions.width / 2 &&
              a - e.helperProportions.width / 2 < h &&
              u < s + e.helperProportions.height / 2 &&
              l - e.helperProportions.height / 2 < d
            );
          case "pointer":
            return (
              t(r.pageY, u, n.proportions().height) &&
              t(r.pageX, c, n.proportions().width)
            );
          case "touch":
            return (
              ((s >= u && s <= d) || (l >= u && l <= d) || (s < u && l > d)) &&
              ((o >= c && o <= h) || (a >= c && a <= h) || (o < c && a > h))
            );
          default:
            return !1;
        }
      };
    })());
    return (
      (t.ui.ddmanager = {
        current: null,
        droppables: { default: [] },
        prepareOffsets: function (e, n) {
          var i,
            r,
            o = t.ui.ddmanager.droppables[e.options.scope] || [],
            s = n ? n.type : null,
            a = (e.currentItem || e.element)
              .find(":data(ui-droppable)")
              .addBack();
          t: for (i = 0; i < o.length; i++)
            if (
              !(
                o[i].options.disabled ||
                (e &&
                  !o[i].accept.call(
                    o[i].element[0],
                    e.currentItem || e.element
                  ))
              )
            ) {
              for (r = 0; r < a.length; r++)
                if (a[r] === o[i].element[0]) {
                  o[i].proportions().height = 0;
                  continue t;
                }
              (o[i].visible = "none" !== o[i].element.css("display")),
                o[i].visible &&
                  ("mousedown" === s && o[i]._activate.call(o[i], n),
                  (o[i].offset = o[i].element.offset()),
                  o[i].proportions({
                    width: o[i].element[0].offsetWidth,
                    height: o[i].element[0].offsetHeight,
                  }));
            }
        },
        drop: function (n, i) {
          var r = !1;
          return (
            t.each(
              (t.ui.ddmanager.droppables[n.options.scope] || []).slice(),
              function () {
                this.options &&
                  (!this.options.disabled &&
                    this.visible &&
                    e(n, this, this.options.tolerance, i) &&
                    (r = this._drop.call(this, i) || r),
                  !this.options.disabled &&
                    this.visible &&
                    this.accept.call(
                      this.element[0],
                      n.currentItem || n.element
                    ) &&
                    ((this.isout = !0),
                    (this.isover = !1),
                    this._deactivate.call(this, i)));
              }
            ),
            r
          );
        },
        dragStart: function (e, n) {
          e.element.parentsUntil("body").on("scroll.droppable", function () {
            e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, n);
          });
        },
        drag: function (n, i) {
          n.options.refreshPositions && t.ui.ddmanager.prepareOffsets(n, i),
            t.each(
              t.ui.ddmanager.droppables[n.options.scope] || [],
              function () {
                if (
                  !this.options.disabled &&
                  !this.greedyChild &&
                  this.visible
                ) {
                  var r,
                    o,
                    s,
                    a = e(n, this, this.options.tolerance, i),
                    l =
                      !a && this.isover
                        ? "isout"
                        : a && !this.isover
                        ? "isover"
                        : null;
                  l &&
                    (this.options.greedy &&
                      ((o = this.options.scope),
                      (s = this.element
                        .parents(":data(ui-droppable)")
                        .filter(function () {
                          return (
                            t(this).droppable("instance").options.scope === o
                          );
                        })).length &&
                        ((r = t(s[0]).droppable("instance")).greedyChild =
                          "isover" === l)),
                    r &&
                      "isover" === l &&
                      ((r.isover = !1), (r.isout = !0), r._out.call(r, i)),
                    (this[l] = !0),
                    (this["isout" === l ? "isover" : "isout"] = !1),
                    this["isover" === l ? "_over" : "_out"].call(this, i),
                    r &&
                      "isout" === l &&
                      ((r.isout = !1), (r.isover = !0), r._over.call(r, i)));
                }
              }
            );
        },
        dragStop: function (e, n) {
          e.element.parentsUntil("body").off("scroll.droppable"),
            e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, n);
        },
      }),
      !1 !== t.uiBackCompat &&
        t.widget("ui.droppable", t.ui.droppable, {
          options: { hoverClass: !1, activeClass: !1 },
          _addActiveClass: function () {
            this._super(),
              this.options.activeClass &&
                this.element.addClass(this.options.activeClass);
          },
          _removeActiveClass: function () {
            this._super(),
              this.options.activeClass &&
                this.element.removeClass(this.options.activeClass);
          },
          _addHoverClass: function () {
            this._super(),
              this.options.hoverClass &&
                this.element.addClass(this.options.hoverClass);
          },
          _removeHoverClass: function () {
            this._super(),
              this.options.hoverClass &&
                this.element.removeClass(this.options.hoverClass);
          },
        }),
      t.ui.droppable
    );
  }),
  /*!
   * jQuery UI Effects 1.12.1
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   */
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery", "./version"], t)
      : t(jQuery);
  })(function (t) {
    var e,
      n = "ui-effects-",
      i = "ui-effects-style",
      r = "ui-effects-animated",
      o = t;
    return (
      (t.effects = { effect: {} }),
      /*!
       * jQuery Color Animations v2.1.2
       * https://github.com/jquery/jquery-color
       *
       * Copyright 2014 jQuery Foundation and other contributors
       * Released under the MIT license.
       * http://jquery.org/license
       *
       * Date: Wed Jan 16 08:47:09 2013 -0600
       */
      (function (t, e) {
        function n(t, e, n) {
          var i = h[e.type] || {};
          return null == t
            ? n || !e.def
              ? null
              : e.def
            : ((t = i.floor ? ~~t : parseFloat(t)),
              isNaN(t)
                ? e.def
                : i.mod
                ? (t + i.mod) % i.mod
                : 0 > t
                ? 0
                : i.max < t
                ? i.max
                : t);
        }
        function i(e) {
          var n = c(),
            i = (n._rgba = []);
          return (
            (e = e.toLowerCase()),
            p(l, function (t, r) {
              var o,
                s = r.re.exec(e),
                a = s && r.parse(s),
                l = r.space || "rgba";
              if (a)
                return (
                  (o = n[l](a)),
                  (n[u[l].cache] = o[u[l].cache]),
                  (i = n._rgba = o._rgba),
                  !1
                );
            }),
            i.length
              ? ("0,0,0,0" === i.join() && t.extend(i, o.transparent), n)
              : o[e]
          );
        }
        function r(t, e, n) {
          return 6 * (n = (n + 1) % 1) < 1
            ? t + (e - t) * n * 6
            : 2 * n < 1
            ? e
            : 3 * n < 2
            ? t + (e - t) * (2 / 3 - n) * 6
            : t;
        }
        var o,
          s =
            "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
          a = /^([\-+])=\s*(\d+\.?\d*)/,
          l = [
            {
              re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
              parse: function (t) {
                return [t[1], t[2], t[3], t[4]];
              },
            },
            {
              re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
              parse: function (t) {
                return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]];
              },
            },
            {
              re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
              parse: function (t) {
                return [
                  parseInt(t[1], 16),
                  parseInt(t[2], 16),
                  parseInt(t[3], 16),
                ];
              },
            },
            {
              re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
              parse: function (t) {
                return [
                  parseInt(t[1] + t[1], 16),
                  parseInt(t[2] + t[2], 16),
                  parseInt(t[3] + t[3], 16),
                ];
              },
            },
            {
              re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
              space: "hsla",
              parse: function (t) {
                return [t[1], t[2] / 100, t[3] / 100, t[4]];
              },
            },
          ],
          c = (t.Color = function (e, n, i, r) {
            return new t.Color.fn.parse(e, n, i, r);
          }),
          u = {
            rgba: {
              props: {
                red: { idx: 0, type: "byte" },
                green: { idx: 1, type: "byte" },
                blue: { idx: 2, type: "byte" },
              },
            },
            hsla: {
              props: {
                hue: { idx: 0, type: "degrees" },
                saturation: { idx: 1, type: "percent" },
                lightness: { idx: 2, type: "percent" },
              },
            },
          },
          h = {
            byte: { floor: !0, max: 255 },
            percent: { max: 1 },
            degrees: { mod: 360, floor: !0 },
          },
          d = (c.support = {}),
          f = t("<p>")[0],
          p = t.each;
        (f.style.cssText = "background-color:rgba(1,1,1,.5)"),
          (d.rgba = f.style.backgroundColor.indexOf("rgba") > -1),
          p(u, function (t, e) {
            (e.cache = "_" + t),
              (e.props.alpha = { idx: 3, type: "percent", def: 1 });
          }),
          (c.fn = t.extend(c.prototype, {
            parse: function (r, s, a, l) {
              if (r === e) return (this._rgba = [null, null, null, null]), this;
              (r.jquery || r.nodeType) && ((r = t(r).css(s)), (s = e));
              var h = this,
                d = t.type(r),
                f = (this._rgba = []);
              return (
                s !== e && ((r = [r, s, a, l]), (d = "array")),
                "string" === d
                  ? this.parse(i(r) || o._default)
                  : "array" === d
                  ? (p(u.rgba.props, function (t, e) {
                      f[e.idx] = n(r[e.idx], e);
                    }),
                    this)
                  : "object" === d
                  ? (p(
                      u,
                      r instanceof c
                        ? function (t, e) {
                            r[e.cache] && (h[e.cache] = r[e.cache].slice());
                          }
                        : function (e, i) {
                            var o = i.cache;
                            p(i.props, function (t, e) {
                              if (!h[o] && i.to) {
                                if ("alpha" === t || null == r[t]) return;
                                h[o] = i.to(h._rgba);
                              }
                              h[o][e.idx] = n(r[t], e, !0);
                            }),
                              h[o] &&
                                t.inArray(null, h[o].slice(0, 3)) < 0 &&
                                ((h[o][3] = 1),
                                i.from && (h._rgba = i.from(h[o])));
                          }
                    ),
                    this)
                  : void 0
              );
            },
            is: function (t) {
              var e = c(t),
                n = !0,
                i = this;
              return (
                p(u, function (t, r) {
                  var o,
                    s = e[r.cache];
                  return (
                    s &&
                      ((o = i[r.cache] || (r.to && r.to(i._rgba)) || []),
                      p(r.props, function (t, e) {
                        if (null != s[e.idx])
                          return (n = s[e.idx] === o[e.idx]);
                      })),
                    n
                  );
                }),
                n
              );
            },
            _space: function () {
              var t = [],
                e = this;
              return (
                p(u, function (n, i) {
                  e[i.cache] && t.push(n);
                }),
                t.pop()
              );
            },
            transition: function (t, e) {
              var i = c(t),
                r = i._space(),
                o = u[r],
                s = 0 === this.alpha() ? c("transparent") : this,
                a = s[o.cache] || o.to(s._rgba),
                l = a.slice();
              return (
                (i = i[o.cache]),
                p(o.props, function (t, r) {
                  var o = r.idx,
                    s = a[o],
                    c = i[o],
                    u = h[r.type] || {};
                  null !== c &&
                    (null === s
                      ? (l[o] = c)
                      : (u.mod &&
                          (c - s > u.mod / 2
                            ? (s += u.mod)
                            : s - c > u.mod / 2 && (s -= u.mod)),
                        (l[o] = n((c - s) * e + s, r))));
                }),
                this[r](l)
              );
            },
            blend: function (e) {
              if (1 === this._rgba[3]) return this;
              var n = this._rgba.slice(),
                i = n.pop(),
                r = c(e)._rgba;
              return c(
                t.map(n, function (t, e) {
                  return (1 - i) * r[e] + i * t;
                })
              );
            },
            toRgbaString: function () {
              var e = "rgba(",
                n = t.map(this._rgba, function (t, e) {
                  return null == t ? (e > 2 ? 1 : 0) : t;
                });
              return 1 === n[3] && (n.pop(), (e = "rgb(")), e + n.join() + ")";
            },
            toHslaString: function () {
              var e = "hsla(",
                n = t.map(this.hsla(), function (t, e) {
                  return (
                    null == t && (t = e > 2 ? 1 : 0),
                    e && e < 3 && (t = Math.round(100 * t) + "%"),
                    t
                  );
                });
              return 1 === n[3] && (n.pop(), (e = "hsl(")), e + n.join() + ")";
            },
            toHexString: function (e) {
              var n = this._rgba.slice(),
                i = n.pop();
              return (
                e && n.push(~~(255 * i)),
                "#" +
                  t
                    .map(n, function (t) {
                      return 1 === (t = (t || 0).toString(16)).length
                        ? "0" + t
                        : t;
                    })
                    .join("")
              );
            },
            toString: function () {
              return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
            },
          })),
          (c.fn.parse.prototype = c.fn),
          (u.hsla.to = function (t) {
            if (null == t[0] || null == t[1] || null == t[2])
              return [null, null, null, t[3]];
            var e,
              n,
              i = t[0] / 255,
              r = t[1] / 255,
              o = t[2] / 255,
              s = t[3],
              a = Math.max(i, r, o),
              l = Math.min(i, r, o),
              c = a - l,
              u = a + l,
              h = 0.5 * u;
            return (
              (e =
                l === a
                  ? 0
                  : i === a
                  ? (60 * (r - o)) / c + 360
                  : r === a
                  ? (60 * (o - i)) / c + 120
                  : (60 * (i - r)) / c + 240),
              (n = 0 === c ? 0 : h <= 0.5 ? c / u : c / (2 - u)),
              [Math.round(e) % 360, n, h, null == s ? 1 : s]
            );
          }),
          (u.hsla.from = function (t) {
            if (null == t[0] || null == t[1] || null == t[2])
              return [null, null, null, t[3]];
            var e = t[0] / 360,
              n = t[1],
              i = t[2],
              o = t[3],
              s = i <= 0.5 ? i * (1 + n) : i + n - i * n,
              a = 2 * i - s;
            return [
              Math.round(255 * r(a, s, e + 1 / 3)),
              Math.round(255 * r(a, s, e)),
              Math.round(255 * r(a, s, e - 1 / 3)),
              o,
            ];
          }),
          p(u, function (i, r) {
            var o = r.props,
              s = r.cache,
              l = r.to,
              u = r.from;
            (c.fn[i] = function (i) {
              if ((l && !this[s] && (this[s] = l(this._rgba)), i === e))
                return this[s].slice();
              var r,
                a = t.type(i),
                h = "array" === a || "object" === a ? i : arguments,
                d = this[s].slice();
              return (
                p(o, function (t, e) {
                  var i = h["object" === a ? t : e.idx];
                  null == i && (i = d[e.idx]), (d[e.idx] = n(i, e));
                }),
                u ? (((r = c(u(d)))[s] = d), r) : c(d)
              );
            }),
              p(o, function (e, n) {
                c.fn[e] ||
                  (c.fn[e] = function (r) {
                    var o,
                      s = t.type(r),
                      l = "alpha" === e ? (this._hsla ? "hsla" : "rgba") : i,
                      c = this[l](),
                      u = c[n.idx];
                    return "undefined" === s
                      ? u
                      : ("function" === s &&
                          ((r = r.call(this, u)), (s = t.type(r))),
                        null == r && n.empty
                          ? this
                          : ("string" === s &&
                              (o = a.exec(r)) &&
                              (r =
                                u + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1)),
                            (c[n.idx] = r),
                            this[l](c)));
                  });
              });
          }),
          (c.hook = function (e) {
            var n = e.split(" ");
            p(n, function (e, n) {
              (t.cssHooks[n] = {
                set: function (e, r) {
                  var o,
                    s,
                    a = "";
                  if (
                    "transparent" !== r &&
                    ("string" !== t.type(r) || (o = i(r)))
                  ) {
                    if (((r = c(o || r)), !d.rgba && 1 !== r._rgba[3])) {
                      for (
                        s = "backgroundColor" === n ? e.parentNode : e;
                        ("" === a || "transparent" === a) && s && s.style;

                      )
                        try {
                          (a = t.css(s, "backgroundColor")), (s = s.parentNode);
                        } catch (l) {}
                      r = r.blend(a && "transparent" !== a ? a : "_default");
                    }
                    r = r.toRgbaString();
                  }
                  try {
                    e.style[n] = r;
                  } catch (l) {}
                },
              }),
                (t.fx.step[n] = function (e) {
                  e.colorInit ||
                    ((e.start = c(e.elem, n)),
                    (e.end = c(e.end)),
                    (e.colorInit = !0)),
                    t.cssHooks[n].set(e.elem, e.start.transition(e.end, e.pos));
                });
            });
          }),
          c.hook(s),
          (t.cssHooks.borderColor = {
            expand: function (t) {
              var e = {};
              return (
                p(["Top", "Right", "Bottom", "Left"], function (n, i) {
                  e["border" + i + "Color"] = t;
                }),
                e
              );
            },
          }),
          (o = t.Color.names =
            {
              aqua: "#00ffff",
              black: "#000000",
              blue: "#0000ff",
              fuchsia: "#ff00ff",
              gray: "#808080",
              green: "#008000",
              lime: "#00ff00",
              maroon: "#800000",
              navy: "#000080",
              olive: "#808000",
              purple: "#800080",
              red: "#ff0000",
              silver: "#c0c0c0",
              teal: "#008080",
              white: "#ffffff",
              yellow: "#ffff00",
              transparent: [null, null, null, 0],
              _default: "#ffffff",
            });
      })(o),
      (function () {
        function e(e) {
          var n,
            i,
            r = e.ownerDocument.defaultView
              ? e.ownerDocument.defaultView.getComputedStyle(e, null)
              : e.currentStyle,
            o = {};
          if (r && r.length && r[0] && r[r[0]])
            for (i = r.length; i--; )
              "string" == typeof r[(n = r[i])] && (o[t.camelCase(n)] = r[n]);
          else for (n in r) "string" == typeof r[n] && (o[n] = r[n]);
          return o;
        }
        function n(e, n) {
          var i,
            r,
            o = {};
          for (i in n)
            (r = n[i]),
              e[i] !== r &&
                (s[i] || (!t.fx.step[i] && isNaN(parseFloat(r))) || (o[i] = r));
          return o;
        }
        var i,
          r = ["add", "remove", "toggle"],
          s = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1,
          };
        t.each(
          [
            "borderLeftStyle",
            "borderRightStyle",
            "borderBottomStyle",
            "borderTopStyle",
          ],
          function (e, n) {
            t.fx.step[n] = function (t) {
              (("none" !== t.end && !t.setAttr) ||
                (1 === t.pos && !t.setAttr)) &&
                (o.style(t.elem, n, t.end), (t.setAttr = !0));
            };
          }
        ),
          t.fn.addBack ||
            (t.fn.addBack = function (t) {
              return this.add(
                null == t ? this.prevObject : this.prevObject.filter(t)
              );
            }),
          (t.effects.animateClass = function (i, o, s, a) {
            var l = t.speed(o, s, a);
            return this.queue(function () {
              var o,
                s = t(this),
                a = s.attr("class") || "",
                c = l.children ? s.find("*").addBack() : s;
              (c = c.map(function () {
                return { el: t(this), start: e(this) };
              })),
                (o = function () {
                  t.each(r, function (t, e) {
                    i[e] && s[e + "Class"](i[e]);
                  });
                })(),
                (c = c.map(function () {
                  return (
                    (this.end = e(this.el[0])),
                    (this.diff = n(this.start, this.end)),
                    this
                  );
                })),
                s.attr("class", a),
                (c = c.map(function () {
                  var e = this,
                    n = t.Deferred(),
                    i = t.extend({}, l, {
                      queue: !1,
                      complete: function () {
                        n.resolve(e);
                      },
                    });
                  return this.el.animate(this.diff, i), n.promise();
                })),
                t.when.apply(t, c.get()).done(function () {
                  o(),
                    t.each(arguments, function () {
                      var e = this.el;
                      t.each(this.diff, function (t) {
                        e.css(t, "");
                      });
                    }),
                    l.complete.call(s[0]);
                });
            });
          }),
          t.fn.extend({
            addClass:
              ((i = t.fn.addClass),
              function (e, n, r, o) {
                return n
                  ? t.effects.animateClass.call(this, { add: e }, n, r, o)
                  : i.apply(this, arguments);
              }),
            removeClass: (function (e) {
              return function (n, i, r, o) {
                return arguments.length > 1
                  ? t.effects.animateClass.call(this, { remove: n }, i, r, o)
                  : e.apply(this, arguments);
              };
            })(t.fn.removeClass),
            toggleClass: (function (e) {
              return function (n, i, r, o, s) {
                return "boolean" == typeof i || i === undefined
                  ? r
                    ? t.effects.animateClass.call(
                        this,
                        i ? { add: n } : { remove: n },
                        r,
                        o,
                        s
                      )
                    : e.apply(this, arguments)
                  : t.effects.animateClass.call(this, { toggle: n }, i, r, o);
              };
            })(t.fn.toggleClass),
            switchClass: function (e, n, i, r, o) {
              return t.effects.animateClass.call(
                this,
                { add: n, remove: e },
                i,
                r,
                o
              );
            },
          });
      })(),
      (function () {
        function e(e, n, i, r) {
          return (
            t.isPlainObject(e) && ((n = e), (e = e.effect)),
            (e = { effect: e }),
            null == n && (n = {}),
            t.isFunction(n) && ((r = n), (i = null), (n = {})),
            ("number" == typeof n || t.fx.speeds[n]) &&
              ((r = i), (i = n), (n = {})),
            t.isFunction(i) && ((r = i), (i = null)),
            n && t.extend(e, n),
            (i = i || n.duration),
            (e.duration = t.fx.off
              ? 0
              : "number" == typeof i
              ? i
              : i in t.fx.speeds
              ? t.fx.speeds[i]
              : t.fx.speeds._default),
            (e.complete = r || n.complete),
            e
          );
        }
        function o(e) {
          return (
            !(e && "number" != typeof e && !t.fx.speeds[e]) ||
            ("string" == typeof e && !t.effects.effect[e]) ||
            !!t.isFunction(e) ||
            ("object" == typeof e && !e.effect)
          );
        }
        function s(t, e) {
          var n = e.outerWidth(),
            i = e.outerHeight(),
            r =
              /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(
                t
              ) || ["", 0, n, i, 0];
          return {
            top: parseFloat(r[1]) || 0,
            right: "auto" === r[2] ? n : parseFloat(r[2]),
            bottom: "auto" === r[3] ? i : parseFloat(r[3]),
            left: parseFloat(r[4]) || 0,
          };
        }
        var a;
        t.expr &&
          t.expr.filters &&
          t.expr.filters.animated &&
          (t.expr.filters.animated =
            ((a = t.expr.filters.animated),
            function (e) {
              return !!t(e).data(r) || a(e);
            })),
          !1 !== t.uiBackCompat &&
            t.extend(t.effects, {
              save: function (t, e) {
                for (var i = 0, r = e.length; i < r; i++)
                  null !== e[i] && t.data(n + e[i], t[0].style[e[i]]);
              },
              restore: function (t, e) {
                for (var i, r = 0, o = e.length; r < o; r++)
                  null !== e[r] && ((i = t.data(n + e[r])), t.css(e[r], i));
              },
              setMode: function (t, e) {
                return (
                  "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
                );
              },
              createWrapper: function (e) {
                if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                var n = {
                    width: e.outerWidth(!0),
                    height: e.outerHeight(!0),
                    float: e.css("float"),
                  },
                  i = t("<div></div>")
                    .addClass("ui-effects-wrapper")
                    .css({
                      fontSize: "100%",
                      background: "transparent",
                      border: "none",
                      margin: 0,
                      padding: 0,
                    }),
                  r = { width: e.width(), height: e.height() },
                  o = document.activeElement;
                try {
                  o.id;
                } catch (s) {
                  o = document.body;
                }
                return (
                  e.wrap(i),
                  (e[0] === o || t.contains(e[0], o)) && t(o).trigger("focus"),
                  (i = e.parent()),
                  "static" === e.css("position")
                    ? (i.css({ position: "relative" }),
                      e.css({ position: "relative" }))
                    : (t.extend(n, {
                        position: e.css("position"),
                        zIndex: e.css("z-index"),
                      }),
                      t.each(
                        ["top", "left", "bottom", "right"],
                        function (t, i) {
                          (n[i] = e.css(i)),
                            isNaN(parseInt(n[i], 10)) && (n[i] = "auto");
                        }
                      ),
                      e.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto",
                      })),
                  e.css(r),
                  i.css(n).show()
                );
              },
              removeWrapper: function (e) {
                var n = document.activeElement;
                return (
                  e.parent().is(".ui-effects-wrapper") &&
                    (e.parent().replaceWith(e),
                    (e[0] === n || t.contains(e[0], n)) &&
                      t(n).trigger("focus")),
                  e
                );
              },
            }),
          t.extend(t.effects, {
            version: "1.12.1",
            define: function (e, n, i) {
              return (
                i || ((i = n), (n = "effect")),
                (t.effects.effect[e] = i),
                (t.effects.effect[e].mode = n),
                i
              );
            },
            scaledDimensions: function (t, e, n) {
              if (0 === e)
                return { height: 0, width: 0, outerHeight: 0, outerWidth: 0 };
              var i = "horizontal" !== n ? (e || 100) / 100 : 1,
                r = "vertical" !== n ? (e || 100) / 100 : 1;
              return {
                height: t.height() * r,
                width: t.width() * i,
                outerHeight: t.outerHeight() * r,
                outerWidth: t.outerWidth() * i,
              };
            },
            clipToBox: function (t) {
              return {
                width: t.clip.right - t.clip.left,
                height: t.clip.bottom - t.clip.top,
                left: t.clip.left,
                top: t.clip.top,
              };
            },
            unshift: function (t, e, n) {
              var i = t.queue();
              e > 1 && i.splice.apply(i, [1, 0].concat(i.splice(e, n))),
                t.dequeue();
            },
            saveStyle: function (t) {
              t.data(i, t[0].style.cssText);
            },
            restoreStyle: function (t) {
              (t[0].style.cssText = t.data(i) || ""), t.removeData(i);
            },
            mode: function (t, e) {
              var n = t.is(":hidden");
              return (
                "toggle" === e && (e = n ? "show" : "hide"),
                (n ? "hide" === e : "show" === e) && (e = "none"),
                e
              );
            },
            getBaseline: function (t, e) {
              var n, i;
              switch (t[0]) {
                case "top":
                  n = 0;
                  break;
                case "middle":
                  n = 0.5;
                  break;
                case "bottom":
                  n = 1;
                  break;
                default:
                  n = t[0] / e.height;
              }
              switch (t[1]) {
                case "left":
                  i = 0;
                  break;
                case "center":
                  i = 0.5;
                  break;
                case "right":
                  i = 1;
                  break;
                default:
                  i = t[1] / e.width;
              }
              return { x: i, y: n };
            },
            createPlaceholder: function (e) {
              var i,
                r = e.css("position"),
                o = e.position();
              return (
                e
                  .css({
                    marginTop: e.css("marginTop"),
                    marginBottom: e.css("marginBottom"),
                    marginLeft: e.css("marginLeft"),
                    marginRight: e.css("marginRight"),
                  })
                  .outerWidth(e.outerWidth())
                  .outerHeight(e.outerHeight()),
                /^(static|relative)/.test(r) &&
                  ((r = "absolute"),
                  (i = t("<" + e[0].nodeName + ">")
                    .insertAfter(e)
                    .css({
                      display: /^(inline|ruby)/.test(e.css("display"))
                        ? "inline-block"
                        : "block",
                      visibility: "hidden",
                      marginTop: e.css("marginTop"),
                      marginBottom: e.css("marginBottom"),
                      marginLeft: e.css("marginLeft"),
                      marginRight: e.css("marginRight"),
                      float: e.css("float"),
                    })
                    .outerWidth(e.outerWidth())
                    .outerHeight(e.outerHeight())
                    .addClass("ui-effects-placeholder")),
                  e.data(n + "placeholder", i)),
                e.css({ position: r, left: o.left, top: o.top }),
                i
              );
            },
            removePlaceholder: function (t) {
              var e = n + "placeholder",
                i = t.data(e);
              i && (i.remove(), t.removeData(e));
            },
            cleanUp: function (e) {
              t.effects.restoreStyle(e), t.effects.removePlaceholder(e);
            },
            setTransition: function (e, n, i, r) {
              return (
                (r = r || {}),
                t.each(n, function (t, n) {
                  var o = e.cssUnit(n);
                  o[0] > 0 && (r[n] = o[0] * i + o[1]);
                }),
                r
              );
            },
          }),
          t.fn.extend({
            effect: function () {
              function n(e) {
                function n() {
                  l.removeData(r),
                    t.effects.cleanUp(l),
                    "hide" === i.mode && l.hide(),
                    a();
                }
                function a() {
                  t.isFunction(c) && c.call(l[0]), t.isFunction(e) && e();
                }
                var l = t(this);
                (i.mode = h.shift()),
                  !1 === t.uiBackCompat || s
                    ? "none" === i.mode
                      ? (l[u](), a())
                      : o.call(l[0], i, n)
                    : (l.is(":hidden") ? "hide" === u : "show" === u)
                    ? (l[u](), a())
                    : o.call(l[0], i, a);
              }
              var i = e.apply(this, arguments),
                o = t.effects.effect[i.effect],
                s = o.mode,
                a = i.queue,
                l = a || "fx",
                c = i.complete,
                u = i.mode,
                h = [],
                d = function (e) {
                  var n = t(this),
                    i = t.effects.mode(n, u) || s;
                  n.data(r, !0),
                    h.push(i),
                    s &&
                      ("show" === i || (i === s && "hide" === i)) &&
                      n.show(),
                    (s && "none" === i) || t.effects.saveStyle(n),
                    t.isFunction(e) && e();
                };
              return t.fx.off || !o
                ? u
                  ? this[u](i.duration, c)
                  : this.each(function () {
                      c && c.call(this);
                    })
                : !1 === a
                ? this.each(d).each(n)
                : this.queue(l, d).queue(l, n);
            },
            show: (function (t) {
              return function (n) {
                if (o(n)) return t.apply(this, arguments);
                var i = e.apply(this, arguments);
                return (i.mode = "show"), this.effect.call(this, i);
              };
            })(t.fn.show),
            hide: (function (t) {
              return function (n) {
                if (o(n)) return t.apply(this, arguments);
                var i = e.apply(this, arguments);
                return (i.mode = "hide"), this.effect.call(this, i);
              };
            })(t.fn.hide),
            toggle: (function (t) {
              return function (n) {
                if (o(n) || "boolean" == typeof n)
                  return t.apply(this, arguments);
                var i = e.apply(this, arguments);
                return (i.mode = "toggle"), this.effect.call(this, i);
              };
            })(t.fn.toggle),
            cssUnit: function (e) {
              var n = this.css(e),
                i = [];
              return (
                t.each(["em", "px", "%", "pt"], function (t, e) {
                  n.indexOf(e) > 0 && (i = [parseFloat(n), e]);
                }),
                i
              );
            },
            cssClip: function (t) {
              return t
                ? this.css(
                    "clip",
                    "rect(" +
                      t.top +
                      "px " +
                      t.right +
                      "px " +
                      t.bottom +
                      "px " +
                      t.left +
                      "px)"
                  )
                : s(this.css("clip"), this);
            },
            transfer: function (e, n) {
              var i = t(this),
                r = t(e.to),
                o = "fixed" === r.css("position"),
                s = t("body"),
                a = o ? s.scrollTop() : 0,
                l = o ? s.scrollLeft() : 0,
                c = r.offset(),
                u = {
                  top: c.top - a,
                  left: c.left - l,
                  height: r.innerHeight(),
                  width: r.innerWidth(),
                },
                h = i.offset(),
                d = t("<div class='ui-effects-transfer'></div>")
                  .appendTo("body")
                  .addClass(e.className)
                  .css({
                    top: h.top - a,
                    left: h.left - l,
                    height: i.innerHeight(),
                    width: i.innerWidth(),
                    position: o ? "fixed" : "absolute",
                  })
                  .animate(u, e.duration, e.easing, function () {
                    d.remove(), t.isFunction(n) && n();
                  });
            },
          }),
          (t.fx.step.clip = function (e) {
            e.clipInit ||
              ((e.start = t(e.elem).cssClip()),
              "string" == typeof e.end && (e.end = s(e.end, e.elem)),
              (e.clipInit = !0)),
              t(e.elem).cssClip({
                top: e.pos * (e.end.top - e.start.top) + e.start.top,
                right: e.pos * (e.end.right - e.start.right) + e.start.right,
                bottom:
                  e.pos * (e.end.bottom - e.start.bottom) + e.start.bottom,
                left: e.pos * (e.end.left - e.start.left) + e.start.left,
              });
          });
      })(),
      (e = {}),
      t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (t, n) {
        e[n] = function (e) {
          return Math.pow(e, t + 2);
        };
      }),
      t.extend(e, {
        Sine: function (t) {
          return 1 - Math.cos((t * Math.PI) / 2);
        },
        Circ: function (t) {
          return 1 - Math.sqrt(1 - t * t);
        },
        Elastic: function (t) {
          return 0 === t || 1 === t
            ? t
            : -Math.pow(2, 8 * (t - 1)) *
                Math.sin(((80 * (t - 1) - 7.5) * Math.PI) / 15);
        },
        Back: function (t) {
          return t * t * (3 * t - 2);
        },
        Bounce: function (t) {
          for (var e, n = 4; t < ((e = Math.pow(2, --n)) - 1) / 11; );
          return (
            1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
          );
        },
      }),
      t.each(e, function (e, n) {
        (t.easing["easeIn" + e] = n),
          (t.easing["easeOut" + e] = function (t) {
            return 1 - n(1 - t);
          }),
          (t.easing["easeInOut" + e] = function (t) {
            return t < 0.5 ? n(2 * t) / 2 : 1 - n(-2 * t + 2) / 2;
          });
      }),
      t.effects
    );
  }),
  (function (t) {
    function e(t, e) {
      if (!(t.originalEvent.touches.length > 1)) {
        t.preventDefault();
        var n = t.originalEvent.changedTouches[0],
          i = document.createEvent("MouseEvents");
        i.initMouseEvent(
          e,
          !0,
          !0,
          window,
          1,
          n.screenX,
          n.screenY,
          n.clientX,
          n.clientY,
          !1,
          !1,
          !1,
          !1,
          0,
          null
        ),
          t.target.dispatchEvent(i);
      }
    }
    if (((t.support.touch = "ontouchend" in document), t.support.touch)) {
      var n,
        i = t.ui.mouse.prototype,
        r = i._mouseInit,
        o = i._mouseDestroy;
      (i._touchStart = function (t) {
        var i = this;
        !n &&
          i._mouseCapture(t.originalEvent.changedTouches[0]) &&
          ((n = !0),
          (i._touchMoved = !1),
          e(t, "mouseover"),
          e(t, "mousemove"),
          e(t, "mousedown"));
      }),
        (i._touchMove = function (t) {
          n && ((this._touchMoved = !0), e(t, "mousemove"));
        }),
        (i._touchEnd = function (t) {
          n &&
            (e(t, "mouseup"),
            e(t, "mouseout"),
            this._touchMoved || e(t, "click"),
            (n = !1));
        }),
        (i._mouseInit = function () {
          var e = this;
          e.element.bind({
            touchstart: t.proxy(e, "_touchStart"),
            touchmove: t.proxy(e, "_touchMove"),
            touchend: t.proxy(e, "_touchEnd"),
          }),
            r.call(e);
        }),
        (i._mouseDestroy = function () {
          var e = this;
          e.element.unbind({
            touchstart: t.proxy(e, "_touchStart"),
            touchmove: t.proxy(e, "_touchMove"),
            touchend: t.proxy(e, "_touchEnd"),
          }),
            o.call(e);
        });
    }
  })(jQuery);
var $jscomp = $jscomp || {};
($jscomp.scope = {}),
  ($jscomp.findInternal = function (t, e, n) {
    t instanceof String && (t = String(t));
    for (var i = t.length, r = 0; r < i; r++) {
      var o = t[r];
      if (e.call(n, o, r, t)) return { i: r, v: o };
    }
    return { i: -1, v: void 0 };
  }),
  ($jscomp.ASSUME_ES5 = !1),
  ($jscomp.ASSUME_NO_NATIVE_MAP = !1),
  ($jscomp.ASSUME_NO_NATIVE_SET = !1),
  ($jscomp.defineProperty =
    $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
      ? Object.defineProperty
      : function (t, e, n) {
          t != Array.prototype && t != Object.prototype && (t[e] = n.value);
        }),
  ($jscomp.getGlobal = function (t) {
    return "undefined" != typeof window && window === t
      ? t
      : "undefined" != typeof global && null != global
      ? global
      : t;
  }),
  ($jscomp.global = $jscomp.getGlobal(this)),
  ($jscomp.polyfill = function (t, e, n, i) {
    if (e) {
      for (n = $jscomp.global, t = t.split("."), i = 0; i < t.length - 1; i++) {
        var r = t[i];
        r in n || (n[r] = {}), (n = n[r]);
      }
      (e = e((i = n[(t = t[t.length - 1])]))) != i &&
        null != e &&
        $jscomp.defineProperty(n, t, {
          configurable: !0,
          writable: !0,
          value: e,
        });
    }
  }),
  $jscomp.polyfill(
    "Array.prototype.find",
    function (t) {
      return (
        t ||
        function (t, e) {
          return $jscomp.findInternal(this, t, e).v;
        }
      );
    },
    "es6",
    "es3"
  );
var windowScrollTop = 0;
jQuery(document).ready(function (t) {
  function e() {
    t(".cd-nav-trigger").removeClass("nav-is-visible"),
      t(".cd-main-header").removeClass("nav-is-visible"),
      t(".cd-primary-nav").removeClass("nav-is-visible"),
      t(".credits").removeClass("nav-is-visible"),
      t("#footer").removeClass("nav-is-visible"),
      t(".has-children ul").addClass("is-hidden"),
      t(".has-children a").removeClass("selected"),
      t(".moves-out").removeClass("moves-out"),
      t(".cd-main-content")
        .removeClass("nav-is-visible")
        .one(
          "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
          function () {
            t("body").removeClass("overflow-hidden");
          }
        );
  }
  function n() {
    t("#cd-search-more-mess").show(),
      t(".cd-search").removeClass("is-visible"),
      t(".cd-search-trigger").removeClass("search-is-visible"),
      t(".cd-overlay")
        .removeClass("search-is-visible")
        .removeClass("is-visible");
    var e = !1;
    t(".cd-search").one(
      "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
      function () {
        e || (t(window).scrollTop(windowScrollTop), (e = !0));
      }
    );
  }
  function i() {
    t(".cd-search").hasClass("is-visible")
      ? n()
      : (t(".cd-search")
          .toggleClass("is-visible")
          .find('input[type="search"]')
          .focus(),
        t(".cd-search-trigger").toggleClass("search-is-visible"),
        t(".cd-overlay").toggleClass("search-is-visible"),
        t(".cd-search").hasClass("is-visible")
          ? t(".cd-overlay").addClass("is-visible")
          : t(".cd-overlay").removeClass("is-visible"));
  }
  function r() {
    var t = window,
      e = "inner";
    return (
      "innerWidth" in window ||
        ((e = "client"), (t = document.documentElement || document.body)),
      t[e + "Width"] >= MqL
    );
  }
  function o() {
    var e = t(".cd-nav");
    r()
      ? (e.detach(), e.insertBefore("#cd-header-buttons"))
      : (e.detach(), e.insertAfter("#footer"));
  }
  function s() {
    if (isQuickSearchVisible()) {
      qsInProgress = !0;
      var e = t("#cd-quicksearch").val();
      "" == e
        ? i()
        : ((e = e.substring(0, 30)),
          (window.location = encodeURI("/searchq?q=" + e)));
    }
  }
  function a() {
    "" == t("#cd-quicksearch").val()
      ? t("#qs-close").css({ opacity: 0 })
      : t("#qs-close").css({ opacity: 1 });
  }
  o(),
    t(window).on("resize", function () {
      window.requestAnimationFrame
        ? window.requestAnimationFrame(o)
        : setTimeout(o, 300);
    }),
    t(".cd-nav-trigger").on("click", function (i) {
      i.preventDefault(),
        t(".cd-main-content").hasClass("nav-is-visible")
          ? (e(), t(".cd-overlay").removeClass("is-visible"))
          : (t(this).addClass("nav-is-visible"),
            t(".cd-primary-nav").addClass("nav-is-visible"),
            t(".cd-main-header").addClass("nav-is-visible"),
            t(".cd-main-content")
              .addClass("nav-is-visible")
              .one(
                "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                function () {
                  t("body").addClass("overflow-hidden");
                }
              ),
            t(".credits").addClass("nav-is-visible"),
            t("#footer").addClass("nav-is-visible"),
            n(),
            t(".cd-overlay").addClass("is-visible"));
    }),
    t(".cd-search-trigger").on("click", function (n) {
      (windowScrollTop = t(window).scrollTop()),
        n.preventDefault(),
        a(),
        i(),
        e();
    }),
    t(".cd-overlay").on("swiperight", function () {
      t(".cd-primary-nav").hasClass("nav-is-visible") &&
        (e(), t(".cd-overlay").removeClass("is-visible"));
    }),
    t(".nav-on-left .cd-overlay").on("swipeleft", function () {
      t(".cd-primary-nav").hasClass("nav-is-visible") &&
        (e(), t(".cd-overlay").removeClass("is-visible"));
    }),
    t(".cd-overlay").on("click", function () {
      e(), n(), t(".cd-overlay").removeClass("is-visible");
    }),
    t(".cd-primary-nav")
      .children(".has-children")
      .children("a")
      .on("click", function (t) {
        t.preventDefault();
      }),
    t(".has-children")
      .children("a")
      .on("click", function (e) {
        r() || e.preventDefault(),
          n(),
          (e = t(this)).next("ul").hasClass("is-hidden")
            ? (e
                .addClass("selected")
                .next("ul")
                .removeClass("is-hidden")
                .end()
                .parent(".has-children")
                .parent("ul")
                .addClass("moves-out"),
              e
                .parent(".has-children")
                .siblings(".has-children")
                .children("ul")
                .addClass("is-hidden")
                .end()
                .children("a")
                .removeClass("selected"),
              t(".cd-overlay").addClass("is-visible"))
            : (e
                .removeClass("selected")
                .next("ul")
                .addClass("is-hidden")
                .end()
                .parent(".has-children")
                .parent("ul")
                .removeClass("moves-out"),
              t(".cd-overlay").removeClass("is-visible"));
      }),
    t(".go-back").on("click", function () {
      t(this)
        .parent("ul")
        .addClass("is-hidden")
        .parent(".has-children")
        .parent("ul")
        .removeClass("moves-out");
    }),
    t("#qsearchbutton").click(s),
    t(".qslink").click(function () {
      var e = t("#cd-quicksearch").val();
      "" != e && (this.href += "?q=" + e);
    }),
    t(document).keypress(function (t) {
      13 == t.which && s();
    }),
    t("#cd-quicksearch").bind("keyup", a),
    t("#qs-close").click(function () {
      t("#qs-close").css({ opacity: 0 }), t("#cd-quicksearch").val("").focus();
    }),
    t("#cd-search-showmore").click(function () {
      t("#cd-search-more-mess").hide(), t("#cd-search-more").fadeIn();
    }),
    t(".nnli-ml").click(function (t) {
      t.preventDefault(), (location.href = "/study/lessons");
    });
});
var fullScreen = !1,
  startHeight,
  favorites = new Array(),
  notFavorites = new Array();
!(function (t, e) {
  function n(t, e) {
    return typeof t === e;
  }
  function i() {
    var t, e, i, r, a, c;
    for (var u in s)
      if (s.hasOwnProperty(u)) {
        if (
          ((t = []),
          (e = s[u]).name &&
            (t.push(e.name.toLowerCase()),
            e.options && e.options.aliases && e.options.aliases.length))
        )
          for (i = 0; i < e.options.aliases.length; i++)
            t.push(e.options.aliases[i].toLowerCase());
        for (r = n(e.fn, "function") ? e.fn() : e.fn, a = 0; a < t.length; a++)
          1 === (c = t[a].split(".")).length
            ? (l[c[0]] = r)
            : (!l[c[0]] ||
                l[c[0]] instanceof Boolean ||
                (l[c[0]] = new Boolean(l[c[0]])),
              (l[c[0]][c[1]] = r)),
            o.push((r ? "" : "no-") + c.join("-"));
      }
  }
  function r(t) {
    var e = c.className,
      n = l._config.classPrefix || "";
    if ((u && (e = e.baseVal), l._config.enableJSClass)) {
      var i = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
      e = e.replace(i, "$1" + n + "js$2");
    }
    l._config.enableClasses &&
      ((e += " " + n + t.join(" " + n)),
      u ? (c.className.baseVal = e) : (c.className = e));
  }
  var o = [],
    s = [],
    a = {
      _version: "3.3.1",
      _config: {
        classPrefix: "",
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0,
      },
      _q: [],
      on: function (t, e) {
        var n = this;
        setTimeout(function () {
          e(n[t]);
        }, 0);
      },
      addTest: function (t, e, n) {
        s.push({ name: t, fn: e, options: n });
      },
      addAsyncTest: function (t) {
        s.push({ name: null, fn: t });
      },
    },
    l = function () {};
  (l.prototype = a), (l = new l());
  var c = e.documentElement,
    u = "svg" === c.nodeName.toLowerCase();
  l.addTest("speechsynthesis", "SpeechSynthesisUtterance" in t),
    i(),
    r(o),
    delete a.addTest,
    delete a.addAsyncTest;
  for (var h = 0; h < l._q.length; h++) l._q[h]();
  t.Modernizr = l;
})(window, document);
var audioRate = 1,
  voices = [],
  voiceSummary = "",
  jaVoice = null,
  canSpeakJapanese = !1,
  audioSetupComplete = !1,
  $jscomp = $jscomp || {};
($jscomp.scope = {}),
  ($jscomp.ASSUME_ES5 = !1),
  ($jscomp.ASSUME_NO_NATIVE_MAP = !1),
  ($jscomp.ASSUME_NO_NATIVE_SET = !1),
  ($jscomp.defineProperty =
    $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
      ? Object.defineProperty
      : function (t, e, n) {
          t != Array.prototype && t != Object.prototype && (t[e] = n.value);
        }),
  ($jscomp.getGlobal = function (t) {
    return "undefined" != typeof window && window === t
      ? t
      : "undefined" != typeof global && null != global
      ? global
      : t;
  }),
  ($jscomp.global = $jscomp.getGlobal(this)),
  ($jscomp.SYMBOL_PREFIX = "jscomp_symbol_"),
  ($jscomp.initSymbol = function () {
    ($jscomp.initSymbol = function () {}),
      $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
  }),
  ($jscomp.Symbol = (function () {
    var t = 0;
    return function (e) {
      return $jscomp.SYMBOL_PREFIX + (e || "") + t++;
    };
  })()),
  ($jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var t = $jscomp.global.Symbol.iterator;
    t ||
      (t = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator")),
      "function" != typeof Array.prototype[t] &&
        $jscomp.defineProperty(Array.prototype, t, {
          configurable: !0,
          writable: !0,
          value: function () {
            return $jscomp.arrayIterator(this);
          },
        }),
      ($jscomp.initSymbolIterator = function () {});
  }),
  ($jscomp.arrayIterator = function (t) {
    var e = 0;
    return $jscomp.iteratorPrototype(function () {
      return e < t.length ? { done: !1, value: t[e++] } : { done: !0 };
    });
  }),
  ($jscomp.iteratorPrototype = function (t) {
    return (
      $jscomp.initSymbolIterator(),
      ((t = { next: t })[$jscomp.global.Symbol.iterator] = function () {
        return this;
      }),
      t
    );
  }),
  ($jscomp.makeIterator = function (t) {
    $jscomp.initSymbolIterator();
    var e = t[Symbol.iterator];
    return e ? e.call(t) : $jscomp.arrayIterator(t);
  }),
  ($jscomp.arrayFromIterator = function (t) {
    for (var e, n = []; !(e = t.next()).done; ) n.push(e.value);
    return n;
  }),
  ($jscomp.arrayFromIterable = function (t) {
    return t instanceof Array
      ? t
      : $jscomp.arrayFromIterator($jscomp.makeIterator(t));
  }),
  ($jscomp.polyfill = function (t, e, n, i) {
    if (e) {
      for (n = $jscomp.global, t = t.split("."), i = 0; i < t.length - 1; i++) {
        var r = t[i];
        r in n || (n[r] = {}), (n = n[r]);
      }
      (e = e((i = n[(t = t[t.length - 1])]))) != i &&
        null != e &&
        $jscomp.defineProperty(n, t, {
          configurable: !0,
          writable: !0,
          value: e,
        });
    }
  }),
  $jscomp.polyfill(
    "String.fromCodePoint",
    function (t) {
      return (
        t ||
        function () {
          for (var t = "", e = 0; e < arguments.length; e++) {
            var n = Number(arguments[e]);
            if (0 > n || 1114111 < n || n !== Math.floor(n))
              throw new RangeError("invalid_code_point " + n);
            65535 >= n
              ? (t += String.fromCharCode(n))
              : ((n -= 65536),
                (t += String.fromCharCode(((n >>> 10) & 1023) | 55296)),
                (t += String.fromCharCode((1023 & n) | 56320)));
          }
          return t;
        }
      );
    },
    "es6",
    "es3"
  ),
  $jscomp.polyfill(
    "Object.is",
    function (t) {
      return (
        t ||
        function (t, e) {
          return t === e ? 0 !== t || 1 / t == 1 / e : t != t && e != e;
        }
      );
    },
    "es6",
    "es3"
  ),
  $jscomp.polyfill(
    "Array.prototype.includes",
    function (t) {
      return (
        t ||
        function (t, e) {
          var n = this;
          n instanceof String && (n = String(n));
          var i = n.length;
          for (e = e || 0; e < i; e++)
            if (n[e] == t || Object.is(n[e], t)) return !0;
          return !1;
        }
      );
    },
    "es7",
    "es3"
  ),
  ($jscomp.checkStringArgs = function (t, e, n) {
    if (null == t)
      throw new TypeError(
        "The 'this' value for String.prototype." +
          n +
          " must not be null or undefined"
      );
    if (e instanceof RegExp)
      throw new TypeError(
        "First argument to String.prototype." +
          n +
          " must not be a regular expression"
      );
    return t + "";
  }),
  $jscomp.polyfill(
    "String.prototype.includes",
    function (t) {
      return (
        t ||
        function (t, e) {
          return (
            -1 !==
            $jscomp.checkStringArgs(this, t, "includes").indexOf(t, e || 0)
          );
        }
      );
    },
    "es6",
    "es3"
  );
var ComponentBuilder2 = function () {
  (this.debug = !1),
    (this.kanjiDiv = $("#cb2-kanji")),
    (this.listid = 3),
    (this.listmessages = [
      "Currently showing all components",
      "Currently showing standard radicals",
      "Currently showing most common Joyo components",
    ]),
    (this.allComponents = []),
    (this.possibleComponents = []),
    (this.highlightedComponents = []),
    (this.selectedComponents = []),
    (this.componentError = null),
    (this.variants = []),
    (this.componentDetails = new HashTable()),
    (this.maxshow = 40),
    (this.kfrom = 0),
    (this.kto = this.maxshow - 1),
    (this.wmMessage = "Component or key meaning"),
    (this.footerZ = 0),
    (this.recToken = this.recUrl = null),
    (this.componentListWithCounts =
      "1\u4e00\u4e28\u4e36\u30ce\u4e59\u4e5a\u2e84\u4e85\ud840\udcca\u310b\u31c72\u4e43\u4e8c\u4ea0\u4eba\u4ebb\ud840\udda2\ud840\udc89\u513f\u5165\u516b\u30cf\u4e37\u5182\u5196\u51ab\u2e80\u51e0\u51f5\u5200\u5202\u529b\u52f9\u5315\u531a\u5341\ud840\udc87\u535c\u5369\u353e\u5382\u2e81\u53b6\u53c8\u4e42\u3405\u2e88\u4e02\u4e05\u30de\u4e06\u4e5d\u4e03\u4e013\u5343\u53e3\u56d7\u571f\u58eb\u5902\u5915\u5927\u5973\u5b50\u5b51\u5b80\u5bf8\u5c0f\u2e8c\u2e8d\u5c38\u5c6e\u5c71\u5ddd\u5de5\u5df1\u5dfe\u5e72\u5e7a\u5e7f\u5ef4\u5efe\u5f0b\u5f13\u5f50\u30e8\u2e95\u5f61\u5f73\u5fc4\u624c\u6c35\u4e2c\u72ad\u8279\u4491\u2ecc\u2ecf\u2ed6\u4e0c\u4ebc\u5140\u4e09\u4e0a\u4e38\u4ea1\u51e1\u4e8e\u52fa\u4e5f4\u5346\u5fc3\u6208\u6238\u624b\u652f\u6535\u6587\u6597\u65a4\u65b9\u65e5\u6708\u2e9d\u6728\u6b20\u6b62\u6b79\u6bb3\u6bcb\u6bd4\u6bdb\u6c0f\u6c34\u706b\u706c\u722a\u722b\u2ea4\u7236\u7247\u725b\u725c\u72ac\u793b\u34c1\u8002\u2ebc\ud85d\ude07\u8fb6\ud842\uded3\u9fb6\u8080\u2ea7\u738b\u536c\u5f00\u30f0\u4e30\u5df4\u5316\u592d\u4e94\u4e2d\u4eca\u5185\u516c\u5c11\u516d\u5143\u592b\u53cd\u53cb\u533a\u4e91\u5302\u5c3a\u51f6\u52ff\u58ec\u5eff\u5929\u9fb7\u4e88\u5206\u4e955\u5fc5\u5de8\u6c37\u6bcd\u2ea2\u7259\u7384\u7389\u74e6\u7518\u751f\u7528\u7530\u758b\u7592\u7676\u767d\u76ae\u76bf\u76ee\u77db\u77e2\u77f3\u793a\u79b8\u79be\u7a74\u7acb\u7f52\u8864\u9fb8\ud845\uddd7\u7535\u4e3b\u4e4d\u5723\u53ef\u592e\u51fa\u518b\u6c10\u5e02\u4ed8\u53e4\u53f0\u672a\u7533\u53bb\u53f8\u5144\u4ee4\u53e5\u5305\u5360\u518a\u53ec\u4e14\u7531\u6b63\u5725\u382f\u65e6\u536f\u620a\u4e1a6\u4ea6\u43cd\u7536\u7af9\u2eae\u7c73\u7cf8\u7f36\u7f8a\ud858\udf4c\u7fbd\u8001\u800c\u8033\u807f\u8089\u81ea\u81f3\u81fc\ud85a\udd51\u820c\u821f\u826e\u8272\u864d\u866b\u8840\u884c\u8863\u897f\ud84a\udd8f\u5173\u9fb9\u4ea5\u5c17\u5e76\u5216\ud840\udca4\u5408\u540c\u6709\u767e\u65e9\u4ea4\u5171\u518d\u5bfa\u6bce\u66f2\u5146\u65e8\u572d\u620c\u6b21\u518e\u54047\u7cfb\u81e3\u821b\u826f\u8980\u898b\u89d2\u8a00\u8c37\u8c46\u8c55\u8c9d\u8d64\u8d70\u8db3\u2eca\u8eab\u8eca\u8f9b\u8fb0\u9149\u91c6\u91cc\u9ea6\u752b\u518f\u5151\u39ae\u4f59\u6211\u675f\u80968\u76f4\u91d1\u9577\u9580\u961c\u96b9\u96e8\u2ed7\u9752\u975e\u98e0\u6589\u5774\u5485\u5947\u3452\ud842\udd9d\u8005\u6771\u4eac\u6797\u6614\u5782\u679c\u51769\u5c02\u7230\u9762\u9769\u97f3\u9801\u98a8\u98db\u98df\ud865\ude7f\u9996\u9999\u590d\u58f4\u54bc\u661c\u81e4\u4fde\u79ba\u91cd\u54c1\u755010\u517c\u5193\u97cb\u99ac\u9aa8\u9ad8\u9b3c\u54e1\u83ab11\u9b5a\u9e7f\u9ebb\u9ec4\u9ed2\u5547\u5546\u8cac12\u5c1e\u66fd13\u9f13\u342e\u55bf\u8f9f14\u9f3b15\u76e3"),
    (this.componentList = [].concat(
      $jscomp.arrayFromIterable(
        "\u4e00\u4e28\u4e36\u30ce\u4e59\u4e5a\u2e84\u4e85\ud840\udd0c\ud840\udcca\u310b\u31c7\u4e43\u4e8c\u4ea0\u4eba\u4ebb\ud840\udda2\ud840\udc89\u513f\u5165\u516b\u30cf\u4e37\u5182\u5196\u51ab\u2e80\u51e0\u51f5\u5200\u5202\u529b\u52f9\u5315\u531a\u5341\ud840\udc87\u535c\u5369\u353e\u5382\u2e81\u53b6\u53c8\u4e42\u3405\u2e88\u4e02\u4e05\u30de\u4e06\u4e5d\u4e03\u4e01\u5343\u30bf\u53e3\u56d7\u571f\u58eb\u5902\u5915\u5927\u5973\u5b50\u5b51\u5b80\u5bf8\u5c0f\u2e8c\u2e8d\u5c38\u5c6e\u5c71\u5ddd\u5de5\u5df1\u5dfe\u5e72\u5e7a\u5e7f\u5ef4\u5efe\u5f0b\u5f13\u5f50\u30e8\u2e95\u5f61\u5f73\u5fc4\u624c\u6c35\u4e2c\u72ad\u8279\u4491\u2ecc\u2ecf\u2ed6\u4e0c\u4ebc\u5140\u4e09\u4e0a\u4e38\u4ea1\u51e1\u4e8e\u52fa\u4e5f\u5346\u6729\u5fc3\u6208\u6238\u624b\u652f\u6535\u6587\u6597\u65a4\u65b9\u65e5\u6708\u2e9d\u6728\u6b20\u6b62\u6b79\u6bb3\u6bcb\u6bd4\u6bdb\u6c0f\u6c34\u706b\u706c\u722a\u722b\u2ea4\u7236\u7247\u725b\u725c\u72ac\u793b\u34c1\u8002\u2ebc\ud85d\ude07\u8fb6\ud842\uded3\u9fb6\u8080\u2ea7\u738b\u536c\u5f00\u30f0\u4e30\u5df4\u5316\u592d\u4e94\u4e2d\u4eca\u5185\u516c\u5c11\u516d\u5143\u592b\u53cd\u53cb\u533a\u4e91\u5302\u5c3a\u51f6\u52ff\u58ec\u5eff\u5929\u9fb7\u4e88\u5206\u4e95\u5fc5\u5de8\u6c37\u6bcd\u2ea2\u7259\u7384\u7389\u74e6\u7518\u751f\u7528\u7530\u758b\u7592\u7676\u767d\u76ae\u76bf\u76ee\u77db\u77e2\u77f3\u793a\u79b8\u79be\u7a74\u7acb\u7f52\u8864\u9fb8\ud845\uddd7\u7535\u4e3b\u4e4d\u5723\u53ef\u592e\u51fa\u518b\u6c10\u5e02\u4ed8\u53e4\u53f0\u672a\u7533\u53bb\u53f8\u5144\u4ee4\u53e5\u5305\u5360\u518a\u53ec\u4e14\u7531\u6b63\u5725\u382f\u65e6\u536f\u620a\u4e1a\u4ea6\u43cd\u7536\u7af9\u2eae\u7c73\u7cf8\u7f36\u7f8a\ud858\udf4c\u7fbd\u8001\u800c\u8033\u807f\u8089\u81ea\u81f3\u81fc\ud85a\udd51\u820c\u821f\u826e\u8272\u864d\u866b\u8840\u884c\u8863\u897f\ud84a\udd8f\u5173\u9fb9\u4ea5\u5c17\u5e76\u5216\ud840\udca4\u5408\u540c\u6709\u767e\u65e9\u4ea4\u5171\u518d\u5bfa\u6bce\u66f2\u5146\u65e8\u572d\u620c\u6b21\u518e\u5404\u7cfb\u81e3\u821b\u826f\u8980\u898b\u89d2\u8a00\u8c37\u8c46\u8c55\u8c9d\u8d64\u8d70\u8db3\u2eca\u8eab\u8eca\u8f9b\u8fb0\u9149\u91c6\u91cc\u9ea6\u752b\u518f\u5151\u39ae\u4f59\u6211\u675f\u8096\u76f4\u91d1\u9577\u9580\u961c\u96b9\u96e8\u2ed7\u9752\u975e\u98e0\u6589\u5774\u5485\u5947\u3452\ud842\udd9d\u8005\u6771\u4eac\u6797\u6614\u5782\u679c\u5176\u5c02\u81e5\u7230\u9762\u9769\u97f3\u9801\u98a8\u98db\u98df\ud865\ude7f\u9996\u9999\u590d\u58f4\u54bc\u661c\u81e4\u4fde\u79ba\u91cd\u54c1\u7550\u517c\u70cf\u5193\u97cb\u99ac\u9aa8\u9ad8\u9b3c\u54e1\u83ab\u9b5a\u9e7f\u9ebb\u9ec4\u9ed2\u5547\u5546\u8cac\u5c1e\u66fd\u9f13\u342e\u55bf\u8f9f\u9f3b\u76e3"
      )
    )),
    (this.listPanelVisible =
      this.typePanelVisible =
      this.drawPanelVisible =
        !0),
    $("#cb2hide").click(this.hide),
    (this.pixels = 64),
    (this.pixelwidth = 8),
    (this.canvas = $("#cb2-canvas")[0]),
    void 0 !== this.canvas &&
      ((this.canvas.width = this.pixelwidth * this.pixels + 1),
      (this.canvas.height = this.pixelwidth * this.pixels + 1),
      (this.ctx = this.canvas.getContext("2d")),
      (this.ctx.font = "18px Verdana"),
      (this.ctx.textBaseline = "top"),
      this.canvas.addEventListener(
        "mousedown",
        this.canvasMouseDown.bind(this)
      ),
      this.canvas.addEventListener(
        "mousemove",
        this.canvasMouseMove.bind(this)
      ),
      this.canvas.addEventListener("mouseup", this.canvasMouseUp.bind(this)),
      this.canvas.addEventListener(
        "touchstart",
        this.canvasTouchStart.bind(this)
      ),
      this.canvas.addEventListener(
        "touchmove",
        this.canvasTouchMove.bind(this)
      ),
      this.canvas.addEventListener("touchend", this.canvasTouchEnd.bind(this)),
      this.reset(),
      this.initializeComponents(),
      $("#cbhide").click(this.hide),
      $("#ctext").val(this.wmMessage).addClass("watermark"),
      $("#ctext")
        .keyup(this.textChanged.bind(this))
        .blur(this.addWatermark.bind(this))
        .focus(this.removeWatermark.bind(this)),
      $("#cb2reset").click(this.reset.bind(this)),
      $("#cb2-drawreset").click(this.resetDrawing.bind(this)),
      $("#cb2-typereset").click(this.resetText.bind(this)),
      $("#cb2help").click(this.showHelp),
      $("#cb2help-hide").click(this.hideHelp),
      $("#cb2-drawhelp-btn").click(this.showHelpDraw),
      $("#cb2-drawhelp-hide").click(this.hideHelpDraw),
      $("#cb2-drawsubmit").click(
        function () {
          this.submitDrawing(),
            $("#cb2-drawsubmit")
              .removeClass()
              .addClass("keymessage")
              .html("Thank you!");
        }.bind(this)
      ),
      $("#cb2-list-btn").click(this.showListEdit),
      $("#cb2-list-edit-hide").click(this.hideListEdit),
      $("#cb2-list-save").click(this.applyList.bind(this)),
      $("#clistmessage").html(this.listmessages[this.listid - 1]),
      $("#cb2-draw-hide").click(this.toggleDrawVisibility.bind(this)),
      $("#cb2-type-hide").click(this.toggleTypeVisibility.bind(this)),
      $("#cb2-list-hide").click(this.toggleListVisibility.bind(this)));
};
(ComponentBuilder2.prototype.addWatermark = function () {
  0 === $("#ctext").val().length &&
    $("#ctext").val(this.wmMessage).addClass("watermark");
}),
  (ComponentBuilder2.prototype.applyList = function () {
    (this.listid = $("input[name=list]:checked").val()),
      (this.allComponents = []),
      (this.possibleComponents = []),
      $("#divComponents").html(""),
      $("#clistmessage").html(this.listmessages[this.listid - 1]),
      this.initializeComponents(),
      this.hideListEdit();
  }),
  (ComponentBuilder2.prototype.back = function () {
    (this.kfrom = Math.max(this.kfrom - this.maxshow, 0)),
      (this.kto = this.kfrom + this.maxshow - 1),
      this.getKanjiForComponent();
  }),
  (ComponentBuilder2.prototype.calculateMaxshow = function (t) {
    var e =
      parseInt(this.getCss("width", "kfound")) +
      parseInt(this.getCss("padding-left", "kfound")) +
      parseInt(this.getCss("padding-right", "kfound")) +
      parseInt(this.getCss("border-left-width", "kfound")) +
      parseInt(this.getCss("border-right-width", "kfound")) +
      parseInt(this.getCss("margin-left", "kfound")) +
      parseInt(this.getCss("margin-right", "kfound"));
    return 2 * Math.floor((t - 30) / e);
  }),
  (ComponentBuilder2.prototype.canvasAddPoint = function (t, e) {
    if (0 == this.pointNo)
      (this.strokeSeq[this.strokeNo] = []),
        (this.strokeSeq[this.strokeNo][0] = { x: t, y: e }),
        this.pointNo++;
    else {
      var n = this.strokeSeq[this.strokeNo],
        i = this.pointNo,
        r = this.pointNo - 1;
      (t == n[r].x && e == n[r].y) || ((n[i] = { x: t, y: e }), this.pointNo++);
    }
  }),
  (ComponentBuilder2.prototype.canvasDisplayStrokeNo = function (t) {
    var e = this.strokeSeq[t];
    if (void 0 === e) return --this.strokeNo, !1;
    var n = 1,
      i = e[0].x,
      r = e[0].y;
    if (1 < e.length) {
      5 < e.length && (n = 5);
      var o = e[n].x - e[0].x;
      if (((e = e[n].y - e[0].y), 0 < (n = Math.sqrt(o * o + e * e))))
        var s = (o / n) * -50,
          a = (e / n) * -50;
    }
    return (
      (this.ctx.font = "30px Verdana"),
      this.ctx.fillText(t + 1, i + s, r + a),
      !0
    );
  }),
  (ComponentBuilder2.prototype.canvasDownsampleStroke = function () {
    this.strokeSeqDs[this.strokeNo] = [];
    for (
      var t = 0, e = "", n = 0;
      n < this.strokeSeq[this.strokeNo].length;
      n++
    ) {
      var i = this.strokeSeq[this.strokeNo][n],
        r = Math.round(i.x / 8);
      (i = Math.round(i.y / 8)),
        (0 != n &&
          r == this.strokeSeqDs[this.strokeNo][t - 1].x &&
          i == this.strokeSeqDs[this.strokeNo][t - 1].y) ||
          ((this.strokeSeqDs[this.strokeNo][t] = { x: r, y: i }),
          (e += this.getBase36(r) + this.getBase36(i)),
          (t += 1));
    }
    this.strokeSeqDsBase36[this.strokeNo] = e;
  }),
  (ComponentBuilder2.prototype.canvasFinishStroke = function () {
    this.canvasDisplayStrokeNo(this.strokeNo) &&
      (this.canvasDownsampleStroke(),
      (this.strokeNo += 1),
      this.setResetButtonVisibility(),
      this.canvasRecognize());
  }),
  (ComponentBuilder2.prototype.canvasGetMousePosition = function (t) {
    var e = this.canvas.getBoundingClientRect();
    return {
      x: ((t.clientX - e.left) * this.canvas.width) / e.width,
      y: ((t.clientY - e.top) * this.canvas.height) / e.height,
    };
  }),
  (ComponentBuilder2.prototype.canvasGetTouchPosition = function (t) {
    t = t.changedTouches[0];
    var e = this.canvas.getBoundingClientRect();
    return {
      x: ((t.clientX - e.left) * this.canvas.width) / e.width,
      y: ((t.clientY - e.top) * this.canvas.height) / e.height,
    };
  }),
  (ComponentBuilder2.prototype.canvasMouseDown = function (t) {
    (this.canvas.style.cursor = "default"),
      (this.pointNo = 0),
      (this.drawing = !0),
      (this.prev = this.canvasGetMousePosition(t));
  }),
  (ComponentBuilder2.prototype.canvasMouseUp = function () {
    (this.drawing = !1), this.canvasFinishStroke();
  }),
  (ComponentBuilder2.prototype.canvasMouseMove = function (t) {
    this.drawing &&
      ((t = this.canvasGetMousePosition(t)),
      this.canvasAddPoint(t.x, t.y),
      (this.ctx.lineWidth = 16),
      (this.ctx.lineCap = "round"),
      this.ctx.beginPath(),
      this.ctx.moveTo(this.prev.x, this.prev.y),
      this.ctx.lineTo(t.x, t.y),
      this.ctx.stroke(),
      this.ctx.closePath(),
      (this.prev = t));
  }),
  (ComponentBuilder2.prototype.canvasRecognize = function () {
    $("#cb2-draw-components").html(
      '<span class="watermark"><i class="fa fa-spinner fa-spin fa-fw"></i></span>'
    ),
      $("#cb2-drawhelp-btn").fadeIn(),
      (this.currentBitmap = KanjiDraw.generateBitmap(this.strokeSeqDsBase36));
    var t = $.ajax({
      url: this.recUrl,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        no: this.strokeNo,
        stroke: this.currentBitmap,
        token: this.recToken,
      }),
    });
    t.done(
      function (t) {
        if ((this.debug && console.log("CNN components received"), t.error))
          $("#cb2-draw-components").html("Error retrieving components.");
        else {
          var e = []
              .concat($jscomp.arrayFromIterable(t.results[1]))
              .sort(function (t, e) {
                return e - t;
              }),
            n = "";
          this.highlightedComponents = [];
          for (var i = 0; 10 > i; i++) {
            var r = t.results[1].indexOf(e[i]);
            (n +=
              "<div class='cb2-item possible' onclick='cb2.selcdraw(\"" +
              (r = this.componentList[r]) +
              "\")'>" +
              r +
              "</div>"),
              this.highlightedComponents.push(r);
          }
          $("#cb2-draw-components").html(n), this.updateComponents();
        }
      }.bind(this)
    ),
      t.fail(function () {
        $("#cb2-draw-components").html("Error retrieving components.");
      });
  }),
  (ComponentBuilder2.prototype.canvasTouchStart = function (t) {
    (this.pointNo = 0),
      (this.drawing = !0),
      (this.prev = this.canvasGetTouchPosition(t));
  }),
  (ComponentBuilder2.prototype.canvasTouchEnd = function () {
    (this.drawing = !1), this.canvasFinishStroke();
  }),
  (ComponentBuilder2.prototype.canvasTouchMove = function (t) {
    if (this.drawing) {
      var e = this.canvasGetTouchPosition(t);
      this.canvasAddPoint(e.x, e.y),
        (this.ctx.lineWidth = 16),
        (this.ctx.lineCap = "round"),
        this.ctx.beginPath(),
        this.ctx.moveTo(this.prev.x, this.prev.y),
        this.ctx.lineTo(e.x, e.y),
        this.ctx.stroke(),
        this.ctx.closePath(),
        (this.prev = e),
        t.preventDefault();
    }
  }),
  (ComponentBuilder2.prototype.detectIE11orEarlier = function () {
    var t = window.navigator.userAgent;
    return 0 < t.indexOf("MSIE ") || 0 < t.indexOf("Trident/");
  }),
  (ComponentBuilder2.prototype.drawBackground = function () {
    (this.ctx.fillStyle = "#FFFFFF"),
      this.ctx.fillRect(
        0,
        0,
        this.pixelwidth * this.pixels + 1,
        this.pixelwidth * this.pixels + 1
      ),
      (this.ctx.lineWidth = 1),
      this.ctx.strokeRect(
        0,
        0,
        this.pixelwidth * this.pixels + 1,
        this.pixelwidth * this.pixels + 1
      ),
      (this.ctx.lineWidth = 0.05);
    for (var t = 0; t < this.pixels - 1; t++)
      this.ctx.beginPath(),
        this.ctx.moveTo((t + 1) * this.pixelwidth, 0),
        this.ctx.lineTo(
          (t + 1) * this.pixelwidth,
          this.pixelwidth * this.pixels + 1
        ),
        this.ctx.closePath(),
        this.ctx.stroke(),
        this.ctx.beginPath(),
        this.ctx.moveTo(0, (t + 1) * this.pixelwidth),
        this.ctx.lineTo(
          this.pixelwidth * this.pixels + 1,
          (t + 1) * this.pixelwidth
        ),
        this.ctx.closePath(),
        this.ctx.stroke();
    this.ctx.fillStyle = "gray";
  }),
  (ComponentBuilder2.prototype.forward = function () {
    (this.kfrom = this.kto + 1),
      (this.kto = this.kto + this.maxshow - 1),
      this.getKanjiForComponent();
  }),
  (ComponentBuilder2.prototype.getBase36 = function (t) {
    if (isNaN(t) || 0 > t || 1296 <= t) throw "bad number: " + t;
    return 1 === (t = t.toString(36)).length && (t = "0" + t), t;
  }),
  (ComponentBuilder2.prototype.getCss = function (t, e) {
    (e = $("<div>").css("display", "none").addClass(e)), $("body").append(e);
    try {
      return e.css(t);
    } finally {
      e.remove();
    }
  }),
  (ComponentBuilder2.prototype.getKanjiForComponent = function () {
    if (0 === this.selectedComponents.length) this.reset();
    else {
      "" === this.kanjiDiv.html() &&
        this.kanjiDiv.html(
          "<i class='fa fa-spinner fa-spin fa-fw'></i> Retrieving kanji ..."
        );
      var t = $.ajax({
        url:
          "/cb/ccomp/" +
          this.selectedComponents.join("") +
          "/" +
          this.kfrom +
          "/" +
          (this.kto + 10),
        type: "post",
      });
      t.fail(function () {
        $("#components").html(
          "<div class='errormessage'>Error retrieving kanji. You may have been logged out. Please refresh the page and try again.</div>"
        );
      }),
        t.done(
          function (t) {
            this.debug && console.log("Kanji for components data received");
            var e = "";
            if (0 === t.count)
              this.kanjiDiv.html("No kanji found with selected components.");
            else {
              for (var n = 0, i = 0, r = 0; r < t.kanji.length; r++) {
                var o = t.kanji.charCodeAt(r),
                  s = t.kanji[r];
                if (
                  (55296 <= o &&
                    57343 >= o &&
                    ((s = this.getStringFromCodePoints(t.kanji, r)), (r += 1)),
                  isNaN(s)
                    ? ((e +=
                        "<a class='kfound' href=\"javascript:cb2.select('" +
                        s +
                        "')\">" +
                        s +
                        "</a>"),
                      (i += 1))
                    : ((o = s),
                      r < t.kanji.length - 1 &&
                        ((s = t.kanji[r + 1]),
                        isNaN(s) || ((r += 1), (o += s))),
                      (e += "<div class='kfound kstrokes'>" + o + "</div>"),
                      --this.kto),
                  (n += 1) >= this.maxshow || r == t.kanji.length - 1)
                ) {
                  e +=
                    "<a class='kfound kstrokes' href='/searchcg?q=" +
                    this.selectedComponents.join("") +
                    "&joyo=y'><i class='fa fa-search'></i></a>";
                  break;
                }
              }
              for (
                t.count > i
                  ? ((n = "<div class='nav'>"),
                    (n =
                      0 < this.kfrom
                        ? n + "<a href='javascript:cb2.back();'>\u25c4</a> "
                        : n + "\u25c4 "),
                    (n =
                      this.kto < t.count
                        ? n + "<a href='javascript:cb2.forward();'>\u25ba</a> "
                        : n + "\u25ba "),
                    (n +=
                      " <span class='title'>" +
                      t.count +
                      " kanji found, showing " +
                      (this.kfrom + 1) +
                      ".." +
                      (this.kfrom + i) +
                      ":</span> "),
                    (n += "</div>"))
                  : (n =
                      "<div class='nav title'>" +
                      t.count +
                      " kanji found:</div>"),
                  this.kanjiDiv.html(n + e),
                  this.possibleComponents = [],
                  e = 0;
                e < t.poss_comp.length;
                e++
              )
                (i = t.poss_comp.charCodeAt(e)),
                  (n = t.poss_comp[e]),
                  55296 <= i &&
                    57343 >= i &&
                    ((n = this.getStringFromCodePoints(t.poss_comp, e)),
                    (e += 1)),
                  this.possibleComponents.push(n);
              this.updateComponents();
            }
          }.bind(this)
        );
    }
  }),
  (ComponentBuilder2.prototype.getRecUrl = function () {
    var t = $.ajax({ url: "/cb/gru", type: "post" });
    t.fail(function () {
      $("#cb2-draw").html(
        "Kanji component recognition is not currently available. Please refresh the page in your browser to try again. If this problem continues, please contact Kanshudo support."
      );
    }),
      t.done(
        function (t) {
          0 === t.result
            ? ((this.recUrl = t.url), (this.recToken = t.token))
            : $("#cb2-draw").html(
                "Kanji component recognition is not currently available. Please refresh the page in your browser to try again. If this problem continues, please contact Kanshudo support."
              );
        }.bind(this)
      );
  }),
  (ComponentBuilder2.prototype.getStringFromCodePoints = function (t, e) {
    return this.detectIE11orEarlier()
      ? String.fromCharCode(t.charCodeAt(e), t.charCodeAt(e + 1))
      : String.fromCodePoint(t.charCodeAt(e), t.charCodeAt(e + 1));
  }),
  (ComponentBuilder2.prototype.hide = function () {
    $("#cb2").css({ display: "none" }),
      $("#cb2-cover").css({ display: "none" }),
      $(".footer").css("z-index", footerZ),
      $("body").css({ overflow: "visible" });
  }),
  (ComponentBuilder2.prototype.hideHelp = function () {
    $("#cb2-help").hide(), $("#cb2-main").show();
  }),
  (ComponentBuilder2.prototype.hideHelpDraw = function () {
    $("#cb2-drawhelp").hide(), $("#cb2-main").show();
  }),
  (ComponentBuilder2.prototype.hideListEdit = function () {
    $("#cb2-list-edit").hide(), $("#cb2-main").show();
  }),
  (ComponentBuilder2.prototype.initializeComponents = function () {
    this.debug && console.log("initializeComponents called"),
      3 == this.listid
        ? this.processComponentString(this.componentListWithCounts)
        : $.ajax({ url: "/cb/coll/" + this.listid, type: "post" }).done(
            function (t) {
              this.debug && console.log("CB2: processing new components list"),
                this.processComponentString(t.kanji),
                (this.componentError = null),
                this.textChanged();
            }.bind(this)
          );
  }),
  (ComponentBuilder2.prototype.launch = function (t, e) {
    if (
      (this.debug && console.log("CB2 launched"),
      this.sizeCB2(),
      this.setTarget(t),
      this.getRecUrl(),
      this.show(),
      e)
    )
      for (
        e = (t = $jscomp.makeIterator(e.split(""))).next();
        !e.done;
        e = t.next()
      )
        (e = e.value),
          -1 === this.selectedComponents.indexOf(e) && this.selc(e);
  }),
  (ComponentBuilder2.prototype.processComponentString = function (t) {
    this.debug && console.log("processComponentString called");
    for (var e = 0; e < t.length; e++) {
      var n = t.charCodeAt(e),
        i = t[e];
      55296 <= n &&
        57343 >= n &&
        ((i = this.getStringFromCodePoints(t, e)), (e += 1)),
        this.allComponents.push(i),
        this.possibleComponents.push(i),
        "\u2ecf" == i && (i = "\u2022" + i),
        "\u2ed6" == i && (i += "\u2022");
      var r = i;
      "\ud840\udc89" == i && (i = "<span class='ja-lying-man'></span>"),
        (n = ""),
        isNaN(i)
          ? (n +=
              '<div id="' +
              r +
              '" class="cb2-item possible" onclick="cb2.selc(\'' +
              r +
              "')\">" +
              i +
              "</div>")
          : (e < t.length - 1 &&
              ((r = t[e + 1]), isNaN(r) || ((e += 1), (i += r))),
            (n += "<div class='cb2-item strokes'>" + i + "</div>")),
        $("#divComponents").append(n);
    }
    this.updateComponents();
  }),
  (ComponentBuilder2.prototype.removeWatermark = function () {
    $("#ctext").val() == this.wmMessage &&
      $("#ctext").val("").removeClass("watermark");
  }),
  (ComponentBuilder2.prototype.reset = function () {
    this.debug && console.log("CB2: reset called"),
      this.resetText(),
      (this.possibleComponents = this.allComponents),
      (this.selectedComponents = []),
      (this.highlightedComponents = []),
      (this.componentError = null),
      (this.variants = []),
      this.kanjiDiv.html(
        '<div class="cb2-item-title">Search for kanji using components</div>'
      ),
      $("#componentslist").html(""),
      (this.kfrom = 0),
      (this.maxshow = this.calculateMaxshow($("#cb2").innerWidth())),
      (this.kto = this.maxshow - 1),
      this.resetDrawing(),
      this.setResetButtonVisibility();
  }),
  (ComponentBuilder2.prototype.resetDrawing = function () {
    this.debug && console.log("CB2: resetDrawing called"),
      this.drawBackground(),
      (this.strokeNo = 0),
      (this.strokeSeq = []),
      (this.strokeSeqDs = []),
      (this.strokeSeqDsBase36 = []),
      $("#cb2-draw-components").html(""),
      $("#cb2-drawhelp-btn").fadeOut(),
      this.setResetButtonVisibility(),
      (this.highlightedComponents = []),
      this.updateComponents();
  }),
  (ComponentBuilder2.prototype.resetText = function () {
    this.debug && console.log("CB2: resetText called"),
      $("#ctext").val(""),
      this.addWatermark(),
      $("#cb2-type-components")
        .addClass("cb2smallgrid")
        .removeClass("errormessage")
        .html(""),
      this.setResetButtonVisibility(),
      (this.highlightedComponents = []),
      this.updateComponents();
  }),
  (ComponentBuilder2.prototype.selc = function (t) {
    this.debug && console.log("selc called"),
      (this.componentError = ""),
      (t = t.replace("\u2022", ""));
    var e = this.selectedComponents.indexOf(t);
    -1 === e
      ? (this.selectedComponents.push(t),
        $.ajax({ url: "/cb/compdet/" + t, type: "post" }).done(
          function (e) {
            this.debug &&
              console.log("CB2: kanji for selected component data received");
            var n =
              "<div class='cb2-item cbselected' onclick=\"cb2.selc('" +
              t +
              "')\">" +
              t +
              "</div>";
            null != e.name && (n += " " + e.name);
            for (var i = !0, r = 0; r < e.variants.length; r++)
              i &&
                ((n +=
                  "&nbsp;&nbsp;&nbsp;<span class='title'>swap for variant:</span> "),
                (i = !1)),
                this.variants.push(e.variants[r]),
                (n +=
                  "<a class='messageitem variant' href=\"javascript:cb2.swap('" +
                  e.variants[r] +
                  "','" +
                  t +
                  "')\">" +
                  e.variants[r] +
                  "</a> ");
            null != e.message &&
              0 < e.message.length &&
              (n +=
                "&nbsp;&nbsp;&nbsp;<span class='title'>note:</span> " +
                e.message.replace(/#[^ ]*/gi, function (e) {
                  return (
                    "<a href=\"javascript:cb2.swap('" +
                    e.replace("#", "") +
                    "','" +
                    t +
                    "')\">" +
                    e.replace("#", "") +
                    "</a>"
                  );
                })),
              (n +=
                '<div class="cb2reset visible" onclick="cb2.selc(\'' +
                t +
                '\')"><i class="fa fa-times-circle" aria-hidden="true"></i></div>'),
              this.componentDetails.setItem(t, n),
              this.debug &&
                console.log("CB2: calling updateComponentsList from selc data"),
              this.resetDrawing(),
              this.resetText(),
              this.updateComponentsList(),
              this.getKanjiForComponent();
          }.bind(this)
        ))
      : (this.selectedComponents.splice(e, 1),
        this.debug && console.log("Calling updateComponentsList from selc"),
        this.updateComponentsList(),
        this.getKanjiForComponent()),
      (this.highlightedComponents = []),
      (this.kfrom = 0),
      (this.kto = this.maxshow - 1),
      this.resetDrawing(),
      $("#cb2").scrollTop(0);
  }),
  (ComponentBuilder2.prototype.selcdraw = function (t) {
    this.submitDrawing(t), this.selc(t);
  }),
  (ComponentBuilder2.prototype.select = function (t) {
    this.targetId
      ? insertTextInElement(t, this.targetId)
      : console.log("No target ID specified! Selection: " + t),
      this.reset(),
      this.hide();
  }),
  (ComponentBuilder2.prototype.setResetButtonVisibility = function () {
    var t = !1;
    0 == this.strokeNo
      ? $("#cb2-drawreset").css("opacity", 0)
      : ((t = !0), $("#cb2-drawreset").css("opacity", 1)),
      "" === $("#ctext").val() || $("#ctext").val() === this.wmMessage
        ? $("#cb2-typereset").css("opacity", 0)
        : ((t = !0), $("#cb2-typereset").css("opacity", 1)),
      0 < this.selectedComponents.length && (t = !0),
      t ? $("#cb2reset").css("opacity", 1) : $("#cb2reset").css("opacity", 0);
  }),
  (ComponentBuilder2.prototype.setTarget = function (t) {
    this.targetId = t;
  }),
  (ComponentBuilder2.prototype.showHelp = function () {
    $("#cb2-main").hide(), $("#cb2-help").show();
  }),
  (ComponentBuilder2.prototype.showHelpDraw = function () {
    $("#cb2-main").hide(), $("#cb2-drawhelp").show();
  }),
  (ComponentBuilder2.prototype.showListEdit = function () {
    $("#cb2-main").hide(), $("#cb2-list-edit").show();
  }),
  (ComponentBuilder2.prototype.sizeCB2 = function () {
    this.debug && console.log("sizeCB2 called");
    var t = 0.85 * $(window).width();
    if (
      $(window).width() < $(window).height() ||
      1 == this.listid ||
      $(window).width() < MqL
    ) {
      var e = 0,
        n = $(document).height() - e;
      (t = $(window).width()), (this.fullsize = !0);
    } else
      (this.fullsize = !1),
        (n = $("#cb2-components").height() + 10),
        $("#settingsdiv").is(":visible") && (n = $("#settingsdiv").height()),
        $("#helpdiv").is(":visible") && $("#helpcontents").height(n - 100);
    var i = ($(window).width() - t) / 2;
    500 < $(window).height() && 500 > n && (n = 0.75 * $(window).height()),
      (n = Math.min(n, $(window).height())),
      (e = Math.max(($(window).height() - n) / 2, e)),
      $("#cb2").css({ width: t, height: n, top: e, left: i }),
      this.debug &&
        console.log(
          "scrollTop: " +
            $(window).scrollTop() +
            ", top: " +
            e +
            ", width: " +
            t +
            ", height: " +
            n +
            ", left: " +
            i +
            ", fullsize: " +
            this.fullsize
        );
  }),
  (ComponentBuilder2.prototype.show = function () {
    this.debug && console.log("cb2:show called"),
      $("#cb2").css({ display: "block" }),
      (footerZ = $(".footer").css("z-index")),
      $(".footer").css("z-index", -1),
      this.fullsize || $("#cb2-cover").css({ opacity: "1" }).fadeIn(500),
      (this.maxshow = this.calculateMaxshow($("#cb2").innerWidth())),
      (this.kto = this.maxshow - 1),
      $("body").css({ overflow: "hidden" });
  }),
  (ComponentBuilder2.prototype.submitDrawing = function (t) {
    0 !== this.strokeSeqDsBase36.length &&
      ($.ajax({
        url: "/cb/store",
        type: "post",
        data: { strokes: this.strokeSeqDsBase36, kanji: t },
      }),
      (this.currentBitmap = null));
  }),
  (ComponentBuilder2.prototype.swap = function (t, e) {
    this.selc(e), this.selc(t);
  }),
  (ComponentBuilder2.prototype.textChanged = function () {
    this.debug && console.log("textChanged"),
      (this.componentError = null),
      this.debug &&
        console.log("Calling updateComponentsList from textChanged"),
      this.updateComponentsList();
    var t = $("#ctext").val().trim();
    "" == t ||
    t == this.wmMessage ||
    (12352 <= t.charCodeAt(0) && 12543 >= t.charCodeAt(0))
      ? ($("#cb2-type-components").html(""),
        (this.highlightedComponents = []),
        this.updateComponents())
      : (this.drawPanelVisible && this.toggleDrawVisibility(),
        $.ajax({ url: "/cb/ctext/" + $("#ctext").val(), type: "post" }).done(
          function (e) {
            this.debug && console.log("sizeCBuilder data returned"),
              (this.highlightedComponents = []);
            for (var n = !1, i = "", r = 0; r < e.kanji.length; r++) {
              var o = e.kanji.charCodeAt(r),
                s = e.kanji[r];
              55296 <= o &&
                57343 >= o &&
                ((s = this.getStringFromCodePoints(e.kanji, r)), (r += 1)),
                isNaN(s) &&
                  (this.possibleComponents.includes(s)
                    ? (this.highlightedComponents.push(s),
                      (n = !0),
                      (i +=
                        "<div class='cb2-item possible' onclick='cb2.selc(\"" +
                        s +
                        "\")'>" +
                        s +
                        "</div>"))
                    : this.allComponents.includes(s) &&
                      (i +=
                        "<div class='cb2-item notpossible'>" + s + "</div>"));
            }
            $("#cb2-type-components")
              .addClass("cb2smallgrid")
              .removeClass("errormessage")
              .html(i),
              n ||
                (e.is_kanji
                  ? (this.selc(t), this.resetText())
                  : $("#cb2-type-components")
                      .removeClass("cb2smallgrid")
                      .addClass("errormessage")
                      .html("No components found named '" + t + "'"),
                this.debug &&
                  console.log(
                    "Calling updateComponentsList from textChanged data"
                  ),
                this.updateComponentsList()),
              e.exact && $("#ctext").blur(),
              this.updateComponents(),
              this.setResetButtonVisibility();
          }.bind(this)
        ));
  }),
  (ComponentBuilder2.prototype.toggleDrawVisibility = function () {
    this.drawPanelVisible
      ? ($("#cb2-draw-hide").addClass("rotated"), $("#cb2-draw").hide())
      : ($("#cb2-draw-hide").removeClass("rotated"), $("#cb2-draw").show()),
      (this.drawPanelVisible = !this.drawPanelVisible);
  }),
  (ComponentBuilder2.prototype.toggleListVisibility = function () {
    this.listPanelVisible
      ? ($("#cb2-list-hide").addClass("rotated"), $("#cb2-components").hide())
      : ($("#cb2-list-hide").removeClass("rotated"),
        $("#cb2-components").show()),
      (this.listPanelVisible = !this.listPanelVisible);
  }),
  (ComponentBuilder2.prototype.toggleTypeVisibility = function () {
    this.typePanelVisible
      ? ($("#cb2-type-hide").addClass("rotated"), $("#cb2-type").hide())
      : ($("#cb2-type-hide").removeClass("rotated"), $("#cb2-type").show()),
      (this.typePanelVisible = !this.typePanelVisible);
  }),
  (ComponentBuilder2.prototype.updateComponents = function () {
    this.debug && console.log("updateComponents called"),
      $("#divComponents div").each(
        function (t, e) {
          void 0 !== $(e).attr("id") &&
            ((t = $(e).attr("id").replace("\u2022", "")),
            $(e).removeClass("possible"),
            $(e).removeClass("notpossible"),
            $(e).removeClass("highlighted"),
            $(e).removeClass("highlight_dull"),
            $(e).removeClass("cbselected"),
            $(e).removeClass("variant"),
            -1 != this.selectedComponents.indexOf(t)
              ? $(e).addClass("cbselected")
              : (-1 == this.possibleComponents.indexOf(t)
                  ? $(e).addClass("notpossible")
                  : $(e).addClass("possible"),
                -1 != this.variants.indexOf(t) && $(e).addClass("variant"),
                -1 != this.highlightedComponents.indexOf(t) &&
                  (-1 != this.possibleComponents.indexOf(t)
                    ? $(e).addClass("highlighted")
                    : $(e).addClass("highlight_dull"))));
        }.bind(this)
      );
  }),
  (ComponentBuilder2.prototype.updateComponentsList = function () {
    this.debug && console.log("updateComponentsList called");
    for (var t = "", e = 0; e < this.selectedComponents.length; e++)
      t +=
        "<div class='cb2-comprow'>" +
        this.componentDetails.getItem(this.selectedComponents[e]) +
        "</div>";
    this.componentError &&
      (t += "<div class='errormessage'>" + this.componentError + "</div>"),
      $("#componentslist").html(t),
      this.sizeCB2();
  });
var $jscomp = $jscomp || {};
($jscomp.scope = {}),
  ($jscomp.ASSUME_ES5 = !1),
  ($jscomp.ASSUME_NO_NATIVE_MAP = !1),
  ($jscomp.ASSUME_NO_NATIVE_SET = !1),
  ($jscomp.defineProperty =
    $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
      ? Object.defineProperty
      : function (t, e, n) {
          t != Array.prototype && t != Object.prototype && (t[e] = n.value);
        }),
  ($jscomp.getGlobal = function (t) {
    return "undefined" != typeof window && window === t
      ? t
      : "undefined" != typeof global && null != global
      ? global
      : t;
  }),
  ($jscomp.global = $jscomp.getGlobal(this)),
  ($jscomp.polyfill = function (t, e, n, i) {
    if (e) {
      for (n = $jscomp.global, t = t.split("."), i = 0; i < t.length - 1; i++) {
        var r = t[i];
        r in n || (n[r] = {}), (n = n[r]);
      }
      (e = e((i = n[(t = t[t.length - 1])]))) != i &&
        null != e &&
        $jscomp.defineProperty(n, t, {
          configurable: !0,
          writable: !0,
          value: e,
        });
    }
  }),
  $jscomp.polyfill(
    "Array.prototype.fill",
    function (t) {
      return (
        t ||
        function (t, e, n) {
          var i = this.length || 0;
          for (
            0 > e && (e = Math.max(0, i + e)),
              (null == n || n > i) && (n = i),
              0 > (n = Number(n)) && (n = Math.max(0, i + n)),
              e = Number(e || 0);
            e < n;
            e++
          )
            this[e] = t;
          return this;
        }
      );
    },
    "es6",
    "es3"
  );
var KanjiDraw = function (a, b, d, c, e, f, g, k) {
  (this.debug = k),
    (this.id = a),
    (this.kanji = b),
    (this.strokeCount = d),
    (this.pixels = 64),
    (this.pixelwidth = 8),
    (this.disableDrawing = this.snapCorrect = !1),
    (this.canvas = document.getElementById("drawCanvas_" + this.id)),
    (this.analyzeStrokes = c),
    (this.startTime = new Date().getTime()),
    (this.canvas.width = this.pixelwidth * this.pixels + 1),
    (this.canvas.height = this.pixelwidth * this.pixels + 1),
    (this.ctx = this.canvas.getContext("2d")),
    (this.ctx.font = "18px Verdana"),
    (this.ctx.textBaseline = "top"),
    this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this)),
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this)),
    this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this)),
    this.canvas.addEventListener("touchstart", this.onTouchStart.bind(this)),
    this.canvas.addEventListener("touchmove", this.onTouchMove.bind(this)),
    this.canvas.addEventListener("touchend", this.onTouchEnd.bind(this)),
    (this.animator = null),
    (this.animatorVisible = e),
    (this.hideAnimatorOnInitialize = f),
    document.body.addEventListener(
      "animatorloaded",
      function (a) {
        this.disabled
          ? this.debug &&
            console.log(
              "ignoring kanjidraw animatorloaded event for kd " + this.id
            )
          : (this.debug &&
              console.log(
                "kanjidraw handling animatorloaded event for kd " + this.id
              ),
            a.detail.id == this.id &&
              (this.debug &&
                console.log(
                  "animator loaded " + a.detail.id + " " + a.detail.status
                ),
              "error" === a.detail.status
                ? ((a = new CustomEvent("kd_animator_set", {
                    detail: { id: this.id, error: !0 },
                  })),
                  document.body.dispatchEvent(a))
                : ((a = eval("animator_" + this.id)), this.setAnimator(a))),
            this.reposition());
      }.bind(this)
    ),
    (this.currentStrokeTarget = null),
    (this.tolerance = 100),
    this.analyzeStrokes &&
      ((this.imageDs = document.getElementById("imageDs")),
      this.imageDs || (this.imageDs = document.createElement("canvas")),
      (this.strokeDs = document.getElementById("strokeDs")),
      this.strokeDs || (this.strokeDs = document.createElement("canvas")),
      (this.lastStroke = document.getElementById("lastStroke")),
      this.lastStroke || (this.lastStroke = document.createElement("canvas")),
      (this.lastStrokeDs = document.getElementById("lastStrokeDs")),
      this.lastStrokeDs ||
        (this.lastStrokeDs = document.createElement("canvas"))),
    (this.placeholder = g),
    (this.position = null),
    this.reposition(),
    $(window).resize(this.reposition.bind(this)),
    this.initialize();
};
(KanjiDraw.prototype.initialize = function () {
  (this.disableDrawing = !1),
    (this.strokeNo = 0),
    (this.strokeNoOffset = 30),
    (this.strokeSeq = []),
    (this.strokeCorrect = []),
    (this.targetPaths = []),
    this.readPaths(),
    (this.strokeSeqDs = []),
    (this.strokeSeqDsBase36 = []),
    (this.strokeBitmaps = []),
    (this.strokeBitmaps32 = []),
    (this.pointNo = 0),
    this.drawBackground(),
    this.sendStrokeDataChangedEvent(),
    this.hideAnimatorOnInitialize &&
      this.animatorVisible &&
      this.toggleAnimator();
  var t = new CustomEvent("kd_initialized", { detail: { id: this.id } });
  document.body.dispatchEvent(t);
}),
  (KanjiDraw.prototype.hide = function () {
    $("#kd_" + this.id).hide();
  }),
  (KanjiDraw.prototype.fadeIn = function () {
    $("#kd_" + this.id).fadeIn();
  }),
  (KanjiDraw.prototype.sendStrokeStartedEvent = function () {
    var t = new Event("strokestarted");
    document.body.dispatchEvent(t);
  }),
  (KanjiDraw.prototype.sendStrokeFinishedEvent = function () {
    var t = new CustomEvent("kd_strokefinished", {
      detail: {
        id: this.id,
        index: this.strokeNo,
        correct: this.strokeCorrect[this.strokeNo],
      },
    });
    document.body.dispatchEvent(t);
  }),
  (KanjiDraw.prototype.sendStrokeDataChangedEvent = function () {
    var t = new Event("strokedatachanged");
    document.body.dispatchEvent(t);
  }),
  (KanjiDraw.prototype.setAnimator = function (t) {
    this.debug && console.log("Set animator called for kd " + this.id),
      (this.animator = t),
      this.readPaths(),
      this.targetPaths.length !== this.strokeCount &&
        console.log(
          "Error! Animator contains " +
            this.targetPaths.length +
            " paths; stroke count is " +
            this.strokeCount
        ),
      this.animatorVisible &&
        ((this.animatorVisible = !1), this.toggleAnimator()),
      this.repositionAnimator(),
      (t = new CustomEvent("kd_animator_set", { detail: { id: this.id } })),
      document.body.dispatchEvent(t);
  }),
  (KanjiDraw.prototype.reposition = function () {
    var t = this.getPosition(this.canvas.id);
    this.debug &&
      console.log(
        "Reposition called kanjidraw id " +
          this.id +
          " new position: " +
          t.top +
          ", " +
          t.left
      );
    var e = this.getPosition(this.placeholder);
    this.debug && console.log("Placeholder position: " + e.top + ", " + e.left),
      t != e && this.setPosition(e);
  }),
  (KanjiDraw.prototype.getPosition = function (t) {
    if (null != (t = $("#" + t)).position())
      return {
        top: t.position().top,
        left: t.position().left + parseInt(t.css("marginLeft"), 10),
        width: t.width(),
        height: t.width(),
      };
  }),
  (KanjiDraw.prototype.setPosition = function (t) {
    (this.position = t),
      $(this.canvas).css({
        visibility: "visible",
        position: "absolute",
        top: t.top,
        left: t.left,
        width: t.width,
        height: t.height,
      }),
      this.repositionAnimator(),
      (t = new CustomEvent("kd_position_set", { detail: { id: this.id } })),
      document.body.dispatchEvent(t);
  }),
  (KanjiDraw.prototype.repositionAnimator = function () {
    if (this.animator) {
      this.animator.reposition(
        this.position.top,
        this.position.left,
        this.position.width,
        this.position.height
      );
      var t = new CustomEvent("kd_animator_repositioned", {
        detail: { id: this.id },
      });
      document.body.dispatchEvent(t);
    }
  }),
  (KanjiDraw.prototype.toggleAnimator = function () {
    if (this.animator) {
      this.animatorVisible
        ? ($(this.canvas).css({ opacity: 1 }), this.animator.hide())
        : ($(this.canvas).css({ position: "absolute", opacity: 0.75 }),
          this.animator.show()),
        (this.animatorVisible = !this.animatorVisible),
        this.redraw();
      var t = new CustomEvent("kd_animator_toggled", {
        detail: { id: this.id },
      });
      document.body.dispatchEvent(t);
    }
  }),
  (KanjiDraw.prototype.toggleSnapCorrect = function () {
    (this.snapCorrect = !this.snapCorrect), this.redraw();
  }),
  (KanjiDraw.prototype.readPaths = function () {
    if (((this.targetPaths = []), this.animator))
      for (var t = 0; t < this.strokeCount; t++) {
        var e = this.animator.getStroke(t);
        e && ((e = e.getAttribute("d")), this.targetPaths.push(e));
      }
  }),
  (KanjiDraw.prototype.getCurrentStrokeTarget = function () {
    if (this.animator) {
      this.currentStrokeTarget = this.convertPathToArray(
        this.targetPaths[this.strokeNo]
      );
      for (var t = 0; t < this.currentStrokeTarget.length; t++)
        (this.currentStrokeTarget[t].x =
          (this.currentStrokeTarget[t].x * this.canvas.width) / 110),
          (this.currentStrokeTarget[t].y =
            (this.currentStrokeTarget[t].y * this.canvas.height) / 110);
    }
  }),
  (KanjiDraw.prototype.getCurrentStrokeCount = function () {
    return this.strokeSeq.length;
  }),
  (KanjiDraw.prototype.getCorrectStrokeCount = function () {
    for (var t = 0, e = 0; e < this.strokeCorrect.length; e++)
      this.strokeCorrect[e] && (t += 1);
    return t;
  }),
  (KanjiDraw.prototype.finished = function () {
    return this.getCorrectStrokeCount() == this.strokeCount;
  }),
  (KanjiDraw.prototype.convertPathToArray = function (t) {
    var e = [];
    t = Snap.path.toCubic(t);
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.shift();
      for (var r = 0; r < i.length; r += 2) {
        var o = {};
        (o.x = i[r]), (o.y = i[r + 1]), e.push(o);
      }
    }
    return e;
  }),
  (KanjiDraw.prototype.submitStrokeData = function () {
    $.ajax({
      url: "/ml/submitstrokes",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify([
        this.kanji,
        this.strokeSeqDsBase36,
        this.snapCorrect,
      ]),
      success: function () {
        var t = new Event("sessionposted");
        document.body.dispatchEvent(t);
      },
    });
  }),
  (KanjiDraw.prototype.drawBackground = function () {
    (this.ctx.fillStyle = "#FFFFFF"),
      (this.ctx.strokeStyle = "black"),
      this.ctx.fillRect(
        0,
        0,
        this.pixelwidth * this.pixels + 1,
        this.pixelwidth * this.pixels + 1
      ),
      (this.ctx.lineWidth = 1),
      this.ctx.strokeRect(
        0,
        0,
        this.pixelwidth * this.pixels + 1,
        this.pixelwidth * this.pixels + 1
      ),
      (this.ctx.lineWidth = 1),
      (this.ctx.fillStyle = "#dfdfdf"),
      (this.ctx.strokeStyle = "#dfdfdf");
    for (var t = 0; t < this.pixels - 1; t++)
      this.ctx.beginPath(),
        this.ctx.moveTo((t + 1) * this.pixelwidth, 0),
        this.ctx.lineTo(
          (t + 1) * this.pixelwidth,
          this.pixelwidth * this.pixels + 1
        ),
        this.ctx.stroke(),
        this.ctx.closePath(),
        this.ctx.beginPath(),
        this.ctx.moveTo(0, (t + 1) * this.pixelwidth),
        this.ctx.lineTo(
          this.pixelwidth * this.pixels + 1,
          (t + 1) * this.pixelwidth
        ),
        this.ctx.stroke(),
        this.ctx.closePath();
    this.ctx.fillStyle = "gray";
  }),
  (KanjiDraw.prototype.animateLastStroke = function () {
    this.drawStroke(
      this.ctx,
      this.strokeSeq[this.strokeSeq.length - 1],
      16,
      "round",
      "red"
    );
  }),
  (KanjiDraw.prototype.showNextStroke = function () {
    this.snapCorrect &&
      ((this.strokeCorrect[this.strokeNo] = !0),
      this.getCurrentStrokeTarget(),
      this.strokeSeq.push(this.currentStrokeTarget),
      this.redraw(),
      (this.strokeNo += 1));
  }),
  (KanjiDraw.prototype.clearLastStroke = function () {
    this.debug &&
      console.log(
        "Clearing stroke: strokeNo " +
          this.strokeNo +
          " strokeSeq: " +
          this.strokeSeq.length +
          " strokeCorrect: " +
          this.strokeCorrect.length
      ),
      0 != this.strokeNo &&
        (--this.strokeNo,
        this.strokeSeq.pop(),
        this.strokeCorrect.pop(),
        this.strokeSeqDs.pop(),
        this.strokeSeqDsBase36.pop(),
        (this.pointNo = 0),
        this.redraw(),
        this.sendStrokeDataChangedEvent());
  }),
  (KanjiDraw.prototype.redraw = function () {
    if ((this.drawBackground(), this.snapCorrect)) {
      this.ctx.save(),
        (this.ctx.lineWidth = 3),
        (this.ctx.lineCap = "round"),
        (this.ctx.strokeStyle = "black"),
        this.ctx.transform(
          this.canvas.width / 110,
          0,
          0,
          this.canvas.height / 110,
          0,
          0
        );
      for (var t = 0; t < this.strokeSeq.length; t++)
        if (this.strokeCorrect[t]) {
          var e = new Path2D(this.targetPaths[t]);
          (this.ctx.strokeStyle = "black"), this.ctx.stroke(e);
        }
      this.ctx.restore();
    }
    for (t = 0; t < this.strokeSeq.length; t++)
      if (!(e = this.strokeCorrect[t]) || !this.snapCorrect) {
        var n = "black";
        e || (n = "red"),
          this.drawStroke(this.ctx, this.strokeSeq[t], 16, "round", n);
      }
    for (t = 0; t < this.strokeSeq.length; t++)
      (this.animatorVisible && this.strokeCorrect[t]) ||
        this.displayStrokeNo(t);
  }),
  (KanjiDraw.prototype.onMouseDown = function (t) {
    this.disableDrawing ||
      ((this.canvas.style.cursor = "default"),
      (this.pointNo = 0),
      (this.drawing = !0),
      (this.prev = this.getMousePosition(t)),
      this.debug && console.log("Stroke started: " + this.strokeNo),
      this.getCurrentStrokeTarget(),
      this.sendStrokeStartedEvent());
  }),
  (KanjiDraw.prototype.onMouseUp = function () {
    this.disableDrawing || ((this.drawing = !1), this.finishStroke());
  }),
  (KanjiDraw.prototype.onMouseMove = function (t) {
    !this.disableDrawing &&
      this.drawing &&
      ((t = this.getMousePosition(t)),
      this.addPoint(t.x, t.y),
      (this.ctx.strokeStyle = "black"),
      (this.ctx.lineWidth = 16),
      (this.ctx.lineCap = "round"),
      this.ctx.beginPath(),
      this.ctx.moveTo(this.prev.x, this.prev.y),
      this.ctx.lineTo(t.x, t.y),
      this.ctx.stroke(),
      this.ctx.closePath(),
      (this.prev = t));
  }),
  (KanjiDraw.prototype.onTouchStart = function (t) {
    this.disableDrawing ||
      ((this.pointNo = 0),
      (this.drawing = !0),
      (this.prev = this.getTouchPosition(t)),
      this.debug && console.log("Stroke started: " + this.strokeNo),
      this.getCurrentStrokeTarget(),
      this.sendStrokeStartedEvent());
  }),
  (KanjiDraw.prototype.onTouchEnd = function () {
    this.disableDrawing || ((this.drawing = !1), this.finishStroke());
  }),
  (KanjiDraw.prototype.onTouchMove = function (t) {
    if (!this.disableDrawing && this.drawing) {
      var e = this.getTouchPosition(t);
      this.addPoint(e.x, e.y),
        (this.ctx.strokeStyle = "black"),
        (this.ctx.lineWidth = 16),
        (this.ctx.lineCap = "round"),
        this.ctx.beginPath(),
        this.ctx.moveTo(this.prev.x, this.prev.y),
        this.ctx.lineTo(e.x, e.y),
        this.ctx.stroke(),
        this.ctx.closePath(),
        (this.prev = e),
        t.preventDefault();
    }
  }),
  (KanjiDraw.prototype.getMousePosition = function (t) {
    var e = this.canvas.getBoundingClientRect();
    return {
      x: ((t.clientX - e.left) * this.canvas.width) / e.width,
      y: ((t.clientY - e.top) * this.canvas.height) / e.height,
    };
  }),
  (KanjiDraw.prototype.getTouchPosition = function (t) {
    t = t.changedTouches[0];
    var e = this.canvas.getBoundingClientRect();
    return {
      x: ((t.clientX - e.left) * this.canvas.width) / e.width,
      y: ((t.clientY - e.top) * this.canvas.height) / e.height,
    };
  }),
  (KanjiDraw.prototype.addPoint = function (t, e) {
    if (0 == this.pointNo) {
      this.strokeSeq[this.strokeNo] = [];
      var n = this.strokeSeq[this.strokeNo];
      (n[0] = { x: t, y: e }), this.pointNo++;
    } else {
      n = this.strokeSeq[this.strokeNo];
      var i = this.pointNo,
        r = this.pointNo - 1;
      (t == n[r].x && e == n[r].y) || ((n[i] = { x: t, y: e }), this.pointNo++);
    }
  }),
  (KanjiDraw.prototype.validateStroke = function () {
    if (!this.animator) return !0;
    var t = this.compareActualToTarget(
      this.strokeSeq[this.strokeNo],
      this.currentStrokeTarget
    );
    return (
      this.debug &&
        console.log("KD stroke OK: " + t + " stroke no: " + this.strokeNo),
      t || this.animateLastStroke(),
      t
    );
  }),
  (KanjiDraw.prototype.compareActualToTarget = function (t, e) {
    this.debug && console.log("Validating stroke:");
    var n = this.calculateLength(e),
      i = 100 > n,
      r = 500 < n;
    if (
      (this.debug &&
        console.log(
          "Target length: " +
            n.toFixed(1) +
            ", short stroke: " +
            (i ? "yes" : "no") +
            ", long stroke: " +
            (r ? "yes" : "no")
        ),
      (i = this.calculateDistance(e[0], t[0])),
      this.debug &&
        console.log(
          "First point distance: " +
            i.toFixed(1) +
            ", tolerance: " +
            this.tolerance
        ),
      i > this.tolerance)
    )
      return this.debug && console.log("FAIL"), !1;
    i = this.calculateDistance(e[e.length - 1], t[t.length - 1]);
    var o = this.tolerance;
    return (
      r && (o *= 2.5),
      this.debug &&
        console.log(
          "Last point distance: " + i.toFixed(1) + ", tolerance: " + o
        ),
      i > o
        ? (this.debug && console.log("FAIL"), !1)
        : ((o = ((i = this.calculateLength(t)) / n) * 100),
          this.debug &&
            console.log(
              "Target length: " +
                n.toFixed(1) +
                ", actual: " +
                i.toFixed(1) +
                ", ratio: " +
                o.toFixed(1) +
                "%"
            ),
          50 > o || 150 < o
            ? (this.debug && console.log("FAIL"), !1)
            : ((i = this.tolerance),
              r && (i *= 2.5),
              (r = this.calculateDistance(e[0], e[e.length - 1])),
              (o = this.calculateDistance(t[0], t[t.length - 1])),
              this.debug &&
                console.log(
                  "Target first to last dist: " +
                    r.toFixed(1) +
                    ", actual: " +
                    o.toFixed(1) +
                    ", tolerance: " +
                    i
                ),
              Math.abs(r - o) > i
                ? (this.debug && console.log("FAIL"), !1)
                : ((r /= n),
                  (e = Snap.angle(
                    e[0].x,
                    e[0].y,
                    e[e.length - 1].x,
                    e[e.length - 1].y
                  )),
                  (t = Snap.angle(
                    t[0].x,
                    t[0].y,
                    t[t.length - 1].x,
                    t[t.length - 1].y
                  )),
                  (i = Math.abs(e - t) / 360),
                  (o = 0.05),
                  0.2 > r ? (o = 1) : 0.8 > r && (o = 0.2),
                  100 > n && (o = Math.max(0.5, o)),
                  this.debug &&
                    console.log(
                      "Target angle: " +
                        e.toFixed(1) +
                        ", actual: " +
                        t.toFixed(1) +
                        ", diff: " +
                        (100 * i).toFixed() +
                        "%, tolerance: " +
                        100 * o +
                        "%"
                    ),
                  i > o
                    ? (this.debug && console.log("Target angle FAIL"), !1)
                    : (this.debug && console.log("Target angle OK"), !0))))
    );
  }),
  (KanjiDraw.prototype.calculateDistance = function (t, e) {
    return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
  }),
  (KanjiDraw.prototype.calculateLength = function (t) {
    for (var e = 0, n = 1; n < t.length; n++) {
      e += this.calculateDistance(t[n - 1], t[n]);
    }
    return e;
  }),
  (KanjiDraw.prototype.finishStroke = function () {
    if (
      (this.debug && console.log("Stroke finished: " + this.strokeNo),
      this.displayStrokeNo(this.strokeNo))
    ) {
      var t = this.validateStroke();
      (this.strokeCorrect[this.strokeNo] = t) &&
        this.snapCorrect &&
        this.redraw(),
        this.analyzeStrokes
          ? (this.downsampleStroke(),
            this.drawImage(),
            this.drawAllStrokesDs(),
            this.drawLastStroke(),
            this.downsampleLastStroke(),
            this.convertStrokeToBase36())
          : (this.sendStrokeFinishedEvent(), (this.strokeNo += 1));
    } else
      this.debug &&
        console.log(
          "Invalid stroke! kd stroke no: " +
            this.strokeNo +
            " strokeSeq: " +
            this.strokeSeq.length +
            " strokeCorrect: " +
            this.strokeCorrect.length
        );
  }),
  (KanjiDraw.prototype.displayStrokeNo = function (t) {
    var e = this.strokeSeq[t];
    if (void 0 === e) return (this.strokeNo = this.strokeSeq.length), !1;
    var n = 1,
      i = e[0].x,
      r = e[0].y;
    if (1 < e.length) {
      5 < e.length && (n = 5);
      var o = e[n].x - e[0].x;
      if (((e = e[n].y - e[0].y), 0 < (n = Math.sqrt(o * o + e * e))))
        var s = (o / n) * -50,
          a = (e / n) * -50;
    }
    return (
      (this.ctx.font = "30px Verdana"),
      this.ctx.fillText(t + 1, i + s, r + a),
      !0
    );
  }),
  (KanjiDraw.prototype.downsampleStroke = function () {
    if (this.analyzeStrokes) {
      this.strokeSeqDs[this.strokeNo] = [];
      for (
        var t = 0, e = "", n = 0;
        n < this.strokeSeq[this.strokeNo].length;
        n++
      ) {
        var i = this.strokeSeq[this.strokeNo][n],
          r = Math.round(i.x / 8);
        (i = Math.round(i.y / 8)),
          (0 != n &&
            r == this.strokeSeqDs[this.strokeNo][t - 1].x &&
            i == this.strokeSeqDs[this.strokeNo][t - 1].y) ||
            ((this.strokeSeqDs[this.strokeNo][t] = { x: r, y: i }),
            (e += this.getBase36(r) + this.getBase36(i)),
            (t += 1));
      }
      this.strokeSeqDsBase36[this.strokeNo] = e;
    }
  }),
  (KanjiDraw.prototype.drawImage = function () {
    var t = this;
    if (this.analyzeStrokes) {
      var e = this.imageDs.getContext("2d"),
        n = new Image();
      (n.onload = function () {
        var i = document.createElement("canvas").getContext("2d");
        i.drawImage(n, 0, 0, n.width, n.height, 0, 0, t.pixels, t.pixels),
          (i = i.getImageData(0, 0, t.pixels, t.pixels).data);
        for (var r = 0; r < t.pixels; r++)
          for (var o = 0; o < t.pixels; o++) {
            var s = 4 * (r * t.pixels + o);
            (e.fillStyle =
              "rgb(" + [i[s + 0], i[s + 1], i[s + 2]].join() + ")"),
              e.fillRect(o, r, 1, 1);
          }
      }),
        (n.src = this.canvas.toDataURL());
    }
  }),
  (KanjiDraw.prototype.drawStroke = function (t, e, n, i, r) {
    for (
      t.lineWidth = n || 2,
        t.lineCap = i || "square",
        t.strokeStyle = r || "black",
        t.fillStyle = "gray",
        r = 1;
      r < e.length;
      r++
    )
      (n = e[r]),
        (i = e[r - 1]),
        t.beginPath(),
        t.moveTo(i.x, i.y),
        t.lineTo(n.x, n.y),
        t.stroke(),
        t.closePath();
  }),
  (KanjiDraw.prototype.drawAllStrokesDs = function () {
    if (this.analyzeStrokes) {
      var t = this.strokeDs.getContext("2d"),
        e = this.strokeSeqDs[this.strokeNo];
      void 0 === e
        ? t.clearRect(0, 0, this.strokeDs.width, this.strokeDs.height)
        : this.drawStroke(t, e);
    }
  }),
  (KanjiDraw.prototype.centerStroke = function (t) {
    for (
      var e = t.canvas.width,
        n = t.getImageData(0, 0, e, e).data,
        i = e,
        r = 0,
        o = e,
        s = 0,
        a = [],
        l = 0;
      l < e;
      l++
    ) {
      a[l] = [];
      for (var c = 0; c < e; c++) {
        var u = n[4 * (l * e + c) + 3];
        (a[l][c] = u),
          0 < u &&
            (l < i && (i = l),
            l > r && (r = l),
            c < o && (o = c),
            c > s && (s = c));
      }
    }
    for (
      n = (0 - i + e - r) / 2,
        o = (0 - o + e - s) / 2,
        t.clearRect(0, 0, e, e),
        s = [],
        l = 0;
      l < e;
      l++
    )
      for (c = 0; c < e; c++)
        255 > (i = 255 - a[l][c]) &&
          ((t.fillStyle = "rgb(" + [i, i, i].join() + ")"),
          t.fillRect(c + o, l + n, 1, 1)),
          s.push(255 - i);
    this.strokeBitmaps[this.strokeNo] = s;
  }),
  (KanjiDraw.prototype.downsampleLastStroke = function () {
    var t = this,
      e = this.lastStrokeDs.getContext("2d");
    e.clearRect(0, 0, 32, 32);
    var n = [],
      i = new Image();
    (i.onload = function () {
      var r = document.createElement("canvas").getContext("2d");
      r.drawImage(i, 0, 0, i.width, i.height, 0, 0, 32, 32),
        (r = r.getImageData(0, 0, 32, 32).data);
      for (var o = 0; 32 > o; o++)
        for (var s = 0; 32 > s; s++) {
          var a = 255 - r[4 * (32 * o + s) + 3];
          (e.fillStyle = "rgb(" + [a, a, a].join() + ")"),
            e.fillRect(s, o, 1, 1),
            n.push(a);
        }
      (t.strokeBitmaps32[t.strokeNo] = n),
        t.recognizeStrokes && t.recognize(t.strokeNo),
        t.sendStrokeFinishedEvent(),
        (t.strokeNo += 1);
    }),
      (i.src = this.lastStroke.toDataURL());
  }),
  (KanjiDraw.prototype.drawLastStroke = function () {
    if (this.analyzeStrokes) {
      var t = this.lastStroke.getContext("2d");
      t.clearRect(0, 0, this.strokeDs.width, this.strokeDs.height);
      var e = this.strokeSeqDs[this.strokeNo];
      void 0 !== e && (this.drawStroke(t, e), this.centerStroke(t));
    }
  }),
  (KanjiDraw.prototype.getBase36 = function (t) {
    if (isNaN(t) || 0 > t || 1296 <= t) throw "bad number: " + t;
    return 1 === (t = t.toString(36)).length && (t = "0" + t), t;
  }),
  (KanjiDraw.prototype.convertStrokeToBase36 = function () {
    for (var t = 0; t < this.strokeSeqDs.length; t++) {
      for (var e = "", n = 0; n < this.strokeSeqDs[t].length; n++)
        e +=
          this.getBase36(this.strokeSeqDs[t][n].x) +
          this.getBase36(this.strokeSeqDs[t][n].y);
      this.strokeSeqDsBase36[t] = e;
    }
    this.sendStrokeDataChangedEvent();
  }),
  (KanjiDraw.prototype.addStrokeFromBase36 = function (t) {
    (t = KanjiDraw.fromBase36(t, this.pixelwidth)),
      KanjiDraw.drawStrokeOnContext(this.ctx, t),
      (this.strokeSeq[this.strokeNo] = t),
      this.displayStrokeNo(this.strokeNo),
      this.downsampleStroke(),
      this.drawAllStrokesDs(),
      this.drawLastStroke(),
      this.downsampleLastStroke();
  }),
  (KanjiDraw.prototype.displayStrokes = function (t) {
    t = JSON.parse(t);
    for (var e = 0; e < t.length; e++)
      if (!(this.strokeNo > e)) {
        this.addStrokeFromBase36(t[e]);
        break;
      }
  }),
  (KanjiDraw.fromBase36 = function (t, e) {
    for (var n = [], i = 0; i < t.length; i += 4) {
      var r = parseInt(t[i] + t[i + 1], 36),
        o = parseInt(t[i + 2] + t[i + 3], 36);
      null != e && ((r *= e), (o *= e)), n.push({ x: r, y: o });
    }
    return n;
  }),
  (KanjiDraw.drawPixelOnContext = function (t, e, n) {
    (t.lineWidth = 2),
      (t.lineCap = "square"),
      (t.fillStyle = "black"),
      t.beginPath(),
      t.rect(e, n, 1, 1),
      t.fill();
  }),
  (KanjiDraw.drawStrokeOnContext = function (t, e) {
    (t.lineWidth = 2), (t.lineCap = "square"), (t.strokeStyle = "black");
    for (var n, i, r = 1; r < e.length; r++)
      (n = e[r]),
        (i = e[r - 1]),
        t.beginPath(),
        t.moveTo(i.x, i.y),
        t.lineTo(n.x, n.y),
        t.stroke(),
        t.closePath();
  }),
  (KanjiDraw.drawStroke = function (t, e) {
    (e = KanjiDraw.fromBase36(e)),
      KanjiDraw.drawStrokeOnContext(t.getContext("2d"), e);
  }),
  (KanjiDraw.scalePointArray = function (t, e) {
    for (var n = [], i = 0; i < t.length; i++) {
      for (var r = [], o = 0; o < t[i].length; o++)
        r.push({ x: t[i][o].x * e, y: t[i][o].y * e });
      n.push(r);
    }
    return n;
  }),
  (KanjiDraw.normalizePointArray = function (t) {
    for (
      var e = t.flat(), n = 32, i = 0, r = 32, o = 0, s = 0;
      s < e.length;
      s++
    )
      e[s].x < n && (n = e[s].x),
        e[s].x > i && (i = e[s].x),
        e[s].y < r && (r = e[s].y),
        e[s].y > o && (o = e[s].y);
    for (
      n = 16 - ((n + i) / 2) * (e = Math.min(2, 27 / Math.max(i - n))),
        r = 16 - ((r + o) / 2) * (s = Math.min(2, 27 / Math.max(o - r))),
        o = [],
        i = 0;
      i < t.length;
      i++
    ) {
      for (var a = [], l = 0; l < t[i].length; l++)
        a.push({ x: t[i][l].x * e + n, y: t[i][l].y * s + r });
      o.push(a);
    }
    return o;
  }),
  (KanjiDraw.generateCanvas = function (t, e) {
    var n = document.createElement("canvas");
    return (n.width = e), (n.height = e), (n.id = t), (n.style.zIndex = 8), n;
  }),
  (KanjiDraw.renderBitmap = function (t, e, n, i) {
    (t = t.getImageData(0, 0, n, n).data),
      ((e = KanjiDraw.generateCanvas("bitmap" + e.length, n)).style.border =
        "solid 1px #e6e6e6");
    for (var r = e.getContext("2d"), o = [], s = 0; s < n; s++)
      for (var a = 0; a < n; a++) {
        var l = 4 * (s * n + a);
        0 < t[l] || 0 < t[l + 1] || 0 < t[l + 2] || 0 < t[l + 3]
          ? (o.push(1), KanjiDraw.drawPixelOnContext(r, a, s))
          : o.push(0);
      }
    return i && document.getElementById(i).appendChild(e), o;
  }),
  (KanjiDraw.generateBitmap = function (t, e) {
    var n = KanjiDraw.generateCanvas("canvas" + t.length, 32);
    (n.style.border = "solid 1px black"), (n = n.getContext("2d"));
    for (var i = [], r = 0; r < t.length; r++)
      i.push(KanjiDraw.fromBase36(t[r]));
    if (e) {
      ((r = KanjiDraw.generateCanvas("canvas" + t.length, 64)).style.border =
        "solid 1px black"),
        (r = r.getContext("2d"));
      for (var o = 0; o < i.length; o++) KanjiDraw.drawStrokeOnContext(r, i[o]);
      KanjiDraw.renderBitmap(r, t, 64, e);
    }
    for (
      i = KanjiDraw.scalePointArray(i, 0.5),
        i = KanjiDraw.normalizePointArray(i),
        r = 0;
      r < i.length;
      r++
    )
      KanjiDraw.drawStrokeOnContext(n, i[r]);
    return KanjiDraw.renderBitmap(n, t, 32, e);
  }),
  (function (t) {
    function e() {
      (this._settings = []),
        (this._extensions = []),
        (this.regional = []),
        (this.regional[""] = { errorLoadingText: "Error loading" }),
        (this.local = this.regional[""]),
        (this._uuid = new Date().getTime()),
        (this._ie = !!window.ActiveXObject);
    }
    function n(e, n) {
      (this._svg = e), (this._container = n);
      for (var i = 0; i < t.svg._extensions.length; i++) {
        var r = t.svg._extensions[i];
        this[r[0]] = new r[1](this);
      }
    }
    function i() {
      this._path = "";
    }
    function r() {
      this._parts = [];
    }
    t.extend(e.prototype, {
      markerClassName: "hasSVG",
      propertyName: "svgwrapper",
      svgNS: "http://www.w3.org/2000/svg",
      xlinkNS: "http://www.w3.org/1999/xlink",
      _wrapperClass: n,
      _attrNames: {
        class_: "class",
        in_: "in",
        alignmentBaseline: "alignment-baseline",
        baselineShift: "baseline-shift",
        clipPath: "clip-path",
        clipRule: "clip-rule",
        colorInterpolation: "color-interpolation",
        colorInterpolationFilters: "color-interpolation-filters",
        colorRendering: "color-rendering",
        dominantBaseline: "dominant-baseline",
        enableBackground: "enable-background",
        fillOpacity: "fill-opacity",
        fillRule: "fill-rule",
        floodColor: "flood-color",
        floodOpacity: "flood-opacity",
        fontFamily: "font-family",
        fontSize: "font-size",
        fontSizeAdjust: "font-size-adjust",
        fontStretch: "font-stretch",
        fontStyle: "font-style",
        fontVariant: "font-variant",
        fontWeight: "font-weight",
        glyphOrientationHorizontal: "glyph-orientation-horizontal",
        glyphOrientationVertical: "glyph-orientation-vertical",
        horizAdvX: "horiz-adv-x",
        horizOriginX: "horiz-origin-x",
        imageRendering: "image-rendering",
        letterSpacing: "letter-spacing",
        lightingColor: "lighting-color",
        markerEnd: "marker-end",
        markerMid: "marker-mid",
        markerStart: "marker-start",
        stopColor: "stop-color",
        stopOpacity: "stop-opacity",
        strikethroughPosition: "strikethrough-position",
        strikethroughThickness: "strikethrough-thickness",
        strokeDashArray: "stroke-dasharray",
        strokeDashOffset: "stroke-dashoffset",
        strokeLineCap: "stroke-linecap",
        strokeLineJoin: "stroke-linejoin",
        strokeMiterLimit: "stroke-miterlimit",
        strokeOpacity: "stroke-opacity",
        strokeWidth: "stroke-width",
        textAnchor: "text-anchor",
        textDecoration: "text-decoration",
        textRendering: "text-rendering",
        underlinePosition: "underline-position",
        underlineThickness: "underline-thickness",
        vertAdvY: "vert-adv-y",
        vertOriginY: "vert-origin-y",
        wordSpacing: "word-spacing",
        writingMode: "writing-mode",
      },
      _attachSVG: function (e, n) {
        var i = e.namespaceURI === this.svgNS ? e : null;
        if (!t((e = i ? null : e) || i).hasClass(this.markerClassName)) {
          "string" == typeof n
            ? (n = { loadURL: n })
            : "function" == typeof n && (n = { onLoad: n }),
            t(e || i).addClass(this.markerClassName);
          try {
            i ||
              ((i = document.createElementNS(this.svgNS, "svg")).setAttribute(
                "version",
                "1.1"
              ),
              e.clientWidth > 0 && i.setAttribute("width", e.clientWidth),
              e.clientHeight > 0 && i.setAttribute("height", e.clientHeight),
              e.appendChild(i)),
              this._afterLoad(e, i, n || {});
          } catch (r) {
            t(e).html("<p>SVG is not supported natively on this browser</p>");
          }
        }
      },
      _afterLoad: function (e, n, i) {
        i = i || this._settings[e.id];
        this._settings[e ? e.id : ""] = null;
        var r = new this._wrapperClass(n, e);
        t.data(e || n, t.svg.propertyName, r);
        try {
          i.loadURL && r.load(i.loadURL, i),
            i.settings && r.configure(i.settings),
            i.onLoad && !i.loadURL && i.onLoad.apply(e || n, [r]);
        } catch (o) {
          alert(o);
        }
      },
      _getSVG: function (e) {
        return t(e).data(this.propertyName);
      },
      _destroySVG: function (e) {
        (e = t(e)).hasClass(this.markerClassName) &&
          (e.removeClass(this.markerClassName).removeData(this.propertyName),
          e[0].namespaceURI !== this.svgNS && e.empty());
      },
      addExtension: function (t, e) {
        this._extensions.push([t, e]);
      },
      isSVGElem: function (e) {
        return 1 === e.nodeType && e.namespaceURI === t.svg.svgNS;
      },
    }),
      t.extend(n.prototype, {
        width: function () {
          return this._container
            ? this._container.clientWidth
            : this._svg.width;
        },
        height: function () {
          return this._container
            ? this._container.clientHeight
            : this._svg.height;
        },
        root: function () {
          return this._svg;
        },
        configure: function (e, n, i) {
          if ((e.nodeName || ((i = n), (n = e), (e = this._svg)), i))
            for (var r = e.attributes.length - 1; r >= 0; r--) {
              var o = e.attributes.item(r);
              "onload" !== o.nodeName &&
                "version" !== o.nodeName &&
                "xmlns" !== o.nodeName.substring(0, 5) &&
                e.attributes.removeNamedItem(o.nodeName);
            }
          for (var s in n) e.setAttribute(t.svg._attrNames[s] || s, n[s]);
          return this;
        },
        getElementById: function (t) {
          return this._svg.ownerDocument.getElementById(t);
        },
        change: function (e, n) {
          if (e)
            for (var i in n)
              null == n[i]
                ? e.removeAttribute(t.svg._attrNames[i] || i)
                : e.setAttribute(t.svg._attrNames[i] || i, n[i]);
          return this;
        },
        _args: function (e, n, i) {
          n.splice(0, 0, "parent"), n.splice(n.length, 0, "settings");
          var r = {},
            o = 0;
          null != e[0] && e[0].jquery && (e[0] = e[0][0]),
            null == e[0] ||
              ("object" == typeof e[0] && e[0].nodeName) ||
              ((r.parent = null), (o = 1));
          for (var s = 0; s < e.length; s++) r[n[s + o]] = e[s];
          return (
            i &&
              t.each(i, function (t, e) {
                "object" == typeof r[e] && ((r.settings = r[e]), (r[e] = null));
              }),
            r
          );
        },
        title: function () {
          var t = this._args(arguments, ["text"]),
            e = this._makeNode(t.parent, "title", t.settings || {});
          return (
            e.appendChild(this._svg.ownerDocument.createTextNode(t.text)), e
          );
        },
        describe: function () {
          var t = this._args(arguments, ["text"]),
            e = this._makeNode(t.parent, "desc", t.settings || {});
          return (
            e.appendChild(this._svg.ownerDocument.createTextNode(t.text)), e
          );
        },
        defs: function () {
          var e = this._args(arguments, ["id"], ["id"]);
          return this._makeNode(
            e.parent,
            "defs",
            t.extend(e.id ? { id: e.id } : {}, e.settings || {})
          );
        },
        symbol: function () {
          var e = this._args(arguments, ["id", "x1", "y1", "width", "height"]);
          return this._makeNode(
            e.parent,
            "symbol",
            t.extend(
              {
                id: e.id,
                viewBox: e.x1 + " " + e.y1 + " " + e.width + " " + e.height,
              },
              e.settings || {}
            )
          );
        },
        marker: function () {
          var e = this._args(
            arguments,
            ["id", "refX", "refY", "mWidth", "mHeight", "orient"],
            ["orient"]
          );
          return this._makeNode(
            e.parent,
            "marker",
            t.extend(
              {
                id: e.id,
                refX: e.refX,
                refY: e.refY,
                markerWidth: e.mWidth,
                markerHeight: e.mHeight,
                orient: e.orient || "auto",
              },
              e.settings || {}
            )
          );
        },
        style: function () {
          var e = this._args(arguments, ["styles"]),
            n = this._makeNode(
              e.parent,
              "style",
              t.extend({ type: "text/css" }, e.settings || {})
            );
          return (
            n.appendChild(this._svg.ownerDocument.createTextNode(e.styles)), n
          );
        },
        script: function () {
          var e = this._args(arguments, ["script", "type"], ["type"]),
            n = this._makeNode(
              e.parent,
              "script",
              t.extend({ type: e.type || "text/javascript" }, e.settings || {})
            );
          return (
            n.appendChild(this._svg.ownerDocument.createTextNode(e.script)),
            t.svg._ie && t.globalEval(e.script),
            n
          );
        },
        linearGradient: function () {
          var e = this._args(
              arguments,
              ["id", "stops", "x1", "y1", "x2", "y2"],
              ["x1"]
            ),
            n = t.extend(
              { id: e.id },
              null != e.x1 ? { x1: e.x1, y1: e.y1, x2: e.x2, y2: e.y2 } : {}
            );
          return this._gradient(
            e.parent,
            "linearGradient",
            t.extend(n, e.settings || {}),
            e.stops
          );
        },
        radialGradient: function () {
          var e = this._args(
              arguments,
              ["id", "stops", "cx", "cy", "r", "fx", "fy"],
              ["cx"]
            ),
            n = t.extend(
              { id: e.id },
              null != e.cx
                ? { cx: e.cx, cy: e.cy, r: e.r, fx: e.fx, fy: e.fy }
                : {}
            );
          return this._gradient(
            e.parent,
            "radialGradient",
            t.extend(n, e.settings || {}),
            e.stops
          );
        },
        _gradient: function (e, n, i, r) {
          for (var o = this._makeNode(e, n, i), s = 0; s < r.length; s++) {
            var a = r[s];
            this._makeNode(
              o,
              "stop",
              t.extend(
                { offset: a[0], stopColor: a[1] },
                null != a[2] ? { stopOpacity: a[2] } : {}
              )
            );
          }
          return o;
        },
        pattern: function () {
          var e = this._args(
              arguments,
              [
                "id",
                "x",
                "y",
                "width",
                "height",
                "vx",
                "vy",
                "vwidth",
                "vheight",
              ],
              ["vx"]
            ),
            n = t.extend(
              { id: e.id, x: e.x, y: e.y, width: e.width, height: e.height },
              null != e.vx
                ? {
                    viewBox:
                      e.vx + " " + e.vy + " " + e.vwidth + " " + e.vheight,
                  }
                : {}
            );
          return this._makeNode(
            e.parent,
            "pattern",
            t.extend(n, e.settings || {})
          );
        },
        clipPath: function () {
          var e = this._args(arguments, ["id", "units"]);
          return (
            (e.units = e.units || "userSpaceOnUse"),
            this._makeNode(
              e.parent,
              "clipPath",
              t.extend({ id: e.id, clipPathUnits: e.units }, e.settings || {})
            )
          );
        },
        mask: function () {
          var e = this._args(arguments, ["id", "x", "y", "width", "height"]);
          return this._makeNode(
            e.parent,
            "mask",
            t.extend(
              { id: e.id, x: e.x, y: e.y, width: e.width, height: e.height },
              e.settings || {}
            )
          );
        },
        createPath: function () {
          return new i();
        },
        createText: function () {
          return new r();
        },
        svg: function () {
          var e = this._args(
              arguments,
              ["x", "y", "width", "height", "vx", "vy", "vwidth", "vheight"],
              ["vx"]
            ),
            n = t.extend(
              { x: e.x, y: e.y, width: e.width, height: e.height },
              null != e.vx
                ? {
                    viewBox:
                      e.vx + " " + e.vy + " " + e.vwidth + " " + e.vheight,
                  }
                : {}
            );
          return this._makeNode(e.parent, "svg", t.extend(n, e.settings || {}));
        },
        group: function () {
          var e = this._args(arguments, ["id"], ["id"]);
          return this._makeNode(
            e.parent,
            "g",
            t.extend({ id: e.id }, e.settings || {})
          );
        },
        use: function () {
          var e = this._args(arguments, ["x", "y", "width", "height", "ref"]);
          "string" == typeof e.x &&
            ((e.ref = e.x),
            (e.settings = e.y),
            (e.x = e.y = e.width = e.height = null));
          var n = this._makeNode(
            e.parent,
            "use",
            t.extend(
              { x: e.x, y: e.y, width: e.width, height: e.height },
              e.settings || {}
            )
          );
          return n.setAttributeNS(t.svg.xlinkNS, "href", e.ref), n;
        },
        link: function () {
          var e = this._args(arguments, ["ref"]),
            n = this._makeNode(e.parent, "a", e.settings);
          return n.setAttributeNS(t.svg.xlinkNS, "href", e.ref), n;
        },
        image: function () {
          var e = this._args(arguments, ["x", "y", "width", "height", "ref"]),
            n = this._makeNode(
              e.parent,
              "image",
              t.extend(
                { x: e.x, y: e.y, width: e.width, height: e.height },
                e.settings || {}
              )
            );
          return n.setAttributeNS(t.svg.xlinkNS, "href", e.ref), n;
        },
        path: function () {
          var e = this._args(arguments, ["path"]);
          return this._makeNode(
            e.parent,
            "path",
            t.extend(
              { d: e.path.path ? e.path.path() : e.path },
              e.settings || {}
            )
          );
        },
        rect: function () {
          var e = this._args(
            arguments,
            ["x", "y", "width", "height", "rx", "ry"],
            ["rx"]
          );
          return this._makeNode(
            e.parent,
            "rect",
            t.extend(
              { x: e.x, y: e.y, width: e.width, height: e.height },
              e.rx ? { rx: e.rx, ry: e.ry } : {},
              e.settings || {}
            )
          );
        },
        circle: function () {
          var e = this._args(arguments, ["cx", "cy", "r"]);
          return this._makeNode(
            e.parent,
            "circle",
            t.extend({ cx: e.cx, cy: e.cy, r: e.r }, e.settings || {})
          );
        },
        ellipse: function () {
          var e = this._args(arguments, ["cx", "cy", "rx", "ry"]);
          return this._makeNode(
            e.parent,
            "ellipse",
            t.extend(
              { cx: e.cx, cy: e.cy, rx: e.rx, ry: e.ry },
              e.settings || {}
            )
          );
        },
        line: function () {
          var e = this._args(arguments, ["x1", "y1", "x2", "y2"]);
          return this._makeNode(
            e.parent,
            "line",
            t.extend(
              { x1: e.x1, y1: e.y1, x2: e.x2, y2: e.y2 },
              e.settings || {}
            )
          );
        },
        polyline: function () {
          var t = this._args(arguments, ["points"]);
          return this._poly(t.parent, "polyline", t.points, t.settings);
        },
        polygon: function () {
          var t = this._args(arguments, ["points"]);
          return this._poly(t.parent, "polygon", t.points, t.settings);
        },
        _poly: function (e, n, i, r) {
          for (var o = "", s = 0; s < i.length; s++) o += i[s].join() + " ";
          return this._makeNode(e, n, t.extend({ points: t.trim(o) }, r || {}));
        },
        text: function () {
          var e = this._args(arguments, ["x", "y", "value"]);
          return (
            "string" == typeof e.x &&
              arguments.length < 4 &&
              ((e.value = e.x), (e.settings = e.y), (e.x = e.y = null)),
            this._text(
              e.parent,
              "text",
              e.value,
              t.extend(
                {
                  x: e.x && t.isArray(e.x) ? e.x.join(" ") : e.x,
                  y: e.y && t.isArray(e.y) ? e.y.join(" ") : e.y,
                },
                e.settings || {}
              )
            )
          );
        },
        textpath: function () {
          var e = this._args(arguments, ["path", "value"]),
            n = this._text(e.parent, "textPath", e.value, e.settings || {});
          return n.setAttributeNS(t.svg.xlinkNS, "href", e.path), n;
        },
        _text: function (e, n, i, r) {
          var o = this._makeNode(e, n, r);
          if ("string" == typeof i)
            o.appendChild(o.ownerDocument.createTextNode(i));
          else
            for (var s = 0; s < i._parts.length; s++) {
              var a = i._parts[s];
              if ("tspan" === a[0])
                (l = this._makeNode(o, a[0], a[2])).appendChild(
                  o.ownerDocument.createTextNode(a[1])
                ),
                  o.appendChild(l);
              else if ("tref" === a[0]) {
                (l = this._makeNode(o, a[0], a[2])).setAttributeNS(
                  t.svg.xlinkNS,
                  "href",
                  a[1]
                ),
                  o.appendChild(l);
              } else if ("textpath" === a[0]) {
                var l,
                  c = t.extend({}, a[2]);
                (c.href = null),
                  (l = this._makeNode(o, a[0], c)).setAttributeNS(
                    t.svg.xlinkNS,
                    "href",
                    a[2].href
                  ),
                  l.appendChild(o.ownerDocument.createTextNode(a[1])),
                  o.appendChild(l);
              } else o.appendChild(o.ownerDocument.createTextNode(a[1]));
            }
          return o;
        },
        other: function () {
          var t = this._args(arguments, ["name"]);
          return this._makeNode(t.parent, t.name, t.settings || {});
        },
        _makeNode: function (e, n, i) {
          e = e || this._svg;
          var r = this._svg.ownerDocument.createElementNS(t.svg.svgNS, n);
          for (var n in i) {
            var o = i[n];
            null == o ||
              ("string" == typeof o && "" === o) ||
              r.setAttribute(t.svg._attrNames[n] || n, o);
          }
          return e.appendChild(r), r;
        },
        add: function (e) {
          var n = this._args(1 === arguments.length ? [null, e] : arguments, [
              "node",
            ]),
            i = this;
          (n.parent = n.parent || this._svg),
            (n.node = n.node.jquery ? n.node : t(n.node));
          try {
            n.parent.appendChild(n.node.cloneNode(!0));
          } catch (r) {
            n.node.each(function () {
              var t = i._cloneAsSVG(this);
              t && n.parent.appendChild(t);
            });
          }
          return this;
        },
        clone: function (e) {
          var n = this,
            i = this._args(1 === arguments.length ? [null, e] : arguments, [
              "node",
            ]);
          (i.parent = i.parent || this._svg),
            (i.node = i.node.jquery ? i.node : t(i.node));
          var r = [];
          return (
            i.node.each(function () {
              var t = n._cloneAsSVG(this);
              t && ((t.id = ""), i.parent.appendChild(t), r.push(t));
            }),
            r
          );
        },
        _cloneAsSVG: function (e) {
          var n = null;
          if (1 === e.nodeType) {
            n = this._svg.ownerDocument.createElementNS(
              t.svg.svgNS,
              this._checkName(e.nodeName)
            );
            for (var i = 0; i < e.attributes.length; i++) {
              var r = e.attributes.item(i);
              "xmlns" !== r.nodeName &&
                r.nodeValue &&
                ("xlink" === r.prefix
                  ? n.setAttributeNS(
                      t.svg.xlinkNS,
                      r.localName || r.baseName,
                      r.nodeValue
                    )
                  : n.setAttribute(this._checkName(r.nodeName), r.nodeValue));
            }
            for (i = 0; i < e.childNodes.length; i++) {
              var o = this._cloneAsSVG(e.childNodes[i]);
              o && n.appendChild(o);
            }
          } else if (3 === e.nodeType)
            t.trim(e.nodeValue) &&
              (n = this._svg.ownerDocument.createTextNode(e.nodeValue));
          else if (4 === e.nodeType && t.trim(e.nodeValue))
            try {
              n = this._svg.ownerDocument.createCDATASection(e.nodeValue);
            } catch (s) {
              n = this._svg.ownerDocument.createTextNode(
                e.nodeValue
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
              );
            }
          return n;
        },
        _checkName: function (t) {
          return "svg:" ===
            (t =
              t.substring(0, 1) >= "A" && t.substring(0, 1) <= "Z"
                ? t.toLowerCase()
                : t).substring(0, 4)
            ? t.substring(4)
            : t;
        },
        load: function (e, n) {
          (n =
            "boolean" == typeof n
              ? { addTo: n }
              : "function" == typeof n
              ? { onLoad: n }
              : "string" == typeof n
              ? { parent: n }
              : "object" == typeof n && n.nodeName
              ? { parent: n }
              : "object" == typeof n && n.jquery
              ? { parent: n }
              : n || {}).parent ||
            n.addTo ||
            this.clear(!1);
          var i = [
              this._svg.getAttribute("width"),
              this._svg.getAttribute("height"),
            ],
            r = this,
            o = function (e) {
              (e = t.svg.local.errorLoadingText + ": " + e),
                n.onLoad
                  ? n.onLoad.apply(r._container || r._svg, [r, e])
                  : r.text(null, 10, 20, e);
            },
            s = function (s) {
              if (s)
                if ("svg" === s.documentElement.nodeName) {
                  for (
                    var a = n.parent ? t(n.parent)[0] : r._svg, l = {}, c = 0;
                    c < s.documentElement.attributes.length;
                    c++
                  ) {
                    var u = s.documentElement.attributes.item(c);
                    "version" !== u.nodeName &&
                      "xmlns" !== u.nodeName.substring(0, 5) &&
                      (l[u.nodeName] = u.nodeValue);
                  }
                  r.configure(a, l, !n.parent);
                  var h = s.documentElement.childNodes;
                  for (c = 0; c < h.length; c++)
                    try {
                      a.appendChild(r._svg.ownerDocument.importNode(h[c], !0)),
                        "script" === h[c].nodeName &&
                          t.globalEval(h[c].textContent);
                    } catch (g) {
                      r.add(a, h[c]);
                    }
                  if (!n.keepRelativeLinks && e.match("/")) {
                    var d = e.replace(/\/[^\/]*$/, "/");
                    t("*", a).each(function () {
                      var e = t(this).attr("xlink:href");
                      e &&
                        !e.match(
                          /(^[a-z][-a-z0-9+.]*:.*$)|(^\/.*$)|(^#.*$)/i
                        ) &&
                        t(this).attr("xlink:href", d + e);
                    });
                  }
                  n.changeSize || r.configure(a, { width: i[0], height: i[1] }),
                    n.onLoad && n.onLoad.apply(r._container || r._svg, [r]);
                } else {
                  var f = s.getElementsByTagName("parsererror"),
                    p = f.length ? f[0].getElementsByTagName("div") : [];
                  o(
                    f.length
                      ? (p.length ? p[0] : f[0]).firstChild.nodeValue
                      : "???"
                  );
                }
            };
          if (e.match("<svg"))
            try {
              s(new DOMParser().parseFromString(e, "text/xml"));
            } catch (a) {
              o(a);
            }
          else
            t.ajax({
              url: e,
              dataType: "xml",
              success: function (t) {
                s(t);
              },
              error: function (t, e, n) {
                o(e + (n ? " " + n.message : ""));
              },
            });
          return this;
        },
        remove: function (t) {
          return (t = t.jquery ? t[0] : t).parentNode.removeChild(t), this;
        },
        clear: function (t) {
          for (t && this.configure({}, !0); this._svg.firstChild; )
            this._svg.removeChild(this._svg.firstChild);
          return this;
        },
        toSVG: function (t) {
          return (
            (t = t || this._svg),
            "undefined" == typeof XMLSerializer
              ? this._toSVG(t)
              : new XMLSerializer().serializeToString(t)
          );
        },
        _toSVG: function (e) {
          var n = "";
          if (!e) return n;
          if (3 === e.nodeType) n = e.nodeValue;
          else if (4 === e.nodeType) n = "<![CDATA[" + e.nodeValue + "]]>";
          else {
            if (((n = "<" + e.nodeName), e.attributes))
              for (var i = 0; i < e.attributes.length; i++) {
                var r = e.attributes.item(i);
                "" === t.trim(r.nodeValue) ||
                  r.nodeValue.match(/^\[object/) ||
                  r.nodeValue.match(/^function/) ||
                  (n +=
                    " " +
                    (r.namespaceURI === t.svg.xlinkNS ? "xlink:" : "") +
                    r.nodeName +
                    '="' +
                    r.nodeValue +
                    '"');
              }
            if (e.firstChild) {
              n += ">";
              for (var o = e.firstChild; o; )
                (n += this._toSVG(o)), (o = o.nextSibling);
              n += "</" + e.nodeName + ">";
            } else n += "/>";
          }
          return n;
        },
      }),
      t.extend(i.prototype, {
        reset: function () {
          return (this._path = ""), this;
        },
        move: function (e, n, i) {
          return (i = t.isArray(e) ? n : i), this._coords(i ? "m" : "M", e, n);
        },
        line: function (e, n, i) {
          return (i = t.isArray(e) ? n : i), this._coords(i ? "l" : "L", e, n);
        },
        horiz: function (e, n) {
          return (
            (this._path += (n ? "h" : "H") + (t.isArray(e) ? e.join(" ") : e)),
            this
          );
        },
        vert: function (e, n) {
          return (
            (this._path += (n ? "v" : "V") + (t.isArray(e) ? e.join(" ") : e)),
            this
          );
        },
        curveC: function (e, n, i, r, o, s, a) {
          return (
            (a = t.isArray(e) ? n : a),
            this._coords(a ? "c" : "C", e, n, i, r, o, s)
          );
        },
        smoothC: function (e, n, i, r, o) {
          return (
            (o = t.isArray(e) ? n : o), this._coords(o ? "s" : "S", e, n, i, r)
          );
        },
        curveQ: function (e, n, i, r, o) {
          return (
            (o = t.isArray(e) ? n : o), this._coords(o ? "q" : "Q", e, n, i, r)
          );
        },
        smoothQ: function (e, n, i) {
          return (i = t.isArray(e) ? n : i), this._coords(i ? "t" : "T", e, n);
        },
        _coords: function (e, n, i, r, o, s, a) {
          if (t.isArray(n))
            for (var l = 0; l < n.length; l++) {
              var c = n[l];
              this._path +=
                (0 === l ? e : " ") +
                c[0] +
                "," +
                c[1] +
                (c.length < 4
                  ? ""
                  : " " +
                    c[2] +
                    "," +
                    c[3] +
                    (c.length < 6 ? "" : " " + c[4] + "," + c[5]));
            }
          else
            this._path +=
              e +
              n +
              "," +
              i +
              (null == r
                ? ""
                : " " + r + "," + o + (null == s ? "" : " " + s + "," + a));
          return this;
        },
        arc: function (e, n, i, r, o, s, a, l) {
          if (
            ((l = t.isArray(e) ? n : l),
            (this._path += l ? "a" : "A"),
            t.isArray(e))
          )
            for (var c = 0; c < e.length; c++) {
              var u = e[c];
              this._path +=
                (0 === c ? "" : " ") +
                u[0] +
                "," +
                u[1] +
                " " +
                u[2] +
                " " +
                (u[3] ? "1" : "0") +
                "," +
                (u[4] ? "1" : "0") +
                " " +
                u[5] +
                "," +
                u[6];
            }
          else
            this._path +=
              e +
              "," +
              n +
              " " +
              i +
              " " +
              (r ? "1" : "0") +
              "," +
              (o ? "1" : "0") +
              " " +
              s +
              "," +
              a;
          return this;
        },
        close: function () {
          return (this._path += "z"), this;
        },
        path: function () {
          return this._path;
        },
      }),
      (i.prototype.moveTo = i.prototype.move),
      (i.prototype.lineTo = i.prototype.line),
      (i.prototype.horizTo = i.prototype.horiz),
      (i.prototype.vertTo = i.prototype.vert),
      (i.prototype.curveCTo = i.prototype.curveC),
      (i.prototype.smoothCTo = i.prototype.smoothC),
      (i.prototype.curveQTo = i.prototype.curveQ),
      (i.prototype.smoothQTo = i.prototype.smoothQ),
      (i.prototype.arcTo = i.prototype.arc),
      t.extend(r.prototype, {
        reset: function () {
          return (this._parts = []), this;
        },
        string: function (t) {
          return this._parts.push(["text", t]), this;
        },
        span: function (t, e) {
          return this._parts.push(["tspan", t, e]), this;
        },
        ref: function (t, e) {
          return this._parts.push(["tref", t, e]), this;
        },
        path: function (e, n, i) {
          return (
            this._parts.push(["textpath", n, t.extend({ href: e }, i || {})]),
            this
          );
        },
      }),
      (t.fn.svg = function (e) {
        var n = Array.prototype.slice.call(arguments, 1);
        return "string" == typeof e && "get" === e
          ? t.svg["_" + e + "SVG"].apply(t.svg, [this[0]].concat(n))
          : this.each(function () {
              "string" == typeof e
                ? t.svg["_" + e + "SVG"].apply(t.svg, [this].concat(n))
                : t.svg._attachSVG(this, e || {});
            });
      }),
      (t.svg = new e());
  })(jQuery),
  (function (t) {
    var e,
      n,
      i = "0.5.0",
      r = "hasOwnProperty",
      o = /[\.\/]/,
      s = /\s*,\s*/,
      a = "*",
      l = function (t, e) {
        return t - e;
      },
      c = { n: {} },
      u = function () {
        for (var t = 0, e = this.length; e > t; t++)
          if ("undefined" != typeof this[t]) return this[t];
      },
      h = function () {
        for (var t = this.length; --t; )
          if ("undefined" != typeof this[t]) return this[t];
      },
      d = Object.prototype.toString,
      f = String,
      p =
        Array.isArray ||
        function (t) {
          return t instanceof Array || "[object Array]" == d.call(t);
        };
    (eve = function (t, i) {
      var r,
        o = n,
        s = Array.prototype.slice.call(arguments, 2),
        a = eve.listeners(t),
        c = 0,
        d = [],
        f = {},
        p = [],
        g = e;
      (p.firstDefined = u), (p.lastDefined = h), (e = t), (n = 0);
      for (var m = 0, v = a.length; v > m; m++)
        "zIndex" in a[m] &&
          (d.push(a[m].zIndex), a[m].zIndex < 0 && (f[a[m].zIndex] = a[m]));
      for (d.sort(l); d[c] < 0; )
        if (((r = f[d[c++]]), p.push(r.apply(i, s)), n)) return (n = o), p;
      for (m = 0; v > m; m++)
        if ("zIndex" in (r = a[m]))
          if (r.zIndex == d[c]) {
            if ((p.push(r.apply(i, s)), n)) break;
            do {
              if (((r = f[d[++c]]) && p.push(r.apply(i, s)), n)) break;
            } while (r);
          } else f[r.zIndex] = r;
        else if ((p.push(r.apply(i, s)), n)) break;
      return (n = o), (e = g), p;
    }),
      (eve._events = c),
      (eve.listeners = function (t) {
        var e,
          n,
          i,
          r,
          s,
          l,
          u,
          h,
          d = p(t) ? t : t.split(o),
          f = c,
          g = [f],
          m = [];
        for (r = 0, s = d.length; s > r; r++) {
          for (h = [], l = 0, u = g.length; u > l; l++)
            for (n = [(f = g[l].n)[d[r]], f[a]], i = 2; i--; )
              (e = n[i]) && (h.push(e), (m = m.concat(e.f || [])));
          g = h;
        }
        return m;
      }),
      (eve.separator = function (t) {
        t
          ? ((t = "[" + (t = f(t).replace(/(?=[\.\^\]\[\-])/g, "\\")) + "]"),
            (o = new RegExp(t)))
          : (o = /[\.\/]/);
      }),
      (eve.on = function (t, e) {
        if ("function" != typeof e) return function () {};
        for (
          var n = p(t) ? (p(t[0]) ? t : [t]) : f(t).split(s),
            i = 0,
            r = n.length;
          r > i;
          i++
        )
          !(function (t) {
            for (
              var n, i = p(t) ? t : f(t).split(o), r = c, s = 0, a = i.length;
              a > s;
              s++
            )
              r =
                ((r = r.n).hasOwnProperty(i[s]) && r[i[s]]) ||
                (r[i[s]] = { n: {} });
            for (r.f = r.f || [], s = 0, a = r.f.length; a > s; s++)
              if (r.f[s] == e) {
                n = !0;
                break;
              }
            !n && r.f.push(e);
          })(n[i]);
        return function (t) {
          +t == +t && (e.zIndex = +t);
        };
      }),
      (eve.f = function (t) {
        var e = [].slice.call(arguments, 1);
        return function () {
          eve.apply(
            null,
            [t, null].concat(e).concat([].slice.call(arguments, 0))
          );
        };
      }),
      (eve.stop = function () {
        n = 1;
      }),
      (eve.nt = function (t) {
        var n = p(e) ? e.join(".") : e;
        return t
          ? new RegExp("(?:\\.|\\/|^)" + t + "(?:\\.|\\/|$)").test(n)
          : n;
      }),
      (eve.nts = function () {
        return p(e) ? e : e.split(o);
      }),
      (eve.off = eve.unbind =
        function (t, e) {
          if (t) {
            var n = p(t) ? (p(t[0]) ? t : [t]) : f(t).split(s);
            if (n.length > 1)
              for (var i = 0, l = n.length; l > i; i++) eve.off(n[i], e);
            else {
              n = p(t) ? t : f(t).split(o);
              var u,
                h,
                d,
                g,
                m,
                v = [c],
                y = [];
              for (i = 0, l = n.length; l > i; i++)
                for (g = 0; g < v.length; g += d.length - 2) {
                  if (((d = [g, 1]), (u = v[g].n), n[i] != a))
                    u[n[i]] &&
                      (d.push(u[n[i]]), y.unshift({ n: u, name: n[i] }));
                  else
                    for (h in u)
                      u[r](h) && (d.push(u[h]), y.unshift({ n: u, name: h }));
                  v.splice.apply(v, d);
                }
              for (i = 0, l = v.length; l > i; i++)
                for (u = v[i]; u.n; ) {
                  if (e) {
                    if (u.f) {
                      for (g = 0, m = u.f.length; m > g; g++)
                        if (u.f[g] == e) {
                          u.f.splice(g, 1);
                          break;
                        }
                      !u.f.length && delete u.f;
                    }
                    for (h in u.n)
                      if (u.n[r](h) && u.n[h].f) {
                        var b = u.n[h].f;
                        for (g = 0, m = b.length; m > g; g++)
                          if (b[g] == e) {
                            b.splice(g, 1);
                            break;
                          }
                        !b.length && delete u.n[h].f;
                      }
                  } else
                    for (h in (delete u.f, u.n))
                      u.n[r](h) && u.n[h].f && delete u.n[h].f;
                  u = u.n;
                }
              t: for (i = 0, l = y.length; l > i; i++) {
                for (h in (u = y[i]).n[u.name].f) continue t;
                for (h in u.n[u.name].n) continue t;
                delete u.n[u.name];
              }
            }
          } else eve._events = c = { n: {} };
        }),
      (eve.once = function (t, e) {
        var n = function () {
          return eve.off(t, n), e.apply(this, arguments);
        };
        return eve.on(t, n);
      }),
      (eve.version = i),
      (eve.toString = function () {
        return "You are running Eve " + i;
      }),
      "undefined" != typeof module && module.exports
        ? (module.exports = eve)
        : "function" == typeof define && define.amd
        ? define("eve", [], function () {
            return eve;
          })
        : (t.eve = eve);
  })(this),
  (function (t, e) {
    if ("function" == typeof define && define.amd)
      define(["eve"], function (n) {
        return e(t, n);
      });
    else if ("undefined" != typeof exports) {
      var n = require("eve");
      module.exports = e(t, n);
    } else e(t, t.eve);
  })(window || this, function (t, e) {
    var n = (function (e) {
        var n,
          i = {},
          r =
            t.requestAnimationFrame ||
            t.webkitRequestAnimationFrame ||
            t.mozRequestAnimationFrame ||
            t.oRequestAnimationFrame ||
            t.msRequestAnimationFrame ||
            function (t) {
              return setTimeout(t, 16, new Date().getTime()), !0;
            },
          o =
            Array.isArray ||
            function (t) {
              return (
                t instanceof Array ||
                "[object Array]" == Object.prototype.toString.call(t)
              );
            },
          s = 0,
          a = "M" + (+new Date()).toString(36),
          l = function () {
            return a + (s++).toString(36);
          },
          c =
            Date.now ||
            function () {
              return +new Date();
            },
          u = function (t) {
            var e = this;
            if (null == t) return e.s;
            var n = e.s - t;
            (e.b += e.dur * n), (e.B += e.dur * n), (e.s = t);
          },
          h = function (t) {
            var e = this;
            return null == t ? e.spd : void (e.spd = t);
          },
          d = function (t) {
            var e = this;
            return null == t
              ? e.dur
              : ((e.s = (e.s * t) / e.dur), void (e.dur = t));
          },
          f = function () {
            var t = this;
            delete i[t.id], t.update(), e("mina.stop." + t.id, t);
          },
          p = function () {
            var t = this;
            t.pdif || (delete i[t.id], t.update(), (t.pdif = t.get() - t.b));
          },
          g = function () {
            var t = this;
            t.pdif &&
              ((t.b = t.get() - t.pdif), delete t.pdif, (i[t.id] = t), v());
          },
          m = function () {
            var t,
              e = this;
            if (o(e.start)) {
              t = [];
              for (var n = 0, i = e.start.length; i > n; n++)
                t[n] = +e.start[n] + (e.end[n] - e.start[n]) * e.easing(e.s);
            } else t = +e.start + (e.end - e.start) * e.easing(e.s);
            e.set(t);
          },
          v = function (t) {
            if (t) {
              var o = 0;
              for (var s in i)
                if (i.hasOwnProperty(s)) {
                  var a = i[s],
                    l = a.get();
                  o++,
                    (a.s = (l - a.b) / (a.dur / a.spd)),
                    a.s >= 1 &&
                      (delete i[s],
                      (a.s = 1),
                      o--,
                      (function (t) {
                        setTimeout(function () {
                          e("mina.finish." + t.id, t);
                        });
                      })(a)),
                    a.update();
                }
              n = !!o && r(v);
            } else n || (n = r(v));
          },
          y = function (t, e, n, r, o, s, a) {
            var c = {
              id: l(),
              start: t,
              end: e,
              b: n,
              s: 0,
              dur: r - n,
              spd: 1,
              get: o,
              set: s,
              easing: a || y.linear,
              status: u,
              speed: h,
              duration: d,
              stop: f,
              pause: p,
              resume: g,
              update: m,
            };
            i[c.id] = c;
            var b,
              x = 0;
            for (b in i) if (i.hasOwnProperty(b) && 2 == ++x) break;
            return 1 == x && v(), c;
          };
        return (
          (y.time = c),
          (y.getById = function (t) {
            return i[t] || null;
          }),
          (y.linear = function (t) {
            return t;
          }),
          (y.easeout = function (t) {
            return Math.pow(t, 1.7);
          }),
          (y.easein = function (t) {
            return Math.pow(t, 0.48);
          }),
          (y.easeinout = function (t) {
            if (1 == t) return 1;
            if (0 == t) return 0;
            var e = 0.48 - t / 1.04,
              n = Math.sqrt(0.1734 + e * e),
              i = n - e,
              r = -n - e,
              o =
                Math.pow(Math.abs(i), 1 / 3) * (0 > i ? -1 : 1) +
                Math.pow(Math.abs(r), 1 / 3) * (0 > r ? -1 : 1) +
                0.5;
            return 3 * (1 - o) * o * o + o * o * o;
          }),
          (y.backin = function (t) {
            if (1 == t) return 1;
            var e = 1.70158;
            return t * t * ((e + 1) * t - e);
          }),
          (y.backout = function (t) {
            if (0 == t) return 0;
            var e = 1.70158;
            return (t -= 1) * t * ((e + 1) * t + e) + 1;
          }),
          (y.elastic = function (t) {
            return t == !!t
              ? t
              : Math.pow(2, -10 * t) *
                  Math.sin(((t - 0.075) * (2 * Math.PI)) / 0.3) +
                  1;
          }),
          (y.bounce = function (t) {
            var e,
              n = 7.5625,
              i = 2.75;
            return (
              1 / i > t
                ? (e = n * t * t)
                : 2 / i > t
                ? (e = n * (t -= 1.5 / i) * t + 0.75)
                : 2.5 / i > t
                ? (e = n * (t -= 2.25 / i) * t + 0.9375)
                : (e = n * (t -= 2.625 / i) * t + 0.984375),
              e
            );
          }),
          (t.mina = y),
          y
        );
      })(void 0 === e ? function () {} : e),
      i = (function (t) {
        function n(t, e) {
          if (t) {
            if (t.nodeType) return k(t);
            if (r(t, "array") && n.set) return n.set.apply(n, t);
            if (t instanceof y) return t;
            if (null == e)
              try {
                return k((t = _.doc.querySelector(String(t))));
              } catch (i) {
                return null;
              }
          }
          return new w(
            (t = null == t ? "100%" : t),
            (e = null == e ? "100%" : e)
          );
        }
        function i(t, e) {
          if (e) {
            if (
              ("#text" == t &&
                (t = _.doc.createTextNode(e.text || e["#text"] || "")),
              "#comment" == t &&
                (t = _.doc.createComment(e.text || e["#text"] || "")),
              "string" == typeof t && (t = i(t)),
              "string" == typeof e)
            )
              return 1 == t.nodeType
                ? "xlink:" == e.substring(0, 6)
                  ? t.getAttributeNS(W, e.substring(6))
                  : "xml:" == e.substring(0, 4)
                  ? t.getAttributeNS(U, e.substring(4))
                  : t.getAttribute(e)
                : "text" == e
                ? t.nodeValue
                : null;
            if (1 == t.nodeType) {
              for (var n in e)
                if (e[S](n)) {
                  var r = E(e[n]);
                  r
                    ? "xlink:" == n.substring(0, 6)
                      ? t.setAttributeNS(W, n.substring(6), r)
                      : "xml:" == n.substring(0, 4)
                      ? t.setAttributeNS(U, n.substring(4), r)
                      : t.setAttribute(n, r)
                    : t.removeAttribute(n);
                }
            } else "text" in e && (t.nodeValue = e.text);
          } else t = _.doc.createElementNS(U, t);
          return t;
        }
        function r(t, e) {
          return "finite" == (e = E.prototype.toLowerCase.call(e))
            ? isFinite(t)
            : !(
                "array" != e ||
                !(t instanceof Array || (Array.isArray && Array.isArray(t)))
              ) ||
                ("null" == e && null === t) ||
                (e == typeof t && null !== t) ||
                ("object" == e && t === Object(t)) ||
                P.call(t).slice(8, -1).toLowerCase() == e;
        }
        function o(t) {
          if ("function" == typeof t || Object(t) !== t) return t;
          var e = new t.constructor();
          for (var n in t) t[S](n) && (e[n] = o(t[n]));
          return e;
        }
        function s(t, e) {
          for (var n = 0, i = t.length; i > n; n++)
            if (t[n] === e) return t.push(t.splice(n, 1)[0]);
        }
        function a(t, e, n) {
          function i() {
            var r = Array.prototype.slice.call(arguments, 0),
              o = r.join("\u2400"),
              a = (i.cache = i.cache || {}),
              l = (i.count = i.count || []);
            return a[S](o)
              ? (s(l, o), n ? n(a[o]) : a[o])
              : (l.length >= 1e3 && delete a[l.shift()],
                l.push(o),
                (a[o] = t.apply(e, r)),
                n ? n(a[o]) : a[o]);
          }
          return i;
        }
        function l(t, e, n, i, r, o) {
          if (null == r) {
            var s = t - n,
              a = e - i;
            return s || a ? (180 + (180 * D.atan2(-a, -s)) / $ + 360) % 360 : 0;
          }
          return l(t, e, r, o) - l(n, i, r, o);
        }
        function c(t) {
          return ((t % 360) * $) / 180;
        }
        function u(t) {
          return ((180 * t) / $) % 360;
        }
        function h(t) {
          var e = [];
          return (
            (t = t.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, function (t, n, i) {
              return (
                (i = i.split(/\s*,\s*|\s+/)),
                "rotate" == n && 1 == i.length && i.push(0, 0),
                "scale" == n &&
                  (i.length > 2
                    ? (i = i.slice(0, 2))
                    : 2 == i.length && i.push(0, 0),
                  1 == i.length && i.push(i[0], 0, 0)),
                "skewX" == n
                  ? e.push(["m", 1, 0, D.tan(c(i[0])), 1, 0, 0])
                  : "skewY" == n
                  ? e.push(["m", 1, D.tan(c(i[0])), 0, 1, 0, 0])
                  : e.push([n.charAt(0)].concat(i)),
                t
              );
            })),
            e
          );
        }
        function d(t, e) {
          var i = tt(t),
            r = new n.Matrix();
          if (i)
            for (var o = 0, s = i.length; s > o; o++) {
              var a,
                l,
                c,
                u,
                h,
                d = i[o],
                f = d.length,
                p = E(d[0]).toLowerCase(),
                g = d[0] != p,
                m = g ? r.invert() : 0;
              "t" == p && 2 == f
                ? r.translate(d[1], 0)
                : "t" == p && 3 == f
                ? g
                  ? ((a = m.x(0, 0)),
                    (l = m.y(0, 0)),
                    (c = m.x(d[1], d[2])),
                    (u = m.y(d[1], d[2])),
                    r.translate(c - a, u - l))
                  : r.translate(d[1], d[2])
                : "r" == p
                ? 2 == f
                  ? ((h = h || e),
                    r.rotate(d[1], h.x + h.width / 2, h.y + h.height / 2))
                  : 4 == f &&
                    (g
                      ? ((c = m.x(d[2], d[3])),
                        (u = m.y(d[2], d[3])),
                        r.rotate(d[1], c, u))
                      : r.rotate(d[1], d[2], d[3]))
                : "s" == p
                ? 2 == f || 3 == f
                  ? ((h = h || e),
                    r.scale(
                      d[1],
                      d[f - 1],
                      h.x + h.width / 2,
                      h.y + h.height / 2
                    ))
                  : 4 == f
                  ? g
                    ? ((c = m.x(d[2], d[3])),
                      (u = m.y(d[2], d[3])),
                      r.scale(d[1], d[1], c, u))
                    : r.scale(d[1], d[1], d[2], d[3])
                  : 5 == f &&
                    (g
                      ? ((c = m.x(d[3], d[4])),
                        (u = m.y(d[3], d[4])),
                        r.scale(d[1], d[2], c, u))
                      : r.scale(d[1], d[2], d[3], d[4]))
                : "m" == p &&
                  7 == f &&
                  r.add(d[1], d[2], d[3], d[4], d[5], d[6]);
            }
          return r;
        }
        function f(t) {
          var e =
              (t.node.ownerSVGElement && k(t.node.ownerSVGElement)) ||
              (t.node.parentNode && k(t.node.parentNode)) ||
              n.select("svg") ||
              n(0, 0),
            i = e.select("defs"),
            r = null != i && i.node;
          return r || (r = x("defs", e.node).node), r;
        }
        function p(t) {
          return (
            (t.node.ownerSVGElement && k(t.node.ownerSVGElement)) ||
            n.select("svg")
          );
        }
        function m(t, e, n) {
          function r(t) {
            if (null == t) return B;
            if (t == +t) return t;
            i(c, { width: t });
            try {
              return c.getBBox().width;
            } catch (e) {
              return 0;
            }
          }
          function o(t) {
            if (null == t) return B;
            if (t == +t) return t;
            i(c, { height: t });
            try {
              return c.getBBox().height;
            } catch (e) {
              return 0;
            }
          }
          function s(i, r) {
            null == e
              ? (l[i] = r(t.attr(i) || 0))
              : i == e && (l = r(null == n ? t.attr(i) || 0 : n));
          }
          var a = p(t).node,
            l = {},
            c = a.querySelector(".svg---mgr");
          switch (
            (c ||
              (i((c = i("rect")), {
                x: -9e9,
                y: -9e9,
                width: 10,
                height: 10,
                class: "svg---mgr",
                fill: "none",
              }),
              a.appendChild(c)),
            t.type)
          ) {
            case "rect":
              s("rx", r), s("ry", o);
            case "image":
              s("width", r), s("height", o);
            case "text":
              s("x", r), s("y", o);
              break;
            case "circle":
              s("cx", r), s("cy", o), s("r", r);
              break;
            case "ellipse":
              s("cx", r), s("cy", o), s("rx", r), s("ry", o);
              break;
            case "line":
              s("x1", r), s("x2", r), s("y1", o), s("y2", o);
              break;
            case "marker":
              s("refX", r),
                s("markerWidth", r),
                s("refY", o),
                s("markerHeight", o);
              break;
            case "radialGradient":
              s("fx", r), s("fy", o);
              break;
            case "tspan":
              s("dx", r), s("dy", o);
              break;
            default:
              s(e, r);
          }
          return a.removeChild(c), l;
        }
        function v(t) {
          r(t, "array") || (t = Array.prototype.slice.call(arguments, 0));
          for (var e = 0, n = 0, i = this.node; this[e]; ) delete this[e++];
          for (e = 0; e < t.length; e++)
            "set" == t[e].type
              ? t[e].forEach(function (t) {
                  i.appendChild(t.node);
                })
              : i.appendChild(t[e].node);
          var o = i.childNodes;
          for (e = 0; e < o.length; e++) this[n++] = k(o[e]);
          return this;
        }
        function y(t) {
          if (t.snap in K) return K[t.snap];
          var e;
          try {
            e = t.ownerSVGElement;
          } catch (n) {}
          (this.node = t),
            e && (this.paper = new w(e)),
            (this.type = t.tagName || t.nodeName);
          var i = (this.id = V(this));
          if (
            ((this.anims = {}),
            (this._ = { transform: [] }),
            (t.snap = i),
            (K[i] = this),
            "g" == this.type && (this.add = v),
            this.type in { g: 1, mask: 1, pattern: 1, symbol: 1 })
          )
            for (var r in w.prototype)
              w.prototype[S](r) && (this[r] = w.prototype[r]);
        }
        function b(t) {
          this.node = t;
        }
        function x(t, e) {
          var n = i(t);
          return e.appendChild(n), k(n);
        }
        function w(t, e) {
          var n,
            r,
            o,
            s = w.prototype;
          if (t && t.tagName && "svg" == t.tagName.toLowerCase()) {
            if (t.snap in K) return K[t.snap];
            var a = t.ownerDocument;
            for (var l in ((n = new y(t)),
            (r = t.getElementsByTagName("desc")[0]),
            (o = t.getElementsByTagName("defs")[0]),
            r ||
              ((r = i("desc")).appendChild(
                a.createTextNode("Created with Snap")
              ),
              n.node.appendChild(r)),
            o || ((o = i("defs")), n.node.appendChild(o)),
            (n.defs = o),
            s))
              s[S](l) && (n[l] = s[l]);
            n.paper = n.root = n;
          } else
            i((n = x("svg", _.doc.body)).node, {
              height: e,
              version: 1.1,
              width: t,
              xmlns: U,
            });
          return n;
        }
        function k(t) {
          return t
            ? t instanceof y || t instanceof b
              ? t
              : t.tagName && "svg" == t.tagName.toLowerCase()
              ? new w(t)
              : t.tagName &&
                "object" == t.tagName.toLowerCase() &&
                "image/svg+xml" == t.type
              ? new w(t.contentDocument.getElementsByTagName("svg")[0])
              : new y(t)
            : t;
        }
        function C(t, e) {
          for (var n = 0, i = t.length; i > n; n++) {
            var r = { type: t[n].type, attr: t[n].attr() },
              o = t[n].children();
            e.push(r), o.length && C(o, (r.childNodes = []));
          }
        }
        (n.version = "0.5.1"),
          (n.toString = function () {
            return "Snap v" + this.version;
          }),
          (n._ = {});
        var _ = { win: t.window, doc: t.window.document };
        n._.glob = _;
        var S = "hasOwnProperty",
          E = String,
          T = parseFloat,
          j = parseInt,
          D = Math,
          N = D.max,
          F = D.min,
          A = D.abs,
          $ = (D.pow, D.PI),
          B = (D.round, ""),
          P = Object.prototype.toString,
          M =
            /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,
          L = ((n._.separator = /[,\s]+/), /[\s]*,[\s]*/),
          I = { hs: 1, rg: 1 },
          q = /([a-z])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi,
          O = /([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi,
          H = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\s]*,?[\s]*/gi,
          R = 0,
          z = "S" + (+new Date()).toString(36),
          V = function (t) {
            return (t && t.type ? t.type : B) + z + (R++).toString(36);
          },
          W = "http://www.w3.org/1999/xlink",
          U = "http://www.w3.org/2000/svg",
          K = {};
        (n.url = function (t) {
          return "url('#" + t + "')";
        }),
          (n._.$ = i),
          (n._.id = V),
          (n.format = (function () {
            var t = /\{([^\}]+)\}/g,
              e = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
              n = function (t, n, i) {
                var r = i;
                return (
                  n.replace(e, function (t, e, n, i, o) {
                    (e = e || i),
                      r &&
                        (e in r && (r = r[e]),
                        "function" == typeof r && o && (r = r()));
                  }),
                  (r = (null == r || r == i ? t : r) + "")
                );
              };
            return function (e, i) {
              return E(e).replace(t, function (t, e) {
                return n(t, e, i);
              });
            };
          })()),
          (n._.clone = o),
          (n._.cacher = a),
          (n.rad = c),
          (n.deg = u),
          (n.sin = function (t) {
            return D.sin(n.rad(t));
          }),
          (n.tan = function (t) {
            return D.tan(n.rad(t));
          }),
          (n.cos = function (t) {
            return D.cos(n.rad(t));
          }),
          (n.asin = function (t) {
            return n.deg(D.asin(t));
          }),
          (n.acos = function (t) {
            return n.deg(D.acos(t));
          }),
          (n.atan = function (t) {
            return n.deg(D.atan(t));
          }),
          (n.atan2 = function (t) {
            return n.deg(D.atan2(t));
          }),
          (n.angle = l),
          (n.len = function (t, e, i, r) {
            return Math.sqrt(n.len2(t, e, i, r));
          }),
          (n.len2 = function (t, e, n, i) {
            return (t - n) * (t - n) + (e - i) * (e - i);
          }),
          (n.closestPoint = function (t, e, n) {
            function i(t) {
              var i = t.x - e,
                r = t.y - n;
              return i * i + r * r;
            }
            for (
              var r,
                o,
                s,
                a,
                l = t.node,
                c = l.getTotalLength(),
                u = (c / l.pathSegList.numberOfItems) * 0.125,
                h = 1 / 0,
                d = 0;
              c >= d;
              d += u
            )
              (a = i((s = l.getPointAtLength(d)))) < h &&
                ((r = s), (o = d), (h = a));
            for (u *= 0.5; u > 0.5; ) {
              var f, p, g, m, v, y;
              (g = o - u) >= 0 && (v = i((f = l.getPointAtLength(g)))) < h
                ? ((r = f), (o = g), (h = v))
                : (m = o + u) <= c && (y = i((p = l.getPointAtLength(m)))) < h
                ? ((r = p), (o = m), (h = y))
                : (u *= 0.5);
            }
            return { x: r.x, y: r.y, length: o, distance: Math.sqrt(h) };
          }),
          (n.is = r),
          (n.snapTo = function (t, e, n) {
            if (((n = r(n, "finite") ? n : 10), r(t, "array"))) {
              for (var i = t.length; i--; ) if (A(t[i] - e) <= n) return t[i];
            } else {
              var o = e % (t = +t);
              if (n > o) return e - o;
              if (o > t - n) return e - o + t;
            }
            return e;
          }),
          (n.getRGB = a(function (t) {
            if (!t || (t = E(t)).indexOf("-") + 1)
              return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                error: 1,
                toString: Q,
              };
            if ("none" == t)
              return { r: -1, g: -1, b: -1, hex: "none", toString: Q };
            if (
              (!(I[S](t.toLowerCase().substring(0, 2)) || "#" == t.charAt()) &&
                (t = X(t)),
              !t)
            )
              return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                error: 1,
                toString: Q,
              };
            var e,
              i,
              o,
              s,
              a,
              l,
              c = t.match(M);
            return c
              ? (c[2] &&
                  ((o = j(c[2].substring(5), 16)),
                  (i = j(c[2].substring(3, 5), 16)),
                  (e = j(c[2].substring(1, 3), 16))),
                c[3] &&
                  ((o = j((a = c[3].charAt(3)) + a, 16)),
                  (i = j((a = c[3].charAt(2)) + a, 16)),
                  (e = j((a = c[3].charAt(1)) + a, 16))),
                c[4] &&
                  ((l = c[4].split(L)),
                  (e = T(l[0])),
                  "%" == l[0].slice(-1) && (e *= 2.55),
                  (i = T(l[1])),
                  "%" == l[1].slice(-1) && (i *= 2.55),
                  (o = T(l[2])),
                  "%" == l[2].slice(-1) && (o *= 2.55),
                  "rgba" == c[1].toLowerCase().slice(0, 4) && (s = T(l[3])),
                  l[3] && "%" == l[3].slice(-1) && (s /= 100)),
                c[5]
                  ? ((l = c[5].split(L)),
                    (e = T(l[0])),
                    "%" == l[0].slice(-1) && (e /= 100),
                    (i = T(l[1])),
                    "%" == l[1].slice(-1) && (i /= 100),
                    (o = T(l[2])),
                    "%" == l[2].slice(-1) && (o /= 100),
                    ("deg" == l[0].slice(-3) || "\xb0" == l[0].slice(-1)) &&
                      (e /= 360),
                    "hsba" == c[1].toLowerCase().slice(0, 4) && (s = T(l[3])),
                    l[3] && "%" == l[3].slice(-1) && (s /= 100),
                    n.hsb2rgb(e, i, o, s))
                  : c[6]
                  ? ((l = c[6].split(L)),
                    (e = T(l[0])),
                    "%" == l[0].slice(-1) && (e /= 100),
                    (i = T(l[1])),
                    "%" == l[1].slice(-1) && (i /= 100),
                    (o = T(l[2])),
                    "%" == l[2].slice(-1) && (o /= 100),
                    ("deg" == l[0].slice(-3) || "\xb0" == l[0].slice(-1)) &&
                      (e /= 360),
                    "hsla" == c[1].toLowerCase().slice(0, 4) && (s = T(l[3])),
                    l[3] && "%" == l[3].slice(-1) && (s /= 100),
                    n.hsl2rgb(e, i, o, s))
                  : ((e = F(D.round(e), 255)),
                    (i = F(D.round(i), 255)),
                    (o = F(D.round(o), 255)),
                    (s = F(N(s, 0), 1)),
                    ((c = { r: e, g: i, b: o, toString: Q }).hex =
                      "#" +
                      (16777216 | o | (i << 8) | (e << 16))
                        .toString(16)
                        .slice(1)),
                    (c.opacity = r(s, "finite") ? s : 1),
                    c))
              : { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: Q };
          }, n)),
          (n.hsb = a(function (t, e, i) {
            return n.hsb2rgb(t, e, i).hex;
          })),
          (n.hsl = a(function (t, e, i) {
            return n.hsl2rgb(t, e, i).hex;
          })),
          (n.rgb = a(function (t, e, n, i) {
            if (r(i, "finite")) {
              var o = D.round;
              return "rgba(" + [o(t), o(e), o(n), +i.toFixed(2)] + ")";
            }
            return (
              "#" + (16777216 | n | (e << 8) | (t << 16)).toString(16).slice(1)
            );
          }));
        var X = function (t) {
            var e =
                _.doc.getElementsByTagName("head")[0] ||
                _.doc.getElementsByTagName("svg")[0],
              n = "rgb(255, 0, 0)";
            return (X = a(function (t) {
              if ("red" == t.toLowerCase()) return n;
              (e.style.color = n), (e.style.color = t);
              var i = _.doc.defaultView
                .getComputedStyle(e, B)
                .getPropertyValue("color");
              return i == n ? null : i;
            }))(t);
          },
          G = function () {
            return "hsb(" + [this.h, this.s, this.b] + ")";
          },
          Y = function () {
            return "hsl(" + [this.h, this.s, this.l] + ")";
          },
          Q = function () {
            return 1 == this.opacity || null == this.opacity
              ? this.hex
              : "rgba(" + [this.r, this.g, this.b, this.opacity] + ")";
          },
          J = function (t, e, i) {
            if (
              (null == e &&
                r(t, "object") &&
                "r" in t &&
                "g" in t &&
                "b" in t &&
                ((i = t.b), (e = t.g), (t = t.r)),
              null == e && r(t, string))
            ) {
              var o = n.getRGB(t);
              (t = o.r), (e = o.g), (i = o.b);
            }
            return (
              (t > 1 || e > 1 || i > 1) && ((t /= 255), (e /= 255), (i /= 255)),
              [t, e, i]
            );
          },
          Z = function (t, e, i, o) {
            var s = {
              r: (t = D.round(255 * t)),
              g: (e = D.round(255 * e)),
              b: (i = D.round(255 * i)),
              opacity: r(o, "finite") ? o : 1,
              hex: n.rgb(t, e, i),
              toString: Q,
            };
            return r(o, "finite") && (s.opacity = o), s;
          };
        (n.color = function (t) {
          var e;
          return (
            r(t, "object") && "h" in t && "s" in t && "b" in t
              ? ((e = n.hsb2rgb(t)),
                (t.r = e.r),
                (t.g = e.g),
                (t.b = e.b),
                (t.opacity = 1),
                (t.hex = e.hex))
              : r(t, "object") && "h" in t && "s" in t && "l" in t
              ? ((e = n.hsl2rgb(t)),
                (t.r = e.r),
                (t.g = e.g),
                (t.b = e.b),
                (t.opacity = 1),
                (t.hex = e.hex))
              : (r(t, "string") && (t = n.getRGB(t)),
                r(t, "object") &&
                "r" in t &&
                "g" in t &&
                "b" in t &&
                !("error" in t)
                  ? ((e = n.rgb2hsl(t)),
                    (t.h = e.h),
                    (t.s = e.s),
                    (t.l = e.l),
                    (e = n.rgb2hsb(t)),
                    (t.v = e.b))
                  : (((t = { hex: "none" }).r =
                      t.g =
                      t.b =
                      t.h =
                      t.s =
                      t.v =
                      t.l =
                        -1),
                    (t.error = 1))),
            (t.toString = Q),
            t
          );
        }),
          (n.hsb2rgb = function (t, e, n, i) {
            var o, s, a, l, c;
            return (
              r(t, "object") &&
                "h" in t &&
                "s" in t &&
                "b" in t &&
                ((n = t.b), (e = t.s), (i = t.o), (t = t.h)),
              (o = s = a = n - (c = n * e)),
              (o += [
                c,
                (l = c * (1 - A(((t = ((t *= 360) % 360) / 60) % 2) - 1))),
                0,
                0,
                l,
                c,
              ][(t = ~~t)]),
              (s += [l, c, c, l, 0, 0][t]),
              (a += [0, 0, l, c, c, l][t]),
              Z(o, s, a, i)
            );
          }),
          (n.hsl2rgb = function (t, e, n, i) {
            var o, s, a, l, c;
            return (
              r(t, "object") &&
                "h" in t &&
                "s" in t &&
                "l" in t &&
                ((n = t.l), (e = t.s), (t = t.h)),
              (t > 1 || e > 1 || n > 1) && ((t /= 360), (e /= 100), (n /= 100)),
              (o = s = a = n - (c = 2 * e * (0.5 > n ? n : 1 - n)) / 2),
              (o += [
                c,
                (l = c * (1 - A(((t = ((t *= 360) % 360) / 60) % 2) - 1))),
                0,
                0,
                l,
                c,
              ][(t = ~~t)]),
              (s += [l, c, c, l, 0, 0][t]),
              (a += [0, 0, l, c, c, l][t]),
              Z(o, s, a, i)
            );
          }),
          (n.rgb2hsb = function (t, e, n) {
            var i, r;
            return (
              (t = (n = J(t, e, n))[0]),
              (e = n[1]),
              (n = n[2]),
              {
                h:
                  ((((0 == (r = (i = N(t, e, n)) - F(t, e, n))
                    ? null
                    : i == t
                    ? (e - n) / r
                    : i == e
                    ? (n - t) / r + 2
                    : (t - e) / r + 4) +
                    360) %
                    6) *
                    60) /
                  360,
                s: 0 == r ? 0 : r / i,
                b: i,
                toString: G,
              }
            );
          }),
          (n.rgb2hsl = function (t, e, n) {
            var i, r, o, s;
            return (
              (t = (n = J(t, e, n))[0]),
              (e = n[1]),
              (n = n[2]),
              (i = ((r = N(t, e, n)) + (o = F(t, e, n))) / 2),
              {
                h:
                  ((((0 == (s = r - o)
                    ? null
                    : r == t
                    ? (e - n) / s
                    : r == e
                    ? (n - t) / s + 2
                    : (t - e) / s + 4) +
                    360) %
                    6) *
                    60) /
                  360,
                s: 0 == s ? 0 : 0.5 > i ? s / (2 * i) : s / (2 - 2 * i),
                l: i,
                toString: Y,
              }
            );
          }),
          (n.parsePathString = function (t) {
            if (!t) return null;
            var e = n.path(t);
            if (e.arr) return n.path.clone(e.arr);
            var i = {
                a: 7,
                c: 6,
                o: 2,
                h: 1,
                l: 2,
                m: 2,
                r: 4,
                q: 4,
                s: 4,
                t: 2,
                v: 1,
                u: 3,
                z: 0,
              },
              o = [];
            return (
              r(t, "array") && r(t[0], "array") && (o = n.path.clone(t)),
              o.length ||
                E(t).replace(q, function (t, e, n) {
                  var r = [],
                    s = e.toLowerCase();
                  if (
                    (n.replace(H, function (t, e) {
                      e && r.push(+e);
                    }),
                    "m" == s &&
                      r.length > 2 &&
                      (o.push([e].concat(r.splice(0, 2))),
                      (s = "l"),
                      (e = "m" == e ? "l" : "L")),
                    "o" == s && 1 == r.length && o.push([e, r[0]]),
                    "r" == s)
                  )
                    o.push([e].concat(r));
                  else
                    for (
                      ;
                      r.length >= i[s] &&
                      (o.push([e].concat(r.splice(0, i[s]))), i[s]);

                    );
                }),
              (o.toString = n.path.toString),
              (e.arr = n.path.clone(o)),
              o
            );
          });
        var tt = (n.parseTransformString = function (t) {
          if (!t) return null;
          var e = [];
          return (
            r(t, "array") && r(t[0], "array") && (e = n.path.clone(t)),
            e.length ||
              E(t).replace(O, function (t, n, i) {
                var r = [];
                n.toLowerCase(),
                  i.replace(H, function (t, e) {
                    e && r.push(+e);
                  }),
                  e.push([n].concat(r));
              }),
            (e.toString = n.path.toString),
            e
          );
        });
        (n._.svgTransform2string = h),
          (n._.rgTransform = /^[a-z][\s]*-?\.?\d/i),
          (n._.transform2matrix = d),
          (n._unit2px = m),
          _.doc.contains || _.doc.compareDocumentPosition,
          (n._.getSomeDefs = f),
          (n._.getSomeSVG = p),
          (n.select = function (t) {
            return (
              (t = E(t).replace(/([^\\]):/g, "$1\\:")),
              k(_.doc.querySelector(t))
            );
          }),
          (n.selectAll = function (t) {
            for (
              var e = _.doc.querySelectorAll(t), i = (n.set || Array)(), r = 0;
              r < e.length;
              r++
            )
              i.push(k(e[r]));
            return i;
          }),
          setInterval(function () {
            for (var t in K)
              if (K[S](t)) {
                var e = K[t],
                  n = e.node;
                (("svg" != e.type && !n.ownerSVGElement) ||
                  ("svg" == e.type &&
                    (!n.parentNode ||
                      ("ownerSVGElement" in n.parentNode &&
                        !n.ownerSVGElement)))) &&
                  delete K[t];
              }
          }, 1e4),
          (y.prototype.attr = function (t, n) {
            var i = this,
              o = i.node;
            if (!t) {
              if (1 != o.nodeType) return { text: o.nodeValue };
              for (
                var s = o.attributes, a = {}, l = 0, c = s.length;
                c > l;
                l++
              )
                a[s[l].nodeName] = s[l].nodeValue;
              return a;
            }
            if (r(t, "string")) {
              if (!(arguments.length > 1))
                return e("snap.util.getattr." + t, i).firstDefined();
              var u = {};
              (u[t] = n), (t = u);
            }
            for (var h in t) t[S](h) && e("snap.util.attr." + h, i, t[h]);
            return i;
          }),
          (n.parse = function (t) {
            var e = _.doc.createDocumentFragment(),
              n = !0,
              i = _.doc.createElement("div");
            if (
              ((t = E(t)).match(/^\s*<\s*svg(?:\s|>)/) ||
                ((t = "<svg>" + t + "</svg>"), (n = !1)),
              (i.innerHTML = t),
              (t = i.getElementsByTagName("svg")[0]))
            )
              if (n) e = t;
              else for (; t.firstChild; ) e.appendChild(t.firstChild);
            return new b(e);
          }),
          (n.fragment = function () {
            for (
              var t = Array.prototype.slice.call(arguments, 0),
                e = _.doc.createDocumentFragment(),
                i = 0,
                r = t.length;
              r > i;
              i++
            ) {
              var o = t[i];
              o.node && o.node.nodeType && e.appendChild(o.node),
                o.nodeType && e.appendChild(o),
                "string" == typeof o && e.appendChild(n.parse(o).node);
            }
            return new b(e);
          }),
          (n._.make = x),
          (n._.wrap = k),
          (w.prototype.el = function (t, e) {
            var n = x(t, this.node);
            return e && n.attr(e), n;
          }),
          (y.prototype.children = function () {
            for (
              var t = [], e = this.node.childNodes, i = 0, r = e.length;
              r > i;
              i++
            )
              t[i] = n(e[i]);
            return t;
          }),
          (y.prototype.toJSON = function () {
            var t = [];
            return C([this], t), t[0];
          }),
          e.on("snap.util.getattr", function () {
            var t = e.nt(),
              n = (t = t.substring(t.lastIndexOf(".") + 1)).replace(
                /[A-Z]/g,
                function (t) {
                  return "-" + t.toLowerCase();
                }
              );
            return et[S](n)
              ? this.node.ownerDocument.defaultView
                  .getComputedStyle(this.node, null)
                  .getPropertyValue(n)
              : i(this.node, t);
          });
        var et = {
          "alignment-baseline": 0,
          "baseline-shift": 0,
          clip: 0,
          "clip-path": 0,
          "clip-rule": 0,
          color: 0,
          "color-interpolation": 0,
          "color-interpolation-filters": 0,
          "color-profile": 0,
          "color-rendering": 0,
          cursor: 0,
          direction: 0,
          display: 0,
          "dominant-baseline": 0,
          "enable-background": 0,
          fill: 0,
          "fill-opacity": 0,
          "fill-rule": 0,
          filter: 0,
          "flood-color": 0,
          "flood-opacity": 0,
          font: 0,
          "font-family": 0,
          "font-size": 0,
          "font-size-adjust": 0,
          "font-stretch": 0,
          "font-style": 0,
          "font-variant": 0,
          "font-weight": 0,
          "glyph-orientation-horizontal": 0,
          "glyph-orientation-vertical": 0,
          "image-rendering": 0,
          kerning: 0,
          "letter-spacing": 0,
          "lighting-color": 0,
          marker: 0,
          "marker-end": 0,
          "marker-mid": 0,
          "marker-start": 0,
          mask: 0,
          opacity: 0,
          overflow: 0,
          "pointer-events": 0,
          "shape-rendering": 0,
          "stop-color": 0,
          "stop-opacity": 0,
          stroke: 0,
          "stroke-dasharray": 0,
          "stroke-dashoffset": 0,
          "stroke-linecap": 0,
          "stroke-linejoin": 0,
          "stroke-miterlimit": 0,
          "stroke-opacity": 0,
          "stroke-width": 0,
          "text-anchor": 0,
          "text-decoration": 0,
          "text-rendering": 0,
          "unicode-bidi": 0,
          visibility: 0,
          "word-spacing": 0,
          "writing-mode": 0,
        };
        e.on("snap.util.attr", function (t) {
          var n = e.nt(),
            r = {};
          r[(n = n.substring(n.lastIndexOf(".") + 1))] = t;
          var o = n.replace(/-(\w)/gi, function (t, e) {
              return e.toUpperCase();
            }),
            s = n.replace(/[A-Z]/g, function (t) {
              return "-" + t.toLowerCase();
            });
          et[S](s) ? (this.node.style[o] = null == t ? B : t) : i(this.node, r);
        }),
          w.prototype,
          (n.ajax = function (t, n, i, o) {
            var s = new XMLHttpRequest(),
              a = V();
            if (s) {
              if (r(n, "function")) (o = i), (i = n), (n = null);
              else if (r(n, "object")) {
                var l = [];
                for (var c in n)
                  n.hasOwnProperty(c) &&
                    l.push(
                      encodeURIComponent(c) + "=" + encodeURIComponent(n[c])
                    );
                n = l.join("&");
              }
              return (
                s.open(n ? "POST" : "GET", t, !0),
                n &&
                  (s.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                  s.setRequestHeader(
                    "Content-type",
                    "application/x-www-form-urlencoded"
                  )),
                i &&
                  (e.once("snap.ajax." + a + ".0", i),
                  e.once("snap.ajax." + a + ".200", i),
                  e.once("snap.ajax." + a + ".304", i)),
                (s.onreadystatechange = function () {
                  4 == s.readyState &&
                    e("snap.ajax." + a + "." + s.status, o, s);
                }),
                4 == s.readyState ? s : (s.send(n), s)
              );
            }
          }),
          (n.load = function (t, e, i) {
            n.ajax(t, function (t) {
              var r = n.parse(t.responseText);
              i ? e.call(i, r) : e(r);
            });
          });
        var nt = function (t) {
          var e = t.getBoundingClientRect(),
            n = t.ownerDocument,
            i = n.body,
            r = n.documentElement,
            o = r.clientTop || i.clientTop || 0,
            s = r.clientLeft || i.clientLeft || 0;
          return {
            y: e.top + (g.win.pageYOffset || r.scrollTop || i.scrollTop) - o,
            x: e.left + (g.win.pageXOffset || r.scrollLeft || i.scrollLeft) - s,
          };
        };
        return (
          (n.getElementByPoint = function (t, e) {
            var n = (this.canvas, _.doc.elementFromPoint(t, e));
            if (_.win.opera && "svg" == n.tagName) {
              var i = nt(n),
                r = n.createSVGRect();
              (r.x = t - i.x), (r.y = e - i.y), (r.width = r.height = 1);
              var o = n.getIntersectionList(r, null);
              o.length && (n = o[o.length - 1]);
            }
            return n ? k(n) : null;
          }),
          (n.plugin = function (t) {
            t(n, y, w, _, b);
          }),
          (_.win.Snap = n),
          n
        );
      })(t || this);
    return (
      i.plugin(function (n, i, r, o, s) {
        function a(t, e) {
          if (null == e) {
            var i = !0;
            if (
              !(e =
                "linearGradient" == t.type || "radialGradient" == t.type
                  ? t.node.getAttribute("gradientTransform")
                  : "pattern" == t.type
                  ? t.node.getAttribute("patternTransform")
                  : t.node.getAttribute("transform"))
            )
              return new n.Matrix();
            e = n._.svgTransform2string(e);
          } else (e = n._.rgTransform.test(e) ? d(e).replace(/\.{3}|\u2026/g, t._.transform || "") : n._.svgTransform2string(e)), h(e, "array") && (e = n.path ? n.path.toString.call(e) : d(e)), (t._.transform = e);
          var r = n._.transform2matrix(e, t.getBBox(1));
          return i ? r : void (t.matrix = r);
        }
        function l(t) {
          function e(t, e) {
            var i = p(t.node, e);
            (i = (i = i && i.match(s)) && i[2]) &&
              "#" == i.charAt() &&
              (i = i.substring(1)) &&
              (l[i] = (l[i] || []).concat(function (i) {
                var r = {};
                (r[e] = n.url(i)), p(t.node, r);
              }));
          }
          function i(t) {
            var e = p(t.node, "xlink:href");
            e &&
              "#" == e.charAt() &&
              (e = e.substring(1)) &&
              (l[e] = (l[e] || []).concat(function (e) {
                t.attr("xlink:href", "#" + e);
              }));
          }
          for (
            var r,
              o = t.selectAll("*"),
              s = /^\s*url\(("|'|)(.*)\1\)\s*$/,
              a = [],
              l = {},
              c = 0,
              u = o.length;
            u > c;
            c++
          ) {
            e((r = o[c]), "fill"),
              e(r, "stroke"),
              e(r, "filter"),
              e(r, "mask"),
              e(r, "clip-path"),
              i(r);
            var h = p(r.node, "id");
            h && (p(r.node, { id: r.id }), a.push({ old: h, id: r.id }));
          }
          for (c = 0, u = a.length; u > c; c++) {
            var d = l[a[c].old];
            if (d) for (var f = 0, g = d.length; g > f; f++) d[f](a[c].id);
          }
        }
        function c(t) {
          return function () {
            var e = t ? "<" + this.type : "",
              n = this.node.attributes,
              i = this.node.childNodes;
            if (t)
              for (var r = 0, o = n.length; o > r; r++)
                e +=
                  " " +
                  n[r].name +
                  '="' +
                  n[r].value.replace(/"/g, '\\"') +
                  '"';
            if (i.length) {
              for (t && (e += ">"), r = 0, o = i.length; o > r; r++)
                3 == i[r].nodeType
                  ? (e += i[r].nodeValue)
                  : 1 == i[r].nodeType && (e += y(i[r]).toString());
              t && (e += "</" + this.type + ">");
            } else t && (e += "/>");
            return e;
          };
        }
        var u = i.prototype,
          h = n.is,
          d = String,
          f = n._unit2px,
          p = n._.$,
          g = n._.make,
          m = n._.getSomeDefs,
          v = "hasOwnProperty",
          y = n._.wrap;
        u.getBBox = function (t) {
          if ("tspan" == this.type)
            return n._.box(this.node.getClientRects().item(0));
          if (!n.Matrix || !n.path) return this.node.getBBox();
          var e = this,
            i = new n.Matrix();
          if (e.removed) return n._.box();
          for (; "use" == e.type; )
            if (
              (t ||
                (i = i.add(
                  e
                    .transform()
                    .localMatrix.translate(e.attr("x") || 0, e.attr("y") || 0)
                )),
              e.original)
            )
              e = e.original;
            else {
              var r = e.attr("xlink:href");
              e = e.original = e.node.ownerDocument.getElementById(
                r.substring(r.indexOf("#") + 1)
              );
            }
          var o = e._,
            s = n.path.get[e.type] || n.path.get.deflt;
          try {
            return t
              ? ((o.bboxwt = s
                  ? n.path.getBBox((e.realPath = s(e)))
                  : n._.box(e.node.getBBox())),
                n._.box(o.bboxwt))
              : ((e.realPath = s(e)),
                (e.matrix = e.transform().localMatrix),
                (o.bbox = n.path.getBBox(
                  n.path.map(e.realPath, i.add(e.matrix))
                )),
                n._.box(o.bbox));
          } catch (a) {
            return n._.box();
          }
        };
        var b = function () {
          return this.string;
        };
        (u.transform = function (t) {
          var e = this._;
          if (null == t) {
            for (
              var i,
                r = this,
                o = new n.Matrix(this.node.getCTM()),
                s = a(this),
                l = [s],
                c = new n.Matrix(),
                u = s.toTransformString(),
                h = d(s) == d(this.matrix) ? d(e.transform) : u;
              "svg" != r.type && (r = r.parent());

            )
              l.push(a(r));
            for (i = l.length; i--; ) c.add(l[i]);
            return {
              string: h,
              globalMatrix: o,
              totalMatrix: c,
              localMatrix: s,
              diffMatrix: o.clone().add(s.invert()),
              global: o.toTransformString(),
              total: c.toTransformString(),
              local: u,
              toString: b,
            };
          }
          return (
            t instanceof n.Matrix
              ? ((this.matrix = t), (this._.transform = t.toTransformString()))
              : a(this, t),
            this.node &&
              ("linearGradient" == this.type || "radialGradient" == this.type
                ? p(this.node, { gradientTransform: this.matrix })
                : "pattern" == this.type
                ? p(this.node, { patternTransform: this.matrix })
                : p(this.node, { transform: this.matrix })),
            this
          );
        }),
          (u.parent = function () {
            return y(this.node.parentNode);
          }),
          (u.append = u.add =
            function (t) {
              if (t) {
                if ("set" == t.type) {
                  var e = this;
                  return (
                    t.forEach(function (t) {
                      e.add(t);
                    }),
                    this
                  );
                }
                (t = y(t)),
                  this.node.appendChild(t.node),
                  (t.paper = this.paper);
              }
              return this;
            }),
          (u.appendTo = function (t) {
            return t && (t = y(t)).append(this), this;
          }),
          (u.prepend = function (t) {
            if (t) {
              if ("set" == t.type) {
                var e,
                  n = this;
                return (
                  t.forEach(function (t) {
                    e ? e.after(t) : n.prepend(t), (e = t);
                  }),
                  this
                );
              }
              var i = (t = y(t)).parent();
              this.node.insertBefore(t.node, this.node.firstChild),
                this.add && this.add(),
                (t.paper = this.paper),
                this.parent() && this.parent().add(),
                i && i.add();
            }
            return this;
          }),
          (u.prependTo = function (t) {
            return (t = y(t)).prepend(this), this;
          }),
          (u.before = function (t) {
            if ("set" == t.type) {
              var e = this;
              return (
                t.forEach(function (t) {
                  var n = t.parent();
                  e.node.parentNode.insertBefore(t.node, e.node), n && n.add();
                }),
                this.parent().add(),
                this
              );
            }
            var n = (t = y(t)).parent();
            return (
              this.node.parentNode.insertBefore(t.node, this.node),
              this.parent() && this.parent().add(),
              n && n.add(),
              (t.paper = this.paper),
              this
            );
          }),
          (u.after = function (t) {
            var e = (t = y(t)).parent();
            return (
              this.node.nextSibling
                ? this.node.parentNode.insertBefore(
                    t.node,
                    this.node.nextSibling
                  )
                : this.node.parentNode.appendChild(t.node),
              this.parent() && this.parent().add(),
              e && e.add(),
              (t.paper = this.paper),
              this
            );
          }),
          (u.insertBefore = function (t) {
            t = y(t);
            var e = this.parent();
            return (
              t.node.parentNode.insertBefore(this.node, t.node),
              (this.paper = t.paper),
              e && e.add(),
              t.parent() && t.parent().add(),
              this
            );
          }),
          (u.insertAfter = function (t) {
            t = y(t);
            var e = this.parent();
            return (
              t.node.parentNode.insertBefore(this.node, t.node.nextSibling),
              (this.paper = t.paper),
              e && e.add(),
              t.parent() && t.parent().add(),
              this
            );
          }),
          (u.remove = function () {
            var t = this.parent();
            return (
              this.node.parentNode &&
                this.node.parentNode.removeChild(this.node),
              delete this.paper,
              (this.removed = !0),
              t && t.add(),
              this
            );
          }),
          (u.select = function (t) {
            return y(this.node.querySelector(t));
          }),
          (u.selectAll = function (t) {
            for (
              var e = this.node.querySelectorAll(t),
                i = (n.set || Array)(),
                r = 0;
              r < e.length;
              r++
            )
              i.push(y(e[r]));
            return i;
          }),
          (u.asPX = function (t, e) {
            return null == e && (e = this.attr(t)), +f(this, t, e);
          }),
          (u.use = function () {
            var t,
              e = this.node.id;
            return (
              e || ((e = this.id), p(this.node, { id: e })),
              (t =
                "linearGradient" == this.type ||
                "radialGradient" == this.type ||
                "pattern" == this.type
                  ? g(this.type, this.node.parentNode)
                  : g("use", this.node.parentNode)),
              p(t.node, { "xlink:href": "#" + e }),
              (t.original = this),
              t
            );
          }),
          (u.clone = function () {
            var t = y(this.node.cloneNode(!0));
            return (
              p(t.node, "id") && p(t.node, { id: t.id }),
              l(t),
              t.insertAfter(this),
              t
            );
          }),
          (u.toDefs = function () {
            return m(this).appendChild(this.node), this;
          }),
          (u.pattern = u.toPattern =
            function (t, e, n, i) {
              var r = g("pattern", m(this));
              return (
                null == t && (t = this.getBBox()),
                h(t, "object") &&
                  "x" in t &&
                  ((e = t.y), (n = t.width), (i = t.height), (t = t.x)),
                p(r.node, {
                  x: t,
                  y: e,
                  width: n,
                  height: i,
                  patternUnits: "userSpaceOnUse",
                  id: r.id,
                  viewBox: [t, e, n, i].join(" "),
                }),
                r.node.appendChild(this.node),
                r
              );
            }),
          (u.marker = function (t, e, n, i, r, o) {
            var s = g("marker", m(this));
            return (
              null == t && (t = this.getBBox()),
              h(t, "object") &&
                "x" in t &&
                ((e = t.y),
                (n = t.width),
                (i = t.height),
                (r = t.refX || t.cx),
                (o = t.refY || t.cy),
                (t = t.x)),
              p(s.node, {
                viewBox: [t, e, n, i].join(" "),
                markerWidth: n,
                markerHeight: i,
                orient: "auto",
                refX: r || 0,
                refY: o || 0,
                id: s.id,
              }),
              s.node.appendChild(this.node),
              s
            );
          });
        var x = {};
        (u.data = function (t, i) {
          var r = (x[this.id] = x[this.id] || {});
          if (0 == arguments.length)
            return e("snap.data.get." + this.id, this, r, null), r;
          if (1 == arguments.length) {
            if (n.is(t, "object")) {
              for (var o in t) t[v](o) && this.data(o, t[o]);
              return this;
            }
            return e("snap.data.get." + this.id, this, r[t], t), r[t];
          }
          return (r[t] = i), e("snap.data.set." + this.id, this, i, t), this;
        }),
          (u.removeData = function (t) {
            return (
              null == t
                ? (x[this.id] = {})
                : x[this.id] && delete x[this.id][t],
              this
            );
          }),
          (u.outerSVG = u.toString = c(1)),
          (u.innerSVG = c()),
          (u.toDataURL = function () {
            if (t && t.btoa) {
              var e = this.getBBox(),
                i = n.format(
                  '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="{x} {y} {width} {height}">{contents}</svg>',
                  {
                    x: +e.x.toFixed(3),
                    y: +e.y.toFixed(3),
                    width: +e.width.toFixed(3),
                    height: +e.height.toFixed(3),
                    contents: this.outerSVG(),
                  }
                );
              return (
                "data:image/svg+xml;base64," +
                btoa(unescape(encodeURIComponent(i)))
              );
            }
          }),
          (s.prototype.select = u.select),
          (s.prototype.selectAll = u.selectAll);
      }),
      i.plugin(function (t, i) {
        function r(t, e, n) {
          return function (i) {
            var r = i.slice(t, e);
            return 1 == r.length && (r = r[0]), n ? n(r) : r;
          };
        }
        var o = i.prototype,
          s = t.is,
          a = String,
          l = "hasOwnProperty",
          c = function (t, e, i, r) {
            "function" != typeof i || i.length || ((r = i), (i = n.linear)),
              (this.attr = t),
              (this.dur = e),
              i && (this.easing = i),
              r && (this.callback = r);
          };
        (t._.Animation = c),
          (t.animation = function (t, e, n, i) {
            return new c(t, e, n, i);
          }),
          (o.inAnim = function () {
            var t = this,
              e = [];
            for (var n in t.anims)
              t.anims[l](n) &&
                (function (t) {
                  e.push({
                    anim: new c(t._attrs, t.dur, t.easing, t._callback),
                    mina: t,
                    curStatus: t.status(),
                    status: function (e) {
                      return t.status(e);
                    },
                    stop: function () {
                      t.stop();
                    },
                  });
                })(t.anims[n]);
            return e;
          }),
          (t.animate = function (t, i, r, o, s, a) {
            "function" != typeof s || s.length || ((a = s), (s = n.linear));
            var l = n.time(),
              c = n(t, i, l, l + o, n.time, r, s);
            return a && e.once("mina.finish." + c.id, a), c;
          }),
          (o.stop = function () {
            for (var t = this.inAnim(), e = 0, n = t.length; n > e; e++)
              t[e].stop();
            return this;
          }),
          (o.animate = function (t, i, o, u) {
            "function" != typeof o || o.length || ((u = o), (o = n.linear)),
              t instanceof c &&
                ((u = t.callback), (o = t.easing), (i = t.dur), (t = t.attr));
            var h,
              d,
              f,
              p,
              g = [],
              m = [],
              v = {},
              y = this;
            for (var b in t)
              if (t[l](b)) {
                y.equal
                  ? ((h = (p = y.equal(b, a(t[b]))).from),
                    (d = p.to),
                    (f = p.f))
                  : ((h = +y.attr(b)), (d = +t[b]));
                var x = s(h, "array") ? h.length : 1;
                (v[b] = r(g.length, g.length + x, f)),
                  (g = g.concat(h)),
                  (m = m.concat(d));
              }
            var w = n.time(),
              k = n(
                g,
                m,
                w,
                w + i,
                n.time,
                function (t) {
                  var e = {};
                  for (var n in v) v[l](n) && (e[n] = v[n](t));
                  y.attr(e);
                },
                o
              );
            return (
              (y.anims[k.id] = k),
              (k._attrs = t),
              (k._callback = u),
              e("snap.animcreated." + y.id, k),
              e.once("mina.finish." + k.id, function () {
                e.off("mina.*." + k.id), delete y.anims[k.id], u && u.call(y);
              }),
              e.once("mina.stop." + k.id, function () {
                e.off("mina.*." + k.id), delete y.anims[k.id];
              }),
              y
            );
          });
      }),
      i.plugin(function (t) {
        function e(t, e, i, r, o, s) {
          return null == e && "[object SVGMatrix]" == n.call(t)
            ? ((this.a = t.a),
              (this.b = t.b),
              (this.c = t.c),
              (this.d = t.d),
              (this.e = t.e),
              void (this.f = t.f))
            : void (null != t
                ? ((this.a = +t),
                  (this.b = +e),
                  (this.c = +i),
                  (this.d = +r),
                  (this.e = +o),
                  (this.f = +s))
                : ((this.a = 1),
                  (this.b = 0),
                  (this.c = 0),
                  (this.d = 1),
                  (this.e = 0),
                  (this.f = 0)));
        }
        var n = Object.prototype.toString,
          i = String,
          r = Math,
          o = "";
        !(function (n) {
          function s(t) {
            return t[0] * t[0] + t[1] * t[1];
          }
          function a(t) {
            var e = r.sqrt(s(t));
            t[0] && (t[0] /= e), t[1] && (t[1] /= e);
          }
          (n.add = function (t, n, i, r, o, s) {
            if (t && t instanceof e)
              return this.add(t.a, t.b, t.c, t.d, t.e, t.f);
            var a = t * this.a + n * this.c,
              l = t * this.b + n * this.d;
            return (
              (this.e += o * this.a + s * this.c),
              (this.f += o * this.b + s * this.d),
              (this.c = i * this.a + r * this.c),
              (this.d = i * this.b + r * this.d),
              (this.a = a),
              (this.b = l),
              this
            );
          }),
            (e.prototype.multLeft = function (t, n, i, r, o, s) {
              if (t && t instanceof e)
                return this.multLeft(t.a, t.b, t.c, t.d, t.e, t.f);
              var a = t * this.a + i * this.b,
                l = t * this.c + i * this.d,
                c = t * this.e + i * this.f + o;
              return (
                (this.b = n * this.a + r * this.b),
                (this.d = n * this.c + r * this.d),
                (this.f = n * this.e + r * this.f + s),
                (this.a = a),
                (this.c = l),
                (this.e = c),
                this
              );
            }),
            (n.invert = function () {
              var t = this,
                n = t.a * t.d - t.b * t.c;
              return new e(
                t.d / n,
                -t.b / n,
                -t.c / n,
                t.a / n,
                (t.c * t.f - t.d * t.e) / n,
                (t.b * t.e - t.a * t.f) / n
              );
            }),
            (n.clone = function () {
              return new e(this.a, this.b, this.c, this.d, this.e, this.f);
            }),
            (n.translate = function (t, e) {
              return (
                (this.e += t * this.a + e * this.c),
                (this.f += t * this.b + e * this.d),
                this
              );
            }),
            (n.scale = function (t, e, n, i) {
              return (
                null == e && (e = t),
                (n || i) && this.translate(n, i),
                (this.a *= t),
                (this.b *= t),
                (this.c *= e),
                (this.d *= e),
                (n || i) && this.translate(-n, -i),
                this
              );
            }),
            (n.rotate = function (e, n, i) {
              (e = t.rad(e)), (n = n || 0), (i = i || 0);
              var o = +r.cos(e).toFixed(9),
                s = +r.sin(e).toFixed(9);
              return this.add(o, s, -s, o, n, i), this.add(1, 0, 0, 1, -n, -i);
            }),
            (n.skewX = function (t) {
              return this.skew(t, 0);
            }),
            (n.skewY = function (t) {
              return this.skew(0, t);
            }),
            (n.skew = function (e, n) {
              (e = e || 0), (n = n || 0), (e = t.rad(e)), (n = t.rad(n));
              var i = r.tan(e).toFixed(9),
                o = r.tan(n).toFixed(9);
              return this.add(1, o, i, 1, 0, 0);
            }),
            (n.x = function (t, e) {
              return t * this.a + e * this.c + this.e;
            }),
            (n.y = function (t, e) {
              return t * this.b + e * this.d + this.f;
            }),
            (n.get = function (t) {
              return +this[i.fromCharCode(97 + t)].toFixed(4);
            }),
            (n.toString = function () {
              return (
                "matrix(" +
                [
                  this.get(0),
                  this.get(1),
                  this.get(2),
                  this.get(3),
                  this.get(4),
                  this.get(5),
                ].join() +
                ")"
              );
            }),
            (n.offset = function () {
              return [this.e.toFixed(4), this.f.toFixed(4)];
            }),
            (n.determinant = function () {
              return this.a * this.d - this.b * this.c;
            }),
            (n.split = function () {
              var e = {};
              (e.dx = this.e), (e.dy = this.f);
              var n = [
                [this.a, this.b],
                [this.c, this.d],
              ];
              (e.scalex = r.sqrt(s(n[0]))),
                a(n[0]),
                (e.shear = n[0][0] * n[1][0] + n[0][1] * n[1][1]),
                (n[1] = [
                  n[1][0] - n[0][0] * e.shear,
                  n[1][1] - n[0][1] * e.shear,
                ]),
                (e.scaley = r.sqrt(s(n[1]))),
                a(n[1]),
                (e.shear /= e.scaley),
                this.determinant() < 0 && (e.scalex = -e.scalex);
              var i = n[0][1],
                o = n[1][1];
              return (
                0 > o
                  ? ((e.rotate = t.deg(r.acos(o))),
                    0 > i && (e.rotate = 360 - e.rotate))
                  : (e.rotate = t.deg(r.asin(i))),
                (e.isSimple = !(
                  +e.shear.toFixed(9) ||
                  (e.scalex.toFixed(9) != e.scaley.toFixed(9) && e.rotate)
                )),
                (e.isSuperSimple =
                  !+e.shear.toFixed(9) &&
                  e.scalex.toFixed(9) == e.scaley.toFixed(9) &&
                  !e.rotate),
                (e.noRotation = !+e.shear.toFixed(9) && !e.rotate),
                e
              );
            }),
            (n.toTransformString = function (t) {
              var e = t || this.split();
              return +e.shear.toFixed(9)
                ? "m" +
                    [
                      this.get(0),
                      this.get(1),
                      this.get(2),
                      this.get(3),
                      this.get(4),
                      this.get(5),
                    ]
                : ((e.scalex = +e.scalex.toFixed(4)),
                  (e.scaley = +e.scaley.toFixed(4)),
                  (e.rotate = +e.rotate.toFixed(4)),
                  (e.dx || e.dy
                    ? "t" + [+e.dx.toFixed(4), +e.dy.toFixed(4)]
                    : o) +
                    (e.rotate ? "r" + [+e.rotate.toFixed(4), 0, 0] : o) +
                    (1 != e.scalex || 1 != e.scaley
                      ? "s" + [e.scalex, e.scaley, 0, 0]
                      : o));
            });
        })(e.prototype),
          (t.Matrix = e),
          (t.matrix = function (t, n, i, r, o, s) {
            return new e(t, n, i, r, o, s);
          });
      }),
      i.plugin(function (t, n, i, r, o) {
        function s(i) {
          return function (r) {
            if (
              (e.stop(),
              r instanceof o &&
                1 == r.node.childNodes.length &&
                ("radialGradient" == r.node.firstChild.tagName ||
                  "linearGradient" == r.node.firstChild.tagName ||
                  "pattern" == r.node.firstChild.tagName) &&
                ((r = r.node.firstChild), f(this).appendChild(r), (r = h(r))),
              r instanceof n)
            )
              if (
                "radialGradient" == r.type ||
                "linearGradient" == r.type ||
                "pattern" == r.type
              ) {
                r.node.id || g(r.node, { id: r.id });
                var s = m(r.node.id);
              } else s = r.attr(i);
            else if ((s = t.color(r)).error) {
              var a = t(f(this).ownerSVGElement).gradient(r);
              a
                ? (a.node.id || g(a.node, { id: a.id }), (s = m(a.node.id)))
                : (s = r);
            } else s = v(s);
            var l = {};
            (l[i] = s), g(this.node, l), (this.node.style[i] = b);
          };
        }
        function a(t) {
          e.stop(), t == +t && (t += "px"), (this.node.style.fontSize = t);
        }
        function l(t) {
          for (var e = [], n = t.childNodes, i = 0, r = n.length; r > i; i++) {
            var o = n[i];
            3 == o.nodeType && e.push(o.nodeValue),
              "tspan" == o.tagName &&
                (1 == o.childNodes.length && 3 == o.firstChild.nodeType
                  ? e.push(o.firstChild.nodeValue)
                  : e.push(l(o)));
          }
          return e;
        }
        function c() {
          return e.stop(), this.node.style.fontSize;
        }
        var u = t._.make,
          h = t._.wrap,
          d = t.is,
          f = t._.getSomeDefs,
          p = /^url\((['"]?)([^)]+)\1\)$/,
          g = t._.$,
          m = t.url,
          v = String,
          y = t._.separator,
          b = "";
        (t.deurl = function (t) {
          var e = String(t).match(p);
          return e ? e[2] : t;
        }),
          e.on("snap.util.attr.mask", function (t) {
            if (t instanceof n || t instanceof o) {
              if (
                (e.stop(),
                t instanceof o &&
                  1 == t.node.childNodes.length &&
                  ((t = t.node.firstChild), f(this).appendChild(t), (t = h(t))),
                "mask" == t.type)
              )
                var i = t;
              else (i = u("mask", f(this))).node.appendChild(t.node);
              !i.node.id && g(i.node, { id: i.id }),
                g(this.node, { mask: m(i.id) });
            }
          }),
          (function (t) {
            e.on("snap.util.attr.clip", t),
              e.on("snap.util.attr.clip-path", t),
              e.on("snap.util.attr.clipPath", t);
          })(function (t) {
            if (t instanceof n || t instanceof o) {
              e.stop();
              for (var i, r = t.node; r; ) {
                if ("clipPath" === r.nodeName) {
                  i = new n(r);
                  break;
                }
                if ("svg" === r.nodeName) {
                  i = void 0;
                  break;
                }
                r = r.parentNode;
              }
              i ||
                ((i = u("clipPath", f(this))).node.appendChild(t.node),
                !i.node.id && g(i.node, { id: i.id })),
                g(this.node, { "clip-path": m(i.node.id || i.id) });
            }
          }),
          e.on("snap.util.attr.fill", s("fill")),
          e.on("snap.util.attr.stroke", s("stroke"));
        var x = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
        e.on("snap.util.grad.parse", function (t) {
          function e(t, e) {
            for (var n = (e - a) / (t - l), i = l; t > i; i++)
              o[i].offset = +(+a + n * (i - l)).toFixed(2);
            (l = t), (a = e);
          }
          var n = (t = v(t)).match(x);
          if (!n) return null;
          var i = n[1],
            r = n[2],
            o = n[3];
          1 ==
            (r = r.split(/\s*,\s*/).map(function (t) {
              return +t == t ? +t : t;
            })).length &&
            0 == r[0] &&
            (r = []);
          var s = (o = (o = o.split("-")).map(function (t) {
              var e = { color: (t = t.split(":"))[0] };
              return t[1] && (e.offset = parseFloat(t[1])), e;
            })).length,
            a = 0,
            l = 0;
          s--;
          for (var c = 0; s > c; c++) "offset" in o[c] && e(c, o[c].offset);
          return (
            (o[s].offset = o[s].offset || 100),
            e(s, o[s].offset),
            { type: i, params: r, stops: o }
          );
        }),
          e.on("snap.util.attr.d", function (n) {
            e.stop(),
              d(n, "array") &&
                d(n[0], "array") &&
                (n = t.path.toString.call(n)),
              (n = v(n)).match(/[ruo]/i) && (n = t.path.toAbsolute(n)),
              g(this.node, { d: n });
          })(-1),
          e.on("snap.util.attr.#text", function (t) {
            e.stop(), (t = v(t));
            for (var n = r.doc.createTextNode(t); this.node.firstChild; )
              this.node.removeChild(this.node.firstChild);
            this.node.appendChild(n);
          })(-1),
          e.on("snap.util.attr.path", function (t) {
            e.stop(), this.attr({ d: t });
          })(-1),
          e.on("snap.util.attr.class", function (t) {
            e.stop(), (this.node.className.baseVal = t);
          })(-1),
          e.on("snap.util.attr.viewBox", function (t) {
            var n;
            (n =
              d(t, "object") && "x" in t
                ? [t.x, t.y, t.width, t.height].join(" ")
                : d(t, "array")
                ? t.join(" ")
                : t),
              g(this.node, { viewBox: n }),
              e.stop();
          })(-1),
          e.on("snap.util.attr.transform", function (t) {
            this.transform(t), e.stop();
          })(-1),
          e.on("snap.util.attr.r", function (t) {
            "rect" == this.type && (e.stop(), g(this.node, { rx: t, ry: t }));
          })(-1),
          e.on("snap.util.attr.textpath", function (t) {
            if ((e.stop(), "text" == this.type)) {
              var i, r, o;
              if (!t && this.textPath) {
                for (r = this.textPath; r.node.firstChild; )
                  this.node.appendChild(r.node.firstChild);
                return r.remove(), void delete this.textPath;
              }
              if (d(t, "string")) {
                var s = f(this),
                  a = h(s.parentNode).path(t);
                s.appendChild(a.node), (i = a.id), a.attr({ id: i });
              } else
                (t = h(t)) instanceof n &&
                  ((i = t.attr("id")) || ((i = t.id), t.attr({ id: i })));
              if (i)
                if (((r = this.textPath), (o = this.node), r))
                  r.attr({ "xlink:href": "#" + i });
                else {
                  for (
                    r = g("textPath", { "xlink:href": "#" + i });
                    o.firstChild;

                  )
                    r.appendChild(o.firstChild);
                  o.appendChild(r), (this.textPath = h(r));
                }
            }
          })(-1),
          e.on("snap.util.attr.text", function (t) {
            if ("text" == this.type) {
              for (
                var n = this.node,
                  i = function (t) {
                    var e = g("tspan");
                    if (d(t, "array"))
                      for (var n = 0; n < t.length; n++) e.appendChild(i(t[n]));
                    else e.appendChild(r.doc.createTextNode(t));
                    return e.normalize && e.normalize(), e;
                  };
                n.firstChild;

              )
                n.removeChild(n.firstChild);
              for (var o = i(t); o.firstChild; ) n.appendChild(o.firstChild);
            }
            e.stop();
          })(-1),
          e.on("snap.util.attr.fontSize", a)(-1),
          e.on("snap.util.attr.font-size", a)(-1),
          e.on("snap.util.getattr.transform", function () {
            return e.stop(), this.transform();
          })(-1),
          e.on("snap.util.getattr.textpath", function () {
            return e.stop(), this.textPath;
          })(-1),
          (function () {
            function n(n) {
              return function () {
                e.stop();
                var i = r.doc.defaultView
                  .getComputedStyle(this.node, null)
                  .getPropertyValue("marker-" + n);
                return "none" == i ? i : t(r.doc.getElementById(i.match(p)[1]));
              };
            }
            function i(t) {
              return function (n) {
                e.stop();
                var i = "marker" + t.charAt(0).toUpperCase() + t.substring(1);
                if ("" != n && n) {
                  if ("marker" == n.type) {
                    var r = n.node.id;
                    return (
                      r || g(n.node, { id: n.id }),
                      void (this.node.style[i] = m(r))
                    );
                  }
                } else this.node.style[i] = "none";
              };
            }
            e.on("snap.util.getattr.marker-end", n("end"))(-1),
              e.on("snap.util.getattr.markerEnd", n("end"))(-1),
              e.on("snap.util.getattr.marker-start", n("start"))(-1),
              e.on("snap.util.getattr.markerStart", n("start"))(-1),
              e.on("snap.util.getattr.marker-mid", n("mid"))(-1),
              e.on("snap.util.getattr.markerMid", n("mid"))(-1),
              e.on("snap.util.attr.marker-end", i("end"))(-1),
              e.on("snap.util.attr.markerEnd", i("end"))(-1),
              e.on("snap.util.attr.marker-start", i("start"))(-1),
              e.on("snap.util.attr.markerStart", i("start"))(-1),
              e.on("snap.util.attr.marker-mid", i("mid"))(-1),
              e.on("snap.util.attr.markerMid", i("mid"))(-1);
          })(),
          e.on("snap.util.getattr.r", function () {
            return "rect" == this.type &&
              g(this.node, "rx") == g(this.node, "ry")
              ? (e.stop(), g(this.node, "rx"))
              : void 0;
          })(-1),
          e.on("snap.util.getattr.text", function () {
            if ("text" == this.type || "tspan" == this.type) {
              e.stop();
              var t = l(this.node);
              return 1 == t.length ? t[0] : t;
            }
          })(-1),
          e.on("snap.util.getattr.#text", function () {
            return this.node.textContent;
          })(-1),
          e.on("snap.util.getattr.fill", function (n) {
            if (!n) {
              e.stop();
              var i = e("snap.util.getattr.fill", this, !0).firstDefined();
              return t(t.deurl(i)) || i;
            }
          })(-1),
          e.on("snap.util.getattr.stroke", function (n) {
            if (!n) {
              e.stop();
              var i = e("snap.util.getattr.stroke", this, !0).firstDefined();
              return t(t.deurl(i)) || i;
            }
          })(-1),
          e.on("snap.util.getattr.viewBox", function () {
            e.stop();
            var n = g(this.node, "viewBox");
            return n
              ? ((n = n.split(y)), t._.box(+n[0], +n[1], +n[2], +n[3]))
              : void 0;
          })(-1),
          e.on("snap.util.getattr.points", function () {
            var t = g(this.node, "points");
            return e.stop(), t ? t.split(y) : void 0;
          })(-1),
          e.on("snap.util.getattr.path", function () {
            var t = g(this.node, "d");
            return e.stop(), t;
          })(-1),
          e.on("snap.util.getattr.class", function () {
            return this.node.className.baseVal;
          })(-1),
          e.on("snap.util.getattr.fontSize", c)(-1),
          e.on("snap.util.getattr.font-size", c)(-1);
      }),
      i.plugin(function (t, e) {
        var n = /\S+/g,
          i = String,
          r = e.prototype;
        (r.addClass = function (t) {
          var e,
            r,
            o,
            s = i(t || "").match(n) || [],
            a = this.node,
            l = a.className.baseVal,
            c = l.match(n) || [];
          if (s.length) {
            for (e = 0; (r = s[e++]); ) ~c.indexOf(r) || c.push(r);
            l != (o = c.join(" ")) && (a.className.baseVal = o);
          }
          return this;
        }),
          (r.removeClass = function (t) {
            var e,
              r,
              o,
              s,
              a = i(t || "").match(n) || [],
              l = this.node,
              c = l.className.baseVal,
              u = c.match(n) || [];
            if (u.length) {
              for (e = 0; (o = a[e++]); ) ~(r = u.indexOf(o)) && u.splice(r, 1);
              c != (s = u.join(" ")) && (l.className.baseVal = s);
            }
            return this;
          }),
          (r.hasClass = function (t) {
            return !!~(this.node.className.baseVal.match(n) || []).indexOf(t);
          }),
          (r.toggleClass = function (t, e) {
            if (null != e) return e ? this.addClass(t) : this.removeClass(t);
            var i,
              r,
              o,
              s,
              a = (t || "").match(n) || [],
              l = this.node,
              c = l.className.baseVal,
              u = c.match(n) || [];
            for (i = 0; (o = a[i++]); )
              ~(r = u.indexOf(o)) ? u.splice(r, 1) : u.push(o);
            return c != (s = u.join(" ")) && (l.className.baseVal = s), this;
          });
      }),
      i.plugin(function () {
        function t(t) {
          return t;
        }
        function n(t) {
          return function (e) {
            return +e.toFixed(3) + t;
          };
        }
        var i = {
            "+": function (t, e) {
              return t + e;
            },
            "-": function (t, e) {
              return t - e;
            },
            "/": function (t, e) {
              return t / e;
            },
            "*": function (t, e) {
              return t * e;
            },
          },
          r = String,
          o = /[a-z]+$/i,
          s = /^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/;
        e.on("snap.util.attr", function (t) {
          var n = r(t).match(s);
          if (n) {
            var a = e.nt(),
              l = a.substring(a.lastIndexOf(".") + 1),
              c = this.attr(l),
              u = {};
            e.stop();
            var h = n[3] || "",
              d = c.match(o),
              f = i[n[1]];
            if (
              (d && d == h
                ? (t = f(parseFloat(c), +n[2]))
                : ((c = this.asPX(l)),
                  (t = f(this.asPX(l), this.asPX(l, n[2] + h)))),
              isNaN(c) || isNaN(t))
            )
              return;
            (u[l] = t), this.attr(u);
          }
        })(-10),
          e.on("snap.util.equal", function (a, l) {
            var c = r(this.attr(a) || ""),
              u = r(l).match(s);
            if (u) {
              e.stop();
              var h = u[3] || "",
                d = c.match(o),
                f = i[u[1]];
              return d && d == h
                ? { from: parseFloat(c), to: f(parseFloat(c), +u[2]), f: n(d) }
                : {
                    from: (c = this.asPX(a)),
                    to: f(c, this.asPX(a, u[2] + h)),
                    f: t,
                  };
            }
          })(-10);
      }),
      i.plugin(function (n, i, r, o) {
        var s = r.prototype,
          a = n.is;
        (s.rect = function (t, e, n, i, r, o) {
          var s;
          return (
            null == o && (o = r),
            a(t, "object") && "[object Object]" == t
              ? (s = t)
              : null != t &&
                ((s = { x: t, y: e, width: n, height: i }),
                null != r && ((s.rx = r), (s.ry = o))),
            this.el("rect", s)
          );
        }),
          (s.circle = function (t, e, n) {
            var i;
            return (
              a(t, "object") && "[object Object]" == t
                ? (i = t)
                : null != t && (i = { cx: t, cy: e, r: n }),
              this.el("circle", i)
            );
          });
        var l = (function () {
          function t() {
            this.parentNode.removeChild(this);
          }
          return function (e, n) {
            var i = o.doc.createElement("img"),
              r = o.doc.body;
            (i.style.cssText = "position:absolute;left:-9999em;top:-9999em"),
              (i.onload = function () {
                n.call(i), (i.onload = i.onerror = null), r.removeChild(i);
              }),
              (i.onerror = t),
              r.appendChild(i),
              (i.src = e);
          };
        })();
        (s.image = function (t, e, i, r, o) {
          var s = this.el("image");
          if (a(t, "object") && "src" in t) s.attr(t);
          else if (null != t) {
            var c = { "xlink:href": t, preserveAspectRatio: "none" };
            null != e && null != i && ((c.x = e), (c.y = i)),
              null != r && null != o
                ? ((c.width = r), (c.height = o))
                : l(t, function () {
                    n._.$(s.node, {
                      width: this.offsetWidth,
                      height: this.offsetHeight,
                    });
                  }),
              n._.$(s.node, c);
          }
          return s;
        }),
          (s.ellipse = function (t, e, n, i) {
            var r;
            return (
              a(t, "object") && "[object Object]" == t
                ? (r = t)
                : null != t && (r = { cx: t, cy: e, rx: n, ry: i }),
              this.el("ellipse", r)
            );
          }),
          (s.path = function (t) {
            var e;
            return (
              a(t, "object") && !a(t, "array") ? (e = t) : t && (e = { d: t }),
              this.el("path", e)
            );
          }),
          (s.group = s.g =
            function (t) {
              var e = this.el("g");
              return (
                1 == arguments.length && t && !t.type
                  ? e.attr(t)
                  : arguments.length &&
                    e.add(Array.prototype.slice.call(arguments, 0)),
                e
              );
            }),
          (s.svg = function (t, e, n, i, r, o, s, l) {
            var c = {};
            return (
              a(t, "object") && null == e
                ? (c = t)
                : (null != t && (c.x = t),
                  null != e && (c.y = e),
                  null != n && (c.width = n),
                  null != i && (c.height = i),
                  null != r &&
                    null != o &&
                    null != s &&
                    null != l &&
                    (c.viewBox = [r, o, s, l])),
              this.el("svg", c)
            );
          }),
          (s.mask = function (t) {
            var e = this.el("mask");
            return (
              1 == arguments.length && t && !t.type
                ? e.attr(t)
                : arguments.length &&
                  e.add(Array.prototype.slice.call(arguments, 0)),
              e
            );
          }),
          (s.ptrn = function (t, e, n, i, r, o, s, l) {
            if (a(t, "object")) var c = t;
            else
              (c = { patternUnits: "userSpaceOnUse" }),
                t && (c.x = t),
                e && (c.y = e),
                null != n && (c.width = n),
                null != i && (c.height = i),
                (c.viewBox =
                  null != r && null != o && null != s && null != l
                    ? [r, o, s, l]
                    : [t || 0, e || 0, n || 0, i || 0]);
            return this.el("pattern", c);
          }),
          (s.use = function (t) {
            return null != t
              ? (t instanceof i &&
                  (t.attr("id") || t.attr({ id: n._.id(t) }),
                  (t = t.attr("id"))),
                "#" == String(t).charAt() && (t = t.substring(1)),
                this.el("use", { "xlink:href": "#" + t }))
              : i.prototype.use.call(this);
          }),
          (s.symbol = function (t, e, n, i) {
            var r = {};
            return (
              null != t &&
                null != e &&
                null != n &&
                null != i &&
                (r.viewBox = [t, e, n, i]),
              this.el("symbol", r)
            );
          }),
          (s.text = function (t, e, n) {
            var i = {};
            return (
              a(t, "object")
                ? (i = t)
                : null != t && (i = { x: t, y: e, text: n || "" }),
              this.el("text", i)
            );
          }),
          (s.line = function (t, e, n, i) {
            var r = {};
            return (
              a(t, "object")
                ? (r = t)
                : null != t && (r = { x1: t, x2: n, y1: e, y2: i }),
              this.el("line", r)
            );
          }),
          (s.polyline = function (t) {
            arguments.length > 1 &&
              (t = Array.prototype.slice.call(arguments, 0));
            var e = {};
            return (
              a(t, "object") && !a(t, "array")
                ? (e = t)
                : null != t && (e = { points: t }),
              this.el("polyline", e)
            );
          }),
          (s.polygon = function (t) {
            arguments.length > 1 &&
              (t = Array.prototype.slice.call(arguments, 0));
            var e = {};
            return (
              a(t, "object") && !a(t, "array")
                ? (e = t)
                : null != t && (e = { points: t }),
              this.el("polygon", e)
            );
          }),
          (function () {
            function i() {
              return this.selectAll("stop");
            }
            function r(t, e) {
              var i = h("stop"),
                r = { offset: +e + "%" };
              (t = n.color(t)),
                (r["stop-color"] = t.hex),
                t.opacity < 1 && (r["stop-opacity"] = t.opacity),
                h(i, r);
              for (var o, s = this.stops(), a = 0; a < s.length; a++) {
                if (parseFloat(s[a].attr("offset")) > e) {
                  this.node.insertBefore(i, s[a].node), (o = !0);
                  break;
                }
              }
              return o || this.node.appendChild(i), this;
            }
            function o() {
              if ("linearGradient" == this.type) {
                var t = h(this.node, "x1") || 0,
                  e = h(this.node, "x2") || 1,
                  i = h(this.node, "y1") || 0,
                  r = h(this.node, "y2") || 0;
                return n._.box(t, i, math.abs(e - t), math.abs(r - i));
              }
              var o = this.node.cx || 0.5,
                s = this.node.cy || 0.5,
                a = this.node.r || 0;
              return n._.box(o - a, s - a, 2 * a, 2 * a);
            }
            function a(t) {
              var i = t,
                r = this.stops();
              if (
                ("string" == typeof t &&
                  (i = e(
                    "snap.util.grad.parse",
                    null,
                    "l(0,0,0,1)" + t
                  ).firstDefined().stops),
                n.is(i, "array"))
              ) {
                for (var o = 0; o < r.length; o++)
                  if (i[o]) {
                    var s = n.color(i[o].color),
                      a = { offset: i[o].offset + "%" };
                    (a["stop-color"] = s.hex),
                      s.opacity < 1 && (a["stop-opacity"] = s.opacity),
                      r[o].attr(a);
                  } else r[o].remove();
                for (o = r.length; o < i.length; o++)
                  this.addStop(i[o].color, i[o].offset);
                return this;
              }
            }
            function l(t, n) {
              var i,
                r = e("snap.util.grad.parse", null, n).firstDefined();
              if (!r) return null;
              r.params.unshift(t),
                (i =
                  "l" == r.type.toLowerCase()
                    ? c.apply(0, r.params)
                    : u.apply(0, r.params)),
                r.type != r.type.toLowerCase() &&
                  h(i.node, { gradientUnits: "userSpaceOnUse" });
              for (var o = r.stops, s = o.length, a = 0; s > a; a++) {
                var l = o[a];
                i.addStop(l.color, l.offset);
              }
              return i;
            }
            function c(t, e, s, l, c) {
              var u = n._.make("linearGradient", t);
              return (
                (u.stops = i),
                (u.addStop = r),
                (u.getBBox = o),
                (u.setStops = a),
                null != e && h(u.node, { x1: e, y1: s, x2: l, y2: c }),
                u
              );
            }
            function u(t, e, s, a, l, c) {
              var u = n._.make("radialGradient", t);
              return (
                (u.stops = i),
                (u.addStop = r),
                (u.getBBox = o),
                null != e && h(u.node, { cx: e, cy: s, r: a }),
                null != l && null != c && h(u.node, { fx: l, fy: c }),
                u
              );
            }
            var h = n._.$;
            (s.gradient = function (t) {
              return l(this.defs, t);
            }),
              (s.gradientLinear = function (t, e, n, i) {
                return c(this.defs, t, e, n, i);
              }),
              (s.gradientRadial = function (t, e, n, i, r) {
                return u(this.defs, t, e, n, i, r);
              }),
              (s.toString = function () {
                var t,
                  e = this.node.ownerDocument,
                  i = e.createDocumentFragment(),
                  r = e.createElement("div"),
                  o = this.node.cloneNode(!0);
                return (
                  i.appendChild(r),
                  r.appendChild(o),
                  n._.$(o, { xmlns: "http://www.w3.org/2000/svg" }),
                  (t = r.innerHTML),
                  i.removeChild(i.firstChild),
                  t
                );
              }),
              (s.toDataURL = function () {
                return t && t.btoa
                  ? "data:image/svg+xml;base64," +
                      btoa(unescape(encodeURIComponent(this)))
                  : void 0;
              }),
              (s.clear = function () {
                for (var t, e = this.node.firstChild; e; )
                  (t = e.nextSibling),
                    "defs" != e.tagName
                      ? e.parentNode.removeChild(e)
                      : s.clear.call({ node: e }),
                    (e = t);
              });
          })();
      }),
      i.plugin(function (t, e) {
        function n(t) {
          var e = (n.ps = n.ps || {});
          return (
            e[t] ? (e[t].sleep = 100) : (e[t] = { sleep: 100 }),
            setTimeout(function () {
              for (var n in e)
                e[M](n) && n != t && (e[n].sleep--, !e[n].sleep && delete e[n]);
            }),
            e[t]
          );
        }
        function i(t, e, n, i) {
          return (
            null == t && (t = e = n = i = 0),
            null == e && ((e = t.y), (n = t.width), (i = t.height), (t = t.x)),
            {
              x: t,
              y: e,
              width: n,
              w: n,
              height: i,
              h: i,
              x2: t + n,
              y2: e + i,
              cx: t + n / 2,
              cy: e + i / 2,
              r1: q.min(n, i) / 2,
              r2: q.max(n, i) / 2,
              r0: q.sqrt(n * n + i * i) / 2,
              path: k(t, e, n, i),
              vb: [t, e, n, i].join(" "),
            }
          );
        }
        function r() {
          return this.join(",").replace(L, "$1");
        }
        function o(t) {
          var e = P(t);
          return (e.toString = r), e;
        }
        function s(t, e, n, i, r, o, s, a, c) {
          return null == c
            ? f(t, e, n, i, r, o, s, a)
            : l(t, e, n, i, r, o, s, a, p(t, e, n, i, r, o, s, a, c));
        }
        function a(n, i) {
          function r(t) {
            return +(+t).toFixed(3);
          }
          return t._.cacher(
            function (t, o, a) {
              t instanceof e && (t = t.attr("d"));
              for (
                var c,
                  u,
                  h,
                  d,
                  f,
                  p = "",
                  g = {},
                  m = 0,
                  v = 0,
                  y = (t = N(t)).length;
                y > v;
                v++
              ) {
                if ("M" == (h = t[v])[0]) (c = +h[1]), (u = +h[2]);
                else {
                  if (
                    m + (d = s(c, u, h[1], h[2], h[3], h[4], h[5], h[6])) >
                    o
                  ) {
                    if (i && !g.start) {
                      if (
                        ((p += [
                          "C" +
                            r(
                              (f = s(
                                c,
                                u,
                                h[1],
                                h[2],
                                h[3],
                                h[4],
                                h[5],
                                h[6],
                                o - m
                              )).start.x
                            ),
                          r(f.start.y),
                          r(f.m.x),
                          r(f.m.y),
                          r(f.x),
                          r(f.y),
                        ]),
                        a)
                      )
                        return p;
                      (g.start = p),
                        (p = [
                          "M" + r(f.x),
                          r(f.y) + "C" + r(f.n.x),
                          r(f.n.y),
                          r(f.end.x),
                          r(f.end.y),
                          r(h[5]),
                          r(h[6]),
                        ].join()),
                        (m += d),
                        (c = +h[5]),
                        (u = +h[6]);
                      continue;
                    }
                    if (!n && !i)
                      return s(c, u, h[1], h[2], h[3], h[4], h[5], h[6], o - m);
                  }
                  (m += d), (c = +h[5]), (u = +h[6]);
                }
                p += h.shift() + h;
              }
              return (
                (g.end = p),
                n ? m : i ? g : l(c, u, h[0], h[1], h[2], h[3], h[4], h[5], 1)
              );
            },
            null,
            t._.clone
          );
        }
        function l(t, e, n, i, r, o, s, a, l) {
          var c = 1 - l,
            u = z(c, 3),
            h = z(c, 2),
            d = l * l,
            f = d * l,
            p = t + 2 * l * (n - t) + d * (r - 2 * n + t),
            g = e + 2 * l * (i - e) + d * (o - 2 * i + e),
            m = n + 2 * l * (r - n) + d * (s - 2 * r + n),
            v = i + 2 * l * (o - i) + d * (a - 2 * o + i);
          return {
            x: u * t + 3 * h * l * n + 3 * c * l * l * r + f * s,
            y: u * e + 3 * h * l * i + 3 * c * l * l * o + f * a,
            m: { x: p, y: g },
            n: { x: m, y: v },
            start: { x: c * t + l * n, y: c * e + l * i },
            end: { x: c * r + l * s, y: c * o + l * a },
            alpha: 90 - (180 * q.atan2(p - m, g - v)) / O,
          };
        }
        function c(e, n, r, o, s, a, l, c) {
          t.is(e, "array") || (e = [e, n, r, o, s, a, l, c]);
          var u = D.apply(null, e);
          return i(u.min.x, u.min.y, u.max.x - u.min.x, u.max.y - u.min.y);
        }
        function u(t, e, n) {
          return (
            e >= t.x && e <= t.x + t.width && n >= t.y && n <= t.y + t.height
          );
        }
        function h(t, e) {
          return (
            (t = i(t)),
            u((e = i(e)), t.x, t.y) ||
              u(e, t.x2, t.y) ||
              u(e, t.x, t.y2) ||
              u(e, t.x2, t.y2) ||
              u(t, e.x, e.y) ||
              u(t, e.x2, e.y) ||
              u(t, e.x, e.y2) ||
              u(t, e.x2, e.y2) ||
              (((t.x < e.x2 && t.x > e.x) || (e.x < t.x2 && e.x > t.x)) &&
                ((t.y < e.y2 && t.y > e.y) || (e.y < t.y2 && e.y > t.y)))
          );
        }
        function d(t, e, n, i, r) {
          return (
            t *
              (t * (-3 * e + 9 * n - 9 * i + 3 * r) + 6 * e - 12 * n + 6 * i) -
            3 * e +
            3 * n
          );
        }
        function f(t, e, n, i, r, o, s, a, l) {
          null == l && (l = 1);
          for (
            var c = (l = l > 1 ? 1 : 0 > l ? 0 : l) / 2,
              u = 12,
              h = [
                -0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699,
                0.7699, -0.9041, 0.9041, -0.9816, 0.9816,
              ],
              f = [
                0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601,
                0.1069, 0.1069, 0.0472, 0.0472,
              ],
              p = 0,
              g = 0;
            u > g;
            g++
          ) {
            var m = c * h[g] + c,
              v = d(m, t, n, r, s),
              y = d(m, e, i, o, a),
              b = v * v + y * y;
            p += f[g] * q.sqrt(b);
          }
          return c * p;
        }
        function p(t, e, n, i, r, o, s, a, l) {
          if (!(0 > l || f(t, e, n, i, r, o, s, a) < l)) {
            var c,
              u = 1,
              h = u / 2,
              d = u - h,
              p = 0.01;
            for (c = f(t, e, n, i, r, o, s, a, d); V(c - l) > p; )
              c = f(t, e, n, i, r, o, s, a, (d += (l > c ? 1 : -1) * (h /= 2)));
            return d;
          }
        }
        function g(t, e, n, i, r, o, s, a) {
          if (
            !(
              R(t, n) < H(r, s) ||
              H(t, n) > R(r, s) ||
              R(e, i) < H(o, a) ||
              H(e, i) > R(o, a)
            )
          ) {
            var l = (t - n) * (o - a) - (e - i) * (r - s);
            if (l) {
              var c =
                  ((t * i - e * n) * (r - s) - (t - n) * (r * a - o * s)) / l,
                u = ((t * i - e * n) * (o - a) - (e - i) * (r * a - o * s)) / l,
                h = +c.toFixed(2),
                d = +u.toFixed(2);
              if (
                !(
                  h < +H(t, n).toFixed(2) ||
                  h > +R(t, n).toFixed(2) ||
                  h < +H(r, s).toFixed(2) ||
                  h > +R(r, s).toFixed(2) ||
                  d < +H(e, i).toFixed(2) ||
                  d > +R(e, i).toFixed(2) ||
                  d < +H(o, a).toFixed(2) ||
                  d > +R(o, a).toFixed(2)
                )
              )
                return { x: c, y: u };
            }
          }
        }
        function m(t, e, n) {
          if (!h(c(t), c(e))) return n ? 0 : [];
          for (
            var i = ~~(f.apply(0, t) / 8),
              r = ~~(f.apply(0, e) / 8),
              o = [],
              s = [],
              a = {},
              u = n ? 0 : [],
              d = 0;
            i + 1 > d;
            d++
          ) {
            var p = l.apply(0, t.concat(d / i));
            o.push({ x: p.x, y: p.y, t: d / i });
          }
          for (d = 0; r + 1 > d; d++)
            (p = l.apply(0, e.concat(d / r))),
              s.push({ x: p.x, y: p.y, t: d / r });
          for (d = 0; i > d; d++)
            for (var m = 0; r > m; m++) {
              var v = o[d],
                y = o[d + 1],
                b = s[m],
                x = s[m + 1],
                w = V(y.x - v.x) < 0.001 ? "y" : "x",
                k = V(x.x - b.x) < 0.001 ? "y" : "x",
                C = g(v.x, v.y, y.x, y.y, b.x, b.y, x.x, x.y);
              if (C) {
                if (a[C.x.toFixed(4)] == C.y.toFixed(4)) continue;
                a[C.x.toFixed(4)] = C.y.toFixed(4);
                var _ = v.t + V((C[w] - v[w]) / (y[w] - v[w])) * (y.t - v.t),
                  S = b.t + V((C[k] - b[k]) / (x[k] - b[k])) * (x.t - b.t);
                _ >= 0 &&
                  1 >= _ &&
                  S >= 0 &&
                  1 >= S &&
                  (n ? u++ : u.push({ x: C.x, y: C.y, t1: _, t2: S }));
              }
            }
          return u;
        }
        function v(t, e) {
          return b(t, e);
        }
        function y(t, e) {
          return b(t, e, 1);
        }
        function b(t, e, n) {
          (t = N(t)), (e = N(e));
          for (
            var i,
              r,
              o,
              s,
              a,
              l,
              c,
              u,
              h,
              d,
              f = n ? 0 : [],
              p = 0,
              g = t.length;
            g > p;
            p++
          ) {
            var v = t[p];
            if ("M" == v[0]) (i = a = v[1]), (r = l = v[2]);
            else {
              "C" == v[0]
                ? ((i = (h = [i, r].concat(v.slice(1)))[6]), (r = h[7]))
                : ((h = [i, r, i, r, a, l, a, l]), (i = a), (r = l));
              for (var y = 0, b = e.length; b > y; y++) {
                var x = e[y];
                if ("M" == x[0]) (o = c = x[1]), (s = u = x[2]);
                else {
                  "C" == x[0]
                    ? ((o = (d = [o, s].concat(x.slice(1)))[6]), (s = d[7]))
                    : ((d = [o, s, o, s, c, u, c, u]), (o = c), (s = u));
                  var w = m(h, d, n);
                  if (n) f += w;
                  else {
                    for (var k = 0, C = w.length; C > k; k++)
                      (w[k].segment1 = p),
                        (w[k].segment2 = y),
                        (w[k].bez1 = h),
                        (w[k].bez2 = d);
                    f = f.concat(w);
                  }
                }
              }
            }
          }
          return f;
        }
        function x(t, e, n) {
          var i = w(t);
          return (
            u(i, e, n) &&
            b(
              t,
              [
                ["M", e, n],
                ["H", i.x2 + 10],
              ],
              1
            ) %
              2 ==
              1
          );
        }
        function w(t) {
          var e = n(t);
          if (e.bbox) return P(e.bbox);
          if (!t) return i();
          for (
            var r, o = 0, s = 0, a = [], l = [], c = 0, u = (t = N(t)).length;
            u > c;
            c++
          )
            if ("M" == (r = t[c])[0])
              (o = r[1]), (s = r[2]), a.push(o), l.push(s);
            else {
              var h = D(o, s, r[1], r[2], r[3], r[4], r[5], r[6]);
              (a = a.concat(h.min.x, h.max.x)),
                (l = l.concat(h.min.y, h.max.y)),
                (o = r[5]),
                (s = r[6]);
            }
          var d = H.apply(0, a),
            f = H.apply(0, l),
            p = i(d, f, R.apply(0, a) - d, R.apply(0, l) - f);
          return (e.bbox = P(p)), p;
        }
        function k(t, e, n, i, o) {
          if (o)
            return [
              ["M", +t + +o, e],
              ["l", n - 2 * o, 0],
              ["a", o, o, 0, 0, 1, o, o],
              ["l", 0, i - 2 * o],
              ["a", o, o, 0, 0, 1, -o, o],
              ["l", 2 * o - n, 0],
              ["a", o, o, 0, 0, 1, -o, -o],
              ["l", 0, 2 * o - i],
              ["a", o, o, 0, 0, 1, o, -o],
              ["z"],
            ];
          var s = [["M", t, e], ["l", n, 0], ["l", 0, i], ["l", -n, 0], ["z"]];
          return (s.toString = r), s;
        }
        function C(t, e, n, i, o) {
          if (
            (null == o && null == i && (i = n),
            (t = +t),
            (e = +e),
            (n = +n),
            (i = +i),
            null != o)
          )
            var s = Math.PI / 180,
              a = t + n * Math.cos(-i * s),
              l = t + n * Math.cos(-o * s),
              c = [
                ["M", a, e + n * Math.sin(-i * s)],
                ["A", n, n, 0, +(o - i > 180), 0, l, e + n * Math.sin(-o * s)],
              ];
          else
            c = [
              ["M", t, e],
              ["m", 0, -i],
              ["a", n, i, 0, 1, 1, 0, 2 * i],
              ["a", n, i, 0, 1, 1, 0, -2 * i],
              ["z"],
            ];
          return (c.toString = r), c;
        }
        function _(e) {
          var i = n(e),
            s = String.prototype.toLowerCase;
          if (i.rel) return o(i.rel);
          (t.is(e, "array") && t.is(e && e[0], "array")) ||
            (e = t.parsePathString(e));
          var a = [],
            l = 0,
            c = 0,
            u = 0,
            h = 0,
            d = 0;
          "M" == e[0][0] &&
            ((u = l = e[0][1]), (h = c = e[0][2]), d++, a.push(["M", l, c]));
          for (var f = d, p = e.length; p > f; f++) {
            var g = (a[f] = []),
              m = e[f];
            if (m[0] != s.call(m[0]))
              switch (((g[0] = s.call(m[0])), g[0])) {
                case "a":
                  (g[1] = m[1]),
                    (g[2] = m[2]),
                    (g[3] = m[3]),
                    (g[4] = m[4]),
                    (g[5] = m[5]),
                    (g[6] = +(m[6] - l).toFixed(3)),
                    (g[7] = +(m[7] - c).toFixed(3));
                  break;
                case "v":
                  g[1] = +(m[1] - c).toFixed(3);
                  break;
                case "m":
                  (u = m[1]), (h = m[2]);
                default:
                  for (var v = 1, y = m.length; y > v; v++)
                    g[v] = +(m[v] - (v % 2 ? l : c)).toFixed(3);
              }
            else {
              (g = a[f] = []), "m" == m[0] && ((u = m[1] + l), (h = m[2] + c));
              for (var b = 0, x = m.length; x > b; b++) a[f][b] = m[b];
            }
            var w = a[f].length;
            switch (a[f][0]) {
              case "z":
                (l = u), (c = h);
                break;
              case "h":
                l += +a[f][w - 1];
                break;
              case "v":
                c += +a[f][w - 1];
                break;
              default:
                (l += +a[f][w - 2]), (c += +a[f][w - 1]);
            }
          }
          return (a.toString = r), (i.rel = o(a)), a;
        }
        function S(e) {
          var i = n(e);
          if (i.abs) return o(i.abs);
          if (
            ((B(e, "array") && B(e && e[0], "array")) ||
              (e = t.parsePathString(e)),
            !e || !e.length)
          )
            return [["M", 0, 0]];
          var s,
            a = [],
            l = 0,
            c = 0,
            u = 0,
            h = 0,
            d = 0;
          "M" == e[0][0] &&
            ((u = l = +e[0][1]), (h = c = +e[0][2]), d++, (a[0] = ["M", l, c]));
          for (
            var f,
              p,
              g =
                3 == e.length &&
                "M" == e[0][0] &&
                "R" == e[1][0].toUpperCase() &&
                "Z" == e[2][0].toUpperCase(),
              m = d,
              v = e.length;
            v > m;
            m++
          ) {
            if ((a.push((f = [])), (s = (p = e[m])[0]) != s.toUpperCase()))
              switch (((f[0] = s.toUpperCase()), f[0])) {
                case "A":
                  (f[1] = p[1]),
                    (f[2] = p[2]),
                    (f[3] = p[3]),
                    (f[4] = p[4]),
                    (f[5] = p[5]),
                    (f[6] = +p[6] + l),
                    (f[7] = +p[7] + c);
                  break;
                case "V":
                  f[1] = +p[1] + c;
                  break;
                case "H":
                  f[1] = +p[1] + l;
                  break;
                case "R":
                  for (
                    var y = [l, c].concat(p.slice(1)), b = 2, x = y.length;
                    x > b;
                    b++
                  )
                    (y[b] = +y[b] + l), (y[++b] = +y[b] + c);
                  a.pop(), (a = a.concat(A(y, g)));
                  break;
                case "O":
                  a.pop(),
                    (y = C(l, c, p[1], p[2])).push(y[0]),
                    (a = a.concat(y));
                  break;
                case "U":
                  a.pop(),
                    (a = a.concat(C(l, c, p[1], p[2], p[3]))),
                    (f = ["U"].concat(a[a.length - 1].slice(-2)));
                  break;
                case "M":
                  (u = +p[1] + l), (h = +p[2] + c);
                default:
                  for (b = 1, x = p.length; x > b; b++)
                    f[b] = +p[b] + (b % 2 ? l : c);
              }
            else if ("R" == s)
              (y = [l, c].concat(p.slice(1))),
                a.pop(),
                (a = a.concat(A(y, g))),
                (f = ["R"].concat(p.slice(-2)));
            else if ("O" == s)
              a.pop(), (y = C(l, c, p[1], p[2])).push(y[0]), (a = a.concat(y));
            else if ("U" == s)
              a.pop(),
                (a = a.concat(C(l, c, p[1], p[2], p[3]))),
                (f = ["U"].concat(a[a.length - 1].slice(-2)));
            else for (var w = 0, k = p.length; k > w; w++) f[w] = p[w];
            if ("O" != (s = s.toUpperCase()))
              switch (f[0]) {
                case "Z":
                  (l = +u), (c = +h);
                  break;
                case "H":
                  l = f[1];
                  break;
                case "V":
                  c = f[1];
                  break;
                case "M":
                  (u = f[f.length - 2]), (h = f[f.length - 1]);
                default:
                  (l = f[f.length - 2]), (c = f[f.length - 1]);
              }
          }
          return (a.toString = r), (i.abs = o(a)), a;
        }
        function E(t, e, n, i) {
          return [t, e, n, i, n, i];
        }
        function T(t, e, n, i, r, o) {
          var s = 1 / 3,
            a = 2 / 3;
          return [
            s * t + a * n,
            s * e + a * i,
            s * r + a * n,
            s * o + a * i,
            r,
            o,
          ];
        }
        function j(e, n, i, r, o, s, a, l, c, u) {
          var h,
            d = (120 * O) / 180,
            f = (O / 180) * (+o || 0),
            p = [],
            g = t._.cacher(function (t, e, n) {
              return {
                x: t * q.cos(n) - e * q.sin(n),
                y: t * q.sin(n) + e * q.cos(n),
              };
            });
          if (!i || !r) return [e, n, l, c, l, c];
          if (u) (_ = u[0]), (S = u[1]), (k = u[2]), (C = u[3]);
          else {
            (e = (h = g(e, n, -f)).x),
              (n = h.y),
              (l = (h = g(l, c, -f)).x),
              (c = h.y);
            var m = (q.cos((O / 180) * o), q.sin((O / 180) * o), (e - l) / 2),
              v = (n - c) / 2,
              y = (m * m) / (i * i) + (v * v) / (r * r);
            y > 1 && ((i *= y = q.sqrt(y)), (r *= y));
            var b = i * i,
              x = r * r,
              w =
                (s == a ? -1 : 1) *
                q.sqrt(
                  V((b * x - b * v * v - x * m * m) / (b * v * v + x * m * m))
                ),
              k = (w * i * v) / r + (e + l) / 2,
              C = (w * -r * m) / i + (n + c) / 2,
              _ = q.asin(((n - C) / r).toFixed(9)),
              S = q.asin(((c - C) / r).toFixed(9));
            0 > (_ = k > e ? O - _ : _) && (_ = 2 * O + _),
              0 > (S = k > l ? O - S : S) && (S = 2 * O + S),
              a && _ > S && (_ -= 2 * O),
              !a && S > _ && (S -= 2 * O);
          }
          var E = S - _;
          if (V(E) > d) {
            var T = S,
              D = l,
              N = c;
            (S = _ + d * (a && S > _ ? 1 : -1)),
              (p = j(
                (l = k + i * q.cos(S)),
                (c = C + r * q.sin(S)),
                i,
                r,
                o,
                0,
                a,
                D,
                N,
                [S, T, k, C]
              ));
          }
          E = S - _;
          var F = q.cos(_),
            A = q.sin(_),
            $ = q.cos(S),
            B = q.sin(S),
            P = q.tan(E / 4),
            M = (4 / 3) * i * P,
            L = (4 / 3) * r * P,
            I = [e, n],
            H = [e + M * A, n - L * F],
            R = [l + M * B, c - L * $],
            z = [l, c];
          if (((H[0] = 2 * I[0] - H[0]), (H[1] = 2 * I[1] - H[1]), u))
            return [H, R, z].concat(p);
          for (
            var W = [],
              U = 0,
              K = (p = [H, R, z].concat(p).join().split(",")).length;
            K > U;
            U++
          )
            W[U] = U % 2 ? g(p[U - 1], p[U], f).y : g(p[U], p[U + 1], f).x;
          return W;
        }
        function D(t, e, n, i, r, o, s, a) {
          for (
            var l, c, u, h, d, f, p, g, m = [], v = [[], []], y = 0;
            2 > y;
            ++y
          )
            if (
              (0 == y
                ? ((c = 6 * t - 12 * n + 6 * r),
                  (l = -3 * t + 9 * n - 9 * r + 3 * s),
                  (u = 3 * n - 3 * t))
                : ((c = 6 * e - 12 * i + 6 * o),
                  (l = -3 * e + 9 * i - 9 * o + 3 * a),
                  (u = 3 * i - 3 * e)),
              V(l) < 1e-12)
            ) {
              if (V(c) < 1e-12) continue;
              (h = -u / c) > 0 && 1 > h && m.push(h);
            } else
              (p = c * c - 4 * u * l),
                (g = q.sqrt(p)),
                0 > p ||
                  ((d = (-c + g) / (2 * l)) > 0 && 1 > d && m.push(d),
                  (f = (-c - g) / (2 * l)) > 0 && 1 > f && m.push(f));
          for (var b, x = m.length, w = x; x--; )
            (b = 1 - (h = m[x])),
              (v[0][x] =
                b * b * b * t +
                3 * b * b * h * n +
                3 * b * h * h * r +
                h * h * h * s),
              (v[1][x] =
                b * b * b * e +
                3 * b * b * h * i +
                3 * b * h * h * o +
                h * h * h * a);
          return (
            (v[0][w] = t),
            (v[1][w] = e),
            (v[0][w + 1] = s),
            (v[1][w + 1] = a),
            (v[0].length = v[1].length = w + 2),
            {
              min: { x: H.apply(0, v[0]), y: H.apply(0, v[1]) },
              max: { x: R.apply(0, v[0]), y: R.apply(0, v[1]) },
            }
          );
        }
        function N(t, e) {
          var i = !e && n(t);
          if (!e && i.curve) return o(i.curve);
          for (
            var r = S(t),
              s = e && S(e),
              a = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
              l = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
              c = function (t, e, n) {
                var i, r;
                if (!t) return ["C", e.x, e.y, e.x, e.y, e.x, e.y];
                switch (
                  (!(t[0] in { T: 1, Q: 1 }) && (e.qx = e.qy = null), t[0])
                ) {
                  case "M":
                    (e.X = t[1]), (e.Y = t[2]);
                    break;
                  case "A":
                    t = ["C"].concat(j.apply(0, [e.x, e.y].concat(t.slice(1))));
                    break;
                  case "S":
                    "C" == n || "S" == n
                      ? ((i = 2 * e.x - e.bx), (r = 2 * e.y - e.by))
                      : ((i = e.x), (r = e.y)),
                      (t = ["C", i, r].concat(t.slice(1)));
                    break;
                  case "T":
                    "Q" == n || "T" == n
                      ? ((e.qx = 2 * e.x - e.qx), (e.qy = 2 * e.y - e.qy))
                      : ((e.qx = e.x), (e.qy = e.y)),
                      (t = ["C"].concat(T(e.x, e.y, e.qx, e.qy, t[1], t[2])));
                    break;
                  case "Q":
                    (e.qx = t[1]),
                      (e.qy = t[2]),
                      (t = ["C"].concat(T(e.x, e.y, t[1], t[2], t[3], t[4])));
                    break;
                  case "L":
                    t = ["C"].concat(E(e.x, e.y, t[1], t[2]));
                    break;
                  case "H":
                    t = ["C"].concat(E(e.x, e.y, t[1], e.y));
                    break;
                  case "V":
                    t = ["C"].concat(E(e.x, e.y, e.x, t[1]));
                    break;
                  case "Z":
                    t = ["C"].concat(E(e.x, e.y, e.X, e.Y));
                }
                return t;
              },
              u = function (t, e) {
                if (t[e].length > 7) {
                  t[e].shift();
                  for (var n = t[e]; n.length; )
                    (d[e] = "A"),
                      s && (f[e] = "A"),
                      t.splice(e++, 0, ["C"].concat(n.splice(0, 6)));
                  t.splice(e, 1), (v = R(r.length, (s && s.length) || 0));
                }
              },
              h = function (t, e, n, i, o) {
                t &&
                  e &&
                  "M" == t[o][0] &&
                  "M" != e[o][0] &&
                  (e.splice(o, 0, ["M", i.x, i.y]),
                  (n.bx = 0),
                  (n.by = 0),
                  (n.x = t[o][1]),
                  (n.y = t[o][2]),
                  (v = R(r.length, (s && s.length) || 0)));
              },
              d = [],
              f = [],
              p = "",
              g = "",
              m = 0,
              v = R(r.length, (s && s.length) || 0);
            v > m;
            m++
          ) {
            r[m] && (p = r[m][0]),
              "C" != p && ((d[m] = p), m && (g = d[m - 1])),
              (r[m] = c(r[m], a, g)),
              "A" != d[m] && "C" == p && (d[m] = "C"),
              u(r, m),
              s &&
                (s[m] && (p = s[m][0]),
                "C" != p && ((f[m] = p), m && (g = f[m - 1])),
                (s[m] = c(s[m], l, g)),
                "A" != f[m] && "C" == p && (f[m] = "C"),
                u(s, m)),
              h(r, s, a, l, m),
              h(s, r, l, a, m);
            var y = r[m],
              b = s && s[m],
              x = y.length,
              w = s && b.length;
            (a.x = y[x - 2]),
              (a.y = y[x - 1]),
              (a.bx = I(y[x - 4]) || a.x),
              (a.by = I(y[x - 3]) || a.y),
              (l.bx = s && (I(b[w - 4]) || l.x)),
              (l.by = s && (I(b[w - 3]) || l.y)),
              (l.x = s && b[w - 2]),
              (l.y = s && b[w - 1]);
          }
          return s || (i.curve = o(r)), s ? [r, s] : r;
        }
        function F(t, e) {
          if (!e) return t;
          var n, i, r, o, s, a, l;
          for (r = 0, s = (t = N(t)).length; s > r; r++)
            for (o = 1, a = (l = t[r]).length; a > o; o += 2)
              (n = e.x(l[o], l[o + 1])),
                (i = e.y(l[o], l[o + 1])),
                (l[o] = n),
                (l[o + 1] = i);
          return t;
        }
        function A(t, e) {
          for (var n = [], i = 0, r = t.length; r - 2 * !e > i; i += 2) {
            var o = [
              { x: +t[i - 2], y: +t[i - 1] },
              { x: +t[i], y: +t[i + 1] },
              { x: +t[i + 2], y: +t[i + 3] },
              { x: +t[i + 4], y: +t[i + 5] },
            ];
            e
              ? i
                ? r - 4 == i
                  ? (o[3] = { x: +t[0], y: +t[1] })
                  : r - 2 == i &&
                    ((o[2] = { x: +t[0], y: +t[1] }),
                    (o[3] = { x: +t[2], y: +t[3] }))
                : (o[0] = { x: +t[r - 2], y: +t[r - 1] })
              : r - 4 == i
              ? (o[3] = o[2])
              : i || (o[0] = { x: +t[i], y: +t[i + 1] }),
              n.push([
                "C",
                (-o[0].x + 6 * o[1].x + o[2].x) / 6,
                (-o[0].y + 6 * o[1].y + o[2].y) / 6,
                (o[1].x + 6 * o[2].x - o[3].x) / 6,
                (o[1].y + 6 * o[2].y - o[3].y) / 6,
                o[2].x,
                o[2].y,
              ]);
          }
          return n;
        }
        var $ = e.prototype,
          B = t.is,
          P = t._.clone,
          M = "hasOwnProperty",
          L = /,?([a-z]),?/gi,
          I = parseFloat,
          q = Math,
          O = q.PI,
          H = q.min,
          R = q.max,
          z = q.pow,
          V = q.abs,
          W = a(1),
          U = a(),
          K = a(0, 1),
          X = t._unit2px,
          G = {
            path: function (t) {
              return t.attr("path");
            },
            circle: function (t) {
              var e = X(t);
              return C(e.cx, e.cy, e.r);
            },
            ellipse: function (t) {
              var e = X(t);
              return C(e.cx || 0, e.cy || 0, e.rx, e.ry);
            },
            rect: function (t) {
              var e = X(t);
              return k(e.x || 0, e.y || 0, e.width, e.height, e.rx, e.ry);
            },
            image: function (t) {
              var e = X(t);
              return k(e.x || 0, e.y || 0, e.width, e.height);
            },
            line: function (t) {
              return (
                "M" +
                [
                  t.attr("x1") || 0,
                  t.attr("y1") || 0,
                  t.attr("x2"),
                  t.attr("y2"),
                ]
              );
            },
            polyline: function (t) {
              return "M" + t.attr("points");
            },
            polygon: function (t) {
              return "M" + t.attr("points") + "z";
            },
            deflt: function (t) {
              var e = t.node.getBBox();
              return k(e.x, e.y, e.width, e.height);
            },
          };
        (t.path = n),
          (t.path.getTotalLength = W),
          (t.path.getPointAtLength = U),
          (t.path.getSubpath = function (t, e, n) {
            if (this.getTotalLength(t) - n < 1e-6) return K(t, e).end;
            var i = K(t, n, 1);
            return e ? K(i, e).end : i;
          }),
          ($.getTotalLength = function () {
            return this.node.getTotalLength
              ? this.node.getTotalLength()
              : void 0;
          }),
          ($.getPointAtLength = function (t) {
            return U(this.attr("d"), t);
          }),
          ($.getSubpath = function (e, n) {
            return t.path.getSubpath(this.attr("d"), e, n);
          }),
          (t._.box = i),
          (t.path.findDotsAtSegment = l),
          (t.path.bezierBBox = c),
          (t.path.isPointInsideBBox = u),
          (t.closest = function (e, n, r, o) {
            for (
              var s = 100,
                a = i(e - s / 2, n - s / 2, s, s),
                l = [],
                c = r[0].hasOwnProperty("x")
                  ? function (t) {
                      return { x: r[t].x, y: r[t].y };
                    }
                  : function (t) {
                      return { x: r[t], y: o[t] };
                    },
                h = 0;
              1e6 >= s && !h;

            ) {
              for (var d = 0, f = r.length; f > d; d++) {
                var p = c(d);
                if (u(a, p.x, p.y)) {
                  h++, l.push(p);
                  break;
                }
              }
              h || (a = i(e - (s *= 2) / 2, n - s / 2, s, s));
            }
            if (1e6 != s) {
              var g,
                m = 1 / 0;
              for (d = 0, f = l.length; f > d; d++) {
                var v = t.len(e, n, l[d].x, l[d].y);
                m > v && ((m = v), (l[d].len = v), (g = l[d]));
              }
              return g;
            }
          }),
          (t.path.isBBoxIntersect = h),
          (t.path.intersection = v),
          (t.path.intersectionNumber = y),
          (t.path.isPointInside = x),
          (t.path.getBBox = w),
          (t.path.get = G),
          (t.path.toRelative = _),
          (t.path.toAbsolute = S),
          (t.path.toCubic = N),
          (t.path.map = F),
          (t.path.toString = r),
          (t.path.clone = o);
      }),
      i.plugin(function (t) {
        var i = Math.max,
          r = Math.min,
          o = function (t) {
            if (
              ((this.items = []),
              (this.bindings = {}),
              (this.length = 0),
              (this.type = "set"),
              t)
            )
              for (var e = 0, n = t.length; n > e; e++)
                t[e] &&
                  ((this[this.items.length] = this.items[this.items.length] =
                    t[e]),
                  this.length++);
          },
          s = o.prototype;
        (s.push = function () {
          for (var t, e, n = 0, i = arguments.length; i > n; n++)
            (t = arguments[n]) &&
              ((this[(e = this.items.length)] = this.items[e] = t),
              this.length++);
          return this;
        }),
          (s.pop = function () {
            return this.length && delete this[this.length--], this.items.pop();
          }),
          (s.forEach = function (t, e) {
            for (var n = 0, i = this.items.length; i > n; n++)
              if (!1 === t.call(e, this.items[n], n)) return this;
            return this;
          }),
          (s.animate = function (i, r, o, s) {
            "function" != typeof o || o.length || ((s = o), (o = n.linear)),
              i instanceof t._.Animation &&
                ((s = i.callback), (o = i.easing), (r = o.dur), (i = i.attr));
            var a = arguments;
            if (t.is(i, "array") && t.is(a[a.length - 1], "array")) var l = !0;
            var c,
              u = function () {
                c ? (this.b = c) : (c = this.b);
              },
              h = 0,
              d = this,
              f =
                s &&
                function () {
                  ++h == d.length && s.call(this);
                };
            return this.forEach(function (t, n) {
              e.once("snap.animcreated." + t.id, u),
                l ? a[n] && t.animate.apply(t, a[n]) : t.animate(i, r, o, f);
            });
          }),
          (s.remove = function () {
            for (; this.length; ) this.pop().remove();
            return this;
          }),
          (s.bind = function (t, e, n) {
            var i = {};
            if ("function" == typeof e) this.bindings[t] = e;
            else {
              var r = n || t;
              this.bindings[t] = function (t) {
                (i[r] = t), e.attr(i);
              };
            }
            return this;
          }),
          (s.attr = function (t) {
            var e = {};
            for (var n in t)
              this.bindings[n] ? this.bindings[n](t[n]) : (e[n] = t[n]);
            for (var i = 0, r = this.items.length; r > i; i++)
              this.items[i].attr(e);
            return this;
          }),
          (s.clear = function () {
            for (; this.length; ) this.pop();
          }),
          (s.splice = function (t, e) {
            (t = 0 > t ? i(this.length + t, 0) : t),
              (e = i(0, r(this.length - t, e)));
            var n,
              s = [],
              a = [],
              l = [];
            for (n = 2; n < arguments.length; n++) l.push(arguments[n]);
            for (n = 0; e > n; n++) a.push(this[t + n]);
            for (; n < this.length - t; n++) s.push(this[t + n]);
            var c = l.length;
            for (n = 0; n < c + s.length; n++)
              this.items[t + n] = this[t + n] = c > n ? l[n] : s[n - c];
            for (n = this.items.length = this.length -= e - c; this[n]; )
              delete this[n++];
            return new o(a);
          }),
          (s.exclude = function (t) {
            for (var e = 0, n = this.length; n > e; e++)
              if (this[e] == t) return this.splice(e, 1), !0;
            return !1;
          }),
          (s.insertAfter = function (t) {
            for (var e = this.items.length; e--; ) this.items[e].insertAfter(t);
            return this;
          }),
          (s.getBBox = function () {
            for (
              var t = [], e = [], n = [], o = [], s = this.items.length;
              s--;

            )
              if (!this.items[s].removed) {
                var a = this.items[s].getBBox();
                t.push(a.x),
                  e.push(a.y),
                  n.push(a.x + a.width),
                  o.push(a.y + a.height);
              }
            return {
              x: (t = r.apply(0, t)),
              y: (e = r.apply(0, e)),
              x2: (n = i.apply(0, n)),
              y2: (o = i.apply(0, o)),
              width: n - t,
              height: o - e,
              cx: t + (n - t) / 2,
              cy: e + (o - e) / 2,
            };
          }),
          (s.clone = function (t) {
            t = new o();
            for (var e = 0, n = this.items.length; n > e; e++)
              t.push(this.items[e].clone());
            return t;
          }),
          (s.toString = function () {
            return "Snap\u2018s set";
          }),
          (s.type = "set"),
          (t.Set = o),
          (t.set = function () {
            var t = new o();
            return (
              arguments.length &&
                t.push.apply(t, Array.prototype.slice.call(arguments, 0)),
              t
            );
          });
      }),
      i.plugin(function (t, n) {
        function i(t) {
          var e = t[0];
          switch (e.toLowerCase()) {
            case "t":
              return [e, 0, 0];
            case "m":
              return [e, 1, 0, 0, 1, 0, 0];
            case "r":
              return 4 == t.length ? [e, 0, t[2], t[3]] : [e, 0];
            case "s":
              return 5 == t.length
                ? [e, 1, 1, t[3], t[4]]
                : 3 == t.length
                ? [e, 1, 1]
                : [e, 1];
          }
        }
        function r(e, n, r) {
          (e = e || new t.Matrix()),
            (n = n || new t.Matrix()),
            (e = t.parseTransformString(e.toTransformString()) || []),
            (n = t.parseTransformString(n.toTransformString()) || []);
          for (
            var o,
              s,
              a,
              l,
              h = Math.max(e.length, n.length),
              d = [],
              f = [],
              p = 0;
            h > p;
            p++
          ) {
            if (
              ((a = e[p] || i(n[p])),
              (l = n[p] || i(a)),
              a[0] != l[0] ||
                ("r" == a[0].toLowerCase() && (a[2] != l[2] || a[3] != l[3])) ||
                ("s" == a[0].toLowerCase() && (a[3] != l[3] || a[4] != l[4])))
            ) {
              (e = t._.transform2matrix(e, r())),
                (n = t._.transform2matrix(n, r())),
                (d = [["m", e.a, e.b, e.c, e.d, e.e, e.f]]),
                (f = [["m", n.a, n.b, n.c, n.d, n.e, n.f]]);
              break;
            }
            for (
              d[p] = [], f[p] = [], o = 0, s = Math.max(a.length, l.length);
              s > o;
              o++
            )
              o in a && (d[p][o] = a[o]), o in l && (f[p][o] = l[o]);
          }
          return { from: u(d), to: u(f), f: c(d) };
        }
        function o(t) {
          return t;
        }
        function s(t) {
          return function (e) {
            return +e.toFixed(3) + t;
          };
        }
        function a(t) {
          return t.join(" ");
        }
        function l(e) {
          return t.rgb(e[0], e[1], e[2], e[3]);
        }
        function c(t) {
          var e,
            n,
            i,
            r,
            o,
            s,
            a = 0,
            l = [];
          for (e = 0, n = t.length; n > e; e++) {
            for (
              o = "[", s = ['"' + t[e][0] + '"'], i = 1, r = t[e].length;
              r > i;
              i++
            )
              s[i] = "val[" + a++ + "]";
            (o += s + "]"), (l[e] = o);
          }
          return Function("val", "return Snap.path.toString.call([" + l + "])");
        }
        function u(t) {
          for (var e = [], n = 0, i = t.length; i > n; n++)
            for (var r = 1, o = t[n].length; o > r; r++) e.push(t[n][r]);
          return e;
        }
        function h(t) {
          return isFinite(t);
        }
        function d(e, n) {
          return (
            !(!t.is(e, "array") || !t.is(n, "array")) &&
            e.toString() == n.toString()
          );
        }
        var f = {},
          p = /[%a-z]+$/i,
          g = String;
        (f.stroke = f.fill = "colour"),
          (n.prototype.equal = function (t, n) {
            return e("snap.util.equal", this, t, n).firstDefined();
          }),
          e.on("snap.util.equal", function (e, n) {
            var i,
              m,
              v = g(this.attr(e) || ""),
              y = this;
            if ("colour" == f[e])
              return (
                (i = t.color(v)),
                (m = t.color(n)),
                {
                  from: [i.r, i.g, i.b, i.opacity],
                  to: [m.r, m.g, m.b, m.opacity],
                  f: l,
                }
              );
            if ("viewBox" == e)
              return {
                from: (i = this.attr(e).vb.split(" ").map(Number)),
                to: (m = n.split(" ").map(Number)),
                f: a,
              };
            if (
              "transform" == e ||
              "gradientTransform" == e ||
              "patternTransform" == e
            )
              return (
                "string" == typeof n && (n = g(n).replace(/\.{3}|\u2026/g, v)),
                r(
                  (v = this.matrix),
                  (n = t._.rgTransform.test(n)
                    ? t._.transform2matrix(n, this.getBBox())
                    : t._.transform2matrix(
                        t._.svgTransform2string(n),
                        this.getBBox()
                      )),
                  function () {
                    return y.getBBox(1);
                  }
                )
              );
            if ("d" == e || "path" == e)
              return {
                from: u((i = t.path.toCubic(v, n))[0]),
                to: u(i[1]),
                f: c(i[0]),
              };
            if ("points" == e)
              return {
                from: (i = g(v).split(t._.separator)),
                to: (m = g(n).split(t._.separator)),
                f: function (t) {
                  return t;
                },
              };
            if (h(v) && h(n))
              return { from: parseFloat(v), to: parseFloat(n), f: o };
            var b = v.match(p),
              x = g(n).match(p);
            return b && d(b, x)
              ? { from: parseFloat(v), to: parseFloat(n), f: s(b) }
              : { from: this.asPX(e), to: this.asPX(e, n), f: o };
          });
      }),
      i.plugin(function (t, n, i, r) {
        for (
          var o = n.prototype,
            s = "hasOwnProperty",
            a = ("createTouch" in r.doc),
            l = [
              "click",
              "dblclick",
              "mousedown",
              "mousemove",
              "mouseout",
              "mouseover",
              "mouseup",
              "touchstart",
              "touchmove",
              "touchend",
              "touchcancel",
            ],
            c = {
              mousedown: "touchstart",
              mousemove: "touchmove",
              mouseup: "touchend",
            },
            u = function (t, e) {
              var n = "y" == t ? "scrollTop" : "scrollLeft",
                i = e && e.node ? e.node.ownerDocument : r.doc;
              return i[(n in i.documentElement) ? "documentElement" : "body"][
                n
              ];
            },
            h = function () {
              return this.originalEvent.preventDefault();
            },
            d = function () {
              return this.originalEvent.stopPropagation();
            },
            f = function (t, e, n, i) {
              var r = a && c[e] ? c[e] : e,
                o = function (r) {
                  var o = u("y", i),
                    l = u("x", i);
                  if (a && c[s](e))
                    for (
                      var f = 0, p = r.targetTouches && r.targetTouches.length;
                      p > f;
                      f++
                    )
                      if (
                        r.targetTouches[f].target == t ||
                        t.contains(r.targetTouches[f].target)
                      ) {
                        var g = r;
                        ((r = r.targetTouches[f]).originalEvent = g),
                          (r.preventDefault = h),
                          (r.stopPropagation = d);
                        break;
                      }
                  var m = r.clientX + l,
                    v = r.clientY + o;
                  return n.call(i, r, m, v);
                };
              return (
                e !== r && t.addEventListener(e, o, !1),
                t.addEventListener(r, o, !1),
                function () {
                  return (
                    e !== r && t.removeEventListener(e, o, !1),
                    t.removeEventListener(r, o, !1),
                    !0
                  );
                }
              );
            },
            p = [],
            g = function (t) {
              for (
                var n,
                  i = t.clientX,
                  r = t.clientY,
                  o = u("y"),
                  s = u("x"),
                  l = p.length;
                l--;

              ) {
                if (((n = p[l]), a)) {
                  for (var c, h = t.touches && t.touches.length; h--; )
                    if (
                      (c = t.touches[h]).identifier == n.el._drag.id ||
                      n.el.node.contains(c.target)
                    ) {
                      (i = c.clientX),
                        (r = c.clientY),
                        (t.originalEvent
                          ? t.originalEvent
                          : t
                        ).preventDefault();
                      break;
                    }
                } else t.preventDefault();
                var d = n.el.node;
                d.nextSibling,
                  d.parentNode,
                  d.style.display,
                  (i += s),
                  (r += o),
                  e(
                    "snap.drag.move." + n.el.id,
                    n.move_scope || n.el,
                    i - n.el._drag.x,
                    r - n.el._drag.y,
                    i,
                    r,
                    t
                  );
              }
            },
            m = function (n) {
              t.unmousemove(g).unmouseup(m);
              for (var i, r = p.length; r--; )
                ((i = p[r]).el._drag = {}),
                  e(
                    "snap.drag.end." + i.el.id,
                    i.end_scope || i.start_scope || i.move_scope || i.el,
                    n
                  ),
                  e.off("snap.drag.*." + i.el.id);
              p = [];
            },
            v = l.length;
          v--;

        )
          !(function (e) {
            (t[e] = o[e] =
              function (n, i) {
                if (t.is(n, "function"))
                  (this.events = this.events || []),
                    this.events.push({
                      name: e,
                      f: n,
                      unbind: f(this.node || document, e, n, i || this),
                    });
                else
                  for (var r = 0, o = this.events.length; o > r; r++)
                    if (this.events[r].name == e)
                      try {
                        this.events[r].f.call(this);
                      } catch (s) {}
                return this;
              }),
              (t["un" + e] = o["un" + e] =
                function (t) {
                  for (var n = this.events || [], i = n.length; i--; )
                    if (n[i].name == e && (n[i].f == t || !t))
                      return (
                        n[i].unbind(),
                        n.splice(i, 1),
                        !n.length && delete this.events,
                        this
                      );
                  return this;
                });
          })(l[v]);
        (o.hover = function (t, e, n, i) {
          return this.mouseover(t, n).mouseout(e, i || n);
        }),
          (o.unhover = function (t, e) {
            return this.unmouseover(t).unmouseout(e);
          });
        var y = [];
        (o.drag = function (n, i, r, o, s, a) {
          function l(l, c, u) {
            (l.originalEvent || l).preventDefault(),
              (h._drag.x = c),
              (h._drag.y = u),
              (h._drag.id = l.identifier),
              !p.length && t.mousemove(g).mouseup(m),
              p.push({ el: h, move_scope: o, start_scope: s, end_scope: a }),
              i && e.on("snap.drag.start." + h.id, i),
              n && e.on("snap.drag.move." + h.id, n),
              r && e.on("snap.drag.end." + h.id, r),
              e("snap.drag.start." + h.id, s || o || h, c, u, l);
          }
          function c(t, n, i) {
            e("snap.draginit." + h.id, h, t, n, i);
          }
          var u,
            h = this;
          return arguments.length
            ? (e.on("snap.draginit." + h.id, l),
              (h._drag = {}),
              y.push({ el: h, start: l, init: c }),
              h.mousedown(c),
              h)
            : h.drag(
                function (t, e) {
                  this.attr({ transform: u + (u ? "T" : "t") + [t, e] });
                },
                function () {
                  u = this.transform().local;
                }
              );
        }),
          (o.undrag = function () {
            for (var n = y.length; n--; )
              y[n].el == this &&
                (this.unmousedown(y[n].init),
                y.splice(n, 1),
                e.unbind("snap.drag.*." + this.id),
                e.unbind("snap.draginit." + this.id));
            return !y.length && t.unmousemove(g).unmouseup(m), this;
          });
      }),
      i.plugin(function (t, n, i) {
        var r = (n.prototype, i.prototype),
          o = /^\s*url\((.+)\)/,
          s = String,
          a = t._.$;
        (t.filter = {}),
          (r.filter = function (e) {
            var i = this;
            "svg" != i.type && (i = i.paper);
            var r = t.parse(s(e)),
              o = t._.id(),
              l = (i.node.offsetWidth, i.node.offsetHeight, a("filter"));
            return (
              a(l, { id: o, filterUnits: "userSpaceOnUse" }),
              l.appendChild(r.node),
              i.defs.appendChild(l),
              new n(l)
            );
          }),
          e.on("snap.util.getattr.filter", function () {
            e.stop();
            var n = a(this.node, "filter");
            if (n) {
              var i = s(n).match(o);
              return i && t.select(i[1]);
            }
          }),
          e.on("snap.util.attr.filter", function (i) {
            if (i instanceof n && "filter" == i.type) {
              e.stop();
              var r = i.node.id;
              r || (a(i.node, { id: i.id }), (r = i.id)),
                a(this.node, { filter: t.url(r) });
            }
            (i && "none" != i) ||
              (e.stop(), this.node.removeAttribute("filter"));
          }),
          (t.filter.blur = function (e, n) {
            null == e && (e = 2);
            var i = null == n ? e : [e, n];
            return t.format('<feGaussianBlur stdDeviation="{def}"/>', {
              def: i,
            });
          }),
          (t.filter.blur.toString = function () {
            return this();
          }),
          (t.filter.shadow = function (e, n, i, r, o) {
            return (
              null == o &&
                (null == r
                  ? ((o = i), (i = 4), (r = "#000"))
                  : ((o = r), (r = i), (i = 4))),
              null == i && (i = 4),
              null == o && (o = 1),
              null == e && ((e = 0), (n = 2)),
              null == n && (n = e),
              (r = t.color(r)),
              t.format(
                '<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>',
                { color: r, dx: e, dy: n, blur: i, opacity: o }
              )
            );
          }),
          (t.filter.shadow.toString = function () {
            return this();
          }),
          (t.filter.grayscale = function (e) {
            return (
              null == e && (e = 1),
              t.format(
                '<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>',
                {
                  a: 0.2126 + 0.7874 * (1 - e),
                  b: 0.7152 - 0.7152 * (1 - e),
                  c: 0.0722 - 0.0722 * (1 - e),
                  d: 0.2126 - 0.2126 * (1 - e),
                  e: 0.7152 + 0.2848 * (1 - e),
                  f: 0.0722 - 0.0722 * (1 - e),
                  g: 0.2126 - 0.2126 * (1 - e),
                  h: 0.0722 + 0.9278 * (1 - e),
                }
              )
            );
          }),
          (t.filter.grayscale.toString = function () {
            return this();
          }),
          (t.filter.sepia = function (e) {
            return (
              null == e && (e = 1),
              t.format(
                '<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>',
                {
                  a: 0.393 + 0.607 * (1 - e),
                  b: 0.769 - 0.769 * (1 - e),
                  c: 0.189 - 0.189 * (1 - e),
                  d: 0.349 - 0.349 * (1 - e),
                  e: 0.686 + 0.314 * (1 - e),
                  f: 0.168 - 0.168 * (1 - e),
                  g: 0.272 - 0.272 * (1 - e),
                  h: 0.534 - 0.534 * (1 - e),
                  i: 0.131 + 0.869 * (1 - e),
                }
              )
            );
          }),
          (t.filter.sepia.toString = function () {
            return this();
          }),
          (t.filter.saturate = function (e) {
            return (
              null == e && (e = 1),
              t.format('<feColorMatrix type="saturate" values="{amount}"/>', {
                amount: 1 - e,
              })
            );
          }),
          (t.filter.saturate.toString = function () {
            return this();
          }),
          (t.filter.hueRotate = function (e) {
            return (
              (e = e || 0),
              t.format('<feColorMatrix type="hueRotate" values="{angle}"/>', {
                angle: e,
              })
            );
          }),
          (t.filter.hueRotate.toString = function () {
            return this();
          }),
          (t.filter.invert = function (e) {
            return (
              null == e && (e = 1),
              t.format(
                '<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>',
                { amount: e, amount2: 1 - e }
              )
            );
          }),
          (t.filter.invert.toString = function () {
            return this();
          }),
          (t.filter.brightness = function (e) {
            return (
              null == e && (e = 1),
              t.format(
                '<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>',
                { amount: e }
              )
            );
          }),
          (t.filter.brightness.toString = function () {
            return this();
          }),
          (t.filter.contrast = function (e) {
            return (
              null == e && (e = 1),
              t.format(
                '<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>',
                { amount: e, amount2: 0.5 - e / 2 }
              )
            );
          }),
          (t.filter.contrast.toString = function () {
            return this();
          });
      }),
      i.plugin(function (t, e) {
        var n = t._.box,
          i = t.is,
          r = /^[^a-z]*([tbmlrc])/i,
          o = function () {
            return "T" + this.dx + "," + this.dy;
          };
        (e.prototype.getAlign = function (t, e) {
          null == e && i(t, "string") && ((e = t), (t = null));
          var s = (t = t || this.paper).getBBox ? t.getBBox() : n(t),
            a = this.getBBox(),
            l = {};
          switch ((e = (e = e && e.match(r)) ? e[1].toLowerCase() : "c")) {
            case "t":
              (l.dx = 0), (l.dy = s.y - a.y);
              break;
            case "b":
              (l.dx = 0), (l.dy = s.y2 - a.y2);
              break;
            case "m":
              (l.dx = 0), (l.dy = s.cy - a.cy);
              break;
            case "l":
              (l.dx = s.x - a.x), (l.dy = 0);
              break;
            case "r":
              (l.dx = s.x2 - a.x2), (l.dy = 0);
              break;
            default:
              (l.dx = s.cx - a.cx), (l.dy = 0);
          }
          return (l.toString = o), l;
        }),
          (e.prototype.align = function (t, e) {
            return this.transform("..." + this.getAlign(t, e));
          });
      }),
      i.plugin(function (e) {
        function n(t) {
          t = t.split(/(?=#)/);
          var e = new String(t[5]);
          return (
            (e[50] = t[0]),
            (e[100] = t[1]),
            (e[200] = t[2]),
            (e[300] = t[3]),
            (e[400] = t[4]),
            (e[500] = t[5]),
            (e[600] = t[6]),
            (e[700] = t[7]),
            (e[800] = t[8]),
            (e[900] = t[9]),
            t[10] &&
              ((e.A100 = t[10]),
              (e.A200 = t[11]),
              (e.A400 = t[12]),
              (e.A700 = t[13])),
            e
          );
        }
        var i =
            "#ffebee#ffcdd2#ef9a9a#e57373#ef5350#f44336#e53935#d32f2f#c62828#b71c1c#ff8a80#ff5252#ff1744#d50000",
          r =
            "#FCE4EC#F8BBD0#F48FB1#F06292#EC407A#E91E63#D81B60#C2185B#AD1457#880E4F#FF80AB#FF4081#F50057#C51162",
          o =
            "#F3E5F5#E1BEE7#CE93D8#BA68C8#AB47BC#9C27B0#8E24AA#7B1FA2#6A1B9A#4A148C#EA80FC#E040FB#D500F9#AA00FF",
          s =
            "#EDE7F6#D1C4E9#B39DDB#9575CD#7E57C2#673AB7#5E35B1#512DA8#4527A0#311B92#B388FF#7C4DFF#651FFF#6200EA",
          a =
            "#E8EAF6#C5CAE9#9FA8DA#7986CB#5C6BC0#3F51B5#3949AB#303F9F#283593#1A237E#8C9EFF#536DFE#3D5AFE#304FFE",
          l =
            "#E3F2FD#BBDEFB#90CAF9#64B5F6#64B5F6#2196F3#1E88E5#1976D2#1565C0#0D47A1#82B1FF#448AFF#2979FF#2962FF",
          c =
            "#E1F5FE#B3E5FC#81D4FA#4FC3F7#29B6F6#03A9F4#039BE5#0288D1#0277BD#01579B#80D8FF#40C4FF#00B0FF#0091EA",
          u =
            "#E0F7FA#B2EBF2#80DEEA#4DD0E1#26C6DA#00BCD4#00ACC1#0097A7#00838F#006064#84FFFF#18FFFF#00E5FF#00B8D4",
          h =
            "#E0F2F1#B2DFDB#80CBC4#4DB6AC#26A69A#009688#00897B#00796B#00695C#004D40#A7FFEB#64FFDA#1DE9B6#00BFA5",
          d =
            "#E8F5E9#C8E6C9#A5D6A7#81C784#66BB6A#4CAF50#43A047#388E3C#2E7D32#1B5E20#B9F6CA#69F0AE#00E676#00C853",
          f =
            "#F1F8E9#DCEDC8#C5E1A5#AED581#9CCC65#8BC34A#7CB342#689F38#558B2F#33691E#CCFF90#B2FF59#76FF03#64DD17",
          p =
            "#F9FBE7#F0F4C3#E6EE9C#DCE775#D4E157#CDDC39#C0CA33#AFB42B#9E9D24#827717#F4FF81#EEFF41#C6FF00#AEEA00",
          g =
            "#FFFDE7#FFF9C4#FFF59D#FFF176#FFEE58#FFEB3B#FDD835#FBC02D#F9A825#F57F17#FFFF8D#FFFF00#FFEA00#FFD600",
          m =
            "#FFF8E1#FFECB3#FFE082#FFD54F#FFCA28#FFC107#FFB300#FFA000#FF8F00#FF6F00#FFE57F#FFD740#FFC400#FFAB00",
          v =
            "#FFF3E0#FFE0B2#FFCC80#FFB74D#FFA726#FF9800#FB8C00#F57C00#EF6C00#E65100#FFD180#FFAB40#FF9100#FF6D00",
          y =
            "#FBE9E7#FFCCBC#FFAB91#FF8A65#FF7043#FF5722#F4511E#E64A19#D84315#BF360C#FF9E80#FF6E40#FF3D00#DD2C00",
          b =
            "#EFEBE9#D7CCC8#BCAAA4#A1887F#8D6E63#795548#6D4C41#5D4037#4E342E#3E2723",
          x =
            "#FAFAFA#F5F5F5#EEEEEE#E0E0E0#BDBDBD#9E9E9E#757575#616161#424242#212121",
          w =
            "#ECEFF1#CFD8DC#B0BEC5#90A4AE#78909C#607D8B#546E7A#455A64#37474F#263238";
        (e.mui = {}),
          (e.flat = {}),
          (e.mui.red = n(i)),
          (e.mui.pink = n(r)),
          (e.mui.purple = n(o)),
          (e.mui.deeppurple = n(s)),
          (e.mui.indigo = n(a)),
          (e.mui.blue = n(l)),
          (e.mui.lightblue = n(c)),
          (e.mui.cyan = n(u)),
          (e.mui.teal = n(h)),
          (e.mui.green = n(d)),
          (e.mui.lightgreen = n(f)),
          (e.mui.lime = n(p)),
          (e.mui.yellow = n(g)),
          (e.mui.amber = n(m)),
          (e.mui.orange = n(v)),
          (e.mui.deeporange = n(y)),
          (e.mui.brown = n(b)),
          (e.mui.grey = n(x)),
          (e.mui.bluegrey = n(w)),
          (e.flat.turquoise = "#1abc9c"),
          (e.flat.greensea = "#16a085"),
          (e.flat.sunflower = "#f1c40f"),
          (e.flat.orange = "#f39c12"),
          (e.flat.emerland = "#2ecc71"),
          (e.flat.nephritis = "#27ae60"),
          (e.flat.carrot = "#e67e22"),
          (e.flat.pumpkin = "#d35400"),
          (e.flat.peterriver = "#3498db"),
          (e.flat.belizehole = "#2980b9"),
          (e.flat.alizarin = "#e74c3c"),
          (e.flat.pomegranate = "#c0392b"),
          (e.flat.amethyst = "#9b59b6"),
          (e.flat.wisteria = "#8e44ad"),
          (e.flat.clouds = "#ecf0f1"),
          (e.flat.silver = "#bdc3c7"),
          (e.flat.wetasphalt = "#34495e"),
          (e.flat.midnightblue = "#2c3e50"),
          (e.flat.concrete = "#95a5a6"),
          (e.flat.asbestos = "#7f8c8d"),
          (e.importMUIColors = function () {
            for (var n in e.mui) e.mui.hasOwnProperty(n) && (t[n] = e.mui[n]);
          });
      }),
      i
    );
  });
var mcId = 0,
  mcUpdating = !1,
  mcScores = {},
  mcEleId = null,
  mcEle = null,
  MqL = 890,
  qsInProgress = !1;
$(document).ready(function () {
  $("#appCbShow").click(function () {
    setTarget("cd-quicksearch"), showCBuilder();
  });
});
