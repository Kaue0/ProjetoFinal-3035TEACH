package com.teachgram.backend.dto.authentication;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;



public record RegisterDTO(

        @NotBlank(message = "Credenciais não podem estar vazias")
        String name,

        @NotBlank(message = "Credenciais não podem estar vazias")
        @Email
        String email,
        @NotBlank(message = "Credenciais não podem estar vazias")
        String username,

        String description,

        String phone,

        @NotBlank(message = "Credenciais não podem estar vazias")
        String password,

        String photo_link

) {}
