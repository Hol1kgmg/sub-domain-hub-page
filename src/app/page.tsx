import { css } from '../../styled-system/css';
import { grid } from '../../styled-system/patterns';
import { SubdomainCard } from '../components/SubdomainCard';
import { subdomains } from '../data/subdomains';

export default function Home() {
  return (
    <main
      className={css({
        maxWidth: '7xl',
        marginX: 'auto',
        padding: '8',
      })}
    >
      <h1
        className={css({
          fontSize: '2xl',
          fontWeight: 'bold',
          marginBottom: '8',
          color: 'text',
        })}
      >
        Subdomain List
      </h1>
      <div
        className={grid({
          columns: { base: 1, sm: 2, lg: 3 },
          gap: '4',
        })}
      >
        {subdomains.map((subdomain) => (
          <SubdomainCard key={subdomain.id} subdomain={subdomain} />
        ))}
      </div>
    </main>
  );
}
