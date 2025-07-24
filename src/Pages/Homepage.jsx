// import image1 from "../assests/national-cancer-institute-4SiOVKH3DYA-unsplash.jpg";
// import image2 from "../assests/Screenshot 2025-06-13 150418.png";
// import image3 from "../assests/liver.png";
// import image4 from "../assests/medicals.png";
// import image5 from "../assests/dashboard.png";
// import image6 from "../assests/labs.png";
// import image7 from "../assests/insurance11.png";
// import image8 from "../assests/billing11.png";
// import image9 from "../assests/Reports11.png";
// import { NavLink } from "react-router-dom";

// const Homepage = () => {
//   // const cards = [
//   //   {
//   //     title: "Appointment",
//   //     subtitle: "320+ Appointment Today",
//   //     image: image1,
//   //     url: "/Admin/appointment2",
//   //   },
//   //   {
//   //     title: "Patient File",
//   //     subtitle: "250+ Appointment Today",
//   //     image: image2,
//   //     url: "/Admin/patient",

//   //   },
//   //   { title: "Medical", subtitle: "300+ Appointment Today", image: image3 },
//   //   {
//   //     title: "Pharmacy",
//   //     subtitle: "280+ Appointment Today",
//   //     image: image4,
//   //     url: "/Admin/Pharmacy",
//   //   },
//   //   {
//   //     title: "Dashboard",
//   //     subtitle: "270+ Appointment Today",
//   //     image: image5,
//   //     url: "/Admin/dashboard",
//   //   },
//   //   {
//   //     title: "Laboratory",
//   //     subtitle: "260+ Appointment Today",
//   //     image: image6,
//   //     url: "/Admin/ManageLabs",
//   //     className123: "user"
//   //   },
//   //   {
//   //     title: "Insurance",
//   //     subtitle: "240+ Appointment Today",
//   //     image: image7,
//   //     url: "/Admin/Insurance",
//   //   },
//   //   {
//   //     title: "Billing",
//   //     subtitle: "230+ Appointment Today",
//   //     image: image8,
//   //     url: "/Admin/Billing",
//   //   },
//   //   {
//   //     title: "Reports",
//   //     subtitle: "220+ Appointment Today",
//   //     image: image9,
//   //     url: "/Admin/ReportsInc",
//   //   },
//   // ];
// const cards = [
//   {
//     title: "Appointment",
//     subtitle: "320+ Appointment Today",
//     image: image1,
//     url: "/Admin/appointment2",
//     iconClass: "fas fa-calendar-check",
//   },
//   {
//     title: "Patient File",
//     subtitle: "250+ Appointment Today",
//     image: image2,
//     url: "/Admin/patient",
//     iconClass: "fas fa-user-file",
//   },
//   {
//     title: "Medical",
//     subtitle: "300+ Appointment Today",
//     image: image3,
//     iconClass: "fas fa-stethoscope",
//   },
//   {
//     title: "Pharmacy",
//     subtitle: "280+ Appointment Today",
//     image: image4,
//     url: "/Admin/Pharmacy",
//     iconClass: "fas fa-pills",
//   },
//   {
//     title: "Dashboard",
//     subtitle: "270+ Appointment Today",
//     image: image5,
//     url: "/Admin/dashboard",
//     iconClass: "fas fa-chart-line",
//   },
//   {
//     title: "Laboratory",
//     subtitle: "260+ Appointment Today",
//     image: image6,
//     url: "/Admin/ManageLabs",
//     iconClass: "fas fa-vials",
//   },
//   {
//     title: "Insurance",
//     subtitle: "240+ Appointment Today",
//     image: image7,
//     url: "/Admin/Insurance",
//     iconClass: "fas fa-file-invoice-dollar",
//   },
//   {
//     title: "Billing",
//     subtitle: "230+ Appointment Today",
//     image: image8,
//     url: "/Admin/Billing",
//     iconClass: "fas fa-file-invoice",
//   },
//   {
//     title: "Reports",
//     subtitle: "220+ Appointment Today",
//     image: image9,
//     url: "/Admin/ReportsInc",
//     iconClass: "fas fa-clipboard-list",
//   },
// ];
//   const appointments = [
//     {
//       doctor: "Dr. Nashita",
//       department: "Cardiologist",
//       date: "02 Sep 2023",
//       time: "10:00 - 10:30 AM",
//       patient: "John Smith",
//     },
//     {
//       doctor: "Dr. Nashita",
//       department: "Cardiologist",
//       date: "02 Sep 2023",
//       time: "11:00 - 11:30 AM",
//       patient: "Jane Smith",
//     },
//   ];

//   const renderCard = (card) => {
//     const content = (
//       <div className="card border-0 shadow-lg rounded-4 overflow-hidden hover-shadow cardDesign">
//         {card.image && (
//           <img
//             src={card.image}
//             className="card-img-top"
//             alt={card.title}
//             style={{width: "100%", height: "260px", objectFit: "cover" }}
//           />
//         )}
//         <div className="card-body">
//          <span className="hmIcon">
//   {card.iconClass && <i className={card.iconClass}></i>}
// </span>
//           <div className="">
//               <h5 className="card-title fw-bold mb-2">{card.title}</h5>
//               <p className="card-text text-muted">{card.subtitle}</p>
//           </div>
//         </div>
//       </div>
//     );

