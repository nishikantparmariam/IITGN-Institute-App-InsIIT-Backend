# IITGN-Institute-App-InsIIT-Backend ⭐

Backend for IIT Gandhinagar's Institute App "InsIIT" written in NodeJs with MongoDB.

Hosted at https://serene-reaches-30469.herokuapp.com 

## Contribute ✨

- Download and import the file [Postman-API-Documentation-Collection.json](Postman-API-Documentation-Collection.json) in your Postman to build, write and test backend APIs.
- You can set-up your own Firebase config file in [constants/firebaseKey.json](constants/firebaseKey.json), include your MongoDB connection string in [db.js](db.js).
- You can add your own API key in [constants/values.js](constants/values.js) in `VALID_API_KEYS`. You can also contact developers for your own key for production version of backend otherwise you may host it on your own in a [Heroku](Heroku) project.
- Read API documentation below or through [Postman-API-Documentation-Collection.json](Postman-API-Documentation-Collection.json) by importing.

## Directory Structure 📁
```
.
├── Postman-API-Documentation-Collection.json <Postman API collection>
├── Procfile <For Heroku>
├── README.md <this file>
├── constants
│   ├── firebaseKey.json <Firebase connection>
│   └── values.js <Constant values>
├── db.js <Connection With MongoDB>
├── functions
│   ├── commonAPIs.js <API logic for common ones>
│   ├── feedAPIs.js <API logic for Feed>
│   ├── hashtagAPIs.js <API logic for Hashtags>
│   └── helpers.js <Useful functions>
├── package-lock.json
├── package.json
└── server.js <Main file, server endpoints>

```

## API Documentation 🔥

### 1. Post Feed

**URL** /postFeed

**Method** `POST`
  
**URL Params**   `api_key=[String]`&nbsp;`user_id=[String]`

**Data Params**

  ```
    {    
        "content":"Feed 1",
        "timestamp":"31-12-2020 21:08",
        "image_urls":["url 1", "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"],
        "comments":[],    
        "hashtags":["btech","alert","covid19"],
        "reactions":{
            "like":0,
            "insightful":0,
            "celebrate":0,
            "haha":0                           
        },
        "comments_on":true,
        "reacted_by":[]
    }
  ```

**Success Response:**

  ```
    {
        "success": true,
        "message": "Query was successful"
    }
  ```
 
**Error Response:**

  ```
    {
        "success": false,
        "message": "Error message"
    }
  ```


### 2. Get All Feed

**URL** /getFeeds

**Method** `GET`
  
**URL Params**   `api_key=[String]`&nbsp;`start_from=[Integer]`

**Data Params** `none`

**Success Response:**

  ```
    {
        "success": true,
        "message": "Query was successful",
        "results": [
            {
                "_id": "5fedf35e2fa1880004170f0c",
                "content": "Feed 3",
                "timestamp": "31-12-2020 21:08",
                "image_urls": [
                    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
                    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                ],
                "comments": [],
                "hashtags": [
                    "india",
                    "btech"
                ],
                "reactions": {
                    "like": 0,
                    "insightful": 0,
                    "celebrate": 0,
                    "haha": 0
                },
                "comments_on": false,
                "reacted_by": [],
                "posted_by": {
                    "user_id": "1aSsRDsu3qfwVliZRgzy71X3y2f2",
                    "email": "praveen.venkatesh@iitgn.ac.in",
                    "full_name": "Praveen Venkatesh",
                    "image_link": "https://lh3.googleusercontent.com/a-/AOh14Ghi7Z0v76O59DIznGptIgGukFEPdvT3-FJQwJfv0w=s96-c"
                }
            },
            {
                "_id": "5fedf3462fa1880004170f0b",
                "content": "Feed 2",
                "timestamp": "31-12-2020 21:08",
                "image_urls": [
                    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
                    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                ],
                "comments": [],
                "hashtags": [
                    "amalthea",
                    "india"
                ],
                "reactions": {
                    "like": 0,
                    "insightful": 0,
                    "celebrate": 0,
                    "haha": 0
                },
                "comments_on": true,
                "reacted_by": [],
                "posted_by": {
                    "user_id": "1aSsRDsu3qfwVliZRgzy71X3y2f2",
                    "email": "praveen.venkatesh@iitgn.ac.in",
                    "full_name": "Praveen Venkatesh",
                    "image_link": "https://lh3.googleusercontent.com/a-/AOh14Ghi7Z0v76O59DIznGptIgGukFEPdvT3-FJQwJfv0w=s96-c"
                }
            },
            {
                "_id": "5fedf0e22fa1880004170f0a",
                "content": "Feed 1",
                "timestamp": "31-12-2020 21:08",
                "image_urls": [
                    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
                    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                ],
                "comments": [],
                "hashtags": [
                    "btech",
                    "alert",
                    "covid19"
                ],
                "reactions": {
                    "like": 0,
                    "insightful": 0,
                    "celebrate": 0,
                    "haha": 0
                },
                "comments_on": true,
                "reacted_by": [],
                "posted_by": {
                    "user_id": "1aSsRDsu3qfwVliZRgzy71X3y2f2",
                    "email": "praveen.venkatesh@iitgn.ac.in",
                    "full_name": "Praveen Venkatesh",
                    "image_link": "https://lh3.googleusercontent.com/a-/AOh14Ghi7Z0v76O59DIznGptIgGukFEPdvT3-FJQwJfv0w=s96-c"
                }
            }
        ]
    }
  ```
 
