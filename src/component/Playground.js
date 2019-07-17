import React from 'react';
import Hooks from '../component/hooks';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

const Playground = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/hooks" component={Hooks} />
                {/* <Route path="/i/:address" component={IdentifyEquipment} /> */}
                <Redirect from="/" to="/hooks" exact />
            </Switch>
        </HashRouter>
    );
};

export default Playground;