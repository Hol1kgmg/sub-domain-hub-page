import Image from 'next/image';

import { css } from '../../styled-system/css';
import type { Subdomain } from '../data/subdomains';

type Props = {
  subdomain: Subdomain;
};

export function SubdomainCard({ subdomain }: Props) {
  return (
    <a
      className={css({
        display: 'block',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'highlight-med',
        background: 'surface',
        textDecoration: 'none',
        color: 'text',
        overflow: 'hidden',
        transition: 'border-color 0.15s, background 0.15s',
        _hover: {
          borderColor: 'highlight-high',
          background: 'overlay',
        },
      })}
      href={subdomain.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {subdomain.screenshot ? (
        <div
          className={css({
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            borderBottom: '1px solid',
            borderColor: 'highlight-med',
          })}
        >
          <Image
            fill
            alt={subdomain.name}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={subdomain.screenshot}
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : (
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            aspectRatio: '16/9',
            background: 'overlay',
            borderBottom: '1px solid',
            borderColor: 'highlight-med',
            fontSize: 'sm',
            fontWeight: 'bold',
            color: 'muted',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          })}
        >
          {subdomain.category}
        </div>
      )}
      <div className={css({ padding: '4' })}>
        <span
          className={css({
            display: 'inline-block',
            marginBottom: '3',
            paddingInline: '2',
            paddingBlock: '0.5',
            borderRadius: '4px',
            fontSize: 'xs',
            fontWeight: 'bold',
            color: 'subtle',
            background: 'highlight-low',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          })}
        >
          {subdomain.category}
        </span>
        <p
          className={css({
            fontSize: 'lg',
            fontWeight: 'bold',
            marginBottom: '2',
          })}
        >
          {subdomain.name}
        </p>
        <p
          className={css({
            fontSize: 'sm',
            color: 'muted',
            wordBreak: 'break-all',
          })}
        >
          {subdomain.url}
        </p>
      </div>
    </a>
  );
}
