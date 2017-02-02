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

function stream(tag) {
  client.stream('statuses/filter',{track: tag},function(stream) {
    stream.on('data',function(tweet) {
      userRetweet(tweet.id_str);
    });
    stream.on('error',function(error) {
      console.log(error);
    })
  })
}

stream('#frontend');


