import { Button } from "@mui/material";
import { Link } from "react-router-dom";



export default function AdminPage() {
    const user = localStorage.getItem('user');

    if (user !== 'satyam') {
        return <div className="text-center mt-20">Access Denied. You are not authorized to view this page.</div>;
    }

    return (
        <div className="text-center mt-20">
            <h1>Admin Page</h1>
            <p>Welcome, {user}!</p>
            <br />
            <Link to="/add">
            <Button variant="contained">Add Products</Button>
            </Link>
            <br /><br />
            <Link to="/remove">
            <Button variant="contained">Remove Products</Button>
            </Link>
        </div>
    );
}