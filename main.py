import os
import eel
from engine.command import speak
from engine.features import playAssistantSound, chatBot, recognize_speech  # ✅ make sure recognize_speech is in features.py

def start():
    eel.init("www")

    @eel.expose
    def init():
        eel.hideLoader()
        speak("Hello Sir, Welcome to JARVIS AI...")
        eel.hideStart()
        playAssistantSound()

    @eel.expose
    def playAssistantSoundJS():  # ✅ Renamed to avoid conflict
        playAssistantSound()

    @eel.expose
    def handleCommandFromJS(message=""):  # ✅ Handles both typed and voice input
        if not message:
            speak("Listening...")
            message = recognize_speech()  # ✅ Use mic if nothing is typed
            if not message:
                return "Didn't hear anything."
        return chatBot(message)

    # Launch browser
    os.system('start msedge.exe --app="http://localhost:8000/index.html"')
    eel.start('index.html', mode=None, host='localhost', block=True)

if __name__ == "__main__":
    start()
