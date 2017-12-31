
const prefix='http://localhost:3000'

const API={
    
    login:`${prefix}/login`,
    test:`${prefix}/test`,

    //顾客
    getfreeRoom:`${prefix}/client/getfreeRoom`,
    checkin:`${prefix}/client/checkIn`,
    checkout:`${prefix}/client/checkout`,
    getInfo1:`${prefix}/client/getInfo`,
    checkInInfo:`${prefix}/client/checkInInfo`,
    historyInfo:`${prefix}/client/historyInfo`,
    changeRoom:`${prefix}/client/changeRoom`,
    //员工
    getRoom:`${prefix}/employee/getRoom`,
    getInfo2:`${prefix}/employee/getInfo`,
    getCheckIn:`${prefix}/employee/getCheckIn`,
    //管理员
    getAllInfo:`${prefix}/manager/getAllInfo`,
    getInfo3:`${prefix}/manager/getInfo`,
    changeSalary:`${prefix}/manager/changeSalary`,
    getAllClientInfo:`${prefix}/manager/getAllClientInfo`,
}
export default  API;