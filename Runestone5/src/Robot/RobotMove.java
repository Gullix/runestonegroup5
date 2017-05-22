package Robot;

import lejos.hardware.sensor.EV3GyroSensor;
import lejos.robotics.navigation.MovePilot;

public class RobotMove implements Movements{
	int orientation = 0;
	float [] sample = new float [1];
	private EV3GyroSensor sensor;

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
		public void _turn(Move m) {			
			this.sensor.getAngleMode().fetchSample(sample,0);
			switch(m.getDirection().trim()){
			case "D":
				while((sample[0] % 360) != 0){
					m.getMp().arc(0,1);
				}
				break;
			case "L":
				while((sample[0] % 360) != 270){
					m.getMp().arc(0,1);
				}
				break;
			case "R":
				while((sample[0] % 360) != 90){
					m.getMp().arc(0,1);
				}
				break;
			case "U":
				while((sample[0] % 360) != 180){				
					m.getMp().arc(0,1);				
				}
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