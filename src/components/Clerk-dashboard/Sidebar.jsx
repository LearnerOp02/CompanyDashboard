/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { X, LogOut, FileText, Users, Briefcase } from "lucide-react";

const MENU_ITEMS = [
  { to: "/dummy-quotation", label: "Dummy Quotation", icon: FileText },
  { to: "/client-management", label: "Client Management", icon: Briefcase },
  { to: "/employee-management", label: "Employee Management", icon: Users },
];

const SidebarButton = ({ to, label, icon: Icon, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center w-full px-4 py-3 mb-2 text-white hover:bg-orange-600 rounded-lg transition-all duration-200 shadow-md ${
        isActive ? "bg-orange-600" : "hover:shadow-lg"
      }`
    }
    end
  >
    <Icon className="h-5 w-5 mr-3" />
    <span className="text-sm font-medium font-poppins">{label}</span>
  </NavLink>
);

const SidebarHeader = ({ onClose }) => (
  <div className="p-6 border-b border-orange-500">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white tracking-wide font-poppins drop-shadow-lg">
        Clerk Menu
      </h2>
      <button
        onClick={onClose}
        className="lg:hidden text-white hover:text-gray-200 transition-colors duration-200"
        aria-label="Close sidebar"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  </div>
);

const SidebarContent = ({ onClose }) => (
  <nav className="flex-1 px-4 py-6">
    {MENU_ITEMS.map((item, index) => (
      <SidebarButton key={index} {...item} onClick={onClose} />
    ))}
  </nav>
);

const SidebarFooter = ({ onLogout }) => (
  <div className="p-4 border-t border-orange-500">
      <button
        onClick={onLogout}
        className="flex items-center w-full px-4 py-3 text-white hover:bg-gradient-to-r from-red-500 to-red-700 rounded-lg transition-transform transform hover:scale-105 duration-200 shadow-lg"
      >
        <LogOut className="h-5 w-5 mr-3" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
);

const Sidebar = ({ isOpen, onClose, onLogout }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    window.location.href = "/login";
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="font-poppins">
      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-72 h-screen transform transition-transform duration-300 ease-in-out bg-gradient-to-br from-orange-600 to-orange-800 shadow-2xl rounded-tr-xl rounded-br-xl flex flex-col">
            <SidebarHeader onClose={onClose} />
            <SidebarContent onClose={onClose} />
            <SidebarFooter onLogout={handleLogoutClick} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-72 h-full bg-gradient-to-br from-orange-600 to-orange-800 shadow-2xl rounded-tr-xl rounded-br-xl">
        <SidebarHeader onClose={() => {}} />
        <SidebarContent onClose={() => {}} />
        <SidebarFooter onLogout={handleLogoutClick} />
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;