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
  client.post('friendships/create', function(screen_name,id,follow) {

  })
}

function stream(tag) {
  client.stream('statuses/filter', { track: tag }, function(stream) {
    stream.on('data', function(tweet) {      
      followUser()
    });
    stream.on('error', function(error) {
      console.log(error);
    });
  });
}

stream('#reactjs,vuejs');

//TODO - add response based on mentioning botname [x]
//TODO - add follow function [-]
//TODO - add location based response / retweets [-]
//TODO - add user specific retweets / responses []
//TODO - add image upload support []
