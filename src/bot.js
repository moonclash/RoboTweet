const userKeys = require('./userKeys.js');
const Twitter = require('twitter');

const client = new Twitter(userKeys.userInfo);

function userTweet(stat) {
  client.post('statuses/update', { status: stat }, function(error, tweet, response) {
    if (error) {
      console.log(error);
    }
  });
}

function userRetweet(tweetId) {
  client.post('statuses/retweet/' + tweetId, function(error, tweet, response) {
    if (error) {
      console.log(error);
    }
  });
}

function userAnswerMentionReply(userName) {
  client.post('statuses/update', { status: `@${userName}` }, function(error, tweetReply, response) {
    if (error) {
      console.log(error);
    }
  });
}

function tweetBasedOnLocation(botLocation, userLocation, username, text) {
  const regex = new RegExp(botLocation, 'gi');
  if (userLocation.match(botLocation)) {
    client.post('favourites/create', { status: text }, function(error, tweet, response) {

      if (error) {
        console.log(error);
      }
    });
  } else {
    return;
  }

}

function followUser(userID) {
  client.post('friendships/create', {screen_name: userID}, function(screen_name,id,follow) {

  });
}

function stream(tag) {
  client.stream('statuses/filter', { track: tag }, function(stream) {
    stream.on('data', function(tweet) {      
      followUser(tweet.user.screen_name);
      userRetweet(tweet.id_str);
    });
    stream.on('error', function(error) {
      console.log(error);
    });
  });
}

function sendMessageToUser(screenName,textContent) {
  client.post('direct_messages/new',{screen_name: screenName,text: textContent},function(user,screen_name,id){
      console.log(user,screen_name,id);
  });
}



sendMessageToUser('emil_mladenov','This was sent by your bot :)');
//TODO - add response based on mentioning botname [x]
//TODO - add follow function [x]
//TODO - add send message to user function [x]
//TODO - add listen for a follower function [-]
//TODO - add location based response / retweets [-]
//TODO - add user specific retweets / responses []
//TODO - add image upload support []
