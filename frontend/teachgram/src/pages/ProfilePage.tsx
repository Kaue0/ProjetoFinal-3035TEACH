import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserProfile } from '../interfaces/User';
import { PhotoTweeks } from '../components/PhotoTweeks';
import { fetchProfile } from '../services/users.service';
import API from '../services/api';
import { Loading } from '../components/Loading';
import { DesktopMenu } from '../components/DesktopMenu';
import { FriendButton } from '../components/FriendButton';
import { FriendList } from '../components/FriendList';
import { NewPost } from '../components/NewPost';
import { EditPost } from '../components/EditPost';
import postWithoutPhoto from '../assets/postWithoutPhoto.png';
import defaultProfile from '../assets/defaultProfile.png';
import arrowLeft from '../assets/arrowLeft.png';
import cogwheel from '../assets/cogwheel.png';

export function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const userId = localStorage.getItem('userId');
    const [isUser, setIsUser] = useState(false);
    const [friend, setFriend] = useState(false);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loadedFeedPhotos, setLoadedFeedPhotos] = useState(0);
    const [modal, setModal] = useState(false);
    const [action, setAction] = useState<null | 'friendList' | 'createPost' | 'editPost'>(null);
    const postHolder = useRef(null);
    const navigate = useNavigate();
    const [editPostId, setEditPostId] = useState<number>(0);

    async function getProfile() {
        const data = username && await fetchProfile(username, userId);
        setProfile(data);
        setFriend(data.user.isFriend);
        if (data.user.id === Number(userId)) {
            setIsUser(true);
        }
    }

    useEffect(() => {
        setLoadedFeedPhotos(0);
        getProfile();
    }, [username]);

    async function handleAddFriend() {
        try {
            await API.post(`/users/${userId}/addFriend/${profile?.user.id}`);
            setFriend(true);
        } catch (error) {
            console.error("Erro:", error);
        }
    }

    async function handleRemoveFriend() {
        try {
            await API.post(`/users/${userId}/removeFriend/${profile?.user.id}`);
            setFriend(false);
        } catch (error) {
            console.error("Erro:", error);
        }
    }

    function toggleModal() {
        setModal(prev => !prev);
    }

    function openFriendList() {
        setAction('friendList');
        toggleModal();
    }

    function openCreatePost() {
        setAction('createPost');
        toggleModal();
    }

    function openEditPost(postId: number): MouseEventHandler<HTMLButtonElement> {
        return (_e) => {
            setAction('editPost');
            setEditPostId(postId);
            toggleModal();
        }
    }

    return (
        <>
            {(loadedFeedPhotos === (profile?.posts?.length || 0)) && <Loading />}
            <div className={loadedFeedPhotos === profile?.posts?.length ? "absolute -left-full -top-full" : "flex"}>
                <div className="hidden lg:flex ">
                    <DesktopMenu postHolder={postHolder} handleFriendsListClick={openFriendList} handleCreatePostClick={openCreatePost} />
                </div>
                <div className={`flex-grow flex flex-col lg:overflow-auto lg:h-screen ${modal && "hidden lg:flex"}`} ref={postHolder}>
                    <div className="flex flex-grow justify-between lg:hidden my-[30px] px-[33px]">
                        <button onClick={() => navigate(-1)}><img src={arrowLeft} alt="voltar" /></button>
                        <Link to={`/settings`} className="w-5"><img src={cogwheel} alt="configurações" className="m-auto" /></Link>
                    </div>
                    <div className="flex flex-col flex-grow self-center items-center w-full max-w-6xl lg:px-[89px]">
                        <div className="flex flex-col lg:flex-row items-center lg:mt-14 lg:self-start">
                            <PhotoTweeks
                                image={profile?.user.photo_link}
                                alt={profile?.user.name}
                                backUp={defaultProfile}
                                className="w-[176px] h-[176px] rounded-full mb-6 object-cover lg:mb-0 lg:mr-24"
                                onLoad={() => setLoadedFeedPhotos(prevCount => prevCount + 1)}
                            />
                            <div>
                                <h1 className="text-center text-[20px] font-semibold mb-4 lg:text-[25px] lg:text-left">{profile?.user.name}</h1>
                                <p className="text-[#666666] mb-4 text-[15px] px-4 text-center max-w-full line-clamp-3 lg:px-0 lg:text-left lg:text-[20px]">{profile?.user.description}</p>
                                <div className="hidden lg:block">
                                    <FriendButton
                                        isUser={isUser}
                                        isFriend={friend}
                                        onAddFriend={handleAddFriend}
                                        onRemoveFriend={handleRemoveFriend}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex h-[45px] mb-5 text-center items-center text-[15px] lg:mt-[56.6px] lg:text-[20px] -mr-9 lg:mr-0">
                            <div className="mr-6 lg:mr-8">
                                <div className="font-bold">{profile?.user.postCount}</div>
                                <div>Posts</div>
                            </div>
                            <div className="w-[1px] h-[33px] bg-[#DBDADA] mr-6 lg:mr-8" />
                            <div>
                                <div className="font-bold">{profile?.user.friendCount}</div>
                                <div>Amigos</div>
                            </div>
                            <div className="lg:hidden ml-9">
                                <FriendButton
                                    isUser={isUser}
                                    isFriend={friend}
                                    onAddFriend={handleAddFriend}
                                    onRemoveFriend={handleRemoveFriend}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 w-full px-2 gap-[1.5px]">
                            {profile?.posts.map((post) => {
                                const isPostOwner = profile.user.id === Number(userId);
                                return (
                                    <div key={post.id} className="relative pb-[100%] w-full">
                                        {isPostOwner ? (
                                            <button onClick={openEditPost(post.id)}>
                                                <PhotoTweeks
                                                    image={post.photo_link}
                                                    alt="Post"
                                                    backUp={postWithoutPhoto}
                                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                                    onLoad={() => setLoadedFeedPhotos(prevCount => prevCount + 1)}
                                                />
                                            </button>
                                        ) : (
                                            <PhotoTweeks
                                                image={post.photo_link}
                                                alt="Post"
                                                backUp={postWithoutPhoto}
                                                className="absolute top-0 left-0 w-full h-full object-cover"
                                                onLoad={() => setLoadedFeedPhotos(prevCount => prevCount + 1)}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {modal && action === 'friendList' &&
                    <div>
                        <div className="h-full hidden lg:flex items-center justify-center bg-[#30303059] fixed top-0 left-0 w-full">
                            <div className="bg-white w-[528px] h-[565px] rounded-[34px] flex flex-col items-center">
                                <FriendList toggleModal={toggleModal} />
                            </div>
                        </div>
                        <div className="items-center justify-center bg-white overflow-y-auto z-50 fixed top-0 left-0 w-full h-full flex lg:hidden">
                            <FriendList toggleModal={toggleModal} />
                        </div>
                    </div>
                }
                {modal && action === 'editPost' &&
                    <div>
                        <div className="hidden lg:flex items-center justify-center bg-[#30303059] fixed top-0 left-0 w-full h-full ">
                            <div className="bg-white w-[528px] h-[648px] rounded-[34px] flex flex-col items-center">
                                <EditPost postId={editPostId} toggleModal={toggleModal} />
                            </div>
                        </div>
                        <div className="fixed top-0 left-0 w-full h-full flex lg:hidden items-center justify-center bg-white overflow-y-auto z-50">
                            <EditPost postId={editPostId} toggleModal={toggleModal} />
                        </div>
                    </div>
                }
                {modal && action === 'createPost' &&
                    <div>
                        <div className="fixed top-0 left-0 w-full h-full hidden lg:flex items-center justify-center bg-[#30303059]">
                            <div className="bg-white w-[528px] rounded-[34px] flex flex-col items-center">
                                <NewPost toggleModal={toggleModal} />
                            </div>
                        </div>
                        <div className="fixed top-0 left-0 w-full h-full flex lg:hidden items-center justify-center bg-white overflow-y-auto z-50">
                            <NewPost toggleModal={toggleModal} />
                        </div>
                    </div>
                }
            </div>
        </>
    );
}
