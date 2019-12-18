const parser = new DOMParser()

function gettingPage(result, z){
    var startingPoint = result.search('"thumbs":')
    var endingPoint = result.slice(startingPoint, result.length).search("]") + startingPoint + 1
    var exploit = JSON.parse("{" + result.slice(startingPoint, endingPoint).replace(/'/g, '"') + "}")
    var pages = exploit.thumbs
    if (z == 2) {
        return pages[Math.round(pages.length/2)+1].replace("http://","https://").replace("manganew_webp_thumbs", "manganew_thumbs").replace(".webp", ".jpg").replace(/im(\d*)\./gm, "img.")
    } else {
        return pages[0].replace("http://","https://").replace("manganew_webp_thumbs", "manganew_thumbs").replace(".webp", ".jpg").replace(/im(\d*)\./gm, "img.")
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request)
    if (request[0] == null){
        fetch(request[1]).then(r => r.text()).then(website => {
            console.log(website)
            sendResponse(gettingPage(website, 1).replace("/manganew_thumbs/","/showfull_retina/manga/"))
        })
    } else {
        htmlDocument = parser.parseFromString(request[0], "text/html")
        nextStation = htmlDocument.getElementById("manga_images").getElementsByTagName("a")[0].href
        nextStation = nextStation.slice(nextStation.search("/online/"))
        if (nextStation.search("http") == -1) nextStation = "https://h-chan.me" + nextStation
        fetch(nextStation).then(r => r.text()).then(website => {
            sendResponse(gettingPage(website, request[1]))
        })
    }
    return true
});