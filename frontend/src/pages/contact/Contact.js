import React, { useState } from "react";
import Card from "../../components/card/Card";
import "./Contact.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../services/service";

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = { subject, message };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contact`, data);
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="contact">
      <h3 className="m-auto">Contact Us</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          <Card cardClass="card">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className='form-control rounded-2 p-1 m-auto mt-2'
            />
            <label>Message</label>
            <textarea
              cols="30"
              rows="5"
              name="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="btn btn-primary">Send Message</button>
          </Card>
        </form>

        <div className="details">
          <Card cardClass={"card2"}>
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below</p>
            <div className="icons">
              <span className="d-flex">
                <FaPhoneAlt /> &nbsp; &nbsp; <p>+91740164****</p>
              </span>
              <span className="d-flex">
                <FaEnvelope /> &nbsp; &nbsp; <p>Mtm.kcs@gmail.com</p>
              </span>
              <span className="d-flex">
                <GoLocation /> &nbsp; &nbsp; <p>Chennai, TamilNadu, India</p>
              </span>
              <span className="d-flex">
                <FaTwitter /> &nbsp; &nbsp; <p>@MohanKcs</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;