package com.helenos.backend.listener;

import java.util.UUID;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;
import com.sendgrid.*;


import com.helenos.backend.service.RegistrationService;
import com.helenos.backend.event.OnRegistrationCompleteEvent;
import com.helenos.backend.model.User;
import java.util.Locale;

@Component
public class RegistrationListener implements ApplicationListener<OnRegistrationCompleteEvent> {
  
    @Autowired
    private RegistrationService registrationService;
  
    @Autowired
    private MessageSource messages;
  
    @Autowired
    private JavaMailSenderImpl mailSender;

    @Value("${helenos.sengrid-api-key}")
    private String SendGridApiKey;
 
    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        this.confirmRegistration(event);
    }
 
    private void confirmRegistration(OnRegistrationCompleteEvent event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        registrationService.createVerificationToken(user, token);
        
//        String recipientAddress = user.getEmail();
//        String subject = "Registration Confirmation";
//        String confirmationUrl
//          = event.getAppUrl() + "/regitrationConfirm.html?token=" + token;
//        String message = messages.getMessage("regSucc", null, event.getLocale());
        
        Email from = new Email("vetter.leo@gmail.com");
        String subject = "Helenos Registration Confirmation";
        Email to = new Email(user.getEmail());
        String confirmationUrl = event.getAppUrl() + "/account/registrationConfirm?token=" + token;
        Content content = new Content("text/plain", 
        							  messages.getMessage("regSucc", null, Locale.ENGLISH) 
        							  + "\n" + confirmationUrl);
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(SendGridApiKey);
        Request request = new Request();
        try {
          request.setMethod(Method.POST);
          request.setEndpoint("mail/send");
          request.setBody(mail.build());
          Response response = sg.api(request);
        } catch (IOException ex) {
        	System.out.print(ex.getStackTrace().toString());
        	System.out.print(ex.getMessage());
        }
      }
}