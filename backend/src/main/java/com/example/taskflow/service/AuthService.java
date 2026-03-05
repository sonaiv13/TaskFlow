package com.example.taskflow.service;

import com.example.taskflow.model.User;
import com.example.taskflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if(!user.getPassword().equals(password)) {
            throw  new RuntimeException("Contraseña incorrecta");
        }

        return user;
    }

}
