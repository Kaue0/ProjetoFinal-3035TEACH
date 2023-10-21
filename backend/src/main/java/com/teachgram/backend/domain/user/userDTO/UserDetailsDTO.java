package com.teachgram.backend.domain.user.userDTO;

import com.teachgram.backend.domain.user.User;

public record UserDetailsDTO(
        Long id,

        String name,

        String email,

        String username,

        String phone,

        String photo_link,

        String description
) {
    public UserDetailsDTO(User user) {
        this(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getUsername(),
                user.getPhone(),
                user.getPhoto_link(),
                user.getDescription());
    }
}
