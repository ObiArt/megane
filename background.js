//Setting default values if there's nothing saved at the moment
const defaultValue = { 'hchan': 'hentai-chan.pro', 'moon': 'nude-moon.me' }
chrome.storage.sync.get(['hchan', 'moon'], function (result) {
    if (result.hchan === undefined) {
        chrome.storage.sync.set({ 'hchan': defaultValue.hchan })
    }
    if (result.moon === undefined) {
        chrome.storage.sync.set({ 'moon': defaultValue.moon })
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

function downloadExploit(result, pageUrl) { //Download page exploit
    var downloadpage = parser.parseFromString(result, 'text/html')
    cover = downloadpage.querySelector(`img[id="cover"]`).src.replace(`https://${pageUrl}`, "").replace("https://img.", "https://")
    return cover
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
        fetch(request[0] + "?&development_access=true").then(r => r.text()).then(website => {
            //------Reading exploit---------
            if (request[2] == "reading") {
                sendResponse(readingExploit(website, request[1]))

                //------Download exploit--------
            } else if (request[2] == "download") {
                sendResponse(downloadExploit(website, request[1]))
            }
        })
        return true
    }
})