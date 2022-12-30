import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { PageArea } from './styled';
import { PageContainer } from '../../components/MainComponents';
import AnuncioItem from '../../components/partials/AnuncioItem';

import useApi from '../../helpers/OlxAPI';
import { Link } from 'react-router-dom';

let timer;

const Page = () => {
    const api = useApi();
    const history = useHistory();

    const useQueryString = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQueryString();


    const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '');
    const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '');
    const [estado, setEstado] = useState(query.get('state') != null ? query.get('state') : '');


    const [listaEstados, setListaEstados] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [anuncios, setAnuncios] = useState([]);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [totalItens, setTotalItens] = useState(0);

    const [loading, setLoading] = useState(false);
    const [resultOpacity, setResultOpacity] = useState(1);

    const getAdsList = async () => {
        setLoading(true);
        let offset = 0;
        offset = (paginaAtual - 1) * 9;

        const json = await api.getRecentesAnuncios({
            sort: 'asc',
            limit: 9,
            q,
            cat,
            estado,
            offset
        })
        setAnuncios(json.ads);
        setTotalItens(json.total);
        setResultOpacity(1);
        setLoading(false);
    }

    useEffect(() => {
        setResultOpacity(0.3);
        getAdsList();
    }, [paginaAtual]);

    useEffect(() => {
        if (anuncios.length > 0)
            setTotalPaginas(Math.ceil(totalItens / anuncios.length));
        else
            setTotalPaginas(0);

        const getEstados = async () => {
            const eList = await api.getStates();
            setListaEstados(eList);
        }
        getEstados();

        const getCategorias = async () => {
            const lCategoria = await api.getCategorias();
            setCategorias(lCategoria);
        }
        getCategorias();

        let queryString = [];

        if (q) {
            queryString.push(`q=${q}`);
        }

        if (cat) {
            queryString.push(`cat=${cat}`);
        }

        if (estado) {
            queryString.push(`state=${estado}`);
        }

        history.replace({
            search: `?${queryString.join('&')}`
        });

        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(getAdsList, 2000);
        setResultOpacity(0.3);
        setPaginaAtual(1);
    }, [q, cat, estado, totalItens]);

    let pagination = [];
    for (let i = 1; i <= totalPaginas; i++) {
        pagination.push(i);
    }

    return (
        <PageContainer>
            <PageArea>
                <div className='leftSide'>
                    <form method='GET'>
                        <input
                            type="text"
                            name="q"
                            placeholder='Manda a busca...'
                            value={q}
                            onChange={e => setQ(e.target.value)}
                        />

                        <div className='filterName'>Estado:</div>
                        <select name='state' value={estado} onChange={e => setEstado(e.target.value)}>
                            <option></option>
                            {listaEstados &&
                                listaEstados.map((i, k) =>
                                    <option
                                        value={i.name}
                                        key={k}>{i.name}</option>
                                )}
                        </select>
                        <div className='filterName'>Categoria:</div>
                        <ul>
                            {categorias.map((i, k) =>
                                <li key={k}
                                    onClick={() => setCat(i.slug)}
                                    className={cat == i.slug ? 'categoriaItem active' : 'categoriaItem'}>
                                    <img src={i.img} alt="" />
                                    <span>{i.name}</span>
                                </li>
                            )}
                        </ul>
                    </form>
                </div>
                <div className='rightSide'>
                    <h2>Resultados</h2>

                    {loading && anuncios.length === 0 &&
                        <div className='listWarning'>Carregando...</div>
                    }

                    {!loading && anuncios.length === 0 &&
                        <div className='listWarning'>Não encontramos resultados com filtros informados.</div>
                    }

                    <div className='list' style={{ opacity: resultOpacity }}>
                        {anuncios.map((i, k) =>
                            <AnuncioItem key={k} data={i} />
                        )}
                    </div>

                    <div className='pagination'>
                        {pagination.map((i, k) =>
                            <div key={k}
                                onClick={() => setPaginaAtual(i)}
                                className={i === paginaAtual ? 'pagItem active' : 'pagItem'}>{i}</div>
                        )}
                    </div>

                </div>
            </PageArea>
        </PageContainer>
    );
}

export default Page;