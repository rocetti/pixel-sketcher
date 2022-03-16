//EVENTS
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

//Color Menu (Style)
const color_menu = document.getElementById("color");
const color_wrapper = document.getElementById("color-wrapper");
color_menu.onchange = function() {
	color_wrapper.style.backgroundColor = color_menu.value;    
}
color_wrapper.style.backgroundColor = color_menu.value;

//Tools
let tools = document.getElementsByName("tools")
let tools_buttons = document.getElementsByClassName("radio-box")
//selected tool style
for (let i = 0; i < tools.length; i++) {
    const element = tools[i];
    element.addEventListener("change", function () {
        for (let j = 0; j < tools.length; j++){
            const tool = tools[j];
            const button = tools_buttons[j];
            if (tool.checked) {
                button.style.backgroundColor = "rgb(20,20,20)";
            } else {
                button.style.backgroundColor = "";
            }
        }
    })
}
for (let i = 0; i < tools.length; i++){
    const tool = tools[i];
    const button = tools_buttons[i];
    if (tool.checked) {
        button.style.backgroundColor = "rgb(20,20,20)";
    } else {
        button.style.backgroundColor = "";
    }
}

//Use tools while holding the mouse down
let is_mouse_pressed = false;
canva.addEventListener("mousedown",function (event) {
    event = event || window.event;
    let target = event.target;
    is_mouse_pressed = true;
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
    if (target.getAttribute("class") == "canva-cell") {
        use_tool(target);
    }
})

document.addEventListener("mouseup", function () {
    is_mouse_pressed = false;
})

//get color from palette
const palette = document.getElementById("palette");
palette.addEventListener("click", function (event) {
    let color = document.getElementById("color");
    let target = event.target;
    if (target.style.backgroundColor && target.style.backgroundColor != "transparent") {
        color.value = rgb2hex(target.style.backgroundColor)
        color_wrapper.style.backgroundColor = color_menu.value;
    }
})

//FUNCTIONS
//Create canva grid
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
    create_palette();
}
//Based on selected tool use it on target cell
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
    create_palette();
}

//read canva divs and return an array of all colors used on it
function create_palette() {
    let cells = canva.children;
    let palette = [];
    for (let i = 0; i < cells.length; i++) {
        const element = cells[i];
        const canva_color = element.style.backgroundColor;
        if (!canva_color || canva_color == "transparent") {
            continue;
        }
        if (!palette.includes(canva_color)) {
            palette.push(canva_color);
        }
    }
    show_palette(palette);
}

//display palette on screen
function show_palette(pal) {
    const palette_box = document.getElementById("palette");
    //delete all content on palette
    while (palette_box.firstChild) {
        palette_box.removeChild(palette_box.lastChild);
    }
    //set the grid
    //used the comments to reach an responsive grid equation so i'll leave it here since this is a exercise project:
    //min columns = 3; rows = columns * 3
    //c? e r? e cellsize? area=w*h; ratio = h/w; 
    // r/c = 3 > r = 3c;
    // area = r*c > area = 3*csquare > c = sq area/3
    let ratio = palette_box.offsetHeight/palette_box.offsetWidth
    let cols = Math.max(Math.ceil(Math.sqrt((pal.length/ratio))), 3);
    let rows = cols*ratio
    palette_box.style.setProperty("grid-template-columns", `repeat(${cols},1fr)`)
    palette_box.style.setProperty("grid-template-rows", `repeat(${rows},1fr)`)

    //add area amount of divs on palette_box
    for (let i = 0; i < pal.length; i++) {
        let new_div = document.createElement("div");
        let att = document.createAttribute("class");
        att.value = `palette-cell`;
        new_div.setAttributeNode(att);
        att = document.createAttribute("id");
        att.value = `cell-${i}`;
        new_div.setAttributeNode(att);
        att = document.createAttribute("onmousedown");
        att.value = "return false";
        new_div.setAttributeNode(att);
        new_div.style.backgroundColor = pal[i]
        new_div.style.border = "0.1px solid white";
        palette_box.appendChild(new_div);
    }
}
//convert rgb sintax to hex
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
//pick a random rgb color
function random_color() {
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    return `rgb(${red},${green},${blue})`;
}