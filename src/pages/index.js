import React from 'react';
import { graphql } from 'gatsby';

import PostList from '../components/PostList';

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <>
      <h1>Dynamic Filter Demo Project</h1>
      <PostList posts={posts} />
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexPagePosts($filter: MarkdownRemarkFilterInput) {
    allMarkdownRemark(filter: $filter) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          date
          isPublic
        }
      }
    }
  }
`;
