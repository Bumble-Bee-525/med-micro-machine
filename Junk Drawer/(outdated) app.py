from PySide6.QtWidgets import (QApplication, QGridLayout, QWidget, QMainWindow)
from PySide6.QtGui import (QIcon)

# Extend QMainWindow Class
class MainWindow(QMainWindow):
    # Constructor
    def __init__(self):
        super().__init__()

        self.setWindowTitle("TODO NAME")
        self.setWindowIcon(QIcon("farts.png"))

        layout = QGridLayout()

        aWidget = QWidget()
        aWidget.setLayout(layout)

        self.setCentralWidget(aWidget)


app = QApplication([])
window = MainWindow()
window.show()

# Start the event loop.
app.exec()

# Your application won't reach here until you exit and the event
# loop has stopped.