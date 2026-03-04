import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axiosInstance";
import Loader from "../Loader/Loader";
import "./Usertable.css";

const UserTable = ({ refreshUsersFlag }) => {
  const { role: currentUserRole } = useSelector((state) => state.auth);
  const canToggleReadOnly = currentUserRole === "superAdmin";

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const [isFetching, setIsFetching] = useState(false);
  const [actionUserId, setActionUserId] = useState(null);
  const [isSavingModal, setIsSavingModal] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setIsFetching(true);
    try {
      const res = await axiosInstance.get("/users/allusers");
      setUsers(res.data?.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshUsersFlag]);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        !normalizedSearch ||
        user.name?.toLowerCase().includes(normalizedSearch) ||
        user.email?.toLowerCase().includes(normalizedSearch) ||
        user.role?.toLowerCase().includes(normalizedSearch);

      const matchesRole = !roleFilter || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const handleToggle = async (id, currentValue) => {
    setActionUserId(id);
    try {
      await axiosInstance.put(`/users/readonly/${id}`, {
        isReadOnly: !currentValue,
      });

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isReadOnly: !currentValue } : user
        )
      );
      toast.success("User access updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update access");
    } finally {
      setActionUserId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setActionUserId(id);
    try {
      await axiosInstance.delete(`/users/delete/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    } finally {
      setActionUserId(null);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser({
      ...user,
      password: "",
    });
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedUser?.name?.trim() || !selectedUser?.email?.trim()) {
      toast.error("Name and email are required");
      return;
    }

    setIsSavingModal(true);
    try {
      const payload = {
        name: selectedUser.name.trim(),
        email: selectedUser.email.trim(),
        role: selectedUser.role,
        isReadOnly: selectedUser.isReadOnly,
      };

      if (selectedUser.password?.trim()) {
        payload.password = selectedUser.password.trim();
      }

      const res = await axiosInstance.put(`/users/update/${selectedUser._id}`, payload);
      const updated = res.data?.data;

      setUsers((prev) =>
        prev.map((user) => (user._id === updated._id ? updated : user))
      );

      setIsModalOpen(false);
      setSelectedUser(null);
      toast.success("User updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update user");
    } finally {
      setIsSavingModal(false);
    }
  };

  return (
    <div className="users-page">
      {isFetching && <Loader />}

      <div className="filter-ribbon">
        <div className="select-box">
          <span>Role:</span>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="">All Users</option>
            <option value="superAdmin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="lecturer">Lecturer</option>
            <option value="student">Student</option>
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                const rowBusy = actionUserId === user._id;
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>

                    <td>
                      <span className={`role-badge ${user.role}`}>{user.role}</span>
                    </td>

                    <td>{user.email}</td>

                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={user.isReadOnly}
                          disabled={rowBusy || !canToggleReadOnly}
                          title={
                            canToggleReadOnly
                              ? "Toggle read-only mode"
                              : "Only superAdmin can change read-only mode"
                          }
                          onChange={() => handleToggle(user._id, user.isReadOnly)}
                        />
                        <span className="slider" />
                      </label>
                    </td>

                    <td className="actions">
                      <button
                        className="edit-btn"
                        onClick={() => openEditModal(user)}
                        disabled={rowBusy}
                      >
                        {rowBusy ? "Please wait..." : "Edit"}
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(user._id)}
                        disabled={rowBusy}
                      >
                        {rowBusy ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No users found
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
                setSelectedUser((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="Full name"
            />

            <input
              type="email"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="Email"
            />

            <select
              value={selectedUser.role}
              onChange={(e) =>
                setSelectedUser((prev) => ({
                  ...prev,
                  role: e.target.value,
                }))
              }
            >
              <option value="superAdmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="lecturer">Lecturer</option>
              <option value="student">Student</option>
            </select>

            <input
              type="password"
              value={selectedUser.password}
              onChange={(e) =>
                setSelectedUser((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              placeholder="New password (optional)"
            />

            <div className="toggle-row modal-toggle-row">
              <span>Read Only Access</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={selectedUser.isReadOnly}
                  disabled={!canToggleReadOnly}
                  onChange={(e) =>
                    setSelectedUser((prev) => ({
                      ...prev,
                      isReadOnly: e.target.checked,
                    }))
                  }
                />
                <span className="slider" />
              </label>
            </div>

            <div className="modal-actions">
              <button onClick={handleUpdate} className="save-btn" disabled={isSavingModal}>
                {isSavingModal ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="cancel-btn"
                disabled={isSavingModal}
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
