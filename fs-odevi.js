const fs = require("fs");

const createEmployee = () => {
  const employeeData = {
    name: "Employee 1 Name",
    salary: 2000,
  };

  fs.writeFileSync("employees.json", JSON.stringify(employeeData));
  console.log("Veri başarıyla oluşturuldu.");
};

const readEmployee = () => {
  const data = fs.readFileSync("employees.json", "utf-8");
  const employee = JSON.parse(data);
  console.log("Okunan veri:", employee);
};

const updateEmployee = () => {
  const data = fs.readFileSync("employees.json", "utf-8");
  const employee = JSON.parse(data);
  employee.salary = 2500;

  fs.writeFileSync("employees.json", JSON.stringify(employee));
  console.log("Veri başarıyla güncellendi.");
};

const deleteEmployee = () => {
  fs.unlinkSync("employees.json");
  console.log("Dosya başarıyla silindi.");
};

createEmployee();
readEmployee();
updateEmployee();
deleteEmployee();
