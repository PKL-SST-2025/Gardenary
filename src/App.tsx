import { Router, Route } from '@solidjs/router';
import type { Component } from 'solid-js';
import Home from './pages/Home';
import SignupPage from './pages/SignupPage';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import List from "./pages/List";
import Add from "./pages/Add";
import Logout from "./pages/Logout";

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/list" component={List} />
      <Route path="/add" component={Add} />
      <Route path="/logout" component={Logout} />
      {/* Optional fallback */}
      <Route path="*" component={Home} />
    </Router>
  );
};

export default App;