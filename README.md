# Pixel Sketcher
A simple pixel drawing site made for The Odin Project course.

## Understand the problem
Create a website that has a whiteboard where you can draw pixel art on it. The board dimensions should be square and resizeable (from 4x4 up to 100x100). User should have four types of tools: brush, eraser, color picker and a rainbow brush. The brush will use the color picked on the color menu to paint on click. The color menu has a color picker popup when you click it. (Bonus feature: an palette panel that shows all colors used on the whiteboard)

## Break into smaller problems
- whiteboard is a div and has a grid inside it which represents each pixel with an empty div that can have its background-color changed as needed.
- tool menu is a toggle button menu that changes the functionality of user click on the white board pixels.
- brush: use the color from color menu to change the div bg; colorpick: turn the colorpicker menu value to the color currently on this pixel; eraser: clear the bg color of current div; rainbow brush: randomly pick an rgb value (not changing the color menu) and paint the div bg.
- color picker menu is an html input type=color

Notes
- tools are a radiobuttons
- color menu is an input type color

## Pseudocode
- create a variable to store canva size (default value 16)
- when the site start it runs the create_canva() function
- to create a canva first delete all divs inside board container and then create the amount of divs needed for the new canvas size (16x16=256 divs)
- every time the user click on a div inside the canva it will check what tool is selected and use the tool function on that div.
- brush: use color menu value as div bg-color
- colorpicker: if div has bg-color then color menu value is equal to bg-color
- eraser: div bg-color is null
- rainbow brush: pick random rgb as div bg color
- everytime a click is made on canva pixel, it triggers an palette check function that goes through all divs inside the board and store its color in an array, but do not store the same color twice.
- the pallete check calls for an update palette function that changes the colors shown on the palette panel
