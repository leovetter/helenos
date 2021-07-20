package com.helenos.backend.storage;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.helenos.backend.exception.StorageException;
import com.helenos.backend.exception.StorageFileNotFoundException;

import ws.schild.jave.AudioAttributes;
import ws.schild.jave.Encoder;
import ws.schild.jave.EncodingAttributes;
import ws.schild.jave.MultimediaObject;
import ws.schild.jave.VideoAttributes;
import ws.schild.jave.VideoAttributes.X264_PROFILE;
import ws.schild.jave.VideoSize;

@Service
public class FileSystemStorageService {
	
	@Autowired
	private StorageProperties storageProperties;

    public void store(MultipartFile file, Long idUser, String libraryTitle) {
    	
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file " + filename);
            }
            if (filename.contains("..")) {
                // This is a security check
                throw new StorageException(
                        "Cannot store file with relative path outside current directory "
                                + filename);
            }
            try (InputStream inputStream = file.getInputStream()) {
            	
            	Path rootLocation = Paths.get(storageProperties.getLocation().replace("custom", idUser.toString()).replace("medias", libraryTitle));
            	Path dir = Files.createDirectories(rootLocation);
                Files.copy(inputStream, rootLocation.resolve(filename),
                    StandardCopyOption.REPLACE_EXISTING);
            }
        }
        catch (IOException e) {
        	System.out.println("io excepetion");
        	System.out.println(e.getStackTrace());
            throw new StorageException("Failed to store file " + filename, e);
        }
    }

//    public Stream<Path> loadAll() {
//        try {
//            return Files.walk(this.rootLocation, 1)
//                .filter(path -> !path.equals(this.rootLocation))
//                .map(this.rootLocation::relativize);
//        }
//        catch (IOException e) {
//            throw new StorageException("Failed to read stored files", e);
//        }
//
//    }
//
    private Path load(String filename, Long idUser, String libraryTitle) {
    	Path rootLocation = Paths.get(storageProperties.getLocation().replace("custom", idUser.toString()).replace("medias", libraryTitle));
        return rootLocation.resolve(filename);
    }

    public Resource loadAsResource(String filename, Long idUser, String libraryTitle, Long ownedUserId) {
        try {
        	Path file = null;
        	if (ownedUserId != null) {
        		file = load(filename, ownedUserId, libraryTitle);
        	} else {
        		file = load(filename, idUser, libraryTitle);
        	}
            
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new StorageFileNotFoundException(
                        "Could not read file: " + filename);
            }
        }
        catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }
    
    public void convertToMp4(Long idUser, File file, String libraryTitle) {
    	
    	AudioAttributes audio = new AudioAttributes();
		audio.setCodec("aac");
		// here 64kbit/s is 64000
		audio.setBitRate(64000);
		audio.setChannels(2);
		audio.setSamplingRate(44100);
		
		VideoAttributes video = new VideoAttributes();
		video.setCodec("h264");
		video.setX264Profile(X264_PROFILE.BASELINE);
		// Here 160 kbps video is 160000
		video.setBitRate(160000);
		// More the frames more quality and size, but keep it low based on devices like mobile
		video.setFrameRate(15);
		video.setSize(new VideoSize(400, 300));
		
		EncodingAttributes attrs = new EncodingAttributes();
		attrs.setFormat("mp4");
		attrs.setAudioAttributes(audio);
		attrs.setVideoAttributes(video);
		
		File target = new File(storageProperties.getLocation().replace("custom", idUser.toString()).replace("medias", libraryTitle) + "/" + file.getName().split("\\.")[0] + ".mp4");
		
		try {
			  Encoder encoder = new Encoder();  
			  encoder.encode(new MultimediaObject(file), target, attrs);
			} catch (Exception e) {
			   /*Handle here the video failure*/   
			   e.printStackTrace();
			}
    }
    
    public void renamePath(Long idUser, String oldPath, String newPath) {
    	File dir = new File(storageProperties.getLocation().replace("custom", idUser.toString()).replace("medias", oldPath));
        File newName = new File(storageProperties.getLocation().replace("custom", idUser.toString()).replace("medias", newPath));
        dir.renameTo(newName);
    }

//    public void deleteAll() {
//        FileSystemUtils.deleteRecursively(rootLocation.toFile());
//    }
//
//    public void init() {
//        try {
//            Files.createDirectories(rootLocation);
//        }
//        catch (IOException e) {
//            throw new StorageException("Could not initialize storage", e);
//        }
//    }
}