//     return card.url ? (
//       <NavLink to={card.url} className="text-decoration-none text-dark cardDesign">
//         {content}
//       </NavLink>
//     ) : (
//       content
//     );
//   };

//   return (
//     <div className="container pt-4">
//       <div className="row g-4">

//         <div className="col-lg-8">
//           <div className="row">
//             {cards.slice(0, 2).map((card, index) => (
//               <div className="col-md-6" key={index}>
//                 {renderCard(card)}
//               </div>
//             ))}
//           </div>

//           <div className="row mt-1">
//             {cards.slice(2, 5).map((card, index) => (
//               <div className="col-md-4" key={index + 2}>
//                 {renderCard(card)}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="col-lg-4">
//           <div className="card upcomingAppointments shadow-lg rounded-4 p-3">
//             <h5 className="fw-bold mb-3 text-dark">Upcoming Appointments</h5>
//             {appointments.map((item, index) => (
//               <div key={index} className="mb-3 border-bottom pb-2">
//                 <strong>{item.doctor}</strong>
//                 <br />
//                 <span className="text-muted">{item.department}</span>
//                 <br />
//                 <span>{item.patient}</span>
//                 <br />
//                 <span className="text-muted">
//                   {item.date} | {item.time}
//                 </span>
//               </div>
//             ))}
//             <div className="text-end">
//               {/* <button className="btn btn-outline-dark btn-sm">View All</button> */}

//               <button class="btn commonBtn"><span class="text-truncate w-100">View All</span></button>
//             </div>
//           </div>
//         </div>

//       </div>

//       <div className="row mt-1">
//           {cards.slice(5, 9).map((card, index) => (
//             <div className="col-md-3" key={index + 5}>
//               {renderCard(card)}
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Homepage;
import image1 from "../assests/national-cancer-institute-4SiOVKH3DYA-unsplash.jpg";
import image2 from "../assests/Screenshot 2025-06-13 150418.png";
import image3 from "../assests/liver.png";
import image4 from "../assests/medicals.png";
import image5 from "../assests/dashboard.png";
import image6 from "../assests/labs.png";
import image7 from "../assests/insurance11.png";
import image8 from "../assests/billing11.png";
import image9 from "../assests/Reports11.png";
import { NavLink } from "react-router-dom";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Header/Sideabar/Sidebar";
import home from "../../src/assests/sideImg/home.png";
import dash from "../../src/assests/sideImg/stats.png";
import appoint from "../../src/assests/sideImg/appointments.png";
import bill from "../../src/assests/sideImg/billing.png";
import lab from "../../src/assests/sideImg/labs.png";
import pharmacy from "../../src/assests/sideImg/pharmacy.png";
import medical from "../../src/assests/sideImg/medicals.png";
import doctor from "../../src/assests/sideImg/doctors.png";
import treatment from "../../src/assests/sideImg/treatment.png";
import vital from "../../src/assests/sideImg/vitals.png";
import file from "../../src/assests/sideImg/files.png";
 
const Homepage = () => {
  const cards = [
    {
      title: "Appointment",
      subtitle: "320+ Appointment Today",
      image: image1,
      url: "/Admin/appointment2",
      iconClass:appoint,
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
      iconClass: treatment,
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
      iconClass:file,
    },
  ];

  const appointments = [
    {
      doctor: "Dr. Nashita",
      department: "Cardiologist",
      date: "02 Sep 2023",
      time: "10:00 - 10:30 AM",
      patient: "John Smith",
    },
    {
      doctor: "Dr. Nashita",
      department: "Cardiologist",
      date: "02 Sep 2023",
      time: "11:00 - 11:30 AM",
      patient: "Jane Smith",
    },
  ];

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
      <Sidebar />
      <div className="row g-4" style={{marginTop:"80px"}}>
        {/* Left section */}
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

        {/* Right section - Appointments */}
        <div className="col-lg-4">
          <div className="card upcomingAppointments shadow-lg rounded-4">
            <h5 className="fw-bold">Upcoming Appointments</h5>
            <div className="p-3">
              {appointments.map((item, index) => (
                <div key={index} className="mb-3 border-bottom pb-2">
                  <strong>{item.doctor}</strong>
                  <br />
                  <span className="text-muted">{item.department}</span>
                  <br />
                  <span>{item.patient}</span>
                  <br />
                  <span className="text-muted">
                    {item.date} | {item.time}
                  </span>
                </div>
              ))}
              <div className="text-end">
                <button className="btn commonBtn">
                  <span className="text-truncate w-100">View All</span>
                </button>
              </div>
            </div>
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
  );
};

export default Homepage;
