const path = require(`path`);
const { createFilePath } = require('gatsby-source-filesystem');

let postsFilter = {
  frontmatter: {
    isPublic: {
      eq: true,
    },
  },
};

// Use an empty filter in development to fetch all posts
if (process.env.NODE_ENV === 'development') {
  postsFilter = {};
}

// Create a URL-friendly slug from every post title.
// Slug is used for page path
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

// Delete the IndexPage and recreate it to pass your
// filter via context to IndexPagePosts query
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  if (page.path === '/') {
    deletePage(page);

    createPage({
      ...page,
      context: {
        ...page.context,
        filter: postsFilter,
      },
    });
  }
};

// Create a page for every public post,
// unless it is development environment
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`src/templates/post.js`);

  const result = await graphql(
    `
      query Posts($filter: MarkdownRemarkFilterInput) {
        allMarkdownRemark(filter: $filter) {
          nodes {
            fields {
              slug
            }
            id
          }
        }
      }
    `,
    {
      filter: postsFilter,
    },
  );

  const nodes = result.data.allMarkdownRemark.nodes;

  nodes.forEach(node => {
    createPage({
      path: `posts${node.fields.slug}`,
      component: postTemplate,
      context: {
        id: node.id,
      },
    });
  });
};
