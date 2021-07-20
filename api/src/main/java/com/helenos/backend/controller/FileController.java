package com.helenos.backend.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.activation.MimetypesFileTypeMap;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import com.helenos.backend.storage.FileSystemStorageService;
import com.helenos.backend.storage.StorageProperties;

@RestController
@RequestMapping("media")
public class FileController {

	private FileSystemStorageService storageService;
	@Autowired
	private StorageProperties storageProperties;

	@Autowired
	public FileController(FileSystemStorageService storageService) {
		this.storageService = storageService;
	}

	@GetMapping("users/{idUser}/medias/{filename:.+}")
	@ResponseBody
	@PreAuthorize("hasRole('ROLE_USER') and #idUser == principal.user.id")
	public ResponseEntity<Resource> serveFile(@PathVariable String filename, @PathVariable Long idUser,
			@RequestParam("libraryTitle") String libraryTitle, @RequestParam("ownedUserId") Long ownedUserId) throws IOException {

		MimetypesFileTypeMap mimeTypesMap = new MimetypesFileTypeMap();
		Resource file = storageService.loadAsResource(filename, idUser, libraryTitle, ownedUserId);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.header("Access-Control-Expose-Headers", HttpHeaders.CONTENT_DISPOSITION)
				.header(HttpHeaders.CONTENT_TYPE, mimeTypesMap.getContentType(file.getFile()))
				.body(file);
	}

	@GetMapping("users/{idUser}/editPath/{oldPath}/{newPath}/{ownedUserId}")
	@PreAuthorize("hasRole('ROLE_USER') and #idUser == principal.user.id")
	public void editPath(@PathVariable Long idUser, @PathVariable String oldPath, 
						 @PathVariable String newPath, @PathVariable Long ownedUserId) {
		storageService.renamePath(ownedUserId, oldPath, newPath);
	}
	
	@PostMapping("users/{idUser}/medias")
	@PreAuthorize("hasRole('ROLE_USER') and #idUser == principal.user.id")
	public void handleFilesUpload(@RequestParam("media") MultipartFile[] files, @PathVariable Long idUser, 
								  @RequestParam("libraryTitle") String libraryTitle) {

		for (MultipartFile multiPartfile : files) {
			
			if(multiPartfile.getContentType().contains("image")) {
				storageService.store(multiPartfile, idUser, libraryTitle);
			} else if(multiPartfile.getContentType().contains("video")) {
				File file = null;
				try {
					file = this.convert(multiPartfile);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				storageService.convertToMp4(idUser, file, libraryTitle);
				file.delete();
			} else if(multiPartfile.getContentType().contains("audio")) {
				storageService.store(multiPartfile, idUser, libraryTitle);
			}
		}
	}
	
	private File convert(MultipartFile file) throws IOException {
		
	  Path newFile = Paths.get(file.getOriginalFilename());
	  try(InputStream is = file.getInputStream();
	     OutputStream os = Files.newOutputStream(newFile)) {
	     byte[] buffer = new byte[4096];
	     int read = 0;
	     while((read = is.read(buffer)) > 0) {
	       os.write(buffer,0,read);
	     }
	  }
	  return newFile.toFile();
	}
	
	@GetMapping (value = "users/{idUser}/downloadLibrary", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<StreamingResponseBody> download(final HttpServletResponse response, @PathVariable Long idUser, 
    													  @RequestParam("libraryTitle") String libraryTitle) {

        response.setContentType("application/zip");
        response.setHeader(
                "Content-Disposition",
                "attachment;filename=" + libraryTitle + ".zip");

        StreamingResponseBody stream = out -> {

            final File directory = new File(storageProperties.getLocation().replace("custom", idUser.toString()).replace("medias", libraryTitle));
            final ZipOutputStream zipOut = new ZipOutputStream(response.getOutputStream());

            if(directory.exists() && directory.isDirectory()) {
                try {
                    for (final File file : directory.listFiles()) {
                        final InputStream inputStream=new FileInputStream(file);
                        final ZipEntry zipEntry=new ZipEntry(file.getName());
                        zipOut.putNextEntry(zipEntry);
                        byte[] bytes=new byte[1024];
                        int length;
                        while ((length=inputStream.read(bytes)) >= 0) {
                            zipOut.write(bytes, 0, length);
                        }
                        inputStream.close();
                    }
                    zipOut.close();
                } catch (final IOException e) {
                    System.out.println("Exception while reading and streaming data " + e.getStackTrace());
                }
            }
        };
        System.out.println("steaming response " + stream);
        return new ResponseEntity<StreamingResponseBody>(stream, HttpStatus.OK);
    }

}
