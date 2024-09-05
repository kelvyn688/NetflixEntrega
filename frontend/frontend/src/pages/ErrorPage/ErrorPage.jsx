import { useNavigate } from 'react-router-dom';

import "./ErrorPage.css";

export function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div className='error-container'>
            <h1>Ops..</h1>
            <h3>Parece que você acessou uma página sem os dados necessários!</h3>
            <p onClick={() => navigate("/signin")}>Volte para a tela de login.</p>
        </div>
    )
}