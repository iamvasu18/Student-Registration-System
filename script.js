let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

function displayStudents(filteredList = null) {
  const tbody = document.querySelector("#studentTable tbody");
  tbody.innerHTML = "";

  const data = filteredList || students;
  data.forEach((student, index) => {
    const row = `<tr>
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.class}</td>
      <td>${student.address}</td>
      <td>${student.contact}</td>
      <td>${student.email}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const id = document.getElementById("id").value.trim();
  const className = document.getElementById("studentClass").value.trim();
  const address = document.getElementById("address").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const email = document.getElementById("email").value.trim();

  const student = { name, id, class: className, address, contact, email };

  if (editIndex !== null) {
    students[editIndex] = student;
    editIndex = null;
  } else {
    students.push(student);
  }

  localStorage.setItem("students", JSON.stringify(students));
  this.reset();
  displayStudents();
});

function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("id").value = student.id;
  document.getElementById("studentClass").value = student.class;
  document.getElementById("address").value = student.address;
  document.getElementById("contact").value = student.contact;
  document.getElementById("email").value = student.email;
  editIndex = index;
}

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
  }
}

document.getElementById("searchBox").addEventListener("input", function () {
  const searchText = this.value.toLowerCase();
  const filtered = students.filter(s => s.name.toLowerCase().includes(searchText));
  displayStudents(filtered);
});

window.onload = displayStudents;
