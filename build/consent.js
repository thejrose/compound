// Cookie consent + Google Analytics (GA4).
// Analytics only loads after the visitor accepts. The choice is stored in
// localStorage and can be changed from any element with [data-cookie-settings].
(function () {
  var GA_ID = document.documentElement.getAttribute('data-ga-id');
  var KEY = 'cp-consent'; // 'granted' | 'denied'
  var loaded = false;

  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  function loadAnalytics() {
    if (loaded || !GA_ID) return;
    loaded = true;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
  }

  function clearGaCookies() {
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (/^_ga/.test(name)) {
        var host = location.hostname;
        ['', host, '.' + host, '.' + host.split('.').slice(-2).join('.')].forEach(function (d) {
          document.cookie = name + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
        });
      }
    });
  }

  var banner;
  function hideBanner() { if (banner) { banner.remove(); banner = null; } }
  function showBanner() {
    if (banner) return;
    banner = document.createElement('div');
    banner.className = 'cp-consent';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie choices');
    banner.innerHTML =
      '<p class="cp-consent__text"><b>Can we use analytics cookies?</b> We’d like to use Google Analytics to understand how people use this site, so we can improve it. ' +
      'We won’t set these cookies unless you accept. <a href="/cookies/">Cookie policy</a></p>' +
      '<div class="cp-consent__actions"><button type="button" class="cp-consent__btn cp-consent__btn--ghost" data-consent="denied">Reject</button>' +
      '<button type="button" class="cp-consent__btn" data-consent="granted">Accept</button></div>';
    banner.addEventListener('click', function (e) {
      var b = e.target.closest('[data-consent]');
      if (!b) return;
      var v = b.getAttribute('data-consent');
      setChoice(v);
      hideBanner();
      if (v === 'granted') loadAnalytics();
      else { clearGaCookies(); if (loaded) location.reload(); }
    });
    document.body.appendChild(banner);
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-cookie-settings]')) { e.preventDefault(); showBanner(); }
  });

  // Count growth check requests as leads (only sent if analytics was accepted).
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f && f.getAttribute && f.getAttribute('name') === 'growth-check' && loaded) {
      gtag('event', 'generate_lead', { form_name: 'growth-check', transport_type: 'beacon' });
    }
  }, true);

  function start() {
    var c = getChoice();
    if (c === 'granted') loadAnalytics();
    else if (c !== 'denied') showBanner();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
