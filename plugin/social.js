//social.js

var pulseEventStream = require('request');
var sentiment = require('./sentiment.js');
var _os = require('os');
var _conf = require('../param.json');

var _source = _os.hostname();
				
var exports = module.exports = {};

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

exports.listenToTwitterPosts = function( contextWords ) {

			var TwitterStream = require('user-stream');
			var twitter = new TwitterStream({
				consumer_key: _conf.consumer_key,
				consumer_secret: _conf.consumer_secret,
				access_token_key: _conf.access_token_key,
				access_token_secret: _conf.access_token_secret
			});

			var pulseAPI = _conf.pulseEventsAPI;
			var authorizationToken = _conf.authorizationToken;
			
			function processEvent(error, response, body) {
				
				 if (!error && response.statusCode == 202) {
										
					var result = JSON.parse(body);					
					//console.log('Event Processed', result)
					}
				else { //console.log("Response - " , response);
					   console.log("Error - " , error); }			
			}
			  
			//create stream
			twitter.stream();			
			
			//listen stream data
			twitter.on('data', function(tweet) {	
			
			if (! sentiment.isTweetValid( tweet ) ) { return; }
			
			if (! sentiment.isTweetInContext( tweet, contextWords ) ) { return; }
									
			var postData = JSON.stringify( { "fingerprintFields": [
									                "@title", "@message", "@severity"
								                   ],
									   "source": {
										  "ref": _source,
										  "type": "host"
									   },
									   "title": tweet.user.name,
									   "message": tweet.text,
									   "severity": sentiment.getTweetSeverity( tweet ),
								       "status": "OPEN",
									   "properties": {
								            "app_id": "BMC Streaming Services",
											"name": tweet.user.name,
											"screen_name": tweet.user.screen_name,
											//"description": tweet.user.description,
											//"url": tweet.user.url,
											"location": tweet.user.location,
											"time_zone": tweet.user.time_zone,
											"lang": tweet.lang,
											"followers_count": tweet.user.followers_count,
											"friends_count": tweet.user.friends_count,
											"retweeted": tweet.retweeted,
											"possibly_sensitive": tweet.possibly_sensitive
								     },
								     "tags": [] 
								 })
			  
			 
			  
			  var tweetOptions = {
						  url: pulseAPI,
						  body:  postData,
						  headers: {
							'Authorization': authorizationToken,
							'Content-type' : 'application/json; charset=UTF-8' 
						  }
				};
			 
			 pulseEventStream.post(tweetOptions, processEvent);		
			});
			
			//Error in stream
			twitter.on('error', function(error) {	
			  console.log("On Error from Twitter Stream API - ", error);
			});
			
			//Connected to stream
			twitter.on('connected', function() {	
			  console.log("Connected to Twitter Stream API");
			});
			
			//Connected to stream
			twitter.on('heartbeat', function(json) {	
			  //console.log("Heartbeat from Twitter Stream API");
			});
			
			//Stream closed
			twitter.on('close', function(closed) {	
			  console.log("Stream closed from Twitter Stream API", closed);
			});
											
}


exports.listenToLinkedInPosts = function( contextWords ) {	
	
	//For future use
	console.log("Connected to LinkedIn Stream API");	
}

exports.listenToFacebookPosts = function( contextWords ) {
	
	//For future use
	console.log("Connected to Facebook Stream API");
}


