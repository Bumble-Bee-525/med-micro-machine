/*
    QUESTIONS??
    - device change??

    TO DO:
    create list of devices, on click double check it's in the list still
    

    note: i'm def gonna comment a lot because I'm learning all this stuff for the first time
*/




//set up video stream from user's camera
const videoConstraints = {
    audio: false,
    video: {
        width: 1280,
        height: 720,
        resizeMode: "none"
    }
}

const videoTag = document.getElementById("userVideoTag");
var cameraStreamReady = false;
var currentDevice = null;


//TEST CODE FOR FILE UPLOAD
/*
document.getElementById('testInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const blobUrl = URL.createObjectURL(file);
    videoTag.src = blobUrl;
});
*/


//have mediaStream be global, then have a function #1 for releasing old device if applicable and selecting a new stream

//cuts all connections with camera hardware used by camera stream
function releaseHardware(video)
{
    if (video.srcObject)
    {
        video.srcObject.getTracks().forEach(track => {
            track.stop();
        });

        video.srcObject = null;
    }
}


//given a selected deviceID, start a stream using userMedia API then activate openCV loop when ready
function selectAndStartMediaStream(deviceID)
{
    //Shut off openCV loop from previous stream
    cameraStreamReady = false;

    //Release hardware from previous stream
    releaseHardware(videoTag);

    //replaces possibly tainted canvas with new canvas
    canvasOutputTag.remove();
    canvasOutputTag = document.createElement("canvas");
    canvasOutputTag.id = "canvasOutput";
    canvasOutputParentTag.append(canvasOutputTag);

    //TO DO: select by deviceID
    mainDisplayPrint(`Attempting stream start on ${deviceID}`);

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
    videoTag.onloadedmetadata = (loadedMetaDataEvent) => {
        //call openCV loop only when ready
        cameraStreamReady = true;
        videoProcessLoop();
    }
}