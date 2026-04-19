
//plays or pauses video stream when user clicks the button
var toggleFreeze = false;
freezeButtonTag.addEventListener("click", function (clickEvent) {
    toggleFreeze = !toggleFreeze;
    if (toggleFreeze)
    {
        videoTag.pause();
        return;
    }
    videoTag.play();
});


//refreshes device list each time it's opened
//yea it will also fire if closed by tapping again, but there isn't any other good way to detect a dropdown being opened

/* NOTE: did not use permissions API because:
1) I tested it and it failed in the edge case where the user revokes permission
2) deviceIDs are still obscured EVEN IF the user gave permission to use camera 
*/

//call USERMEDIA API once to unlock all cameras




selectDeviceButton.addEventListener("click", async function (clickEvent) {
    //check if user gave permission to use camera, if not, no deviceIDs will even show up
    if (!cameraPermissionStatus)
    {
        console.log("Camera permissions not yet granted");
        mainDisplayPrint("Camera permissions not yet granted");
        return;
    }

    //populate
    navigator.mediaDevices.enumerateDevices().then((deviceList) => {
        console.log(deviceList);
        for (var device in deviceList)
        {
            //do some shit
            //if it's a videoinput throw it in
            //set document ID to device ID
            console.log(device);
            return;
        }
    }).catch((error) => {
        console.error(error);
        mainDisplayPrint(`${error.name}: ${error.message}`);
        return;
    });
});


//currentDevice = ???

//USE STREAM.getTracks()[0].getSettings().deviceID to find out which device ACTUALLY got selected