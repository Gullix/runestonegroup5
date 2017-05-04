
//Libraries
#include <DHT.h>
#include <Wire.h>
#include "Adafruit_SI1145.h"

//Constants
#define DHTPIN 2     // what pin we're connected to
#define DHTTYPE DHT22   // DHT 22  (AM2302)
DHT dht(DHTPIN, DHTTYPE); //// Initialize DHT sensor for normal 16mhz Arduino
Adafruit_SI1145 uv = Adafruit_SI1145();



//Variables
float hum;  //Stores humidity value
float temp; //Stores temperature value

void setup(){
    Serial.begin(9600);
    dht.begin();
  
    
}

void loop(){
    //Read data and store it to variables hum and temp
    hum = dht.readHumidity();
    temp= dht.readTemperature();
    //Print temp and humidity values to serial monitor
    Serial.println("======================================");
    Serial.print("Humidity: ");
    Serial.print(hum);
    Serial.print(" %, Temp: ");
    Serial.print(temp);
    Serial.println(" Celsius");

    if (! uv.begin()) {
      Serial.println("Didn't find Si1145");
    } 
    else{
      Serial.println("");
      Serial.print("Vis: "); Serial.println(uv.readVisible());
      Serial.print("IR: "); Serial.println(uv.readIR());

      float UVindex = uv.readUV();
      // the index is multiplied by 100 so to get the
      // integer index, divide by 100!
      UVindex /= 100.0;  
      Serial.print("UV: ");  Serial.println(UVindex);
    }

    delay(1000); //Delay 2 sec.
}

   
