var openCVRuntimeReady = false;
var openCVloopActive = false;


var Module = {
    //openCV apparently uses emscripten to convert to WASM, which takes additional time even after the JS is done loading.
    //this ensures the main loop using openCV for tools only begins AFTER the WASM is ready to use
    onRuntimeInitialized() 
    {
        openCVRuntimeReady = true;
        mainDisplayPrint("Systems nominal. OpenCV loaded and initialized.");
        return;
    }
}