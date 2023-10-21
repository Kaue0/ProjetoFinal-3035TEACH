import { UserProfile } from '../interfaces/User';
import { useEffect, useState } from 'react';
import { fetchProfile } from '../services/users.service';
import { PhotoTweeks } from './PhotoTweeks';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import arrowLeft from '../assets/arrowLeft.svg';
import homeTeachgramLogo from '../assets/homeTeachgramLogo.png';
import homeIcon from '../assets/homeIcon.svg';
import friendsIcon from '../assets/friendListIcon.svg';
import settingsIcon from '../assets/settingsIcon.svg';
import createIcon from '../assets/createPostIcon.svg';
import defaultProfile from '../assets/defaultProfile.png';

interface DesktopMenuProps {
    postHolder: React.RefObject<HTMLDivElement>;
    handleFriendsListClick: () => void;
    handleCreatePostClick: () => void;
}

export function DesktopMenu({ postHolder, handleFriendsListClick, handleCreatePostClick }: DesktopMenuProps) {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const navigate = useNavigate();
    const location = useLocation();


    async function getProfilePhoto() {
        const data = username && await fetchProfile(username, userId);
        setProfile(data);
    }

    useEffect(() => {
        getProfilePhoto();
    }, [username]);

    const handleScrollToTop = () => {
        if (postHolder.current) {
            postHolder.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex mt-14">
                <button onClick={() => navigate(-1)} className="ml-9 mr-6">
                    <img src={arrowLeft} alt="voltar" className="object-none" />
                </button>
                <img src={homeTeachgramLogo} alt="logo" className="w-[187px]" />
            </div>
            <div className="flex flex-col mt-20 ml-20 gap-9">
                {location.pathname === '/feed' ?
                    <button onClick={handleScrollToTop} className="w-[253px] h-[91px] border rounded-[15px] flex items-center text-xl text-[#8E8E8E]">
                        <div className="w-[85px] h-full flex items-center justify-center">
                            <img src={homeIcon} alt="" className="" />
                        </div>
                        Feed
                    </button>
                    :
                    <Link to="/feed">
                        <div className="w-[253px] h-[91px] border rounded-[15px] flex items-center text-xl text-[#8E8E8E]">
                            <div className="w-[85px] h-full flex items-center justify-center">
                                <img src={homeIcon} alt="" className="" />
                            </div>
                            Feed
                        </div>
                    </Link>
                }
                <button onClick={handleFriendsListClick
        }>
                    <div className="w-[253px] h-[91px] border rounded-[15px] flex items-center text-xl text-[#8E8E8E]">
                        <div className="w-[85px] h-full flex items-center justify-center">
                            <img src={friendsIcon} alt="" className="" />
                        </div>
                        Amigos
                    </div>
                </button>
                {location.pathname === `/${username}` ?
                    <button onClick={handleScrollToTop} className="w-[253px] h-[91px] border rounded-[15px] flex items-center text-xl text-[#8E8E8E]">
                        <div className="w-[85px] h-full flex items-center justify-center">
                            <PhotoTweeks image={profile ? profile.user.photo_link : ''} alt={profile?.user.name} backUp={defaultProfile} className="w-11 h-11 rounded-[32px] object-cover" />
                        </div>
                        Perfil
                    </button>
                    :
                    <Link to={`/${username}`}>
                        <div className="w-[253px] h-[91px] border rounded-[15px] flex items-center text-xl text-[#8E8E8E]">
                            <div className="w-[85px] h-full flex items-center justify-center">
                                <PhotoTweeks image={profile ? profile.user.photo_link : ''} alt={profile?.user.name} backUp={defaultProfile} className="w-11 h-11 rounded-[32px] object-cover" />
                            </div>
                            Perfil
                        </div>
                    </Link>
                }
                <Link to={"/settings"}>
                    <div className="w-[253px] h-[91px] border rounded-[15px] flex items-center text-xl text-[#8E8E8E]">
                        <div className="w-[85px] h-full flex items-center justify-center">
                            <img src={settingsIcon} alt="" className="" />
                        </div>
                        Configurações
                    </div>
                </Link>
                <button onClick={handleCreatePostClick}>
                    <div className="w-[253px] h-[91px] border rounded-[15px] flex items-center text-xl text-[#8E8E8E]">
                        <div className="w-[85px] h-full flex items-center justify-center">
                            <img src={createIcon} alt="" className="" />
                        </div>
                        Criar
                    </div>
                </button>
            </div>
        </div >
    )
}