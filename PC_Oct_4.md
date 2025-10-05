# Main Achievments so far
## Camera acquired
- Microdia USB Camera (Product ID: 636B, Vendor ID: 0C45)

- This is a relatively old camera I had for the pandemic times, but for early testing on the microscope where I care less about image quality and more about the code to work at all, it's definitely sufficient

- Later, I could get a better camera but the software takes priority right now and it should work no matter the specific camera used anyways

## Camera Feed Cracked
- OpenCV, even if its image analysis is generally more unreliable than scikit-image, has proven to be reliable at using the right driver and porting the camera feed.

- Plus it's super convenient: literally one line of code:  
    `cap = cv2.VideoCapture(N)`
    - I still need to figure out a way to go from camera index N (0, 1, 2 etc.) in OpenCV to an actual device name or hardware ID at least.

- Taking pictures/videos is now possible, although it's kind of buggy with a delay. I suspect it might be related to some async issues I've encountered using OpenCV before.

- Next step will be to learn Scikit-image to analyze the image OpenCV spits out.

## Learned to use Git
- I spent a couple of hours learning to use git and now I have the github repo working with the folder on my computer.

## Learning PySide
- PySide is the library I'm using to make the GUI for the app.

- I'm currently learning to use [PySide](https://www.youtube.com/watch?v=Z1N9JzNax2k) and I have some of the basics down. I can make windows, menus, and plug the camera feed into the window. Although, it looks kinda wacky for now.