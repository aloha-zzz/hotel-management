import React from 'react';
import Ajax from './../util/Ajax';

class Employee extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    render(){
        return(
            <div>
                <h1>employee</h1>
                <ul>
                    <li>获取个人信息</li>
                    <li>获取房间信息</li>
                    <li>获取当前入住的信息</li>
                </ul>
            </div>
        )
    }
}
export default Employee