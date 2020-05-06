var parser = new DOMParser()
var images = document.getElementsByTagName('img')
var wheretogo = document.querySelector("a[target='_blank']")
var title = document.querySelector("h1").innerHTML

for(let i = 0; i < images.length; i++){
    //Home page
    images[i].src = images[i].src.replace("_b.", ".")
    //17.12.19 There was a comment about how my system for restoring preview on nude-moon didn't work. Now it does
    //06.05.20 Now it doesn't

    //I'm really sorry :(
}