package Robot;

import lejos.robotics.navigation.MovePilot;

public class Move {

	private String direction;
	private String cm;
	private MovePilot mp;
	
	public Move(String d, String c, MovePilot m){
		direction = d;
		cm = c;
		mp = m;
	}
	
	public String getDirection(){ return this.direction; }
	public String getCm(){ return this.cm;}
	public MovePilot getMp(){ return this.mp;}
	
}