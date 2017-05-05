package Robot;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.util.List;

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
	ColorCalibrate(){
		Port sensorPort = LocalEV3.get().getPort("S1");   
		EV3ColorSensor colorSensor = new EV3ColorSensor(sensorPort);
		this.colorRGBSensor = colorSensor.getRGBMode();
		dataFromFile();
		
	}
	public void calibrateColors(){
		int calibrationNumber = 10;
		String[] calibrate = this.colorsText;
		int colorlength = calibrate.length;
		int sampleSize = this.colorRGBSensor.sampleSize();            
		float[] sample = new float[sampleSize];
		
		
		PrintWriter writer;
		try{
			writer = new PrintWriter("colorData.txt", "UTF-8");
		
		 for(int i =0; i< colorlength; i++){
	    	 LCD.clear(4);
	    	 LCD.drawString("Calibrate "  + calibrate[i],0,4);
	    	 Delay.msDelay(3000);
	    	 float labSample_x =0;
	     	 float labSample_y=0;
	     	 float labSample_z=0;
	    	 for(int j =0; j < calibrationNumber; j++){
	    		 colorRGBSensor.fetchSample(sample, 0);
		    	float[] labSample =ColorConversion.RgbToLab(sample);
		    	labSample_x += labSample[0];
		    	labSample_y += labSample[1];
		    	labSample_z += labSample[2];
		    	  }
	    	 float[] averageLabCal = {labSample_x/ (float) calibrationNumber,labSample_y/ (float) calibrationNumber,labSample_z/ (float) calibrationNumber };
	    	 this.colorValues[i] = averageLabCal;
	    	 LCD.drawString("Read done "  + calibrate[i],0,4);
	    	 Delay.msDelay(1500);
	         writer.println(calibrate[i] + "-" + averageLabCal[1] + "-" + averageLabCal[2] );
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
    public void dataFromFile(){
    	String sep = "-";
    	Charset charset = Charset.forName("UTF_8");
    	File colorFile = new File("colorData.txt");
    	try{
    	List<String> dataList= Files.readAllLines(colorFile.toPath(),charset);
    	int listSize =dataList.size();
    	this.colorValues = new float[listSize][3];
    	this.colorsText = new String[listSize];
    	for(String element : dataList){
    		String element = dataList.get(i);
    		String[] elementSplit = element.split(sep);
    		String name= elementSplit[0].trim();
    		String val_x= elementSplit[1].trim();
    		String val_y= elementSplit[2].trim();
    		String val_z= elementSplit[3].trim();
    	    this.colorValues[i][0]	= Float.parseFloat(val_x);
    	    this.colorValues[i][1]	= Float.parseFloat(val_y);
    	    this.colorValues[i][2]	= Float.parseFloat(val_z);
    	    this.colorsText[i] = name;
    	
    	}
    	}
    	
    	catch(Exception e){
    		
    	}
    }
}
