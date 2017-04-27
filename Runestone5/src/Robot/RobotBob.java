package Robot;

import lejos.hardware.lcd.LCD;
import lejos.hardware.motor.Motor;
import lejos.hardware.sensor.EV3ColorSensor;
import lejos.robotics.Color;
import lejos.robotics.SampleProvider;
import lejos.hardware.port.SensorPort;
import lejos.utility.Delay;

public class RobotBob {

	public static void main(String[] args) {
		LCD.drawString("Plugin Test", 0, 4);
		//Delay.msDelay(5000);
		//Motor.B.rotateTo( 360 *4);
		//hello
		EV3ColorSensor colorSensor = new EV3ColorSensor(SensorPort.S3);
		SampleProvider sampleProvider = colorSensor.getColorIDMode();
		float[] samples = new float[sampleProvider.sampleSize()];
        while(true){
        	sampleProvider.fetchSample(samples, 0);
        	LCD.drawString(samples[0] + "", 0, 2);
        }
		
		
	}

}
