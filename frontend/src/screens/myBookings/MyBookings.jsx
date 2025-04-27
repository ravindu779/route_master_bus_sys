import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavbarPassenger/Navbar";
import "./myBookings.css";
import BusDetails from "../../components/busDetails/BusDetails";
import MyBookingModal from "../../components/MyBookingModal";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const MyBookings = () => {
  const [modalShow, setModalShow] = useState(false);
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const id = decodedToken ? decodedToken._id : null;
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/busbook/getBookings/${id}`);
        if (response.data.success) {
          setBookings(response.data.bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <MyBookingModal show={modalShow} onHide={() => setModalShow(false)} />
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
              <div
                className="row align-items-center container-fluid"
                style={{
                  height: "45px",
                  color: "#353434dd",
                  backgroundColor: "#aaa",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "4px",
                }}
              >
                <div className="col-4 text-center">
                  <div>Bus Name</div>
                </div>
                <div className="col-2 text-center">
                  <div>Seats</div>
                </div>
                <div className="col-3">
                  <div>From</div>
                </div>
                <div className="col-3">
                  <div>To</div>
                </div>
              </div>
            </div>
            {bookings.map((booking) => (
              <BusDetails
                key={booking._id}
                busName={booking.busId.Bus_name}
                seatNumber={booking.seatNumber}
                startPlace={booking.startPlace}
                endPlace={booking.endPlace}
                onClick={() => setModalShow(true)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
