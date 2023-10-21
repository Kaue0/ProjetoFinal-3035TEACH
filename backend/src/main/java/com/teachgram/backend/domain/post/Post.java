package com.teachgram.backend.domain.post;

import com.teachgram.backend.domain.user.User;
import com.teachgram.backend.domain.post.postDTO.CreatePostDTO;
import com.teachgram.backend.domain.post.postDTO.UpdatePostDTO;
import com.teachgram.backend.repository.UserRepository;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "Post")
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String title;
    private String description;
    private String photo_link;
    private String video_link;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private int likes = 0;
    private Boolean privated = false;
    private Boolean deleted = false;

    public Post(CreatePostDTO data, UserRepository repository, Long userId) {
        this.title = data.title();
        this.description = data.description();
        this.photo_link = data.photo_link();
        this.video_link = data.video_link();
        this.user = repository.getReferenceById(userId);
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public void updatePostData(UpdatePostDTO data) {

        if (data.title() != null) {
            this.title = data.title();
        }

        if (data.description() != null) {
            this.description = data.description();
        }

        if (data.photo_link() != null) {
            this.photo_link = data.photo_link();
        }

        if (data.video_link() != null) {
            this.video_link = data.video_link();
        }

        if (data.privated() != null) {
            this.privated = data.privated();
        }

        this.updatedAt = LocalDateTime.now();

    }

    public void delete() {this.deleted = true;}

}

