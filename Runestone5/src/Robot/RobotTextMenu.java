package Robot;

import lejos.utility.TextMenu;

public class RobotTextMenu {
    public TextMenu robotMenu;
    public String[] options;
    public String title;
    RobotTextMenu(String[] options,String title){
    	this.robotMenu= new TextMenu(options,1,title);
    	this.options =options;
    	this.title =title;

    }
    public int selectOption(){
    	return this.robotMenu.select(); 
    }
    public void refreshMenu(String[] options,String title){
    	//this.robotMenu.setItems(options);
    	//this.robotMenu.setItems(options);
    	
    }
}
