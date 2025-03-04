import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login/Login";
import ClerkDashboard from "./components/Clerk-dashboard/Clerk-dashboard";
import ClientManagement from "./components/Clerk-dashboard/ClientManagement";
import ProjectManagement from "./components/Clerk-dashboard/ProjectManagement";
import ProjectDetail from "./components/Clerk-dashboard/ProjectDetail";
import GenerateQuotation from "./components/Clerk-dashboard/GenerateQuotation";
import GenerateBill from "./components/Clerk-dashboard/GenerateBill";
import TrackRecords from "./components/Clerk-dashboard/TrackRecords";
import QuotationsList from "./components/Clerk-dashboard/QuotationsList";
import ViewQuotation from "./components/Clerk-dashboard/ViewQuotation";
import EmployeeManagement from "./components/Clerk-dashboard/employee-management";
import Requests from "./components/Clerk-dashboard/Requests";
import AssignWork from "./components/Clerk-dashboard/assign-work";
import EmployeeList from "./components/Clerk-dashboard/employee-list";
import EmployeeDashboard from "./components/Employee-dashboard/Employee-dashboard";
import Sidebar from "./components/Employee-dashboard/Sidebar";
import PersonalInformation from "./components/Employee-dashboard/PersonalInformation";
import AssignedProject from "./components/Employee-dashboard/AssignedProject";
import LeaveSalary from "./components/Employee-dashboard/LeaveSalary";
import Company from "./components/Owner-dashboard/ClientManagement/Company";
import QuotationList from "./components/Owner-dashboard/ClientManagement/QuotationList";
import QuotationInfo from "./components/Owner-dashboard/ClientManagement/QuotationInfo";
import ManageUser from "./components/Owner-dashboard/ManageUser/User";
import RevenueManagement from "./components/Owner-dashboard/Revenue/RevenueManagement";
import DummyQuotation from "./components/Clerk-dashboard/DummyQuotation";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/company" element={<Company />} />
        <Route path="/list/:company" element={<QuotationList />} />
        <Route path="/info/:company/:projectId" element={<QuotationInfo />} />
        <Route path="/manageuser" element={<ManageUser />} />
        <Route path="/revenue" element={<RevenueManagement />} />

        <Route path="/dummy-quotation" element={<DummyQuotation />} />
        <Route path="/clerk-dashboard" element={<ClerkDashboard />} />
        <Route path="/Employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/client-management" element={<ClientManagement />} />
        <Route path="/projects/:clientId" element={<ProjectManagement />} />
        <Route path="/projects/:clientId/:projectId" element={<ProjectDetail />} />
        <Route
          path="/client/:clientId/project/:projectId/generate-quotation"
          element={<GenerateQuotation />}
        />
        <Route
          path="/client/:clientId/project/:projectId/generate-bill"
          element={<GenerateBill />}
        />
        <Route
          path="/client/:clientId/project/:projectId/track-records"
          element={<TrackRecords />}
        />
        <Route path="/quotations" element={<QuotationsList />} />
        <Route path="/view-quotation/:id" element={<ViewQuotation />} />
        <Route path="/employee-management" element={<EmployeeManagement />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/assign-work" element={<AssignWork />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/personal-information" element={<PersonalInformation />} />
        <Route path="/assigned-project" element={<AssignedProject />} />
        <Route path="/leave-salary" element={<LeaveSalary />} />
      </Routes>
    </Router>
  );
};

export default App;
