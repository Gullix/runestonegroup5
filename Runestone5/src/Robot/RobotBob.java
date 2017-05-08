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
import lejos.utility.TextMenu;

public class RobotBob {
	
	private Chassis chassis;
	
	private static int BT_MODE = 2;
	private static final String[][] MAC_ADDRESSES = {
			{"00:0C:78:76:64:DB","74:DF:BF:4A:17:61","18:5E:0F:0A:BC:56"},
			{"Robert","Emil","Bluetooth dongle"}
	};
	
	public static void main(String[] args) throws IOException{
		RobotBob bob = new RobotBob();
		bob.run();
	}
	
	private MovePilot makeMovePilot() {
		Wheel rightWheel = WheeledChassis.modelWheel(Motor.C,56f).offset(-60);
		Wheel leftWheel = WheeledChassis.modelWheel(Motor.B, 56f).offset(60);
		chassis = new WheeledChassis(new Wheel[]{leftWheel, rightWheel}, WheeledChassis.TYPE_DIFFERENTIAL);
		return new MovePilot(chassis);
	}
	
	public void run() throws IOException {
		
		LCD.clearDisplay();
		LCD.drawString("Starting...", 0, 1);
		
		RobotTextMenu modeMenu = new RobotTextMenu(
				new String[] {"Network", "Line Follow", "Calibration Only"},
				"Choose Mode"
		);
		int mode = modeMenu.selectOption();
		LCD.clear();
		
		ColorCalibrate cCal = calibrate();

		MovePilot pilot = makeMovePilot();
		
		LineFollower lf = new LineFollower(cCal, chassis);

		if (mode == 2) {
			offlineTest(cCal);
		} else if (mode == 1) {
			lf.go();
		}
		
		RobotMove rm = new RobotMove();
		
		RobotTextMenu btMenu = new RobotTextMenu(MAC_ADDRESSES[1],"Choose BT Server");
		String macAddress = MAC_ADDRESSES[0][btMenu.selectOption()];
		LCD.clear();
		
		NXTConnection mConnection= Bluetooth.getNXTCommConnector().connect(macAddress,BT_MODE);
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
					Move m;
					switch(arr[0].trim()){
					case("M"):
						m = new Move(arr[1],arr[2],pilot);
						rm._move(m);
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
	
	private ColorCalibrate calibrate() throws IOException {
		RobotTextMenu calibrationMenu = new RobotTextMenu(
				new String[] {"Use Text File", "New Calibration"},
				"Choose Calibration"
		);
		int calibrationOption = calibrationMenu.selectOption();
		LCD.clear();
		
		ColorCalibrate cCal;
		switch(calibrationOption){
			case 0:
				cCal = new ColorCalibrate();
				cCal.dataFromFile();
			break;
			
			default:
				cCal = new ColorCalibrate(ColorCalibrate.FEWER_COLORS);
				cCal.calibrateColors();
			break;
		}
		
		return cCal;
	}
	
	private void offlineTest(ColorCalibrate cCal) {
		while(true){
			Delay.msDelay(2000);
			String catchMe = cCal.identifyColor();
		}
	}
	
}
