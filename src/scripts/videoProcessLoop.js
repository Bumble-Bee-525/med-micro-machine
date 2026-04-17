

function videoProcessLoop()
{

    //JS apparently only checks if you literally set the height/width attribute, if not, it doesn't measure anything and just returns a height/width of 0
    videoTag.height = videoTag.videoHeight;
    videoTag.width = videoTag.videoWidth;

    //TO DO: openCV stuff should check if there's data available
    
    let src = new cv.Mat(videoTag.videoHeight, videoTag.videoWidth, cv.CV_8UC4);
    let dst = new cv.Mat(videoTag.videoHeight, videoTag.videoWidth, cv.CV_8UC1);
    let cap = new cv.VideoCapture(videoTag);
    var n = 0;

    const FPS = 30;
    function processVideo() {
        try {
            let begin = Date.now();
            // start processing.
            cap.read(src);
            cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
            cv.imshow(document.getElementById("canvasOutput"), dst);
            // schedule the next one.
            let delay = 1000/FPS - (Date.now() - begin);

            document.getElementById("stupidShit").innerText = n;
            n++;

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
                
        } catch (err) {
            console.error(err);
        }
    };

    // schedule the first one.
    setTimeout(processVideo, 0);
}

