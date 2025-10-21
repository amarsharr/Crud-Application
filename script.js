document.addEventListener("DOMContentLoaded", () => {
  var form = document.getElementById("employee-form");
  var employeeList = document.getElementById("employee-list");

  let employees = [];

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();
    const department = document.getElementById("department").value.trim();

    if (name && email && age && department) {
      const employee = { id: Date.now(), name, email, age, department };
      employees.push(employee);
      renderEmployees();
      form.reset();
    }
  });

  function renderEmployees() {
    employeeList.innerHTML = "";
    employees.forEach((employee) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${employee.name}</td>
          <td>${employee.email}</td>
          <td>${employee.age}</td>
          <td>${employee.department}</td>
          <td class="actions">
            <button class="edit" onclick="editEmployee(${employee.id})">Edit</button>
            <button class="delete" onclick="deleteEmployee(${employee.id})">Delete</button>
          </td>
        `;
      employeeList.appendChild(row);
    });
  }

  window.editEmployee = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
      document.getElementById("name").value = employee.name;
      document.getElementById("email").value = employee.email;
      document.getElementById("age").value = employee.age;
      document.getElementById("department").value = employee.department;

      employees = employees.filter((emp) => emp.id !== id);
      renderEmployees();
    }
  };

  window.deleteEmployee = (id) => {
    employees = employees.filter((emp) => emp.id !== id);
    renderEmployees();
  };
});