import React from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {
  return (
      <div className="row">
            <div className="card col-md-4 border-0 mb-3">
                <div className="card-header">Payments</div>
                <div className="card-body">View and all payment transactions</div>
                <div className="card-footer">
                    <Link to="/pay" className="btn btn-sm btn-info">
                        View Payments
                    </Link>
                </div>
            </div>
            
            <div className="card col-md-4 border-0 mb-3">
                <div className="card-header">Locations</div>
                <div className="card-body">View, create, update payment locations and Add Users to locations</div>
                <div className="card-footer">
                    <Link to="/locations" className="btn btn-sm btn-info">
                        Manage Locations
                    </Link>
                </div>
            </div>

            <div className="card col-md-4 border-0 mb-3">
                <div className="card-header">Users</div>
                <div className="card-body">View, update, enable and disable Users</div>
                <div className="card-footer">
                    <Link to="/users" className="btn btn-sm btn-info">
                        Manage Users
                    </Link>
                </div>
            </div>
            <div className="card col-md-4 border-0 mb-3">
                <div className="card-header">Banks</div>
                <div className="card-body">View, create, update, enable and disable Banks</div>
                <div className="card-footer">
                    <Link to="/banks" className="btn btn-sm btn-info">
                        Manage Banks
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
                <div className="card-header">Insititutions</div>
                <div className="card-body">View, create, update, Institutions to use this platform for payment</div>
                <div className="card-footer">
                    <Link to="/institutions" className="btn btn-sm btn-info">
                        Manage Institutions
                    </Link>
                </div>
                
            </div>
            <div className="card col-md-4 border-0 mb-3">
                <div className="card-header">Assignments</div>
                <div className="card-body">Assign Institutions' products to processing Banks/ Estabishments</div>
                <div className="card-footer">
                    <Link to="/assignments" className="btn btn-sm btn-info">
                        Manage Assignments
                    </Link>
                </div>
                
            </div>
            
            <div className="card col-md-4 border-0 mb-3">
                <div className="card-header">Products</div>
                <div className="card-body">View, create, update, Institution's Products</div>
                <div className="card-footer">
                    <Link to="/products" className="btn btn-sm btn-info">
                        Manage Products
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
