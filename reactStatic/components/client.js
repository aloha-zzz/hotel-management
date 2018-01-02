import React from 'react';
import Ajax from './../util/Ajax';
import {Link,Route,Switch} from 'react-router-dom'


class Info extends React.Component{
    constructor(props){
        super(props)
        this.state={
            content:[]
        }
    }
    componentDidMount(){
        let userId=this.props.match.params.id
        console.log(userId)
        Ajax.Client.getInfo({userId},data=>{
            console.log(data)
            this.setState({
                content:data.data.data[0]
            })
        },err=>{console.log(err)})
    }

    render(){
        console.log(this.state.content)
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
                    <tbody>
                    <tr>
                        <td>{this.state.content.c_id}</td>
                        <td>{this.state.content.name}</td>
                        <td>{this.state.content.sex}</td>
                        <td>{this.state.content.VIPcard}</td>
                        <td>{this.state.content.phone}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

class FreeRoomInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            content:[]
        }
    }
    componentDidMount(){
        Ajax.Client.getfreeRoom(data=>{
            console.log(data)
            this.setState({
                content:data.data.data
            })
        },err=>{console.log(err)})
    }

    render(){
        console.log(this.state.content)
        return(
            <div>
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
                    {this.state.content.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.number}</td>
                            <td>{item.state}</td>
                            <td>{item.room_type}</td>
                            <td>{item.price}</td>
                            <td>{item.deposit}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}


class LiveRecord extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        Ajax.Client
    }

    render(){
        return(
            <div>
                <h2>正在入住：</h2>
                <table>
                    <thead>
                    <tr>
                        <th>顾客编号</th>
                        <th>房间号</th>
                        <th>房间类型</th>
                        <th>房间价格</th>
                        <th>所需押金</th>
                        <th>入住时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                </table>
                <h2>历史入住记录：</h2>
                <table>
                    <thead>
                    <tr>
                        <th>顾客编号</th>
                        <th>房间号</th>
                        <th>房间类型</th>
                        <th>房间价格</th>
                        <th>所需押金</th>
                        <th>入住时间</th>
                        <th>退房时间</th>
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
        let match=this.props.match
        return(
            <div>
                <h1>Client</h1>
                <ul>
                    <li><Link to={`${match.url}`}>获取个人信息</Link></li>
                    <li><Link to={`${match.url}/freeRoom`}>获取空房信息</Link></li>
                    <li><Link to={`${match.url}/myLiveRecord`}>我的入住记录</Link></li>
                </ul>
                <Switch>
                    <Route exact path='/client/:id' component={Info}></Route>
                    <Route path='/client/:id/freeRoom' component={FreeRoomInfo}></Route>
                    <Route path='/client/:id/myLiveRecord' component={LiveRecord}></Route>
                </Switch>
            </div>
        )
    }
}


export default Client