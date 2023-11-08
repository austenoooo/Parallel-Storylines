
let corpus = [];


function getCorpusData() {
    var corpusRef = db.ref("/group/corpus");
    corpusRef.on("child_added", (data) => {
    //   console.log("add", data.key, data.val());
      corpus.push(data.val());
    });

    console.log(corpus);
}

function updateCorpusData() {
    // replace punctuation with space and split by space
    let storyWords = story.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    let words = storyWords.split(" ")
    for (let i = 0; i < words.length; i++){
        let word = words[i];
        if (!corpus.includes(word.toLowerCase()) && word != "" && word != " "){
            corpus.push(word.toLowerCase());
        }
    }

    // push the updated corpus to database
    let dbInfo = db.ref("group/corpus").set(corpus);
}



// create the 3D space for each of the word

