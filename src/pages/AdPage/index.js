import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageArea, Fake, OthersArea, BreadChumb } from './styled';

import { Slide } from 'react-slideshow-image';
import "react-slideshow-image/dist/styles.css";

import useApi from '../../helpers/OlxAPI';

import { PageContainer } from '../../components/MainComponents';
import AnuncioItem from '../../components/partials/AnuncioItem';

const Page = () => {
    const api = useApi();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState({});

    useEffect(() => {
        const getAdInfo = async (id) => {
            const json = await api.gatAnuncio(id, true);
            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id);
    }, []);

    const formatData = (d) => {
        let cData = new Date(d);

        let mes = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

        let cDia = cData.getDate();
        let cMes = cData.getMonth();
        let cAno = cData.getFullYear();

        return `${cDia} de ${mes[cMes]} de ${cAno}`;
    }

    return (
        <PageContainer>
            {adInfo.category &&
                <BreadChumb>
                    Você está aqui: 
                    <Link to="/"> Home </Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}`}> {adInfo.stateName} </Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}> {adInfo.category.name} </Link>
                    / {adInfo.title}
                </BreadChumb>
            }
            <PageArea>
                <div className='leftSide'>
                    <div className='box'>
                        <div className='adImage'>
                            {loading && <Fake height={300} />}
                            {adInfo.images &&
                                <Slide>
                                    {adInfo.images.map((img, k) =>
                                        <div key={k} className="cada-slide">
                                            <img src={img} alt="" />
                                        </div>
                                    )}
                                </Slide>
                            }
                        </div>
                        <div className='adInfo'>
                            <div className='adName'> {loading && <Fake height={20} />}
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo.dateCreated &&
                                    <small>Criado em {formatData(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className='adDescription'> {loading && <Fake height={100} />}
                                {adInfo.description}
                                <hr />
                                {adInfo.views &&
                                    <small> Visualizações: {adInfo.views}</small>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rightSide'>
                    <div className='box box-padding'>
                        {loading && <Fake height={20} />}
                        {adInfo.priceNegotiable &&
                            "Preço negociável"
                        }
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className='preco'>
                                Preço: <span>R$ {adInfo.price}</span>
                            </div>
                        }
                    </div>
                    {loading && <Fake height={50} />}
                    {adInfo.userInfo &&
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} target="_black" className="contatoVendedor">Fale com vendedor</a>
                            <div className='creadoPor box box-padding'>
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>E-mail: {adInfo.userInfo.email}</small>
                                <small>Estado: {adInfo.stateName}</small>
                            </div>
                        </>
                    }
                </div>
            </PageArea>
            <OthersArea>
                {adInfo.others &&
                    <>
                        <h2> Outras ofertas do vendedor</h2>
                        <div className='lista'>
                            {adInfo.others.map((i, k) =>
                                <AnuncioItem key={k} data={i} />
                            )}
                        </div>
                    </>}
            </OthersArea>
        </PageContainer>
    );
}

export default Page;