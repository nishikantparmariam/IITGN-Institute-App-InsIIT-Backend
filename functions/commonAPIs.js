const {
    
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

} = require("./../constants/values.js");

const {

    checkApiKey,
    giveTimeStamp,
    setPostedBy,
    getUserInfo

} = require("./helpers.js");

const homeGet = async (request, response, db, fbAdmin)=>{
    
    let apiKey = request.query.api_key;  

    if(!checkApiKey(apiKey)) {
        response.send("WELCOME TO INSTIAPP APIS :-). CONTACT US TO GET YOUR API KEY NOW!");
    }
    else {
        response.send("WELCOME TO INSTIAPP APIS :-). GO THROUGH OUR DOCS TO USE OUR APIS");
    }
};

const invalidAPI = async (request, response, db, fbAdmin)=>{

    response.send(ERROR_JSON);

};

module.exports = {
    homeGet,
    invalidAPI
};