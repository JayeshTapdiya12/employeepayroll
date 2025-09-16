document.getElementById("Payroll").addEventListener('submit', function (event) {
    event.preventDefault();

    const formdata = validateFormData();
    if (!formdata) return;

    console.log("the data is saved in the local stroage");
    localStorage.setItem("employee", JSON.stringify(formdata));
    document.getElementById("Payroll").reset();

})

function validateFormData() {
    console.log("Validating form data...");

    const name = document.getElementById("name").value.trim();
    console.log("Name:", name);

    if (name === "") {
        console.log("Name is empty");
        alert("Name is not present");
        return false;
    }

    const profile = document.querySelector('input[name="profile"]:checked');
    if (!profile) {
        console.log("Profile is not selected");
        alert("Select the profile photo");
        return false;
    }

    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        console.log("Gender is not selected");
        alert("Please select the gender");
        return false;
    }

    const departmentElements = document.querySelectorAll('input[name="department"]:checked');
    const department = Array.from(departmentElements).map(el => el.value);
    console.log("Departments selected:", department);
    if (department.length === 0) {
        console.log("Department is not selected");
        alert("Please select the department");
        return false;
    }

    const date = document.getElementById("date").value;
    console.log("Date:", date);
    if (date === "") {
        console.log("Date is empty");
        alert("Please select the date");
        return false;
    }

    const month = document.getElementById("month").value;
    console.log("Month:", month);
    if (month === "") {
        console.log("Month is empty");
        alert("Please select the month");
        return false;
    }

    const year = document.getElementById("year").value;
    console.log("Year:", year);
    if (year === "") {
        console.log("Year is empty");
        alert("Please select the year");
        return false;
    }

    const salary = document.querySelector('select[name="salary"]').value;
    console.log("Salary:", salary);
    if (salary === "") {
        console.log("Salary is empty");
        alert("Please select the salary");
        return false;
    }

    const note = document.querySelector("textarea").value;
    console.log("Note:", note);
    if (note === "") {
        console.log("Note is empty");
        alert("Please enter the note");
        return false;
    }

    const startdate = `${date}/${month}/${year}`;
    console.log("Start date:", startdate);

    const emp = {
        name,
        profile: profile.value,
        gender: gender.value,
        department,
        salary,
        startdate,
        note
    }

    const employees = JSON.parse(localStorage.getItem("employee")) || [];
    employees.push(emp);
    return employees;
}