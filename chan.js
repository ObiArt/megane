const parser = new DOMParser()

images = document.getElementsByTagName('img')

function getFromTextbox(textarea){
    var exploit = textarea[0].textContent
    var startingPoint = exploit.search('src="') + 5
    var endingPoint = exploit.search('" />') - 4

    return exploit.slice(startingPoint, endingPoint)
}

for(let i = 0; i < images.length; i++){
    //Home page
    images[i].src = images[i].src.replace("manganew_thumbs_blur", "manganew_thumbs")

    //Search page
    if (images[i].src.search(".jpg") == -1 && images[i].src.search(".png") == -1 && images[i].src.search(".gif") == -1 && images[i].src.search(".webp") == -1 && images[i].src.search(".php") == -1){
        try{
            var wheretogo = ""
            if (images[i].parentNode.nodeName == "A") wheretogo = images[i].parentNode.parentNode.nextSibling.nextSibling.childNodes[3].childNodes[0].href
            if (images[i].parentNode.nodeName == "DIV") wheretogo = images[i].parentNode.nextSibling.nextSibling.childNodes[1].childNodes[0].href
            fetch(wheretogo).then(r => r.text()).then(result => {
                var htmlDocument = parser.parseFromString(result, "text/html")
                var textareal = htmlDocument.getElementsByTagName('textarea')

                var tocheck = images[i]
                var z = 0; //checking if this node first or second
                while((tocheck = tocheck.previousSibling) != null) z++;

                if (z == 1){
                    images[i].src = getFromTextbox(textareal).replace("imgcover.", "img.").replace("manganew_thumbs_blur","manganew_thumbs") + ".jpg"
                } else {
                    chrome.runtime.sendMessage(result, function(response) { //Hey, background script! I need your help!
                        images[i].src = response
                    })
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }

    //Manga page
    if (images[i].id == "cover" && images[i].src.search(".html") != -1){
        var textareal = document.getElementsByTagName('textarea')
        images[i].src = getFromTextbox(textareal).replace("imgcover.", "img.").replace("manganew_thumbs_blur","showfull_retina/manga") + ".jpg"
    }
}