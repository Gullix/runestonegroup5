package Robot;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
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
	private Port sensorPort;

	private static final int CALIBRATE_SAMPLES = 10;
	private static final int CALIBRATE_DELAY = 4000;
	private static String SEPARATOR = "#";
	
	public static final String[] FULL_COLORS = {
			/* Colors on the 4x5 calibration sheet */
			"WHITE",
			"BLACK", "BLUE", "BROWN", "CYAN",
			"GREEN","PURPLE", "ORANGE", "RED",
			"YELLOW", "DARK_PURPLE","DARK_RED", "DARK_GREEN",
			"LIGHT_GREEN", "GREY", "BEIGE", "NAVY_BLUE",
			"DARK_PEACH", "DARK_CYAN", "LIME", "PINK"
	};
	
	public static final String[] FEWER_COLORS = {
			"WHITE", "BLACK", "GRAY", "GREEN", "BLUE"
	};
	
	ColorCalibrate(){
		sensorPort = LocalEV3.get().getPort("S1");
		colorRGBSensor = new EV3ColorSensor(sensorPort).getRGBMode();
	}
	
	ColorCalibrate(String[] colors) {
		this();
		colorsText = colors;
		colorValues = new float[colorsText.length][3];
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
				Delay.msDelay(CALIBRATE_DELAY);
				LCD.clear(4);
				LCD.drawString("Calibrating... ",0,4);
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
				writer.println(colorsText[i] + SEPARATOR + averageLabCal[0] + SEPARATOR + averageLabCal[1] + SEPARATOR + averageLabCal[2]);
			}
		 writer.close();
		}
	 		catch (IOException e) {
	 		   System.err.println("I/O error");
	 		}
		 
		 
	}
	/*This function must be split in two: one that retrieves the color,
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
	
	public float[] getSample(){
		float[] sample = new float[colorRGBSensor.sampleSize()];
		colorRGBSensor.fetchSample(sample, 0);
		return sample;
	}
	
	/*We will remember this forever :) */
    public boolean seeColor(String color){
    	return color.equals(identifyColor());
	}
    
    public void dataFromFile() throws IOException {
    	Charset charset = StandardCharsets.UTF_8;
    	File colorFile = new File("colorData.txt");
		List<String> dataList = Files.readAllLines(colorFile.toPath(),charset);
		colorValues = new float[dataList.size()][3];
		colorsText = new String[dataList.size()];
		for(int i = 0; i < dataList.size(); i++){
			String[] elementSplit = dataList.get(i).split(SEPARATOR);
			colorsText[i] = elementSplit[0].trim();
			colorValues[i][0] = Float.parseFloat(elementSplit[1].trim());
			colorValues[i][1] = Float.parseFloat(elementSplit[2].trim());
			colorValues[i][2] = Float.parseFloat(elementSplit[3].trim());
		}
    }
}
