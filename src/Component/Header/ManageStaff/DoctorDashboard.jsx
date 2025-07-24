
export default function DoctorDashboard() {
     const patients = [
    { id: 1, name: 'Waqaar Ahmed', age: 29, sex: 'Male', fileNo: '09834', date: '29-04-2025', time: '07:57 pm', allergy: 'Lactose intolerance' },
    { id: 2, name: 'Shehbaz Sikand', age: 29, sex: 'Male', fileNo: '09834', date: '29-04-2025', time: '07:57 pm', allergy: 'Lactose intolerance' },
    { id: 3, name: 'Waqaar Ahmed', age: 29, sex: 'Male', fileNo: '09834', date: '29-04-2025', time: '07:57 pm', allergy: 'Lactose intolerance' },
    { id: 4, name: 'Shehbaz Sikand', age: 29, sex: 'Male', fileNo: '09834', date: '29-04-2025', time: '07:57 pm', allergy: 'Lactose intolerance' },
    { id: 5, name: 'Waqaar Ahmed', age: 29, sex: 'Male', fileNo: '09834', date: '29-04-2025', time: '07:57 pm', allergy: 'Lactose intolerance' },
    { id: 6, name: 'Shehbaz Sikand', age: 29, sex: 'Male', fileNo: '09834', date: '29-04-2025', time: '07:57 pm', allergy: 'Lactose intolerance' },
  ];
  return (
    <div className="pc-container">
      <div className="pc-content ">
<div className="container py-4" style={{ backgroundColor: '#eef5fb', minHeight: '100vh' }}>
      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        {[
          { title: 'Total Appointments', count: 15, icon: 'bi-people-fill', color: 'primary' },
          { title: 'Consulted', count: 3, icon: 'bi-person-check-fill', color: 'info' },
          { title: 'Pending', count: 10, icon: 'bi-hourglass-split', color: 'warning' },
          { title: 'Cancelled', count: 2, icon: 'bi-x-circle-fill', color: 'danger' }
        ].map((card, i) => (
          <div key={i} className="col-md-3">
            <div className="card p-3 d-flex flex-row justify-content-between align-items-center shadow-sm rounded-3">
              <div className="d-flex align-items-center">
                <i className={`bi ${card.icon} text-${card.color} fs-3 me-3`}></i>
                <div>
                  <div className="fw-bold">{card.title}</div>
                  <div className={`fs-4 text-${card.color}`}>{card.count}</div>
                </div>
              </div>
              <img src="https://via.placeholder.com/50x40?text=📊" alt="icon" />
            </div>
          </div>
        ))}
      </div>

      {/* Patient List and Calendar */}
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card p-3 shadow-sm rounded-3">
            <h5>Patient List</h5>
            <div className="table-responsive mt-3">
              <table className="table table-bordered align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>Sn</th>
                    <th>Patient Name</th>
                    <th>Age</th>
                    <th>Sex</th>
                    <th>File No</th>
                    <th>Date</th>
                    <th>Visit Time</th>
                    <th>Vitals</th>
                    <th>Allergy</th>
                    <th>Comments</th>
                    <th>Insurance</th>
                    <th>Call</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p, index) => (
                    <tr key={p.id}>
                      <td><span className={`badge bg-${['danger', 'warning', 'info', 'primary', 'success', 'dark'][index % 6]}`}>{index + 1}</span></td>
                      <td><img src="https://via.placeholder.com/32" className="rounded-circle me-2" alt="avatar" />{p.name}</td>
                      <td>{p.age}</td>
                      <td>{p.sex}</td>
                      <td><a href="#">{p.fileNo}</a></td>
                      <td>{p.date}</td>
                      <td>{p.time}</td>
                      <td><i className="bi bi-eye-fill"></i></td>
                      <td>{p.allergy}</td>
                      <td>None</td>
                      <td>None</td>
                      <td><i className="bi bi-telephone-fill text-primary" role="button"></i></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="col-lg-4">
          <div className="card p-3 shadow-sm rounded-3">
            <h6>May 2025</h6>
            <table className="table table-bordered text-center mt-2">
              <thead>
                <tr>
                  <th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr>
                <tr><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td></tr>
                <tr><td>15</td><td>16</td><td>17</td><td className="bg-primary text-white">18</td><td>19</td><td>20</td><td>21</td></tr>
                <tr><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td></tr>
                <tr><td>29</td><td>30</td><td>31</td><td></td><td></td><td></td><td></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}
