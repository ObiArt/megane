const parser = new DOMParser();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    htmlDocument = parser.parseFromString(request, "text/html")
    fetch(htmlDocument.getElementById("manga_images").getElementsByTagName("a")[0].href).then(r => r.text()).then(result => {
        startingPoint = result.search('"thumbs":')
        endingPoint = result.slice(startingPoint, result.length).search("]") + startingPoint + 1
        exploit = JSON.parse("{" + result.slice(startingPoint, endingPoint).replace(/'/g, '"') + "}")
        pages = exploit.thumbs

        sendResponse(pages[Math.round(pages.length/2)+1].replace("manganew_webp_thumbs", "manganew_thumbs").replace(".webp", ".jpg"))
    })
    return true
});