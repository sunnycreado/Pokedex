# Pokémon Web Application

Welcome to the Pokémon Web Application! This project is a web-based application that allows users to explore Pokémon data, check if a Pokémon is legendary. The application is built using Flask for the backend and JavaScript for the frontend.

## Features

- **Random Pokémon Display**: Displays a random Pokémon on the homepage.
- **Legendary Checker**: Allows users to input Pokémon stats and check if a Pokémon is legendary.
- **Pokémon Database**: Browse and search through a database of Pokémon.


## Live Demo

Check out the live application at: [Pokedex LAPI](https://pokedex-lapi.onrender.com/)

## Technologies Used

- **Backend**: Flask
- **Frontend**: HTML, CSS, JavaScript
- **Data Handling**: Pandas, Pickle, Joblib
- **API**: PokeAPI for fetching Pokémon data

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sunnycreado/pokemon-web-app.git
   cd pokemon-web-app
   ```

2. **Install Dependencies**:
   Ensure you have Python installed. Then, install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Application**:
   Start the Flask application:
   ```bash
   python app.py
   ```

4. **Access the Application**:
   Open your web browser and go to `http://localhost:5000` to view the application.

## Code Structure

- **app.py**: Main Flask application file handling routes and logic.
- **static/js**: JavaScript files for handling frontend logic and interactions.
- **templates**: HTML templates for rendering pages.

## Key Code Snippets

- **Flask Application Initialization**:
  ```python:app.py
  startLine: 13
  endLine: 13
  ```

- **Random Pokémon Fetching**:
  ```python:app.py
  startLine: 24
  endLine: 50
  ```

- **Legendary Checker Logic**:
  ```python:app.py
  startLine: 108
  endLine: 185
  ```

- **JavaScript Pokémon Search**:
  ```javascript:static/js/database.js
  startLine: 32
  endLine: 80
  ```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.


## Contact

For any questions or feedback, please contact [sunnycreado100@gmail.com](mailto:sunnycreado100@gmail.com).
