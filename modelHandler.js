
var model;

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
    let array = string[0].toLowerCase().split(" ")
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

/*
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
    });
}) */

chrome.tabs.onUpdated.addListener((tabId, tab)=>{
    

    console.log("tab", tab.url);
    console.log("tabID", tabId);

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabId, {greeting: "hello"}, function checkIfSpoiler(paragraphs){
                    //console.log("paragraph:", paragraphs);
                    loadModel().then(() => {
                        console.log("fetched model done")
                        fetchVocabulary().then(vocab => {
                            //test of the vocabulary
                            var vectoriseddata = encoder(["The Avengers go back in time to get the Infinity Stones before they are found at various times in the MCU (Natasha sacrifices herself so Clint can get the Soul Stone). Stark develops a gauntlet which the Hulk puts on and uses to snap back the beings who were killed by the original snap. Thanos arrives and wages a full on war against all the heroes from the MCU movies. When Stark and Thanos fight, Stark takes the stones and uses them to eliminate Thanos and his army so that the universe may live in peace. The power of the stones is too much, and Stark dies. After the funeral, Banner and Wilson help Rogers go back in time to return the stones to their places of origin. Rogers returns as an old man to give the shield to Wilson. We are then shown Rogers dancing with Peggy Carter, and they kiss as the movie ends. There are no mid or end credit scenes."], vocab)
                            vocab.pop()
                            console.log("fetched vocabulary done:::::", vocab)
                            console.log("vectorised data::::::", vectoriseddata)
                            //console.log(model.summary())                
                            var paragraphsIndexToBlock = []
                            var counter = 0
                            for (i in paragraphs) {
                                if(paragraphs[i] != null) {
                                    var vocablength = encoder([paragraphs[i]], vocab).length
                                    console.log("para witb rback:", [paragraphs[i]])
                                    var output = model.predict(tf.tensor2d([encoder([paragraphs[i]], vocab)], [1, vocablength]))
                                    console.log("prediction made::", output.dataSync()[0])
                                    if(output.dataSync()[0] >= 0){
                                        console.log("predicted spoiler:", output.dataSync()[0], " counter: ", counter);
                                        paragraphsIndexToBlock.push(counter)
                                    }
                                }
                                counter++
                            }
                            chrome.tabs.sendMessage(tabId, {block: paragraphsIndexToBlock});
                        });
                    })  
                          
                });
              });
            chrome.tabs.executeScript(null, {file: './foreground.js'})
        
    
})