package main;

import lejos.hardware.ev3.LocalEV3;
import lejos.hardware.lcd.LCD;
import lejos.hardware.motor.Motor;
import lejos.hardware.port.Port;
import lejos.hardware.sensor.EV3UltrasonicSensor;
import lejos.robotics.chassis.Chassis;
import lejos.robotics.chassis.Wheel;
import lejos.robotics.chassis.WheeledChassis;
import lejos.robotics.navigation.MovePilot;
import lejos.utility.Delay;

public class MovementTest {
	
	private Chassis chassis;
	
	private final float wheelRadius = 55f;
	private final float sensorWheelDistanceMm = 78;
	private final float angularAccel = 60;
	private final float linearAccel = 80;
	
	float [] sonicSample = new float [1];
	Port port = LocalEV3.get().getPort("S4");
	EV3UltrasonicSensor sonic = new EV3UltrasonicSensor(port);
	
	private MovePilot makeMovePilot() {
		Wheel rightWheel = WheeledChassis.modelWheel(Motor.C,56f).offset(-wheelRadius);
		Wheel leftWheel = WheeledChassis.modelWheel(Motor.B, 56f).offset(wheelRadius);
		chassis = new WheeledChassis(new Wheel[]{leftWheel, rightWheel}, WheeledChassis.TYPE_DIFFERENTIAL);
		return new MovePilot(chassis);
	}
	
	private void run() {
		boolean cancel = true;
		MovePilot pilot = makeMovePilot();
		while(cancel){
			Delay.msDelay(50);
			sonic.fetchSample(sonicSample, 0);
			LCD.drawString("Ultrasonic = " + Float.toString(sonicSample[0]), 0, 1);
		}
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
