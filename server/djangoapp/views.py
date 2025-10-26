from django.contrib.auth.models import User
from django.contrib.auth import logout
from django.http import JsonResponse
from django.contrib.auth import login, authenticate
import logging
import json
from django.views.decorators.csrf import csrf_exempt
from .populate import initiate

from .models import CarMake, CarModel

from .restapis import get_request, analyze_review_sentiments, post_review


# Get an instance of a logger
logger = logging.getLogger(__name__)


# Create your views here.
def get_cars(request):
    count = CarMake.objects.filter().count()
    print(count)
    if (count == 0):
        initiate
    car_models = CarModel.objects.select_related('car_make')
    cars = []
    for car_model in car_models:
        cars.append({"CarModel": car_model.name,
                     "CarMake": car_model.car_make.name})
    return JsonResponse({"CarModels": cars})


# Create a `login_request` view to handle sign in request
@csrf_exempt
def login_user(request):
    # Get username and password from request.POST dictionary
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    # Try to check if provide credential can be authenticated
    user = authenticate(username=username, password=password)
    data = {"userName": username}
    if user is not None:
        # If user is valid, call login method to login current user
        login(request, user)
        data = {"userName": username, "status": "Authenticated"}
    return JsonResponse(data)


# Create a `registration` view to handle user registration
@csrf_exempt
def registration(request):
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    first_name = data['firstName']
    last_name = data['lastName']
    email = data['email']
    
    # Check if user already exists
    username_exist = False
    email_exist = False
    try:
        User.objects.get(username=username)
        username_exist = True
    except:
        logger.debug("{} is new user".format(username))
    
    try:
        User.objects.get(email=email)
        email_exist = True
    except:
        logger.debug("{} is new email".format(email))
    
    if not username_exist and not email_exist:
        # Create user in Django built-in User model
        user = User.objects.create_user(
            username=username, 
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        # Login the user and redirect to list page
        login(request, user)
        data = {"userName": username, "status": "Authenticated"}
        return JsonResponse(data)
    else:
        error_msg = ""
        if username_exist:
            error_msg += "Username already exists. "
        if email_exist:
            error_msg += "Email already exists."
        data = {"userName": username, "error": error_msg}
        return JsonResponse(data)

# Create a `logout_request` view to handle sign out request
def logout_request(request):
    logout(request)
    data = {"userName": ""}
    return JsonResponse(data)


# Create a `registration` view to handle sign up request
@csrf_exempt
def registration(request):
    # load a json data from the request registration
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    first_name = data['firstName']
    last_name = data['lastName']
    email = data['email']
    username_exist = False
    try:
        User.objects.get(username=username)
        username_exist = True
    except User.DoesNotExist:
        logger.debug("{} is new user".format(username))

    if not username_exist:
        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password,
            email=email
        )
        login(request, user)
        data = {"userName": username, "status": "Authenticated"}
        return JsonResponse(data)
    else:
        data = {"userName": username, "error": "Already Registered"}
        return JsonResponse(data)


# Update the `get_dealerships` view to render the index page with
# a list of dealerships
def get_dealerships(request, state="All"):
    import os
    import json
    from django.conf import settings
    
    # Read dealerships from local JSON file
    json_file_path = os.path.join(settings.BASE_DIR, 'database', 'data', 'dealerships.json')
    
    try:
        with open(json_file_path, 'r') as file:
            data = json.load(file)
            dealerships = data.get('dealerships', [])
            
        # Filter by state if specified
        if state != "All":
            dealerships = [dealer for dealer in dealerships if dealer.get('state') == state]
            
        return JsonResponse({"status": 200, "dealers": dealerships})
    except FileNotFoundError:
        return JsonResponse({"status": 404, "message": "Dealerships data not found"})
    except Exception as e:
        return JsonResponse({"status": 500, "message": f"Error loading dealerships: {str(e)}"})


# Create a `get_dealer_reviews` view to render the reviews of a dealer
def get_dealer_reviews(request, dealer_id):
    if (dealer_id):
        endpoint = "/fetchReviews/dealer/" + str(dealer_id)
        reviews = get_request(endpoint)
        if reviews:
            for review_detail in reviews:
                response = analyze_review_sentiments(
                    review_detail['review'])
                print(response)
                review_detail['sentiment'] = response['sentiment']
        return JsonResponse({"status": 200, "reviews": reviews})
    else:
        return JsonResponse({"status": 400, "message": "Bad Request"})


# Create a `get_dealer_details` view to render the dealer details
def get_dealer_details(request, dealer_id):
    if dealer_id:
        import os
        import json
        from django.conf import settings
        
        # Read dealerships from local JSON file
        json_file_path = os.path.join(settings.BASE_DIR, 'database', 'data', 'dealerships.json')
        
        try:
            with open(json_file_path, 'r') as file:
                data = json.load(file)
                dealerships = data.get('dealerships', [])
                
            # Find the specific dealer
            dealer = next((d for d in dealerships if d.get('id') == dealer_id), None)
            
            if dealer:
                return JsonResponse({"status": 200, "dealer": dealer})
            else:
                return JsonResponse({"status": 404, "message": "Dealer not found"})
                
        except FileNotFoundError:
            return JsonResponse({"status": 404, "message": "Dealerships data not found"})
        except Exception as e:
            return JsonResponse({"status": 500, "message": f"Error loading dealer details: {str(e)}"})
    else:
        return JsonResponse({"status": 400, "message": "Bad Request"})


# Create a `add_review` view to submit a review
@csrf_exempt
def add_review(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            post_review(data)
            return JsonResponse({"status": 200})
        except Exception as e:
            print(f"Error posting review: {e}")
            return JsonResponse({"status": 401,
                                 "message": "Error in posting review"})
    else:
        return JsonResponse({"status": 405, "message": "Method not allowed"})
