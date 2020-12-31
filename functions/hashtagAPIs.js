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

const addNewHashTag = async (request, response, db, fbAdmin) => {
    let apiKey = request.query.api_key;
    if(!checkApiKey(apiKey)) return response.json(API_KEY_INVALID_JSON);

    if(request.body.hash_tag_name==null || request.body.hash_tag_name=='undefine' || request.body.hash_tag_name=='') return response.json(API_KEY_INVALID_JSON);

    let toAddData = {
        "hash_tag_name":request.body.hash_tag_name,
        "users":[]
    };

    db.getDB().collection(HASHTAGS_COLLECTION_NAME).insertOne(toAddData, (error, result)=>{
        if(error){
            response.send(ERROR_JSON);
        } else if(result.result.ok===1){
            response.send(SUCCESS_JSON);
        } else {
            response.send(ERROR_JSON);
        }  
    });
}

const getAllHashTags = async (request, response, db, fbAdmin) => {
    let apiKey = request.query.api_key;
    if(!checkApiKey(apiKey)) return response.json(API_KEY_INVALID_JSON);

    let userId = request.query.user_id;
    let userInfo = await getUserInfo(userId, fbAdmin);  

    if(userInfo.error==true) return response.send(INVALID_USER_ID);

    db.getDB().collection(HASHTAGS_COLLECTION_NAME).find().toArray((error, documents)=>{
        if(error){
            response.send(ERROR_JSON);
        } else {
            let toSendData = JSON.parse(JSON.stringify(SUCCESS_JSON)); //make a copy of success_json
            let hashTags = [];
            for(let i in documents){
                let doc = documents[i];                
                let newDoc = {
                    "hash_tag_id":doc._id,
                    "hash_tag_name":doc.hash_tag_name,
                    "followed_by_user":doc.users.includes(userId),
                };
                hashTags.push(newDoc);
            }
            toSendData.results = hashTags;//hashTags;
            response.json(toSendData);    
        }
    });  
};

const addUserForHashTag = async (request, response, db, fbAdmin) => {
    let apiKey = request.query.api_key;
    if(!checkApiKey(apiKey)) return response.json(API_KEY_INVALID_JSON);

    let hashTagId = request.body.hash_tag_id;
    
    let userId = request.query.user_id;
    let userInfo = await getUserInfo(userId, fbAdmin);    

    if(userInfo.error==true) return response.send(INVALID_USER_ID);
    
    db.getDB().collection(HASHTAGS_COLLECTION_NAME).findOneAndUpdate({"_id":db.getPrimaryKey(hashTagId)},{$addToSet:{"users":userId}},(error, document)=>{
        if(error){
            response.send(ERROR_JSON);
        } else if(document.lastErrorObject.n===0) {
            response.send(ERROR_JSON);
        } else {
            response.send(SUCCESS_JSON);
        }
    })
};

const removeUserForHashTag = async (request, response, db, fbAdmin) => {
    let apiKey = request.query.api_key;
    if(!checkApiKey(apiKey)) return response.json(API_KEY_INVALID_JSON);

    let hashTagId = request.body.hash_tag_id;
    
    let userId = request.query.user_id;
    let userInfo = await getUserInfo(userId, fbAdmin);    

    if(userInfo.error==true) return response.send(INVALID_USER_ID);
    
    db.getDB().collection(HASHTAGS_COLLECTION_NAME).findOneAndUpdate({"_id":db.getPrimaryKey(hashTagId)},{$pull:{"users":userId}},(error, document)=>{
        if(error){
            response.send(ERROR_JSON);
        } else if(document.lastErrorObject.n===0) {
            response.send(ERROR_JSON);
        } else {
            response.send(SUCCESS_JSON);
        }
    })

    
};

const getHashTagsWithUser = async (user_id, db) => {    
    
    return await db.getDB().collection(HASHTAGS_COLLECTION_NAME).find({"users":{$in:[user_id]}}).toArray();
    
};

module.exports = {
    addNewHashTag,
    getAllHashTags,
    addUserForHashTag,
    removeUserForHashTag,
    getHashTagsWithUser
}
