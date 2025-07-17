import React from 'react'

export default function ManageLabs() {
  return (
    <div className="pc-container">
    <div className="pc-content">{/* [ breadcrumb ] start */}
      <button className='btn btn-primary mx-2 px-4 my-3'> New Request</button>
      <div class="container my-12">
        <div className='w-100 border rounded p-2'>
  <ul className="nav nav-pills w-100" id="pills-tab" role="tablist">
    <li className="nav-item" role="presentation">
      <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab">New</button>
    </li>
    <li className="nav-item" role="presentation">
      <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab">Pending</button>
    </li>
    <li className="nav-item" role="presentation">
      <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab">Received</button>
    </li>
  </ul>
</div>


  <div class="tab-content" id="pills-tabContent">
    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
      <p>
      <div className="col-12">
    <div className="card table-card">
      <div className="card-header">
        <div className="d-sm-flex align-items-center justify-content-between">
          <h5 className="mb-3 mb-sm-0">New Labs</h5>
          {/* <div> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Doctor</a></div> */}
        </div>
      </div>
      <div className="card-body pt-3">
        <div className="table-responsive">
          <table className="table table-hover" id="pc-dt-simple">
            <thead>
              <tr>
                <th>Name</th>
                <th>Departments</th>
                <th>Qualification</th>
                <th>Mobile</th>
                <th>Joining Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0"><img src="../assets/images/user/avatar-1.jpg" alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Airi Satou</h6>
                    </div>
                  </div>
                </td>
                <td>Developer</td>
                <td>B.COM., M.COM.</td>
                <td>(123) 4567 890</td>
                <td>2023/09/12</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0"><img src="../assets/images/user/avatar-2.jpg" alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Ashton Cox</h6>
                    </div>
                  </div>
                </td>
                <td>Junior Technical</td>
                <td>B.COM., M.COM.</td>
                <td>(123) 4567 890</td>
                <td>2023/12/24</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0"><img src="../assets/images/user/avatar-3.jpg" alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Bradley Greer</h6>
                    </div>
                  </div>
                </td>
                <td>Sales Assistant</td>
                <td>B.A, B.C.A</td>
                <td>(123) 4567 890</td>
                <td>2022/09/19</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0"><img src="../assets/images/user/avatar-4.jpg" alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Brielle Williamson
                      </h6>
                    </div>
                  </div>
                </td>
                <td>JavaScript Developer</td>
                <td>B.A, B.C.A</td>
                <td>(123) 4567 890</td>
                <td>2022/08/22</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0"><img src="../assets/images/user/avatar-5.jpg" alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Airi Satou</h6>
                    </div>
                  </div>
                </td>
                <td>Developer</td>
                <td>B.COM., M.COM.</td>
                <td>(123) 4567 890</td>
                <td>2023/09/12</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
          </p>
    </div>
    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
       <div className="col-12">
    <div className="card table-card">
      <div className="card-header">
        <div className="d-sm-flex align-items-center justify-content-between">
          <h5 className="mb-3 mb-sm-0">Pending list</h5>
          {/* <div><a href="../admins/course-teacher-apply.html" className="btn btn-outline-secondary">Apply Teacher List</a> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Teacher</a></div> */}
        </div>
      </div>
      <div className="card-body pt-3">
        <div className="table-responsive">
          <table className="table table-hover" id="pc-dt-simple">
            <thead>
              <tr>
                <th>Name</th>
                <th>Departments</th>
                <th>Qualification</th>
                <th>Mobile</th>
                <th>Joining Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0"><img src="../assets/images/user/avatar-1.jpg" alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Airi Satou</h6>
                    </div>
                  </div>
                </td>
                <td>Developer</td>
                <td>B.COM., M.COM.</td>
                <td>(123) 4567 890</td>
                <td>2023/09/12</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0"><img src="../assets/images/user/avatar-2.jpg" alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Ashton Cox</h6>
                    </div>
                  </div>
                </td>
                <td>Junior Technical</td>
                <td>B.COM., M.COM.</td>
                <td>(123) 4567 890</td>
                <td>2023/12/24</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0"><img src="../assets/images/user/avatar-3.jpg" alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Bradley Greer</h6>
                    </div>
                  </div>
                </td>
                <td>Sales Assistant</td>
                <td>B.A, B.C.A</td>
                <td>(123) 4567 890</td>
                <td>2022/09/19</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0"><img src="../assets/images/user/avatar-4.jpg" alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Brielle Williamson
                      </h6>
                    </div>
                  </div>
                </td>
                <td>JavaScript Developer</td>
                <td>B.A, B.C.A</td>
                <td>(123) 4567 890</td>
                <td>2022/08/22</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0"><img src="../assets/images/user/avatar-5.jpg" alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Airi Satou</h6>
                    </div>
                  </div>
                </td>
                <td>Developer</td>
                <td>B.COM., M.COM.</td>
                <td>(123) 4567 890</td>
                <td>2023/09/12</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
    </div>
    <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
      <div className="col-12">
    <div className="card table-card">
      <div className="card-header">
        <div className="d-sm-flex align-items-center justify-content-between">
          <h5 className="mb-3 mb-sm-0">Received list</h5>
          {/* <div><a href="../admins/course-teacher-apply.html" className="btn btn-outline-secondary">Apply Teacher List</a> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Teacher</a></div> */}
        </div>
      </div>
      <div className="card-body pt-3">
        <div className="table-responsive">
          <table className="table table-hover" id="pc-dt-simple">
            <thead>
              <tr>
                <th>Name</th>
                <th>Departments</th>
                <th>Qualification</th>
                <th>Mobile</th>
                <th>Joining Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0"><img src="../assets/images/user/avatar-1.jpg" alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Airi Satou</h6>
                    </div>
                  </div>
                </td>
                <td>Developer</td>
                <td>B.COM., M.COM.</td>
                <td>(123) 4567 890</td>
                <td>2023/09/12</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0"><img src="../assets/images/user/avatar-2.jpg" alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Ashton Cox</h6>
                    </div>
                  </div>
                </td>
                <td>Junior Technical</td>
                <td>B.COM., M.COM.</td>
                <td>(123) 4567 890</td>
                <td>2023/12/24</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0"><img src="../assets/images/user/avatar-3.jpg" alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Bradley Greer</h6>
                    </div>
                  </div>
                </td>
                <td>Sales Assistant</td>
                <td>B.A, B.C.A</td>
                <td>(123) 4567 890</td>
                <td>2022/09/19</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0"><img src="../assets/images/user/avatar-4.jpg" alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Brielle Williamson
                      </h6>
                    </div>
                  </div>
                </td>
                <td>JavaScript Developer</td>
                <td>B.A, B.C.A</td>
                <td>(123) 4567 890</td>
                <td>2022/08/22</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0"><img src="../assets/images/user/avatar-5.jpg" alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Airi Satou</h6>
                    </div>
                  </div>
                </td>
                <td>Developer</td>
                <td>B.COM., M.COM.</td>
                <td>(123) 4567 890</td>
                <td>2023/09/12</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
    </div>
  </div>
</div>
    </div>
  </div>

  )
}
