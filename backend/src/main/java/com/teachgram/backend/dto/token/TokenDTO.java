package com.teachgram.backend.dto.token;

public record TokenDTO(

        String token,

        String email,

        Long userId,

        String username
) {}
