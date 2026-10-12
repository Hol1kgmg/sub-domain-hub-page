import Image from 'next/image';

import { css } from '../../styled-system/css';
import type { Subdomain } from '../data/subdomains';

type Props = {
  subdomain: Subdomain;
};

export function SubdomainCard({ subdomain }: Props) {
  return (
    <a
      className={`group ${css({
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
      })}`}
      href={subdomain.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {subdomain.screenshot && subdomain.ogImage ? (
        <div
          className={css({
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            overflow: 'hidden',
            background: 'overlay',
            borderBottom: '1px solid',
            borderColor: 'highlight-med',
          })}
        >
          <Image
            alt=""
            className={css({
              position: 'absolute',
              top: '14%',
              left: '14%',
              width: '78%',
              height: '78%',
              objectFit: 'cover',
              borderRadius: '4px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transform: 'rotate(3deg)',
              transition: 'transform 0.3s ease',
              _groupHover: { transform: 'translate(6%, -10%) rotate(8deg)' },
              _motionReduce: { transition: 'none' },
            })}
            height={360}
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 26vw"
            src={subdomain.ogImage}
            width={640}
          />
          <Image
            alt={subdomain.name}
            className={css({
              position: 'absolute',
              top: '8%',
              left: '8%',
              width: '78%',
              height: '78%',
              objectFit: 'cover',
              borderRadius: '4px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transform: 'rotate(-2deg)',
              transition: 'transform 0.3s ease',
              _groupHover: { transform: 'translate(-6%, -12%) rotate(-7deg)' },
              _motionReduce: { transition: 'none' },
            })}
            height={360}
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 26vw"
            src={subdomain.screenshot}
            width={640}
          />
        </div>
      ) : subdomain.screenshot ? (
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
