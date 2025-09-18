// document.addEventListener("DOMContentLoaded", () => {
//     const data = JSON.parse(localStorage.getItem("employee"));
//     console.log(data);

//     const tableBody = document.getElementById("emp-data");
//     const search = document.getElementById("search");

//     search.addEventListener("input", (e) => {
//         const query = e.target.value.toLowerCase();

//         const filteredData = data.filter(c =>
//             c.name.toLowerCase().includes(query) ||
//             c.gender.toLowerCase().includes(query) ||
//             c.department.some(dep => dep.toLowerCase().includes(query)) ||
//             c.salary.toLowerCase().includes(query) ||
//             c.startdat e.toLowerCase().includes(query)
//         );

//         redendertable(filteredData);
//     });

//     tableBody.innerHTML = "";

//     data.forEach((user, index) => {
//         const row = document.createElement("tr");

//         row.innerHTML = `<td><img src=${user.profile
//             }  alt="logo of the emp" width="50" style="border-radius:20px ;" /> <span>${user.name
//             }</span></td>
//         <td>${user.gender}</td>
//         <td>
//         <div class="departments">
//         <div class="departments d-flex flex-wrap gap-2">
//     ${user.department
//                 .map((dep) => `<p class="department ">${dep}</p>`)
//                 .join("")}
// </div>
//         </div>

//         </td>
//         <td>
//         <i class="fa-solid fa-indian-rupee-sign"> </i>${user.salary}
//         </td>
//         <td>
//         ${user.startdate}
//         </td>
//         <td>
//                                 <div class="tdbutton">
//                                     <i class="fa-solid fa-trash" onclick=deleteemp(${index}) ></i>
//                                     <i class="fa-sharp fa-solid fa-pencil"></i>
//                                 </div>
//                             </td>
//         `;
//         tableBody.appendChild(row);
//     });
// });



// function redendertable(data) {
//     const tableBody = document.getElementById("emp-data");

//     tableBody.innerHTML = "";

//     data.forEach((user, index) => {
//         const row = document.createElement("tr");

//         row.innerHTML = `<td><img src=${user.profile
//             }  alt="logo of the emp" width="50" style="border-radius:20px ;" /> <span>${user.name
//             }</span></td>
//         <td>${user.gender}</td>
//         <td>
//         <div class="departments">
//         <div class="departments d-flex flex-wrap gap-2">
//     ${user.department
//                 .map((dep) => `<p class="department ">${dep}</p>`)
//                 .join("")}
// </div>
//         </div>

//         </td>
//         <td>
//         <i class="fa-solid fa-indian-rupee-sign"> </i>${user.salary}
//         </td>
//         <td>
//         ${user.startdate}
//         </td>
//         <td>
//                                 <div class="tdbutton">
//                                     <i class="fa-solid fa-trash" onclick=deleteemp(${index}) ></i>
//                                     <i class="fa-sharp fa-solid fa-pencil"></i>
//                                 </div>
//                             </td>
//         `;
//         tableBody.appendChild(row);
//     });
//     // location.reload()
// }


// function deleteemp(index) {
//     const emp = JSON.parse(localStorage.getItem("employee")) || [];
//     emp.splice(index, 1);
//     localStorage.setItem("employee", JSON.stringify(emp));
//     location.reload();
// }

$(document).ready(function () {

    // const data = JSON.parse(localStorage.getItem("empolyee")) || [];
    let data;
    $.ajax({
        url: 'http://localhost:3000/empolyee',
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            data = (response);
            renderTable(data);

            console.log("Data successfully added:", response);
        },
        error: function (error) {
            console.error("Error while adding data:", error);
        }
    });
    console.log(data);

    if (data) {
    }

    $("#search").on("input", function () {
        const query = $(this).val();
        const filterData = data.filter(emp =>
            emp.name.toLowerCase().includes(query.toLowerCase())
        );
        renderTable(filterData);
    });


    $(document).on("click", ".delete-btn", function () {
        const index = $(this).data("index");
        console.log(index)
        data.splice(index, 1);
        $.ajax({
            url: `http://localhost:3000/empolyee/${index}`,
            type: 'DELETE',
            contentType: 'application/json',
            success: function (response) {
                console.log("Data successfully added:", response);
            },
            error: function (error) {
                console.error("Error while adding data:", error);
            }
        });
        // localStorage.setItem("empolyee", JSON.stringify(data));
        renderTable(data)
    });


    function renderTable(empdata) {
        console.log(empdata)
        const $tablebody = $("#emp-data");
        $tablebody.empty();

        empdata.forEach((user, index) => {
            const row = `
                <tr>
                    <td>
                        <img src="${user.profile}" alt="logo of the emp" width="50" style="border-radius:20px;" /> 
                        <span>${user.name}</span>
                    </td>
                    <td>${user.gender}</td>
                    <td>
                        <div class="departments d-flex flex-wrap gap-2">
                            ${user.department.map(dep => `<p class="department">${dep}</p>`).join("")}
                        </div>
                    </td>
                    <td><i class="fa-solid fa-indian-rupee-sign"></i> ${user.salary}</td>
                    <td>${user.startdate}</td>
                    <td>
                        <div class="tdbutton">
                            <i class="fa-solid fa-trash delete-btn" data-index="${user.id}")></i>
                            <i class="fa-sharp fa-solid fa-pencil"></i>
                        </div>
                    </td>
                </tr>
            `;
            $tablebody.append(row);
        });
    }



});
