import React, { Suspense, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Loading from 'src/components/Loading';
import { LazyComponent } from './LazyComponent';
import Homepage from '../RootComponents/Homepage';
import Cart from '../RootComponents/Cart';
import Collection from '../RootComponents/Collection';
import Product from '../RootComponents/Product';
import Signin from '../RootComponents/Signin'

// const Signin = (props) => {
//     return (
//         <LazyComponent
//             component={() =>
//                 import(
//                     /* webpackChunkName: "Singin" */ 'src/components/App/core/RootComponents/Signin'
//                 )
//             }
//             {...props}
//         />
//     );
// };

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
                    <Route exact path='/account/login'>
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
