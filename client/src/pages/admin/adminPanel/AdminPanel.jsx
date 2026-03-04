import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./AdminPanel.css";
import UserTable from "../../../Components/userTable/Usertable";
import CreateUser from "../../../Components/createUser/CreateUser";

const AdminPanel = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("users");
  const [refreshUsersFlag, setRefreshUsersFlag] = useState(0);

  return (
    <>
      <div className="page-header">
        <h1>Hi, {user?.name || "Admin"}</h1>

        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === "users" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            className={`tab-button ${activeTab === "create" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("create")}
          >
            Create User
          </button>
          <button
            className={`tab-button ${activeTab === "issues" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("issues")}
          >
            Raised Issues
          </button>
          <div
            className={`span-bg ${
              activeTab === "users"
                ? "position-1"
                : activeTab === "create"
                ? "position-2"
                : "position-3"
            }`}
          />
        </div>
      </div>

      {activeTab === "users" && <UserTable refreshUsersFlag={refreshUsersFlag} />}

      {activeTab === "create" && (
        <CreateUser
          onCreated={() => {
            setRefreshUsersFlag((prev) => prev + 1);
            setActiveTab("users");
          }}
        />
      )}

      {activeTab === "issues" && (
        <div className="issues-placeholder card">
          <h3>Raised Issues</h3>
          <p className="text-muted">
            Issue management UI is not connected yet. Bind this tab with issue
            APIs when ready.
          </p>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
