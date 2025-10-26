import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaFilter, FaEye } from "react-icons/fa";
import "./Dealers.css";
import "../assets/style.css";
import Header from "../Header/Header";


const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  // let [state, setState] = useState("")
  let [states, setStates] = useState([]);

  // Django backend URL
  const DJANGO_URL = "http://127.0.0.1:8000";
  let dealer_url = `${DJANGO_URL}/djangoapp/get_dealers`;

  let dealer_url_by_state = `${DJANGO_URL}/djangoapp/get_dealers/`;

  const filterDealers = async (state) => {
    dealer_url_by_state = dealer_url_by_state + state;
    const res = await fetch(dealer_url_by_state, {
      method: "GET",
    });
    const retobj = await res.json();
    if (retobj.status === 200) {
      let state_dealers = Array.from(retobj.dealers);
      setDealersList(state_dealers);
    }
  };

  const get_dealers = async () => {
    const res = await fetch(dealer_url, {
      method: "GET",
    });
    const retobj = await res.json();
    if (retobj.status === 200) {
      let all_dealers = Array.from(retobj.dealers);
      let states = [];
      all_dealers.forEach((dealer) => {
        states.push(dealer.state);
      });

      setStates(Array.from(new Set(states)));
      setDealersList(all_dealers);
    }
  };
  useEffect(() => {
    get_dealers();
  }, []);

  let isLoggedIn = sessionStorage.getItem("username") !== null;
  
  return (
    <div className="dealers-page">
      <Header />
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title">Find Your Perfect Car Dealer</h1>
          <p className="hero-subtitle">Discover trusted dealerships in your area with verified reviews</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="container">
          <div className="filters-container">
            <div className="filter-group">
              <FaFilter className="filter-icon" />
              <select
                name="state"
                id="state"
                className="state-filter"
                onChange={(e) => filterDealers(e.target.value)}
              >
                <option value="" defaultSelected disabled hidden>
                  Filter by State
                </option>
                <option value="All">All States</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="results-count">
              {dealersList.length} dealer{dealersList.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </div>

      {/* Dealers Grid */}
      <div className="dealers-section">
        <div className="container">
          {dealersList.length === 0 ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading dealers...</p>
            </div>
          ) : (
            <div className="dealers-grid">
              {dealersList.map((dealer) => (
                <div key={dealer["id"]} className="dealer-card">
                  <div className="dealer-card-header">
                    <h3 className="dealer-name">
                      <Link to={"/dealer/" + dealer["id"]} className="dealer-link">
                        {dealer["full_name"]}
                      </Link>
                    </h3>
                    <span className="dealer-id">ID: {dealer["id"]}</span>
                  </div>
                  
                  <div className="dealer-location">
                    <FaMapMarkerAlt className="location-icon" />
                    <div className="location-details">
                      <div className="address">{dealer["address"]}</div>
                      <div className="city-state">{dealer["city"]}, {dealer["state"]} {dealer["zip"]}</div>
                    </div>
                  </div>

                  <div className="dealer-actions">
                    <Link to={"/dealer/" + dealer["id"]} className="btn btn-primary">
                      <FaEye />
                      View Details
                    </Link>
                    {isLoggedIn && (
                      <a href={`/postreview/${dealer["id"]}`} className="btn btn-secondary">
                        <FaStar />
                        Write Review
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dealers;
