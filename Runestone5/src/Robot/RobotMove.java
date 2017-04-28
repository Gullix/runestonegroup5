package Robot;

import lejos.robotics.navigation.MovePilot;

public class RobotMove implements Movements{

	@Override
	public void _move(String direction, String cm, MovePilot mp) {
		double d = Double.parseDouble(cm.trim())*10;
		switch(direction.trim()){
		case "F":
			mp.travel(d);
			break;
		case "B":
			mp.travel(-d);
			break;
		case "L":
			mp.arc(0,90);
			mp.travel(d);
			break;
		case "R":
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
