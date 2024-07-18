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

export const REVIEWS = gql`
query {
    allReviews {
        edges {
            node {
                content
            }
        }
    }
}
`;

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