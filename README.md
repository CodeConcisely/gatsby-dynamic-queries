# How to Create Dynamic Queries in Gatsby

This is a demo project for [_How to Create Dynamic Queries in Gatsby_](https://www.codeconcisely.com/blog/how-to-create-dynamic-queries-in-gatsby/) article.
Learn how to create changeable queries in Gatsby.

## Description

Data comes from blog posts written in Markdown inside `content` folder.

The queries in `src/pages/index.js` and `gatsby-node.js` accept a `$filter: MarkdownRemarkFilterInput` variable. The `postsFilter`, specified in `gatsby-node.js`, makes the queries fetch only public posts. In `development` environment the filter gets removed to fetch all posts.

In `gatsby-node.js`, depending on the filter, posts are fetched. A page gets created for every fetched post. Also, `index.js` page gets deleted and recreated to pass a `filter` via page `context`.

In `index.js`, posts that pass the filter get fetched.
