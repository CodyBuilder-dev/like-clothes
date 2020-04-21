
// Home
const HOME = "/";

// User
const USER = "/user";
const SIGNIN = "/signin";
const SIGNUP = "/signup";
const SOCIAL_SIGNIN = "/social-signin";
const USER_EMAIL = "/:email";
const PASSWORD = "/password";
const FOLLOW_USER_TOGGLE = "/follow-user-toggle";
const FOLLOWING_USER = "/following-user"
const FOLLOWER_USER = "/follower-user"


// Clothes
const CLOTHES = "/clothes";
const SEARCH_CLOTHES = "/search-clothes";
const SEARCH_CLOTHES_TAG = "/search-clothes-tag";
const MYCLOSET = "/mycloset";
const CLOTHES_ITEM = "/clothes-item"
const WISH_LIST = "/wish-list"

const routes = {
    // Home
    home: HOME,

    // User
    user : USER,
    signin : SIGNIN,
    signup : SIGNUP,
    social_signin: SOCIAL_SIGNIN,
    user_email: USER_EMAIL,
    password: PASSWORD,
    follow_user_toggle: FOLLOW_USER_TOGGLE,
    following_user : FOLLOWING_USER,
    follower_user : FOLLOWER_USER,

    // Clothes
    clothes : CLOTHES,
    search_clothes : SEARCH_CLOTHES,
    search_clothes_tag : SEARCH_CLOTHES_TAG,
    mycloset : MYCLOSET,
    clothes_item : CLOTHES_ITEM,
    wish_list : WISH_LIST
}
export default routes;