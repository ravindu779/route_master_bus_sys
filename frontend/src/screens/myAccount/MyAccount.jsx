import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavbarPassenger/Navbar";
import "./myAccount.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const MyAccount = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");
  console.log(token)
  // Decode token to get user ID
  const decodedToken = token ? jwtDecode(token) : null;
  const id = decodedToken ? decodedToken._id : null;
  console.log(id)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/passanger/getPassengerById/${id}`);
        console.log(response)

        setUserData(response.data.passenger);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const clickLogOut = () => {
    localStorage.removeItem("token");
    navigate("/signIn", { replace: true });
  };

  return (
    <div>
      <NavBar />
      <div
        className="bus_details_main_container"
        style={{
          paddingTop: "20px",
          backgroundColor: "#dcecfc",
          height: "100%",
          padding: "20px 100px 0px",
        }}
      >
        <div className="d-flex justify-content-center">
          <div
            style={{
              width: "760px",
              backgroundColor: "white",
              padding: "30px 40px",
              borderRadius: "5px",
              fontSize: "20px",
            }}
          >
            <div className="d-flex justify-content-center">
              <div style={{ fontWeight: "bold", fontSize: "22px" }}>Profile</div>
            </div>
            {userData ? (
              <>
                <div className="d-flex gap-2">
                  <div className="fw-bold">Name:</div>
                  <div>{userData.firstName} {userData.lastName} </div>
                </div>
                <div className="d-flex gap-2">
                  <div className="fw-bold">Email:</div>
                  <div>{userData.email}</div>
                </div>
                <div className="d-flex gap-2">
                  <div className="fw-bold">Phone No:</div>
                  <div>{userData.phoneNumber}</div>
                </div>
                <div className="d-flex gap-2">
                  <div className="fw-bold">Gender:</div>
                  <div>{userData.gender}</div>
                </div>
              </>
            ) : (
              <div>Loading...</div>
            )}
            <div className="d-flex justify-content-center">
              <div style={{ width: "120px" }}>
                <Button onClick={clickLogOut} type="1" text="Log Out" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
