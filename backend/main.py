import pymysql
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS

import json

app = Flask(__name__)
CORS(app)

@app.route("/login", methods=['POST'])
def login():
    my_json = request.get_json()
    get_name = my_json.get("username")
    get_password = my_json.get("password")

    todolist = pymysql.connect(host='localhost',
                               user='root',
                               password='2001928Heang!',
                               database='todolist')
    cursor = todolist.cursor()
    sql1 = 'SELECT * FROM user as u WHERE u.username =' + '\'' + get_name + '\'' + 'AND u.password =' + '\'' \
           + get_password + '\''

    try:
        cursor.execute(sql1)
        username_result = cursor.fetchall()

        if len(username_result) == 0:
            return jsonify(msg='Username/password not found. Please enter a valid username/password.', status='Fail')
        else:
            return jsonify(msg='Login successful! Click "ok" to view your to do list!', status='Success')

    except:
        return jsonify(msg='Sorry, we are unable to fetch data.', status='Fail')

    todolist.close()

@app.route("/mainpage", methods=['GET'])
def viewtodo():
    get_name = request.args.get("username")
    todolist = pymysql.connect(host='localhost',
                               user='root',
                               password='2001928Heang!',
                               database='todolist')
    cursor = todolist.cursor()
    sql1 = 'SELECT t.* FROM user AS u INNER JOIN todocontent AS t ON u.username = t.username AND t.username =' \
       + '\'' + get_name + '\'' + 'ORDER BY due_date'

    try:
        cursor.execute(sql1)
        todotasks_results = cursor.fetchall()
        todo_list = []
        for task in todotasks_results:
            dict = {'username':task[0],'content':task[1],'dueDate':task[2],'id':task[3]}
            todo_list.append(dict)

        return jsonify(status='success', data=todo_list, msg='Retrieving data succeed!')

    except:
        return jsonify(msg='Sorry, we are unable to retrieve data.')

    todolist.close()



@app.route("/createaccount", methods=['POST'])
def create_account():
    my_json = request.get_json()
    get_name = my_json.get('username')
    get_password = my_json.get('password')

    todolist = pymysql.connect(host='localhost',
                               user='root',
                               password='2001928Heang!',
                               database='todolist')
    cursor = todolist.cursor()
    sql1 = 'SELECT * FROM user AS u WHERE u.username =' + '\'' + get_name + '\''
    sql2 = 'INSERT INTO user VALUES(' + '\'' + get_name + '\',\'' + get_password + '\')'

    try:
        cursor.execute(sql1)
        check_account_results = cursor.fetchall()

        if len(check_account_results) != 0:
            return jsonify(msg='An existing account detected. Please login or use another username to register.'\
                           , status='Fail')
        else:
            cursor.execute(sql2)
            todolist.commit()
        return jsonify(msg='Account created successfully! Redirecting to login page...', status="Success")
    except:
        todolist.rollback()
        return jsonify(msg='Creating account failed. Pleaes try again.', status="Fail")

    todolist.close()



@app.route("/addtodo", methods=['POST'])
def addtodo():
    my_json = request.get_json()
    get_name = my_json.get('username')
    get_content = my_json.get('content')
    get_due_date =  my_json.get('due_date')
    get_id = my_json.get('id')

    todolist = pymysql.connect(host='localhost',
                               user='root',
                               password='2001928Heang!',
                               database='todolist')
    cursor = todolist.cursor()
    sql1 = 'INSERT INTO todocontent VALUES(' + '\'' + get_name + '\',\'' + get_content +  '\',\'' \
           + get_due_date + '\',\'' + get_id + '\')'
    try:
        cursor.execute(sql1)
        todolist.commit()
        return jsonify(msg='New to do tasks has been added!')
    except:
        todolist.rollback()
        return jsonify(msg='Creating tasks failed. Please try again later.')

    todolist.close()

@app.route("/removetodo", methods=['POST'])
def removetodo():
    my_json = request.get_json()
    get_id = my_json.get('id')

    todolist = pymysql.connect(host='localhost',
                               user='root',
                               password='2001928Heang!',
                               database='todolist')
    cursor = todolist.cursor()
    sql1 = 'DELETE FROM todocontent WHERE id = \'' + get_id + '\''
    try:
        cursor.execute(sql1)
        todolist.commit()
        return jsonify(msg='The selected task has been marked done!')
    except:
        todolist.rollback()
        return jsonify(msg='Removing tasks failed. Please try again later.')



@app.route("/updatetodo", methods=['POST'])
def updatetodo():
    my_json = request.get_json()
    get_id = my_json.get('id')
    updated_content = my_json.get('content')
    updated_due_date = my_json.get('due_date')

    todolist = pymysql.connect(host='localhost',
                               user='root',
                               password='2001928Heang!',
                               database='todolist')
    cursor = todolist.cursor()
    sql1 = 'UPDATE todocontent SET content = \'' + updated_content + '\' , due_date = \'' + updated_due_date + '\'' \
    + 'WHERE id = \'' + get_id + '\''
    try:
        cursor.execute(sql1)
        todolist.commit()
        return jsonify(msg="Updated Successfully!")
    except:
        todolist.rollback()
        return jsonify(msg="Fail to update")

    todolist.close()







app.run(host="0.0.0.0")
