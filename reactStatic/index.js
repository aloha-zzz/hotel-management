import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom'
function Test() {
    return(
        <h1>hello</h1>
    )
}

function Login() {
    return(
        <h1>loginz</h1>
    )
}

ReactDom.render(
    <BrowserRouter>
        <div>
            <Route path='/test' component={Test} />
            <Route exact path='/' component={Login} />
        </div>
    </BrowserRouter>,
    document.getElementById('root')

)


