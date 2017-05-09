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
	/*Future changing: polymorphism for the open-closed principle. */
	public void go(){
		int speed = 80;
		int angle = 20;
		while(true){
			//we used chassis because pilot stops after every command
			chassis.moveStart();
			
			if (cc.seeColor("BLACK")){//it checks the color is s ~> now black
				chassis.setVelocity(speed,0);
			}
			/*We ignore white
			 * if (cc.seeColor("WHITE")) {
				chassis.setVelocity(40, 20);
			}*/
			if(cc.seeColor("GREEN")){
				chassis.setVelocity(speed, angle);
			}
			if(cc.seeColor("BLUE")){
				chassis.setVelocity(speed, -angle);
			}
			if(cc.seeColor("RED")){
				chassis.setVelocity(0, 0);
			}
			Delay.msDelay(50);
		}
	}
}
