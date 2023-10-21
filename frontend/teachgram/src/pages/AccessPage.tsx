import { useState } from 'react';
import accessPageImage from '../assets/accessPageImage.png';
import { Login } from '../components/Login';
import { Register } from '../components/Register';

export function AccessPage() {
    const [loginPage, setLoginPage] = useState(true);

    return (
        <div className="h-full max-h-screen lg:flex justify-between">
            {loginPage ? <Login register={() => setLoginPage(false)}/> : <Register login={() => setLoginPage(true)}/> }
            <div className="hidden lg:flex max-w-[68%]">
                <img src={accessPageImage} className="h-full max-h-screen w-full" />
            </div>
        </div>
    );
}