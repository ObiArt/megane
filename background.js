function gettingPage(result, z){
    var startingPoint = result.search('"thumbs":')
    var endingPoint = result.slice(startingPoint, result.length).search("]") + startingPoint + 1
    var exploit = JSON.parse("{" + result.slice(startingPoint, endingPoint).replace(/'/g, '"') + "}")
    var pages = exploit.thumbs
    if (z == 2) {
        return pages[Math.round(pages.length/2)+1].replace("http://","https://").replace("manganew_webp_thumbs", "manganew_thumbs").replace(".webp", ".jpg").replace(/im(\d*)\./gm, "img.")
    } else {
        return pages[0].replace("http://","https://").replace("mimg3", "imgcover").replace("manganew_webp_thumbs", "manganew_thumbs").replace(".webp", ".jpg").replace(/im(\d*)\./gm, "img.")
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    fetch(request[0]).then(r => r.text()).then(website => {
        sendResponse(gettingPage(website, request[1]))
    })
    return true
})