**Error Response:**

  ```
    {
        "success": false,
        "message": "Error message"
        "results":[]
    }
  ```


### 3. Post Comment

**URL** /postComment

**Method** `POST`
  
**URL Params**   `api_key=[String]`&nbsp;`feed_id=[String]`&nbsp;`user_id=[String]`

**Data Params**

  ```
    {    
        "content":"Comment 1 on Feed 1",
        "timestamp":"11-05-2020 14:24",    
        "reactions":{
            "like":0,
            "insightful":0,
            "celebrate":0,
            "haha":0                          
        },
        "reacted_by":[]    
    }
  ```

**Success Response:**

  ```
    {
        "success": true,
        "message": "Query was successful",
        "results": [
            {
                "_id": "5fedf0e22fa1880004170f0a",
                "content": "Feed 1",
                "timestamp": "31-12-2020 21:08",
                "image_urls": [
                    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
                    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                ],
                "comments": [
                    {
                        "content": "Comment 1 on Feed 6",
                        "timestamp": "11-05-2020 14:24",
                        "reactions": {
                            "like": 0,
                            "insightful": 0,
                            "celebrate": 0,
                            "haha": 0
                        },
                        "reacted_by": [],
                        "posted_by": {
                            "user_id": "1aSsRDsu3qfwVliZRgzy71X3y2f2",
                            "email": "praveen.venkatesh@iitgn.ac.in",
                            "full_name": "Praveen Venkatesh",
                            "image_link": "https://lh3.googleusercontent.com/a-/AOh14Ghi7Z0v76O59DIznGptIgGukFEPdvT3-FJQwJfv0w=s96-c"
                        }
                    }
                ],
                "hashtags": [
                    "btech",
                    "alert",
                    "covid19"
                ],
                "reactions": {
                    "like": 0,
                    "insightful": 0,
                    "celebrate": 0,
                    "haha": 0
                },
                "comments_on": true,
                "reacted_by": [],
                "posted_by": {
                    "user_id": "1aSsRDsu3qfwVliZRgzy71X3y2f2",
                    "email": "praveen.venkatesh@iitgn.ac.in",
                    "full_name": "Praveen Venkatesh",
                    "image_link": "https://lh3.googleusercontent.com/a-/AOh14Ghi7Z0v76O59DIznGptIgGukFEPdvT3-FJQwJfv0w=s96-c"
                }
            }
        ]
    }
  ```
 
**Error Response:**

  ```
    {
        "success": false,
        "message": "Error message"
        "results":[]
    }
  ```


### 4. Feed Reaction Update

**URL** /feedReactionUpdate

**Method** `POST`
  
**URL Params**   `api_key=[String]`&nbsp;`feed_id=[String]`&nbsp;`user_id=[String]`

**Data Params**

  ```
    {
        "where":"insightful",
        "change":1
    }
  ```

**Success Response:**

  ```
    {
        "success": true,
        "message": "Query was successful",
        "results": [
            {
                "_id": "5fedf0e22fa1880004170f0a",
                "content": "Feed 1",
                "timestamp": "31-12-2020 21:08",
                "image_urls": [
                    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
                    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                ],
                "comments": [
                    {
                        "content": "Comment 1 on Feed 6",
                        "timestamp": "11-05-2020 14:24",
                        "reactions": {
                            "like": 0,
                            "insightful": 0,
                            "celebrate": 0,
                            "haha": 0
                        },
                        "reacted_by": [],
                        "posted_by": {
                            "user_id": "1aSsRDsu3qfwVliZRgzy71X3y2f2",
                            "email": "praveen.venkatesh@iitgn.ac.in",
                            "full_name": "Praveen Venkatesh",
                            "image_link": "https://lh3.googleusercontent.com/a-/AOh14Ghi7Z0v76O59DIznGptIgGukFEPdvT3-FJQwJfv0w=s96-c"
                        }
                    }
                ],
                "hashtags": [
                    "btech",
                    "alert",
                    "covid19"
                ],
                "reactions": {
                    "like": 0,
                    "insightful": 1,
                    "celebrate": 0,
                    "haha": 0
                },
                "comments_on": true,
                "reacted_by": [
                    "1aSsRDsu3qfwVliZRgzy71X3y2f2"
                ],
                "posted_by": {
                    "user_id": "1aSsRDsu3qfwVliZRgzy71X3y2f2",
                    "email": "praveen.venkatesh@iitgn.ac.in",
                    "full_name": "Praveen Venkatesh",
                    "image_link": "https://lh3.googleusercontent.com/a-/AOh14Ghi7Z0v76O59DIznGptIgGukFEPdvT3-FJQwJfv0w=s96-c"
                }
            }
        ]
    }
  ```
 
