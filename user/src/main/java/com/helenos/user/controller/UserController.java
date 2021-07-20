package com.helenos.user.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.helenos.model.Library;
import com.helenos.model.User;
import com.helenos.user.deserializer.LibraryDeserializer;
import com.helenos.user.dto.AccountUserDto;
import com.helenos.user.dto.CreateCustomerDto;
import com.helenos.user.dto.SaveSharedUserDto;
import com.helenos.user.dto.SharedUserDto;
import com.helenos.user.dto.UpdatePasswordDto;
import com.helenos.user.dto.UserDto;
import com.helenos.user.repository.MediaUserRepository;
import com.helenos.user.service.UserService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Plan;
import com.stripe.model.PlanCollection;
import com.stripe.model.Subscription;

@RestController
@RequestMapping("media")
public class UserController {
	
	private UserService userService;
	private ModelMapper modelMapper;
	@Autowired
	private RestTemplate restTemplate;
	@Value("${helenos.stripeKey}")
    private String stripeKey;
	private MediaUserRepository mediaUserRepository;
	
	@Autowired
	public UserController(UserService userService, ModelMapper modelMapper, MediaUserRepository mediaUserRepository) {
		
		this.userService = userService;
		this.modelMapper = modelMapper;
		this.mediaUserRepository = mediaUserRepository;
	}
	
