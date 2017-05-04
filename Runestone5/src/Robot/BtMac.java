package Robot;

import lejos.hardware.Button;
import lejos.hardware.Key;
import lejos.hardware.KeyListener;
import lejos.hardware.lcd.LCD;


//DISPLAYS the MAC addresses it can try to connect to
public class BtMac {
public int addressIndex;
public String[] addresses;
public String displayServer;

// An array of the address names (in text), 
BtMac(String[] addresses){
	this.addresses =addresses;
	this.addressIndex =0;
	this.displayServer = addresses[0];
	}


	private void newOption(String option){
		
		switch(option){
		case("prev"):
		prevAddress();
		break;
		case("next"):
			nextAddress();
			break;
			
		default:
			break;
		
		}	

}
	
	// the NEXT/PREV list addresses goes around like a loop
	// The previous address 
	private void prevAddress(){
		if (this.addressIndex <= 0){
			   this.addressIndex = this.addresses.length -1; 
			}
			else{
				this.addressIndex--;
			}
		this.displayServer = this.addresses[addressIndex];
		
	}
	// the next address
	private void nextAddress(){
		if (this.addressIndex >= this.addresses.length -1){
			   this.addressIndex = 0; 
			}
			else{
				this.addressIndex++;
			}
		this.displayServer = this.addresses[addressIndex];
	}
	private void displayCurrentServer(){
		LCD.clear(4);
		LCD.drawString(this.displayServer, 0, 4);
	}
	public int doOption(){
		displayCurrentServer();
		
		// press left button on brick
		Button.LEFT.addKeyListener(new KeyListener(){
		    @Override public void keyReleased(    final Key k){
		    }
		    @Override public void keyPressed(    final Key k){
		     prevAddress();
		     displayCurrentServer();
		    }
		  });
		// press right button on brick
		Button.RIGHT.addKeyListener(new KeyListener(){
		    @Override public void keyReleased(    final Key k){
		    }
		    @Override public void keyPressed(    final Key k){
		    	nextAddress();
		     displayCurrentServer();
		    }
		  });
		// press enter button on brick
		while(true){
		if(Button.ENTER.isDown()){
			return this.addressIndex;
		}
		}
       
	}
	}
