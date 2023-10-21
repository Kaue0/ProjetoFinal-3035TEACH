package com.teachgram.backend.repository;

import com.teachgram.backend.domain.post.Post;
import com.teachgram.backend.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserIdAndDeletedFalseOrderByCreatedAtDesc(Long userId);

    List<Post> findByUserIdAndPrivatedFalseAndDeletedFalseOrderByCreatedAtDesc(Long userId);

    List<Post> findByUserInAndDeletedFalseOrderByCreatedAtDesc(List<User> users);

    List<Post> findByDeletedFalseAndUser_DeletedFalseOrderByCreatedAtDesc();

}
