var mainTextDisplay = document.getElementById("mainTextDisplay");
var canvasOutputTag = document.getElementById("canvasOutput");
const canvasOutputParentTag = document.getElementById("canvasOutputParent");

function mainDisplayPrint(text)
{
    mainTextDisplay.value = text;
}

function setDefaultCanvas()
{
    //set up default image on camera screen when user first loads in
    var ctx = canvasOutputTag.getContext("2d");
    const tempImgTag = new Image();

    tempImgTag.onload = () => {
        ctx.drawImage(tempImgTag, 0, 0, canvasOutputTag.width, canvasOutputTag.height);
        tempImgTag.remove();
    }

    tempImgTag.src = "assets/cameraAlt.png";
}

setDefaultCanvas();