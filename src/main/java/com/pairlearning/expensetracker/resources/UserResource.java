package com.pairlearning.expensetracker.resources;

import com.pairlearning.expensetracker.Constants;
import com.pairlearning.expensetracker.domain.User;
import com.pairlearning.expensetracker.services.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * REST Controller for handling user-related requests, such as login and registration.
 */
@RestController
@RequestMapping("/api/users")
public class UserResource {

    @Autowired
    UserService userService;

    /**
     * Authenticates a user and returns a JWT token if successful.
     *
     * @param userMap A map containing the user's email and password.
     * @return ResponseEntity containing the JWT token and an HTTP status code.
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody Map<String, Object> userMap) {
        String email = (String) userMap.get("email");
        String password = (String) userMap.get("password");
        User user = userService.validateUser(email, password);
        return new ResponseEntity<>(generateJWTToken(user), HttpStatus.OK);
    }

    /**
     * Registers a new user and returns a JWT token if successful.
     *
     * @param userMap A map containing the user's first name, last name, email, and password.
     * @return ResponseEntity containing the JWT token and an HTTP status code.
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody Map<String, Object> userMap) {
        String firstName = (String) userMap.get("firstName");
        String lastName = (String) userMap.get("lastName");
        String email = (String) userMap.get("email");
        String password = (String) userMap.get("password");
        User user = userService.registerUser(firstName, lastName, email, password);
        return new ResponseEntity<>(generateJWTToken(user), HttpStatus.OK);
    }

    /**
     * Generates a JWT token for the authenticated user.
     *
     * @param user The authenticated user.
     * @return A map containing the JWT token.
     */
    private Map<String, String> generateJWTToken(User user) {
        long timestamp = System.currentTimeMillis();
        String token = Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, Constants.API_SECRET_KEY)
                .setIssuedAt(new Date(timestamp))
                .setExpiration(new Date(timestamp + Constants.TOKEN_VALIDITY))
                .claim("userId", user.getUserId())
                .claim("email", user.getEmail())
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .compact();
        Map<String, String> map = new HashMap<>();
        map.put("token", token);
        return map;
    }
}
