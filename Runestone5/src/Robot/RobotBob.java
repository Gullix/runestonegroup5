package Robot;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

import lejos.hardware.Bluetooth;
import lejos.hardware.ev3.LocalEV3;
import lejos.hardware.lcd.LCD;
import lejos.hardware.motor.Motor;
import lejos.hardware.port.Port;
import lejos.hardware.sensor.EV3ColorSensor;
import lejos.hardware.sensor.EV3GyroSensor;
import lejos.hardware.sensor.SensorMode;
import lejos.remote.nxt.NXTConnection;
import lejos.robotics.GyroscopeAdapter;
import lejos.robotics.chassis.Chassis;
import lejos.robotics.chassis.Wheel;
import lejos.robotics.chassis.WheeledChassis;
import lejos.robotics.navigation.MovePilot;
import lejos.utility.Delay;
import lejos.utility.GyroDirectionFinder;
import lejos.utility.TextMenu;

public class RobotBob {
	
	private Chassis chassis;
	private final float wheelRadius = 55f;
	private final float angularAccel = 60;
	private final float linearAccel = 80;
	private static int BT_MODE = 2;
	private static final String[][] MAC_ADDRESSES = {
			{"00:0C:78:76:64:DB","24:0A:64:7C:89:B2","18:5E:0F:0A:BC:56"},
			{"Bluetooth dongle","Matteo","Batman"}
	};
	
	public static void main(String[] args) throws IOException{
		new RobotBob().run();
	}
	
	private MovePilot makeMovePilot() {
		Wheel rightWheel = WheeledChassis.modelWheel(Motor.C,56f).offset(-wheelRadius);
		Wheel leftWheel = WheeledChassis.modelWheel(Motor.B, 56f).offset(wheelRadius);
		chassis = new WheeledChassis(new Wheel[]{leftWheel, rightWheel}, WheeledChassis.TYPE_DIFFERENTIAL);
		return new MovePilot(chassis);
	}
	
	public void run() throws IOException {
		/**
		 * Testing orientation
		 * */
		BobList.getInstance();
		LCD.clearDisplay();
		LCD.drawString("Starting...", 0, 1);
		
		RobotTextMenu modeMenu = new RobotTextMenu(
				new String[] {"Network", "Line Follow", "Calibration Only", "PID Linefollower"},
				"Choose Mode"
		);
		
		
		int mode = modeMenu.selectOption();
		LCD.clear();
		
		ColorCalibrate cCal = calibrate();

		MovePilot pilot = makeMovePilot();
		pilot.setAngularAcceleration(angularAccel);
		pilot.setLinearAcceleration(linearAccel);
		
		LineFollower lf = new LineFollower(cCal, chassis);

		if (mode == 2) {
			offlineTest(cCal);
		} else if (mode == 1) {
			lf.go(1, true);
		}
		else if (mode == 3){
			LineFollowerPID lineFollowerPID = new LineFollowerPID(cCal, chassis);
			while(true) {
				lineFollowerPID.go();
			}
		}
		
		RobotMove rm = new RobotMove(lf);
		
		RobotTextMenu btMenu = new RobotTextMenu(MAC_ADDRESSES[1],"Choose BT Server");
		String macAddress = MAC_ADDRESSES[0][btMenu.selectOption()];
		LCD.clear();
		
		NXTConnection mConnection= Bluetooth.getNXTCommConnector().connect(macAddress,BT_MODE);
		if (mConnection == null) {
			LCD.drawString("Failed to connect", 0, 1);
			Delay.msDelay(5000);
			return;
		}
		//EV3GyroSensor ev3 = new EV3GyroSensor(LocalEV3.get().getPort("S3"));
		try{
			Delay.msDelay(3000);
			boolean talkWithServer = true;
			PrintWriter writer;
			
			
			while(talkWithServer){
				int i = 0;
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
					//String[] arr = str.split(",");
					Move m;
					str = str.trim();
					switch(str.trim()){
						case("PICK"):
							rm._pickup(new Move(str,pilot));
						break;
					
						case("DROP"):
							rm._drop(new Move(str,pilot));
						break;
					
						case("U"):
							rm._up(new Move(str,pilot));
						break;

						case("D"):
							rm._down(new Move(str,pilot));
						break;

						case("L"):
							rm._left(new Move(str,pilot));
						break;
					
						case("R"):
							rm._right(new Move(str,pilot));
						break;
						case("VICTORY"):
							rm.Victory(new Move(str,pilot));
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
				
				//PRINTING ON FILE
				writer = new PrintWriter("commands"+i+".txt", "UTF-8");
				writer.println(manageList());
				writer.close();
				i++;
			}
			
		} catch (FileNotFoundException | UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			LCD.clearDisplay();
			LCD.drawString("I/O exception", 0, 2);
			Delay.msDelay(3000);
			e.printStackTrace();
		}
	}
	
	private String manageList(){
		ArrayList<String> arr = new ArrayList<>();
		String tmp = BobList._get(0);
		int counter = 0;
		for(int i = 1; i < BobList._size(); i++){
			if(tmp.equals(BobList._get(i))){
				counter++;
			}
			else {
				arr.add(tmp+" " + counter+"\n");
				counter = 0;
				tmp = BobList._get(i);
			}
		}
		return arr.toString();
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
