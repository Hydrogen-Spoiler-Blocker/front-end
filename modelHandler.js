
var model;
    
function make_prediction() {
    var a, b, output;
    a = Number(document.getElementById("first").value);
    b = Number(document.getElementById("second").value);
    input_xs = tf.tensor2d([
        [a, b]
    ]);
    output = model.predict(input_xs);
    const outputData = output.dataSync();
    document.getElementById("answer").value = Number(outputData[0] > 0.5);
}

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

async function loadModel() {
    
    const githublink = "https://raw.githubusercontent.com/Hydrogen-Spoiler-Blocker/models/master/model.json"
    model = await tf.loadLayersModel(githublink);
    console.log("model loaded")
}


loadModel().then(() => {
    fetchVocabulary().then(vocab => {
        const text = "My name is Squidward" //8 st
        console.log("parsed text from vocabulary: ",encoder(text, vocab))
        var vocablength = encoder(text, vocab).length
        var shape = [1, 8]
        console.log(model.summary())
        var output = model.predict(tf.tensor2d(encoder(text, vocab), [1, vocablength]))
        //output = model.predict([encoder(text, vocab), [vocablength, 1]])
        console.log("PREDICTION : ", output.dataSync()[0] );
        console.log("*****BODY",document.body);
    });
})


function test(paragraph){
    console.log("paragraph:", paragraph);

    //model
        //query
    
}

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab => {
        console.log(current_tab.url);
        if(/^https:/.test(current_tab.url)){
            
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, test);
              });

            chrome.tabs.executeScript(null, {file: './foreground.js'})
        }
    })
})

