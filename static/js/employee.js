function getInfo() {
    var userId=$.cookie('userId');
    $.ajax({
        url:API.getInfo2,
        dataType:'json',
        type:'post',
        data:{userId},
        success:function (data) {
            console.log(data);
            document.getElementById('personalContent').innerHTML=`<tr>
                    <td>${data.data[0].e_id}</td>
                    <td>${data.data[0].name}</td>
                    <td>${data.data[0].salary}</td>   
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
function getCheckIn() {
    $.ajax({
        url:API.getCheckIn,
        type:'get',
        dataType:'json',
        success:function (data) {
            console.log(data.data);
            var content='';
            for(var i=0;i<data.data.length;i++){
                content+=`<tr>
                    <td>${data.data[i].c_id}</td>
                    <td>${data.data[i].name}</td>
                    <td>${data.data[i].room}</td>
                    <td>${data.data[i].inTime}</td>
                </tr>`
            }
            document.getElementById('content').innerHTML=content;
        },
        error:function (data) {
            console.log(data);
        }
    })
}