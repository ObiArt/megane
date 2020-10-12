chrome.storage.sync.get(['hchan','moon'], function(result) {
    switch(location.href.match(/(?<=https:\/\/)(.*?)(?=\/)/gm)[0]){
        case result.hchan:
            chrome.runtime.sendMessage('hchan')
            break
        case result.moon:
            chrome.runtime.sendMessage('moon')
            break
    }
})