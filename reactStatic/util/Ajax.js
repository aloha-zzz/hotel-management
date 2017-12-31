import  API from './API';
import axios from 'axios';
class Ajax{
    static getInfo(success,error){
        axios({
            method:'get',
            url:API.test
        }).then(data=>{success(data)})
            .catch(data=>{error(data)})
    }
    static login(data,success,error){
        axios({
            method:'post',
            url:API.login,
            data,
        }).then(data=>{success(data)})
            .catch(data=>{error(data)})
    }
}

class ClientAjax{

}
class EmployeeAjax{

}
class ManagerAjax{

}

export  {Ajax,ClientAjax,EmployeeAjax,ManagerAjax};
