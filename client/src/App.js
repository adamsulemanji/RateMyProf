import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

if (localStorage.jwtToken) {
	const token = localStorage.jwtToken;
	setAuthToken(token);
}

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signupPage" element={<Signup />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
