package com.teachgram.backend.domain.post.postDTO;

import com.teachgram.backend.domain.post.Post;

import java.time.LocalDateTime;

public record PostDetailsDTO(
        Long id,

        Boolean deleted,

        LocalDateTime createdAt,

        LocalDateTime updatedAt,

        String title,

        String description,

        String photo_link,

        String video_link,

        Boolean privated,

        Long userId,

        String name,

        String username,

        String userPhoto,

        int likes
) {
    public PostDetailsDTO(Post post) {
        this(post.getId(),
                post.getDeleted(),
                post.getCreatedAt(),
                post.getUpdatedAt(),
                post.getTitle(),
                post.getDescription(),
                post.getPhoto_link(),
                post.getVideo_link(),
                post.getPrivated(),
                post.getUser().getId(),
                post.getUser().getName(),
                post.getUser().getUsername(),
                post.getUser().getPhoto_link(),
                post.getLikes());
    }
}
