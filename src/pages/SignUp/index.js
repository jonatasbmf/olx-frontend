import React, { useState } from "react";
import { PageArea } from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import useApi from '../../helpers/OlxApi';
import { doLogin } from "../../helpers/authHandler";


const Page = () => {
    const api = useApi();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [estado, setEstado] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);

        const json = await api.login(email, password);

        if (json.error) {
            setError(json.error);
        } else {
            doLogin(json.token, false);
            window.location.href = "/";
        }
        setDisabled(false);
    }


    return (
        <PageContainer>
            <PageTitle>
                Cadastro
            </PageTitle>
            <PageArea>
                {error &&
                    <>
                        <ErrorMessage>
                            {error}
                        </ErrorMessage>
                    </>
                }

                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area-title"> Nome Completo </div>
                        <div className="area-input">
                            <input type="text"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                disabled={disabled} />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title"> Estado </div>
                        <div className="area-input">
                            <select required value={estado} onChange={e=>setEstado(e.target.value)}>
                                <option>Selecione um estado</option>
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title"> E-mail </div>
                        <div className="area-input">
                            <input type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={disabled} />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title"> Senha </div>
                        <div className="area-input">
                            <input type="password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                disabled={disabled} />
                        </div>
                    </label>
                    {/* <label className="area">
                        <div className="area-title"> Lembre-se de mim </div>
                        <div className="area-input">
                            <input type="checkbox"
                                checked={rememberPassword}
                                onChange={() => setRememberPassword(!rememberPassword)}
                                disabled={disabled} />
                        </div>
                    </label> */}
                    <label className="area">
                        <div className="area-title"></div>
                        <div className="area-input">
                            <button disabled={disabled}> Entrar </button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Page;