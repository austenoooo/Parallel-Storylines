const replicateProxy = "https://replicate-api-proxy.glitch.me";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8asf4PLmnJfUAP_BgPjerZB5oC9p9fRw",
  authDomain: "multi-story.firebaseapp.com",
  databaseURL: "https://multi-story-default-rtdb.firebaseio.com",
  projectId: "multi-story",
  storageBucket: "multi-story.appspot.com",
  messagingSenderId: "858447906529",
  appId: "1:858447906529:web:202a876f5d0ca7198359a0",
  measurementId: "G-7GLM2SV8NR"
};

let group = "story-1";
let typeOfThing = "story-text";
let db;

// the start of the story
let storyStart =
  "Beneath the twinkling stars, a lone wolf howled in the heart of the wilderness.";
let story = "";

const storyStartDiv = document.getElementById("story-start");
const storyInput = document.getElementById("story");
// storyStartDiv.innerHTML = storyStart + "...";

const generateButton = document.getElementById("generate");
const keywordsInput = document.getElementById("keywords");
generateButton.addEventListener("click", function (event) {
  getGeneration();
  console.log("try generate");
});

async function getGeneration() {
  let prompt = "Keep writing the following story for one more sentence: " + storyStart + story;
  if (keywordsInput.value != ""){
    prompt += "Keywords of the new sentences: " + keywordsInput.value; 
  }
  prompt += "the continuation of the story: "

  let data = {
    version: "8e6975e5ed6174911a6ff3d60540dfd4844201974602551e10e9e87ab143d81e",
    input: {
      prompt: prompt,
      max_new_tokens: 10000
    },
  };
  console.log("Asking for generation Info From Replicate via Proxy", data);
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const url = replicateProxy + "/create_n_get/";
  console.log("url", url, "options", options);
  const generation_info = await fetch(url, options);
  console.log("generation_response", generation_info);
  const proxy_said = await generation_info.json();

  if (proxy_said.output.length == 0) {
    // imageDiv.innerHTML = "Something went wrong, try it again";
    console.log("Something went wrong.");
  } else {
    let output = proxy_said.output.join("");
    let splitted = output.split(/\r?\n/);
    let ext;
    if (splitted.length > 1){
      ext = splitted[1];
    }
    else{
      ext = output;
    }

    if (storyStart.substring(0,10) == ext.substring(0,10)){
      story = ext;
    }
    else{
      story += ext;
    }
    
    storyInput.value = story;
    addStoryToDB();

  }
}

storyInput.addEventListener("change", (event) => {
  story = storyInput.value;
  addStoryToDB();
});

function addStoryToDB() {
  let myData = {
    story: story,
  };
  let dbInfo = db.ref("group/" + group + "/" + typeOfThing + "/").set(myData);

}

function addNewStory(){
  // create a new story instance

  // create a new instance in firebase
}


function connectToFirebase() {
  const app = firebase.initializeApp(firebaseConfig);
  db = app.database();

  var myRef = db.ref("group/" + group+ "/" + typeOfThing +"/");
  myRef.on("child_added", (data) => {
    console.log("add", data.key, data.val());
    let key = data.key;
    let value = data.val();
    //update our local variable
    console.log(value);
    story = value;
    storyInput.value = story;
    //console.log(story);
  });

  //not used
  myRef.on("child_changed", (data) => {
    console.log("changed", data.key, data.val());
  });

  //not used
  myRef.on("child_removed", (data) => {
    console.log("removed", data.key);
  });
}

connectToFirebase();