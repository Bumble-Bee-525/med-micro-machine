
//plays or pauses video stream when user clicks the button
var toggleFreeze = false;
function freezeToggleHandler(clickEvent)
{
    toggleFreeze = !toggleFreeze;
    if (toggleFreeze)
    {
        videoTag.pause();
        return;
    }
    videoTag.play();
}
freezeButtonTag.addEventListener("click", freezeToggleHandler);


//start stream when a camera device is selected by user, or end stream if none selected.
function selectDeviceHandler(clickEvent)
{
    var deviceId = clickEvent.target.deviceId;
    if (deviceId)
    {
        //replace placeholder image with actual image
        defaultImageTag.classList.add("hide");
        canvasOutputTag.classList.remove("hide");
        startCameraStream(deviceId, clickEvent.target.innerText);
        return;
    }
    releaseHardware(videoTag);
    releaseVideoFile(videoTag);
}


//start stream when a file is uploaded by user, or end stream if none selected
function selectMediaFileHandler(fileUploadEvent)
{
    const file = fileUploadEvent.target.files[0];

    //seperate image from videos
    if (file.type.startsWith("image"))
    {
        debugger;
        startUploadedImageStream(file);
        return;
    }

    if (file.type.startsWith("video"))
    {
        startUploadedVideoStream(file);
        return;
    }

    mainDisplayPrint("File not recognized as image or video.")
}

document.getElementById('fileInput').addEventListener('change', selectMediaFileHandler);


//refreshes device list each time it's opened
//note: yea this way will also fire if closed by tapping again, but there isn't any other good way to detect a dropdown being opened
function openDeviceMenuHandler (clickEvent) {
    //clear old device list
    selectDeviceMenu.replaceChildren();
    
    //check if user gave permission to use camera, if not, no deviceIDs will even show up
    if (!cameraPermissionStatus)
    {
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
}

selectDeviceButton.addEventListener("click", openDeviceMenuHandler);