const userKeys = require('./userKeys.js');
const Twitter = require('twitter');

const client = new Twitter(userKeys.userInfo) ;

function userTweet(stat) {
  client.post('statuses/update',{status: stat}, function(error, tweet, response) {
  if(error) {
    console.log(error);
  }
  console.log(tweet);  
  console.log(response);  
});
}

function userRetweet(tweetId) {
  client.post('statuses/retweet/' + tweetId, function(error,tweet,response) {
    if(error) {
      console.log(error);
    }
  });
}

function userAnswerMentionReply(userName) {
  client.post('statuses/update',{status: `ok this has been fun, you need to get some sleep master @${userName}`}, function(error,tweetReply,response) {
    if(error) {
      console.log(error);
    }
  });
}

function stream(tag) {
  
  client.stream('statuses/filter',{track: tag},function(stream) {
    stream.on('data',function(tweet) {
      userAnswerMentionReply(tweet.user.screen_name);
    });
    stream.on('error',function(error) {
      console.log(error);
    })
  })
}

stream('@emsignlimitless');

//TODO - add response based on mentioning botname
//TODO - add location based response / retweets
//TODO - add user specific retweets / responses
//TODO - add image upload support



