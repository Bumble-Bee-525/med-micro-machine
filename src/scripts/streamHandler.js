



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

function releaseSourceFile(video)
{
    if (video.src)
    {
        //shut down openCV
        videoStreamActive = false;

        //free memory
        URL.revokeObjectURL(video.src);

        //dereference junk file
        video.src = null;

        mainDisplayPrint("File queue freed and cleared successfuly.");
    }
}


//given a selected deviceID, start a stream using userMedia API then activate openCV loop when ready
function startCameraStream(deviceID, deviceName)
{
    //Release hardware/files from previous stream
    releaseHardware(videoTag);
    releaseSourceFile(videoTag);
    
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



//given an uploaded file, start "streaming" to videotag
function startUploadedVideoStream(file)
{
    //Release hardware/files from previous stream
    releaseHardware(videoTag);
    releaseSourceFile(videoTag);

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
function mediaStreamOnMetaDataHandler(loadedMetaDataEvent)
{
    //call openCV loop only when ready
    if (!videoStreamActive)
    {
        videoStreamActive = true;
        videoProcessLoop();

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

videoTag.addEventListener("loadedmetadata", mediaStreamOnMetaDataHandler);