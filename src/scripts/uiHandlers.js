
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


//start stream when a camera device is selected by user, or end stream if none selected.
function selectDeviceHandler(clickEvent)
{
    var deviceId = clickEvent.target.deviceId;
    if (deviceId)
    {
        defaultImageTag.classList.add("hide");
        canvasOutputTag.classList.remove("hide");
        startMediaStream(deviceId, clickEvent.target.innerText);
        return;
    }
    releaseHardware(videoTag);
}



/* NOTE: did not use permissions API because:
1) I tested it and it failed in the edge case where the user revokes permission
2) deviceIDs are still obscured EVEN IF the user gave permission to use camera 
yea this way will also fire if closed by tapping again, but there isn't any other good way to detect a dropdown being opened
*/

//refreshes device list each time it's opened
selectDeviceButton.addEventListener("click", (clickEvent) => {
    //clear old device list
    selectDeviceMenu.replaceChildren();
    
    //check if user gave permission to use camera, if not, no deviceIDs will even show up
    if (!cameraPermissionStatus)
    {
        console.log("Camera permissions not yet granted");
        mainDisplayPrint("Camera permissions not yet granted");
        return;
    }

    //get list of devices
    navigator.mediaDevices.enumerateDevices().then((deviceList) => {
        //add option to select no device at all (essentially shutdown all hardware)
        deviceList.push({"kind": "videoinput", "deviceId": null, "label": "Shut down"})

        //populate dropdown menu with button for each device
        var device;
        for (device of deviceList)
        {
            //Ensure only cameras are considered
            if (device.kind === "videoinput")
            {
                //create HTML button
                const deviceSelectionButton = document.createElement("button");
                Object.assign(deviceSelectionButton, {
                    "type": "button",
                    "className": "dropdown-item",
                    "deviceId": device.deviceId,
                    "innerText": device.label
                });

                //add event listener
                deviceSelectionButton.addEventListener("click", selectDeviceHandler);

                //add button to li element for bootstrap css purposes
                const liElem = document.createElement("li");
                liElem.appendChild(deviceSelectionButton);
                selectDeviceMenu.appendChild(liElem);
            }
        }
    //display errors 
    }).catch((error) => {
        console.error(error);
        mainDisplayPrint(`${error.name}: ${error.message}`);
        return;
    });
});