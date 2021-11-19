// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Z2K Daily Logs Plugin',
  tagline: 'An Obsidian Plugin for Advanced Daily Log Files',
  url: 'https://z2k-gwp.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon-circle.svg',
  organizationName: 'z2k-gwp', // Usually your GitHub org/user name.
  projectName: 'obsidian-z2k-daily-logs', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/z2k-gwp/obsidian-z2k-daily-logs/edit/main/docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/z2k-gwp/obsidian-z2k-daily-logs/edit/main/docs/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Z2K Daily Logs Plugin',
        logo: {
          alt: 'Logo',
          src: 'img/Z2KDailyLogLogo-Optimized.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'overview',
            position: 'left',
            label: 'Overview',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://z2k.dev',
            label: 'Z2K',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Overview',
                to: '/docs',
              },
            ],
          },
          {
            title: 'Z2K',
            items: [
              {
                label: 'Z2K Website',
                href: 'https://z2k.dev',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/z2k-gwp/obsidian-z2k-daily-logs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Z2K. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
