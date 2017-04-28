package main;

import java.nio.charset.StandardCharsets;

import lejos.hardware.*;
import lejos.hardware.motor.*;
import lejos.hardware.lcd.*;
import lejos.remote.nxt.*;
import lejos.utility.Delay;

public class Main {
	
	public static String BluetoothCardMacAddress = "00:0C:78:76:64:DB";

	public static void main(String[] args) {

		LCD.clearDisplay();
		LCD.drawString("Remote Control", 0, 4);
		
		
		NXTCommConnector nxtcom = Bluetooth.getNXTCommConnector();
		NXTConnection conn = nxtcom.connect(BluetoothCardMacAddress, 2);
		boolean finished = false;
		while (!finished) {
			byte[] buf = new byte[1024];
			conn.read(buf, buf.length);
			String command = new String(buf, StandardCharsets.UTF_8);
			LCD.drawString(command, 0, 2);

			if ((char)buf[0] == 'f') {
				LCD.drawString("Got forw", 0, 3);
				Motor.B.rotate(300);
			}

			if ((char)buf[0] == 'b') {
				LCD.drawString("Got back", 0, 3);
				Motor.C.rotate(300);
			}
			
			if (!finished) {
				conn.write("ack".getBytes(), 3);
			}
		}
		
		try {
			conn.close();
		} catch (Exception e) {}

	}
	
	private static void forward(){
	}
	
	private static void backward(){
	}

}
