const {
    getHashTagsWithUser
} = require("./hashtagAPIs.js");

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


const postFeed = async (request, response, db, fbAdmin)=>{
    
    let apiKey = request.query.api_key;
    if(!checkApiKey(apiKey)) return response.json(API_KEY_INVALID_JSON);
    
    let userId = request.query.user_id;
    let userInfo = await getUserInfo(userId, fbAdmin);    

    if(userInfo.error==true) return response.send(INVALID_USER_ID);  
        
    let feedData = request.body;
    feedData = setPostedBy(feedData, userInfo.userInfo);  
    
    db.getDB().collection(FEED_COLLECTION_NAME).insertOne(feedData,(error,result)=>{           
        if(error){
            response.send(ERROR_JSON);
        } else if(result.result.ok===1){
            response.send(SUCCESS_JSON);
        } else {
            response.send(ERROR_JSON);
        }        
    });
};

const getFeeds = async (request, response, db, fbAdmin)=>{
    
    let apiKey = request.query.api_key;
    if(!checkApiKey(apiKey)) return response.json(API_KEY_INVALID_JSON);
        
    let startFrom = parseInt(request.query.start_from);    
    db.getDB().collection(FEED_COLLECTION_NAME).find().sort({'_id':-1}).skip(startFrom).limit(NUMBER_OF_FEEDS_AT_A_TIME).toArray((error,documents)=>{
        if(error){    
            response.json(ERROR_JSON);
        } else {            
            let toSendData = JSON.parse(JSON.stringify(SUCCESS_JSON)); //make a copy of success_json
            toSendData.results = documents;
            response.json(toSendData);            
        }
    });
};

const postComment = async (request, response, db, fbAdmin)=>{
    
    let apiKey = request.query.api_key;
    if(!checkApiKey(apiKey)) return response.json(API_KEY_INVALID_JSON);    

    
    let userId = request.query.user_id;
    let userInfo = await getUserInfo(userId, fbAdmin);    

    if(userInfo.error==true) return response.send(INVALID_USER_ID);  
     

    let feed_id = request.query.feed_id;
    let commentData = request.body;
    commentData = setPostedBy(commentData, userInfo.userInfo);     

    db.getDB().collection(FEED_COLLECTION_NAME).findOne({"_id":db.getPrimaryKey(feed_id)}, (error, document)=>{
        if(error){
            response.json(ERROR_JSON);
        } else if(document.comments_on==true){
            db.getDB().collection(FEED_COLLECTION_NAME).findOneAndUpdate({"_id":db.getPrimaryKey(feed_id)},{$push:{"comments":commentData}},(error,document)=>{
                if(error){
                    response.json(ERROR_JSON);
                } else if(document.lastErrorObject.n===0) {            
                    response.json(ERROR_JSON);
                } else {
                    db.getDB().collection(FEED_COLLECTION_NAME).findOne({"_id":db.getPrimaryKey(feed_id)},(error, document)=>{
                        if(error){
                            response.json(ERROR_JSON);
                        } else {
                            let toSendData = JSON.parse(JSON.stringify(SUCCESS_JSON)); //make a copy of success_json
                            toSendData.results = [document];
                            response.json(toSendData);
                        }
                    }); 
                }
            }); 
        } else {
            response.json(COMMENTS_OFF_JSON);
        }
    });     
};

const feedReactionUpdate = async (request, response, db, fbAdmin)=>{
    
    let apiKey = request.query.api_key;
    if(!checkApiKey(apiKey)) return response.json(API_KEY_INVALID_JSON);
    
    let feed_id = request.query.feed_id;
    let user_id = request.query.user_id;
    let where = request.body.where;
    let change = parseInt(request.body.change);

    db.getDB().collection(FEED_COLLECTION_NAME).findOne({"_id":db.getPrimaryKey(feed_id)}, (error,document)=>{
        if(error){
            response.json(ERROR_JSON);
        } 
        if(document.reacted_by.includes(user_id)){
            response.json(ALREADY_REACTED_JSON);
            return;
        }         
        db.getDB().collection(FEED_COLLECTION_NAME).findOneAndUpdate({"_id":db.getPrimaryKey(feed_id)},{$inc:{[`reactions.${where}`]:change},$push:{"reacted_by":user_id}},(error,document)=>{
            if(error){
                response.json(ERROR_JSON);
            } else if(document.lastErrorObject.n===0){
                response.json(ERROR_JSON);
            } else {
                db.getDB().collection(FEED_COLLECTION_NAME).findOne({"_id":db.getPrimaryKey(feed_id)},(error, document)=>{
                    if(error){
                        response.json(ERROR_JSON);
                    } else {
                        let toSendData = JSON.parse(JSON.stringify(SUCCESS_JSON)); //make a copy of success_json
                        toSendData.results = [document];
                        response.json(toSendData);
                    }
                });            
            }
        }); 
    });  
};

