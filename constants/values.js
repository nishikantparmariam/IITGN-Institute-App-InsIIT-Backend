//GLOBAL CONSTANTS
const PORT = process.env.PORT || 3000;
const FEED_COLLECTION_NAME = "feeds";
const ROOM_COLLECTION_NAME = "rooms";
const BOOKINGS_COLLECTION_NAME = "bookings";
const HASHTAGS_COLLECTION_NAME = "hashtags";
const NUMBER_OF_FEEDS_AT_A_TIME = 15;
const ERROR_JSON = {"success":false,"message":"Some error occured"};
const SUCCESS_JSON = {"success":true,"message":"Query was successful"};
const API_KEY_INVALID_JSON = {"success":false,"message":"Invalid API KEY"};
const ALREADY_REACTED_JSON = {"success":false,"message":"You have already reacted"};
const INVALID_USER_ID = {"success":false,"message":"No user exists with given user ID"};
const COMMENTS_OFF_JSON = {"success":false,"message":"Comments are off on this post"};
const VALID_API_KEYS = []; // Contains API key. Contact developers for your key.

module.exports = {
    PORT,
    FEED_COLLECTION_NAME,
    ROOM_COLLECTION_NAME,
    BOOKINGS_COLLECTION_NAME,
    HASHTAGS_COLLECTION_NAME,
    NUMBER_OF_FEEDS_AT_A_TIME,
    ERROR_JSON,
    SUCCESS_JSON,
    API_KEY_INVALID_JSON,
    ALREADY_REACTED_JSON,
    INVALID_USER_ID,
    COMMENTS_OFF_JSON,
    VALID_API_KEYS,
}