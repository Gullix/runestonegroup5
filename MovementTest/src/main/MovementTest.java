package main;

import lejos.hardware.motor.Motor;
import lejos.robotics.chassis.Chassis;
import lejos.robotics.chassis.Wheel;
import lejos.robotics.chassis.WheeledChassis;
import lejos.robotics.navigation.MovePilot;

public class MovementTest {
	
	private Chassis chassis;
	
	private final float wheelRadius = 55f;
	private final float sensorWheelDistanceMm = 78;
	private final float angularAccel = 60;
	private final float linearAccel = 80;
	
	private MovePilot makeMovePilot() {
		Wheel rightWheel = WheeledChassis.modelWheel(Motor.C,56f).offset(-wheelRadius);
		Wheel leftWheel = WheeledChassis.modelWheel(Motor.B, 56f).offset(wheelRadius);
		chassis = new WheeledChassis(new Wheel[]{leftWheel, rightWheel}, WheeledChassis.TYPE_DIFFERENTIAL);
		return new MovePilot(chassis);
	}
	
	private void run() {
		MovePilot pilot = makeMovePilot();
		pilot.setAngularAcceleration(angularAccel);
		pilot.setLinearAcceleration(linearAccel);
		
		pilot.travel(sensorWheelDistanceMm);
		
		//arc left
		pilot.arc(wheelRadius, 90);
		
		//arc left again
		pilot.arc(wheelRadius, 90);
		
		//arc left again
		pilot.arc(wheelRadius, -90);
		
		//arc left again
		pilot.arc(wheelRadius, 90);
		
		//arc left again
		pilot.arc(wheelRadius, 90);
		
		//arc left again
		pilot.arc(wheelRadius, 90);
	}

	public static void main(String[] args) {
		new MovementTest().run();
	}
	
}
