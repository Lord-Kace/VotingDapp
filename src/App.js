import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import ProposalList from "./components/ProposalList";
import ProposalCreate from "./components/ProposalCreate";
import AdminDashboard from "./components/AdminDashboard";
import WalletConnect from "./components/WalletConnect";
import LoginPage from "./components/LoginPage";
import WelcomePage from "./components/WelcomePage";
import ProposalDetail from "./components/ProposalDetail";
import './App.css';
const App = () => {
 const [client, setClient] = useState(null);
 return (
 <Router>
 <div className="app">
 <Navbar />
 <Sidebar />
 <div className="main-content">
 <WalletConnect setClient={setClient} />
 <Routes>
 <Route path="/" exact component={WelcomePage} />
 <Route path="/proposals" component={ProposalList} />
 <Route path="/admin" component={AdminDashboard} />
 <Route path="/login" component={LoginPage} />
 <Route path="/proposals/:id" component={ProposalDetail} />
 </Routes>
 </div>
 <Footer />
 </div>
 </Router>
 );
};
export default App;