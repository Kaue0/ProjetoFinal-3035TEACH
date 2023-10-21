import { Link } from 'react-router-dom';
import { UserProfile } from '../interfaces/User';
import { useEffect, useState } from 'react';
import { fetchProfile } from '../services/users.service';
import { PhotoTweeks } from './PhotoTweeks';
import defaultProfile from '../assets/defaultProfile.png';
import homeIcon from '../assets/homeIcon.svg';
import friendsIcon from '../assets/friendListIcon.svg';
import createIcon from '../assets/createPostIcon.svg';
import settingsIcon from '../assets/settingsIcon.svg';

interface MenuProps {
    postHolder: React.RefObject<HTMLDivElement>;
    handleFriendsClick: () => void;
    handleCreatePostClick: () => void;
}

export function Menu({ postHolder, handleFriendsClick, handleCreatePostClick }: MenuProps) {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const [profile, setProfile] = useState<UserProfile | null>(null);


    async function getPic() {
        const data = username && await fetchProfile(username, userId);
        setProfile(data);
    }

    useEffect(() => {
        getPic();
    }, [username]);

    const handleStartOfFeed = () => {
        if (postHolder.current) {
            postHolder.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="flex w-full min-h-[77px] items-center justify-center gap-12 border-t border-[#A09F9F] border-opacity-40 shadow-[0_-1px_4px_rgba(0,0,0,0.2)]">
            <button onClick={handleStartOfFeed}>
                <img src={homeIcon} alt="" className="w-[21px]" />
            </button>
            <button onClick={handleFriendsClick}>
                <img src={friendsIcon} alt="" className="w-[29.5px]" />
            </button>
            <button onClick={handleCreatePostClick}>
                <img src={createIcon} alt="" className="w-[31px]" />
            </button>
            <Link to="/settings">
                <img src={settingsIcon} alt="" className="w-[21px]" />
            </Link>
            <Link to={`/${username}`}>
                <PhotoTweeks image={profile ? profile.user.photo_link : ''} alt={profile?.user.name} backUp={defaultProfile} className="w-8 h-8 rounded-[32px] object-cover" />
            </Link>
        </div>
    );
}
