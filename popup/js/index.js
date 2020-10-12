//Getting saved data
chrome.storage.sync.get(['hchan','moon'], function(result) {
    document.getElementById('hchan').value = result.hchan
    document.getElementById('moon').value = result.moon
})

document.getElementById('moon').addEventListener('change', (event) => {
    chrome.storage.sync.set({'moon': event.target.value.replace(/https:\/\/|\//gm, '')}) //this regex expression is here just in case
})                                                                                   //someboby puts domain as "https://example.com/" or something like this
document.getElementById('hchan').addEventListener('change', (event) => {
    chrome.storage.sync.set({'hchan': event.target.value.replace(/https:\/\/|\//gm, '')})
}) 