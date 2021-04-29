import '../img/icon-128.png'
import '../img/icon-34.png'
import * as tf from '@tensorflow/tfjs';
var model;

console.log('from background js')


async function fetchVocabulary() {
    console.log("in getVocabulary");
    let url = 'https://raw.githubusercontent.com/Hydrogen-Spoiler-Blocker/models/master/vocabulary.txt';
    console.log("fetching url...")
    let response = await fetch(url);
    // get one header
    console.log(response.headers.get('Content-Type'));
    let body = await response.text(); 
    let vocab_array = body.split("\n")
    console.log(body[13])
    console.log(vocab_array);
    console.log("vocab fetched") 
    return vocab_array
}


async function loadModel() {
    
    const githublink = "https://raw.githubusercontent.com/Hydrogen-Spoiler-Blocker/front-end/development/model.json"
    model = await tf.loadLayersModel(githublink);
    console.log("model loaded")
}


const encoder = (string, vocabulary) => {
    let array = string.toLowerCase().split(" ")
    let vectorized = []
    for (const element of array) {
      let position = vocabulary.indexOf(element)
      if (position === -1) {
        vectorized.push(1)
      } else {
        vectorized.push(position)
      }
    }
    return vectorized
}

loadModel().then(() => {
    fetchVocabulary().then(vocab => {
        const text = "movie is amazing movie is a cool kid" //8 st
        console.log("parsed text from vocabulary: ",encoder(text, vocab))
        var vocablength = encoder(text, vocab).length
        output = model.predict(tf.tensor2d([ encoder(text, vocab)]))
        //output = model.predict([encoder(text, vocab), [vocablength, 1]])
        console.log("PREDICTION : ", output );

    });
})


function makePrediction(paragraph) {
    var a, b, output;
    a = 0
    b = 1
    var input_xs = tf.tensor2d([
        [a, b]
    ]);
    output = model.predict(input_xs);
    const outputData = output.dataSync();
    console.log("predicted: ", outputData[0]);
    console.log(Number(outputData[0] > 0.5))
    console.log("predicted^")
    return Number(outputData[0] > 0.5)
    //document.getElementById("answer").value = Number(outputData[0] > 0.5);
}

window.addEventListener('load', (event) => {
    console.log("Loaded load loady lod");
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.status == 'complete') {
        console.log("ON UPDAAATED");
    }
})


chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab => {
        console.log("current URL: ",current_tab.url);
        if(/^https:/.test(current_tab.url)){

            var paragraphs = document.getElementsByTagName("p")
            console.log("dennis: ", paragraphs);
            

            /*
                webscraper.forEach(text){
                    if(makeprediction(text) > 0.5){
                        //block text
                    }
                }
            */ 
            makePrediction("hello there")
            console.log("We are inside tabs onActivated")
            
        }
    })
})