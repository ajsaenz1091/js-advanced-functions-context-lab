/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
function createEmployeeRecord(employeeInfo){
    class EmployeeObj{
        constructor(firstName,familyName,title,payPerHour){
        this.firstName = firstName,
        this.familyName = familyName,
        this.title = title,
        this.payPerHour = payPerHour,
        this.timeInEvents = [],
        this.timeOutEvents = []
        }
    }
    let employeeRecord = new EmployeeObj(...employeeInfo)
    return employeeRecord
}

function createEmployeeRecords(arrayOfRecords){
    const employeeRecords = arrayOfRecords.map(employee => {
        return createEmployeeRecord(employee);
    })
    return employeeRecords;
}

function createTimeInEvent(dateStamp){
    class TimeInEvent {
        constructor(type,hour,date){
            this.type = type,
            this.hour = hour,
            this.date = date
        }
    }
    //* CREATE NEW TIME IN EVENT TO UPDATE THE OBJECT PASSED AS "THIS" (EMPLOYEE OBJECT)
    const newEvent = new TimeInEvent("TimeIn",parseInt(dateStamp.split(' ')[1]), dateStamp.split(' ')[0])
    //!---------------FIRST ARGUMENT IN CALL WILL BECOME  "this" ---------------------------                               
    //?---------------------------------------------------- || -----------------------------
    //?---------------------------------------------------- \/ -----------------------------
    //* FUNCTION WAS CALLED LIKE createTimeInEvent.call(bpRecord, "2014-02-28 1400") IN TEST
    //?---------------------------------------------------- /\ -----------------------------
    //?---------------------------------------------------- || -----------------------------
    //!------------------------ "this" IS REFERENCING   "bpRecord" -------------------------
    //* GO INTO "bpRecord" = this, find property timeInEvents and push the previously created event.
    this.timeInEvents.push(newEvent)
    //* ONCE UPDATED, RETURN "bpRecord" = this
    return this
}

function createTimeOutEvent(dateStamp){
    class TimeOutEvent {
        constructor(type,hour,date){
            this.type = type,
            this.hour = hour,
            this.date = date
        }
    }
    //* CREATE NEW TIME IN EVENT TO UPDATE THE OBJECT PASSED AS "THIS" (EMPLOYEE OBJECT)
    const newEvent = new TimeOutEvent("TimeOut",parseInt(dateStamp.split(' ')[1]), dateStamp.split(' ')[0])
    //!---------------FIRST ARGUMENT IN CALL WILL BECOME  "this" ---------------------------                               
    //?---------------------------------------------------- || -----------------------------
    //?---------------------------------------------------- \/ -----------------------------
    //* FUNCTION WAS CALLED LIKE     createTimeOutEvent(bpRecord, "2015-02-28 1700") IN TEST
    //?---------------------------------------------------- /\ -----------------------------
    //?---------------------------------------------------- || -----------------------------
    //!------------------------ "this" IS REFERENCING   "bpRecord" -------------------------
    //* GO INTO "bpRecord" = this, find property timeInEvents and push the previously created event.
    this.timeOutEvents.push(newEvent)
    //* ONCE UPDATED, RETURN "bpRecord" = this
    return this
}

function hoursWorkedOnDate(matchDate){
    //* FIND TIME IN EVENT THAT MATCHES THE DATE PASSED
    let timeInEvent = this.timeInEvents.find(event => {
        return event.date === matchDate;
    })
    //* FIND TIME OUT EVENT THAT MATCHES THE DATE PASSED
    let timeOutEvent = this.timeOutEvents.find(event => {
        return event.date === matchDate;
    })
    //* CALCULATE HOURS
    let hoursWorked = Math.abs(timeInEvent.hour - timeOutEvent.hour) / 100;

    return hoursWorked
}

function wagesEarnedOnDate(date){
    //* THEY CALL MY FUNCTION USING wagesEarnedOnDate.call(cRecord, "44-03-15")
    //! "this" is bound to "cRecord". Whenever I use "this" inside my function, I will be refereing to "cRecord" 
    let hours = hoursWorkedOnDate.call(this,date) //* I am passing "cRecord" as "this"
    return hours * this.payPerHour;
}

// let allWagesFor = function () {
//     let eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     let payable = eligibleDates.reduce(function (memo, d) {
//         console.log(this)
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

function  allWagesFor(){
    let wages = this.timeInEvents.reduce((acc,event) => {
        return acc + wagesEarnedOnDate.call(this, event.date)
    },0) 
    return wages;
}

function findEmployeeByFirstName(empRecords, firstName){
    let empRecord = empRecords.find(record => {
        return record.firstName === firstName;
    })
    return empRecord;
}

function calculatePayroll(empRecords){
    let payrollTotal = empRecords.reduce((acc, record) => {
        return acc + allWagesFor.call(record);
    },0)
    return payrollTotal;
}