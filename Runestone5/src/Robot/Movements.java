package Robot;

import lejos.robotics.navigation.MovePilot;

public interface Movements {
	
	public void _move(Move m);
	public void _pickup(String s);
	public void _done(String s);
	public void _goto(String s);
}
