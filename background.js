var parser = new DOMParser()

function gettingPage(result, z){ //Online reading exploit
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

function gettingCover(result){ //Download page exploit
    var downloadpage = parser.parseFromString(result, 'text/html')
    cover = downloadpage.querySelector(`img[id="cover"]`).src.replace("https://henchan.pro", "").replace("https://img.", "https://")
    return cover
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    fetch(request[0] + "?&development_access=true").then(r => r.text()).then(website => {
        //------Reading exploit---------
        if (request[2] == "reading"){
            sendResponse(gettingPage(website, request[1]))

        //------Download exploit--------
        } else if (request[2] == "download") {
            sendResponse(gettingCover(website))
        }
    })
    return true
})