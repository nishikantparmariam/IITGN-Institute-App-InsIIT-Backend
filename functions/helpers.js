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

const checkApiKey = (apiKey)=>{
    return VALID_API_KEYS.includes(apiKey);
}

const giveTimeStamp = ()=>{
    return Math.floor(new Date().getTime() / 1000);
}

const setPostedBy = (data, userInfo)=>{      
    data["posted_by"] = userInfo;
    return data;
};

const getUserInfo = async (userId, fbAdmin)=>{

    let userInfo = {"error":true, userInfo:null};

    await fbAdmin.auth().getUser(userId).then((userRecord)=>{

        userInfo.userInfo = {    
                        "user_id":userRecord.uid, 
                        "email":userRecord.email, 
                        "full_name":userRecord.displayName, 
                        "image_link":userRecord.photoURL,                         
                    };
        userInfo.error = false;

    }).catch((error)=>{

        userInfo.msg = error.message; 

    });

    return userInfo;
};

module.exports = {

    checkApiKey,
    giveTimeStamp,
    setPostedBy,
    getUserInfo

}