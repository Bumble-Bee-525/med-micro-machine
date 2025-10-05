# Basic Image Analysis and Definitions
## Color/Tone Parameters
| Name       | OpenCV Name            | Technical description                                                       |
| ---------- | ---------------------- | --------------------------------------------------------------------------- |
| Brightness | cv.CAP_PROP_BRIGHTNESS | Average pixel intensity on grayscale                                        |
| Contrast   | cv.CAP_PROP_CONTRAST   | Standard deviation of pixel intensity on grayscale                          |
| Saturation | cv.CAP_PROP_SATURATION | Metric of difference between all 3 color channels or distance from gray     |
| Hue        | cv.CAP_PROP_HUE        | Position vector on color wheel, measured in degrees                         |
| Gamma      | cv.CAP_PROP_GAMMA      | Non-linear system for measuring color, adjusted for human eye's perception. |

## Light Sensitivity
| Name          | OpenCV Name               | Technical description                                                                                             |
| ------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Gain          | cv.CAP_PROP_GAIN          | Factor raw signal is multiplied by before being digitally outputted                                               |
| Exposure      | cv.CAP_PROP_EXPOSURE      | Total light energy hitting sensor, luminance times shutter time                                                   |
| Auto Exposure | cv.CAP_PROP_AUTO_EXPOSURE | Toggles auto exposure                                                                                             |
| ISO Speed     | cv.CAP_PROP_ISO_SPEED     | Functionally the same as gain, just measured differently                                                          |
| Backlight     | cv.CAP_PROP_BACKLIGHT     | Adjusts auto exposure weighting to favor darker foregrounds against bright backgrounds, rarely used in microscopy |


## Sharpness/Focus
| Name      | OpenCV Name           | Technical description                                                              |
| --------- | --------------------- | ---------------------------------------------------------------------------------- |
| Sharpness | cv.CAP_PROP_SHARPNESS | Sharpness of edges by taking second derivative usually                             |
| Autofocus | cv.CAP_PROP_AUTOFOCUS | Toggles Camera autofocus                                                           |
| Focus     | cv.CAP_PROP_FOCUS     | Unitless metric of distance to clearest focused point, from close to far from lens |

## Temperature/Neutral Control
| Name                      | OpenCV Name                     | Technical description                                                                |
| ------------------------- | ------------------------------- | ------------------------------------------------------------------------------------ |
| Temperature               | cv.CAP_PROP_TEMPERATURE         | Metric using RGB individual gains, such that a white object would have a neutral RGB |
| White Balance             | cv.CAP_PROP_WHITE_BALANCE_RED_V | Adjustment to red channel so that white objects have neutral RGB                     |
| Auto White Balance        | cv.CAP_PROP_AUTO_WB             | Toggles auto white balance                                                           |
| White Balance Temperature | cv.CAP_PROP_WB_TEMPERATURE      | Literally the same as temperature, but manufactures might name them differently      |