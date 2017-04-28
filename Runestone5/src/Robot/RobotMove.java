package Robot;

import lejos.robotics.navigation.MovePilot;

public class RobotMove implements Movements{

	@Override
	public void _move(String direction, String cm, MovePilot mp) {
		double d = Double.parseDouble(cm.trim());
		switch(direction.trim()){
		case "FORWARD":
			mp.travel(d);
			break;
		case "BACKWARD":
			mp.travel(-d);
			break;
		case "LEFT":
			mp.arc(0,90);
			mp.travel(d);
			break;
		case "RIGHT":
			mp.arc(0,-90);
			mp.travel(d);
			break;
		
		default: throw new IllegalArgumentException("Direction not found!\n");
		}
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
