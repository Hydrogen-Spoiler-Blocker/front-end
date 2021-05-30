console.log("from foreground");
var array = []





chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        

        if(request.block){
            var btn = document.createElement("button")
            for (element in request.block){  
                const paragraph = document.getElementsByTagName("p")[request.block[element]]
                //document.getElementsByTagName("p")[request.block[element]].style.color = 'white'
                //document.getElementsByTagName("p")[request.block[element]].style.backgroundColor = "white"
                paragraph.classList.add("isSpoiler")
                paragraph.innerText = "Content contains spoilers"
                //document.getElementsByTagName("p")[request.block[element]].appendChild(btn)
                
            }
            
        }
        else {
            var paragraphs = document.getElementsByTagName("p")
        
            for (i in paragraphs) {
                //console.log("paragraph", paragraphs[i].innerText)
                array.push(paragraphs[i].innerText) 
            };
            //console.log("paragraphs to block::::::", array);
            sendResponse(array)
        }
    }
  );


/*
function replaceText(element){
    if(element.hasChildNodes()){
        element.childNodes.forEach(replaceText)
    } else if (element.nodeType === Text.TEXT_NODE){
        console.log(element.textContent);
        //if(element.textContent.match(/coronavirus/gi)){
        //    element.parentElement.style.color = 'black'
        //    element.parentElement.style.backgroundColor = "black"
        //}
        //element.textContent = element.textContent.replace(/coronavirus/gi, 'BLOCKED')
    }
}
*/

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


