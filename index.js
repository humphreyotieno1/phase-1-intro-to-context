// Helper function to calculate hours between two time strings
function calculateHoursWorked(timeIn, timeOut) {
    const inHour = parseInt(timeIn.slice(-4));
    const outHour = parseInt(timeOut.slice(-4));
    return (outHour - inHour) / 100;
}

// Helper function to calculate wages for a given number of hours and pay rate
function calculateWages(hours, payPerHour) {
    return hours * payPerHour;
}

// Function to create an employee record
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create an array of employee records from an array of arrays
function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
}

// Function to create a timeIn event for an employee
function createTimeInEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    employee.timeInEvents.push({ type: 'TimeIn', date, hour: parseInt(hour) });
    return employee;
}

// Function to create a timeOut event for an employee
function createTimeOutEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    employee.timeOutEvents.push({ type: 'TimeOut', date, hour: parseInt(hour) });
    return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return calculateHoursWorked(timeIn.hour.toString(), timeOut.hour.toString());
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return calculateWages(hoursWorked, employee.payPerHour);
}

// Function to calculate total wages for an employee
function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
}

// Function to calculate total payroll for an array of employees
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}

// Example usage
let employeeRecords = createEmployeeRecords([
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
]);

// Add timeIn and timeOut events for testing
employeeRecords.forEach(employee => {
    createTimeInEvent(employee, "2018-01-01 0800");
    createTimeOutEvent(employee, "2018-01-01 1600");
});

console.log(calculatePayroll(employeeRecords)); // Output: 10875