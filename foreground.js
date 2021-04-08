console.log("from foreground");


var paragraphs = document.getElementsByTagName("p")
for (element in paragraphs) {
    console.log(paragraphs[element].innerText)
    //send to AI -> callback

        //Callback: if spoiler block text
    
};
    







/*const first = document.createElement('button');
first.innerText = "SET DATA";
first.id = "first";

const second = document.createElement('button');
second.innerText = "SEND DATA";
second.id = "second";

document.querySelector('body').appendChild(first);
document.querySelector('body').appendChild(second);


first.addEventListener('click', () => {
    //chrome.storage.sync
    chrome.storage.local.set({"password": "123"});
    console.log("BUTTON PRESSED");
});


second.addEventListener('click', () => {
    chrome.runtime.sendMessage({message: 'yo check the storage'});
    console.log("sent the message");
});*/




//How to add css to elements on a website.
//document.querySelector('name of element id on website').classList.add('name of css function')

//sync between device
//chrome.storage.sync


