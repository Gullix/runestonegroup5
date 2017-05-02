package main;

import java.nio.charset.StandardCharsets;

import lejos.hardware.Bluetooth;
import lejos.remote.nxt.NXTConnection;
import lejos.hardware.lcd.LCD;

public class Main {
	
	public static void main(String[] args) {
		
		NXTConnection conn = Bluetooth.getNXTCommConnector().connect("00:0C:78:76:64:DB", 2);
		
		while (true) {
			byte[] buf = new byte[1024];
			conn.read(buf, 1024);
			LCD.clearDisplay();
			LCD.drawString(new String(buf, StandardCharsets.UTF_8), 0, 2);
		}

	}

}
