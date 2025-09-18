// document.getElementById("Payroll").addEventListener('submit', function (event) {
//     event.preventDefault();

//     const formdata = validateFormData();
//     if (!formdata) return;

//     console.log("the data is saved in the local stroage");
//     localStorage.setItem("employee", JSON.stringify(formdata));
//     document.getElementById("Payroll").reset();

// })

// document.getElementById("Payroll").addEventListener('reset', function (event) {
//     document.getElementById("Payroll").reset();

// });

// document.getElementById('cancel').addEventListener('click', function (event) {
//     event.preventDefault();
//     document.getElementById("Payroll").reset();
//     window.location.replace("http://127.0.0.1:5500/pages/dashborad.html");
// });

// function validateFormData() {
//     console.log("Validating form data...");

//     const name = document.getElementById("name").value.trim();
//     console.log("Name:", name);

//     if (name === "") {
//         console.log("Name is empty");
//         alert("Name is not present");
//         return false;
//     }

//     const profile = document.querySelector('input[name="profile"]:checked');
//     if (!profile) {
//         console.log("Profile is not selected");
//         alert("Select the profile photo");
//         return false;
//     }

//     const gender = document.querySelector('input[name="gender"]:checked');
//     if (!gender) {
//         console.log("Gender is not selected");
//         alert("Please select the gender");
//         return false;
//     }

//     const departmentElements = document.querySelectorAll('input[name="department"]:checked');
//     const department = Array.from(departmentElements).map(el => el.value);
//     console.log("Departments selected:", department);
//     if (department.length === 0) {
//         console.log("Department is not selected");
//         alert("Please select the department");
//         return false;
//     }

//     const date = document.getElementById("date").value;
//     console.log("Date:", date);
//     if (date === "") {
//         console.log("Date is empty");
//         alert("Please select the date");
//         return false;
//     }

//     const month = document.getElementById("month").value;
//     console.log("Month:", month);
//     if (month === "") {
//         console.log("Month is empty");
//         alert("Please select the month");
//         return false;
//     }

//     const year = document.getElementById("year").value;
//     console.log("Year:", year);
//     if (year === "") {
//         console.log("Year is empty");
//         alert("Please select the year");
//         return false;
//     }

//     const salary = document.querySelector('select[name="salary"]').value;
//     console.log("Salary:", salary);
//     if (salary === "") {
//         console.log("Salary is empty");
//         alert("Please select the salary");
//         return false;
//     }

//     const note = document.querySelector("textarea").value;
//     console.log("Note:", note);
//     if (note === "") {
//         console.log("Note is empty");
//         alert("Please enter the note");
//         return false;
//     }

//     const startdate = `${date}/${month}/${year}`;
//     console.log("Start date:", startdate);

//     const emp = {
//         name,
//         profile: profile.value,
//         gender: gender.value,
//         department,
//         salary,
//         startdate,
//         note
//     }

//     const employees = JSON.parse(localStorage.getItem("employee")) || [];
//     employees.push(emp);
//     return employees;
// }


console.log($)

$(document).ready(function () {
    $("#Payroll").on("submit", function (e) {
        e.preventDefault();
        const formdata = validateFormData();
        if (!formdata) return;

        console.log("the data is saved in the local storage");
        // localStorage.setItem("empolyee", JSON.stringify(formdata));
        $.ajax({
            url: 'http://localhost:3000/empolyee',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formdata),
            success: function (response) {
                console.log("Data successfully added:", response);
            },
            error: function (error) {
                console.error("Error while adding data:", error);
            }
        });
        // })

        $("#Payroll")[0].reset();
        window.location.replace("http://127.0.0.1:5500/pages/dashborad.html"); // Correct the URL if needed

    })





    $("#Payroll").on("reset", function (e) {
        $("#Payroll")[0].reset();
    })
    $("#cancel").on("click", function (e) {
        e.preventDefault();
        $("#Payroll")[0].reset();
        window.location.replace("http://127.0.0.1:5500/pages/dashborad.html"); // Correct the URL if needed
    });


    function validateFormData() {
        const name = $('#name').val().trim();
        console.log(name);

        const pattern = /^[a-z\s]+$/;
        if (!name.match(pattern)) {
            alert("the name is not correct")
            console.log("the name is not correct")
            return false;
        }


        const profile = $("input[name='profile']:checked").val();
        if (!profile) {
            alert("add the profile photo");
            return false;
        }
        console.log("Profile:", profile);

        const gender = $("input[name='gender']:checked").val();
        if (!gender) {
            alert("enter your gender");
            return false;
        }
        console.log("Gender:", gender);

        const department = $('input[name="department"]:checked').map(function () {
            return $(this).val();
        }).get();

        if (department.length === 0) {
            alert("please select a department");
            return false;
        }

        const date = $("#date").val();

        const month = $("#month").val();

        const year = $("#year").val();
        if (!date || !month || !year) {
            alert("Please select a complete date (day, month, and year).");
            return false;
        }


        const dateObj = new Date(year, month - 1, date);

        // Check if the date, month, and year are correct.
        if (dateObj.getDate() !== parseInt(date) || dateObj.getMonth() + 1 !== parseInt(month) || dateObj.getFullYear() !== parseInt(year)) {
            alert("The selected joining date is invalid.");
            return false;
        }
        const salary = $('select[name="salary"]').val();
        if (salary === "") {
            alert("please select a salary");
            return false;
        }
        const note = $("textarea").val();
        if (note === "") {
            alert("please write something in the note");
            return false;
        }
        const startdate = `${date}/${month}/${year}`;
        const emp = {
            name,
            profile,
            gender,
            department,
            salary,
            startdate,
            note
        };

        // const employees = JSON.parse(localStorage.getItem("empolyee")) || [];
        // employees.push(emp);

        return emp;
    }
})
