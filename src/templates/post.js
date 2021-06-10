import React from 'react';
import { graphql } from 'gatsby';

const PostTemplate = ({ data }) => {
  const {
    markdownRemark: {
      html,
      frontmatter: { title, date },
    },
  } = data;

  return (
    <article>
      <h1>{title}</h1>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
};

export default PostTemplate;

export const query = graphql`
  query ($id: String) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      html
      frontmatter {
        date
        title
      }
    }
  }
`;
