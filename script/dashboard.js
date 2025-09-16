document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("employee"));
    console.log(data);

    const tableBody = document.getElementById("emp-data");
    const search = document.getElementById("search");

    search.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();

        const filteredData = data.filter(c =>
            c.name.toLowerCase().includes(query) ||
            c.gender.toLowerCase().includes(query) ||
            c.department.some(dep => dep.toLowerCase().includes(query)) ||
            c.salary.toLowerCase().includes(query) ||
            c.startdate.toLowerCase().includes(query)
        );

        redendertable(filteredData);
    });

    tableBody.innerHTML = "";

    data.forEach((user, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `<td><img src=${user.profile
            }  alt="logo of the emp" width="50" style="border-radius:20px ;" /> <span>${user.name
            }</span></td>
        <td>${user.gender}</td>
        <td>
        <div class="departments">
        <div class="departments d-flex flex-wrap gap-2">
    ${user.department
                .map((dep) => `<p class="department ">${dep}</p>`)
                .join("")}
</div>
        </div>
        
        </td>
        <td>
        <i class="fa-solid fa-indian-rupee-sign"> </i>${user.salary}
        </td>
        <td>
        ${user.startdate}
        </td>
        <td>
                                <div class="tdbutton">
                                    <i class="fa-solid fa-trash" onclick=deleteemp(${index}) ></i>
                                    <i class="fa-sharp fa-solid fa-pencil"></i>
                                </div>
                            </td>
        `;
        tableBody.appendChild(row);
    });
});



function redendertable(data) {
    const tableBody = document.getElementById("emp-data");

    tableBody.innerHTML = "";

    data.forEach((user, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `<td><img src=${user.profile
            }  alt="logo of the emp" width="50" style="border-radius:20px ;" /> <span>${user.name
            }</span></td>
        <td>${user.gender}</td>
        <td>
        <div class="departments">
        <div class="departments d-flex flex-wrap gap-2">
    ${user.department
                .map((dep) => `<p class="department ">${dep}</p>`)
                .join("")}
</div>
        </div>
        
        </td>
        <td>
        <i class="fa-solid fa-indian-rupee-sign"> </i>${user.salary}
        </td>
        <td>
        ${user.startdate}
        </td>
        <td>
                                <div class="tdbutton">
                                    <i class="fa-solid fa-trash" onclick=deleteemp(${index}) ></i>
                                    <i class="fa-sharp fa-solid fa-pencil"></i>
                                </div>
                            </td>
        `;
        tableBody.appendChild(row);
    });
    // location.reload()
}


function deleteemp(index) {
    const emp = JSON.parse(localStorage.getItem("employee")) || [];
    emp.splice(index, 1);
    localStorage.setItem("employee", JSON.stringify(emp));
    location.reload();
}