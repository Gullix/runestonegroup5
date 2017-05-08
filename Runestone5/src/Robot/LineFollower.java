package Robot;

import lejos.robotics.chassis.Chassis;
import lejos.robotics.navigation.MovePilot;
import lejos.utility.Delay;

/*
 * The idea of this class is to move the robot by following a colored line*
 * For now everything is temporary and based on color reading*/ 

public class LineFollower {

	private ColorCalibrate cc;
	private Chassis chassis;
	public LineFollower(ColorCalibrate cCal, Chassis chassis) {
		this.cc = cCal;
		this.chassis = chassis;
	}
 
	public void go(){
		while(true){
			chassis.moveStart();
			if (cc.seeColor("BLACK")){//it checks the color is s ~> now black
				chassis.setVelocity(40,-20);
			}
			if (cc.seeColor("WHITE")) {
				chassis.setVelocity(40, 20);
			}
			Delay.msDelay(50);
		}
	}
}
