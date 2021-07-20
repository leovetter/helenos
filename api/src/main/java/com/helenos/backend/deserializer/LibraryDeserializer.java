//package com.helenos.backend.deserializer;
//
//import java.io.IOException;
//import java.text.ParseException;
//import java.text.SimpleDateFormat;
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//import java.util.Locale;
//
//import com.fasterxml.jackson.core.JsonParser;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.DeserializationContext;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
//import com.fasterxml.jackson.databind.node.ArrayNode;
//import com.fasterxml.jackson.databind.node.IntNode;
//import com.helenos.backend.model.Image;
//import com.helenos.backend.model.Library;
//import com.helenos.backend.model.Media;
//import com.helenos.backend.model.Sound;
//import com.helenos.backend.model.Video;
//
//public class LibraryDeserializer extends StdDeserializer<Library> { 
//	 
//    /**
//	 * 
//	 */
//	private static final long serialVersionUID = 1L;
//
//	public LibraryDeserializer() { 
//        this(null); 
//    } 
// 
//    public LibraryDeserializer(Class<?> vc) { 
//        super(vc); 
//    }
// 
//    @Override
//    public Library deserialize(JsonParser jp, DeserializationContext ctxt) 
//      throws IOException, JsonProcessingException {
//        JsonNode node = jp.getCodec().readTree(jp);
//        Long id = Long.valueOf(((IntNode) node.get("id")).numberValue().toString());
//        String title = node.get("title").asText();
//        ArrayNode nodesMedia = node.withArray("medias");
//        System.out.println(nodesMedia);
//        List<Media> medias = new ArrayList<Media>();
//        for(JsonNode nodeMedia: nodesMedia) {
//        	System.out.println(nodeMedia);
//        	Long idMedia = Long.valueOf(((IntNode) nodeMedia.get("id")).numberValue().toString());
//            String path = nodeMedia.get("path").asText();
//            String name = nodeMedia.get("name").asText();
//            Integer size = (Integer) ( (IntNode) nodeMedia.get("size")).numberValue();
//            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.FRANCE);
//            Date creationDate = null;
//            try {
//    			creationDate = sdf.parse(nodeMedia.get("creationDate").asText());
//    		} catch (ParseException e) {
//    			// TODO Auto-generated catch block
//    			e.printStackTrace();
//    		}
//            Date updateDate  = null;
//            try {
//    			updateDate  = sdf.parse(nodeMedia.get("updateDate").asText());
//    		} catch (ParseException e) {
//    			// TODO Auto-generated catch block
//    			e.printStackTrace();
//    		}
//            String type = nodeMedia.get("type").asText();
//            
//            if (type == "Image") {
//            	Image image = new Image();
//            	image.setId(idMedia);
//            	image.setName(name);
//            	image.setPath(path);
//            	image.setSize(size);
//            	image.setCreationDate(creationDate);
//            	image.setUpdateDate(updateDate);
//            	medias.add(image);
//            	
//            } else if(type == "Video") {
//            	Video video = new Video();
//            	video.setId(idMedia);
//            	video.setName(name);
//            	video.setPath(path);
//            	video.setSize(size);
//            	video.setCreationDate(creationDate);
//            	video.setUpdateDate(updateDate);
//            	medias.add(video);
//            } else if(type == "Sound") {
//            	Sound sound = new Sound();
//            	sound.setId(idMedia);
//            	sound.setName(name);
//            	sound.setPath(path);
//            	sound.setSize(size);
//            	sound.setCreationDate(creationDate);
//            	sound.setUpdateDate(updateDate);
//            	medias.add(sound);
//            }
//        }
//        
// 
//        Library library = new Library();
//        library.setId(id);
//        library.setTitle(title);
//        library.setMedias(medias);
//        return library;
//    }
//}