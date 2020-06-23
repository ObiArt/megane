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
        //--------------Search page----------------------
        if (images[i].src.search("/?do=search") != -1){
        
        //---------------game covers-----------------
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