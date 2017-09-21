function getInfo() {
    var userId=$.cookie('userId');
    $.ajax({
        url:API.getInfo1,
        dataType:'json',
        type:'post',
        data:{userId},
        success:function (data) {
            console.log(data);
            document.getElementById('personalContent').innerHTML=`<tr>
                    <td>${data.data[0].c_id}</td>
                    <td>${data.data[0].name}</td>
                    <td>${data.data[0].sex}</td>   
                    <td>${data.data[0].VIPcard}</td>   
                    <td>${data.data[0].phone}</td>   
                </tr>`
        },
        error:function (data) {
            console.log(data)
        }
    })
}
getInfo();
function  getfreeRoom() {
    $.ajax({
        url:API.getfreeRoom,
        datatype:'json',
        type:'get',
        success:function (data) {
            console.log(data.data);
            var content='';
            for(var i=0;i<data.data.length;i++){
                content+=`<tr>
                    <td class="number">${data.data[i].number}</td>
                    <td>${data.data[i].state}</td>
                    <td>${data.data[i].room_type}</td>
                    <td>${data.data[i].price}</td>
                    <td>${data.data[i].deposit}</td>
                </tr>`
            }
            document.getElementById('roomContent').innerHTML=content;
        },
        error:function (data) {
            console.log(data);
        }
    })
}
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

function checkIn() {
    var time = new Date().format("yyyy-MM-dd hh:mm:ss");
    console.log(time);
    var room=document.getElementById('checkIn').value;
    var c_id=$.cookie('userId');
    var number=document.querySelectorAll('.number');
    var state=0;
    for(var i=0;i<number.length;i++){
        if(number[i].innerText==room){
            state=1;
        }

    }
    if(state==0){
        alert('输入房间号有误');
    }else{
        $.ajax({
            url:API.checkin,
            type:'post',
            dataType:'json',
            data:{c_id,room,time},
            success:function (data) {
                console.log(data);
                getfreeRoom();
                alert('入住成功');
            },
            error:function (data) {
                console.log(data);
            }
        })
    }

}
function checkInInfo() {
    var userId=$.cookie('userId');
     $.ajax({
         url:API.checkInInfo,
         type:'post',
         dataType:'json',
         data:{userId},
         success:function (data) {
             console.log(data.data);
             var content='';
             for(var i=0;i<data.data.length;i++){
                 content+=`<tr>
                    <td class="number">${data.data[i].c_id}</td>
                    <td>${data.data[i].room}</td>
                    <td>${data.data[i].room_type}</td>
                    <td>${data.data[i].price}</td>
                    <td>${data.data[i].deposit}</td>
                    <td>${data.data[i].inTime}</td>
                    <td><button class="btn btn-danger" onclick="checkOut(this)">退房</button><button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="changeRoom(this)">换房</button></td>
                </tr>`
             }
             document.getElementById('livingInfo').innerHTML=content;
         },
         error:function (data) {
             console.log(data);
         }
     })
    $.ajax({
        url:API.historyInfo,
        type:'post',
        dataType:'json',
        data:{userId},
        success:function (data) {
            console.log(data.data);
            var content='';
            for(var i=0;i<data.data.length;i++){
                content+=`<tr>
                    <td class="number">${data.data[i].c_id}</td>
                    <td>${data.data[i].room}</td>
                    <td>${data.data[i].room_type}</td>
                    <td>${data.data[i].price}</td>
                    <td>${data.data[i].deposit}</td>
                    <td>${data.data[i].inTime}</td>
                    <td>${data.data[i].outTime}</td>
                </tr>`
            }
            document.getElementById('historyInfo').innerHTML=content;
        },
        error:function (data) {
            console.log(data);
        }
    })
}

function checkOut(e) {
    var c_id=e.parentNode.parentNode.firstChild.nextSibling.innerText;
    var room=e.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerText;
    var inTime=e.parentNode.previousSibling.previousSibling.innerText;
    var outTime=new Date().format("yyyy-MM-dd hh:mm:ss");
    $.ajax({
        url:API.checkout,
        type:'post',
        dataType:'json',
        data:{c_id,inTime,room,outTime},
        success:function (data) {
            console.log(data);
            checkInInfo();
        },
        error:function (data) {
            console.log(data);
        }
    })

}
var oldroom='';
function changeRoom(e) {
    oldroom=e.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerText;
}
function changeRoomBtn() {
    var newRoom=document.getElementById('newRoom').value;
    var number=document.querySelectorAll('.number');
    console.log(newRoom,oldroom);
    var state=0;
    for(var i=0;i<number.length;i++){
        if(number[i].innerText==newRoom){
            state=1;
        }
    }
    if(state==0){
        alert('输入房间号有误');
    }else {
        $.ajax({
            url:API.changeRoom,
            type:'post',
            dataType:'json',
            data:{oldroom,newRoom},
            success:function (data) {
                console.log(data);
                alert('换房成功');
                document.getElementById('close').click();
                checkInInfo();
            },
            error:function (data) {
                console.log(data)
            }
        })
    }
}