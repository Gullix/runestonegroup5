package Robot;

import lejos.hardware.ev3.LocalEV3;
import lejos.hardware.lcd.LCD;
import lejos.hardware.port.Port;
import lejos.hardware.sensor.EV3ColorSensor;
import lejos.hardware.sensor.SensorMode;
import lejos.utility.Delay;

public class ColorCalibrate {
	public float[][] colorValues;
	public String[] colorsText;
	public SensorMode colorRGBSensor;
	
	
	
	ColorCalibrate(String[] colorsToCal){
    this.colorsText = colorsToCal;
    this.colorValues = new float[colorsToCal.length][3];
    
	Port sensorPort = LocalEV3.get().getPort("S1");   
	EV3ColorSensor colorSensor = new EV3ColorSensor(sensorPort);
	this.colorRGBSensor = colorSensor.getRGBMode();
	calibrateColors();
    }
	public void calibrateColors(){
		String[] calibrate = this.colorsText;
		int colorlength = calibrate.length;
		int sampleSize = this.colorRGBSensor.sampleSize();            
		float[] sample = new float[sampleSize];
		 for(int i =0; i< colorlength; i++){
	    	 LCD.clear(4);
	    	 LCD.drawString("Calibrate "  + calibrate[i],0,4);
	    	 Delay.msDelay(3000);
	    	 colorRGBSensor.fetchSample(sample, 0);
	    	 // Robert this.colorValues[i] = ColorConversion.rgbToLab(sample);
	    	 LCD.drawString("Read done "  + calibrate[i],0,4);
	    }
	}
	public void identifyColor(){
		int sampleSize = this.colorRGBSensor.sampleSize();            
		float[] sample = new float[sampleSize];
		while(true){
		colorRGBSensor.fetchSample(sample, 0);
		int mostSimIndex =0;
		// Rovert float[] sampleLab =  ColorConversion.rgbToLab(sample);
		//Robert mostSimIndex = ColorConversion.MostSimilar(this.colorValues,sampleLab);
		LCD.clear(4);
   	    LCD.drawString("I see "  + colorsText[mostSimIndex],0,4);
   	    Delay.msDelay(1000);
		}
	}
}