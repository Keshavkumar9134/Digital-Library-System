import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Or use context if you're storing it there

        const res = await api.get('/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
  const userToDelete = users.find((user) => user._id === id);
  
  if (!userToDelete) return;

  if (userToDelete.role === 'admin') {
    alert("You cannot delete an admin user.");
    return;
  }

  if (window.confirm('Delete this user?')) {
    const token = localStorage.getItem('token');
    try {
      await api.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Something went wrong while deleting the user.");
    }
  }
};


  return (
    <div>
      <h2>All Users</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button color="error" onClick={() => deleteUser(user._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUserListPage;
