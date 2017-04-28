package Robot;

import java.io.IOException;
import java.nio.charset.MalformedInputException;
import java.nio.charset.StandardCharsets;

import lejos.hardware.Bluetooth;
import lejos.hardware.lcd.LCD;
import lejos.remote.nxt.NXTCommConnector;
import lejos.remote.nxt.NXTConnection;
import lejos.utility.Delay;

public class RobotBob {

	public static void main(String[] args) {
		LCD.drawString("Plugin Test", 0, 4);
		String PyServer= "00:0C:78:76:64:DB";
		RobotMove rm = new RobotMove();
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
			byte[] bMessage = "Hello server from Bob".getBytes(StandardCharsets.UTF_8);
			mConnection.write(bMessage,bMessage.length);
			byte[] sMessage = new byte[1024];
			mConnection.read(sMessage, 1024);
			LCD.clearDisplay();
			String str = new String(sMessage, StandardCharsets.UTF_8);
			LCD.drawString(str + "", 0, 2);
			Delay.msDelay(3000);
			boolean talkWithServer = true;
			while(talkWithServer){
				sMessage = new byte[1024];
				mConnection.read(sMessage, 1024);
				str = new String(sMessage, StandardCharsets.UTF_8);
				if (str.equals("DONE")){
					talkWithServer = false;
					mConnection.close();
					break;
				} else {
					switch(str){
						case("MOVE"):
							rm._move();
							break;
							
					  	case("PICKUP"):
					  		rm._pickup();
					  		break;
					  		
					  	case("DONE"):
					  		rm._done();
					  		break;
					  	
					  	case("GOTO"):
					  		rm._goto();
					  		break;
					  	
					  	default: 
					  		throw new IllegalArgumentException("Command not found\n");
					  }
				  }
			  }
		  } catch (IOException e) {
			  	LCD.clearDisplay();
			  	LCD.drawString("I/O exception", 0, 2);
		  		Delay.msDelay(3000);
		  		e.printStackTrace();
		}
	}      
}
