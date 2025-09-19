import { gql } from "@apollo/client";

export const GET_USERS_WITH_POSTS = gql`
    query GetUsersAndPosts($filters: UserFilters!) {
        users(filters: $filters) {
            id
            name
            email
            phone
            age
            posts {
                title
                body
            }
        }
    }
`