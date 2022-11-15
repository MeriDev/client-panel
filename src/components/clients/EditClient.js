import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';

import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const firestore = useFirestore();
  const settings = useSelector(state => state.settings);
  const { disableBalanceOnEdit } = settings;

  // fetching clients and connecting to redux
  useFirestoreConnect([{ collection: 'clients', storeAS: 'client', doc: id }]);
  const client = useSelector(
    ({ firestore: { ordered } }) => ordered.clients && ordered.clients[0]
  );

  // Refs to inputs
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const emailInput = useRef(null);
  const phoneInput = useRef(null);
  const balanceInput = useRef(null);

  // Submitting
  const onSubmit = e => {
    e.preventDefault();

    const updateClient = {
      firstName: firstNameInput.current.value,
      lastName: lastNameInput.current.value,
      email: emailInput.current.value,
      phone: phoneInput.current.value,
      balance:
        balanceInput.current.value === '' ? 0 : balanceInput.current.value,
    };

    // updating firestore
    firestore
      .update({ collection: 'clients', doc: client.id }, updateClient)
      .then(() => navigate('/'));
  };

  if (client) {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left"></i>
              Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  minLength="2"
                  required
                  defaultValue={client.firstName}
                  ref={firstNameInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lasttName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  minLength="2"
                  required
                  defaultValue={client.lastName}
                  ref={lastNameInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email"> Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  defaultValue={client.email}
                  ref={emailInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  minLength="10"
                  required
                  defaultValue={client.phone}
                  ref={phoneInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  className="form-control"
                  name="balance"
                  defaultValue={client.balance}
                  ref={balanceInput}
                  disabled={disableBalanceOnEdit}
                />
              </div>
              <button type="sumbit" className="btn btn-primary btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default EditClient;
