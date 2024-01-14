document.getElementById('input').addEventListener('change', setCss);

function setCss(){
    var input = document.getElementById('input').value

    console.log(input)
    var value = false
    if(input === "on"){
        value = true
    }
    console.log(value)

    chrome.storage.sync.set({ 'inputChecked': value }, function() {
    });

    chrome.storage.sync.get('inputChecked', function(data) {
        console.log(data)
    });

    if(input){
        chrome.tabs.executeScript({
            code: `var body = document.querySelector('body')

            if(!body.classList.contains('liseuse')){
                body.classList.add('liseuse')
            }`
        });
    }else{
        chrome.tabs.executeScript({
            code: `var body = document.querySelector('body')

            if(body.classList.contains('liseuse')){
                body.classList.remove('liseuse')
            }`
        });
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    chrome.tabs.executeScript({
        file: './popup/importCss.js'
    });
    setCss()

    chrome.storage.sync.get('inputChecked', function(data) {
        document.getElementById('input').checked = data.inputChecked;
    });
})