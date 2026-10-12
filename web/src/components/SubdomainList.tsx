'use client';

import { useState } from 'react';

import { css } from '../../styled-system/css';
import { grid } from '../../styled-system/patterns';
import type { Subdomain } from '../data/subdomains';
import { SubdomainCard } from './SubdomainCard';

type Card = { subdomain: Subdomain; ogImage: string | undefined };

type Props = { cards: Card[] };

const input = css({
  width: '100%',
  maxWidth: 'md',
  marginBottom: '8',
  paddingX: '4',
  paddingY: '2',
  borderWidth: '1px',
  borderColor: 'highlight-med',
  borderRadius: 'md',
  background: 'surface',
  color: 'text',
  _focusVisible: { outline: '2px solid', outlineColor: 'highlight-high' },
});

export function SubdomainList({ cards }: Props) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const matches = ({ name, url, category }: Subdomain) =>
    [name, url, category].some((v) => v.toLowerCase().includes(q));
  const hits = cards.filter(({ subdomain }) => matches(subdomain)).length;

  return (
    <>
      <input
        aria-label="サブドメインを検索"
        className={input}
        placeholder="名前・URL・カテゴリで検索"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {hits === 0 && <p className={css({ color: 'muted' })}>見つかりません</p>}
      <div className={grid({ columns: { base: 1, sm: 2 }, columnGap: '10', rowGap: '16' })}>
        {cards.map(({ subdomain, ogImage }) => (
          // unmount すると Folder のエンジンと intro アニメーションが再生されるので hidden で隠す
          <div key={subdomain.id} hidden={!matches(subdomain)}>
            <SubdomainCard ogImage={ogImage} subdomain={subdomain} />
          </div>
        ))}
      </div>
    </>
  );
}
