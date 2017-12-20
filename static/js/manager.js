function getInfo() {
    var userId=$.cookie('userId');
    $.ajax({
        url:API.getInfo3,
        dataType:'json',
        type:'post',
        data:{userId},
        success:function (data) {
            console.log(data);
            document.getElementById('personalContent').innerHTML=`<tr>
                    <td>${data.data[0].m_id}</td>
                    <td>${data.data[0].name}</td>
                    <td>${data.data[0].sex}</td>   
                </tr>`
        },
        error:function (data) {
            console.log(data)
        }
    })
}
getInfo();

function getRoom() {
    $.ajax({
        url:API.getRoom,
        type:'get',
        datatype:'json',
        success:function (data) {
            console.log(data.data);
            var content='';
            for(var i=0;i<data.data.length;i++){
                content+=`<tr>
                    <td>${data.data[i].number}</td>
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
var arr=[];
function getAllInfo() {
    $.ajax({
        url:API.getAllInfo,
        type:'get',
        datatype:'json',
        success:function (data) {
            console.log(data.data);

            var content='';
            for(var i=0;i<data.data.length;i++){
                content+=`<tr>
                    <td>${data.data[i].e_id}</td>
                    <td>${data.data[i].name}</td>
                    <td>${data.data[i].salary}</td>
                    <td>${data.data[i].sex}</td>
                </tr>`;
                arr[i]=data.data[i].e_id;
            }
            document.getElementById('employeeContent').innerHTML=content;

        },
        error:function (data) {
            console.log(data)
        }
    })
}
var state=0;
function changeSalary() {
    var id=document.querySelectorAll('input')[0].value;
    var salary=document.querySelectorAll('input')[1].value;
    state=0;
    for(var i=0;i<arr.length;i++){
        if(arr[i]==id){
            state=1;
        }
    }
    if(id==''||salary<0){
        alert('输入信息格式有误');
    }else if(state==1){
        $.ajax({
            url:API.changeSalary,
            type:'post',
            dataType:'json',
            data:{id,salary},
            success:function (data) {
                console.log(data);
                if(data.status==200){
                    alert('修改成功');
                }else if(data.status==300){
                    alert('输入信息有误')
                }
            },
            error:function (data) {
                console.log(data)
            }
        })
    }else{
        alert('没有对应的编号');
    }

}

function getCheckInInfo() {
    $.ajax({
        url:API.getAllClientInfo,
        type:'get',
        datatype:'json',
        success:function (data) {
            console.log(data.data);

            var content='';
            for(var i=0;i<data.data.length;i++){
                content+=`<tr>
                    <td>${data.data[i].c_id}</td>
                    <td>${data.data[i].name}</td>
                    <td>${data.data[i].room}</td>
                    <td>${data.data[i].inTime}</td>
                    <td>${data.data[i].outTime}</td>
                </tr>`;
            }
            document.getElementById('content').innerHTML=content;

        },
        error:function (data) {
            console.log(data);
        }
    })
}