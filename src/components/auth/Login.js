import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../helpers/auth';
import Alert from '../layout/Alert';
import { notifyUser } from '../../redux/actions/notifyAction';

const Login = () => {
  // Init state
  const { message, messageType } = useSelector(state => state.notify);
  const [visible, setIsVisible] = useState(false);

  const { login } = useAuth();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { state } = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Showing and clearning the error message
  useEffect(() => {
    if (!message) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  // Submitting the form
  const onSubmit = e => {
    e.preventDefault();

    login({
      email,
      password,
    })
      .then(() => {
        navigate(state?.path || '/');
      })

      .catch(err => dispatch(notifyUser('Invalid login credentials', 'error')));
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {message && visible ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock"></i> Login
                </span>
              </h1>
              <form
                onSubmit={e => {
                  onSubmit(e);
                }}
              >
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    autoComplete="off"
                    onChange={e => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>
                <button className="btn btn-success btn-block">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
