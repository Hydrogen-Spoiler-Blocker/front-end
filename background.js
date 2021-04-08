console.log('from background')

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab => {
        console.log(current_tab.url);
        if(/^https:/.test(current_tab.url)){
            console.log("succes");
            chrome.tabs.insertCSS(null, {file: './style.css'});
            chrome.tabs.executeScript(null, {file: './foreground.js'}, ()=>console.log("injected"))
        }
    })
})



//OPS only will run when switich to the tab. Wont run if initially visitning the website.