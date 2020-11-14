import React from 'react';
import { Link } from 'react-router-dom';

export default function Hop() {
  return (
    <div className="row">
        <div className="card col-md-4 border-0 mb-3">
            <div className="card-header">Payments</div>
            <div className="card-body">View and all payment transactions</div>
            <div className="card-footer">
                <Link to="/pay" className="btn btn-sm btn-info">
                    View payments
                </Link>
            </div>
        </div>
        <div className="card col-md-4 border-0 mb-3">
            <div className="card-header">Users</div>
            <div className="card-body">View, enable and disable Users in your office</div>
            <div className="card-footer">
                <Link to="/users" className="btn btn-sm btn-info">
                    Manage Users
                </Link>
            </div>
        </div>
        <div className="card col-md-4 border-0 mb-3">
            <div className="card-header">Credit</div>
            <div className="card-body">Transfer funds to processors for use in payments</div>
            <div className="card-footer">
                <Link to="/credits" className="btn btn-sm btn-info">
                    Manage Credit Transfers
                </Link>
            </div> 
        </div>

        <div className="card col-md-4 border-0 mb-3">
            <div className="card-header">Assessments</div>
            <div className="card-body">View, and generate Reports on Assessments</div>
            <div className="card-footer">
                <Link to="/assessments" className="btn btn-sm btn-info">
                    Manage Assessments
                </Link>
            </div>
        </div>
    </div>
  );
}
