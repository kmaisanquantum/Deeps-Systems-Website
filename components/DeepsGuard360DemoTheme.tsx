import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEEPSGUARD_ROUTE = '/deepsguard360';

/**
 * The demo is intentionally isolated from the Deeps Systems site palette.
 * Convert emerald utility tokens within the demo experience only; alerts and
 * warning states remain red and amber because those are semantic indicators.
 */
const blueClass = (token: string) => {
  if (!token.includes('emerald')) return token;
  return token.replaceAll('emerald-950', 'blue-950').replaceAll('emerald', 'sky');
};

const recolorElement = (element: HTMLElement) => {
  const classes = Array.from(element.classList);
  const replacements = classes.map(blueClass);
  if (classes.some((token, index) => token !== replacements[index])) {
    element.classList.remove(...classes);
    element.classList.add(...replacements);
  }
};

const applyMapPalette = () => {
  const section = document.getElementById('map');
  if (!section) return;

  const mapPanel = section.querySelector<HTMLElement>('[class*="min-h-[360px]"]');
  if (mapPanel) {
    mapPanel.style.backgroundColor = '#eef4f9';
    mapPanel.style.backgroundImage = 'linear-gradient(28deg, transparent 46%, #b8c9d8 47%, #b8c9d8 48%, transparent 49%), linear-gradient(110deg, transparent 43%, #c5d4e0 44%, #c5d4e0 45%, transparent 46%), linear-gradient(0deg, transparent 48%, #d3dfe8 49%, #d3dfe8 50%, transparent 51%)';
    mapPanel.style.backgroundSize = '180px 140px';
    mapPanel.querySelectorAll<HTMLElement>(':scope > div').forEach((layer) => {
      if (layer.style.backgroundImage.includes('#b5c8bc') || layer.style.backgroundImage.includes('#c3d2c8') || layer.style.backgroundImage.includes('#d4dfd8')) {
        layer.style.backgroundImage = 'linear-gradient(28deg, transparent 46%, #b8c9d8 47%, #b8c9d8 48%, transparent 49%), linear-gradient(110deg, transparent 43%, #c5d4e0 44%, #c5d4e0 45%, transparent 46%), linear-gradient(0deg, transparent 48%, #d3dfe8 49%, #d3dfe8 50%, transparent 51%)';
      }
    });
  }
};

const DeepsGuard360DemoTheme: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.startsWith(`${DEEPSGUARD_ROUTE}/demo`)) return;

    const root = document.getElementById('main-content') ?? document.body;
    const recolor = (node: ParentNode) => {
      if (node instanceof HTMLElement && node.hasAttribute('class')) recolorElement(node);
      node.querySelectorAll<HTMLElement>('[class]').forEach(recolorElement);
      applyMapPalette();
    };

    recolor(root);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.target instanceof HTMLElement) {
          recolorElement(mutation.target);
        }
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) recolor(node);
        });
      });
    });
    observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
};

export default DeepsGuard360DemoTheme;
