import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderArea } from './styled';

import { isLogged } from '../../../helpers/authHandler';

const Header = () => {
    let logged = isLogged();

    return (
        <HeaderArea>
            <div className='container'>
                <div className='logo'>
                    <Link to="/">
                        <span className='logo-1'>O</span>
                        <span className='logo-2'>L</span>
                        <span className='logo-3'>X</span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        {logged &&
                            <>
                                <li>
                                    <Link to="/my-account" >Minha Conta</Link>
                                </li>
                                <li>
                                    <Link to="/logout" >Sair</Link>
                                </li>
                                <li>
                                    <Link to="" className='button'>Nova Postagem</Link>
                                </li>
                            </>
                        }
                        {!logged &&
                            <>
                                <li>
                                    <Link to="/signin">Login</Link>
                                </li>
                                <li>
                                    <Link to="/singup">Cadastrar</Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    );
}

export default Header;