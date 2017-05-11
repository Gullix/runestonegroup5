package Robot;

import lejos.robotics.chassis.Chassis;
import lejos.robotics.navigation.MovePilot;
import lejos.utility.Delay;


public class LineFollowerPID {
	
	private float totalError = 0;
	private float MAX_STEER = 20;
	private float prevError = 0;
	private float curSpeed = 0;
	private float acceleration = 2;
	private float targetSpeed = 100;
	private float LOOP_TIME = 50;
	private ColorCalibrate cc;
	private Chassis chassis;
	
	private final double P = 1.2;
	private final double I = 0.0008;
	private final double D = 5;
	
	public LineFollowerPID(ColorCalibrate cCal, Chassis chassis) {
		this.cc = cCal;
		this.chassis = chassis;
	}
	
	public void go(){
		float[] sample = cc.getSample();
		float error = sample[0] + sample[1] + sample[2];
		// Accumulate errors for I term
		if (error*totalError <= 0)totalError = totalError*0.80f;
		totalError += error;
		if (totalError*I > MAX_STEER/2)totalError = (float) (MAX_STEER/2/I);
		else if (totalError*I < -MAX_STEER/2)totalError = (float) (-MAX_STEER/2/I);
		// calculate PID value
		float output = (float) (P*error + I*totalError + D*(error - prevError));
		prevError = error;
		
		// limit it
		if (output > MAX_STEER)output = MAX_STEER;
		else if (output < -MAX_STEER)output = -MAX_STEER;
		// adjust speed if needed
		if (curSpeed != targetSpeed){
		    float accel = acceleration*LOOP_TIME/1000;
		    if (curSpeed < targetSpeed){
		    	curSpeed += accel;
		    	if (curSpeed > targetSpeed)curSpeed = targetSpeed;
		    } else {
		    	curSpeed -= accel;
		    	if (curSpeed < targetSpeed)curSpeed = targetSpeed;
		    }
		}
		// steer as needed
		chassis.setVelocity(curSpeed*2, output);
		Delay.msDelay(50);
	}
	
}
