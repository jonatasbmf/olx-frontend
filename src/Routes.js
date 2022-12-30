import React from 'react';
import { Switch } from 'react-router-dom';

import RoutHandler from './components/partials/RoutHandler';

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdPage from './pages/AdPage';
import AddAd from './pages/AddAd';
import Ads from './pages/Ads';

export default () => {
    return (
        <Switch>
            <RoutHandler exact path="/">
                <Home />
            </RoutHandler>
            <RoutHandler exact path="/about">
                <About />
            </RoutHandler>
            <RoutHandler exact path="/signin">
                <SignIn />
            </RoutHandler>
            <RoutHandler exact path="/signup">
                <SignUp />
            </RoutHandler> 
            <RoutHandler exact path="/ad/:id">
                <AdPage />
            </RoutHandler> 
            <RoutHandler private exact path="/post-an-ad">
                <AddAd />
            </RoutHandler> 
            <RoutHandler exact path="/ads">
                <Ads />
            </RoutHandler> 
            <RoutHandler>
                <NotFound />
            </RoutHandler>
        </Switch>
    );
}