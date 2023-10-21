package com.teachgram.backend.domain.post.postDTO;

public record UpdatePostDTO(
        String title,
        String description,
        String photo_link,
        String video_link,
        Boolean privated
) {}

