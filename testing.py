import cv2



print("LAUNCHING. . .")

# initialize video capture
cap = cv2.VideoCapture(1, cv2.CAP_DSHOW)

# wait for capture to start
while not cap.isOpened():
    pass

cv2.namedWindow("Type shih", cv2.WINDOW_NORMAL)
cv2.resizeWindow("Type shih", 1920, 1080) 

# set video capture resolution
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920 - 1)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080 - 1)

print("Exposure:", cap.get(cv2.CAP_PROP_EXPOSURE))
print("FPS:", cap.get(cv2.CAP_PROP_FPS))

# Try to disable auto-exposure first
cap.set(cv2.CAP_PROP_AUTO_EXPOSURE, 0.75)  # 0.25 = manual exposure mode for many drivers

# Set manual exposure (value depends on camera/driver, sometimes negative on Windows)
"""cap.set(cv2.CAP_PROP_EXPOSURE, 2.0)
print(cap.get(cv2.CAP_PROP_EXPOSURE))"""

# initialize default crop settings
status, oldImage = cap.read()

# run continously
while True:
    # get an image from webcam
    status, newImage = cap.read()
    cv2.imwrite("farts.png", newImage)

    # display image
    cv2.imshow("Type shih", newImage)
    
    key = cv2.waitKey(1)
    #if a key was pressed
    if key != -1:
        # press x to exit
        if key == ord('x'):
            cv2.destroyAllWindows()
            break
        
        print(cap.get(cv2.CAP_PROP_EXPOSURE))
        if key == ord('w'):
            cap.set(cv2.CAP_PROP_EXPOSURE, cap.get(cv2.CAP_PROP_EXPOSURE) + 1)
        elif key == ord('s'):
            cap.set(cv2.CAP_PROP_EXPOSURE, cap.get(cv2.CAP_PROP_EXPOSURE) - 1)
        elif key == ord('q'):
            cap.set(cv2.CAP_PROP_AUTO_EXPOSURE, 0.75)
            

