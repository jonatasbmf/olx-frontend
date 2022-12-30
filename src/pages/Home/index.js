import React, { useState, useEffect } from 'react';

import { PageArea, SearchArea } from './styled';
import { PageContainer } from '../../components/MainComponents';
import AnuncioItem from '../../components/partials/AnuncioItem';

import useApi from '../../helpers/OlxAPI';
import { Link } from 'react-router-dom';


const Page = () => {
    const api = useApi();
    const [listaEstados, setListaEstados] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [anuncios, setAnuncios] = useState([]);


    useEffect(() => {
        const getEstados = async () => {
            const eList = await api.getStates();
            setListaEstados(eList);
        }
        getEstados();
    }, []);

    useEffect(() => {
        const getCategorias = async () => {
            const lCategoria = await api.getCategorias();
            setCategorias(lCategoria);
        }
        getCategorias();
    }, []);

    useEffect(() => {
        const getRecentesAnuncios = async () => {
            const json = await api.getRecentesAnuncios({
                sort: 'desc',
                limit: 8
            });
            setAnuncios(json.ads);
        }
        getRecentesAnuncios();
    }, []);

    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className='searchBox'>
                        <form method='GET' action='/ads'>
                            <input type="text" name='q' placeholder="Manda a busca..." />
                            <select name='state'>
                                <option>Selecione um estado</option>
                                {listaEstados.map((i, k) =>
                                    <option key={k} value={i.name}> {i.name}</option>
                                )}
                            </select>
                            <button>Buscar</button>
                        </form>
                    </div>
                    <div className='categoryList'>
                        {categorias.map((i, k) =>
                            <Link key={k} to={`/ads?cat=${i.slug}`} className='categoriaItem'>
                                <img src={i.img} alt='' />
                                <span>{i.name}</span>
                            </Link>
                        )}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                    <h2>Anúncios recentes</h2>
                    <div className='listAds'>
                        {anuncios.map((i, k) =>
                            <AnuncioItem key={k} data={i} />
                        )}
                    </div>

                    <Link to='/ads' className='verTodos'>Ver todos &gt;&gt;&gt;&gt;</Link>
                    <hr />
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea comodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </PageArea>
            </PageContainer>
        </>
    );
}

export default Page;