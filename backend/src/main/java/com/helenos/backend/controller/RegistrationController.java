package com.helenos.backend.controller;

import java.io.IOException;
import java.util.Calendar;
import java.util.Locale;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import com.helenos.backend.dto.NewPasswordDto;
import com.helenos.backend.dto.SaveUserDto;
import com.helenos.backend.event.OnRegistrationCompleteEvent;
import com.helenos.backend.exception.EmailAlreadyExistException;
import com.helenos.backend.model.GenericResponse;
import com.helenos.backend.model.Settings;
import com.helenos.backend.model.User;
import com.helenos.backend.model.VerificationToken;
import com.helenos.backend.service.RegistrationService;
import com.helenos.backend.service.UserService;
import com.sendgrid.Content;
import com.sendgrid.Email;
import com.sendgrid.Mail;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;

@RestController
public class RegistrationController {
	
	private RegistrationService registrationService;
	private UserService userService;
	private ModelMapper modelMapper;
	@Autowired
	ApplicationEventPublisher eventPublisher;
	@Autowired
    private MessageSource messages;
	
	@Autowired
	public RegistrationController(RegistrationService registrationService, ModelMapper modelMapper) {
		
		this.registrationService = registrationService;
		this.modelMapper = modelMapper;
	}
	
	@PostMapping("/register")
	public SaveUserDto register(@RequestBody @Valid SaveUserDto saveUserDto, WebRequest request) {
		
		System.out.println(saveUserDto);
		User userToSave = this.modelMapper.map(saveUserDto, User.class);
		Settings settings = this.modelMapper.map(saveUserDto, Settings.class);
		System.out.println(settings);
		User registeredUser = null;
		try {
			registeredUser = this.registrationService.register(userToSave, settings);
		} catch (DataIntegrityViolationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			if(e.getRootCause().toString().contains("uk_pfki8mu6sefesty9h30d4n3yv")) {
				throw new EmailAlreadyExistException();
			}
		}
		try {
	        eventPublisher.publishEvent(new OnRegistrationCompleteEvent(registeredUser, request.getLocale(), request.getHeader("Origin")));
	    } catch (Exception me) { 
	        System.out.println(me.getMessage());
	    }
		
		if(registeredUser != null) {
			return this.modelMapper.map(registeredUser, SaveUserDto.class);
		} else {
			return null;
		}
	}
	
	@RequestMapping(value = "/registrationConfirm", method = RequestMethod.GET)
	public String confirmRegistration(WebRequest request, @RequestParam("token") String token) {
	    
	    VerificationToken verificationToken = registrationService.getVerificationToken(token);
	    if (verificationToken == null) {
	        return "The token provided is invalid.";
	    }
	    
	    User user = verificationToken.getUser();
	    Calendar cal = Calendar.getInstance();
	    if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
	        return "The token has expired. Please redo the registration process.";
	    }
	    
	    user.setActive(true);
	    registrationService.saveRegisteredUser(user);
	    return "Your account is now activated. You can login. Enjoy !!!";
	}
	
	@PostMapping("/resetPassword")
	public String resetPassword(HttpServletRequest request, @RequestBody @Valid NewPasswordDto newPasswordDto, @RequestParam("token") String token, @RequestParam("idUser") Long idUser) {
		String result = registrationService.validatePasswordResetToken(idUser, token);
	    if (result != null) {
	        return result;
	    }
	    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	    registrationService.changeUserPassword(user, newPasswordDto.getPassword());
	    return messages.getMessage("resetPasswordOk", null, request.getLocale());
	}
	
	@GetMapping("/forgottenPassword")
	public GenericResponse forgottenPassword(HttpServletRequest request, @RequestParam("email") String userEmail) {
	    
//		User user = restTemplate.getForObject("http://user-service/media/users/" + userEmail, User.class);
		User user = this.userService.findByEmail(userEmail);
		if(user == null) {
			return new GenericResponse(messages.getMessage("wrongEmail", null, request.getLocale()));
		}
	    String token = UUID.randomUUID().toString();
	    registrationService.createPasswordResetTokenForUser(user, token);
	    
	    Email from = new Email("vetter.leo@gmail.com");
        String subject = "Helenos Forgotten Password";
        Email to = new Email(user.getEmail());
        String confirmationUrl = "http://localhost:4200/account/resetPassword?token=" + token + "&idUser=" + user.getId();
        Content content = new Content("text/plain", 
        							  messages.getMessage("resetPassword", null, Locale.ENGLISH) 
        							  + "\n" + confirmationUrl);
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
        Request req = new Request();
        try {
        	req.setMethod(Method.POST);
        	req.setEndpoint("mail/send");
        	req.setBody(mail.build());
        	Response response = sg.api(req);
        } catch (IOException ex) {
        	System.out.print(ex.getStackTrace().toString());
        	System.out.print(ex.getMessage());
        }
      
	    return new GenericResponse(messages.getMessage("resetPasswordConfirm", null, request.getLocale()));
	}
	
	@ExceptionHandler({ EmailAlreadyExistException.class })
    public String handleException() {
        return "{\"error\": \"" + messages.getMessage("emailAlreadyExist", null, Locale.ENGLISH) + "\"}";
    }
}
