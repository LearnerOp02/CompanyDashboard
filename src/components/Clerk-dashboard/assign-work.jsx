import React, { useEffect, useState } from "react";

const AssignWork = () => {
  const [companies, setCompanies] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [projectLeader, setProjectLeader] = useState(null);
  const [message, setMessage] = useState("");
  const [noProjectsMessage, setNoProjectsMessage] = useState("");
  const [step, setStep] = useState("company"); // 'company', 'project', or 'employee'

  // Fetch companies (from projects table)
  useEffect(() => {
    fetch("http://localhost/login-backend/get_companies.php")
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error("Error fetching companies:", error));
  }, []);

  // Fetch employee names
  useEffect(() => {
    fetch("http://localhost/login-backend/fetchemployees.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.log(data.message);
        } else {
          setEmployees(data);
        }
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setStep("project"); // Navigate to project step
    setSelectedProject(null);
    setSelectedEmployees([]);

    // Fetch projects for the selected company
    fetch(`http://localhost/login-backend/get_client_projects.php?client_id=${company.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setProjects(data);
          setNoProjectsMessage("");
        } else {
          setProjects([]);
          setNoProjectsMessage(`No projects found for ${company.client_name}`);
        }
      })
      .catch((error) => console.error("Error fetching projects:", error));
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setStep("employee"); // Navigate to employee step
  };

  const handleBack = () => {
    if (step === "employee") setStep("project");
    else if (step === "project") setStep("company");
  };

  const handleAssign = () => {
    const data = {
      project_id: selectedProject.id,
      employee_ids: selectedEmployees, // Pass the entire array of selected employee IDs
      project_leader: projectLeader,
      message: message,
    };
  
    // Send the data to the PHP backend using fetch
    fetch("http://localhost/login-backend/assign_project.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert(`Project "${selectedProject.project_name}" assigned successfully!`);
  
          // Reset states after successful assignment
          setStep("company");
          setSelectedCompany(null);
          setSelectedProject(null);
          setSelectedEmployees([]);
          setProjectLeader(null);
          setMessage("");
        } else {
          alert(`Error: ${result.message}`);
        }
      })
      .catch((error) => {
        console.error("Error assigning project:", error);
        alert("Failed to assign project. Please try again later.");
      });
  };
  
  

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className="text-xl font-semibold">Assign Work</h3>
      {step !== "company" && (
        <button
          onClick={handleBack}
          className="text-blue-500 font-semibold mb-4"
        >
          ← Back
        </button>
      )}

      {step === "company" && (
        <div>
          <label className="block mb-2">Select Company:</label>
          {companies.map((company) => (
            <div key={company.id} className="mb-4">
              <h4
                className="font-bold cursor-pointer"
                onClick={() => handleCompanySelect(company)}
              >
                {company.client_name}
              </h4>
            </div>
          ))}
        </div>
      )}

      {step === "project" && (
        <div>
          <h4 className="font-bold mb-4">Company: {selectedCompany.client_name}</h4>
          <label className="block mb-2">Select Project:</label>
          {projects.length > 0 ? (
            projects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleProjectSelect(project)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-2"
              >
                {project.project_name}
              </button>
            ))
          ) : (
            <p className="text-red-500">{noProjectsMessage}</p>
          )}
        </div>
      )}

{step === "employee" && (
  <div>
    <h4 className="font-bold mb-4">Project: {selectedProject.project_name}</h4>

    <label className="block mb-2">Select Employees:</label>
    {employees.map((employee, index) => (
      <div key={index} className="mb-2">
        <label>
          <input
            type="checkbox"
            value={employee.id} // Use employee.id as the value
            onChange={(e) => {
              const id = e.target.value; // This will now hold the employee's ID
              setSelectedEmployees((prev) =>
                e.target.checked
                  ? [...prev, id] // Add employee ID to selectedEmployees
                  : prev.filter((empId) => empId !== id) // Remove employee ID from selectedEmployees
              );
            }}
          />
          {employee.username} {/* Display username as label */}
        </label>
      </div>
    ))}

    <label className="block mb-2 mt-4">Select Project Leader:</label>
    <select
      className="border rounded w-full p-2"
      value={projectLeader || ""} // The value will be the employee ID
      onChange={(e) => setProjectLeader(e.target.value)} // Set the selected employee's ID
    >
      <option value="">--Select Leader--</option>
      {employees.map((employee, index) => (
        <option key={index} value={employee.id}> {/* Use employee.id as the value */}
          {employee.username} {/* Display username in the dropdown */}
        </option>
      ))}
    </select>

    <label className="block mb-2 mt-4">Message:</label>
    <textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="border rounded w-full p-2"
      rows="3"
    />

    <button
      onClick={handleAssign}
      className="bg-green-500 text-white px-4 py-2 rounded mt-4"
    >
      Assign Project
    </button>
  </div>
)}
    </div>
  );
};

export default AssignWork;