import API from './api';

export async function fetchProfile(username: string, userId: string | null) {
    try {
        const res = await API.get(`/users/${username}?loggedInUserId=${userId}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
}

export async function getUserFriends(userId: number) {
    try {
        const res = await API.get(`/users/${userId}/friends`);
        return res.data;
    } catch (error) {
        console.error('Error fetching friends:', error);
        throw error;
    }
}