package Robot;

import java.io.DataOutputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

import lejos.hardware.Bluetooth;
import lejos.hardware.LocalBTDevice;
import lejos.hardware.lcd.LCD;
import lejos.hardware.motor.Motor;
import lejos.hardware.sensor.EV3ColorSensor;
import lejos.remote.nxt.NXTCommConnector;
import lejos.remote.nxt.NXTConnection;
import lejos.robotics.Color;
import lejos.robotics.SampleProvider;
import lejos.hardware.port.SensorPort;
import lejos.utility.Delay;

public class RobotBob {

	public static void main(String[] args) {
		LCD.drawString("Plugin Test", 0, 4);
		String PyServer= "00:0C:78:76:64:DB";
		
		//Delay.msDelay(5000);
		//Motor.B.rotateTo( 360 *4);
		//hello
		
		/* color sensor
		EV3ColorSensor colorSensor = new EV3ColorSensor(SensorPort.S3);
		SampleProvider sampleProvider = colorSensor.getColorIDMode();
		float[] samples = new float[sampleProvider.sampleSize()];
        while(true){
        	sampleProvider.fetchSample(samples, 0);
        	LCD.drawString(samples[0] + "", 0, 2);
        }
        */
		//LocalBTDevice btDevice = Bluetooth.getLocalDevice();
		//btDevice.setVisibility(true);
		//String name = "noadress";
		//name = btDevice.getBluetoothAddress();
		
		NXTCommConnector nxtCom = Bluetooth.getNXTCommConnector();
		LCD.clearDisplay();
    	LCD.drawString("connecting", 0, 2);
    	NXTConnection mConnection= nxtCom.connect(PyServer,2);
		LCD.clearDisplay();
    	LCD.drawString("trying", 0, 2);
      
		  try{
			String message = "hello server from Bob";
			byte[] bMessage = message.getBytes(StandardCharsets.UTF_8);
			  mConnection.write(bMessage,bMessage.length);
			  byte[] sMessage = new byte[1024];
			  mConnection.read(sMessage, 1024);
			  LCD.clearDisplay();
			  
			  String str = new String(sMessage, StandardCharsets.UTF_8);
			  LCD.drawString(str + "", 0, 2);
			  Delay.msDelay(3000);
			 
	        }
	        catch(Exception e){
	        	LCD.clearDisplay();
	        	LCD.drawString("exception", 0, 2);
	    		Delay.msDelay(3000);
	        }
		  boolean talkWithServer = true;
		  try{
          while(talkWithServer){
        	  byte[] sMessage = new byte[1024];
			  mConnection.read(sMessage, 1024);
			  String str = new String(sMessage, StandardCharsets.UTF_8);
			  if (str.equals("DONE")){
				 talkWithServer = false;
				 mConnection.close();
				 break;
			  }
			  else{
				  switch(str){
				  case("FORWARD"):
					  
					  break;
				  case("LEFT"):
					  
				  }
			  }
          }
		  }
          
          
          catch(Exception e){
        	  
          }
	}  
          
}
