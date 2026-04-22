



const videoConstraints = {
    audio: false,
    video: {
        width: 1280,
        height: 720,
        resizeMode: "none",
        facingMode: "environment"
    }
};
const videoTag = document.getElementById("userVideoTag");
var videoStreamActive = false;
var cameraPermissionStatus = false;




//When first loading in, get browser to prompt user for camera permission AND gives enumerateDevice permission to see all deviceIDs
navigator.mediaDevices.getUserMedia(videoConstraints).then((cameraStream) => {
    cameraPermissionStatus = true;
}).catch((error) => {
    //log errors and stuf
    console.error(error);
    mainDisplayPrint(`${error.name}: ${error.message}`);
});



//cuts all connections with camera hardware currently used by camera stream
function releaseHardware(video)
{
    if (video.srcObject)
    {
        //shut down openCV loop
        openCVloopActive = false;
        videoStreamActive = false;

        //kill all tracks, freeing the hardware
        video.srcObject.getTracks().forEach(track => {
            track.stop();
        });

        //dereference junk mediaStream object
        video.srcObject = null;
        
        mainDisplayPrint("Camera and system shut down successfully.");
    }
}

function releaseVideoFile(video)
{
    if (video.src)
    {
        //shut down openCV loop
        openCVloopActive = false;
        videoStreamActive = false;

        //free memory
        URL.revokeObjectURL(video.src);

        //dereference junk file
        video.removeAttribute("src")

        mainDisplayPrint("File queue freed and cleared successfuly.");
    }
}


//given a selected deviceID, start a stream using userMedia API then activate openCV loop when ready
function startCameraStream(deviceID, deviceName)
{
    //Release hardware/files from previous stream, kill openCV loop
    releaseVideoFile(videoTag);
    releaseHardware(videoTag);
    
    //select by deviceID
    videoConstraints.video.deviceID = deviceID;
    mainDisplayPrint(`Attempting stream start on ${deviceName}`);

    //request API to start stream
    navigator.mediaDevices.getUserMedia(videoConstraints).then((cameraStream) => {
        videoTag.srcObject = cameraStream;
        videoTag.play();
    //log errors and stuf
    }).catch((error) => {
        console.error(error);
        mainDisplayPrint(`${error.name}: ${error.message}`);
    });
}


//given an uploaded video file, start "streaming" to videotag
function startUploadedVideoStream(file)
{
    //replace placeholder image with actual image
    defaultImageTag.classList.add("hide");
    canvasOutputTag.classList.remove("hide");

    //Release hardware/files from previous stream
    releaseVideoFile(videoTag);
    releaseHardware(videoTag);

    //create a reference to current video file and begin stream
    const blobUrl = URL.createObjectURL(file);
    videoTag.src = blobUrl;
    
    //initially autopause video for user
    if (!toggleFreeze)
    {
        freezeButtonTag.click();
    }
    videoTag.pause();

    mainDisplayPrint(`Started video stream on: ${file.name}`);
}


//wait for video to load before calling openCV loop
function videoTagOnMetaDataHandler(loadedMetaDataEvent)
{
    //call openCV loop only when ready
    if (!videoStreamActive)
    {
        //clear canvas and set width/height
        rawBufferCanvas.width = videoTag.videoWidth;
        rawBufferCanvas.height = videoTag.videoHeight;
        videoTag.height = videoTag.videoHeight;
        videoTag.width = videoTag.videoWidth;

        //activate openCV
        videoStreamActive = true;
        openCVloopActive = true;
        startOpenCVloop();

        //if it's a cameraStream
        if (videoTag.srcObject)
        {
            mainDisplayPrint(`Stream succesfully started on ${videoTag.srcObject.getTracks()[0].label}`);
            return;
        }
        
        //if it's an uploaded file
        if (videoTag.src)
        {
            mainDisplayPrint("Stream successfully started on the file uploaded");
            return;
        }

        mainDisplayPrint("Stream started on ???. Something has definitely gone wrong");
        return;
    }
    mainDisplayPrint("A video stream is already active. Can not start another.");
}

videoTag.addEventListener("loadedmetadata", videoTagOnMetaDataHandler);



//when a temporary image element is done loading, draw to raw canvas buffer, then start openCV loop
function imageStreamLoadHandler(loadEvent)
{
    const tempImage = loadEvent.target;

    //set canvas width and height
    rawBufferCanvas.width = tempImage.naturalWidth;
    rawBufferCanvas.height = tempImage.naturalHeight;

    //draw image onto hidden canvas
    const context = rawBufferCanvas.getContext("2d");
    context.drawImage(tempImage, 0, 0, tempImage.naturalWidth, tempImage.naturalHeight);
    
    //prevent memory leaks
    tempImage.removeEventListener("load", imageStreamLoadHandler);
    URL.revokeObjectURL(tempImage.src);
    
    //start openCV loop, but not videoStreamActive
    openCVloopActive = true;
    startOpenCVloop();
    
    //delete object to free up memory
    tempImage.remove();
}

//given an uploaded image file, start streaming to canvas
function startUploadedImageStream(file)
{
    //replace placeholder image with actual image
    defaultImageTag.classList.add("hide");
    canvasOutputTag.classList.remove("hide");

    //Release hardware/files from previous stream, kill openCV loop
    releaseHardware(videoTag);
    releaseVideoFile(videoTag);

    //load uploaded image blob onto an image element
    const tempImage = document.createElement("img");
    tempImage.src = URL.createObjectURL(file);
    mainDisplayPrint(`Starting stream on ${file.name}`);

    //wait for image to load before starting openCV Loop
    tempImage.addEventListener("load", imageStreamLoadHandler);
}