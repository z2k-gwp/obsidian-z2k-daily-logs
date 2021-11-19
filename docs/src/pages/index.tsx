import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
// import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs">
            3 Minute Overview
          </Link>
        </div>
      </div>
    </header>
  );
}

// Thanks to SilentVoid13 for the help in decoding Docusaurus's HomepageFeatures code...
const features = [
  {
    title: 'Embrace Daily Logging',
    imageUrl: 'img/QS-Logo-dots-SQ-lockup_205x195-BLK.png',
    description: (
      <>
        Supercharge your daily notes to capture and store quantified data throughout the day
      </>
    ),
  },
  {
    title: 'Advanced {{Fields}}',
    imageUrl: 'img/FieldsLogo-Optimized.svg',
    description: (
      <>
        Unlock advanced field tags, from interactive prompting to <a href="https://silentvoid13.github.io/Templater/">templater</a> blocks
      </>
    ),
  },
  {
    title: 'Part of the Z2K Workflow',
    imageUrl: 'img/Z2KLogo-Optimized.svg',
    description: (
      <>
        While not necessary to use, this plugin is part of the larger <a href="https://z2k.dev">Z2K</a> system
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="An Obsidian Plugin for Advanced Daily Logs">
      <HomepageHeader />
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
