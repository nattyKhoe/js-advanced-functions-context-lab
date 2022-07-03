/* Your Code Here */
let createEmployeeRecord = function (employeeArray) {
    return {
        "firstName" : employeeArray[0],
        "familyName" : employeeArray[1],
        "title": employeeArray[2],
        "payPerHour": employeeArray[3],
        "timeInEvents": [],
        "timeOutEvents": []
    }
};

let createEmployeeRecords = function (employeeArrays) {
    let employeeRecords = [];
    employeeArrays.forEach(element => {
        employeeRecords.push(createEmployeeRecord(element));
    });
    return employeeRecords;
};

let createTimeInEvent = function (dateStamp) {
    let dateRecord = dateStamp.split(" ");
    let newTimeInRecord = {
        "type" : "TimeIn",
        "hour"  : parseFloat(dateRecord[1]),
        "date"  : dateRecord[0]
    };
    this.timeInEvents.push(newTimeInRecord);
    return this;
};

let createTimeOutEvent = function (dateStamp) {
    let dateRecord = dateStamp.split(" ");
    let newTimeOutRecord = {
        "type" : "TimeOut",
        "hour"  : parseFloat(dateRecord[1]),
        "date"  : dateRecord[0]
    };
    this.timeOutEvents.push(newTimeOutRecord);
    return this;
};


let hoursWorkedOnDate = function (date){
    let hours = 0;
    for ( let i = 0; i < this.timeInEvents.length; i++){
        if (this.timeInEvents[i].date === date){
            let dailyHour = (this.timeOutEvents[i].hour - this.timeInEvents[i].hour);
            hours += (Math.floor(dailyHour/100)+( (dailyHour % 100) /60));
        };
    };

    return hours;
};

let wagesEarnedOnDate = function (date){

    return hoursWorkedOnDate.call (this, date) * this.payPerHour;

};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
}

let calculatePayroll = function (array) {
    let expense = 0;

    for (let i = 0; i < array.length; i++){
    
        expense += allWagesFor.call (array[i]);
        
    };

    return expense;
};

let findEmployeeByFirstName = function (srcArray, firstName){
    for (let i =0; i < srcArray.length; i++){
        if (srcArray[i].firstName === firstName){
            return srcArray[i];
        }
    }
}