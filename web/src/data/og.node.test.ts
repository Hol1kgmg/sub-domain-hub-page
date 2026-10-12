import { expect, test } from 'vite-plus/test';

import { parseOgImage } from './og';

test('resolves relative og:image against the page URL', () => {
  const html = '<head><meta property="og:image" content="/images/og.png"/></head>';
  expect(parseOgImage(html, 'https://example.hol1kgmg.com/')).toBe(
    'https://example.hol1kgmg.com/images/og.png',
  );
});

test('accepts content attribute before property', () => {
  const html = '<meta content="https://cdn.example/og.png" property="og:image">';
  expect(parseOgImage(html, 'https://example.hol1kgmg.com/')).toBe('https://cdn.example/og.png');
});

test('returns undefined when og:image is absent', () => {
  expect(parseOgImage('<meta property="og:title" content="x">', 'https://a.b/')).toBeUndefined();
});
