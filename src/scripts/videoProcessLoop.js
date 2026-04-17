

//TO DO: RENAME THIS GARBAGE
var src;
var dst;
var cap;
var delay;
const FPS = 30;


function videoProcessLoop()
{
    //don't do anything unless openCV is loaded/intialized
    if (!openCVReady)
    {
        return;
    }

    //initialize frame variables
    videoTag.height = videoTag.videoHeight;
    videoTag.width = videoTag.videoWidth;
    src = new cv.Mat(videoTag.videoHeight, videoTag.videoWidth, cv.CV_8UC4);
    dst = new cv.Mat(videoTag.videoHeight, videoTag.videoWidth, cv.CV_8UC1);
    cap = new cv.VideoCapture(videoTag);

    function processVideo() {
        //don't do anything unless camera stream is ready
        if (!cameraStreamReady || videoTag.height == 0 || videoTag.width == 0)
        {
            src.delete();
            dst.delete();
            return;
        }

        try {
            var begin = Date.now();

            // start processing.
            cap.read(src);
            cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
            cv.imshow(document.getElementById("canvasOutput"), dst);
            // schedule the next one.
            delay = 1000/FPS - (Date.now() - begin);

            //DELETE LATER
            if (!streaming)
            {
                src.delete();
                dst.delete();
                console.log("done cleaning");
                return;
            }

            else
            {
                setTimeout(processVideo, delay);
            }
                
        } catch (error) {
            src.delete();
            dst.delete();
            console.error(error);
            mainDisplayPrint(`${error.name}: ${error.message}`)
        }
    };

    // schedule the first one.
    setTimeout(processVideo, 0);
}


//Final safegaurd to prevent memory leaks if user closes window
window.addEventListener("beforeunload", (unloadEvent) => {
    src.delete();
    dst.delete();
});