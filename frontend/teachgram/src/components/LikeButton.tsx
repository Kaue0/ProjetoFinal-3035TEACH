import { useState, useEffect } from 'react';
import API from '../services/api';
import likeFilled from '../assets/likeFilled.png';
import likeUnfilled from '../assets/likeUnfilled.png';

interface LikeProps {
    counter: number;
    postId: number;
}

function LikeButton({ counter, postId }: LikeProps) {
    const [likesCount, setLikesCount] = useState(counter);
    const [liked, setLiked] = useState(false);
    const [showFilledHeart, setFilledHeart] = useState(false);

    const handleLikeClick = async () => {
        try {
            await API.post(`/posts/${postId}/like`);
            setLikesCount(likesCount + 1);
            setLiked(true);
        } catch (error) {
            console.error("Erro ao curtir o post:", error);
        }
    };

    useEffect(() => {
        if (liked) {
            setFilledHeart(true);
            const heartFill = setTimeout(() => setFilledHeart(false), 300);
            const likeVanishing = setTimeout(() => setLiked(false), 500);
            return () => {
                clearTimeout(heartFill);
                clearTimeout(likeVanishing);
            };
        }
    }, [liked]);

    return (
        <div className="flex text-[#8E8E8E] text-[10px] items-center lg:text-[20px]">
            <button 
                onClick={handleLikeClick} 
                className="mr-3 w-5 h-5 lg:mr-6 lg:w-7 lg:h-7"
            >
                <div className="relative w-5 h-5 lg:w-7 lg:h-7">
                    <img 
                        src={likeUnfilled} 
                        alt="" 
                        className={`absolute h-5 lg:h-7 ${showFilledHeart ? 'transition-opacity duration-500 ease-in-out opacity-0' : 'transition-opacity duration-500 ease-in-out opacity-100'}`}
                    />
                    <img 
                        src={likeFilled} 
                        alt="" 
                        className={`absolute h-5 lg:h-7 ${showFilledHeart ? 'transition-opacity duration-500 ease-in-out opacity-100' : 'transition-opacity duration-500 ease-in-out opacity-0'}`}
                    />
                </div>
            </button>
            {likesCount} curtidas
        </div>
    );
}

export default LikeButton;

