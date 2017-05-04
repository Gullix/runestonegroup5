package Robot;

public class ColorConversion {
	public float[] rbgToXYZ(float[] rgb)
	{
		float var_R = ( rgb[1] / 255 );
		float var_G = ( rgb[2] / 255 );
		float var_B = ( rgb[3] / 255 );
		//Red
		if ( var_R > 0.04045 ) 
			var_R = (float) Math.pow(((var_R+0.055)/1.055), 2.4);
		else                   
			var_R = (float) (var_R / 12.92);
		//Green
		if ( var_G > 0.04045 ) 
			var_R = (float) Math.pow(((var_G+0.055)/1.055), 2.4);
		else                   
			var_G = (float) (var_G / 12.92);
		//Blue
		if ( var_B > 0.04045 ) 
			var_B = (float) Math.pow(((var_B+0.055)/1.055), 2.4);
		else                   
			var_B = (float) (var_B / 12.92);
		
		float x = (float) (var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805);
		float y = (float) (var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722);
		float z = (float) (var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505);
		
		float[] xyz = {x,y,z};
		
		return xyz;
		
	}
	
	public float[] XyzToLab(float[] xyz)
	{
		float refX = (float) 90.872;
		float refY = (float) 100.000;
		float refZ = (float) 98.723;
		float var_X = xyz[1] / refX;
		float var_Y = xyz[1] / refX;
		float var_Z = xyz[1] / refX;
		
		float[] lab = {l,a,b};
		return lab;
	}
	
	public float[] RgbToLab(float[] rgb)
	{}
	
	public float Euclidean(float[] color1, float[] color2)
	{
		
	}
	//Loop through each float array in colors and compare eeuclidean with value. Return index of most similar.
	public int MostSimilar(float[][] colors, float[] value)
	{
		
		
	}
	
}
