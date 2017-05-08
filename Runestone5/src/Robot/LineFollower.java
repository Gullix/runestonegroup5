package Robot;

import lejos.robotics.navigation.MovePilot;

/*
 * The idea of this class is to move the robot by following a colored line*
 * For now everything is temporary and based on color reading*/ 

public class LineFollower {

	private ColorCalibrate cc;
	private MovePilot pilot;
	public LineFollower(ColorCalibrate cCal, MovePilot pilot) {
		this.cc = cCal;
		this.pilot = pilot;
	}
 
	public void go(String s){
		while(cc.seeColor(s)){//it checks the color is s ~> now black
			pilot.travel(2);
		}
	}
}
