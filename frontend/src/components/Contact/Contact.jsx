import React from "react";
import "./Contact.css";
import { MdLocationPin } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import Navbar from "../../components/NavbarPassenger/Navbar";
const Contact = () => {
  return (
    <>
      {" "}
      <Navbar />
      <div className="contact-container">
        <div className="contact-top">
          <div className="contact-main">
            <h1>Contact Us</h1>
            <p>
              Please let us know if you have a question want to leave a comment.
            </p>

            <hr />
            <div className="contact-details">
              <h3>Contact Details</h3> <br />
              <p>
                {" "}
                <MdLocationPin style={{ marginRight: "3px" }} /> Redeye Solution
                No.13, Kandy Road, Mawathagama
              </p>{" "}
              <br />
              <p>
                <FaPhone style={{ marginRight: "3px" }} /> 037 2297555
              </p>{" "}
              <p className="phone2">077 7774132</p> <br />
              <p>
                <FaEnvelope style={{ marginRight: "3px" }} />{" "}
                srsrisuranga@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
