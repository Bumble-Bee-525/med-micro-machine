//canvases
const canvasOutputTag = document.getElementById("canvasOutput");
const canvasOutputParentTag = document.getElementById("canvasOutputParent");
const rawBufferCanvas = document.getElementById("rawBufferCanvas");
var bufferContext;
const mainTextDisplay = document.getElementById("mainTextDisplay");
const defaultImageTag = document.getElementById("defaultImage");
const freezeButtonTag = document.getElementById("freezeButton");
const selectDeviceButton = document.getElementById("devicesMenuButton");
const selectDeviceMenu = document.getElementById("devicesMenu");



//displays text onto the center input tag
function mainDisplayPrint(text)
{
    mainTextDisplay.value = text;
}


