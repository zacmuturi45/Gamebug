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

export const ALLREVIEWS = gql`
query {
    allReviews {
        edges {
            node {
                reviewid
                content
                gameRating
                gameComment
                likes
                dislikes
                user {
                    username
                    profilePic
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
        about
        publisher
        developer
        ageRating
        tags
        buyers {
            edges {
                node {
                    username
                    profilePic
                    userid
                    boughtGames {
                        edges {
                            node {
                                gameid
                            }
                        }
                    }
                }
            }
        }
    }
}
`;

export const CHANGEPASSWORD = gql`
mutation changedpassword($email: String!, $password: String!) {
    changePassword(email: $email, password: $password) {
        ok
    }
}
`;

export const LOGGEDUSER = gql`
query ($id: Int!) {
    oneUser (id: $id) {
        userid
        username
    }
}
`;

export const DELETEUSER = gql`
mutation DeleteUser ($userId: Int!) {
    deleteUser(userId: $userId) {
        ok
    }
}
`;

export const SETTINGS = gql`
mutation settings($userId: Int!, $password: String, $username: String!) {
    settings (userId: $userId, password: $password, username: $username) {
        ok
        newName
    }
}
`;

export const ONEUSER = gql`
query ($id: Int!) {
    oneUser (id: $id) {
        userid
        username
        profilePic
        userWishlistGames {
            edges {
                node {
                    gameid
                    imageUrl
                    title
                    videoUrl
                    platforms
                    dateAdded
                    genres
                    chart
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
        reviews {
            edges {
                node {
                    content
                    gameRating
                    dateAdded
                    gameComment
                    likes
                    dislikes
                }
            }
        }
        boughtGames {
            edges {
                node {
                    title
                    gameid
                    imageUrl
                    videoUrl
                    platforms
                    dateAdded
                    genres
                    chart
                    statusCheck {
                        status
                    }
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
        followers {
            edges {
                node {
                    userid
                    username
                    profilePic
                    userWishlistGames {
                        edges {
                            node {
                                gameid
                            }
                        }
                    }
                    boughtGames {
                        edges {
                            node {
                                gameid
                            }
                        }
                    }
                }
            }
        }
        following {
            edges {
                node {
                    userid
                    username
                    profilePic
                    userWishlistGames {
                        edges {
                            node {
                                gameid
                            }
                        }
                    }
                    boughtGames {
                        edges {
                            node {
                                gameid
                            }
                        }
                    }
                }
            }
        }
    }
}
`;

export const FOLLOWSTATUS = gql`
query ($followerId: Int!, $followeeId: Int!) {
    checkFollowStatus(followerId: $followerId, followeeId: $followeeId) 
}
`

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
`;

export const GAMESTATUS = gql`
query ($userId: Int!, $gameId: Int!) {
    checkGameStatus(userId: $userId, gameId: $gameId)
}
`

export const FOLLOW = gql`
mutation Follow($followerId: ID!, $followeeId: ID!) {
    followerFollowee (followerId: $followerId, followeeId: $followeeId) {
        ok
        status
    }
}
`;

export const ADDTOMYGAMES = gql`
mutation addToMyGames($gameId: Int!, $userId: Int!) {
    addToGames(gameId: $gameId, userId: $userId) {
        ok
        count
        userLibrary
    }
}
`;

export const GAMECOUNT = gql`
query gameCount($gameId: Int!) {
    addToGames(gameId: $gameId)
}
`;

export const CHECKRATINGS = gql`
query ratingsCheck($gameId: Int!) {
    checkRatings(gameId: $gameId)
}
`;

export const COUNTREVIEWS = gql`
query countReviews($gameId: Int!) {
    countReviews(gameId: $gameId) 
}
`;

export const CHECKAVERAGERATING = gql`
query averageRatingsCheck($gameId: Int!) {
    checkAverageRating(gameId: $gameId)
}
`;

export const CHECKRATINGTYPES = gql`
query ratingTypes($gameId: Int!) {
    checkRatingTypes(gameId: $gameId) {
        exceptional
        recommend
        meh
        skip
    }
}
`;

export const CHECKLIBRARY = gql`
query checkLib($gameId: Int!, $userId: Int!) {
    checkLibrary(gameId: $gameId, userId: $userId)
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
mutation addReviews($gameId: Int!, $userId: Int!, $content: String, $gameComment: String, $gameRating: Int, $parentId: Int) {
    addReview(gameId: $gameId, userId: $userId, content: $content, gameComment: $gameComment, gameRating: $gameRating, parentId: $parentId) {
        ok
        newReview {
            reviewid
            gameComment
        }
    }
}
`;

export const EDITREVIEW = gql`
mutation editReviews($gameId: Int!, $userId: Int!, $content: String, $gameComment: String, $gameRating: Int) {
    editReview(gameId: $gameId, userId: $userId, content: $content, gameComment: $gameComment, gameRating: $gameRating) {
        ok
        newReview {
            reviewid
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
            reviewid
            gameComment
            content
        }
    }
}
`;

export const DELETEREVIEW = gql`
mutation deletedReview ($revId: Int!, $userId: Int!) {
    deleteReview (revId: $revId, userId: $userId) {
        ok
    }
}
`;

export const LIKEDISLIKE = gql`
mutation likeDislike ($reviewId: Int!, $userId: Int!, $toLike: Boolean!) {
    toggleReviewLike(reviewId: $reviewId, userId: $userId, toLike: $toLike) {
        ok
        review {
            likes
            dislikes
        }
    }
}
`;

export const ADDREPLY = gql`
mutation AddReply ($gameId: Int!, $userId: Int!, $content: String, $parentId: Int!) {
    addReply(gameId: $gameId, userId: $userId, content: $content, parentId: $parentId) {
        ok
        newReview {
            reviewid
            content
        }
    }
}
`;

export const ALLGAMEREVIEWS = gql`
query ($gameId: Int!) {
    allGameReviews (gameId: $gameId) {
        reviewid
        content
        gameComment
        gameRating
        dateAdded
        likes
        dislikes
        parentId
        replies {
            edges {
                node {
                    reviewid
                    content
                    user {
                        userid
                        username
                        profilePic
                    }
                }
            }
        }
        user {
            userid
            username
            profilePic
        }
    }
}
`;

export const BUYERS = gql`
query ($id: Int!) {
    userWithGame(id: $id) {
        userid
        username
        profilePic
        boughtGames {
            edges {
                node {
                    gameid
                }
            }
        }
        followers {
            edges {
                node {
                    userid
                }
            }
        }
    }
}
`;
