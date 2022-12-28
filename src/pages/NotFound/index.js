import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../../assets/img/not-found.jpg';
import { NotFound } from './styled';

const Page = () => {
    return (
        <NotFound>
            <div className='imgNotFound'>
                <img src={notFound} alt="" />
            </div>
            <div  className='linkNotFound'>
                <Link to="/">De volta para home...</Link>
            </div>
        </NotFound>
    );
}

export default Page;