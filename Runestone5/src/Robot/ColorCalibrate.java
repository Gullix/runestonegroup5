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
	    	 this.colorValues[i] = ColorConversion.RgbToLab(sample);
	    	 LCD.drawString("Read done "  + calibrate[i],0,4);
	    }
	}
	public void identifyColor(){
		int sampleSize = this.colorRGBSensor.sampleSize();            
		float[] sample = new float[sampleSize];
		while(true){
		colorRGBSensor.fetchSample(sample, 0);
		int mostSimIndex =0;
		float[] sampleLab =  ColorConversion.RgbToLab(sample);
	    mostSimIndex = ColorConversion.MostSimilar(this.colorValues,sampleLab);
	    float[] colorLabVal = this.colorValues[mostSimIndex];
		LCD.clear();
   	    LCD.drawString("I see "  + colorsText[mostSimIndex],0,1);
   	    for( int i =0; i <3; i++)
   	    LCD.drawString("s:" + ( (int) ( colorLabVal[i] * 100) )+  "r"  + ( (int) ( sampleLab[i] * 100) ) ,0,2+i);
   	    Delay.msDelay(1000);
		}
	}
}