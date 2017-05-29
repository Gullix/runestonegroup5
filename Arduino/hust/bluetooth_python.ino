#include "SoftwareSerial.h"
SoftwareSerial serial_connection(10, 11);//Create a serial connection with TX and RX on these pins
//TX = 10 , RX = 11
#define BUFFER_SIZE 64//This will prevent buffer overruns.
char inData[BUFFER_SIZE];//This is a character buffer where the data sent by the python script will go.
char inChar=-1;//Initialie the first character as nothing
int count=0;//This is the number of lines sent in from the python script
int i=0;//Arduinos are not the most capable chips in the world so I just create the looping variable once

// constants won't change. They're used here to
// set pin numbers:
const int buttonPin = 2;     // the number of the pushbutton pin
const int ledPin =  12;      // the number of the LED pin
const int ledBluetoothPin = 13;

const int delaySendData = 5000; //delay send data = 5 sec

// variables will change:
int buttonState = 0;         // variable for reading the pushbutton status

//data will send
char data[100];

void getDataInfo(){
  sprintf(data, "%s %d %s %d", "TEMP", getTempData(), "HU", getHumidityData());
}

int getTempData(){
    return random(70,80);
}

int getHumidityData(){
    return random(10,15);
}

void setup()
{
  Serial.begin(9600);//Initialize communications to the serial monitor in the Arduino IDE
  serial_connection.begin(9600);//Initialize communications with the bluetooth module
  serial_connection.println("Ready!!!");//Send something to just start comms. This will never be seen.
  Serial.println("Started");//Tell the serial monitor that the sketch has started.

  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  pinMode(ledBluetoothPin, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);
}
void loop()
{
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);

  // check if the pushbutton is pressed.
  // if it is, the buttonState is HIGH:
  Serial.println(buttonState);
  if (buttonState == HIGH) {
    // turn LED on:
    digitalWrite(ledPin, HIGH);
  } else {
    // turn LED off:
    digitalWrite(ledPin, LOW);
  }
  
  //This will prevent bufferoverrun errors
  getDataInfo();
  //serial_connection.println("hello world");
  serial_connection.println(data);
  digitalWrite(ledBluetoothPin, HIGH);
  delay(1000);
  digitalWrite(ledBluetoothPin, LOW);
  delay(delaySendData);//Pause for a moment 
}




