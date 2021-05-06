
//replaceText(document.body)

//spoiler()

/*
function replaceText(element){
    if(element.hasChildNodes()){
        element.childNodes.forEach(replaceText)
    } else if (element.nodeType === Text.TEXT_NODE){
        if(element.textContent.match(/coronavirus/gi)){
            element.parentElement.style.color = 'black'
            element.parentElement.style.backgroundColor = "black"
        }
        element.textContent = element.textContent.replace(/coronavirus/gi, 'BLOCKED')
    }
}
*/



/*
// Unique ID for the className.
var MOUSE_VISITED_CLASSNAME = 'crx_mouse_visited';

// Previous dom, that we want to track, so we can remove the previous styling.
var prevDOM = null;

function spoiler(){
    // Mouse listener for any move event on the current document.
    document.addEventListener('mousemove', function (event) {
        var srcElement = event.srcElement;
    
        var children = srcElement.childNodes;
    
        [].forEach.call(children, function(child) {
            if (child.nodeType === Text.TEXT_NODE){
                if(child.textContent.length > 0){

                    // For NPE checking, we check safely. We need to remove the class name
                    // Since we will be styling the new one after.
                    if (prevDOM != null) {
                        prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
                    }

                    // Add a visited class name to the element. So we can style it.
                    srcElement.classList.add(MOUSE_VISITED_CLASSNAME);

                    // The current element is now the previous. So we can remove the class
                    // during the next iteration.
                    prevDOM = srcElement;

                    srcElement.addEventListener("click", ()=>{
                        createReportPopup()
                    })
                    
                }
            }
        })
        
    }, false);

}
function createReportPopup(){
    const button = document.createElement('button')
    button.innerText = "Report"
    button.id = "reportBtn"

    document.querySelector('body').appendChild(button)

}*/
