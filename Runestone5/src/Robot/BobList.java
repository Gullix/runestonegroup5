package Robot;

import java.util.ArrayList;
import java.util.Stack;

public class BobList extends ArrayList<String>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/*
	 * Singleton Pattern
	 * this class stores all the commands given to the robots */
	private static BobList commandPile;
	
	public static BobList getInstance(){
		if(commandPile==null) commandPile = new BobList();
		return commandPile;
	}
	
	public static void _add(String s){
			commandPile.add(s);
	}

	public static String _getLast(){
		return commandPile.get(commandPile.size()-1);
	}
	
	public static int _size(){
		return commandPile.size();
	}
	public static void _flush(){
		commandPile.clear();
	}
	
	public static String _get(int i){
		return commandPile.get(i);
	}
	
	public static String _toString(){
		StringBuilder sb = new StringBuilder("");
		for(int k = 0; k < commandPile.size(); k++){
			sb.append("\n" + commandPile.get(k));
		}
		return sb.toString();
	}
}