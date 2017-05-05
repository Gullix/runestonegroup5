package Robot;

import java.io.IOException;
import java.io.PrintWriter;

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
		PrintWriter writer;
		try{
			writer = new PrintWriter("the-file-name.txt", "UTF-8");
		
		 for(int i =0; i< colorlength; i++){
	    	 LCD.clear(4);
	    	 LCD.drawString("Calibrate "  + calibrate[i],0,4);
	    	 Delay.msDelay(3000);
	    	 colorRGBSensor.fetchSample(sample, 0);
	    	 float[] sampleLab =ColorConversion.RgbToLab(sample);
	    	 this.colorValues[i] = sampleLab;
	    	 LCD.drawString("Read done "  + calibrate[i],0,4);
	    	 
	         writer.println(calibrate[i] + ":"+ sampleLab);
	         writer.println("The second line");
		 }
		 writer.close();
		}
	 		catch (IOException e) {
	 		   // do something
	 		}
		 //writer är deklarerad i eb for loop, inte OK!
		 
		 
	}
	public String identifyColor(){
		int sampleSize = this.colorRGBSensor.sampleSize();            
		float[] sample = new float[sampleSize];
		colorRGBSensor.fetchSample(sample, 0);
		int mostSimIndex =0;
		float[] sampleLab =  ColorConversion.RgbToLab(sample);
	    mostSimIndex = ColorConversion.MostSimilar(this.colorValues,sampleLab);
	    float[] colorLabVal = this.colorValues[mostSimIndex];
		LCD.clear(1);
		String colorSeen = colorsText[mostSimIndex];
   	    LCD.drawString("I see "  + colorSeen,0,1);
   	    //for( int i =0; i <3; i++){
   	    //LCD.drawString("s:" + ( (int) ( colorLabVal[i] * 100) )+  "r"  + ( (int) ( sampleLab[i] * 100) ) ,0,2+i);
   	    //Delay.msDelay(1000);
   	   // }
   	    return colorSeen;
	}
    public boolean seeColor(String color){
		String foundColor ="";
		foundColor = identifyColor();
		if(color.equals(foundColor)){
			return true;
			
		}
		return false;
	}
}