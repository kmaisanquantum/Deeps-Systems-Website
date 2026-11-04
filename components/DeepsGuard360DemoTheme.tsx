import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const colorClasses: Record<string, string> = {
  'bg-emerald-50': 'bg-sky-50',
  'bg-emerald-500/10': 'bg-sky-500/10',
  'bg-emerald-500/15': 'bg-sky-500/15',
  'bg-emerald-600': 'bg-sky-600',
  'dark:bg-emerald-500/10': 'dark:bg-sky-500/10',
  'text-emerald-600': 'text-sky-600',
  'text-emerald-700': 'text-sky-700',
  'text-emerald-800': 'text-sky-800',
  'text-emerald-100': 'text-sky-100',
  'text-emerald-300': 'text-sky-300',
  'text-emerald-400': 'text-sky-400',
  'dark:text-emerald-200': 'dark:text-sky-200',
  'dark:text-emerald-300': 'dark:text-sky-300',
  'border-emerald-100': 'border-sky-100',
  'border-emerald-400/40': 'border-sky-400/40',
  'border-emerald-500/20': 'border-sky-500/20',
  'border-emerald-500/30': 'border-sky-500/30',
  'hover:border-emerald-500/30': 'hover:border-sky-500/30',
  'hover:border-emerald-500/50': 'hover:border-sky-500/50',
  'hover:bg-emerald-50': 'hover:bg-sky-50',
  'hover:bg-emerald-500/5': 'hover:bg-sky-500/5',
  'hover:bg-emerald-500/20': 'hover:bg-sky-500/20',
  'hover:bg-emerald-600': 'hover:bg-sky-600',
  'hover:bg-emerald-500': 'hover:bg-sky-500',
  'group-hover:text-emerald-600': 'group-hover:text-sky-600',
  'group-hover:text-emerald-700': 'group-hover:text-sky-700',
  'bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950': 'bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950',
  'from-emerald-950': 'from-blue-950',
  'via-emerald-950': 'via-blue-950',
  'to-emerald-950': 'to-blue-950',
};

const isStatusColor = (element: Element) => {
  const text = (element.textContent ?? '').trim();
  return /^(active|online|resolved|on duty|off duty|complete|connected|verified|success|trial|day shift|night shift|leave|maintenance)$/i.test(text);
};

/** Applies DeepsGuard360's blue product palette only on its interactive demo route. */
const DeepsGuard360DemoTheme: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.startsWith('/deepsguard360/demo')) return;

    const recolor = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>('[class]').forEach((element) => {
        if (isStatusColor(element)) return;
        for (const [from, to] of Object.entries(colorClasses)) {
          if (element.classList.contains(from)) {
            element.classList.remove(from);
            element.classList.add(to);
          }
        }
      });
    };

    recolor(document.getElementById('main-content') ?? document);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          if (node.hasAttribute('class') && !isStatusColor(node)) {
            for (const [from, to] of Object.entries(colorClasses)) {
              if (node.classList.contains(from)) {
                node.classList.remove(from);
                node.classList.add(to);
              }
            }
          }
          recolor(node);
        }
      }));
    });
    observer.observe(document.getElementById('main-content') ?? document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
};

export default DeepsGuard360DemoTheme;
