import { Router, Route } from '@solidjs/router';
import type { Component } from 'solid-js';
import Home from './pages/Home';
import SignupPage from './pages/SignupPage';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import Add from "./pages/Add";
import List from "./pages/List";
import Logout from "./pages/Logout";
import Growth from "./pages/Growth";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Review from "./pages/Review";
import Products from "./pages/Products";
import MyOrders from "./pages/MyOrders";
import TransactionHistory from "./pages/TransactionHistory";
import { loginUser as apiLogin, registerUser as apiRegister } from "./services/api";

import AuthGuard from "./pages/AuthGuard";

const App: Component = () => {
  return (
    <Router>
      {/* Public routes */}
      <Route path="/" component={Home} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/add" component={Add} />
      <Route path="/list" component={List} />
      <Route path="/logout" component={Logout} />
      <Route path="/growth" component={Growth} />
      <Route path="/profile" component={Profile} />
      <Route path="/settings" component={Settings} />
      <Route path="/review" component={Review} />
      <Route path="/products" component={Products} />
      <Route path="/my-orders" component={MyOrders} />
      <Route path="/transactions" component={TransactionHistory} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        component={() => (
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        )}
      />
      <Route
        path="/profile"
        component={() => (
          <AuthGuard>
            <Profile />
          </AuthGuard>
        )}
      />
    </Router>
  );
};


export default App;