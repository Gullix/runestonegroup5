package Robot;

import lejos.robotics.navigation.MovePilot;

public interface Movements {
	public void _up(Move m);
	public void _down(Move m);
	public void _left(Move m);
	public void _right(Move m);
	public void _drop();
	public void _pickup(Move m);
}
