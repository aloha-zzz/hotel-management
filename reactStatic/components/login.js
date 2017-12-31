import React from 'react';
import Ajax from './../util/Ajax';
import {withRouter} from 'react-router-dom';

class Login extends React.Component{
    constructor(props){
        super(props)
        this.login=this.login.bind(this)
    }

    componentDidMount(){
        Ajax.getInfo(data=>{console.log(data)},
            data=>{console.log(data)})
    }
    login(){
        let username=this.username.value;
        let password=this.password.value;

        Ajax.login({username,password},data=>{
            console.log(data);
            if(data.data.data.length==0){
                alert('login fail')
            }else {
                alert('login success')

                switch (data.data.data[0].idtype){
                    case '1':
                        this.props.history.push('/client/'+data.data.data[0].id);
                        break;
                    case '2':
                        this.props.history.push('/employee/'+data.data.data[0].id);
                        break;
                    case '3':
                        this.props.history.push('/manager/'+data.data.data[0].id);
                        break;
                }
            }

        },data=>{console.log(data)})
    }
    render(){
        return(
            <div>
                <span>账号:</span><input ref={e=>{this.username=e}} type="text"/>

                <span>密码:</span><input ref={e=>{this.password=e}} type="password"/>
                <button onClick={this.login}>login</button>
            </div>
        )
    }
}
export default withRouter(Login)