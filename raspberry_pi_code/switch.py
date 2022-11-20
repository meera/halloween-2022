import RPi.GPIO as G
import time
import requests

def switchsense():
  while True:
    time.sleep(0.2)
    G.output(16, G.LOW)
    i = G.input(26)
    if not i:
      print("sleeping")
      G.output(16, G.HIGH)
      #Replace this URL with your deployment URL
      response = requests.post("https://halloween.askus.how/api/trigger")
      print(response.text)
      time.sleep(3)

def main():
  try:
    G.setmode(G.BCM)
    G.setup(16, G.OUT)
    G.setup(26, G.IN, pull_up_down=G.PUD_UP)
    switchsense()
  finally:
    G.cleanup()

if __name__ == "__main__":
  main()
