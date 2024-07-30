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

export const SIGNUP_USER = gql`
mutation Signup($email: String!, $password: String!, $username: String!) {
    signup(email: $email, password: $password, username: $username) {
        ok
        user {
            userid
            email
        }
        successMessage
    }
}
`;

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        ok
        token
        user {
            userid
            username
        }
    }
}
`

export const ADDTOMYGAMES = gql`
mutation addToMyGames($gameId: Int!, $userId: Int!) {
    addToGames(gameId: $gameId, userId: $userId) {
        ok
        count
    }
}
`;

export const GAMECOUNT = gql`
query gameCount($gameId: Int!) {
    addToGames(gameId: $gameId)
}
`;

export const CHECKGAME = gql`
query gameCheck($gameId: Int!, $userId: Int!) {
    checkGame(gameId: $gameId, userId: $userId) {
        inWishlist
        inBoughtGames
        activeIndex
    }
}
`;

export const ADDTOWISHLIST = gql`
mutation addToWishlist($gameId: Int!, $userId: Int!) {
    addedToWishlist(gameId: $gameId, userId: $userId) {
        ok
    }
}
`;

export const UPDATEGAMESTATUS = gql`
mutation updateStatus($gameId: Int!, $userId: Int!, $index: Int!) {
    updateGameStatus(gameId: $gameId, userId: $userId, index: $index) {
        ok
        activeIndex
    }
}
`;

export const DELETEGAME = gql`
mutation deleteGames($gameId: Int!, $userId: Int!) {
    deleteGame(gameId: $gameId, userId: $userId) {
        ok
    }
}
`;

export const ADDREVIEW = gql`
mutation addReviews($gameId: Int!, $userId: Int!, $content: String, $gameComment: String, $gameRating: Int) {
    addReview(gameId: $gameId, userId: $userId, content: $content, gameComment: $gameComment, gameRating: $gameRating) {
        ok
        newReview {
            gameComment
        }
    }
}
`; 

export const CHECKREVIEW = gql`
query ($gameId: Int!, $userId: Int!) {
    checkReview(gameId: $gameId, userId: $userId) {
        checkReview
        checkedReview {
            gameComment
        }
    }
}
`