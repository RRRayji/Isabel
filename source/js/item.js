var vw = document.querySelector('.mainView');
var imgs = document.querySelectorAll('.imgs');
var settings = document.querySelector('.settings');
var counter = document.querySelector('#count');
var sum = document.querySelector('#sum');
var price = parseFloat(sum.innerHTML.replace(/[^0-9\.]/gi, ''));
function setImg(bg) {
    vw.style.backgroundImage = "url(".concat(bg, ")");
}
function DisplaySettings(){
	settings.style.display = 'block';
}
function HideSettings(){
	settings.style.display = 'none';
}
function recalc(value){
	sum.innerHTML = `€${(price * counter.value).toFixed(2)}`;
}