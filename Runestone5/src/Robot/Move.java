package Robot;

import lejos.hardware.motor.EV3LargeRegulatedMotor;
import lejos.hardware.motor.EV3MediumRegulatedMotor;
import lejos.hardware.port.MotorPort;
import lejos.robotics.navigation.MovePilot;

public class Move {

	private String direction;
	private String cm;
	private MovePilot mp;
	private EV3MediumRegulatedMotor arm = new EV3MediumRegulatedMotor(MotorPort.D);
	
	public Move(String d, String c, MovePilot m){
		direction = d;
		cm = c;
		mp = m;
		arm.rotate(90);

	}
	public String getDirection(){ return this.direction; }
	public String getCm(){ return this.cm;}
	public MovePilot getMp(){ return this.mp;}
	
}