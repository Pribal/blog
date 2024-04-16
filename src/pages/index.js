import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles.container}>
        <Heading as="h1" className="hero__title">
          Bienvenue sur mon blog !
        </Heading>
        <p className="hero__subtitle">
          Ce blog est orienté cyber-sécurité ainsi vous y retrouverez:
        </p>
        <div>
          <p className='hero__subtitle'>
            • Des articles sur différents sujets (Nouvelles failles, méthode de sécurisation, etc.).
          </p>
          <p className='hero__subtitle'>
            • Des walkthrought (procédures pas-à-pas) de capture the flag.
          </p>
        </div>
        <br/>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="blog">
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
    </Layout>
  );
}
