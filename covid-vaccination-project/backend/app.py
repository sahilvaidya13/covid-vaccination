from flask import Flask, jsonify,request
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from bson import json_util
app = Flask(__name__)

# Replace 'your_mongodb_uri' with your actual MongoDB Atlas connection string
app.config['MONGO_URI'] = 'mongodb+srv://sahil:1306@cluster0.wbigw8d.mongodb.net/vaccination?retryWrites=true&w=majority'
mongo = PyMongo(app)


def generate_user_id():
    last_user = mongo.db.users.find_one(sort=[('user_id', -1)])
    if last_user and 'user_id' in last_user:
        last_user_id = last_user['user_id']
        new_user_id = int(last_user_id[3:]) + 1
        return f'UID{new_user_id:02d}'
    else:
        return 'UID01'

@app.route('/api/signup',methods=['POST'])
def signup_user():
    data = request.get_json()
    name = data.get('name')
    username = data.get('username')
    user = mongo.db.users.find_one({'username': username})
    if user:
        return jsonify({'status' : False})
    else:
        user_id = generate_user_id()
        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
        collection = mongo.db.users
        
        
        collection.insert_one({
        'user_id':user_id,
        'name':name,
        'username':username,
        'pass':hashed_password,    
        })
        return jsonify({'status':True}), 201
    
    
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = mongo.db.users.find_one({'username': username})

    if user and check_password_hash(user['pass'], password):
        
        return jsonify({'status': True, 'message': 'Login successful','data':user['user_id']}), 200
    else:
        return jsonify({'status': False, 'message': 'Invalid credentials'}), 401
    
    

@app.route('/api/adminlogin', methods=['POST'])
def admin_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = mongo.db.users.find_one({'username': username})

    if username=="vaccadmin2024" and password=="goldy13june2001":
        
        return jsonify({'status': True, 'message': 'Login successful'}), 200
    else:
        return jsonify({'status': False, 'message': 'Invalid credentials'}), 401
        

@app.route('/api/test', methods=['GET'])
def get_data():
    
    return jsonify({'response':'YoYo, Server at your service!'})


@app.route('/api/users', methods=['GET'])
def get_all_users():
    collection = mongo.db.users  # Replace with your actual collection name
    users = collection.find()

    # Serialize ObjectId to string using json_util for each user
    serialized_users = [
        {**user, '_id': json_util.dumps(user['_id'])}
        for user in users
    ]

    return jsonify(serialized_users)


@app.route('/api/allcenters', methods=['GET'])
def get_all_centers():
    collection = mongo.db.vacc_centers  # Replace with your actual collection name
    centers = collection.find()

    # Serialize ObjectId to string using json_util for each user
    serialized_centers = [
        {**center, '_id': json_util.dumps(center['_id'])}
        for center in centers
    ]

    return jsonify(serialized_centers)


@app.route('/api/singlecenter/<string:centr_id>', methods=['GET'])
def get_single_center(centr_id):
    collection = mongo.db.vacc_centers  # Replace with your actual collection name
    user = collection.find_one({'center_id':centr_id})
    print(user)
    user['_id'] = json_util.dumps(user['_id'])
    # Serialize ObjectId to string using json_util for each user


    return jsonify(user)


@app.route('/api/deletecenter/<string:centr_id>', methods=['DELETE'])
def delete_single_center(centr_id):
    collection = mongo.db.vacc_centers  # Replace with your actual collection name
    user = collection.find_one_and_delete({'center_id':centr_id})
    if user:
        return jsonify({'status':True})
    else:
        return jsonify({'status':False})
        


@app.route('/api/booking', methods=['POST'])
def book_slot():
    data = request.json
    user_id = data['user_id']
    name = data['name']
    center_id = data['center_id']
    booking_date = data['booking_date']

    # Check if the maximum bookings for the day have been reached
    max_bookings_per_day = 10

    existing_bookings = mongo.db.bookings.count_documents({
        "center_id": center_id,
        "booking_date": booking_date
    })

    if existing_bookings >= max_bookings_per_day:
        return jsonify({"message": "Maximum bookings for the day reached. Cannot book.",'status':0}), 400

  
    booking = {
        "name" :name,
        "user_id": user_id,
        "center_id": center_id,
        "booking_date": booking_date,
        
    }

    result = mongo.db.bookings.insert_one(booking)

    return jsonify({"message": "Booking successful", 'status':1})


    


def generate_vacc_id():
    last_center = mongo.db.vacc_centers.find_one(sort=[('center_id', -1)])
    if last_center and 'center_id' in last_center:
        last_center_id = last_center['center_id']
        new_center_id = int(last_center_id[4:]) + 1
        return f'VCID{new_center_id:02d}'
    else:
        return 'VCID01'
    
    
    
@app.route('/api/addcenter',methods=['POST'])
def addCenter():
    data = request.get_json()
    name = data.get('name')
    address = data.get('address')
    center_id = generate_vacc_id()
    collection = mongo.db.vacc_centers
    collection.insert_one({
    'center_id':center_id,
    'name':name,
    'address':address
       
    })
    return jsonify({'status':True}), 201
    
@app.route('/api/all_vaccination-centers', methods=['GET'])
def all_vaccination_centers():
    centers_with_bookings = []

    vaccination_centers = mongo.db.vacc_centers.find()

    for center in vaccination_centers:
        center_with_bookings = {
            "c_id": center['center_id'],
            "name": center['name'],
            "address": center['address'],
            "bookings": []
        }

        bookings = mongo.db.bookings.find({"center_id": center['center_id']})
        for booking in bookings:
            booking_details = {
                
                "date": booking['date'],
                
            }
            center_with_bookings["bookings"].append(booking_details)

        centers_with_bookings.append(center_with_bookings)

    return jsonify({"vaccination_centers": centers_with_bookings})



if __name__ == '__main__':
    app.run(debug=True)