	@GetMapping("/{idUser}/all-plans")
	public String getAllPlans() {
		
		Stripe.apiKey = stripeKey;

		Map<String, Object> params = new HashMap<>();
		params.put("limit", 3);

		PlanCollection plans = null;
		try {
			plans = Plan.list(params);
		} catch (StripeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return plans.toJson();
	}
	
	@PostMapping("/{idUser}/create-customer")
	public String createCustomer(@RequestBody @Valid CreateCustomerDto createCustomerDto,
									  @PathVariable Long idUser) {
	
		System.out.println(createCustomerDto);
		System.out.println(stripeKey);
		Stripe.apiKey = stripeKey;
		
        // This creates a new Customer and attaches the PaymentMethod in one API call.
        Map<String, Object> customerParams = new HashMap<String, Object>();
        customerParams.put("payment_method", createCustomerDto.getPayment_method());
        customerParams.put("email", createCustomerDto.getEmail());
        Map<String, String> invoiceSettings = new HashMap<String, String>();
        invoiceSettings.put("default_payment_method", createCustomerDto.getPayment_method());
        customerParams.put("invoice_settings", invoiceSettings);

        Customer customer = null;
        try {
			customer = Customer.create(customerParams);
		} catch (StripeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
        Optional<User> optUser = this.mediaUserRepository.findById(idUser);
        if(optUser.isPresent()) {
        	User user = optUser.get();
        	user.setCustomerId(customer.getId());
        	this.mediaUserRepository.save(user);
        }
        
        Map<String, Object> item = new HashMap<>();
        item.put("plan", "plan_HD0UzB1OwSnZQK");
        Map<String, Object> items = new HashMap<>();
        items.put("0", item);

        Map<String, Object> expand = new HashMap<>();
        expand.put("0", "latest_invoice.payment_intent");
        Map<String, Object> params = new HashMap<>();
        params.put("customer", customer.getId());
        params.put("items", items);
        params.put("expand", expand);
        Subscription subscription = null;
        try {
        	subscription = Subscription.create(params);
		} catch (StripeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
		return subscription.toJson();
	}
	
	@GetMapping("/accountUsers/{idUser}")
	@PreAuthorize("hasRole('ROLE_USER') and #idUser == principal.user.id")
	public AccountUserDto getAccountUser(@PathVariable Long idUser) {
		
		User user = this.userService.findById(idUser);
		return this.modelMapper.map(user, AccountUserDto.class);
	}
	
	@GetMapping("/users/{emailUser}")
	@PreAuthorize("hasRole('ROLE_USER')")
	public UserDto getUserByEmail(@PathVariable String emailUser) {
		
		User user = this.userService.findByEmail(emailUser);
		if(user == null) {
			return null;
		}
		return this.modelMapper.map(user, UserDto.class);
	}
	
	@PostMapping("/users")
	public UserDto saveUser(@RequestBody @Valid UserDto userDto) {
		
		User user = this.modelMapper.map(userDto, User.class);
		User savedUser = this.userService.save(user);
		UserDto savedUserDto = this.modelMapper.map(savedUser, UserDto.class);
		return savedUserDto;
	}
	
	@PostMapping("/updatePassword")
	@PreAuthorize("hasRole('ROLE_USER') and #updatePasswordDto.id == principal.user.id")
	public String updatePassword(@RequestBody @Valid UpdatePasswordDto updatePasswordDto) {
		
		if(this.userService.checkPassword(updatePasswordDto.getId(), updatePasswordDto.getOldPassword())) {
			User user = this.userService.findById(updatePasswordDto.getId());
			this.modelMapper.typeMap(UpdatePasswordDto.class, User.class).addMappings(mapper -> {
			  mapper.map(src -> src.getNewPassword(),
					  User::setPassword);
			});
			this.modelMapper.map(updatePasswordDto, user);
			this.userService.savePassword(user);
			
			return "PasswordEdited";
		}
		
		return "WrongPassword";
	}
	
	@PostMapping("/accountUsers")
	@PreAuthorize("hasRole('ROLE_USER') and #accountUserDto.id == principal.user.id")
	public AccountUserDto saveAccountUser(@RequestBody @Valid AccountUserDto accountUserDto) {
		
		User user = this.userService.findById(accountUserDto.getId());
		this.modelMapper.map(accountUserDto, user);
		User savedUser = this.userService.saveAccountUser(user);
		return this.modelMapper.map(savedUser, AccountUserDto.class);
	}
	
	@GetMapping("/sharedUsers")
	@PreAuthorize("hasRole('ROLE_USER')")
	public List<SharedUserDto> getSharedUsers() {
		List<User> users = this.userService.getAll();
		List<SharedUserDto> usersDto = users.stream()
				.map(user -> this.modelMapper.map(user, SharedUserDto.class)).collect(Collectors.toList());
		return usersDto;
		
	}
	
	@GetMapping("/users/{idUser}/sharedUsers/{searchTerm}")
	@PreAuthorize("hasRole('ROLE_USER')")
	public List<SharedUserDto> findUsers(@PathVariable Long idUser, @PathVariable String searchTerm) {
		
		List<User> users = this.userService.findUsers(searchTerm, idUser);
		List<SharedUserDto> usersDto = users.stream()
				.map(user -> this.modelMapper.map(user, SharedUserDto.class)).collect(Collectors.toList());
		return usersDto;
		
	}
	
	@PostMapping("/sharedUsers")
	@PreAuthorize("hasRole('ROLE_USER') and isSharedUsersLibraryOwnedByPrincipal(#saveSharedUsersDto)")
	public List<SaveSharedUserDto> saveSharedUsers(@RequestBody @Valid List<SaveSharedUserDto> saveSharedUsersDto) {
		
		
		
		Long libraryId = null;
		if (saveSharedUsersDto.size() != 0) {
			libraryId = saveSharedUsersDto.get(0).getLibraryId();
		}
		
		restTemplate.getMessageConverters().add(0, mappingJacksonHttpMessageConverter());
		List<User> sharedUsers = saveSharedUsersDto.stream()
													.map(saveSharedUserDto -> {
														User user = this.modelMapper.map(saveSharedUserDto, User.class);
														Library library = restTemplate.getForObject("http://library-service/media/libraries/" + saveSharedUserDto.getLibraryId(), Library.class);
														user.addSharedLibrary(library);
														return user;
													}).collect(Collectors.toList());
		
		List<User> saveSharedUsers = this.userService.saveSharedUsers(sharedUsers);
		
		List<SaveSharedUserDto> savedSharedUsersDto = new ArrayList<SaveSharedUserDto>();
		for(User saveSharedUser: saveSharedUsers) {
			SaveSharedUserDto userDto = this.modelMapper.map(saveSharedUser, SaveSharedUserDto.class);
			userDto.setLibraryId(libraryId);
			savedSharedUsersDto.add(userDto);
		}
		return savedSharedUsersDto;
	}
	
	@Bean
	public MappingJackson2HttpMessageConverter mappingJacksonHttpMessageConverter() {
		MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
	    ObjectMapper mapper = new ObjectMapper();
		SimpleModule module = new SimpleModule();
		module.addDeserializer(Library.class, new LibraryDeserializer());
		mapper.registerModule(module);
	    converter.setObjectMapper(mapper);
	    return converter;
	}
}
