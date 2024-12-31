import { useState } from "react";
import Button from "../../components/Button/Button";
import { makeGETrequest } from "../../utils/api";
import CustomForm from "../../components/CustomForm/CustomForm";
import "./SearchDoctor.css";

const SearchDoctor = () => {
  const [idnumber, setIdNumber] = useState("");
  const [messageDoc, setMessageDoc] = useState("");
  const [doctor, setDoctor] = useState({});

  async function submitSearch(e) {
    e.preventDefault();
    const res = await makeGETrequest(
      `http://localhost:5000/doctors/search?idnumber=${idnumber}`
    );
    setMessageDoc(res.message);

    if (res.doctor) {
      setDoctor(JSON.parse(res.doctor));
    } else {
      setDoctor({});
    }
  }

  return (
    <div className="searchdoctor-container">
      <h2>Search Doctor</h2>
      <CustomForm>
        <CustomForm.IDNumber
          value={idnumber}
          onChange={(e) => setIdNumber(e.target.value)}
        />
        <Button value="Search" onClick={submitSearch} />
        <br />
      </CustomForm>

      {doctor.username && (
        <div style={{ marginTop: "30px" }}>
          <p>
            <span style={{ fontWeight: "bold" }}>id:</span>
            {doctor.idnumber}
          </p>

          <p>
            <span style={{ fontWeight: "bold" }}>Doctor:</span>
            {doctor.username}
          </p>

          <p>
            <span style={{ fontWeight: "bold" }}>Email:</span>
            {doctor.email}
          </p>
        </div>
      )}

      {messageDoc}
    </div>
  );
};

export default SearchDoctor;
