import { existsSync } from 'node:fs';

import { expect, test } from 'vite-plus/test';

import { subdomains } from './subdomains';

test('referenced screenshots exist in public/', () => {
  for (const s of subdomains) {
    // oxlint-disable-next-line security/detect-non-literal-fs-filename -- paths come from our own JSON
    expect(existsSync(`public${s.screenshot}`), s.screenshot).toBe(true);
  }
});
