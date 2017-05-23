package Robot;

public class Orientation {
	int orientation = 0;
	
	public Orientation(int start){
		this.orientation = start;
	}
	
	public void set(int newVal){
		int temp = newVal;
		temp = temp % 360;
		if (temp <0) {temp = 360 - this.orientation;}
		this.orientation = temp;
	}
	
	public void increment(int increment){
		/*this.orientation = (this.orientation + increment) % 360;
		if (this.orientation < 0)
			this.orientation = 360 - this.orientation;*/
		this.orientation += increment;
		while(this.orientation<0)this.orientation+=360;
		this.orientation = this.orientation % 360;
	}
	
	public int getOrientation(){
		return this.orientation;
	}
}
