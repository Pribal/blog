import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)} style={{ height: '75vh'}}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Bienvenue sur mon blog !
        </Heading>
        <p className="hero__subtitle">
          Ce blog est orienté cyber-sécurité.
        </p>
        <u className="hero__subtitle">
          Ici vous retrouverez:
        </u>
        <ul className="hero__subtitle">
          <li>Des articles sur différentes technologies</li>
          <li>Des walkthrought (procédure pas à pas) de CTF.</li>
        </ul>
        <br/>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/blog">
              Articles 📚
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
              Walthrought 💻
          </Link>
        </div>
        <br/>
        <p className="hero__subtitle">Bonne lecture !</p>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title={`Blog Oscar Giraudoux`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      {/* <main>
        <HomepageFeatures />
      </main> */}
    </Layout>
  );
}
