const { expect } = require("chai");
const { ethers } = require("hardhat");
require("chai").should();

describe("EPIC Tweet Console Smart Contract", function () {
  let EpicApp;
  let epicApp;
  let user1, user2;

  beforeEach(async function () {
    EpicApp = await ethers.getContractFactory("EpicApp");
    [user1, user2] = await ethers.getSigners();
    epicApp = await EpicApp.deploy();
  });

  it("Tweet count should be 0 when no tweets are created", async function () {
    const tweets = await epicApp.getTotalTweets();
    expect(tweets).to.equal(0);
  });

  it("User 1 can create a Tweet", async function () {
    await epicApp.connect(user1).createTweet("Hello, This is my first tweet.");
    const tweets = await epicApp.getTotalTweets();
    expect(tweets).to.equal(1);
  });

  it("User 1 can edit his/her Tweet", async function () {
    await epicApp.connect(user1).createTweet("Hello, This is my first tweet.");
    const tweets = await epicApp.getTotalTweets();
    expect(tweets).to.equal(1);

    await epicApp
      .connect(user1)
      .updateTweet(0, "Hello, This is my edited first tweet.");

    const editedTweet = await epicApp.getTweet(0);
    expect(editedTweet.tweet).to.equal("Hello, This is my edited first tweet.");
  });

  it("User 1 can delete his/her Tweet", async function () {
    await epicApp.connect(user1).createTweet("Hello, This is my first tweet.");

    await epicApp.connect(user1).createTweet("This is User1's second tweet!!");
    const tweets = await epicApp.getTotalTweets();
    expect(tweets).to.equal(2);

    await epicApp.connect(user1).deleteTweet(0);
    const tweetCount = await epicApp.getTotalTweets();
    expect(tweetCount).to.equal(1);
  });

  it("User 2 cannot edit User 1's Tweet", async function () {
    await epicApp.connect(user1).createTweet("Hello, This is my first tweet.");
    await epicApp.connect(user2).createTweet("Hello, User2's First tweet!");
    const tweets = await epicApp.getTotalTweets();
    expect(tweets).to.equal(2);

    await epicApp
      .connect(user2)
      .updateTweet(0, "Hello, I am editing my first tweet.")
      .should.be.revertedWith("You cannot Update Tweet");

    const _tweet = await epicApp.getTweet(0);
    expect(_tweet.tweet).to.equal("Hello, This is my first tweet.");
    expect(_tweet.author).to.equal(user1.address);

    const tweetCount = await epicApp.getTotalTweets();
    expect(tweetCount).to.equal(2);
  });

  it("User cannot edit a tweet to be empty", async function () {
    await epicApp.connect(user1).createTweet("Hello, This is my first tweet.");
    const tweetCount = await epicApp.getTotalTweets();
    expect(tweetCount).to.equal(1);

    await epicApp
      .connect(user1)
      .updateTweet(0, "")
      .should.be.revertedWith("Tweet content cannot be empty.");

    const _tweet = await epicApp.getTweet(0);
    expect(_tweet.tweet).to.equal("Hello, This is my first tweet.");
  });

  it("User cannot edit a tweet that does not exist", async function () {
    await epicApp.connect(user1).createTweet("Hello, This is my first tweet.");
    const tweetCount = await epicApp.getTotalTweets();
    expect(tweetCount).to.equal(1);

    await epicApp.connect(user2).createTweet("Hello, User2's First tweet!");
    const _tweetCount = await epicApp.getTotalTweets();
    expect(_tweetCount).to.equal(2);

    await epicApp
      .connect(user1)
      .updateTweet(3, "Hello, I am editing my first tweet.")
      .should.be.revertedWith("Tweet ID is invalid.");
  });

  it("User 2 cannot delete User 1's Tweet", async function () {
    await epicApp.connect(user1).createTweet("Hello, This is my first tweet.");
    const tweetsCount = await epicApp.getTotalTweets();
    expect(tweetsCount).to.equal(1);

    await epicApp.connect(user2).createTweet("Hello, User2's First tweet!");
    const _tweetsCount = await epicApp.getTotalTweets();
    expect(_tweetsCount).to.equal(2);

    await epicApp
      .connect(user2)
      .deleteTweet(0)
      .should.be.revertedWith("You cannot delete this tweet.");

    const _tweet = await epicApp.getTweet(0);
    expect(_tweet.tweet).to.equal("Hello, This is my first tweet.");
    expect(_tweet.author).to.equal(user1.address);
  });

  it("User cannot delete a tweet that does not exist", async function () {
    await epicApp.connect(user1).createTweet("Hello, This is my first tweet.");
    const tweetCount = await epicApp.getTotalTweets();
    expect(tweetCount).to.equal(1);

    await epicApp.connect(user2).createTweet("Hello, User2's First tweet!");
    const _tweetCount = await epicApp.getTotalTweets();
    expect(_tweetCount).to.equal(2);

    await epicApp
      .connect(user1)
      .deleteTweet(3)
      .should.be.revertedWith("Tweet ID is invalid.");
  });
});