**Error Response:**

  ```
    {
        "success": false,
        "message": "Error message"
        "results":[]
    }
  ```

### 5. Comment Reaction Update

**URL** /commentReactionUpdate

**Method** `POST`
  
**URL Params**   `api_key=[String]`&nbsp;`feed_id=[String]`&nbsp;`user_id=[String]`&nbsp;`comment_index=[Integer]`

**Data Params**

  ```
    {
        "where":"haha",
        "change":1
    }
  ```

**Success Response:**

  ```
    {
        "_id": "5fedf0e22fa1880004170f0a",
        "content": "Feed 1",
        "timestamp": "31-12-2020 21:08",
        "image_urls": [
            "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
            "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
        ],
        "comments": [
            {
                "content": "Comment 1 on Feed 6",
                "timestamp": "11-05-2020 14:24",
                "reactions": {
                    "like": 0,
                    "insightful": 0,
                    "celebrate": 0,
                    "haha": 1
                },
                "reacted_by": [
                    "1aSsRDsu3qfwVliZRgzy71X3y2f2"
                ],
                "posted_by": {
                    "user_id": "1aSsRDsu3qfwVliZRgzy71X3y2f2",
                    "email": "praveen.venkatesh@iitgn.ac.in",
                    "full_name": "Praveen Venkatesh",
                    "image_link": "https://lh3.googleusercontent.com/a-/AOh14Ghi7Z0v76O59DIznGptIgGukFEPdvT3-FJQwJfv0w=s96-c"
                }
            }
        ],
        "hashtags": [
            "btech",
            "alert",
            "covid19"
        ],
        "reactions": {
            "like": 0,
            "insightful": 1,
            "celebrate": 0,
            "haha": 0
        },
        "comments_on": true,
        "reacted_by": [
            "1aSsRDsu3qfwVliZRgzy71X3y2f2"
        ],
        "posted_by": {
            "user_id": "1aSsRDsu3qfwVliZRgzy71X3y2f2",
            "email": "praveen.venkatesh@iitgn.ac.in",
            "full_name": "Praveen Venkatesh",
            "image_link": "https://lh3.googleusercontent.com/a-/AOh14Ghi7Z0v76O59DIznGptIgGukFEPdvT3-FJQwJfv0w=s96-c"
        }
    }
  ```
 
**Error Response:**

  ```
    {
        "success": false,
        "message": "You have already reacted/ Error message"
    }
  ```


### 6. Add New Hash Tag (Admin Only)

**URL** /addNewHashTag

**Method** `POST`
  
**URL Params**   `api_key=[String]`

**Data Params**

  ```
    {
        "hash_tag_name":"happynewyear"
    }
  ```

**Success Response:**

  ```
    {
        "success": true,
        "message": "Query was successful"
    }
  ```
 
**Error Response:**

  ```
    {
        "success": false,
        "message": "Error message"
    }    
  ```


### 7. Get All Hash Tags

**URL** /getAllHashTags

**Method** `GET`
  
**URL Params**   `api_key=[String]`&nbsp;`user_id=[String]`

**Data Params** `none`

**Success Response:**

  ```
    {
        "success": true,
        "message": "Query was successful",
        "results": [
            {
                "hash_tag_id": "5fe35baf6258e30d38be9a14",
                "hash_tag_name": "blithcron",
                "followed_by_user": true
            },
            {
                "hash_tag_id": "5fe35bb36258e30d38be9a15",
                "hash_tag_name": "alert",
                "followed_by_user": true
            },
            {
                "hash_tag_id": "5fe35bb76258e30d38be9a16",
                "hash_tag_name": "covid19",
                "followed_by_user": true
            },
            {
                "hash_tag_id": "5fe35bbb6258e30d38be9a17",
                "hash_tag_name": "msc",
                "followed_by_user": true
            },
            {
                "hash_tag_id": "5fe35bbf6258e30d38be9a18",
                "hash_tag_name": "btech",
                "followed_by_user": true
            },
            {
                "hash_tag_id": "5fe35bd26258e30d38be9a19",
                "hash_tag_name": "amalthea",
                "followed_by_user": true
            },
            {
                "hash_tag_id": "5fe35bd66258e30d38be9a1a",
                "hash_tag_name": "uk",
                "followed_by_user": true
            },
            {
                "hash_tag_id": "5fe35be36258e30d38be9a1b",
                "hash_tag_name": "india",
                "followed_by_user": true
            },
            {
                "hash_tag_id": "5fe35bf56258e30d38be9a1c",
                "hash_tag_name": "iitgn",
                "followed_by_user": true
            },
            {
                "hash_tag_id": "5fe35bf96258e30d38be9a1d",
                "hash_tag_name": "coding",
                "followed_by_user": false
            },
            {
                "hash_tag_id": "5fedf77d2fa1880004170f0d",
                "hash_tag_name": "happynewyear",
                "followed_by_user": false
            }
        ]
    }
  ```
 
**Error Response:**

  ```
    {
        "success": false,
        "message": "Error message"
    }    
  ```


