package Robot;

import lejos.hardware.Button;
import lejos.hardware.Key;
import lejos.hardware.KeyListener;
import lejos.hardware.lcd.LCD;

public class BtMac {
public int adressIndex;
public String[] adresses;
public String displayServer;

BtMac(String[] adresses){
	this.adresses =adresses;
	this.adressIndex =0;
	this.displayServer = adresses[0];
	}
	private void newOption(String option){
		
		switch(option){
		case("prev"):
		prevAdress();
		break;
		case("next"):
			nextAdress();
			break;
			
		default:
			break;
		
		}	

}
	private void prevAdress(){
		if (this.adressIndex <= 0){
			   this.adressIndex = this.adresses.length -1; 
			}
			else{
				this.adressIndex--;
			}
		this.displayServer = this.adresses[adressIndex];
		
	}
	private void nextAdress(){
		if (this.adressIndex >= this.adresses.length -1){
			   this.adressIndex = 0; 
			}
			else{
				this.adressIndex++;
			}
		this.displayServer = this.adresses[adressIndex];
	}
	private void displayCurrentServer(){
		LCD.clear(4);
		LCD.drawString(this.displayServer, 0, 4);
	}
	public int doOption(){
		Boolean flag = false;
		displayCurrentServer();
		Button.LEFT.addKeyListener(new KeyListener(){
		    @Override public void keyReleased(    final Key k){
		    }
		    @Override public void keyPressed(    final Key k){
		     prevAdress();
		     displayCurrentServer();
		    }
		  });
		Button.RIGHT.addKeyListener(new KeyListener(){
		    @Override public void keyReleased(    final Key k){
		    }
		    @Override public void keyPressed(    final Key k){
		    	nextAdress();
		     displayCurrentServer();
		    }
		  });
		while(true){
		if(Button.ENTER.isDown()){
			return this.adressIndex;
		}
		}
       
	}
	}
