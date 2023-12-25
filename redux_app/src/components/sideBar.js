import React from 'react'


export default function sideBar() {

  return (
    <div className="col-lg-2 d-none d-lg-block col-auto p-4 min-vh-100 bg-white">
      <div className="mt-3">
        <a className="text-decoration-none d-flex align-items-center text-dark" role="button">
          <span className="text-center fs-2 ms-3">NOTE APP</span>
        </a>

        <ul className="nav nav-pills flex-column mt-5 mt-sm-0">
          <li className="nav-item my-1">
            <a href="#" className="nav-link text-white mt-5 active" aria-current="page">
                <i className="bi bi-file-earmark-text"></i>
              <span className="ms-3">Create Notes</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
