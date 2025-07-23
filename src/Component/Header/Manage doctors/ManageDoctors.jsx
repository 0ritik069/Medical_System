import React from 'react'
import Sidebar from '../Sideabar/Sidebar'
import Header from '../Header'

export default function ManageDoctors() {
  return (
    <div>
        <Header />
        <Sidebar/>
         <div className="offcanvas pc-announcement-offcanvas offcanvas-end" tabIndex={-1} id="announcement" aria-labelledby="announcementLabel">
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="announcementLabel">What's new announcement?</h5><button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
    </div>
    <div className="offcanvas-body">
      <p className="text-span">Today</p>
      <div className="card mb-3">
        <div className="card-body">
          <div className="align-items-center d-flex flex-wrap gap-2 mb-3">
            <div className="badge bg-light-success f-12">Big News</div>
            <p className="mb-0 text-muted">2 min ago</p><span className="badge dot bg-warning" />
          </div>
          <h5 className="mb-3">Able Pro is Redesigned</h5>
          <p className="text-muted">Able Pro is completely renowed with high aesthetics User Interface.</p><img src="../assets/images/layout/img-announcement-1.png" alt="img" className="img-fluid mb-3" />
          <div className="row">
            <div className="col-12">
              <div className="d-grid"><a className="btn btn-outline-secondary" href="https://1.envato.market/zNkqj6" target="_blank">Check Now</a></div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <div className="align-items-center d-flex flex-wrap gap-2 mb-3">
            <div className="badge bg-light-warning f-12">Offer</div>
            <p className="mb-0 text-muted">2 hour ago</p><span className="badge dot bg-warning" />
          </div>
          <h5 className="mb-3">Able Pro is in best offer price</h5>
          <p className="text-muted">Download Able Pro exclusive on themeforest with best price.</p><a href="https://1.envato.market/zNkqj6" target="_blank"><img src="../assets/images/layout/img-announcement-2.png" alt="img" className="img-fluid" /></a>
        </div>
      </div>
      <p className="text-span mt-4">Yesterday</p>
      <div className="card mb-3">
        <div className="card-body">
          <div className="align-items-center d-flex flex-wrap gap-2 mb-3">
            <div className="badge bg-light-primary f-12">Blog</div>
            <p className="mb-0 text-muted">12 hour ago</p><span className="badge dot bg-warning" />
          </div>
          <h5 className="mb-3">Featured Dashboard Template</h5>
          <p className="text-muted">Do you know Able Pro is one of the featured dashboard template selected by
            Themeforest team.?</p><img src="../assets/images/layout/img-announcement-3.png" alt="img" className="img-fluid" />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <div className="align-items-center d-flex flex-wrap gap-2 mb-3">
            <div className="badge bg-light-primary f-12">Announcement</div>
            <p className="mb-0 text-muted">12 hour ago</p><span className="badge dot bg-warning" />
          </div>
          <h5 className="mb-3">Buy Once - Get Free Updated lifetime</h5>
          <p className="text-muted">Get the lifetime free updates once you purchase the Able Pro.</p><img src="../assets/images/layout/img-announcement-4.png" alt="img" className="img-fluid" />
        </div>
      </div>
    </div>
  </div>{/* [ Header ] end */}{/* [ Main Content ] start */}
  <div className="pc-container">
    <div className="pc-content">{/* [ breadcrumb ] start */}
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="../index_html.html">Home</a></li>
                <li className="breadcrumb-item"><a href="javascript: void(0)">Dashboard</a></li>
                <li className="breadcrumb-item" aria-current="page">Manage Doctors</li>
              </ul>
            </div>
            <div className="col-md-12">
              <div className="page-header-title">
                <h2 className="mb-0">Manage Doctors</h2>
              </div>
            </div>
          </div>
        </div>
      </div>{/* [ breadcrumb ] end */}{/* [ Main Content ] start */}
    <div class="col-sm-12"><div class="card"><div class="card-body pc-component"><h5 class="mb-3">Basic Tabs</h5><ul class="nav nav-tabs mb-3" id="myTab" role="tablist"><li class="nav-item" role="presentation"><a class="nav-link text-uppercase active" id="home-tab" data-bs-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a></li><li class="nav-item" role="presentation"><a class="nav-link text-uppercase" id="profile-tab" data-bs-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false" tabindex="-1">Profile</a></li><li class="nav-item" role="presentation"><a class="nav-link text-uppercase" id="contact-tab" data-bs-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false" tabindex="-1">Contact</a></li></ul><div class="tab-content" id="myTabContent"><div class="tab-pane fade active show" id="home" role="tabpanel" aria-labelledby="home-tab"><p class="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p></div><div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"><p class="mb-0">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p></div><div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"><p class="mb-0">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p></div></div></div></div></div>
    </div>
  </div>{/* [ Main Content ] end */}
    </div>
  )
}
