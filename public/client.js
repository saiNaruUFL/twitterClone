
const closeButtons = document.getElementsByClassName("close-button");
const closeButton = closeButtons[0];
const tweetButtons = document.getElementsByClassName("tweet-button");
const tweetButton = tweetButtons[0];
const popUps = document.getElementsByClassName("pop-up")
const popUp = popUps[0];
const tweetButton3s = document.getElementsByClassName("tweet-button-3");
const tweetButton3 = tweetButton3s[0];
const tweetButton4s = document.getElementsByClassName("tweet-button-4");
const tweetButton4 = tweetButton4s[0];
const textAreas = document.getElementsByClassName("tweet-text-area");
const tweetText1 = textAreas[0];
const textAreas2 = document.getElementsByClassName("tweet-text-area-2");
const tweetText2 = textAreas2[0];
let firstTime = true;


tweetButton.addEventListener('click',function(){
  popUp.style.display = "flex";
});

closeButton.addEventListener('click',function(){
  popUp.style.display = "none";
  tweetText1.value = "";
});


tweetButton3.addEventListener('click',function(){
  const textData = tweetText1.value;

  const jsonTweet = {
    tweetText : textData,
    username: "user-1",
    date: new Date()
  };


  const options = {
    method: 'POST',
    body: JSON.stringify(jsonTweet),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  fetch('/api/tweets',options)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .then(() => {
    console.log("We reached here");
    tweetText1.value = "";
  });
});

tweetButton4.addEventListener('click',function(){
  const textData = tweetText2.value;
  console.log("Pringint Tweet 2 Text Area");
  console.log(textData);
  tweetText2.value = "";

  const jsonTweet = {
    tweetText : textData,
    username: "user-1",
    date: new Date()
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(jsonTweet),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  fetch('/api/tweets',options)
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    createTweet(res);
    $(".tweet-feed").load(".tweet-feed");
  })
  .then(() => {
    tweetText2.value = "";
  });

});


if(firstTime){
  fetch('/api/tweets')
  .then((response) => response.json())
  .then((response) => {
    for(let i = 0;i < response.length;i++){
      createTweet(response[i]);
    }
  })
  firstTime = false;
};



function createTweet(tweetJson) {
  const parents = document.getElementsByClassName("tweet-feed");
  const parent = parents[0];
  const newTweet = document.createElement("div");

  newTweet.style.display = "flex";
  newTweet.style.width = "97%";
  newTweet.style.padding = "10px";
  newTweet.style.borderBottomStyle = "solid";
  newTweet.style.borderBottomWidth = "thin";
  newTweet.style.borderBottomColor = "lightgray";
  const leftTweet = document.createElement("div");
  newTweet.style.fontFamily = " TwitterChirp, -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif";

  const profilePic = document.createElement("img");
  profilePic.src = "icons/account-person-logo.png";
  profilePic.style.width = "44px";
  leftTweet.appendChild(profilePic);
  newTweet.appendChild(leftTweet);
  
  const rightTweet = document.createElement("div");

  const userName = document.createElement("div");
  userName.innerHTML = tweetJson.username;
  userName.style.fontWeight = "bold";
  userName.style.fontSize = "16px";
  rightTweet.appendChild(userName);
  
  const tweetContent = document.createElement("p");
  tweetContent.innerHTML = tweetJson.tweetText;
  rightTweet.appendChild(tweetContent);

  newTweet.appendChild(rightTweet);
  parent.appendChild(newTweet);
}



