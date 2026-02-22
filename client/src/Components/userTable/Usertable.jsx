import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import "./userTable.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/users/allusers");
      const userData = res.data.data;

      setUsers(userData);
      setFilteredUsers(userData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // ================= TOGGLE =================
  const handleToggle = async (id, currentValue) => {
    try {
      await axiosInstance.put(`/user/update/${id}`, {
        isReadOnly: !currentValue,
      });
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?"))
      return;

    try {
      await axiosInstance.delete(`/user/delete/${id}`);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(
        `/user/update/${selectedUser._id}`,
        selectedUser
      );
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="users-page">
    

       <div className="filter-ribbon">

        <div className="select-box">
          <>Role : </>
          <select onChange={(e) => setSearchTerm(e.target.value)}>
            <option value="">All Users</option>
            <option value="superadmin">superAdmn</option>
            <option value="admin">Admin</option>
            <option value="lecturer">lecturer</option>
            <option value="student">student</option>
          </select>
        </div>

        <div className="searchbar-area">
          <input
            type="text"
            placeholder="Search name, role or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container user-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Read Only</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="no-data">
                  Loading...
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>

                  {/* ROLE BADGE */}
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>

                  <td>{user.email}</td>

                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={user.isReadOnly}
                        onChange={() =>
                          handleToggle(user._id, user.isReadOnly)
                        }
                      />
                      <span className="slider"></span>
                    </label>
                  </td>

                  <td className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(user)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit User</h3>

            <input
              type="text"
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  name: e.target.value,
                })
              }
            />

            <input
              type="email"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  email: e.target.value,
                })
              }
            />

            <select
              value={selectedUser.role}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  role: e.target.value,
                })
              }
            >
              <option value="superAdmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            <div className="modal-actions">
              <button onClick={handleUpdate} className="save-btn">
                Save
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;