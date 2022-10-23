import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';

import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import classnames from 'classnames';

const ClientDetails = () => {
  const { id } = useParams();
  const firestore = useFirestore();
  const navigate = useNavigate();

  // fetching clients and connecting to redux
  useFirestoreConnect([{ collection: 'clients', storeAS: 'client', doc: id }]);
  const client = useSelector(
    ({ firestore: { ordered } }) => ordered.clients && ordered.clients[0]
  );

  // Deleting client

  const onDeleteClick = () => {
    firestore
      .delete({ collection: 'clients', doc: client.id })
      .then(navigate('/'));
  };

  // Updatingthe balance
  const [showBalanceUpdate, setShowBalanceUpdate] = useState(false);
  const [balanceUpdateAmount, setBalanceUpdateAmount] = useState('');

  // Submitting balance
  const balanceSubmit = e => {
    e.preventDefault();

    // Updating the balance
    const balanceUpdate = {
      balance: parseFloat(balanceUpdateAmount),
    };

    // Update firstore
    firestore.update({ collection: 'clients', doc: client.id }, balanceUpdate);
  };

  // Building the form
  let balanceForm = (
    <form onSubmit={e => balanceSubmit(e)}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Update the balance"
          onChange={e => setBalanceUpdateAmount(e.target.value)}
          value={balanceUpdateAmount}
          name="balanceUpdateAmount"
        />
        <div className="input-group-append">
          <button type="sumbit" className="btn btn-outline-dark">
            Update
          </button>
        </div>
      </div>
    </form>
  );

  if (client) {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
            </Link>
          </div>
          <div className="col-md-6">
            <div className="btn-group float-right">
              <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                Edit
              </Link>
              <button className="btn btn-danger" onClick={onDeleteClick}>
                Delete
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="card">
          <h3 className="card-header">
            {client.firstName} {client.lastName}
          </h3>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8 col-sm-6">
                <h4>
                  Client ID: <span className="text-secondary">{client.id}</span>{' '}
                </h4>
              </div>
              <div className="col-md-4 col-sm-6">
                <h3 className="pull-right">
                  Balance:{' '}
                  <span
                    className={classnames({
                      'text-danger': client.balance > 0,
                      'text-success': client.balance <= 0,
                    })}
                  >
                    ${Number(client.balance).toFixed(2)}
                  </span>{' '}
                  <small>
                    <button
                      className="text-dark"
                      onClick={() => setShowBalanceUpdate(!showBalanceUpdate)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                  </small>
                </h3>
                {showBalanceUpdate && balanceForm}
              </div>
            </div>
            <hr />
            <ul className="list-group">
              <li className="list-group-item">Contact Email: {client.email}</li>
              <li className="list-group-item">Contact Phone: {client.phone}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default ClientDetails;
