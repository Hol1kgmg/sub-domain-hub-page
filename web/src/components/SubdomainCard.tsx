'use client';

import dynamic from 'next/dynamic';

import { css } from '../../styled-system/css';
import { categoryColors } from '../data/categories';
import type { Subdomain } from '../data/subdomains';

// Folder は色のパースに canvas を使うため SSR では別の色になり hydration が壊れる
const Folder = dynamic(() => import('./Folder/Folder'), { ssr: false });

const LINK_CARD_INDEX = 1;

type Props = {
  subdomain: Subdomain;
  ogImage: string | undefined;
};

const placeholder = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  background: 'highlight-med',
  fontSize: 'sm',
  color: 'muted',
});

const overlay = css({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0, 0, 0, 0.55)',
  color: 'white',
  fontSize: 'sm',
  fontWeight: 'bold',
  opacity: 0,
  transition: 'opacity 0.15s',
  _groupHover: { opacity: 1 },
  _motionReduce: { transition: 'none' },
});

export function SubdomainCard({ subdomain, ogImage }: Props) {
  return (
    <div className={css({ display: 'flex', justifyContent: 'center', paddingTop: '8' })}>
      <Folder
        badge={subdomain.category}
        cardRatio={9 / 16}
        cardWidth={0.6}
        color={categoryColors[subdomain.category]}
        items={[
          { image: subdomain.screenshot, alt: subdomain.name },
          {
            content: (
              <div className="folder-photo group">
                {ogImage ? (
                  // 実寸は CSS で上書きされるので比率だけ合わせる (markuplint の required-attr 対策)
                  // oxlint-disable-next-line nextjs/no-img-element -- OG 画像のホストは不定で remotePatterns に列挙できない
                  <img alt="" draggable={false} height={630} src={ogImage} width={1200} />
                ) : (
                  <div className={placeholder}>No card link</div>
                )}
                <div className={overlay}>サイトを開く</div>
              </div>
            ),
          },
        ]}
        label={subdomain.name}
        openScale={1.8}
        size={1.44}
        onItemClick={(_, index) => {
          if (index === LINK_CARD_INDEX) window.open(subdomain.url, '_blank', 'noopener');
        }}
      />
    </div>
  );
}
