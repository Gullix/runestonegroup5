package Robot;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

import lejos.robotics.chassis.Chassis;
import lejos.robotics.navigation.MovePilot;
import lejos.utility.Delay;

/*
 * The idea of this class is to move the robot by following a colored line*
 * For now everything is temporary and based on color reading*/ 

public class LineFollower {
	private PrintWriter writer;
	private ColorCalibrate cc;
	private Chassis chassis;
	private int lastColorSeen;
	
	private int counterBlack = 0;
	private int counterGreen = 0;
	private int counterGray = 0;
	private int counterBlue = 0;
	public LineFollower(ColorCalibrate cCal, Chassis chassis) {
		this.cc = cCal;
		this.chassis = chassis;
		this.lastColorSeen = 0;
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
			grayCount = grayCount > 0 ? grayCount-1 : 0;
			if (cc.seeColor("BLACK")){//it checks the color is s ~> now black
				chassis.setVelocity(speed,0);
				BobList._add("BLACK");
			}
			if(cc.seeColor("GREEN")){
				chassis.setVelocity(speed, -1*angle*d);
				BobList._add("GREEN");
			}
			if(cc.seeColor("BLUE")){
				chassis.setVelocity(speed, angle*d);
				BobList._add("BLUE");
			}
			
			if(cc.seeColor("GRAY")){
				chassis.setVelocity(0, 0);
				grayCount += 2;
				BobList._add("GRAY");
				//if(grayCount >= 5){if (!test) {break;}}
				if(grayCount >= 5 && !test) break;
				//we go out the while so no multithread!
			}
			Delay.msDelay(50);
		}
	}
}