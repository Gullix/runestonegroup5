package main;

import java.nio.charset.StandardCharsets;

import lejos.hardware.*;
import lejos.hardware.motor.*;
import lejos.hardware.lcd.*;
import lejos.remote.nxt.*;
import lejos.utility.Delay;
import lejos.robotics.navigation.*;
import lejos.robotics.chassis.*;

public class Main {
	
	public static String BluetoothCardMacAddress = "00:0C:78:76:64:DB";

	public static void main(String[] args) {

		LCD.clearDisplay();
		LCD.drawString("Remote Control", 0, 4);
		
		
		NXTCommConnector nxtcom = Bluetooth.getNXTCommConnector();
		NXTConnection conn = nxtcom.connect(BluetoothCardMacAddress, 2);
		
		Wheel leftWheel = WheeledChassis.modelWheel(Motor.B, 56f).offset(60);
		Wheel rightWheel = WheeledChassis.modelWheel(Motor.C, 56f).offset(-60);
		Chassis chassis = new WheeledChassis(new Wheel[]{leftWheel, rightWheel}, WheeledChassis.TYPE_DIFFERENTIAL);
		
		MovePilot pilot = new MovePilot(chassis);
		
		boolean finished = false;
		while (!finished) {
			byte[] buf = new byte[1024];
			conn.read(buf, buf.length);
			String command = new String(buf, StandardCharsets.UTF_8);
			LCD.drawString(command, 0, 2);

			if ("forw".equals(command)) {
				pilot.travel(200);
			}

			if ((char)buf[0] == 'b') {
				pilot.travel(-200);
			}

			if ((char)buf[0] == 'l') {
				pilot.arc(0, 90);
			}

			if ((char)buf[0] == 'r') {
				pilot.arc(0, -90);
			}
			
			if ((char)buf[0] == 'd') {
				finished = true;
			}
			
			if (!finished) {
				conn.write("ack".getBytes(), 3);
			}
		}
		
		try {
			conn.close();
		} catch (Exception e) {}

	}

}
