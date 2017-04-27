package Robot;

import java.io.DataOutputStream;

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
		String PyServer= "74:DF:BF:4A:17:62";
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
		LocalBTDevice btDevice = Bluetooth.getLocalDevice();
		btDevice.setVisibility(true);
		//LCD.drawString("removing", 0, 2);
		Delay.msDelay(3000);
		LCD.clearDisplay();
		//LCD.drawString("connecting", 0, 2);
		//btDevice.authenticate("74:DF:BF:4A:17:62", "");
		String name = "noadress";
		name = btDevice.getBluetoothAddress();
		LCD.clearDisplay();
		LCD.drawString(name, 0, 2);
		Delay.msDelay(2000);
		LCD.drawString("Test Done", 0, 4);
		Delay.msDelay(2000);
		NXTCommConnector nxtCom = Bluetooth.getNXTCommConnector();
		LCD.clearDisplay();
    	LCD.drawString("connecting", 0, 2);
    	Delay.msDelay(3000);
    	
		NXTConnection mConnection= nxtCom.connect(PyServer,3);
    	DataOutputStream dos = mConnection.openDataOutputStream();
		LCD.clearDisplay();
    	LCD.drawString("trying", 0, 2);
		Delay.msDelay(3000);
      
		  try{
			  dos.writeBytes("Hello server");
	        }
	        catch(Exception e){
	        	LCD.clearDisplay();
	        	LCD.drawString("exception", 0, 2);
	    		Delay.msDelay(3000);
	        }
	        
		
		
	}
}
