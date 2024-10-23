import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="w-100 border-bottom">
      <div className="d-flex px-5 py-3 flex-wrap">
        <h1 className="fw-bold py-3 text-center">Campaign Manager Project</h1>

        <nav className="flex-grow-1 d-flex justify-content-end text-uppercase gap-4 align-items-center fw-bold flex-column flex-sm-row">
          <Link to="/" className="text-black text-decoration-none">
            Campaigns
          </Link>
          <Link to="/campaign/add" className="text-black text-decoration-none">
            New Campaign
          </Link>
          <Link to="/report" className="text-black text-decoration-none">
            Report
          </Link>
        </nav>
      </div>
    </header>
  );
};
