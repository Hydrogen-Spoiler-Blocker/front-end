import '../img/icon-128.png'
import '../img/icon-34.png'
import * as tf from '@tensorflow/tfjs';
const fetch = require('node-fetch');
var model;

async function loadModel() {
    
    const githublink = "https://raw.githubusercontent.com/Hydrogen-Spoiler-Blocker/front-end/development/model.json"
    model = await tf.loadLayersModel(githublink);
    console.log("model loaded")
}

console.log('from background')
loadModel();

function makePrediction() {
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
    //document.getElementById("answer").value = Number(outputData[0] > 0.5);
}

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab => {
        console.log(current_tab.url);
        if(/^https:/.test(current_tab.url)){

            
            makePrediction()
            console.log("We are inside tabs onActivated")
            
        }
    })
})