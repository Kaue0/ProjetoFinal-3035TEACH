import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPost } from '../services/posts.service';
import close from '../assets/close.png';
import arrowLeft from '../assets/arrowLeft.png';

interface NewPostProps {
    toggleModal: () => void;
}

export function NewPost({ toggleModal }: NewPostProps) {
    const [descPage, setDescPage] = useState(false);
    const [photo_link, setPhoto_link] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const [message, setMessage] = useState<string | null>(null);
    const photoRef = useRef<HTMLInputElement>(null);
    const [charCount, setCharCount] = useState(0);
    const location = useLocation();

    function handleNext() {
        if (photoRef.current && !photoRef.current.validity.valid) {
            setMessage('Insira uma URL válida.');
        } else if (!photo_link) {
            setMessage('Insira um endereço URL.');
        } else {
            setMessage(null);
            setDescPage(true);
        }
    }

    async function handleShare() {
        try {
            await createPost({
                photo_link,
                description,
            });
            if (location.pathname === `/${username}` || location.pathname === `/feed`) {
                window.location.reload();
            } else
            navigate(`/feed`);
        } catch (error) {
            console.error('Erro ao criar post:', error);
        }
    };

    return (
        <div className="flex flex-col h-screen w-full lg:h-full">
            <div className="flex justify-center lg:mt-4">
                <div className="max-w-[390px] flex flex-grow justify-center lg:max-w-[490px]">
                    <div className="flex flex-grow justify-between items-center px-[30px] min-h-[77px]">
                        <div className="flex items-center">
                            <button onClick={descPage === false ? toggleModal : () => setDescPage(false)}>
                                <img src={descPage === false ? close : arrowLeft} alt="" />
                            </button>
                            <h1 className="text-[20px] font-semibold ml-[28px] lg:text-[25px] lg:ml-12">Nova publicação</h1>
                        </div>
                        <button onClick={descPage === false ? handleNext : handleShare} className="text-[15px] underline font-bold text-[#F37671]">
                            {descPage === false ? 'Avançar' : 'Compartilhar'}
                        </button>
                    </div>
                </div>
            </div>
            {descPage === false ?
                <div className="bg-[#30303059] h-full flex justify-center lg:bg-white lg:h-[136px] lg:rounded-[34px]">
                    <div className="bg-white h-[300px] max-w-[300px] mx-5 rounded-[10px] mt-[45px] p-[24px] flex flex-col flex-grow lg:h-[100px] lg:p-0 lg:m-0 lg:max-w-full lg:flex-row lg:items-center lg:justify-center">
                        <h1 className="text-[20px] font-semibold mb-3 lg:h-[32px] lg:w-[135px] lg:text-[15px] lg:font-medium lg:bg-[#F37671] lg:mb-0 lg:text-white lg:flex lg:items-center lg:justify-center lg:rounded-lg lg:z-10">Link da imagem</h1>
                        <input
                            ref={photoRef}
                            type="url"
                            placeholder="Insira aqui a URL da imagem"
                            value={photo_link}
                            onChange={(e) => setPhoto_link(e.target.value)}
                            className="w-full pl-[1px] text-[15px] focus:outline-none truncate lg:h-[32px] lg:w-[280px] lg:rounded-lg lg:border lg:pl-5 lg:-ml-3"
                        />
                        {message && <p className="text-red-500 mt-2">{message}</p>}
                    </div>
                </div>
                :
                <div className="h-full flex justify-center">
                    <div className="flex flex-col flex-grow">
                        <div className="flex justify-center">
                            <img src={photo_link} alt="" className="max-w-[95%] max-h-[650px] object-cover lg:max-h-[400px]" />
                        </div>
                        <textarea
                            placeholder="Escreva uma legenda..."
                            value={description}
                            onChange={(e) => { setDescription(e.target.value); setCharCount(e.target.value.length); }}
                            className="px-9 py-7 w-full focus:outline-none text-[15px] flex-grow resize-none"
                            maxLength={200}
                        />
                        <div className="text-right pr-4 py-2 lg:text-[12px] lg:mr-3">
                            <span className={`${charCount > 180 ? 'text-red-500' : ''}`}>{charCount}/200</span>
                        </div>
                    </div>
                </div>}
        </div>
    );
}
