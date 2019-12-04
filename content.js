let images = document.getElementsByTagName('img')

for(let i = 0; i < images.length; i++){
    if (images[i].src.search("_blur") != -1) {
        images[i].src = images[i].src.replace("manganew_thumbs_blur", "manganew_thumbs")
    }

    if (images[i].id == "cover" && images[i].src.search(".html") != -1){
        textarea = document.getElementsByTagName('textarea')
        exploit = textarea[0].textContent
        startingPoint = exploit.search('src="') + 5
        endingPoint = exploit.search('" />') - 4
        images[i].src = exploit.slice(startingPoint, endingPoint).replace("imgcover.", "img.").replace("manganew_thumbs_blur","showfull_retina/manga") + ".jpg"
    }
}