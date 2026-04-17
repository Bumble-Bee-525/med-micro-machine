/*
    QUESTIONS??
    - await loading of openCV.JS
    - device change??
    - watch for memory leaks

    TO DO:
    create list of devices, on click double check it's in the list still

    figure out userMedia stuff safely first

    use external JS file

    have ability to upload files too
    
    load openCV
    once loaded, attempt to open the camera stream and call openCV

    note: i'm def gonna comment a lot because I'm learning all this stuff for the first time

    use beforeunload event to safely preven memory leaks
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

var streaming = true;

const videoTag = document.getElementById("userVideoTag");
var mediaStream = //SOME NONE VALUE;

//have mediaStream be global, then have a function #1 for releasing old device if applicable and selecting a new streamaaaaaaaaaaaaaaa

//Boot up camera stream
navigator.mediaDevices.getUserMedia(videoConstraints).then((cameraStream) => {
    videoTag.srcObject = cameraStream;
    videoTag.play();
}).catch((error) => {
    //TO DO: DISPLAY ERROR
    console.error(`${error.name}: ${error.message}`);
});



