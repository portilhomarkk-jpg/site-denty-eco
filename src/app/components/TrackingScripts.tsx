import { useEffect } from 'react';
import { api } from '../utils/api';

interface TrackingConfig {
  gtmId: string;
  ga4Id: string;
  googleAdsId: string;
  googleAdsLabel: string;
  metaPixelId: string;
}

function injectScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id;
  s.src = src;
  s.async = true;
  document.head.appendChild(s);
}

function injectInlineScript(id: string, content: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id;
  s.textContent = content;
  document.head.appendChild(s);
}

function injectNoscript(id: string, html: string) {
  if (document.getElementById(id)) return;
  const ns = document.createElement('noscript');
  ns.id = id;
  ns.innerHTML = html;
  document.body.insertBefore(ns, document.body.firstChild);
}

export function TrackingScripts() {
  useEffect(() => {
    api.getTracking().then((config: TrackingConfig) => {
      if (!config || !Object.values(config).some(Boolean)) return;

    // ── Google Tag Manager ──────────────────────────────────────────────
    if (config.gtmId) {
      injectInlineScript('gtm-init', `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${config.gtmId}');
      `);
      injectNoscript('gtm-noscript', `<iframe src="https://www.googletagmanager.com/ns.html?id=${config.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`);
    }

    // ── Google Analytics 4 ─────────────────────────────────────────────
    if (config.ga4Id) {
      injectScript('ga4-script', `https://www.googletagmanager.com/gtag/js?id=${config.ga4Id}`);
      injectInlineScript('ga4-init', `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${config.ga4Id}');
      `);
    }

    // ── Google Ads ─────────────────────────────────────────────────────
    if (config.googleAdsId) {
      if (!config.ga4Id) {
        injectScript('gads-script', `https://www.googletagmanager.com/gtag/js?id=${config.googleAdsId}`);
        injectInlineScript('gads-init', `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        `);
      }
      injectInlineScript('gads-config', `gtag('config', '${config.googleAdsId}');`);
      if (config.googleAdsLabel) {
        injectInlineScript('gads-conversion', `
          gtag('event', 'conversion', {
            'send_to': '${config.googleAdsId}/${config.googleAdsLabel}'
          });
        `);
      }
    }

    // ── Meta Pixel ─────────────────────────────────────────────────────
    if (config.metaPixelId) {
      injectInlineScript('meta-pixel', `
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
        (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${config.metaPixelId}');
        fbq('track', 'PageView');
      `);
      injectNoscript('meta-pixel-noscript', `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${config.metaPixelId}&ev=PageView&noscript=1"/>`);
    }
    }).catch(console.error);
  }, []);

  return null;
}
