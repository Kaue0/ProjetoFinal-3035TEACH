import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhotoTweeks } from '../components/PhotoTweeks';
import { User } from '../interfaces/User';
import API from '../services/api';
import defaultProfile from '../assets/defaultProfile.png';
import arrowRight from '../assets/arrowRight.png';
import arrowLeft from '../assets/arrowLeft.png';

export function Settings() {
    const navigate = useNavigate();
    const [action, setAction] = useState<'settings' | 'account' | 'editProfile'>('settings');
    const [modal, setModal] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const userId = localStorage.getItem('userId');

    async function fetchProfile() {
        try {
            const res = await API.get(`/users/update/${userId}`);
            setUser(res.data);
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    async function handleUpdateAccount(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        try {
            await API.put(`/users/${userId}`, {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                password: formData.get('password')
            });
            fetchProfile();
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    async function handleUpdateProfile(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        try {
            await API.put(`/users/${userId}`, {
                photo_link: formData.get('photo_link'),
                name: formData.get('name'),
                username: formData.get('username'),
                description: formData.get('description')
            });
            fetchProfile();
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    async function handleDeleteAccount() {
        try {
            await API.delete(`/users/${userId}`);
            navigate('/');
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div>
            {action === 'settings' && (
                <div className="flex">
                    <div className="flex flex-col flex-grow items-center max-w-[488px] mx-auto lg:max-w-full">
                        <button onClick={() => navigate(-1)} className="mt-8 mb-[107px] ml-[38px] self-start"> <img src={arrowLeft
                    } alt="" /></button>
                        <div className="flex justify-center lg:justify-start w-full">
                            <div className="text-[20px] w-full max-w-[416px] px-12 flex flex-col gap-12 lg:ml-40 lg:max-w-[480px] lg:text-[25px]">
                                <button onClick={() => setAction('account')} className="flex justify-between items-center font-semibold leading-none">
                                    <p>Configurações da conta</p>
                                    <img src={arrowRight} alt="" />
                                </button>
                                <button onClick={() => setAction('editProfile')} className="flex justify-between items-center font-semibold leading-none">
                                    Editar perfil
                                    <img src={arrowRight} alt="" />
                                </button>
                                <button onClick={() => setModal(true)} className="underline text-[#F37671] mr-auto leading-none">
                                    Excluir conta
                                </button>
                            </div>
                            {modal &&
                                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#30303059]">
                                    <div className="bg-white w-[310px] h-[295px] rounded-[34px] flex flex-col items-center lg:w-[528px] lg:h-[310px]">
                                        <h1 className="w-full border-b-2 border-[#CECECE] text-center text-[25px] leading-tight font-semibold pt-[48px] pb-[30px] mb-[35px] lg:text-left lg:pl-[54px]">Excluir conta</h1>
                                        <p className="text-[18px] text-center mb-[42px] leading-tight w-64 lg:w-full lg:mb-[67px] lg:text-left lg:pl-[54px]">Todos os seus dados serão excluídos. Tem certeza disso?</p>
                                        <div className="">
                                            <button type="button" onClick={() => setModal(false)} className="mr-[20.9px] w-[81.11px] h-[32.85px] border border-[#F37671] text-[#F37671] text-[15px] font-medium rounded-lg lg:w-[147px]">Cancelar</button>
                                            <button type="button" onClick={handleDeleteAccount} className="w-[81.11px] h-[32.85px] bg-[#F37671] text-white text-[15px] font-medium rounded-lg lg:w-[147px] p-1">Confirmar</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="hidden lg:block bg-tile bg-repeat-y w-[299px] h-screen"></div>
                </div>
            )}
            {action === 'account' && (
                <div className="lg:flex">
                    <div className="flex flex-col flex-grow items-center mt-[84px] lg:items-start lg:ml-[161px] lg:mt-[231px]">
                        <div className="w-full max-w-[430px] flex-grow leading-none px-11">
                            <h1 className="text-[20px] font-semibold mb-[55px] lg:text-[25px]">
                                Configurações da conta
                            </h1>
                            <form onSubmit={handleUpdateAccount} className="flex flex-col w-full text-[15px] gap-3 lg:text-[20px] lg:gap-4">
                                <label htmlFor="name">Nome</label>
                                <input type="text" id="name" name="name" placeholder="Digite seu nome" defaultValue={user?.name} className="border-b focus:outline-none truncate text-[#666666] lg:-mt-[5px]" />
                                <label htmlFor="email">E-mail</label>
                                <input type="email" id="email" name="email" placeholder="Digite seu E-mail" defaultValue={user?.email} className="border-b focus:outline-none truncate text-[#666666] lg:-mt-[5px]" />
                                <label htmlFor="phone">Celular</label>
                                <input type="tel" id="phone" name="phone" placeholder="Digite seu celular" defaultValue={user?.phone} className="border-b focus:outline-none truncate text-[#666666] lg:-mt-[5px]" />
                                <label htmlFor="password">Senha</label>
                                <input type="password" id="password" name="password" placeholder="Digite sua nova senha" className="border-b focus:outline-none truncate text-[#666666] lg:-mt-[5px]" />
                                <div className="mt-8 text-[15px]">
                                    <button type="button" onClick={() => setAction('settings')} className="mr-[23.31px] w-[81.11px] h-[32.85px] border border-[#F37671] text-[#F37671] font-medium rounded-lg">Cancelar</button>
                                    <button type="submit" className="w-[81.11px] h-[32.85px] bg-[#F37671] text-white font-medium rounded-lg">Atualizar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="hidden lg:block bg-tile bg-repeat-y w-[299px] h-screen"></div>
                </div>
            )}
            {action === 'editProfile' && (
                <div className="lg:flex">
                    <div className="flex flex-col pb-6 flex-grow items-center mt-[84px] lg:items-start lg:ml-[161px] lg:mt-[162px]">
                        <div className="w-full max-w-[430px] flex-grow leading-none px-11">
                            <h1 className="text-[20px] font-semibold mb-[55px] lg:text-[25px]">
                                Editar perfil
                            </h1>
                            <PhotoTweeks image={user ? user.photo_link : ''} alt={user?.name} backUp={defaultProfile} className="w-[176px] h-[176px] rounded-full mb-16 object-cover mx-auto" />
                            <form onSubmit={handleUpdateProfile} className="flex flex-col w-full text-[15px] gap-3 lg:text-[20px] lg:gap-4">
                                <label htmlFor="photo_link">Foto de perfil</label>
                                <input type="url" id="photo_link" name="photo_link" placeholder="Insira o link da foto de perfil" defaultValue={user?.photo_link} className="border-b focus:outline-none truncate text-[#F37671] lg:-mt-[5px]" />
                                <label htmlFor="name">Nome</label>
                                <input type="text" id="name" name="name" placeholder="Digite seu nome" defaultValue={user?.name} className="border-b focus:outline-none truncate text-[#666666] lg:-mt-[5px]" />
                                <label htmlFor="username">Nome de usuário</label>
                                <input type="text" id="username" name="username" placeholder="Digite seu nome de usuário" defaultValue={user?.username} className="border-b focus:outline-none truncate text-[#666666] lg:-mt-[5px]" />
                                <label htmlFor="description">Descrição</label>
                                <textarea id="description" name="description" placeholder="Digite sua descrição" defaultValue={user?.description} className="border-b focus:outline-none resize-none h-[20px] text-[#666666] lg:-mt-[5px] lg:h-[25px]"></textarea>
                                <div className="mt-8 text-[15px]">
                                    <button type="button" onClick={() => setAction('settings')} className="mr-[23.31px] w-[81.11px] h-[32.85px] border border-[#F37671] text-[#F37671] font-medium rounded-lg">Cancelar</button>
                                    <button type="submit" className="w-[81.11px] h-[32.85px] bg-[#F37671] text-white font-medium rounded-lg">Atualizar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="hidden lg:block bg-feedDetail bg-repeat-y min-w-[299px] h-screen"></div>
                </div>
            )}
        </div>
    );
}