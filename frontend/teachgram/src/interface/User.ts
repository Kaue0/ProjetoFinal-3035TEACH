export interface User {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    username: string;
    description: string;
    email: string;
    phone: string;
    photo_link: string;
    password: string;
}

export interface UserProfile {
    user: {
        id: number;
        photo_link: string;
        name: string;
        description: string;
        postCount: number;
        friendCount: number;
        isFriend: boolean;
    }
    posts: { photo_link: string; id: number; description: string }[];
}