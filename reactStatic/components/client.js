import React from 'react';
import {Ajax} from './../util/Ajax';

class Client extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    render(){
        return(
            <div>
                <h1>Client</h1>
                <ul>
                    <li>获取个人信息</li>
                    <li>获取空房信息</li>
                    <li>我的入住记录</li>
                </ul>
            </div>
        )
    }
}
export default Client