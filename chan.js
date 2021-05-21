var images = document.getElementsByTagName('img')
var pageUrl = location.href.match(/(?<=https:\/\/)(.*?)(?=\/)/gm)[0]

for(let i = 0; i < images.length; i++){
    //Home page
    images[i].src = images[i].src.replace("manganew_thumbs_blur", "manganew_thumbs")

    //Item page
    if (images[i].id == "cover"){
        //---------------It's a manga---------------
        if (images[i].parentNode.href.search("/online/") != -1){ 
            toget = images[i].parentNode.href.replace("http://exhentai-dono.me", `https://${pageUrl}`)
            chrome.runtime.sendMessage([toget, pageUrl, "reading"], function(response) {
                images[i].src = response.replace("manganew_thumbs", "showfull_retina/manga")
            })
        }
    } else if (images[i].src.search(/(\.ru)|(\.gif)|(\.jpg)|(\.png)|(\.webp)|(\.php)|(\.html)/gi) == -1){ //Search page
        //--------------Search page----------------------
        if (images[i].src.search("/?do=search") != -1){
            var tocheck = images[i]
            var z = 0 //checking if this node first or second (cover or page in the middle)
            while((tocheck = tocheck.previousSibling) != null) z++

            var wheretogo = ""
            //if (images[i].parentNode.nodeName == "A") wheretogo = images[i].parentNode.parentNode.nextSibling.nextSibling.childNodes[3].childNodes[0].href
            if (images[i].parentNode.nodeName == "DIV") wheretogo = images[i].parentNode //DIV CLASS="manga_images"
                                                                             .nextSibling //#text
                                                                             .nextSibling //DIV CLASS="manga_row1"
                                                                             .childNodes[1] //h2
                                                                             .childNodes[0].href.replace("/manga/", "/online/") //a
            chrome.runtime.sendMessage([wheretogo, z, "reading"], function(response) {
                images[i].src = response
            })
        }
    }
}