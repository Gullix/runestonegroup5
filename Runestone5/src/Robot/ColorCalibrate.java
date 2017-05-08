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
	private EV3ColorSensor colorSensor;
	private Port sensorPort;
	
	ColorCalibrate(String[] colorsToCal){
		this.colorsText = colorsToCal;
		this.colorValues = new float[colorsToCal.length][3];
		sensorPort = LocalEV3.get().getPort("S1");   
		colorSensor = new EV3ColorSensor(sensorPort);
		this.colorRGBSensor = colorSensor.getRGBMode();
    }
	
	ColorCalibrate(){
		sensorPort = LocalEV3.get().getPort("S1");
		colorRGBSensor = new EV3ColorSensor(sensorPort).getRGBMode();
		dataFromFile();
		
	}
	public void calibrateColors(){
		int calibrationNumber = 10;
		int sampleSize = this.colorRGBSensor.sampleSize();            
		float[] sample = new float[sampleSize];
		PrintWriter writer;
		try{
			writer = new PrintWriter("colorData.txt", "UTF-8");
			float labSample_x, labSample_y, labSample_z;
			for(int i =0; i< colorsText.length; i++){
				LCD.clear(4);
				LCD.drawString("Calibrate "  + colorsText[i],0,4);
				Delay.msDelay(3000);
				labSample_x = 0;
				labSample_y = 0;
				labSample_z = 0;
				for(int j = 0; j < calibrationNumber; j++){
					colorRGBSensor.fetchSample(sample, 0);
					float[] labSample = ColorConversion.RgbToLab(sample);
					labSample_x += labSample[0];
					labSample_y += labSample[1];
					labSample_z += labSample[2];
		    	}
				float[] averageLabCal = {labSample_x / (float) calibrationNumber,labSample_y/ (float) calibrationNumber,labSample_z/ (float) calibrationNumber };
				this.colorValues[i] = averageLabCal;
				LCD.drawString("Read done "  + colorsText[i], 0, 4);
				Delay.msDelay(1500);
				writer.println(colorsText[i] + "-" + averageLabCal[0] + "-" + averageLabCal[1] +"-" + averageLabCal[2]);
			}
		 writer.close();
		}
	 		catch (IOException e) {
	 		   System.err.println("I/O error");
	 		}
		 
		 
	}
	/*This function must be splitted in two: one that retrieves the color,
	 * the second one that returns it.*/
	public String identifyColor(){   
		LCD.clear(1);
		String colorSeen = colorsText[getColor()];
   	    LCD.drawString("I see " + colorSeen, 0, 1);
   	    return colorSeen;
	}
	
	public int getColor(){
		float[] sample = new float[colorRGBSensor.sampleSize()];
		colorRGBSensor.fetchSample(sample, 0);
		return ColorConversion.MostSimilar(colorValues, ColorConversion.RgbToLab(sample));
	}
	
	
	/*We will remember this forever :) */
    public boolean seeColor(String color){
    	return color.equals(identifyColor());
	}
    
    public void dataFromFile(){
    	String sep = "-";
    	Charset charset = Charset.forName("UTF_8");
    	File colorFile = new File("colorData.txt");
    	try{
    		List<String> dataList= Files.readAllLines(colorFile.toPath(),charset);
    		colorValues = new float[dataList.size()][3];
    		colorsText = new String[dataList.size()];
    		for(int i = 0; i < dataList.size(); i++){
    			String[] elementSplit = dataList.get(i).split(sep);
    			colorValues[i][0] = Float.parseFloat(elementSplit[1].trim());
    			colorValues[i][1] = Float.parseFloat(elementSplit[2].trim());
    			colorValues[i][2] = Float.parseFloat(elementSplit[3].trim());
    			colorsText[i] = elementSplit[0].trim();
    		}
    	} catch(Exception e){
    		System.err.println("Error");
    	}
    }
}
