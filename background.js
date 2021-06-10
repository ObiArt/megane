//Setting default values if there's nothing saved at the moment
chrome.storage.sync.get(['hchan', 'moon'], function (result) {
    if (result.hchan === undefined) {
        chrome.storage.sync.set({ 'hchan': 'hentai-chan.pro' })
        chrome.storage.sync.set({ 'moon': 'nude-moon.me' })
    }
})

var parser = new DOMParser()

function readingExploit(result, z) { //Online reading exploit
    var startingPoint = result.search('"thumbs":')
    var endingPoint = result.slice(startingPoint, result.length).search("]") + startingPoint + 1
    var exploit = JSON.parse("{" + result.slice(startingPoint, endingPoint).replace(/'/g, '"') + "}")
    var pages = exploit.thumbs
    if (z == 2) {
        return pages[Math.round(pages.length / 2) + 1].replace("http://", "https://").replace("manganew_webp_thumbs", "manganew_thumbs").replace(".webp", ".jpg").replace(/im(\d*)\./gm, "img.")
    } else {
        return pages[0].replace("http://", "https://").replace("mimg3", "imgcover").replace("manganew_webp_thumbs", "manganew_thumbs").replace(".webp", ".jpg").replace(/im(\d*)\./gm, "img.")
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (typeof (request) === 'string') {
        switch(request){
            case 'hchan':
                chrome.tabs.executeScript({file:'chan.js'})
                break
            case 'moon':
                chrome.tabs.executeScript({file:'moon.js'})
                break
        }
    } else {
        fetch(request[0]).then(r => r.text()).then(website => {
            //------Reading exploit---------
            if (request[2] == "reading") {
                sendResponse(readingExploit(website, request[1]))
            }
        })
        return true
    }
})