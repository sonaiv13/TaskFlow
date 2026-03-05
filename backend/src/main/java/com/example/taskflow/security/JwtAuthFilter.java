package com.example.taskflow.security;

import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    public JwtAuthFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, @Nonnull HttpServletResponse response, @Nonnull FilterChain filterChain) throws ServletException, IOException {

        // Lee el header
        String authHeader = request.getHeader("Authorization");

        // Comprueba si exista el token
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            //si no, deja pasar al token
            filterChain.doFilter(request, response);
            return;
        }

        // Extrae el token ('Bearer ' - )
        String token = authHeader.substring(7);

        // Valida el token
        if(jwtService.validateToken(token)) {
            String email = jwtService.extractEmail(token);

            // Indica a Spring el usuario
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    email,
                    null,
                    Collections.emptyList()
            );

            // Guarda en el contexto de seguridad
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        filterChain.doFilter(request, response);
    }
}
