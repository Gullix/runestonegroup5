package Robot;

import lejos.hardware.sensor.EV3GyroSensor;
import lejos.hardware.ev3.LocalEV3;
import lejos.hardware.motor.EV3MediumRegulatedMotor;
import lejos.hardware.motor.Motor;
import lejos.hardware.port.MotorPort;

public class RobotMove implements Movements{
	Orientation orientation = new Orientation(0);
	float [] sample = new float [1];
	private EV3GyroSensor sensor;
	private EV3MediumRegulatedMotor arm;
	int index = 0;
	boolean right;
	private LineFollower lf;
	
	private final float sensorWheelDistanceMm = 78;
	private final float wheelRadius = 55f;

	public RobotMove(EV3GyroSensor sensor){
		this.sensor = sensor;
	}
	
	public RobotMove(LineFollower lf){
		this.lf = lf;
		Motor.D.close();
		this.arm = new EV3MediumRegulatedMotor(LocalEV3.get().getPort("D"));
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
			System.out.println("orientation is " + orientation + " angle is " + sample[0]);
		}

	@Override
	public void _pickup() {
		arm.rotate(90);		
	}
	
	@Override
	public void _drop(){
		arm.rotate(-90);
	}
	@Override
	public void _done() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void _goto(String s) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void _up(Move m) {
		_turn(m);
		//findline(String turn);
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
		lf.go(-1);
	}

	@Override
	public void _right(Move m) {
		_turn(m);
		lf.go(1);
	}

}