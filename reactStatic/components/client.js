import React from 'react';
import Ajax from './../util/Ajax';

class Info extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){

    }

    render(){
        return(
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>编号</th>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>是否有VIP</th>
                        <th>电话号码</th>
                    </tr>
                    </thead>
                </table>
            </div>
        )
    }
}

class Client extends React.Component{
    constructor(props){
        super(props);

    }
    componentDidMount(){
        console.log(this.props.match.params.id);

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