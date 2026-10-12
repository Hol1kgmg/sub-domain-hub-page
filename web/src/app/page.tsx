import { css } from '../../styled-system/css';
import { SubdomainList } from '../components/SubdomainList';
import { fetchOgImage } from '../data/og';
import { subdomains } from '../data/subdomains';

export default async function Home() {
  const cards = await Promise.all(
    subdomains.map(async (subdomain) => ({
      subdomain,
      ogImage: await fetchOgImage(subdomain.url),
    })),
  );

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
        Hol1kgmg Portfolio
      </h1>
      <SubdomainList cards={cards} />
    </main>
  );
}
