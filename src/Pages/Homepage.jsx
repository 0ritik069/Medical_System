import image1 from "../assests/national-cancer-institute-4SiOVKH3DYA-unsplash.jpg";
import image2 from "../assests/Screenshot 2025-06-13 150418.png";
import image3 from "../assests/liver.png";
import image4 from "../assests/medicals.png";
import image5 from "../assests/dashboard.png";
import image6 from "../assests/labs.png";
import image7 from "../assests/insurance11.png";
import image8 from "../assests/billing11.png";
import image9 from "../assests/Reports11.png";
import { NavLink, useNavigate } from "react-router-dom";
import dash from "../../src/assests/sideImg/stats.png";
import appoint from "../../src/assests/sideImg/appointments.png";
import bill from "../../src/assests/sideImg/billing.png";
import lab from "../../src/assests/sideImg/labs.png";
import pharmacy from "../../src/assests/sideImg/pharmacy.png";
import medical from "../../src/assests/sideImg/medicals.png";
import file from "../../src/assests/sideImg/files.png";
import insurance from "../../src/assests/sideImg/insurance.png";
import { baseurl } from "../Baseurl";
import axios from "axios";
import { useEffect, useState } from "react";

const Homepage = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const cards = [
    {
      title: "Appointment",
      subtitle: "320+ Appointment Today",
      image: image1,
      url: "/Admin/appointment2",
      iconClass: appoint,
    },
    {
      title: "Patient File",
      subtitle: "250+ Appointment Today",
      image: image2,
      url: "/Admin/patient",
      iconClass: file,
    },
    {
      title: "Medical",
      subtitle: "300+ Appointment Today",
      image: image3,
      iconClass: medical,
    },
    {
      title: "Pharmacy",
      subtitle: "280+ Appointment Today",
      image: image4,
      url: "/Admin/Pharmacy",
      iconClass: pharmacy,
    },
    {
      title: "Dashboard",
      subtitle: "270+ Appointment Today",
      image: image5,
      url: "/Admin/dashboard",
      iconClass: dash,
    },
    {
      title: "Laboratory",
      subtitle: "260+ Appointment Today",
      image: image6,
      url: "/Admin/ManageLabs",
      iconClass: lab,
    },
    {
      title: "Insurance",
      subtitle: "240+ Appointment Today",
      image: image7,
      url: "/Admin/Insurance",
      iconClass: insurance,
    },
    {
      title: "Billing",
      subtitle: "230+ Appointment Today",
      image: image8,
      url: "/Admin/Billing",
      iconClass: bill,
    },
    {
      title: "Reports",
      subtitle: "220+ Appointment Today",
      image: image9,
      url: "/Admin/ReportsInc",
      iconClass: file,
    },
  ];
 const getUpComingAppointments = async () => {
    try {
      const response = await axios.get(`${baseurl}getUpcomingAppointment`);
      
      console.log("API Response:", response.data);
      if (response.data.success === true) {
        console.log(response.data.data)
          setAppointments(response.data.data);

        } 
       else {
        console.log("API error:", response.data.message);
      }
    } catch (error) {
      console.log("API Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getUpComingAppointments();
  }, []);

  const renderCard = (card) => {
    const content = (
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden hover-shadow cardDesign">
        {card.image && (
          <img
            src={card.image}
            className="card-img-top"
            alt={card.title}
            style={{ width: "100%", height: "260px", objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          {card.iconClass && (
            <span className="hmIcon">
              <img src={card.iconClass}></img>
            </span>
          )}
          <div>
            <h5 className="card-title fw-bold mb-2">{card.title}</h5>
            <p className="card-text text-muted">{card.subtitle}</p>
          </div>
        </div>
      </div>
    );
    return card.url ? (
      <NavLink
        to={card.url}
        className="text-decoration-none text-dark cardDesign"
      >
        {content}
      </NavLink>
    ) : (
      content
    );
  };
  return (
    <div className="container">
      <div className="row g-4" style={{ marginTop: "0px" }}>
        <div className="col-lg-8">
          <div className="row">
            {cards.slice(0, 2).map((card, index) => (
              <div className="col-md-6" key={index}>
                {renderCard(card)}
              </div>
            ))}
          </div>
          <div className="row mt-1">
            {cards.slice(2, 5).map((card, index) => (
              <div className="col-md-4" key={index + 2}>
                {renderCard(card)}
              </div>
            ))}
          </div>
        </div>
         <div className="col-lg-4">
          <div className="card upcomingAppointments shadow-lg rounded-4 p-3">
            <h5 className="fw-bold mb-3" style={{background:"f6f6f6"}} >Upcoming Appointments</h5>

            {appointments && appointments.length > 0 && appointments.slice(0,3).map((item, index) => {
                console.log(item)
                return(
                  <>
                <div
                  key={index}
                  className="mb-3 border-bottom pb-2"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <strong>
                  Dr  {item.doctorName} {item.lastName}
                  </strong>
                  <br />
                  <span className="text-muted">{item.status}</span>
                  <br />
                  <span>{item.patientName}</span>
                  <br />
                  <span className="text-muted">
                    {new Date(item.appointmentDate).toLocaleDateString("en-GB")} |{" "}
                    {item.startTime}
                  </span>
                </div>
                  </>
                )
              }
              )
             }

            <div className="text-end mt-2">
              <button
                className="btn commonBtn"
                onClick={() => navigate("/Admin/appointment2")}
              >
                View All
              </button>
            </div>
          </div>
      </div>
      <div className="row mt-1">
        {cards.slice(5, 9).map((card, index) => (
          <div className="col-md-3" key={index + 5}>
            {renderCard(card)}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Homepage;
