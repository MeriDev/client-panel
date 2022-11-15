import { useSelector, useDispatch } from 'react-redux';
import {
  setDisableBalanceonAdd,
  setDisableBalanceonEdit,
  setAllowRegistration,
} from '../../redux/actions/SettingsActions';

import { Link } from 'react-router-dom';
import { useAuth } from '../../helpers/auth';
import Spinner from '../layout/Spinner';

const Settings = () => {
  const settings = useSelector(state => state.settings);
  const { auth } = useAuth();
  const dispatch = useDispatch();

  const { disableBalanceOnAdd, disableBalanceOnEdit, onAllowRegistration } =
    settings;

  const onAllowRegistrationChange = () => {
    dispatch(setAllowRegistration());
  };
  const onDisableBalanceAddChange = () => {
    dispatch(setDisableBalanceonAdd());
  };
  const onDisableBalanceEditChange = () => {
    dispatch(setDisableBalanceonEdit());
  };

  if (auth.uid) {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left"></i>
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Edit Setting</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registration</label>{' '}
                <input
                  type="checkbox"
                  name="allowRegistration"
                  onChange={() => onAllowRegistrationChange()}
                  checked={onAllowRegistration}
                />
              </div>
              <div className="form-group">
                <label>Disable balance on Add</label>{' '}
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  onChange={() => onDisableBalanceAddChange()}
                  checked={disableBalanceOnAdd}
                />
              </div>
              <div className="form-group">
                <label>Disable balance on Edit</label>{' '}
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  onChange={() => onDisableBalanceEditChange()}
                  checked={disableBalanceOnEdit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default Settings;
