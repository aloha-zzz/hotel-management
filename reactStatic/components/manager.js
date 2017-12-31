import React from 'react';
import Ajax from './../util/Ajax';

class Manager extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    render(){
        return(
            <div>
                <h1>Manager</h1>
                <ul>
                    <li>获取个人信息</li>
                    <li>获取房间信息</li>
                    <li>获取员工信息</li>
                    <li>修改员工薪水</li>
                    <li>获取所有入住信息</li>
                </ul>
            </div>
        )
    }
}

export default Manager;