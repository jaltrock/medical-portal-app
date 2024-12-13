import { useState } from "react";
import CustomForm from "../../components/CustomForm/CustomForm";
import "./SearchDoctor.css";

const SearchDoctor = () => {
    const [idnumber, setIdNumber] = useState("");

    return (
        <div className="searchdoctor-container">
            <h2>Search Doctor</h2>
            <CustomForm>
                <CustomForm.IDNumber 
                    value={idnumber} 
                    onChange={(e) => setIdNumber(e.target.value)} 
                />
            </CustomForm>
        </div>
    );
};

export default SearchDoctor;