var mainTextDisplay = document.getElementById("mainTextDisplay");
const canvasOutputTag = document.getElementById("canvasOutput");
const canvasOutputParentTag = document.getElementById("canvasOutputParent");
const cameraAltImagePath = "assets/cameraAlt.png";
const freezeButtonTag = document.getElementById("freezeButton");
const selectDeviceButton = document.getElementById("devicesMenuButton");
const selectDeviceMenu = document.getElementById("devicesMenu");

//displays text onto the center input tag
function mainDisplayPrint(text)
{
    mainTextDisplay.value = text;
}

//deletes a canvas that has been "tainted"
function replaceTaintedCanvas(parent, childCanvas)
{
    childCanvas.remove();
    childCanvas = document.createElement("canvas");
    childCanvas.id = "canvasOutput";
    parent.append(childCanvas);
}


//set up default image on camera screen when user first loads in
function setDefaultCanvas(canvas, imgPath)
{
    var ctx = canvas.getContext("2d");
    const tempImageTag = new Image();

    tempImageTag.addEventListener("load", function(loadEvent) {
        ctx.drawImage(tempImageTag, 0, 0, canvas.width, canvas.height);
        tempImageTag.remove();
    });

    tempImageTag.src = imgPath;
}

setDefaultCanvas(canvasOutputTag, cameraAltImagePath);