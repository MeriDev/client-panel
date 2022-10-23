import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

const Clients = () => {
  // fetching clients and connecting to redux
  useFirestoreConnect([{ collection: 'clients' }]);
  const clients = useSelector(state => state.firestore.ordered.clients);

  if (clients) {
    // add balances
    const total = clients.reduce((total, client) => {
      return total + parseFloat(client.balance);
    }, 0);
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2>
              <i className="fas fa-users" /> Clients
            </h2>
          </div>
          <div className="col-md-6">
            <h5 className="text-right text-secondary">
              Total Owed{' '}
              <span className="text-primary">
                ${Number(clients ? total : 0).toFixed(2)}
              </span>
            </h5>
          </div>
        </div>

        <table className="table table-striped">
          <thead className="thead thead-inverse">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>
                  {client.firstName} {client.lastName}
                </td>
                <td>{client.email}</td>
                <td>${parseFloat(client.balance).toFixed(2)}</td>
                <td>
                  <Link
                    to={`/client/${client.id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <i className="fas fa-arrow-circle-right"></i> Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default Clients;

// Clients.propTypes = {
//   firestore: PropTypes.object.isRequired,
//   clients: PropTypes.array,
// };

// export default compose(
//   firestoreConnect([{ collection: 'clients' }]),
//   connect((state, props) => ({
//     clients: state.firestore.ordered.clients,
//   }))
// )(Clients);
