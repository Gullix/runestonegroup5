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
	public LineFollowerPID(ColorCalibrate cCal, Chassis chassis) {
		this.cc = cCal;
		this.chassis = chassis;
		
	}
	
	public void go(){
		float[] sample = getSample();
		
		if (cc.seeColor("RED") or cc.seeColor("GREEN") or cc.seeColor("BLUE") or cc.seeColor("CYAN"))
		{
			return;
			
		}
		
		float error = sample[0];		
		
		tracker.fetchSample(sample, 0);
		float error = sample[0] + sample[1] + sample[2];
		// Accumulate errors for I term
		if (error*totalError <= 0)
		    totalError = totalError*0.80f;
		totalError += error;
		
		if (totalError*I > MAX_STEER/2)
		    totalError = MAX_STEER/2/I;
		else if (totalError*I < -MAX_STEER/2)
		    totalError = -MAX_STEER/2/I;
		// calculate PID value
		float output = P*error + I*totalError + D*(error - prevError);
		prevError = error;
		
		// limit it
		if (output > MAX_STEER)
		    output = MAX_STEER;
		else if (output < -MAX_STEER)
		    output = -MAX_STEER;
		// adjust speed if needed
		if (curSpeed != targetSpeed)
		{
		    float accel = acceleration*LOOP_TIME/1000;
		    if (curSpeed < targetSpeed)
		    {
		    	curSpeed += accel;
		    	if (curSpeed > targetSpeed)
		            curSpeed = targetSpeed;
		    }
		    else
		    {
		    	curSpeed -= accel;
		    	if (curSpeed < targetSpeed)
		    		curSpeed = targetSpeed;
		    }
		}
		// steer as needed
		chassis.setVelocity(curSpeed, output);
		Delay.msDelay(50);

		return;
	}
	
}
