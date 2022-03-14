//Update Canva Size
const size_slider = document.getElementById("size-slider");
const size_txt = document.getElementById("size-txt");
size_slider.onchange = function () {
    create_canva(size_slider.value);
    //change txt
    size_txt.innerHTML = `<p>${size_slider.value}x${size_slider.value}</p>`;
}
create_canva(size_slider.value);
//Color Menu Styling
const color_menu = document.getElementById("color");
const color_wrapper = document.getElementById("color-wrapper");
color_menu.onchange = function() {
	color_wrapper.style.backgroundColor = color_menu.value;    
}
color_wrapper.style.backgroundColor = color_menu.value;

//Funcs
function create_canva(size) {
    size = typeof size === typeof 0? size : console.log("ERROR! Invalid canva size");
    let area = size * size;
    //delete all content on id=canva
    //add area amount of divs on id=canva
}