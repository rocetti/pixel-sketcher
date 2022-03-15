//Update Canva Size
const canva = document.getElementById("canva");
const size_slider = document.getElementById("size-slider");
const size_txt = document.getElementById("size-txt");
size_slider.onchange = function () {
    create_canva(Number(size_slider.value));
    //change txt
    size_txt.innerHTML = `<p>${size_slider.value}x${size_slider.value}</p>`;
}
create_canva(Number(size_slider.value));

//Color Menu
const color_menu = document.getElementById("color");
const color_wrapper = document.getElementById("color-wrapper");
color_menu.onchange = function() {
	color_wrapper.style.backgroundColor = color_menu.value;    
}
color_wrapper.style.backgroundColor = color_menu.value;

//Tools
//Use tools while holding the mouse down
let is_mouse_pressed = false;
canva.addEventListener("mousedown",function (event) {
    event = event || window.event;
    let target = event.target;
    is_mouse_pressed = true;
    //if target is canva div use tool
    if (target.getAttribute("class") == "canva-cell") {
        use_tool(target);
    }
})

canva.addEventListener("mousemove", function(event){
    if (!is_mouse_pressed) {
        return
    }
    event = event || window.event;
    let target = event.target;
    is_mouse_pressed = true;
    //if target is canva div use tool
    if (target.getAttribute("class") == "canva-cell") {
        use_tool(target);
    }
})

document.addEventListener("mouseup", function () {
    is_mouse_pressed = false;
})

//Funcs
function create_canva(size) {
    size = typeof size === typeof 0? size : console.log(`ERROR! Invalid canva size. Type:${typeof size} Value:${size}`);
    let area = size * size;
    //delete all content on canva
    while (canva.firstChild) {
        canva.removeChild(canva.lastChild);
    }
    //set the grid columns
    canva.style.setProperty("grid-template-columns", `repeat(${size},1fr)`)
    //add area amount of divs on canva
    for (let i = 0; i < area; i++) {
        let new_div = document.createElement("div");
        let att = document.createAttribute("class");
        att.value = `canva-cell`;
        new_div.setAttributeNode(att);
        att = document.createAttribute("id");
        att.value = `cell-${i}`;
        new_div.setAttributeNode(att);
        att = document.createAttribute("onmousedown");
        att.value = "return false";
        new_div.setAttributeNode(att);
        canva.appendChild(new_div);
    }
}

function use_tool(trgt) {
    let color = document.getElementById("color");
    let brush = document.getElementById("brush");
    let picker = document.getElementById("picker");
    let eraser = document.getElementById("eraser");
    let rainbow = document.getElementById("rainbow");
    switch (true) {
        case brush.checked:
            trgt.style.backgroundColor = color.value
            break;
        case picker.checked:
            if (trgt.style.backgroundColor && trgt.style.backgroundColor != "transparent") {
                color.value = rgb2hex(trgt.style.backgroundColor)
                color_wrapper.style.backgroundColor = color_menu.value;
            }
            break;
        case eraser.checked:
            trgt.style.backgroundColor = "transparent"
            break;
        case rainbow.checked:
            trgt.style.backgroundColor = random_color()
            break;
    
        default:
            break;
    }
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function random_color() {
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    return `rgb(${red},${green},${blue})`;
}