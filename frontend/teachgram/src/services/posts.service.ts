import API from './api';

export async function fetchFeed() {
    try {
        const res = await API.get(`/posts/feed`);
        return res.data;
    } catch (error) {
        console.error('Error in fetching:', error);
        throw error;
    }
};


export async function updatePost(postId: number, data: { photo_link: string; description: string }) {
    try {
        const res = await API.put(`/posts/${postId}`, data);
        return res.data;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}

export async function deletePost(postId: number) {
    try {
        const res = await API.delete(`/posts/${postId}`);
        return res.data;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}

export async function createPost(data: { photo_link: string; description: string }) {
    try {
        const res = await API.post('/posts', data);
        return res.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}