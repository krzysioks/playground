import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';

const Unauthorized = () => {
    return (
        <div>
            <Alert color="danger" className="d-flex justify-content-center">
                You are not authorized to access this page. Please
                <Link className="ml-1" to="/task/login">
                    {' '}
                    log in
                </Link>
            </Alert>
        </div>
    );
};
export default Unauthorized;
