import "./Home.css";

const Home = () => {
    return (
        <div className="home-container">
            <h2>Welcome to Patient Management System</h2>
            <div className="featuers">
                <div className="feature">
                    <h3>Patient Registration</h3>
                    <p>Register new patients into the system</p>
                    <a href="/registerpatient">Register Patient</a>
                </div>
                <div className="feature">
                    <h3>Search Patients</h3>
                    <p>View and manage patients' medical history</p>
                    <a href="/searchpatient">View Medical History</a>
                </div>
            </div>
        </div>
    );
};

export default Home;