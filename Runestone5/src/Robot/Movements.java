package Robot;

import lejos.robotics.navigation.MovePilot;

public interface Movements {
	
	public void _move(String s1, String s2, MovePilot mp);
	public void _pickup(String s);
	public void _done(String s);
	public void _goto(String s);
}
