



const videoConstraints = {
    audio: false,
    video: {
        width: 1280,
        height: 720,
        resizeMode: "none",
        facingMode: "environment"
    }
}

const videoTag = document.getElementById("userVideoTag");
var cameraStreamActive = false;
var cameraPermissionStatus = false;


//TEST CODE FOR FILE UPLOAD
/*
document.getElementById('testInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const blobUrl = URL.createObjectURL(file);
    videoTag.src = blobUrl;
});
*/


//get browser to prompt user for camera permission AND gives enumerateDevice permission to see all deviceIDs
navigator.mediaDevices.getUserMedia(videoConstraints).then((cameraStream) => {
    cameraPermissionStatus = true;
}).catch((error) => {
    //log errors and stuf
    console.error(error);
    mainDisplayPrint(`${error.name}: ${error.message}`);
});


//cuts all connections with camera hardware used by camera stream
function releaseHardware(video)
{
    if (video.srcObject)
    {
        //shut down openCV loop
        cameraStreamActive = false;

        //kill all tracks, freeing the hardware
        video.srcObject.getTracks().forEach(track => {
            track.stop();
        });

        //release junk mediaStream object
        video.srcObject = null;
        
        mainDisplayPrint("Camera and system shut down successfully.");
    }
}


//given a selected deviceID, start a stream using userMedia API then activate openCV loop when ready
function startMediaStream(deviceID, deviceName)
{
    //Release hardware from previous stream
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

    //wait for video to load before calling openCV loop
    videoTag.addEventListener("loadedmetadata", function (loadedMetaDataEvent) {
        //call openCV loop only when ready
        cameraStreamActive = true;
        videoProcessLoop();
        mainDisplayPrint(`Stream succesfully started on ${videoTag.srcObject.getTracks()[0].label}`);
    });
}