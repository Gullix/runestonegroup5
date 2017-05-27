package main;

import java.io.File;

import lejos.hardware.Sound;
import lejos.utility.Delay;

public class SoundTest {

	public static void main(String[] args) {
		
		Sound.playSample(new File("victory.wav"));
		Delay.msDelay(10000);
		
	}
	
}
