import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import homeTeachgramLogo from '../assets/homeTeachgramLogo.png';
import arrowLeft from '../assets/arrowLeft.png';

type LoginProps = {
    login: () => void;
};

export function Register({ login }: LoginProps) {
    const [error, setError] = useState('');
    const [photoPage, setPhotoPage] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [photo_link, setPhoto_Link] = useState('');
    const [initialCredentials, setInitialCredentials] = useState(false);
    const navigate = useNavigate();

    const handleFirstPage = () => {
        setInitialCredentials(true);
    
        if (!name || !email || !username || !password) {
            setError('• Campo não preenchido')
        } else {
            setError('');
            setPhotoPage(true);
        }
    };

    const handleSubmit = async () => {
        localStorage.removeItem('token');
        try {
            await API.post('/register', {
                name,
                email,
                username,
                description,
                phone,
                password,
                photo_link,
            });
            navigate('/feed');
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen mx-auto">
            <div className="w-[315px] pt-12 lg:pt-10 mb-5 relative">
                {photoPage === true && 
                    <button onClick={() => setPhotoPage(false)} className="absolute top-16 -left-7 lg:top-14 lg:-left-8"> <img src={arrowLeft} alt="arrowLeft" /></button>
                }
                <div className="flex items-center justify-center mb-10 lg:mb-12">
                    <img src={homeTeachgramLogo} alt="Logo" />
                </div>
                {photoPage === false ? (
                    <div className="flex flex-col">
                        <h1 className="text-[20px] font-semibold mb-4">Crie sua conta</h1>
                        <label htmlFor="name" className="text-[#303030] mb-2 text-[15px]">Nome</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Digite seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={`${!name && initialCredentials ? 'border-[#F37671]' : 'border-[#A09F9F]'} px-4 py-2.5 border border-[#A09F9F] rounded-lg mb-2.5 lg:mb-4 text-[15px] text-[#666666]  w-full`}
                            maxLength={50}
                        />
                        <label htmlFor="email" className="text-[#303030] mb-2 text-[15px]">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Digite seu E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`${!email && initialCredentials ? 'border-[#F37671]' : 'border-[#A09F9F]'} px-4 py-2.5 border border-[#A09F9F] rounded-lg mb-2.5 lg:mb-4 text-[15px] text-[#666666]  w-full`}
                            maxLength={70}
                        />
                        <label htmlFor="username" className="text-[#303030] mb-2 text-[15px]">Username</label>
                        <div className="relative mb-2 lg:mb-4">
                            <span className="absolute left-3 translate-y-2 text-gray-600">@</span>
                            <input
                                id="username"
                                type="text"
                                placeholder="seu_username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className={`${!username && initialCredentials ? 'border-[#F37671]' : 'border-[#A09F9F]'} px-7 py-2.5 border border-[#A09F9F] rounded-lg text-[15px] text-[#666666] w-full `}
                                maxLength={30}
                            />
                        </div>
                        <label htmlFor="description" className="text-[#303030] mb-2 text-[15px]">Descrição</label>
                        <textarea
                            id="description"
                            placeholder="Faça uma descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border border-[#A09F9F] rounded-lg mb-2.5 lg:mb-4 text-[15px] text-[#666666] h-12 w-full px-4 py-2.5 resize-none"
                            maxLength={255}
                        />
                        <label htmlFor="phone" className="text-[#303030] mb-2 text-[15px]">Celular</label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="Digite seu número de celular"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="border border-[#A09F9F] rounded-lg mb-2.5 lg:mb-4 text-[15px] text-[#666666] px-4 py-2.5 w-full"
                            maxLength={20}
                        />
                        <label htmlFor="password" className="text-[#303030] mb-2 text-[15px]">Senha</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={`${!password && initialCredentials ? 'border-[#F37671]' : 'border-[#A09F9F]'}  border border-[#A09F9F] rounded-lg mb-6 text-[15px] text-[#666666] px-4 py-2.5 w-full`}
                            maxLength={255}
                        />
                        
                        {(!name || !email || !username || !password) && error &&
                        <div className="text-[#F37671] text-[15px] font-semibold text-right py-2 mb-2">{error}</div>}

                        <button onClick={handleFirstPage} className="py-3 shadow-[0_4px_21px_-4px_rgba(0,0,0,0.4)] bg-[#F37671] text-white rounded-[10px] w-full mb-10 lg:mb-11">Próximo</button>


                        <div className="text-center mb-2 text-[15px]">
                            Já possui conta? <span className="underline cursor-pointer text-[#F37671] font-bold" onClick={login}>Entrar</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <h1 className="text-[20px] font-semibold mt-16 lg:mt-40 mb-16 lg:mb-16 ">Insira o link da sua foto de perfil:</h1>
                        <label htmlFor="photo" className="text-[#303030] mb-2 text-[15px]">Link</label>
                        <input
                            id="photo"
                            type="url"
                            placeholder="Insira seu link"
                            value={photo_link}
                            onChange={(e) => setPhoto_Link(e.target.value)}
                            required
                            className="border border-[#A09F9F] rounded-lg mb-8 text-[15px] text-[#666666] px-4 py-2.5 w-full"
                            maxLength={1000}
                        />
                        <button onClick={handleSubmit} className="py-3 shadow-[0_4px_21px_-4px_rgba(0,0,0,0.4)] bg-[#F37671] text-white rounded-[10px] w-full mb-16">Salvar</button>
                    </div>
                )}
            </div>
        </div>
    );

}
