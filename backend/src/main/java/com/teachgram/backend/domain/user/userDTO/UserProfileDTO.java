package com.teachgram.backend.domain.user.userDTO;

import com.teachgram.backend.domain.user.User;

public record UserProfileDTO(
        Long id,

        String name,

        String username,

        String phone,

        String photo_link,

        String description,

        int postCount,

        int friendCount,

        boolean friends
) {
    public UserProfileDTO(User user, int postCount, int friendCount, boolean friends) {
        this(
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getPhone(),
                user.getPhoto_link(),
                user.getDescription(),
                postCount,
                friendCount,
                friends);
    }
}