const commentReactionUpdate = async (request, response, db, fbAdmin)=>{
    
    let apiKey = request.query.api_key;
    if(!checkApiKey(apiKey)) return response.json(API_KEY_INVALID_JSON);

    
    let feed_id = request.query.feed_id;
    let user_id = request.query.user_id;
    let comment_index =  parseInt(request.query.comment_index);
    let where = request.body.where;
    let change = parseInt(request.body.change);

    db.getDB().collection(FEED_COLLECTION_NAME).findOne({"_id":db.getPrimaryKey(feed_id)},(error, document)=>{
        if(error){
            response.json(ERROR_JSON);
        }
        if(comment_index < document.comments.length){
            if(document.comments[comment_index].reacted_by.includes(user_id)){
                response.json(ALREADY_REACTED_JSON);
                return;
            } else {                
                db.getDB().collection(FEED_COLLECTION_NAME).findOneAndUpdate({"_id":db.getPrimaryKey(feed_id)},{$inc:{[`comments.${comment_index}.reactions.${where}`]:change},$push:{[`comments.${comment_index}.reacted_by`]:user_id}},(error,document)=>{
                    if(error){            
                        response.json(document);
                    } else if(document.lastErrorObject.n===0){
                        response.json(ERROR_JSON);
                    } else {
                        db.getDB().collection(FEED_COLLECTION_NAME).findOne({"_id":db.getPrimaryKey(feed_id)},(error, document)=>{
                            if(error){
                                response.json(ERROR_JSON);
                            } else {
                                let toSendData = JSON.parse(JSON.stringify(SUCCESS_JSON)); //make a copy of success_json
                                toSendData.results = [document];
                                response.json(toSendData);
                            }
                        }); 
                    }
                });    
            }
        } else {
            response.json(ERROR_JSON);
        }
    });
};

const getFeedWithHashTag = async (request, response, db, fbAdmin) => {

    let apiKey = request.query.api_key;
    if(!checkApiKey(apiKey)) return response.json(API_KEY_INVALID_JSON);

    let hashTags = request.body.hash_tags;

    let startFrom = parseInt(request.query.start_from);

    await getFeedWithHashTagUtility(response, hashTags, startFrom, db);
};

const getFeedForUser = async (request, response, db, fbAdmin) => {    
    
    let apiKey = request.query.api_key;
    if(!checkApiKey(apiKey)) return response.json(API_KEY_INVALID_JSON);    
    
    let userId = request.query.user_id;
    let userInfo = await getUserInfo(userId, fbAdmin);    

    if(userInfo.error==true) return response.send(INVALID_USER_ID); 
    
    let hashTagForUser = await getHashTagsWithUser(userId, db);

    let hashTags = [];
    
    hashTagForUser.forEach((doc)=>{        
        hashTags.push(doc.hash_tag_name);
    });

    let startFrom = parseInt(request.query.start_from);

    await getFeedWithHashTagUtility(response, hashTags, startFrom, db);
}

const getFeedWithHashTagUtility = async (response, hashTags, startFrom, db) => {

    db.getDB().collection(FEED_COLLECTION_NAME).find({"hashtags":{$in:hashTags}}).sort({"_id":-1}).skip(startFrom).limit(NUMBER_OF_FEEDS_AT_A_TIME).toArray((error, documents)=>{
        if(error){
            response.send(ERROR_JSON);
        } else {
            let toSendData = JSON.parse(JSON.stringify(SUCCESS_JSON));
            toSendData.results = documents;
            response.json(toSendData);   
        }
    });

}

module.exports = {
    postFeed, 
    getFeeds,
    postComment,
    feedReactionUpdate,
    commentReactionUpdate,
    getFeedWithHashTag,
    getFeedForUser,
};