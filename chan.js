images = document.getElementsByTagName('img')

for(let i = 0; i < images.length; i++){
    //Home page
    images[i].src = images[i].src.replace("manganew_thumbs_blur", "manganew_thumbs")

    //Item page
    if (images[i].id == "cover"){
        //---------------It's a video---------------
        if (images[i].parentNode.href == undefined) { 
            toget = document.evaluate(`//a/b[text()="Скачать"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.href
            chrome.runtime.sendMessage([toget, null, "download"], function(response) {
                images[i].src = response.replace("manganew_thumbs", "showfull_retina/manga")
            })

        //---------------It's a manga---------------
        } else if (images[i].parentNode.href.search("/online/") != -1){ 
            chrome.runtime.sendMessage([images[i].parentNode.href, 1, "reading"], function(response) {
                images[i].src = response.replace("manganew_thumbs", "showfull_retina/manga")
            })
        
        //---------------It's a game----------------
        } else if (images[i].src.search("/games/") != -1) {
            toget = document.querySelector(`a[class=""]`).href
            chrome.runtime.sendMessage([toget, null, "download"], function(response) {
                images[i].src = response
            })
        } 
    } else if (images[i].src.search(/(\.ru)|(\.gif)|(\.jpg)|(\.png)|(\.webp)|(\.php)|(\.html)/gi) == -1){ //Search page
        //---------------manga covers-----------------
        if (images[i].parentElement.href.search("/manga/") != -1){
            console.log("What the hell?")
            var tocheck = images[i]
            var z = 0 //checking if this node first or second (cover or page of the middle)
            while((tocheck = tocheck.previousSibling) != null) z++;

            var wheretogo = ""
            if (images[i].parentNode.nodeName == "A") wheretogo = images[i].parentNode.parentNode.nextSibling.nextSibling.childNodes[3].childNodes[0].href
            if (images[i].parentNode.nodeName == "DIV") wheretogo = images[i].parentNode.nextSibling.nextSibling.childNodes[1].childNodes[0].href
            wheretogo = wheretogo.replace("https://henchan.pro/manga/", "http://exhentai-dono.me/online/") + "?development_access=true"

            chrome.runtime.sendMessage([wheretogo, z, "reading"], function(response) {
                images[i].src = response
            })
        
        //---------------games covers-----------------
        } else if (images[i].parentElement.href.search("/games/") != -1) {
            toget = images[i].parentElement.href.replace("https://henchan.pro/games/", "http://exhentai-dono.me/download/")
            chrome.runtime.sendMessage([toget, null, "download"], function(response) {
                images[i].src = response.replace("https://henchan.pro/showfull_retina/uploads/", "https://henchan.pro/uploads/")
            })

        //----------------video covers-----------------
        } else if (images[i].parentElement.href.search("/video/") != -1) {
            toget = images[i].parentElement.href.replace("https://henchan.pro/video/", "http://exhentai-dono.me/download/")
            chrome.runtime.sendMessage([toget, null, "download"], function(response) {
                images[i].src = response.replace("https://henchan.pro/showfull_retina/uploads/", "https://henchan.pro/uploads/")
            })
        }
    }
}