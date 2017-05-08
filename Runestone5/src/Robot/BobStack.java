package Robot;

import java.util.Stack;

public class BobStack extends Stack<Move>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/*
	 * Singleton Pattern
	 * this class stores all the commands given to the robots */
	private static BobStack commandPile;
	
	public static BobStack getInstance(){
		if(commandPile==null) commandPile = new BobStack();
		return commandPile;
	}
	
	public static void _push(Move m){
		commandPile.push(m);
	}
	
	public static Move _pop(){
		return commandPile.pop();
	}
	
	public static void _flush(){
		commandPile.clear();
	}
}