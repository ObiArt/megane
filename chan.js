const parser = new DOMParser()

images = document.getElementsByTagName('img')

for(let i = 0; i < images.length; i++){
    //Home page
    images[i].src = images[i].src.replace("manganew_thumbs_blur", "manganew_thumbs")

    //Manga page
    if (images[i].id == "cover" && images[i].src.search(".html") != -1){
        textareal = document.getElementsByTagName('textarea')
        if (getFromTextbox(textareal) != ""){
            images[i].src = getFromTextbox(textareal).replace("imgcover.", "img.").replace("manganew_thumbs_blur","showfull_retina/manga") + ".jpg"
        } else {
            chrome.runtime.sendMessage([null, images[i].parentNode.href], function(response) { //Hey, background script! I need your help!
                images[i].src = response
            })
        }
    } else //Search page
    if (images[i].src.search(".jpg") == -1 && images[i].src.search(".png") == -1 && images[i].src.search(".gif") == -1 && images[i].src.search(".webp") == -1 && images[i].src.search(".php") == -1){
        try{
            var tocheck = images[i]
            var z = 0 //checking if this node first or second (cover or page of the middle)
            while((tocheck = tocheck.previousSibling) != null) z++;

            var wheretogo = ""
            if (images[i].parentNode.nodeName == "A") wheretogo = images[i].parentNode.parentNode.nextSibling.nextSibling.childNodes[3].childNodes[0].href
            if (images[i].parentNode.nodeName == "DIV") wheretogo = images[i].parentNode.nextSibling.nextSibling.childNodes[1].childNodes[0].href
            wheretogo = wheretogo.replace("https://h-chan.me/manga/", "http://exhentai-dono.me/online/") + "?development_access=true"

            chrome.runtime.sendMessage([wheretogo, z], function(response) { //Hey, background script! I need your help!
                images[i].src = response
            })
        }
        catch(err){
            console.log(err)
        }
    }
}