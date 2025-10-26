import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaStar,
  FaArrowLeft,
  FaSmile,
  FaMeh,
  FaFrown,
  FaPlus,
} from "react-icons/fa";
import "./Dealers.css";
import "../assets/style.css";
import Header from "../Header/Header";

const Dealer = () => {
  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postReview, setPostReview] = useState(<></>);

  const DJANGO_URL = "http://127.0.0.1:8000";
  let params = useParams();
  let id = params.id;
  let dealer_url = `${DJANGO_URL}/djangoapp/dealer/${id}`;
  let reviews_url = `${DJANGO_URL}/djangoapp/reviews/dealer/${id}`;
  let post_review = `/postreview/${id}`;

  const get_dealer = async () => {
    try {
      const res = await fetch(dealer_url, {
        method: "GET",
      });
      const retobj = await res.json();

      if (retobj.status === 200 && retobj.dealer) {
        setDealer(retobj.dealer);
      } else {
        console.log("Dealer API returned status:", retobj.status);
      }
    } catch (error) {
      console.error("Error fetching dealer:", error);
    }
  };

  const get_reviews = async () => {
    try {
      const res = await fetch(reviews_url, {
        method: "GET",
      });
      const retobj = await res.json();

      if (retobj.status === 200) {
        if (
          retobj.reviews &&
          Array.isArray(retobj.reviews) &&
          retobj.reviews.length > 0
        ) {
          setReviews(retobj.reviews);
        } else {
          setUnreviewed(true);
        }
      } else {
        console.log("Reviews API returned status:", retobj.status);
        setUnreviewed(true);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setUnreviewed(true);
    }
  };

  const senti_icon = (sentiment) => {
    if (sentiment === "positive")
      return <FaSmile className="sentiment-icon positive" />;
    if (sentiment === "negative")
      return <FaFrown className="sentiment-icon negative" />;
    return <FaMeh className="sentiment-icon neutral" />;
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([get_dealer(), get_reviews()]);
      setLoading(false);
    };

    loadData();

    if (sessionStorage.getItem("username")) {
      setPostReview(
        <Link to={post_review} className="btn btn-primary write-review-btn">
          <FaPlus />
          Write Review
        </Link>
      );
    }
  }, [id]);

  // Refresh reviews when component becomes visible (e.g., when navigating back)
  useEffect(() => {
    const handleFocus = () => {
      get_reviews();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  if (loading) {
    return (
      <div className="dealer-page">
        <Header />
        <div
          className="loading-state"
          style={{ padding: "var(--spacing-2xl)", textAlign: "center" }}
        >
          <div className="spinner"></div>
          <p>Loading dealer information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dealer-page">
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-section">
        <div className="container">
          <Link to="/dealers" className="breadcrumb-link">
            <FaArrowLeft />
            Back to Dealers
          </Link>
        </div>
      </div>

      {/* Dealer Info Section */}
      <div className="dealer-info-section">
        <div className="container">
          <div className="dealer-info-card">
            <div className="dealer-header">
              <div className="dealer-details">
                <h1 className="dealer-title">{dealer.full_name}</h1>
                <div className="dealer-location-info">
                  <FaMapMarkerAlt className="location-icon" />
                  <span>
                    {dealer["address"]}, {dealer["city"]}, {dealer["state"]}{" "}
                    {dealer["zip"]}
                  </span>
                </div>
              </div>
              <div className="dealer-actions">{postReview}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <div className="container">
          <div className="reviews-header">
            <h2 className="reviews-title">Customer Reviews</h2>
            <div className="reviews-count">
              {reviews.length > 0 &&
                `${reviews.length} review${reviews.length !== 1 ? "s" : ""}`}
            </div>
          </div>

          <div className="reviews_panel">
            {reviews.length === 0 && unreviewed === false ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading Reviews...</p>
              </div>
            ) : unreviewed === true ? (
              <div className="empty-state">
                <FaStar className="empty-icon" />
                <h3>No reviews yet!</h3>
                <p>Be the first to share your experience with this dealer.</p>
                {sessionStorage.getItem("username") && (
                  <Link to={post_review} className="btn btn-primary">
                    <FaPlus />
                    Write First Review
                  </Link>
                )}
              </div>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className="review_panel">
                  <div className="review-header">
                    {senti_icon(review.sentiment)}
                    <div className="review-meta">
                      <span className="reviewer-name">{review.name}</span>
                      <span className="car-info">
                        {review.car_make} {review.car_model} {review.car_year}
                      </span>
                    </div>
                  </div>
                  <div className="review-content">{review.review}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dealer;
