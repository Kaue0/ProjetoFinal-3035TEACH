package com.teachgram.backend.controller.post;

import com.teachgram.backend.domain.post.postDTO.CreatePostDTO;
import com.teachgram.backend.domain.post.postDTO.PostDetailsDTO;
import com.teachgram.backend.domain.post.postDTO.UpdatePostDTO;
import com.teachgram.backend.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {


    @Autowired
    private PostService postService;

    @PostMapping
    @Transactional
    public ResponseEntity<PostDetailsDTO> createNewPost(@Valid @RequestBody CreatePostDTO data, Authentication authentication) {
        var postData = postService.newPost(data, authentication);

        return postData;
    }


    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> updatePost(@RequestBody @Valid UpdatePostDTO data, @PathVariable Long id, Authentication authentication) {
        return postService.updatePost(data, id, authentication);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDetailsDTO> detailsFromPost(@PathVariable Long id) {

        return postService.detailPost(id);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getPostsByUserId(@PathVariable Long userId, Authentication authentication) {
        return postService.getPostsByUserId(userId, authentication);
    }

    @GetMapping("/feed/{userId}")
    public ResponseEntity<List<PostDetailsDTO>> getPostsByFriends(@PathVariable Long userId) {
        return postService.getPostsByFriends(userId);
    }

    @GetMapping("/feed")
    public ResponseEntity<List<PostDetailsDTO>> getAllActivePosts() {

        return postService.getAllActivePosts();
    }

    @PostMapping("/{id}/like")
    @Transactional
    public ResponseEntity<?> likePost(@PathVariable Long id) {
        return postService.likePost(id);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deletePost(@PathVariable Long id, Authentication authentication) {
        return ResponseEntity.ok().body(postService.deletePost(id, authentication));
    }

    @PutMapping("/{id}/privated")
    @Transactional
    public ResponseEntity<?> togglePrivated(@PathVariable Long id, Authentication authentication) {
        return postService.togglePostPrivated(id, authentication);
    }
}
