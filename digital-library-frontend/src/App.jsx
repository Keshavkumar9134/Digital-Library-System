// 📁 src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import UploadBookPage from './pages/UploadBookPage';
import AdminBookListPage from './pages/AdminBookListPage';
import EditBookPage from './pages/EditBookPage';
import BookDetailPage from './pages/BookDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import MyBooksPage from './pages/MyBookPage';
import Header from './components/Header';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import AdminUserListPage from './pages/AdminUserListPage';
import HelpPage from './pages/HelpPage';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';

function App() {
  return (
    <>
      
      
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/my-books" element={<MyBooksPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/admin/users" element={<AdminUserListPage />} /> */}


        {/* 🔐 Admin Protected Routes */}
        
        <Route path="/admin/users" element={
          <ProtectedRoute>
            <AdminUserListPage />
          </ProtectedRoute>
        } />


      
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadBookPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/books"
          element={
            <ProtectedRoute>
              <AdminBookListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-book/:id"
          element={
            <ProtectedRoute>
              <EditBookPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <div><Footer /></div>
    </>
  );
}

export default App;
