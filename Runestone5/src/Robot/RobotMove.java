package Robot;

import lejos.hardware.sensor.EV3GyroSensor;
import lejos.hardware.sensor.EV3UltrasonicSensor;
import lejos.hardware.ev3.LocalEV3;
import lejos.hardware.lcd.LCD;
import lejos.hardware.motor.EV3MediumRegulatedMotor;
import lejos.hardware.motor.Motor;
import lejos.hardware.port.MotorPort;
import lejos.hardware.port.Port;

public class RobotMove implements Movements{
	Orientation orientation = new Orientation(0);
	float [] gyroSample = new float [1];
	private EV3GyroSensor gyroSensor;

		float [] sonicSample = new float [1];
		Port port = LocalEV3.get().getPort("S4");
		EV3UltrasonicSensor sonic = new EV3UltrasonicSensor(port);
		private EV3MediumRegulatedMotor arm;
		int index = 0;
		boolean right;
		private LineFollower lf;
		
	private final float sensorWheelDistanceMm = 78;
	private final float wheelRadius = 55f;

	public RobotMove(EV3GyroSensor sensor){
		this.gyroSensor = sensor;
	}
	
	
	public RobotMove(LineFollower lf){
		this.lf = lf;
		Motor.D.close();
		this.arm = new EV3MediumRegulatedMotor(LocalEV3.get().getPort("D"));
	}
	
	public void Victory(Move m){
		double old = m.getMp().getAngularSpeed();
		m.getMp().setAngularSpeed(old*3);
		int happiness = 180;
		int celebration = 720;
		int strength = 120;
		int robert = 1;
		int mathew = robert*(-1);
		for(int i=1; i<=celebration; i=i+happiness){
			m.getMp().arc(wheelRadius*robert, happiness*mathew, true);
			robert = mathew;
			mathew = robert*(-1);
			arm.rotate(-strength);
			arm.rotate(strength);
		}
		m.getMp().setAngularSpeed(old*3);
	}
	
	private void updating(int i, Move m){
		this.orientation.increment(i);
		m.getMp().arc(wheelRadius, i);
	}
	private void turning(int target, Move m){
		this.right = (target - orientation.getOrientation() + 360) % 360 >= 180;
		m.getMp().travel(sensorWheelDistanceMm);
		while(this.orientation.getOrientation()!=target){
			if(right){
				updating(-90,m);
			}
			else {
				updating(90,m);
			}
		}
	}
	/*
	 * This function pre calculates the fixing angle for turning
	 * */
	private void precalculation(int target){
		this.orientation.increment(target);//increment or decrement a little
		this.orientation.set(this.orientation.getOrientation() - target);
		//orientation does not have to change, so I reset it a it was
	}
		public void _turn(Move m) {			
			switch(m.getDirection().trim()){
			case "D":
				turning(180,m);
				break;
			case "R":
				turning(270,m);	
				break;
			case "L":
				turning(90,m);	
				break;
			case "U":
				turning(0,m);
				break;	
			default: throw new IllegalArgumentException("Direction not found!\n");
			}
			/*
			 * after each command I correct having the opposite of the direction,
			 * for having this, now "right"is an attribute of the class
			 */
			if(right)this.precalculation(10);//so it goes to the left
			else this.precalculation(-10);//so it goes to the right
	}

		
		public void updateOri(int amount){
			System.out.println("orientation is " + orientation + " angle is " + gyroSample[0]);
		}
		
		//

	@Override
	public void _pickup(Move m) {
		sonic.fetchSample(sonicSample, 0);
		while(sonicSample[0] > 0.032){
			sonic.fetchSample(sonicSample, 0);
			LCD.drawString("Ultra = " + Float.toString(sonicSample[0]), 0, 1);
			m.getMp().travel(10);
			if(Float.toString(sonicSample[0]).trim().contains("Infin")){
				m.getMp().travel(-10);
			}
		}
		arm.rotate(-1200);		
	}
	
	
	//d can be negative to search the other way
	public void search(Move m, int d){
		int range = 10*d;
		float[] samples = {};
		for(int i=1; i<range; i++){
			sonic.fetchSample(sonicSample, 0);
			LCD.drawString("Ultrasonic = " + Float.toString(sonicSample[0]), 0, 1);
			sonic.fetchSample(sonicSample, 0);
			samples[i] = sonicSample[0];
			m.getMp().arc(wheelRadius, 5);
			
		}
		
	}
	
	@Override
	public void _drop(Move m){
		sonic.fetchSample(sonicSample, 0);
		LCD.drawString("Ultra = " + Float.toString(sonicSample[0]), 0, 1);
		arm.rotate(120);
		arm.rotate(5);
		m.getMp().travel(-2*sensorWheelDistanceMm);
	}
	

	@Override
	public void _up(Move m) {
		_turn(m);
		lf.go(1);	
	}

	@Override
	public void _down(Move m) {
		_turn(m);
		lf.go(-1);
	}

	@Override
	public void _left(Move m) {
		_turn(m);
		lf.go(1);
	}

	@Override
	public void _right(Move m) {
		_turn(m);
		lf.go(-1);
	}

}