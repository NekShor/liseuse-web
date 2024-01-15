document.getElementById('input').addEventListener('change', changeValue);
document.getElementById('color1').addEventListener('change', changeValue);
document.getElementById('color2').addEventListener('change', changeValue);
document.getElementById('transparence').addEventListener('change', changeValue);
document.getElementById('taille').addEventListener('change', changeValue);
document.getElementById('weight').addEventListener('change', changeValue);


function changeValue(){
    var json = {
        'inputChecked': document.getElementById('input').checked,
        'color1': document.getElementById('color1').value,
        'color2': document.getElementById('color2').value,
        'transparence': document.getElementById('transparence').value,
        'taille': document.getElementById('taille').value,
        'weight': document.getElementById('weight').checked? 'bold' : 'normal'
    }

    chrome.storage.sync.set(json, function() {
    });

    setCss()
    importCss()
}

function setCss(){
    chrome.storage.sync.get('inputChecked', function(data) {
        if(data.inputChecked){
            chrome.tabs.executeScript({
                code: `var body = document.querySelector('body')
        
                    if(!body.classList.contains('liseuse')){
                        body.classList.add('liseuse')
                    }
                `
            });
        }else{
            chrome.tabs.executeScript({
                code: `var body = document.querySelector('body')
        
                    if(body.classList.contains('liseuse')){
                        body.classList.remove('liseuse')
                    }
                `
            });
        }
    });
}


function importCss(){
    ( async () => {
        var transparence;
        
        var newPremise = new Promise((resolve, reject) => {
            chrome.storage.sync.get(['color1', 'color2', 'transparence', 'taille', 'weight'], function(data) {
                if(data.color1 == undefined){
                    data.color1 = '#0a0908'
                }
                if(data.color2 == undefined){
                    data.color2 = '#e5e5e5'
                }
                if(data.transparence == undefined){
                    data.transparence = '0.5'
                }
                if(data.taille == undefined){
                    data.taille = '1'
                }
                if(data.weight == undefined){
                    data.weight = 'normal'
                }
                resolve(data)
            });
            
        })

        var data = await newPremise;

        transparence = Math.round((data.transparence*255)/100).toString(16)
        if(transparence.length == 1){
            transparence = '0'+transparence
        }else{
            transparence = `${transparence}`
        }
        var colorTransparence = data.color1+transparence

        chrome.tabs.executeScript({
            code: `
                var color1 = '${colorTransparence}';
                var color2 = '${data.color2}';
                var taille = '${data.taille}';
                var weight = '${data.weight}';
            `
        }, function() {
            // Exécuter le script importé
            chrome.tabs.executeScript({
                file: './popup/importCss.js'
            });
        });
        
    })();

}

document.addEventListener('DOMContentLoaded', (event) => {
    chrome.storage.sync.get(['color1', 'color2', 'transparence', 'taille', 'weight', 'inputChecked'], function(data) {
        if(data.color1 == undefined){
            data.color1 = '#0a0908'
        }
        if(data.color2 == undefined){
            data.color2 = '#e5e5e5'
        }
        if(data.transparence == undefined){
            data.transparence = '1'
        }
        if(data.taille == undefined){
            data.taille = '16'
        }
        if(data.weight == undefined){
            data.weight = 'normal'
        }
        document.getElementById('color1').value = data.color1
        document.getElementById('color2').value = data.color2
        document.getElementById('transparence').value = data.transparence
        document.getElementById('taille').value = data.taille
        document.getElementById('weight').value = data.weight
        document.getElementById('input').checked = data.inputChecked;

    });

    importCss()

    setCss()
})

