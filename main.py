from flask import Flask,request,render_template,redirect
import pickle
import pandas as pd
import os


optionlist=[]
prediction={}


app = Flask(__name__)



@app.route('/')
def hello_world():
    return render_template("home.html")

@app.route('/home.html')
def home():
    return render_template("home.html")

@app.route('/legendary_checker.html')
def legendary():
    return render_template("legendary_checker.html")

@app.route('/pokemon_database.html')
def pokemon_database():
    return render_template("pokemon_database.html")



@app.route('/pokemon_comparator.html')
def pokemon_comparator():
    return render_template("pokemon_comparator.html")


@app.route('/legendary_output',methods=['POST','GET'])
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

    user_input = user_input[
        ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed', 'Generation', 'Type 1', 'Type 2', "Total"]]

    label1sav = './static/models/label1.sav'
    label2sav = './static/models/label2.sav'
    label1 = pickle.load(open(label1sav, 'rb'))
    label2 = pickle.load(open(label2sav, 'rb'))
    user_input["Type 1"] = label1.transform(user_input["Type 1"])
    user_input["Type 2"] = label2.transform(user_input["Type 2"])

    filename = './static/models/finalized_model.sav'
    loaded_model = pickle.load(open(filename, 'rb'))
    condition = loaded_model.predict(user_input)[0]
    # accuracy="AdaBoostClassifier:0.94375\nDecisionTreeClassifier:0.94375\nSVC:0.925\nLogisticRegression:0.91875\nBaggingClassifier:0.95625\nRandomForestClassifier:0.9375\nKNeighborsClassifier:0.9125\nGradientBoostingClassifier: 0.925\nXGBClassifier:0.9375\n"
    accuracy="AdaBoostClassifier:0.94375 \n Hello"

    path="./static/compare_models"
    dir_list = os.listdir(path)
    results = {}
    for i in dir_list:
        compare_filename = path+"/"+i
        loaded_model = pickle.load(open(compare_filename, 'rb'))
        # predictions=loaded_model.predict(user_input)[0]
        accuracy=loaded_model.predict_proba(user_input)[0]
        accuracy='{:.2f}%'.format(max(accuracy*100))
        classifier=i.replace('.sav', '')
        results[classifier]=accuracy
    print(results)

    stats={}

    if condition==False:
        legend='No'
    else:
        legend='Yes'

    stats['hp']=HP
    stats['attack']=Attack
    stats['defense']=Defense
    stats['sp_attack']=Sp_Attack
    stats['sp_defense']=Sp_Defense
    stats['speed']=Speed
    stats['generation']=Generation
    stats['type']=Type
    stats['subtype']=SubType
    stats['legend']=legend
    stats['algo']=results



    
    prediction[poke_name]=stats
    print(prediction)

    optionlist.append(poke_name)
    


    if condition==False:
        output="{} is not a Legendary Pokemon".format(poke_name)
    else:
        output = "{} is a Legendary Pokemon".format(poke_name)




    


    return render_template("legendary_checker.html",predictions=output,condition=condition,optionlist=optionlist,prediction=prediction,result=results)

if __name__ == '__main__':
	app.run()


