'use client';

import dynamic from 'next/dynamic';
import { useLayoutEffect, useRef, useState } from 'react';

import { css } from '../../styled-system/css';
import { categoryColors } from '../data/categories';
import type { Subdomain } from '../data/subdomains';

// Folder は色のパースに canvas を使うため SSR では別の色になり hydration が壊れる
const Folder = dynamic(() => import('./Folder/Folder'), { ssr: false });

const LINK_CARD_INDEX = 1;
const MAX_SIZE = 1.44;
const CARD_WIDTH = 0.6;
const OPEN_SCALE = 1.8;
const CARD_COUNT = 2;
// Folder.tsx measureFolder / placeFlap の flap 基準値 (size = 1 のときの px)
const FOLDER_WIDTH = 224;
const OPEN_GAP = 12;
// 開いたカード列の幅 (size = 1 のとき)。これが最大表示なのでセル幅に収まる size を逆算する
const OPEN_WIDTH =
  FOLDER_WIDTH * CARD_WIDTH * 0.94 * OPEN_SCALE * CARD_COUNT + OPEN_GAP * (CARD_COUNT - 1);

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

const useFolderSize = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [size, setSize] = useState(MAX_SIZE);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const update = (width: number) => {
      // 検索で hidden になると幅 0 になるので前回の size を保つ
      if (width > 0) setSize(Math.min(MAX_SIZE, width / OPEN_WIDTH));
    };
    update(node.getBoundingClientRect().width);
    const observer = new ResizeObserver(() => update(node.getBoundingClientRect().width));
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
  return size;
};

export function SubdomainCard({ subdomain, ogImage }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const size = useFolderSize(ref);
  return (
    <div ref={ref} className={css({ display: 'flex', justifyContent: 'center', paddingTop: '8' })}>
      <Folder
        badge={subdomain.category}
        cardRatio={9 / 16}
        cardWidth={CARD_WIDTH}
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
        openScale={OPEN_SCALE}
        size={size}
        zoomOnClick={(index) => index !== LINK_CARD_INDEX}
        onItemClick={(_, index) => {
          if (index === LINK_CARD_INDEX) window.open(subdomain.url, '_blank', 'noopener');
        }}
      />
    </div>
  );
}
