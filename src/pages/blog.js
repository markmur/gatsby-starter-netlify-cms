import React from 'react'
import { graphql } from 'gatsby'
import { Content } from '../styles'
import Layout from '../components/Layout'
import Post from '../components/Post'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges } = data.allMarkdownRemark

    const posts = edges.map(({ node }) => node)

    return (
      <Layout displayTagline>
        <Content>
          {posts
            .sort((a, b) => b.frontmatter.pinned - a.frontmatter.pinned)
            .map(post => (
              <Post key={post.id} post={post} />
            ))}
        </Content>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostsQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: [DESC] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            tags
            templateKey
            description
            pinned
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
