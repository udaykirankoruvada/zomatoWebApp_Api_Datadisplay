# Zomato Restaurant Listing & Searching Application

This project is a Zomato Restaurant Listing and Searching application, which includes data loading, a web API service, and a user interface for displaying restaurant information.

## Key Features

### 1. Data Loading
An independent script loads the Zomato restaurant data from [this dataset](https://www.kaggle.com/datasets/shrutimehta/zomato-restaurants-data) into a database, making it accessible for further use in the API and UI.

### 2. Web API Service
A RESTful web API service provides the following endpoints:

- **Get Restaurant by ID**: Retrieve detailed information about a specific restaurant using its unique ID.
- **Get List of Restaurants**: Fetch a paginated list of restaurants.

### 3. User Interface
A web application with the following pages:

- **Restaurant List Page**: Displays a list of restaurants, with the ability to click on a restaurant to view more details.
- **Restaurant Detail Page**: Shows the complete details of a specific restaurant.



## How to Run

1. **Data Loading**: Run the script`dataRead_insertTo_db` provided in the `zomato-app` directory to load the Zomato restaurant data into the database.
2. **API Service**: Start the web API by running the `App.js` file in the `api` directory.
3. **User Interface**: Launch the frontend web application by running the `client` code.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript (React)
- **Database**: sql3lite
- **API Communication**: RESTful APIs
- **Data Loading**: Node.js script


