import React, { useEffect, useState } from 'react';
import TextInput from '../../components/TextInput/TextInput'; 
import NavBar from "../../components/NavbarPassenger/Navbar";
import "./addpayment.css";
import Button from "../../components/Button/Button";
import { jwtDecode } from "jwt-decode";
import { toast, Zoom } from "react-toastify";
import validator from 'validator';
import axios from "axios";
import NavbarBus from '../../components/NavbarBus/NavbarBus';

const AddPayment = () => {
  const [AcNo, setAcNo] = useState('');
  const [bankname, setBankname] = useState('');
  const [branch, setBranch] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [AcNoError, setAcNoError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isPaymentDataAvailable, setIsPaymentDataAvailable] = useState(false);
  const [paymentData, setPaymentData] = useState({
    bankname:"",
    branch:"",
    phoneNumber:"",
    AcNo:"",
  });

  const handleSubmit = async () => {
    setAcNoError('');
    setPhoneNumberError('');

    if (!AcNo) {
      setAcNoError("Enter Account Number");
      return;
    } else if (AcNo.length !== 16) {
      setAcNoError("Account Number must be 16 digits");
      return;
    }

    if (!phoneNumber) {
      setPhoneNumberError("Enter Phone Number");
      return;
    } else if (!validator.isMobilePhone(phoneNumber, 'any', { strictMode: false })) {
      setPhoneNumberError("Enter valid Phone Number");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/paymentDetails/addPaymentDetails",
        {
          AcNo,
          bankname,
          branch,
          phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      console.log(response);

      if (response.data.success) {
        toast.success("Payment details added successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });

        // Reset form state
        setAcNo('');
        setBankname('');
        setBranch('');
        setPhoneNumber('');
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
      console.error(error.message);
      console.log(error.response.data.message)
    }
  };
  const getPaymentData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/paymentDetails/getBusPaymentbybusId",
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if (response.data.success) {
        console.log("🚀 ~ getCurrentLocation ~ response.data:", response.data);
        setIsPaymentDataAvailable(true);
        setPaymentData(response.data.busPayment);
      } else {
        setIsPaymentDataAvailable(false)
      }
    } catch (error) {
      setIsPaymentDataAvailable(false)
    }
}
  useEffect(() => {
    getPaymentData();
  },[])

  return (
    <div>
      <NavbarBus />
      <div className="addPaymentContainer">
        {isPaymentDataAvailable === false && (
          <div className="paycontainer">
            <h2 className="head text-center fw-bold">Bus Payment Details</h2>
            <TextInput
              placeholder="Account Number"
              type="text"
              value={AcNo}
              onChange={(value) => setAcNo(value)}
              errorMessage={AcNoError}
            />
            <TextInput
              placeholder="Bank Name"
              type="text"
              value={bankname}
              onChange={(value) => setBankname(value)}
              errorMessage={""}
            />
            <TextInput
              placeholder="Branch"
              type="text"
              value={branch}
              onChange={(value) => setBranch(value)}
              errorMessage={""}
            />
            <TextInput
              placeholder="Phone Number"
              type="text"
              value={phoneNumber}
              onChange={(value) => setPhoneNumber(value)}
              errorMessage={phoneNumberError}
            />
            <div className="submitContainer">
              <Button type="1" text="Submit" onClick={handleSubmit} />
            </div>
          </div>
        )}

        {isPaymentDataAvailable && (
          <div className="paycontainer">
            <div className=" text-center fw-bold mb-3" style={{ fontSize: "22px" }}>
              Payment Details
            </div>
            <div className=" row mb-1">
              <div className=" col-5 text-center fw-bold">Account Number</div>
              <div className=" col-1 text-center">-</div>
              <div className=" col-6 text-center">{ paymentData.AcNo}</div>
            </div>
            <div className=" row mb-1">
              <div className=" col-5 text-center fw-bold">Bank Name</div>
              <div className=" col-1 text-center">-</div>
              <div className=" col-6 text-center">{ paymentData.bankname}</div>
            </div>{" "}
            <div className=" row mb-1">
              <div className=" col-5 text-center fw-bold">Branch</div>
              <div className=" col-1 text-center">-</div>
              <div className=" col-6 text-center">{ paymentData.bankname}</div>
            </div>{" "}
            <div className=" row mb-1">
              <div className=" col-5 text-center fw-bold">phone Number</div>
              <div className=" col-1 text-center">-</div>
              <div className=" col-6 text-center">{ paymentData.phoneNumber}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

};

export default AddPayment;
