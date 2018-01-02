import  API from './API';
import axios from 'axios';

const Ajax={
    getInfo(success,error){
        axios({
            method:'get',
            url:API.test
        }).then(data=>{success(data)})
            .catch(data=>{error(data)})
    },
    login(data,success,error){
        axios({
            method:'post',
            url:API.login,
            data,
        }).then(data=>{success(data)})
            .catch(data=>{error(data)})
    },
    Client:{
        getInfo(data,success,error){
            axios({
                method:'post',
                url:API.getInfo1,
                data,
            }).then(data=>{success(data)})
                .catch(data=>{error(data)})
        },
        getfreeRoom(success,error){
            axios({
                method:'get',
                url:API.getfreeRoom,
            }).then(data=>{success(data)})
                .catch(data=>{error(data)})
        },
        getLivingInfo(data,success,error){
            axios({
                method:'post',
                url:API.checkInInfo,
                data,
            }).then(data=>{success(data)})
                .catch(data=>{error(data)})
        },
        getHistoryInfo(data,success,error){
            axios({
                method:'post',
                url:API.historyInfo,
                data,
            }).then(data=>{success(data)})
                .catch(data=>{error(data)})
        }
    },
    Employee:{
        getInfo(data,success,error){
            axios({
                method:'post',
                url:API.getInfo2,
                data,
            }).then(data=>{success(data)})
                .catch(data=>{error(data)})
        },
        getRoom(success,error){
            axios({
                method:'get',
                url:API.getRoom,
            }).then(data=>{success(data)})
                .catch(data=>{error(data)})
        },
        getCheckIn(success,error){
            axios({
                method:'get',
                url:API.getCheckIn,
            }).then(data=>{success(data)})
                .catch(data=>{error(data)})
        }
    },
    Manager:{

    }
}




export default Ajax
