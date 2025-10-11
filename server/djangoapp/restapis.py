import requests
import os
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv(
    'backend_url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv(
    'sentiment_analyzer_url',
    default="http://localhost:5050/")


def get_request(endpoint, **kwargs):
    params = ""
    if (kwargs):
        for key, value in kwargs.items():
            params = params + key + "=" + value + "&"
    request_url = backend_url + endpoint + "?" + params

    print("GET from {} ".format(request_url))
    try:
        response = requests.get(request_url)
        return response.json()
    except Exception as e:
        print(f"Network exception occurred: {e}")
        return None


def analyze_review_sentiments(text):
    """Analyze sentiment locally without microservice"""
    try:
        from nltk.sentiment import SentimentIntensityAnalyzer
        import nltk

        # Download vader_lexicon if not already present
        try:
            nltk.data.find('vader_lexicon')
        except LookupError:
            nltk.download('vader_lexicon')

        sia = SentimentIntensityAnalyzer()
        scores = sia.polarity_scores(text)

        pos = float(scores['pos'])
        neg = float(scores['neg'])
        neu = float(scores['neu'])

        if neg > pos and neg > neu:
            sentiment = "negative"
        elif neu > neg and neu > pos:
            sentiment = "neutral"
        else:
            sentiment = "positive"

        return {"sentiment": sentiment}
    except ImportError:
        # Fallback if nltk is not available
        return {"sentiment": "neutral"}


def post_review(data_dict):
    request_url = backend_url + "/insert_review"
    try:
        response = requests.post(request_url, json=data_dict)
        print(response.json())
        return response.json()
    except Exception as e:
        print(f"Network exception occurred: {e}")
        return None


# Add code for posting review
