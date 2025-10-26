import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaCalendarAlt, FaCar, FaEdit } from 'react-icons/fa';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState();
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  const DJANGO_URL = "http://127.0.0.1:8000";
  let params = useParams();
  let navigate = useNavigate();
  let id = params.id;
  let dealer_url = `${DJANGO_URL}/djangoapp/dealer/${id}`;
  let review_url = `${DJANGO_URL}/djangoapp/add_review`;
  let carmodels_url = `${DJANGO_URL}/djangoapp/get_cars`;

  const postreview = async ()=>{
    let name = sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname");
    //If the first and second name are stores as null, use the username
    if(name.includes("null")) {
      name = sessionStorage.getItem("username");
    }
    if(!model || review === "" || date === "" || year === "" || model === "") {
      alert("All details are mandatory")
      return;
    }

    let model_split = model.split(" ");
    let make_chosen = model_split[0];
    let model_chosen = model_split[1];

    let jsoninput = JSON.stringify({
      "name": name,
      "dealership": id,
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make_chosen,
      "car_model": model_chosen,
      "car_year": year,
    });

    console.log(jsoninput);
    const res = await fetch(review_url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: jsoninput,
  });

  const json = await res.json();
  if (json.status === 200) {
      navigate(`/dealer/${id}`);
  }

  }
  const get_dealer = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      setDealer(retobj.dealer)
    }
  }

  const get_cars = async ()=>{
    const res = await fetch(carmodels_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    let carmodelsarr = Array.from(retobj.CarModels)
    setCarmodels(carmodelsarr)
  }
  useEffect(() => {
    get_dealer();
    get_cars();
  },[]);


  return (
    <div className="post-review-page">
      <Header/>
      
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-section">
        <div className="container">
          <Link to={`/dealer/${id}`} className="breadcrumb-link">
            <FaArrowLeft />
            Back to {dealer.full_name}
          </Link>
        </div>
      </div>

      {/* Review Form Section */}
      <div className="review-form-section">
        <div className="container">
          <div className="review-form-card">
            <div className="form-header">
              <FaStar className="form-icon" />
              <div>
                <h1 className="form-title">Write a Review</h1>
                <p className="form-subtitle">Share your experience with {dealer.full_name}</p>
              </div>
            </div>

            <form className="review-form" onSubmit={(e) => { e.preventDefault(); postreview(); }}>
              <div className="form-group">
                <label htmlFor="review" className="form-label">
                  <FaEdit className="label-icon" />
                  Your Review
                </label>
                <textarea 
                  id='review' 
                  className="form-textarea"
                  placeholder="Tell us about your experience with this dealer..."
                  rows={6}
                  onChange={(e) => setReview(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date" className="form-label">
                    <FaCalendarAlt className="label-icon" />
                    Purchase Date
                  </label>
                  <input 
                    type="date" 
                    id="date"
                    className="form-input"
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="year" className="form-label">
                    <FaCar className="label-icon" />
                    Car Year
                  </label>
                  <input 
                    type="number" 
                    id="year"
                    className="form-input"
                    placeholder="e.g., 2023"
                    onChange={(e) => setYear(e.target.value)} 
                    max={2024} 
                    min={2015}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cars" className="form-label">
                  <FaCar className="label-icon" />
                  Car Make & Model
                </label>
                <select 
                  name="cars" 
                  id="cars" 
                  className="form-select"
                  onChange={(e) => setModel(e.target.value)}
                  required
                >
                  <option value="" defaultSelected disabled hidden>
                    Choose Car Make and Model
                  </option>
                  {carmodels.map((carmodel, index) => (
                    <option key={index} value={carmodel.CarMake+" "+carmodel.CarModel}>
                      {carmodel.CarMake} {carmodel.CarModel}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-actions">
                <Link to={`/dealer/${id}`} className="btn btn-secondary">
                  Cancel
                </Link>
                <button type="submit" className="btn btn-primary">
                  <FaStar />
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PostReview
