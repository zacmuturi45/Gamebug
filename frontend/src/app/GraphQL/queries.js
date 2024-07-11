import { gql } from "@apollo/client";

export const CARD_DATA = gql`
query {
    allGames {
        edges {
            node {
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
