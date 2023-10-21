package com.teachgram.backend.service;

import com.teachgram.backend.domain.post.Post;
import com.teachgram.backend.domain.user.User;
import com.teachgram.backend.domain.post.postDTO.CreatePostDTO;
import com.teachgram.backend.domain.post.postDTO.PostDetailsDTO;
import com.teachgram.backend.domain.post.postDTO.UpdatePostDTO;
import com.teachgram.backend.repository.PostRepository;
import com.teachgram.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository ownerRepository;

    public ResponseEntity<PostDetailsDTO> newPost(CreatePostDTO data, Authentication authentication) {
        var post = new Post(data, ownerRepository, ((User) authentication.getPrincipal()).getId());
        postRepository.save(post);
        return ResponseEntity.ok().body(new PostDetailsDTO(post));
    }


    public ResponseEntity<?> updatePost(UpdatePostDTO data, Long id, Authentication authentication) {
        Optional<Post> tmpPost = postRepository.findById(id);

        if (tmpPost.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found.");
        }

        Post post = tmpPost.get();

        if (post.getDeleted()) {
            return ResponseEntity.status(HttpStatus.GONE).body("Post got deleted.");
        }
        if (!((User) authentication.getPrincipal()).getId().equals(post.getUser().getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is not the owner of the post.");
        }

        post.updatePostData(data);
        return ResponseEntity.ok().body(new PostDetailsDTO(post));
    }

    public ResponseEntity<PostDetailsDTO> detailPost(Long id) {
        var postDT = postRepository.findById(id);
        Post post = postDT.get();
        return ResponseEntity.ok().body(new PostDetailsDTO(post));
    }

    public ResponseEntity<?> togglePostPrivated(Long id, Authentication authentication) {
        Optional<Post> tmpPost = postRepository.findById(id);

        if (tmpPost.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found.");
        }

        Post post = tmpPost.get();

        if (post.getDeleted()) {
            return ResponseEntity.status(HttpStatus.GONE).body("Post got deleted.");
        }
        if (!((User) authentication.getPrincipal()).getId().equals(post.getUser().getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is not the owner of the post.");
        }
        post.setPrivated(!post.getPrivated());

        return ResponseEntity.ok().body(new PostDetailsDTO(post));
    }

    public ResponseEntity<?> deletePost(Long id, Authentication authentication) {
        Optional<Post> tmpPost = postRepository.findById(id);
        if (tmpPost.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found.");
        }

        Post post = tmpPost.get();

        if (!((User) authentication.getPrincipal()).getId().equals(post.getUser().getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is not the owner of the post.");
        }

        post.delete();
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<?> getPostsByUserId(Long userId, Authentication authentication) {
        Optional<User> tmpUser = ownerRepository.findById(userId);

        if (tmpUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = tmpUser.get();

        if (user.getDeleted()) {
            return ResponseEntity.status(HttpStatus.GONE).body("User got deleted.");
        }

        List<Post> posts;

        if (((User) authentication.getPrincipal()).getId().equals(userId)) {
            posts = postRepository.findByUserIdAndDeletedFalseOrderByCreatedAtDesc(userId);
        } else {
            posts = postRepository.findByUserIdAndPrivatedFalseAndDeletedFalseOrderByCreatedAtDesc(userId);
        }

        List<PostDetailsDTO> data = posts.stream().map(PostDetailsDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok().body(data);
    }

    public ResponseEntity<List<PostDetailsDTO>> getPostsByFriends(Long userId) {
        User user = ownerRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found."));
        List<User> friends = ownerRepository.findFriendsById(userId);
        List<Post> posts = postRepository.findByUserInAndDeletedFalseOrderByCreatedAtDesc(friends);
        List<PostDetailsDTO> data = posts.stream().map(PostDetailsDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok().body(data);
    }

    public ResponseEntity<List<PostDetailsDTO>> getAllActivePosts() {
        List<Post> posts = postRepository.findByDeletedFalseAndUser_DeletedFalseOrderByCreatedAtDesc();
        List<PostDetailsDTO> data = posts.stream().map(PostDetailsDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok().body(data);
    }

    public ResponseEntity<?> likePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found."));
        post.setLikes(post.getLikes() + 1);
        postRepository.save(post);
        return ResponseEntity.ok().body(new PostDetailsDTO(post));
    }

}
