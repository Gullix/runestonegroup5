package Robot;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import lejos.hardware.Bluetooth;
import lejos.hardware.ev3.LocalEV3;
import lejos.hardware.lcd.LCD;
import lejos.hardware.motor.Motor;
import lejos.hardware.port.Port;
import lejos.hardware.sensor.EV3ColorSensor;
import lejos.hardware.sensor.SensorMode;
import lejos.remote.nxt.NXTConnection;
import lejos.robotics.chassis.Chassis;
import lejos.robotics.chassis.Wheel;
import lejos.robotics.chassis.WheeledChassis;
import lejos.robotics.navigation.MovePilot;
import lejos.utility.Delay;

public class RobotBob {
	
	public static void main(String[] args) {
		LCD.clearDisplay();
		LCD.drawString("Plugin Test", 0, 4);
		String[] addresses = {"00:0C:78:76:64:DB","74:DF:BF:4A:17:61",""};
		String[] textAddresses = {"Bluetooth dongle","Robert","NONE"};
		BtMac btAdr = new BtMac(textAddresses);
		int  selectedIndex = btAdr.doOption();
		String selectedServer = addresses[selectedIndex];
		RobotMove rm = new RobotMove();
		
		Wheel rightWheel = WheeledChassis.modelWheel(Motor.C,56f).offset(-60);
		Wheel leftWheel = WheeledChassis.modelWheel(Motor.B, 56f).offset(60);
		Chassis chassis = new WheeledChassis(new Wheel[]{leftWheel, rightWheel}, WheeledChassis.TYPE_DIFFERENTIAL);
		MovePilot pilot = new MovePilot(chassis);
		
		if (selectedServer.equals("")){
			//OFFLINE TESTING
			String [] colorsAvailable = {"magenta", "cyan","yellow","red", "green","white", "blue"};
		   ColorCalibrate cCal = new ColorCalibrate(colorsAvailable);
		   cCal.calibrateColors();
		   Delay.msDelay(3000);
		   while(!(cCal.seeColor("white"))){
			   rm._move("F","5", pilot);
			   
		   }
		   
			// end offline testing
		}
		 
		else{
			
		
		NXTConnection mConnection= Bluetooth.getNXTCommConnector().connect(selectedServer,2);
		if (mConnection == null) {
			LCD.drawString("Failed to connect", 0, 1);
			Delay.msDelay(5000);
			return;
		}
		
		
      
		try{
			Delay.msDelay(3000);
			boolean talkWithServer = true;
			while(talkWithServer){
				byte[] message = "GET_COMMAND".getBytes();
				mConnection.write(message, message.length);
				byte[] sMessage = new byte[1024];
				mConnection.read(sMessage, 1024);
				String str = new String(sMessage, StandardCharsets.UTF_8);
				if (str.equals("DONE")){
					talkWithServer = false;
					mConnection.close();
					break;
				} else {
					String[] arr = str.split(",");
					switch(arr[0].trim()){
						case("M"):
							rm._move(arr[1], arr[2], pilot);
							break;
							
					  	case("P"):
					  		rm._pickup(arr[1]);
					  		break;
					  		
					  	case("D"):
					  		rm._done(arr[1]);
					  		break;
					  	
					  	case("G"):
					  		rm._goto(arr[1]);
					  		break;
					  	
					  	default: 
					  		LCD.clearDisplay();
					  		LCD.drawString("Command not found", 0, 2);
					  		LCD.drawString(str, 0, 3);
					  		Delay.msDelay(1000);
					  		//throw new IllegalArgumentException("Command not found\n");
					  }
				  }
				//System.out.println("");
				//mConnection.write("ack".getBytes(), 3);
			  }
		  } catch (IOException e) {
			  	LCD.clearDisplay();
			  	LCD.drawString("I/O exception", 0, 2);
		  		Delay.msDelay(3000);
		  		e.printStackTrace();
		}
		}
	}      
}
