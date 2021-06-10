module.exports = {
  siteMetadata: {
    title: 'Demo Project',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: `${__dirname}/content`,
      },
    },
    'gatsby-transformer-remark',
  ],
};
