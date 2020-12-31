/////////////////////////////////////////////////////////////////////
//                                                                 //
//            WELCOME TO IITGN-INSTIAPP-InsIIT-BACKEND             //
//                                                                 //
/////////////////////////////////////////////////////////////////////
//                                                                 //
//                   AUTHOR : NISHIKANT PARMAR                     //
//                                                                 //
//                 (nishikant.parmar@iitgn.ac.in)                  //
//                                                                 //
/////////////////////////////////////////////////////////////////////
//                                                                 //
//   RULES FOR DECLARING VARIABLE (if you wish to contribute) -    //
//                                                                 //
//   GENERAL VARS | (camel casing) jsonData, errorMessage, reponse //
//                                                                 //
//   GLOBAL CONSTANTS | (full caps) ERROR_JSON, PORT               // 
//                                                                 //
//   DB, FRONTEND PARAMS | (with underscore) start_from, api_key   //
//                                                                 //
///////////////////////////////////////////////////////////////////// 



//DEPENDENCIES
let app = require('express')();
let db = require('./db.js');
let bodyParser = require('body-parser');

//FIREBASE
var fbAdmin = require("firebase-admin");
var fbKey = require("./constants/firebaseKey.json");
var fbApp = fbAdmin.initializeApp({
  credential: fbAdmin.credential.cert(fbKey),
  databaseURL: "https://iitgn-instituteapp.firebaseio.com"
});

//FEED APIs
const {

    postFeed,
    getFeeds,
    postComment,
    feedReactionUpdate,
    commentReactionUpdate,     
    getFeedWithHashTag,
    getFeedForUser,

} = require('./functions/feedAPIs.js');

//COMMON APIs
const {

    homeGet,
    invalidAPI,

} = require('./functions/commonAPIs.js');

//HASHTAGS APIs
const {
    addNewHashTag,
    getAllHashTags,
    addUserForHashTag,
    removeUserForHashTag,
} = require('./functions/hashtagAPIs.js');

//GLOBAL CONSTANTS
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

} = require("./constants/values.js");

//GLOBAL FUNCTIONS
const {

    checkApiKey,
    giveTimeStamp,
    setPostedBy,
    getUserInfo

} = require("./functions/helpers.js");
const { request, response } = require('express');

//MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

//HOME
app.get('/',async (request,response)=>{    
    await homeGet(request, response, db, fbAdmin); 
});

//POST A FEED 
app.post('/postFeed', async(request,response)=>{
    await postFeed(request, response, db, fbAdmin);    
});

//GET ALL FEED
app.get('/getFeeds',async (request,response)=>{     
    await getFeeds(request, response, db, fbAdmin);
});

//GET FEED WITH HASHTAGS
app.post('/getFeedWithHashTag', async (request, response)=>{
    await getFeedWithHashTag(request, response, db, fbAdmin);
});

//GET FEED FOR A PARTICULAR USER
app.get('/getFeedForUser', async (request, response)=>{
    await getFeedForUser(request, response, db, fbAdmin);
});

//POST A COMMENT
app.post('/postComment', async (request,response)=>{
    await postComment(request, response, db, fbAdmin);  
});


//UPDATE REACTIONS FEED
app.post('/feedReactionUpdate',async (request,response)=>{
    await feedReactionUpdate(request, response, db, fbAdmin); 
});

//UPDATE UPVOTE COMMENT
app.post('/commentReactionUpdate',async (request,response)=>{
    await commentReactionUpdate(request, response, db, fbAdmin);
});

//GET ALL HASHTAGS
app.get('/getAllHashTags', async (request, response)=>{
    await getAllHashTags(request, response, db, fbAdmin);
});

//ADD NEW HASHTAG
app.post('/addNewHashTag', async (request, response)=>{
    await addNewHashTag(request, response, db, fbAdmin);
});

//ADD USER FOR A HASHTAG
app.post('/addUserForHashTag', async (request, response)=>{
    await addUserForHashTag(request, response, db, fbAdmin);
});

//REMOVE USER FROM A HASHTAG
app.post('/removeUserForHashTag', async (request, response)=>{
    await removeUserForHashTag(request, response, db, fbAdmin);
});

//HANDLE INVALID QUERIES
app.get('*',async (request,response)=>{
    await invalidAPI(request, response, db, fbAdmin); 
});

//CONNECT TO MONGO DB
db.connect((error)=>{
    console.log("Trying to connect to db...");
    if(error){
        console.log("Could not connect to db");
        console.log(error);
        process.exit(1);
    } else {
        app.listen(PORT,()=>{
            console.log("Connected to db");
            console.log("Listening to "+PORT);
        });                
    }
});