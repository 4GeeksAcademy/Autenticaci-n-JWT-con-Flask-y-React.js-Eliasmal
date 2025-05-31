import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light ">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>

				<Link to="/signup">
					<span className="navbar-brand mb-0 h1">Sign Up</span>
				</Link>

				<Link to="/login">
					<span className="navbar-brand mb-0 h1">Login</span>
				</Link>

				{/* <div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div> */}
			</div>
		</nav>
	);
};