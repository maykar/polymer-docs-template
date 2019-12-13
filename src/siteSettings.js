/* eslint-disable prettier/prettier */
// Global settings for the documentation website

// Icons from https://www.webcomponents.org/element/@polymer/iron-icons/demo/demo/index.html

module.exports = {
  siteName: 'Documentation Demo Site',
  siteDescription: '',
  welcomeCategory: 'intro',
  menuTitle: '',
  siteURL: 'https://maykar.github.io/polymer-docs-template',
  github: 'https://github.com/maykar/polymer-docs-template',
  branch: 'master',
  highlightStyle: '',
  sideBar: [
    {
      category: 'intro',
      icon: 'mdi:home',
    },
    {
      category: 'installation',
      icon: 'icons:arrow-downward',
    },
    {
      category: 'configuration',
      icon: 'icons:create',
    },
  ],
  sideBarBottom: [
    {
      category: 'faq',
      icon: 'icons:help',
    },
  ],
  sideBarLinks: [
    {
      link: 'https://github.com/maykar/polymer-docs-template',
      caption: 'GitHub',
      icon: 'mdi:github-circle',
    },
    {
      link: 'https://github.com/maykar/polymer-docs-template/issues',
      caption: 'Issues',
      icon: 'mdi:alert-circle',
    },
  ],
};
