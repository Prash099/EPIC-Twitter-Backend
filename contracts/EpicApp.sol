// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9 <0.9.0;

contract EpicApp {
  struct Twitter {
    string tweet;
    address author;
    uint32 timestamp;
    bool deleted;
  }

  Twitter[] public tweets;

  uint256 public totalTweets;

  constructor() {
    totalTweets = 0;
  }

  mapping(uint256 => address) public tweeters;

  /*
   * @dev Returns all tweets.
   * @return tweets The array of tweets.
   */
  function getAllTweets() public view returns (Twitter[] memory) {
    return tweets;
  }

  /*
   * @dev Returns particular tweet with tweet_ID.
   * @param _tweetId The id of the tweet to edit.
   * @return tweets The array of tweet.
   */
  function getTweet(
    uint256 _tweetID
  )
    public
    view
    returns (string memory tweet, address author, uint32 timestamp)
  {
    require(tweets[_tweetID].deleted == false, "This tweet has been deleted.");

    return (
      tweets[_tweetID].tweet,
      tweets[_tweetID].author,
      tweets[_tweetID].timestamp
    );
  }

  /*
   * @dev Returns length of tweets
   * @return tweets The count of tweets.
   */
  function getTotalTweets() public view returns (uint256 length) {
    return tweets.length;
  }

  /*
   * @dev Creates a new tweet.
   * @param _content The content of the tweet.
   */
  function createTweet(string memory tweet) public {
    require(bytes(tweet).length != 0, "Tweet content cannot be empty.");

    Twitter memory newTweet = Twitter(
      tweet,
      msg.sender,
      uint32(block.timestamp),
      false
    );
    tweets.push(newTweet);
    tweeters[tweets.length - 1] = msg.sender;
  }

  /*
   * @dev Edits a particular tweet.
   * @param _tweetId The id of the tweet to edit.
   * @param index The index of the tweet to edit.
   * @param _content The new content of the tweet.
   */
  function updateTweet(uint256 index, string memory TweetUpdate) public {
    require(index < tweets.length && index >= 0, "Tweet ID is invalid.");
    require(bytes(TweetUpdate).length != 0, "Tweet content cannot be empty.");
    require(msg.sender == tweeters[index], "You cannot Update Tweet");
    tweets[index].tweet = TweetUpdate;
    tweets[index].timestamp = uint32(block.timestamp);
  }

  /*
   * @dev Deletes a particular tweet.
   * @param _tweetId The id of the tweet to be deleted.
   */
  function deleteTweet(uint256 _tweetID) public {
    require(_tweetID < tweets.length && _tweetID >= 0, "Tweet ID is invalid.");
    require(msg.sender == tweeters[_tweetID], "You cannot delete this tweet.");
    for (uint i = _tweetID; i < tweets.length - 1; i++) {
      tweets[i] = tweets[i + 1];
    }
    tweets.pop();
  }
}
