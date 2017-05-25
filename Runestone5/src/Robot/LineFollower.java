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
	
	public void go(int d) {
		go(d, false);
	}
	
	/*Future changing: polymorphism for the open-closed principle. */
	public void go(int d, boolean test){
		int speed = 100;
		int angle = 20;
		int grayCount = 0;
		chassis.moveStart();
		chassis.setAcceleration(200, 20);
		while(true){
			//we used chassis because pilot stops after every command
			
			if (cc.seeColor("BLACK")){//it checks the color is s ~> now black
				grayCount = 0;
				chassis.setVelocity(speed,0);
			}
			if(cc.seeColor("GREEN")){
				grayCount = 0;
				chassis.setVelocity(speed, angle*d);
			}
			if(cc.seeColor("BLUE")){
				grayCount = 0;
				chassis.setVelocity(speed, -angle*d);
			}
			if(cc.seeColor("GRAY")){
				chassis.setVelocity(0, 0);
				grayCount++;
				if(grayCount >= 5){if (!test) {break;}}
				//we go out the while so no multithread!
			}
			Delay.msDelay(50);
		}
	}
}