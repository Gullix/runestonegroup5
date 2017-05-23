package Robot;

import java.util.Arrays;

import lejos.hardware.lcd.LCD;
import lejos.utility.Delay;

public class ColorConversion {
	public static float[] rbgToXYZ(float[] rgb){
		float var_R = rgb[0];
		float var_G = rgb[1];
		float var_B = rgb[2];
		//Red
		if ( var_R > 0.04045 ){
			var_R = (float) Math.pow(((var_R+0.055)/1.055), 2.4);
		} else {                   
			var_R = (float) (var_R / 12.92);
		}
		
		//Green
		if(var_G > 0.04045 ){
			var_R = (float) Math.pow(((var_G+0.055)/1.055), 2.4);
		} else {                   
			var_G = (float) (var_G / 12.92);
		}
		
		//Blue
		if ( var_B > 0.04045 ){
			var_B = (float) Math.pow(((var_B+0.055)/1.055), 2.4);
		} else {                   
			var_B = (float) (var_B / 12.92);
		}
		float x = (float) (var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805);
		float y = (float) (var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722);
		float z = (float) (var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505);
		return new float[]{x,y,z};
		
	}
	
	/*Removed names since they were not used anymore*/
	public static float[] XyzToLab(float[] xyz){
		float var_X = (float)(xyz[0] / 90.872);//referencing numbers
		float var_Y = (float)(xyz[1] / 100.000);
		float var_Z = (float)(xyz[2] / 98.723);
		if(var_X > 0.008856 ){
			var_X = (float) Math.pow(var_X,  ( 1/3 ));
		} else {
			var_X = (float) (( 7.787 * var_X ) + ( 16 / 116 ));
		}
		
		if(var_Y > 0.008856 ) {
			var_Y = (float) Math.pow(var_Y,  ( 1/3 ));
		} else {                    
			var_Y = (float) (( 7.787 * var_Y ) + ( 16 / 116 ));
		}
		
		if ( var_Z > 0.008856 ) {
			var_Z = (float) Math.pow(var_Z,  ( 1/3 ));
		} else {                   
			var_Z = (float) (( 7.787 * var_Z ) + ( 16 / 116 ));
		}
		
		float l = (116 * var_Y) - 16;
		float a = 500 * ( var_X - var_Y);
		float b = 200 * ( var_Y - var_Z);
		return new float[]{l,a,b};
	}
	
	public static float[] RgbToLab(float[] rgb){
		return XyzToLab(rbgToXYZ(rgb));
	}
	
	public static float Euclidean(float[] color1, float[] color2){
		float[] lab1 = RgbToLab(color1);
		float[] lab2 = RgbToLab(color2);
		return (float) Math.sqrt(Math.pow(lab1[0] - lab2[0],2)+Math.pow(lab1[1] - lab2[1],2)+Math.pow(lab1[2]- lab2[2],2));
	}
	//Loop through each float array in colors and compare euclidean with value. Return index of most similar.
	public static int MostSimilar(float[][] colors, float[] value){
		int minInd = 0;
		float minVal = Euclidean(colors[0],value);
		float auxE = 0;
		for (int i = 0; i < colors.length; i++) {
				auxE = Euclidean(colors[i],value);
		      	if(auxE <= minVal){
		      		minInd = i;
		      		minVal = auxE;
		      	}   
		}
		return minInd;
	}
	
}
