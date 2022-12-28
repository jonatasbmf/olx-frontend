import React, { useState } from 'react';

import { PageArea, SearchArea } from './styled';
import { PageContainer } from '../../components/MainComponents';

import useApi from '../../helpers/OlxAPI';


const Page = () => {
    const api = useApi();

    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className='searchBox'>
                        <form method='GET' action='/ads'>
                            <input type="text" name='q' placeholder="Manda a busca..."/>
                            <select name='state'>
                                <option>Selecione um estado</option>
                            </select>
                            <button>Buscar</button>
                        </form>
                    </div>
                    <div className='categoryList'></div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                    ...
                </PageArea>
            </PageContainer>
        </>
    );
}

export default Page;