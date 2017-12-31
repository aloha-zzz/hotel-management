import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom'
import Login from './components/login'
import Client from './components/client';
import Manager from './components/manager';
import Employee from './components/employee';



ReactDom.render(
    <BrowserRouter>
        <div>
            <Route path='/client/:id' component={Client} />
            <Route path='/manager/:id' component={Manager} />
            <Route path='/employee/:id' component={Employee} />
            <Route exact path='/' component={Login} />
        </div>
    </BrowserRouter>,
    document.getElementById('root')
)


