import React from 'react';
import { Link } from 'react-router-dom';

export default function Hoplinks() {
  return (
    <div className="dropdown mr-3">
      <button className="btn btn-link text-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Your tasks <i className="fa fa-cogs"></i>
      </button>
      <div className="dropdown-menu bg-dark text-light border-0" aria-labelledby="dropdownMenuButton">
          <Link className="nav-link text-light mr-3" to="/users">Users</Link>
          <Link className="nav-link text-light mr-3" to="/credits">Credit</Link>
          <Link className="nav-link text-light mr-3" to="/assessments">Assessments</Link>
          <Link className="nav-link text-light mr-3" to="/pay">Payments</Link>
      </div>
    </div>
  );
}
