from flask import Flask, request, render_template, redirect
import pickle
import pandas as pd
import os
import requests
import random

optionlist = []
prediction = {}

app = Flask(__name__)

@app.route('/')
def hello_world():
    try:
        # Get a random Pokemon ID (Gen 1-8: 1-898)
        pokemon_id = random.randint(1, 898)
        
        # Fetch Pokemon data from PokeAPI
        response = requests.get(f'https://pokeapi.co/api/v2/pokemon/{pokemon_id}')
        if response.status_code == 200:
            pokemon_data = response.json()
            featured_pokemon = {
                'name': pokemon_data['name'].title(),
                'image': pokemon_data['sprites']['other']['official-artwork']['front_default']
            }
        else:
            featured_pokemon = {
                'name': 'Pikachu',
                'image': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
            }
    except Exception as e:
        print(f"Error fetching Pokemon: {e}")
        featured_pokemon = {
            'name': 'Pikachu',
            'image': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
        }
    
    return render_template("home.html", featured_pokemon=featured_pokemon, active_page='home')

@app.route('/home.html')
def home():
    return hello_world()

@app.route('/legendary_checker.html')
def legendary():
    try:
        legendary_ids = [144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251, 377, 378, 379, 380, 381, 382, 383, 384]
        pokemon_id = random.choice(legendary_ids)
        
        response = requests.get(f'https://pokeapi.co/api/v2/pokemon/{pokemon_id}')
        if response.status_code == 200:
            pokemon_data = response.json()
            legendary_pokemon = {
                'name': pokemon_data['name'].title(),
                'image': pokemon_data['sprites']['other']['official-artwork']['front_default']
            }
        else:
            legendary_pokemon = {
                'name': 'Mewtwo',
                'image': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png'
            }
    except Exception as e:
        print(f"Error fetching Pokemon: {e}")
        legendary_pokemon = {
            'name': 'Mewtwo',
            'image': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png'
        }
    
    return render_template("legendary_checker.html", legendary_pokemon=legendary_pokemon, active_page='legendary')

@app.route('/pokemon_database.html')
def pokemon_database():
    try:
        pokemon_id = random.randint(1, 898)
        response = requests.get(f'https://pokeapi.co/api/v2/pokemon/{pokemon_id}')
        if response.status_code == 200:
            pokemon_data = response.json()
            featured_pokemon = {
                'name': pokemon_data['name'].title(),
                'image': pokemon_data['sprites']['other']['official-artwork']['front_default']
            }
        else:
            featured_pokemon = {
                'name': 'Pikachu',
                'image': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
            }
    except Exception as e:
        print(f"Error fetching Pokemon: {e}")
        featured_pokemon = {
            'name': 'Pikachu',
            'image': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
        }
    
    return render_template("pokemon_database.html", featured_pokemon=featured_pokemon, active_page='database')

@app.route('/legendary_output', methods=['POST', 'GET'])
def legendary_output():
    poke_name = request.form['poke_name']
    HP = int(request.form['HP'])
    Attack = int(request.form['Attack'])
    Defense = int(request.form['Defense'])
    Sp_Attack = int(request.form['Sp_Attack'])
    Sp_Defense = int(request.form['Sp_Defense'])
    Speed = int(request.form['Speed'])
    Generation = int(request.form['Generation'])
    Type = request.form['Type']
    SubType = request.form['SubType']

    x_col = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed', 'Generation',
             'Type 1', 'Type 2', 'Total']

    user_input = {"Total": 0}
    data = [HP, Attack, Defense, Sp_Attack, Sp_Defense, Speed, Generation, Type, SubType]

    j = 0
    for i in x_col:
        if i != 'Total':
            user_input[i] = data[j]
        if (i != 'Generation' and i != 'Type 1' and i != 'Type 2' and i != 'Total'):
            user_input['Total'] += user_input[i]
        j = j + 1

    user_input = pd.DataFrame(user_input, index=[0])
    user_input = user_input[['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed', 'Generation', 'Type 1', 'Type 2', "Total"]]

    label1sav = './static/models/label1.sav'
    label2sav = './static/models/label2.sav'
    label1 = pickle.load(open(label1sav, 'rb'))
    label2 = pickle.load(open(label2sav, 'rb'))
    user_input["Type 1"] = label1.transform(user_input["Type 1"])
    user_input["Type 2"] = label2.transform(user_input["Type 2"])

    filename = './static/models/finalized_model.sav'
    loaded_model = pickle.load(open(filename, 'rb'))
    condition = loaded_model.predict(user_input)[0]

    path = "./static/compare_models"
    dir_list = os.listdir(path)
    results = {}
    for i in dir_list:
        compare_filename = path + "/" + i
        loaded_model = pickle.load(open(compare_filename, 'rb'))
        accuracy = loaded_model.predict_proba(user_input)[0]
        accuracy = '{:.2f}%'.format(max(accuracy * 100))
        classifier = i.replace('.sav', '')
        results[classifier] = accuracy

    stats = {
        'hp': HP,
        'attack': Attack,
        'defense': Defense,
        'sp_attack': Sp_Attack,
        'sp_defense': Sp_Defense,
        'speed': Speed,
        'generation': Generation,
        'type': Type,
        'subtype': SubType,
        'legend': 'Yes' if condition else 'No',
        'algo': results
    }

    prediction[poke_name] = stats
    optionlist.append(poke_name)
    output = f"{poke_name} {'is' if condition else 'is not'} a Legendary Pokemon"

    return render_template("legendary_checker.html", predictions=output, condition=condition, 
                         optionlist=optionlist, prediction=prediction, result=results)

if __name__ == '__main__':
    app.run(debug=True) 