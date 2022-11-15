import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { useAuth } from '../../helpers/auth';
import Spinner from '../layout/Spinner';

const AddClient = () => {
  useFirestoreConnect();

  const firestore = useFirestore();
  const settings = useSelector(state => state.settings);
  const { disableBalanceOnAdd } = settings;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [balance, setBalance] = useState('');

  const navigate = useNavigate();
  const { auth } = useAuth();

  const onSubmit = e => {
    e.preventDefault();

    const newClient = { firstName, lastName, email, phone, balance };

    // If no balance, make 0
    if (newClient.balance === '') {
      newClient.balance = 0;
    }

    firestore.add({ collection: 'clients' }, newClient).then(() => {
      navigate('/');
    });
  };

  if (auth.uid) {
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
                  onChange={e => setFirstName(e.target.value)}
                  value={firstName}
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
                  onChange={e => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email"> Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
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
                  onChange={e => setPhone(e.target.value)}
                  value={phone}
                />
              </div>

              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  className="form-control"
                  name="balance"
                  onChange={e => setBalance(e.target.value)}
                  value={balance}
                  disabled={disableBalanceOnAdd}
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

export default AddClient;
