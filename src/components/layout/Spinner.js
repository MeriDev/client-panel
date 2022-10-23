import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loadng"
        style={{ display: 'block', margin: 'auto', width: '200px' }}
      />
    </div>
  );
};

export default Spinner;
