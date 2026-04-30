var setFPS = 30;



//function call processes one frame from the buffer canvas
function processFrame(inputImg, destinationImg, openCVloopActive)
{
    try { 
        var delay;
        var begin = Date.now();

        //shut down loop if told to
        if (!openCVloopActive.active)
        {
            //free memory
            inputImg.delete();
            destinationImg.delete();
            mainDisplayPrint("OpenCV loop shut down. Memory freed successfuly.");
            return;
        }

        //if we are expecting to need to load a frame from videoTag into buffer, otherwise we are expecting a image to already be loaded
        if (videoStreamActive)
        {
            bufferContext.drawImage(videoTag, 0, 0, videoTag.videoWidth, videoTag.videoHeight);
        }

        //read data from buffer
        inputImg.data.set(bufferContext.getImageData(0, 0, rawBufferCanvas.width, rawBufferCanvas.height).data);
        
        //Color Calibration
        //use inRange for mask
        //find average among


        //Display image
        cv.imshow(canvasOutputTag, inputImg);

        //setTimeout will call to process a frame after a delay to maintain 30 FPS
        delay = (1000/setFPS) - (Date.now() - begin);
        setTimeout(processFrame, delay, inputImg, destinationImg, openCVloopActive);
            
    } catch (error) {
        inputImg.delete();
        destinationImg.delete();
        console.error(error);
        mainDisplayPrint(`OpenCV messed up: ${error.name}: ${error.message}`)
    }
};


//when image gets uploaded
function startOpenCVloop()
{
    //don't do anything if openCV WASM binary isn't loaded/intialized
    if (!openCVRuntimeReady)
    {
        return;
    }

    //kill old loop's loop active object
    if (openCVloopActive)
    {
        openCVloopActive.active = false;
    }
    //pass a new loop active object to the soon to be new loop
    openCVloopActive = {"active": true};

    
    //initialize frame variables
    var inputImg = new cv.Mat(rawBufferCanvas.height, rawBufferCanvas.width, cv.CV_8UC4);
    var destinationImg = new cv.Mat(rawBufferCanvas.height, rawBufferCanvas.width, cv.CV_8UC4);
    bufferContext = rawBufferCanvas.getContext("2d");
    

    // schedule the first 
    processFrame(inputImg, destinationImg, openCVloopActive);
}