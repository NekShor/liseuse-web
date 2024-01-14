console.log(color1)
console.log(color2)
var css = `
.liseuse *{
    background: ${color1}!important;
    color: ${color2}!important;
    background-image: none!important;
    text-shadow: none!important;
    box-shadow: none!important;
    font-family: sans-serif!important;
    font-size: ${taille}px!important;
    font-weight: ${weight}!important;

}
`
var style = document.createElement('style');

if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    if(document.getElementById('liseusecss')){
        document.getElementById('liseusecss').remove()
    }

    style.setAttribute('id', 'liseusecss');
    style.appendChild(document.createTextNode(css));
}

document.getElementsByTagName('head')[0].appendChild(style);