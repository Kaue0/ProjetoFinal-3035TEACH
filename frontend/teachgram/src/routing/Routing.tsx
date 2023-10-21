import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface RouterProps {
    children: ReactNode;
}

export function Routing({ children }: RouterProps) {
    if (!!localStorage.getItem('token')) {
        return <>{children}</>;
    } else {
        return <Navigate to="/" />;
    }
}
