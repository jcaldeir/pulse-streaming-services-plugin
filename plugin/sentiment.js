//sentiment.js

var sentiment = require('sentiment');
var eventStatus = ["OK", "ACKNOWLEDGED", "CLOSED", "OPEN"]; //For future use
var eventCodes = ["INFO", "WARN", "WARN", "ERROR", "ERROR", "CRITICAL"];
				
var exports = module.exports = {};

exports.isTweetValid = function ( tweet )
{
    if (! tweet.text )	{ //console.log("\nNot a valid Tweet - ", tweet); 
							return false; }
		return true;
}

exports.isTweetInContext = function ( tweet, contextWords )
{	
	        var tweetstrings = tweet.text.toLowerCase().split(" "); // the array of strings to check against
			var length = contextWords.length;
			var found = 0;
			
			while(length--) {
			   if (tweetstrings.indexOf(contextWords[length].toLowerCase())!=-1) {
				   // check strings is in yourstring
				   //console.log("\nTweet - ",  tweet.text);
				   //console.log("Tweet Context  - ", contextWords);
				   //console.log("Words found - ", contextWords[length]);
				   found++;
			   }
			   else {  //console.log("Out of Context Tweet - ",  tweet.text); 
			           return false; }
			}
			//console.log("In Context Tweet - ", tweet.text)
			//console.log("# Context Words found in Tweet - ", found)
			return true;
}

function getSentiment ( tweet )
{	
	       var sentimentAnalysis = sentiment( tweet.text ,{
								'crashed': -5,
								'unnavailable': -5,
								'impacted': -4,
								'unstable': -4,
								'inconstant': -3							
							});
			
			return sentimentAnalysis;
}


exports.getTweetSentiment = function ( tweet )
{
	return getSentiment ( tweet );
}


function getScore ( tweet )
{	
	return getSentiment( tweet ).score; 
}

exports.getTweetScore = function ( tweet )
{
	return getScore ( tweet );
}

exports.getTweetSeverity = function ( tweet )
{	
		  var score = getScore( tweet );
		  if ( score > -1 ) return eventCodes[0];
		  return eventCodes[Math.abs( score )];
}

