import React from 'react';
import Ajax from './../util/Ajax';
import {BrowerRouter,Link,Switch,Route} from 'react-router-dom'

class PersonInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            content:[]
        }
    }
    componentDidMount(){

        let userId=this.props.match.params.id
        console.log(userId);
        Ajax.Employee.getInfo({userId},data=>{
            console.log(data);
            let Arr=data.data.data[0]
            console.log(Arr)
            this.setState({
                content:Arr
            })
        },data=>{console.log(data)})

    }
    render(){

        return(
            <table>
                <thead>
                <tr>
                    <th>编号</th>
                    <th>姓名</th>
                    <th>薪水</th>
                    <th>性别</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>获取个人信息</td>
                    </tr>
                    <tr>
                        <td>{this.state.content.e_id}</td>
                        <td>{this.state.content.name}</td>
                        <td>{this.state.content.salary}</td>
                        <td>{this.state.content.sex}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
class RoomInfo extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            content: []
        }
    }
    componentDidMount(){
        Ajax.Employee.getRoom(data=>{
            console.log(data.data)
            this.setState({
                content:data.data.data
            })
        },err=>console.log(err))
    }
    render(){
        console.log(this.state.content)
        return(
            <table>
                <thead>
                <tr>
                    <th>房间号</th>
                    <th>房间状态</th>
                    <th>房间类型</th>
                    <th>房间价格</th>
                    <th>所需押金</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>获取房间信息</td>
                    </tr>

                    {this.state.content.map((item,index)=>(<tr key={index}>
                        <td>{item.number}</td>
                        <td>{item.state}</td>
                        <td>{item.room_type}</td>
                        <td>{item.price}</td>
                        <td>{item.deposit}</td>
                    </tr>))}
                </tbody>
            </table>
        )
    }
}
class CheckIn extends React.Component{
    constructor(props){
        super(props)
        this.state={
            content:[]
        }
    }
    componentDidMount(){
        Ajax.Employee.getCheckIn(data=>{
            console.log(data)
            this.setState({
                content:data.data.data
            })
        },error=>{console.log(error)})
    }
    render(){
        console.log(this.state.content)
        return(
            <table>
                <thead>
                <tr>
                    <th>顾客编号</th>
                    <th>顾客名称</th>
                    <th>房间号</th>
                    <th>入住时间</th>
                </tr>
                </thead>
                <tbody>

                {this.state.content.map((item,index)=>(<tr key={index}>
                        <td>{item.c_id}</td>
                        <td>{item.name}</td>
                        <td>{item.room}</td>
                        <td>{item.inTime}</td>
                    </tr>))
                }
                </tbody>
            </table>
        )
    }
}


class Employee extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props)
        let match=this.props.match;
        return(
                <div>
                    <h1>employee</h1>
                    <ul>
                        <li><Link to={`${match.url}`}>获取个人信息</Link></li>
                        <li><Link to={`${match.url}/roomInfo`}>获取房间信息</Link></li>
                        <li><Link to={`${match.url}/checkInInfo`}>获取当前入住的信息</Link></li>
                    </ul>
                    <Switch>
                        <Route exact path='/employee/:id' component={PersonInfo}/>
                        <Route path={`${match.url}/roomInfo`} component={RoomInfo}/>
                        <Route path={`${match.url}/checkInInfo`} component={CheckIn}/>
                    </Switch>
                </div>
        )
    }
}
export default Employee