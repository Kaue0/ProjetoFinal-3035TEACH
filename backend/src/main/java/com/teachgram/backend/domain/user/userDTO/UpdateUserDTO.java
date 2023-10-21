package com.teachgram.backend.domain.user.userDTO;

import com.teachgram.backend.domain.user.User;
import jakarta.validation.constraints.Email;

public record UpdateUserDTO(

        String name,

        String username,

        String phone,

        @Email
        String email,

        String password,

        String photo_link,

        String description

) {
    public UpdateUserDTO(User user) {
        this(
                user.getName(),
                user.getUsername(),
                user.getPhone(),
                user.getEmail(),
                user.getPassword(),
                user.getPhoto_link(),
                user.getDescription());
    }
}
