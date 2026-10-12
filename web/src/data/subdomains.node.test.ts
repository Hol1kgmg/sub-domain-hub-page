import { existsSync } from 'node:fs';

import { expect, test } from 'vite-plus/test';

import { subdomains } from './subdomains';

test('referenced images exist in public/', () => {
  for (const s of subdomains) {
    for (const p of [s.screenshot, s.ogImage]) {
      // oxlint-disable-next-line security/detect-non-literal-fs-filename -- paths come from our own JSON
      if (p) expect(existsSync(`public${p}`), p).toBe(true);
    }
  }
});
