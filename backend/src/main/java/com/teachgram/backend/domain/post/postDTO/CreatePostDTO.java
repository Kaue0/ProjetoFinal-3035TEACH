package com.teachgram.backend.domain.post.postDTO;

public record CreatePostDTO(
        String title,

        String description,

        String photo_link,

        String video_link
) {}