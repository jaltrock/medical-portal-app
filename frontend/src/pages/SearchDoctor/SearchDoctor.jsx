import { useState } from "react";
import Button from "../../components/Button/Button";
import { makeGETrequest, makePOSTrequest } from "../../utils/api";
import CustomForm from "../../components/CustomForm/CustomForm";
import { useSelector } from "react-redux";
import "./SearchDoctor.css";

const SearchDoctor = () => {
  const [idnumber, setIdNumber] = useState("");
  const [messageDoc, setMessageDoc] = useState("");
  const [doctor, setDoctor] = useState({});
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [showUpdatedContactFields, setShowUpdatedContactFields] =
    useState(false);

  const userSelector = useSelector((state) => state.user);

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

  async function updateContact(e) {
    e.preventDefault();
    const res = await makePOSTrequest(
      "http://localhost/5000/doctors/updatecontact",
      {
        idnumber: doctor.idnumber,
        email: updatedEmail,
        phone: updatedPhone,
      },
      localStorage.getItem("token")
    );

    if (res.status === 201) {
      setShowUpdatedContactFields(!showUpdatedContactFields);
      setDoctor(JSON.parse(res.doctor));
    }

    setMessageDoc(res.message);
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

          {userSelector.admin && (
            <Button
              value="Update doctor contact information"
              onClick={() =>
                setShowUpdatedContactFields(!showUpdatedContactFields)
              }
            />
          )}
          <br />
          {showUpdatedContactFields && (
            <CustomForm>
              <CustomForm.Email
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />

              <CustomForm.Phone
                value={updatedPhone}
                onChange={(e) => setUpdatedPhone(e.target.value)}
              />

              <Button value="Update" onClick={updateContact} />
            </CustomForm>
          )}
        </div>
      )}
      {messageDoc}
    </div>
  );
};

export default SearchDoctor;
