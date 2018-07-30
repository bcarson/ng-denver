import gql from 'graphql-tag';

export const queries = {
  feed: gql`
    query {
      feed {
        id
        title
        text
      }
    }
  `,
  drafts: gql`
    query {
      drafts {
        id
        title
        text
        isPublished
      }
    }
  `,
};

export const mutations = {
  createDraft: gql`
    mutation createDraft($title: String!, $text: String!) {
      createDraft(title: $title, text: $text) {
        id
        title
        text
      }
    }
  `,
  publish: gql`
    mutation publish($id: ID!) {
      publish(id: $id) {
        id
      }
    }
  `,
};
