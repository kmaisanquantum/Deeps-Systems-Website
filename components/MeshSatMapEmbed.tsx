import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MAP_URL = 'https://meshsat.dspng.space';
const EMBED_ID = 'deepsguard360-meshsat-embed';
const LINK_ID = 'deepsguard360-meshsat-link';
const DETAIL_ID = 'deepsguard360-meshsat-note';
const MAP_NOTE = 'Live tracking is powered by the MeshSat map of Papua New Guinea at meshsat.dspng.space. Guard and vehicle markers, routes, checkpoints, and alerts shown in this demo remain fictional simulations.';

/** Adds a live PNG map layer to the demo while retaining its fictional map overlays and direct-link fallback. */
const MeshSatMapEmbed: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith('/deepsguard360/demo')) return;

    let observer: MutationObserver | undefined;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const enhanceMap = () => {
      const section = document.getElementById('map');
      if (!section) return false;

      const mapPanel = section.querySelector<HTMLElement>('[class*="min-h-[360px]"]');
      if (!mapPanel) return false;
      if (document.getElementById(EMBED_ID)) return true;

      mapPanel.classList.add('relative', 'overflow-hidden');
      const iframe = document.createElement('iframe');
      iframe.id = EMBED_ID;
      iframe.src = MAP_URL;
      iframe.title = 'Live map of Papua New Guinea from MeshSat';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer';
      iframe.setAttribute('allowfullscreen', '');
      iframe.className = 'absolute inset-0 z-0 h-full w-full border-0';
      iframe.style.minHeight = '360px';
      iframe.addEventListener('error', () => {
        // Browsers may block cross-origin frames without exposing the reason to the parent.
        // Keep the map link visible as the reliable fallback in either case.
        iframe.title = 'MeshSat map could not be embedded; open the live map using the link';
      });

      const decorativeLayer = mapPanel.querySelector<HTMLElement>(':scope > div');
      if (decorativeLayer) decorativeLayer.style.opacity = '0.14';
      mapPanel.insertBefore(iframe, mapPanel.firstChild);

      const liveLink = document.createElement('a');
      liveLink.id = LINK_ID;
      liveLink.href = MAP_URL;
      liveLink.target = '_blank';
      liveLink.rel = 'noopener noreferrer';
      liveLink.textContent = 'Open live map — meshsat.dspng.space';
      liveLink.setAttribute('aria-label', 'Open the live Papua New Guinea map on MeshSat in a new tab');
      liveLink.className = 'absolute right-3 top-3 z-20 rounded-lg bg-emerald-700 px-3 py-2 text-center text-xs font-bold text-white shadow-lg transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300 sm:right-4 sm:top-4';
      mapPanel.appendChild(liveLink);

      // SectionTitle renders its explanatory detail immediately after the heading.
      // Avoid replacing the eyebrow label with the map note.
      const heading = section.querySelector('h2');
      const detail = heading?.nextElementSibling;
      if (detail instanceof HTMLElement && detail.tagName === 'P') {
        detail.id = DETAIL_ID;
        detail.textContent = MAP_NOTE;
      }
      return true;
    };

    if (!enhanceMap()) {
      observer = new MutationObserver(() => {
        if (enhanceMap()) observer?.disconnect();
      });
      observer.observe(document.getElementById('main-content') ?? document.body, { childList: true, subtree: true });
      retryTimer = setTimeout(() => enhanceMap(), 1500);
    }

    return () => {
      observer?.disconnect();
      if (retryTimer) clearTimeout(retryTimer);
      document.getElementById(EMBED_ID)?.remove();
      document.getElementById(LINK_ID)?.remove();
      const detail = document.getElementById(DETAIL_ID);
      if (detail) {
        detail.textContent = '';
        detail.removeAttribute('id');
      }
    };
  }, [location.pathname]);

  return null;
};

export default MeshSatMapEmbed;
