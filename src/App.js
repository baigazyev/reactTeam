import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Login from './components/Login';
import Leaderboard from './components/Leaderboard';
import Habit from './components/Habit';
import Register from './components/Register';
import { UserProvider } from './components/UserContext';
import Header from './components/Header';
import UserPage from './components/UserPage';
const { Content, Footer } = Layout;

const AppContent = () => {
  return (
    <Layout>
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
          <Routes>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/habits" element={<Habit />} />
            <Route path="/" element={<Login />} />
            <Route path="/users/:id" element={<UserPage />} />          
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Habit Tracker ©2024</Footer>
    </Layout>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
};

export default App;
