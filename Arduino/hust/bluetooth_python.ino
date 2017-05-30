#include "SoftwareSerial.h"
#include <LiquidCrystal.h>
LiquidCrystal lcd(9, 8, 7, 6, 5, 4);

SoftwareSerial serial_connection(10, 11);//Create a serial connection with TX and RX on these pins
//TX = 10 , RX = 11
#define BUFFER_SIZE 64//This will prevent buffer overruns.
char inData[BUFFER_SIZE];//This is a character buffer where the data sent by the python script will go.
char inChar=-1;//Initialie the first character as nothing
int count=0;//This is the number of lines sent in from the python script
int i=0;//Arduinos are not the most capable chips in the world so I just create the looping variable once

// constants won't change. They're used here to
// set pin numbers:
const int buttonPin = 2;     // the number of the pushbutton pin, turn on/off bluetooth
const int ledPin =  12;      // the number of the LED pin, led blink when data sending
const int ledBluetoothPin = 13;

const int delaySendData = 2500; //delay send data = 2.5 sec

// variables will change:
int buttonState = 0;         // variable for reading the pushbutton status
int bluetooth_state = 0;

//data will send
char data[100];

void getDataInfo(){
  sprintf(data, "%s:%d %s:%d", "TEMP", getTempData(), "HUM", getHumidityData());
}

int getTempData(){
    return random(70,80);
}

int getHumidityData(){
    return random(7,12);
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

  //LCDDDDDDD
  lcd.begin(16, 2);
  //In ra màn hình lcd dòng chữ Toi yeu Arduino
  lcd.print("Sensor");
  
}
void loop()
{
  //set cursor lcd
  lcd.setCursor(0, 1);
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);
  if(buttonState==0){
    bluetooth_state = 1 - bluetooth_state;
  }
  // check if the pushbutton is pressed.
  // if it is, the buttonState is HIGH:
  if(bluetooth_state == 1){
    digitalWrite(ledPin, HIGH);
    getDataInfo();
    Serial.println(data);
    lcd.print(data);
    serial_connection.println(data);
    digitalWrite(ledBluetoothPin, HIGH);
    delay(500);
    digitalWrite(ledBluetoothPin, LOW);
  }else{
    digitalWrite(ledPin, LOW);
    lcd.print("Off              ");
  } 
  
  delay(delaySendData);//Pause for a moment 
}




