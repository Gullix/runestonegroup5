package Robot;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;

import lejos.hardware.lcd.LCD;
import lejos.remote.nxt.NXTConnection;
import lejos.robotics.chassis.Chassis;
import lejos.utility.Delay;

public class ManualMode {

	public void run(NXTConnection mConnection, Chassis chassis) {
		
		boolean talkWithServer = true;
		
		while(talkWithServer) {
			byte[] message = "GET_COMMAND".getBytes();
			mConnection.write(message, message.length);
			byte[] sMessage = new byte[1024];
			mConnection.read(sMessage, 1024);
			String str = new String(sMessage, StandardCharsets.UTF_8);
			
			str = str.trim(); 
			switch(str.trim()) {
			
				case("F"):
					chassis.setVelocity(50, 0);
				break;

				case("B"):
					chassis.setVelocity(-50, 0);
				break;

				case("L"):
					chassis.setVelocity(0, 30);
				break;
			
				case("R"):
					chassis.setVelocity(0, -30);
				break;
			
				case("X"):
					chassis.setVelocity(0, 0);
				break;
				
				case("MANUAL_END"):
					chassis.setVelocity(0, 0);
				return; // GO back to normal mode
				
			default: 
				LCD.clearDisplay();
				LCD.drawString("Command not found", 0, 2);
				LCD.drawString(str, 0, 3);
				Delay.msDelay(1000);
			}
			
		}
		
	}
	
}
