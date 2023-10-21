import { useEffect, useRef, useState } from 'react';
import { PostViewer } from '../components/PostViewer';
import { fetchFeed } from '../services/posts.service';
import { Menu } from '../components/Menu';
import { Post } from '../interfaces/Post';
import { Loading } from '../components/Loading';
import { DesktopMenu } from '../components/DesktopMenu';
import { FriendList } from '../components/FriendList';
import { NewPost } from '../components/NewPost';
import { EditPost } from '../components/EditPost';
import { DeletePost } from '../components/PostDelete';
import feedLogo from '../assets/feedLogo.png';

export function HomePage() {
    const postsHolder = useRef(null);
    const userId = localStorage.getItem('userId');
    const [posts, setPosts] = useState<Post[]>([]);
    const [uploadedFeed, setUploadedFeed] = useState(0);
    const [modal, setModal] = useState(false);
    const [postSelected, setPostSelected] = useState(0);
    const [action, setAction] = useState<null | 'friendList' | 'createPost' | 'editPost' | 'deletePost'>(null);

    async function loadFeed() {
        const feed = userId && await fetchFeed();
        setPosts(feed);
    }

    useEffect(() => {
        setUploadedFeed(0);
        loadFeed();
    }, []);
    
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

    function editPost(postId: number) {
        setAction('editPost');
        setPostSelected(postId);
        toggleModal();
    }

    function deletePost(postId: number) {
        setAction('deletePost');
        setPostSelected(postId);
        toggleModal();
    }

    return (
        <div>
            {(uploadedFeed != posts.length) && <Loading />}
            <div className={(uploadedFeed === posts.length) ? "flex" : "hidden"}>
                <div className="hidden lg:flex min-w-[380px]">
                    <DesktopMenu postHolder={postsHolder} handleFriendsListClick={openFriendList} handleCreatePostClick={openCreatePost} />
                </div>
                <div className="flex flex-col flex-grow h-screen">
                    <div className="flex h-full justify-center lg:justify-between overflow-auto" ref={postsHolder}>
                        <div className="flex flex-col h-full items-center lg:w-[calc(100vw-760px)]">
                            <div className="flex flex-col h-full w-[315px] lg:w-auto">
                            <div className="flex flex-wrap gap-5 pb-8">
                                <div className="flex self-start items-center min-h-[116px] mb-[-16px] lg:min-h-[170px]">
                                    <img src={feedLogo} alt="teachgram-logo" className="w-[187px] lg:hidden mx-auto" />
                                </div>
                                    {posts.map((post, index) => (
                                        <PostViewer 
                                        key={index} {...post} 
                                        onEditClick={editPost} 
                                        onDeleteClick={deletePost} 
                                        onLoad={() => setUploadedFeed(prevCount => prevCount + 1)} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block bg-feedDetail fixed right-0 min-w-[300px] bg-repeat-y h-full overflow-y-auto"></div>
                    </div>
                    <div className="lg:hidden">
                        <Menu postHolder={postsHolder} handleFriendsClick={openFriendList} handleCreatePostClick={openCreatePost} />
                    </div>
                </div>
            </div>
            {modal && action === 'friendList' &&
                <div>
                    <div className="h-full hidden lg:flex items-center justify-center bg-[#30303059] fixed top-0 left-0 w-full">
                        <div className="flex flex-col items-center bg-white w-[528px] h-[565px] rounded-[34px]">
                            <FriendList toggleModal={toggleModal} />
                        </div>
                    </div>
                    <div className="items-center justify-center bg-white overflow-y-auto z-50 fixed top-0 left-0 w-full h-full flex lg:hidden ">
                        <FriendList toggleModal={toggleModal} />
                    </div>
                </div>
            }
            {modal && action === 'editPost' &&
                <div>
                    <div className="hidden lg:flex items-center justify-center bg-[#30303059] fixed top-0 left-0 w-full h-full ">
                        <div className="bg-white w-[528px] h-[648px] rounded-[34px] flex flex-col items-center">
                            <EditPost postId={postSelected} toggleModal={toggleModal} />
                        </div>
                    </div>
                    <div className="fixed top-0 left-0 w-full h-full flex lg:hidden items-center justify-center bg-white overflow-y-auto z-50">
                        <EditPost postId={postSelected} toggleModal={toggleModal} />
                    </div>
                </div>
            }
            {modal && action === 'deletePost' &&
                <div>
                    <div className="justify-center bg-[#30303059] fixed top-0 left-0 w-full h-full flex items-center ">
                        <div className="bg-white w-[289px] h-[186px] rounded-[34px] flex flex-col items-center lg:w-[460px] lg:h-[210px]">
                            <DeletePost postId={postSelected} toggleModal={toggleModal} />
                        </div>
                    </div>
                </div>
            }
            {modal && action === 'createPost' &&
                <div>
                    <div className="hidden lg:flex items-center justify-center bg-[#30303059] fixed top-0 left-0 w-full h-full">
                        <div className="bg-white w-[528px] rounded-[34px] flex flex-col items-center">
                            <NewPost toggleModal={toggleModal} />
                        </div>
                    </div>
                    <div className="items-center justify-center bg-white overflow-y-auto z-50 fixed top-0 left-0 w-full h-full flex lg:hidden">
                        <NewPost toggleModal={toggleModal} />
                    </div>
                </div>
            }
        </div>
    );
}