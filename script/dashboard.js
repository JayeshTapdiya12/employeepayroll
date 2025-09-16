document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("employee"));
    console.log(data);

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
});

function deleteemp(index) {
    const emp = JSON.parse(localStorage.getItem("employee")) || [];
    emp.splice(index, 1);
    localStorage.setItem("employee", JSON.stringify(emp));
    location.reload();
}