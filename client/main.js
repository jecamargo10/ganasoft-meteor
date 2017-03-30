import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import '../imports/startup/accounts-config.js'
import App from '../imports/ui/App';
import ListaFincas from '../imports/ui/ListaFincas'
import Home from '../imports/ui/Home';
import Animal from '../imports/ui/Animal';
import '../imports/api/fincas.js';
//Con React podrias ahorrar tener que usar estas redirecciones y ahorrarte ese trabajo
FlowRouter.route('/', {
    name: 'Home',
    action() {
        mount(App, {
            main: <Home/>,
        });
    },
});
FlowRouter.route('/fincas', {
    name: 'Fincas',
    action() {
        mount(App, {
            main: <ListaFincas/>,
        });
    },
});
FlowRouter.route('/fincas/:fincaId/animales', {
    name: 'Animales',
    action(params,queryParams) {
        mount(App, {
            main: <Animal />,
        });
    },
});
