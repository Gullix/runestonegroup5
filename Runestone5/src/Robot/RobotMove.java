package Robot;

import lejos.hardware.sensor.EV3GyroSensor;
import java.math.*;
import lejos.robotics.navigation.MovePilot;

public class RobotMove implements Movements{
	Orientation orientation = new Orientation(0);
	float [] sample = new float [1];
	private EV3GyroSensor sensor;
	int index = 0;

	public RobotMove(EV3GyroSensor sensor){
		this.sensor = sensor;
	}
	@Override
	public void _move(Move m) {
		double d = Double.parseDouble(m.getCm().trim())*10;
		switch(m.getDirection().trim()){
		case "F":
			m.getMp().travel(d);
			break;
		case "B":
			m.getMp().travel(-d);
			break;
		case "L":
			m.getMp().arc(0,90);
			m.getMp().travel(d);
			break;
		case "R":
			m.getMp().arc(0,-90);
			m.getMp().travel(d);
			break;
		
		default: throw new IllegalArgumentException("Direction not found!\n");
		}
	}
	
	private void updating(int i, Move m){
		this.orientation.increment(i);
		m.getMp().arc(0, i);
	}
	private void turning(int target, Move m){
		boolean left = Math.abs(this.orientation.getOrientation()-target) < 180;
		while(this.orientation.getOrientation()!=target){
			System.out.println("Or: " + this.orientation.getOrientation() + "\nT: " + target + "\n");
			if(!left)this.updating(1, m);
			else this.updating(-1, m);
		}
	}
		public void _turn(Move m) {			
			this.sensor.getAngleMode().fetchSample(sample,0);
			this.orientation.set((int)sample[0]);
			switch(m.getDirection().trim()){
			case "D":
				turning(180,m);
				break;
			case "L":
				turning(270,m);	
				break;
			case "R":
				turning(90,m);	
				break;
			case "U":
				turning(0,m);	
			default: throw new IllegalArgumentException("Direction not found!\n");
			}
	}
		public void updateOri(int amount){
			System.out.println("orientation is " + orientation + " angle is " + sample[0]);
		}

	@Override
	public void _pickup(String s) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void _done(String s) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void _goto(String s) {
		// TODO Auto-generated method stub
		
	}

}