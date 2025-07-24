import React from "react";
import BarChart from "./Firestchart";
import LineAreaChart from "./SecondChart";
import DonutChart from "./Incomegraph";
import SecondBar from "./SecondBar";
import ThirdBar from "./ThirdBar";
import FourthBar from "./FourthBar";

export default function Dashboard() {
  return (
    <div className="pc-container">
      <div className="pc-content">
        {/* [ Main Content ] start */}
        <div className="row dashboard">
          <div className="col-12">
            <div className=" welcome-banner bg-blue-800">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="p-4">
                      <h2 className="text-white">
                        Explore Redesigned Able Pro
                      </h2>
                      <h6 className="text-white">
                        The Brand new User Interface with power of Bootstrap
                        Components. Explore the Endless possibilities with Able
                        Pro.
                      </h6>
                      <a
                        href="https://1.envato.market/zNkqj6"
                        className="btn btn-outline-light"
                      >
                        Exclusive on Themeforest
                      </a>
                    </div>
                  </div>
                  <div className="col-sm-6 text-center">
                    <div className="img-welcome-banner">
                      <img
                        src="../assets/images/widget/welcome-banner.png"
                        alt="img"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xxl-3 dashboardCard">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="avtar avtar-s bg-light-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M13 11.15H7M2 11.15V6.53c0-2.04 1.65-3.69 3.69-3.69h5.62c2.04 0 3.69 1.27 3.69 3.31"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M17.48 12.2c-.5.48-.74 1.22-.54 1.98.25.93 1.17 1.52 2.13 1.52H20v1.45c0 2.21-1.79 4-4 4H6c-2.21 0-4-1.79-4-4v-7c0-2.21 1.79-4 4-4h10c2.2 0 4 1.8 4 4v1.45h-1.08c-.56 0-1.07.22-1.44.6Z"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M22 12.62v2.06c0 .56-.46 1.02-1.03 1.02h-1.93c-1.08 0-2.07-.79-2.16-1.87-.06-.63.18-1.22.6-1.63.37-.38.88-.6 1.44-.6h2.05c.57 0 1.03.46 1.03 1.02Z"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-0">All Earnings</h6>
                  </div>
                  <div className="flex-shrink-0 ms-3">
                    <div className="dropdown">
                      <a
                        className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none"
                        href="#"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="ti ti-dots-vertical f-18" />
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a className="dropdown-item" href="#">
                          Today
                        </a>{" "}
                        <a className="dropdown-item" href="#">
                          Weekly
                        </a>{" "}
                        <a className="dropdown-item" href="#">
                          Monthly
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-body p-3 mt-3 rounded">
                  <div className="row align-items-center">
                    <div className="col-7">
                      {/* <div id="all-earnings-graph" /> */}
                      <BarChart />
                    </div>
                    <div className="col-5">
                      <h5>$3,020</h5>
                      <p className="text-primary mb-0">
                        <i className="ti ti-arrow-up-right" /> 30.6%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xxl-3 dashboardCard">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="avtar avtar-s bg-light-warning">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3.5 18V7c0-4 1-5 5-5h7c4 0 5 1 5 5v10c0 .14 0 .28-.01.42"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M6.35 15H20.5v3.5c0 1.93-1.57 3.5-3.5 3.5H7c-1.93 0-3.5-1.57-3.5-3.5v-.65C3.5 16.28 4.78 15 6.35 15ZM8 7h8M8 10.5h5"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-0">Page Views</h6>
                  </div>
                  <div className="flex-shrink-0 ms-3">
                    <div className="dropdown">
                      <a
                        className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none"
                        href="#"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="ti ti-dots-vertical f-18" />
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a className="dropdown-item" href="#">
                          Today
                        </a>{" "}
                        <a className="dropdown-item" href="#">
                          Weekly
                        </a>{" "}
                        <a className="dropdown-item" href="#">
                          Monthly
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-body p-3 mt-3 rounded">
                  <div className="row align-items-center">
                    <div className="col-7">
                      {/* <div id="page-views-graph" /> */}
                      <SecondBar />
                    </div>
                    <div className="col-5">
                      <h5 className="mb-1">290K+</h5>
                      <p className="text-warning mb-0">
                        <i className="ti ti-arrow-up-right" /> 30.6%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xxl-3 dashboardCard">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="avtar avtar-s bg-light-success">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M15.695 13.7h.009M15.695 16.7h.009M11.995 13.7h.01M11.995 16.7h.01M8.294 13.7h.01M8.294 16.7h.01"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-0">Total Task</h6>
                  </div>
                  <div className="flex-shrink-0 ms-3">
                    <div className="dropdown">
                      <a
                        className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none"
                        href="#"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="ti ti-dots-vertical f-18" />
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a className="dropdown-item" href="#">
                          Today
                        </a>{" "}
                        <a className="dropdown-item" href="#">
                          Weekly
                        </a>{" "}
                        <a className="dropdown-item" href="#">
                          Monthly
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-body p-3 mt-3 rounded">
                  <div className="row align-items-center">
                    <div className="col-7">
                      {/* <div id="total-task-graph" /> */}
                      <ThirdBar />
                    </div>
                    <div className="col-5">
                      <h5 className="mb-1">839</h5>
                      <p className="text-success mb-0">
                        <i className="ti ti-arrow-up-right" /> New
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xxl-3 dashboardCard">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="avtar avtar-s bg-light-danger">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M8.11 11.85c-2.82.2-2.81 4.3 0 4.5h6.67c.81.01 1.59-.3 2.19-.84 1.98-1.73.92-5.2-1.68-5.53-.93-5.64-9.08-3.5-7.15 1.87"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M2 15c0 3.87 3.13 7 7 7l-1.05-1.75M22 9c0-3.87-3.13-7-7-7l1.05 1.75"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-0">Download</h6>
                  </div>
                  <div className="flex-shrink-0 ms-3">
                    <div className="dropdown">
                      <a
                        className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none"
                        href="#"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="ti ti-dots-vertical f-18" />
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a className="dropdown-item" href="#">
                          Today
                        </a>{" "}
                        <a className="dropdown-item" href="#">
                          Weekly
                        </a>{" "}
                        <a className="dropdown-item" href="#">
                          Monthly
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-body p-3 mt-3 rounded">
                  <div className="row align-items-center">
                    <div className="col-7">
                      {/* <div id="download-graph" /> */}
                      <FourthBar />
                    </div>
                    <div className="col-5">
                      <h5 className="mb-1">2,067</h5>
                      <p className="text-danger mb-0">
                        <i className="ti ti-arrow-up-right" /> 30.6%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 dashboardCard" style={{}}>
            <div className="card h-100 pb-0">
              <div className="card-bod y">
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-grow-1">
                    <h4 className="mb-0">Repeat customer rate</h4>
                  </div>
                  <div className="flex-shrink-0 ms-3">
                    <div className="dropdown">
                      <a
                        className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none"
                        href="#"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="ti ti-dots f-18" />
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a className="dropdown-item" href="#">
                          Today
                        </a>{" "}
                        <a className="dropdown-item" href="#">
                          Weekly
                        </a>{" "}
                        <a className="dropdown-item" href="#">
                          Monthly
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <h5 className="text-end my-2">
                  5.44% <span className="badge bg-success">+2.6%</span>
                </h5>
                {/* <div id="customer-rate-graph" /> */}
                <div id="customer-rate-graph">
                  <LineAreaChart />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 dashboardCard">
            <div className="card p-0 h-100 projectAble">
              <div className="card-header bg-white ">
                <h5 className="mb-0">Project - Able Pro</h5>
              </div>
              <div className="card-body" style={{ padding: "24px" }}>
                <div className="mb-4">
                  <p className="mb-2" style={{ color: "#000" }}>
                    Release v1.2.0<span className="float-end">70%</span>
                  </p>
                  <div
                    className="progress progress-primary"
                    style={{ height: "8px" }}
                  >
                    <div className="progress-bar" style={{ width: "70%" }} />
                  </div>
                </div>
                <div className="d-grid">
                  <a href="#" className="btn btn-link-secondary">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <span className="p-1 d-block bg-warning rounded-circle">
                          <span className="visually-hidden">New alerts</span>
                        </span>
                      </div>
                      <div className="flex-grow-1 mx-2">
                        <p className="mb-0 d-grid text-start">
                          <span className="text-truncate w-100">
                            Horizontal Layout
                          </span>
                        </p>
                      </div>
                      <div className="badge bg-light-secondary f-12">
                        <i className="ti ti-paperclip text-sm" /> 2
                      </div>
                    </div>
                  </a>
                  <a href="#" className="btn btn-link-secondary">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <span className="p-1 d-block bg-warning rounded-circle">
                          <span className="visually-hidden">New alerts</span>
                        </span>
                      </div>
                      <div className="flex-grow-1 mx-2">
                        <p className="mb-0 d-grid text-start">
                          <span className="text-truncate w-100">
                            Invoice Generator
                          </span>
                        </p>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="btn btn-link-secondary">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <span className="p-1 d-block bg-warning rounded-circle">
                          <span className="visually-hidden">New alerts</span>
                        </span>
                      </div>
                      <div className="flex-grow-1 mx-2">
                        <p className="mb-0 d-grid text-start">
                          <span className="text-truncate w-100">
                            Package Upgrades
                          </span>
                        </p>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="btn btn-link-secondary">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <span className="p-1 d-block bg-success rounded-circle">
                          <span className="visually-hidden">New alerts</span>
                        </span>
                      </div>
                      <div className="flex-grow-1 mx-2">
                        <p className="mb-0 d-grid text-start">
                          <span className="text-truncate w-100">
                            Figma Auto Layout
                          </span>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="d-grid mt-3">
                  <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2">
                    <i className="ti ti-plus" /> Add task
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-9">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Project overview</h5>
              <div className="dropdown"><a className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="ti ti-dots f-18" /></a>
                <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Today</a> <a className="dropdown-item" href="#">Weekly</a> <a className="dropdown-item" href="#">Monthly</a></div>
              </div>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col-md-6 col-xl-4">
                <div className="mt-3 row align-items-center">
                  <div className="col-6">
                    <p className="text-muted mb-1">Total Tasks</p>
                    <h5 className="mb-0">34,686</h5></div>
                  <div className="col-6">
                    <div id="total-tasks-graph" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-4">
                <div className="mt-3 row align-items-center">
                  <div className="col-6">
                    <p className="text-muted mb-1">Pending Tasks</p>
                    <h5 className="mb-0">3,786</h5></div>
                  <div className="col-6">
                    <div id="pending-tasks-graph" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-4">
                <div className="mt-3 d-grid">
                  <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2"><i className="ti ti-plus" /> Add project</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
          {/* <div className="col-lg-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <div className="avtar avtar-s bg-light-primary"><i className="ti ti-at f-20" /></div>
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-0">Able pro</h6><small className="text-muted">@ableprodevelop</small></div>
              <div className="dropdown"><a className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="ti ti-dots-vertical f-18" /></a>
                <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Today</a> <a className="dropdown-item" href="#">Weekly</a> <a className="dropdown-item" href="#">Monthly</a></div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-4">
              <div className="user-group able-user-group"><img src="../assets/images/user/avatar-1.jpg" alt="user-image" className="avtar" /> <img src="../assets/images/user/avatar-3.jpg" alt="user-image" className="avtar" /> <img src="../assets/images/user/avatar-4.jpg" alt="user-image" className="avtar" /> <img src="../assets/images/user/avatar-5.jpg" alt="user-image" className="avtar" /> <span className="avtar bg-light-primary text-primary text-sm">+2</span></div>
              <a href="#" className="avtar avtar-s btn btn-primary rounded-circle"><i className="ti ti-plus f-20" /></a>
            </div>
          </div>
        </div>
      </div> */}
          <div className="col-md-6 dashboardCard" style={{ marginTop: "24px" }}>
            <div className="card h-100 p-0">
              <div className="border-bottom pb-0">
                <div className="d-flex align-items-center justify-content-between cardTrans">
                  <h5 className="mb-0">Transactions</h5>
                  <div className="dropdown">
                    <a
                      className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none"
                      href="#"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="ti ti-dots-vertical f-18" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a className="dropdown-item" href="#">
                        Today
                      </a>{" "}
                      <a className="dropdown-item" href="#">
                        Weekly
                      </a>{" "}
                      <a className="dropdown-item" href="#">
                        Monthly
                      </a>
                    </div>
                  </div>
                </div>
                <ul
                  className="nav nav-tabs analytics-tab"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="analytics-tab-1"
                      data-bs-toggle="tab"
                      data-bs-target="#analytics-tab-1-pane"
                      type="button"
                      role="tab"
                      aria-controls="analytics-tab-1-pane"
                      aria-selected="true"
                    >
                      All Transaction
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="analytics-tab-2"
                      data-bs-toggle="tab"
                      data-bs-target="#analytics-tab-2-pane"
                      type="button"
                      role="tab"
                      aria-controls="analytics-tab-2-pane"
                      aria-selected="false"
                    >
                      Success
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="analytics-tab-3"
                      data-bs-toggle="tab"
                      data-bs-target="#analytics-tab-3-pane"
                      type="button"
                      role="tab"
                      aria-controls="analytics-tab-3-pane"
                      aria-selected="false"
                    >
                      Pending
                    </button>
                  </li>
                </ul>
              </div>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="analytics-tab-1-pane"
                  role="tabpanel"
                  aria-labelledby="analytics-tab-1"
                  tabIndex={0}
                >
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div className="avtar avtar-s border">AI</div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="row g-1">
                            <div className="col-6">
                              <h6 className="mb-0">Apple Inc.</h6>
                              <p className="text-muted mb-0">
                                <small>#ABLE-PRO-T00232</small>
                              </p>
                            </div>
                            <div className="col-6 text-end">
                              <h6 className="mb-1">$210,000</h6>
                              <p className="text-danger mb-0">
                                <i className="ti ti-arrow-down-left" /> 10.6%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div
                            className="avtar avtar-s border"
                            data-bs-toggle="tooltip"
                            data-bs-title="10,000 Tracks"
                          >
                            <span>SM</span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="row g-1">
                            <div className="col-6">
                              <h6 className="mb-0">Spotify Music</h6>
                              <p className="text-muted mb-0">
                                <small>#ABLE-PRO-T10232</small>
                              </p>
                            </div>
                            <div className="col-6 text-end">
                              <h6 className="mb-1">- 10,000</h6>
                              <p className="text-success mb-0">
                                <i className="ti ti-arrow-up-right" /> 30.6%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div
                            className="avtar avtar-s border bg-light-primary"
                            data-bs-toggle="tooltip"
                            data-bs-title="143 Posts"
                          >
                            <span>MD</span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="row g-1">
                            <div className="col-6">
                              <h6 className="mb-0">Medium</h6>
                              <p className="text-muted mb-0">
                                <small>06:30 pm</small>
                              </p>
                            </div>
                            <div className="col-6 text-end">
                              <h6 className="mb-1">-26</h6>
                              <p className="text-warning mb-0">
                                <i className="ti ti-arrows-left-right" /> 5%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div
                            className="avtar avtar-s border"
                            data-bs-toggle="tooltip"
                            data-bs-title="143 Posts"
                          >
                            <span>U</span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="row g-1">
                            <div className="col-6">
                              <h6 className="mb-0">Uber</h6>
                              <p className="text-muted mb-0">
                                <small>08:40 pm</small>
                              </p>
                            </div>
                            <div className="col-6 text-end">
                              <h6 className="mb-1">+210,000</h6>
                              <p className="text-success mb-0">
                                <i className="ti ti-arrow-up-right" /> 10.6%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div
                            className="avtar avtar-s border bg-light-warning"
                            data-bs-toggle="tooltip"
                            data-bs-title="143 Posts"
                          >
                            <span>OC</span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="row g-1">
                            <div className="col-6">
                              <h6 className="mb-0">Ola Cabs</h6>
                              <p className="text-muted mb-0">
                                <small>07:40 pm</small>
                              </p>
                            </div>
                            <div className="col-6 text-end">
                              <h6 className="mb-1">+210,000</h6>
                              <p className="text-success mb-0">
                                <i className="ti ti-arrow-up-right" /> 10.6%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div
                  className="tab-pane fade"
                  id="analytics-tab-2-pane"
                  role="tabpanel"
                  aria-labelledby="analytics-tab-2"
                  tabIndex={0}
                >
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div
                            className="avtar avtar-s border"
                            data-bs-toggle="tooltip"
                            data-bs-title="143 Posts"
                          >
                            <span>U</span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="row g-1">
                            <div className="col-6">
                              <h6 className="mb-0">Uber</h6>
                              <p className="text-muted mb-0">
                                <small>08:40 pm</small>
                              </p>
                            </div>
                            <div className="col-6 text-end">
                              <h6 className="mb-1">+210,000</h6>
                              <p className="text-success mb-0">
                                <i className="ti ti-arrow-up-right" /> 10.6%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div
                            className="avtar avtar-s border bg-light-warning"
                            data-bs-toggle="tooltip"
                            data-bs-title="143 Posts"
                          >
                            <span>OC</span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="row g-1">
                            <div className="col-6">
                              <h6 className="mb-0">Ola Cabs</h6>
                              <p className="text-muted mb-0">
                                <small>07:40 pm</small>
                              </p>
                            </div>
                            <div className="col-6 text-end">
                              <h6 className="mb-1">+210,000</h6>
                              <p className="text-success mb-0">
                                <i className="ti ti-arrow-up-right" /> 10.6%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div className="avtar avtar-s border">AI</div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="row g-1">
                            <div className="col-6">
                              <h6 className="mb-0">Apple Inc.</h6>
                              <p className="text-muted mb-0">
                                <small>#ABLE-PRO-T00232</small>
                              </p>
                            </div>
                            <div className="col-6 text-end">
                              <h6 className="mb-1">$210,000</h6>
                              <p className="text-danger mb-0">
                                <i className="ti ti-arrow-down-left" /> 10.6%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div
                            className="avtar avtar-s border"
                            data-bs-toggle="tooltip"
                            data-bs-title="10,000 Tracks"
                          >
                            <span>SM</span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="row g-1">
                            <div className="col-6">
                              <h6 className="mb-0">Spotify Music</h6>
                              <p className="text-muted mb-0">
                                <small>#ABLE-PRO-T10232</small>
                              </p>
                            </div>
                            <div className="col-6 text-end">
                              <h6 className="mb-1">- 10,000</h6>
                              <p className="text-success mb-0">
                                <i className="ti ti-arrow-up-right" /> 30.6%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div
                            className="avtar avtar-s border bg-light-primary"
                            data-bs-toggle="tooltip"
                            data-bs-title="143 Posts"
                          >
                            <span>MD</span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="row g-1">
                            <div className="col-6">
                              <h6 className="mb-0">Medium</h6>
                              <p className="text-muted mb-0">
                                <small>06:30 pm</small>
                              </p>
                            </div>
                            <div className="col-6 text-end">
                              <h6 className="mb-1">-26</h6>
                              <p className="text-warning mb-0">
                                <i className="ti ti-arrows-left-right" /> 5%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div
                  className="tab-pane fade"
                  id="analytics-tab-3-pane"
                  role="tabpanel"
                  aria-labelledby="analytics-tab-3"
                  tabIndex={0}
                >
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div
                            className="avtar avtar-s border"
                            data-bs-toggle="tooltip"
                            data-bs-title="10,000 Tracks"
                          >
                            <span>SM</span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="row g-1">
                            <div className="col-6">
                              <h6 className="mb-0">Spotify Music</h6>
                              <p className="text-muted mb-0">
                                <small>#ABLE-PRO-T10232</small>
                              </p>
                            </div>
                            <div className="col-6 text-end">
                              <h6 className="mb-1">- 10,000</h6>
                              <p className="text-success mb-0">
                                <i className="ti ti-arrow-up-right" /> 30.6%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div
                            className="avtar avtar-s border bg-light-primary"
                            data-bs-toggle="tooltip"
                            data-bs-title="143 Posts"
                          >
                            <span>MD</span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="row g-1">
                            <div className="col-6">
                              <h6 className="mb-0">Medium</h6>
                              <p className="text-muted mb-0">
                                <small>06:30 pm</small>
                              </p>
                            </div>
                            <div className="col-6 text-end">
                              <h6 className="mb-1">-26</h6>
                              <p className="text-warning mb-0">
                                <i className="ti ti-arrows-left-right" /> 5%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div
                            className="avtar avtar-s border"
                            data-bs-toggle="tooltip"
                            data-bs-title="143 Posts"
                          >
                            <span>U</span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="row g-1">
                            <div className="col-6">
                              <h6 className="mb-0">Uber</h6>
                              <p className="text-muted mb-0">
                                <small>08:40 pm</small>
                              </p>
                            </div>
                            <div className="col-6 text-end">
                              <h6 className="mb-1">+210,000</h6>
                              <p className="text-success mb-0">
                                <i className="ti ti-arrow-up-right" /> 10.6%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div className="avtar avtar-s border">AI</div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="row g-1">
                            <div className="col-6">
                              <h6 className="mb-0">Apple Inc.</h6>
                              <p className="text-muted mb-0">
                                <small>#ABLE-PRO-T00232</small>
                              </p>
                            </div>
                            <div className="col-6 text-end">
                              <h6 className="mb-1">$210,000</h6>
                              <p className="text-danger mb-0">
                                <i className="ti ti-arrow-down-left" /> 10.6%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div
                            className="avtar avtar-s border bg-light-warning"
                            data-bs-toggle="tooltip"
                            data-bs-title="143 Posts"
                          >
                            <span>OC</span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="row g-1">
                            <div className="col-6">
                              <h6 className="mb-0">Ola Cabs</h6>
                              <p className="text-muted mb-0">
                                <small>07:40 pm</small>
                              </p>
                            </div>
                            <div className="col-6 text-end">
                              <h6 className="mb-1">+210,000</h6>
                              <p className="text-success mb-0">
                                <i className="ti ti-arrow-up-right" /> 10.6%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-footer CreateView">
                <div className="row g-2">
                  <div className="col-md-6">
                    <div className="d-grid">
                      <button className="btn btn-outline-secondary d-grid">
                        <span className="text-truncate w-100">
                          View all Transaction History
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-grid">
                      <button className="btn btn-primary d-grid">
                        <span className="text-truncate w-100">
                          Create new Transaction
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 dashboardCard" style={{ marginTop: "24px" }}>
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5 className="mb-0">Total Income</h5>
                  <div className="dropdown">
                    <a
                      className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none"
                      href="#"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="ti ti-dots-vertical f-18" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a className="dropdown-item" href="#">
                        Today
                      </a>
                      <a className="dropdown-item" href="#">
                        Weekly
                      </a>
                      <a className="dropdown-item" href="#">
                        Monthly
                      </a>
                    </div>
                  </div>
                </div>
                <DonutChart />
                {/* <div id="total-income-graph" /> */}
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="bg-body p-3 rounded">
                      <div className="d-flex align-items-center mb-2">
                        <div className="flex-shrink-0">
                          <span className="p-1 d-block bg-primary rounded-circle">
                            <span className="visually-hidden">New alerts</span>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <p className="mb-0">Income</p>
                        </div>
                      </div>
                      <h6 className="mb-0">
                        $23,876{" "}
                        <small className="text-muted">
                          <i className="ti ti-chevrons-up" /> +$763,43
                        </small>
                      </h6>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="bg-body p-3 rounded">
                      <div className="d-flex align-items-center mb-2">
                        <div className="flex-shrink-0">
                          <span className="p-1 d-block bg-warning rounded-circle">
                            <span className="visually-hidden">New alerts</span>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <p className="mb-0">Rent</p>
                        </div>
                      </div>
                      <h6 className="mb-0">
                        $23,876{" "}
                        <small className="text-muted">
                          <i className="ti ti-chevrons-up" /> +$763,43
                        </small>
                      </h6>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="bg-body p-3 rounded">
                      <div className="d-flex align-items-center mb-2">
                        <div className="flex-shrink-0">
                          <span className="p-1 d-block bg-success rounded-circle">
                            <span className="visually-hidden">New alerts</span>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <p className="mb-0">Download</p>
                        </div>
                      </div>
                      <h6 className="mb-0">
                        $23,876{" "}
                        <small className="text-muted">
                          <i className="ti ti-chevrons-up" /> +$763,43
                        </small>
                      </h6>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="bg-body p-3 rounded">
                      <div className="d-flex align-items-center mb-2">
                        <div className="flex-shrink-0">
                          <span className="p-1 d-block bg-light-primary rounded-circle">
                            <span className="visually-hidden">New alerts</span>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <p className="mb-0">Views</p>
                        </div>
                      </div>
                      <h6 className="mb-0">
                        $23,876{" "}
                        <small className="text-muted">
                          <i className="ti ti-chevrons-up" /> +$763,43
                        </small>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
