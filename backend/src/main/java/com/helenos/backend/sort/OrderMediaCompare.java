package com.helenos.backend.sort;

import java.util.Comparator;

import com.helenos.backend.model.Media;

public class OrderMediaCompare implements Comparator<Media> {

	@Override
	public int compare(Media media1, Media media2) {
		int result =  media1.getOrderMedia().compareTo(media2.getOrderMedia());
		
		if(result > 0) return 1;
		if(result < 0) return -1;
		return 0;	
	}
}
