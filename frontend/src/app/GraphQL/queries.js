import { gql } from "@apollo/client";

export const CARD_DATA = gql`
query {
    allGames {
        edges {
            node {
                gameid
                title
                platforms
                dateAdded
                genres
                price
                chart
                imageUrl
                videoUrl
                gameAverageRating
                reviews {
                    edges {
                        node {
                            gameRating
                        }
                    }
                }
            }
        }
    }
}
`;

export const SEARCH_QUERY = gql`
query ($query: String!) {
    search(query: $query) {
        ... on Game {
            gameid
            title
            imageUrl
            platforms
        }
        ... on User {
            userid
            username
            profilePic
        }
    }
}
`

export const ALL_GAMES = gql`
query {
    allGames {
        edges {
            node {
                gameid
                title
                platforms
                dateAdded
                genres
                price
                chart
                imageUrl
                videoUrl
                reviews {
                    edges {
                        node {
                            gameRating
                        }
                    }
                }
            }
        }
    }
}
`;

export const ONEGAME = gql`
query OneGame($id: Int!) {
    oneGame (id: $id) {
        title
        platforms
        dateAdded
        genres
        price
        chart
        imageUrl
        videoUrl
    }
}
`;

export const ONEUSER = gql`
query ($id: Int!) {
    oneUser (id: $id) {
        userid
        username
        following {
            edges {
                node {
                    userid
                    username
                }
            }
        }
    }
}
`;

export const SIMILAR_GAMES = gql`
query similarGames($id: Int!) {
    similarUserGames(id: $id) {
        gameid
        title
        platforms
        dateAdded
        genres
        price
        chart
        imageUrl
        videoUrl
    }
}
`;