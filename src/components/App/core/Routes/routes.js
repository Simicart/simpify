import React, { Suspense, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Loading from 'src/components/Loading';
import Homepage from '../RootComponents/Homepage';
import Signin from '../RootComponents/Signin';
import Cart from '../RootComponents/Cart';
import Collection from '../RootComponents/Collection';
import Product from '../RootComponents/Product';

export const useScrollTopOnChange = (watched) => {
    useEffect(() => {
        if (!globalThis.scrollTo) return;

        globalThis.scrollTo({
            behavior: 'smooth',
            left: 0,
            top: 0,
        });
    }, [watched]);
};

const Routes = () => {
    const { pathname } = useLocation();
    useScrollTopOnChange(pathname);
    console.log(pathname);

    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                <Route>
                    <Route exact path='/'>
                        <Homepage />
                    </Route>
                    <Route exact path='/signin'>
                        <Signin />
                    </Route>
                    <Route exact path='/collections/:id'>
                        <Collection />
                    </Route>
                    <Route exact path='/products/:id'>
                        <Product />
                    </Route>
                    <Route exact path='/cart'>
                        <Cart />
                    </Route>
                </Route>
            </Switch>
        </Suspense>
    );
};

export default Routes;
