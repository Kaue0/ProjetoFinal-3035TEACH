import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AxiosError } from 'axios';
import homeTeachgramLogo from '../assets/homeTeachgramLogo.png';
import googleIcon from '../assets/googleIcon.png';
import appleIcon from '../assets/appleIcon.png';

type RegisterProps = {
    register: () => void;
};

export function Login({ register }: RegisterProps) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(0);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!email || !password) {
            setError(400);
            setMessage('• Digite email e senha.');
            return;
        }
        try {
            const res = await API.post('/login', {
                email, password,
            });
            console.log("Resposta da solicitação: ", res);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('token', res.data.token);
            navigate('/feed');
        } catch (error) {
            const loginError = error as AxiosError;
            if (loginError.response) {
                switch (loginError.response.status) {
                    case 401:
                        setError(401);
                        setMessage('• Senha incorreta');
                        break;
                    case 404:
                        setError(404);
                        setMessage('• Email não cadastrado');
                        break;
                    default:
                        setError(500);
                        setMessage('• Erro ao fazer login. Tente novamente mais tarde.');
                }
            } else {
                console.error('Erro no login: ', loginError.message);
                setMessage('• Erro desconhecido.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center h-[90%] mx-auto">
            <div className="w-[315px] py-2">
                <div className="flex justify-center mb-12 lg:mb-20 mt-8 lg:mt-12 items-center">
                    <img src={homeTeachgramLogo} alt="teachgram-logo" />
                </div>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-[20px] font-semibold mb-6">Faça seu login</h1>
                    <label htmlFor="email" className="block text-black mb-2 text-[15px]">Email</label>
                    <input id="email"
                        type="text"
                        placeholder="Digite seu E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={` border ${!email  && (error === 400) || ((error === 404)) ? 'border-[#F37671]' : 'border-[#A09F9F]' } rounded-[8px] w-full mb-5 text-[15px] text-[#666666] pl-4 py-2.5`}
                    />
                    <label htmlFor="password" className="block text-black mb-2 text-[15px]">Senha</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={` border ${!password  && (error === 400) || ((error === 401)) ? 'border-[#F37671]' : 'border-[#A09F9F]'} rounded-[8px] w-full mb-3 text-[15px] text-[#666666] pl-4 py-2.5`}
                    />
                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-[#666666] text-[12px]">
                            <div className="relative rounded border border-[#F37671] mr-3 cursor-pointer w-4 h-4"></div>
                            Lembrar senha
                        </label>
                        <div className=" cursor-pointer text-[#666666] text-[12px] underline">Esqueci minha senha</div>
                    </div>
                    <div className="min-h-[23px] flex items-end justify-end py-3">
                        {(error === 400 || error === 500 || error === 404 || error === 401) && <div className="text-[#F37671]">{message}</div>}
                    </div>
                    <button type="submit" className="shadow-[0_4px_21px_-4px_rgba(0,0,0,0.4)] bg-[#F37671] lg:text-lg text-white rounded-[10px] w-full mb-8 py-3">Entrar</button>
                    <div className="text-center mb-8 text-[15px]">
                        Não possui conta? <span className="underline cursor-pointer text-[#F37671] font-bold" onClick={register}>Cadastre-se</span>
                    </div>
                    <div className="flex items-center justify-between mb-6 text-[#A09F9F] text-[12px]">
                        <div className="w-[90px] h-[2px] opacity-40 bg-[#A09F9F]" />
                        Entrar com
                        <div className="w-[90px] h-[2px] opacity-40 bg-[#A09F9F]" />
                    </div>
                    <div className="flex justify-center items-center bg-white rounded-[10px] shadow-[0px_4px_21px_-4px_rgba(0,0,0,0.2)] text-[#A09F9F] font-light cursor-pointer w-full h-16 mb-3">
                        <img src={googleIcon} alt="" className="mr-[20px]" />
                        <p>Entrar com Google</p>
                    </div>
                    <div className="flex justify-center items-center bg-white rounded-[10px] shadow-[0px_4px_21px_-4px_rgba(0,0,0,0.2)] text-[#A09F9F] font-light cursor-pointer w-full h-16">
                        <img src={appleIcon} alt="" className="mr-[20px]" />
                        <p>Entrar com Apple</p>
                    </div>
                </form>
            </div>
        </div>
    );
}