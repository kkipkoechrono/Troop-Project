from flask import Flask, jsonify, make_response, request, abort
from flask_migrate import Migrate 
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import jwt
from models import db, Personnel, Unit, Role, Squad, Droprequest, Operations, User
import datetime
from datetime import timedelta



app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = '5bcd32d181b843adb1b09fda387692b3'

# Configure your database connection

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///military.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

db.init_app(app)
migrate = Migrate(app, db)
Bcrypt = Bcrypt(app)

@app.route('/')
def index():
    return "Millitary Admin"

##############################################################################################
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']

    user = User.query.filter_by(username=username ).first()
    if user:
        return jsonify({'message': 'Username already exists'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400
    
    hashed_password = Bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully', 'user_id':new_user.id}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401
    
    if not Bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    token = jwt.encode(
        {"user_id": user.id, "exp": datetime.datetime.utcnow() + timedelta(minutes=60)},
        app.config['SECRET_KEY'],
        algorithm="HS256"
    )
    return jsonify({'token': token}), 200

'''@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401
    
    if not Bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    token = jwt.encode(
        {"user_id": user.id, "exp": datetime.datetime.utcnow() + timedelta(minutes=60)},
        app.config['SECRET_KEY'],
        algorithm="HS256"
    )
    return jsonify({'token': token}), 200'''


@app.route('/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'Token is missing'}), 401

    try:
        token = token.split()[1]
        if token:
            decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            user_id = decoded_token['user_id']
            user = User.query.get(user_id)
            return jsonify({"Access granted"}), 200
        else:
            return jsonify({'message': 'Invalid token'}), 403
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token is expired'}), 401
    








###############################################################################################
#Route to get all personnel
@app.route('/personnels', methods=['GET'])
def get_personnels():
    
    personnels = []
    for personnel in Personnel.query.all():
        personnel_dict = {
            'id': personnel.id,
            'first_name': personnel.first_name,
            'last_name': personnel.last_name,
            'age': personnel.age,
            'rank': personnel.rank,
            'phone_number': personnel.phone_number,
            'email': personnel.email,
            'joining_date': personnel.joining_date.strftime('%Y-%m-%d'), 
            'last_update': personnel.last_update.strftime('%Y-%m-%d'),
            'unit_id': personnel.unit_id,
            'role_id': personnel.role_id,
            'squad_id': personnel.squad_id
        }
        personnels.append(personnel_dict)

    response = make_response(
        jsonify(personnels),
        200
    )
    return response
#Route to return personnel id
@app.route('/personnels/<int:id>', methods=['GET'])
def get_personnel_by_id(id):
    personnel = Personnel.query.get(id)
    if personnel is None:
        return make_response(jsonify({'error': 'Personnel not found'}), 404)

    personnel_dict = {
        'id': personnel.id,
        'first_name': personnel.first_name,
        'last_name': personnel.last_name,
        'age': personnel.age,
        'rank': personnel.rank,
        'phone_number': personnel.phone_number,
        'email': personnel.email,
        'joining_date': personnel.joining_date.strftime('%Y-%m-%d'), 
        'last_update': personnel.last_update.strftime('%Y-%m-%d'),
        'unit_id': personnel.unit_id,
        'role_id': personnel.role_id,
        'squad_id': personnel.squad_id
    }

    return make_response(jsonify(personnel_dict), 200)

#Adding personnel
@app.route('/personnels', methods=['POST'])
def add_personnel():
    data = request.get_json()

    # Create a new Personnel object
    new_personnel = Personnel(
        first_name=data['first_name'],
        last_name=data['last_name'],
        age=data['age'],
        rank=data['rank'],
        phone_number=data['phone_number'],
        email=data['email'],
        joining_date=datetime.strptime(data['joining_date'], '%Y-%m-%d'),  # Assuming date is provided in YYYY-MM-DD format
        last_update=datetime.utcnow(),
        unit_id=data['unit_id'],
        role_id=data['role_id'],
        squad_id=data['squad_id']
    )

    db.session.add(new_personnel)
    db.session.commit()

    return make_response(jsonify({'message': 'Personnel added successfully', 'id': new_personnel.id}), 201)

#Updating a personnel
@app.route('/personnels/<int:id>', methods=['PUT'])
def update_personnel(id):
    personnel = Personnel.query.get(id)
    if personnel is None:
        return make_response(jsonify({'error': 'Personnel not found'}), 404)

    data = request.get_json()

    # Update fields if provided in the request body
    personnel.first_name = data.get('first_name', personnel.first_name)
    personnel.last_name = data.get('last_name', personnel.last_name)
    personnel.age = data.get('age', personnel.age)
    personnel.rank = data.get('rank', personnel.rank)
    personnel.phone_number = data.get('phone_number', personnel.phone_number)
    personnel.email = data.get('email', personnel.email)
    personnel.joining_date = data.get('joining_date', personnel.joining_date)
    personnel.last_update = datetime.utcnow()  # Update the last_update field

    db.session.commit()

    return make_response(jsonify({'message': 'Personnel updated successfully'}), 200)

#Deleting a personnel
@app.route('/personnels/<int:id>', methods=['DELETE'])
def delete_personnel(id):
    personnel = Personnel.query.get(id)
    if personnel is None:
        return make_response(jsonify({'error': 'Personnel not found'}), 404)

    db.session.delete(personnel)
    db.session.commit()

    return make_response(jsonify({'message': 'Personnel deleted successfully'}), 200)

######################################Units######################################################
@app.route('/units', methods=['GET'])
def get_units():
    units = []
    for unit in Unit.query.all():
        unit_dict = {
            'unit_id': unit.unit_id,
            'unit_name': unit.unit_name,
            'unit_type': unit.unit_type,
            'unit_location': unit.unit_location,
            'created_at': unit.created_at.strftime('%Y-%m-%d'),
            'squads': [squad.squad_id for squad in unit.squads],  # Assuming squads is a relationship
            'personnels': [personnel.id for personnel in unit.personnels]  # Assuming personnels is a relationship
        }
        units.append(unit_dict)

    return make_response(jsonify(units), 200)

# Get unit by ID
@app.route('/units/<int:id>', methods=['GET'])
def get_unit_by_id(id):
    unit = Unit.query.get(id)
    if unit is None:
        return make_response(jsonify({'error': 'Unit not found'}), 404)

    unit_dict = {
        'unit_id': unit.unit_id,
        'unit_name': unit.unit_name,
        'unit_type': unit.unit_type,
        'unit_location': unit.unit_location,
        'created_at': unit.created_at.strftime('%Y-%m-%d'),
        'squads': [squad.squad_id for squad in unit.squads],
        'personnels': [personnel.id for personnel in unit.personnels]
    }

    return make_response(jsonify(unit_dict), 200)

#Ading a new unit
@app.route('/units', methods=['POST'])
def add_unit():
    data = request.get_json()
    
    new_unit = Unit(
        unit_name=data['unit_name'],
        unit_type=data['unit_type'],
        unit_location=data['unit_location'],
        created_at=datetime.utcnow()  # Set the created_at field to the current time
    )

    db.session.add(new_unit)
    db.session.commit()

    return make_response(jsonify({'message': 'Unit added successfully', 'id': new_unit.unit_id}), 201)

# Deleting a unit
@app.route('/units/<int:id>', methods=['DELETE'])
def delete_unit(id):
    unit = Unit.query.get(id)
    if unit is None:
        return make_response(jsonify({'error': 'Unit not found'}), 404)

    db.session.delete(unit)
    db.session.commit()

    return make_response(jsonify({'message': 'Unit deleted successfully'}), 200)


##############################################Roles##############################################
@app.route('/roles', methods=['GET'])
def get_roles():
    roles = []
    for role in Role.query.all():
        role_dict = {
            'role_id': role.role_id,
            'role_name': role.role_name,
            'role_description': role.role_description,
            'personnels': [personnel.id for personnel in role.personnels]  # Assuming personnels is a relationship

        }
        roles.append(role_dict)

    return make_response(jsonify(roles), 200)
#Get role by id
@app.route('/roles/<int:role_id>', methods=['GET'])
def get_role(role_id):
    role = Role.query.get(role_id)
    if role:
        role_dict = {
            'role_id': role.role_id,
            'role_name': role.role_name,
            'role_description': role.role_description,
            'personnels': [personnel.id for personnel in role.personnels]
        }
        return make_response(jsonify(role_dict), 200)
    return make_response(jsonify({'message': 'Role not found'}), 404)
#adding new role
@app.route('/roles', methods=['POST'])
def add_role():
    data = request.get_json()
    new_role = Role(
        role_name=data['role_name'],
        role_description=data['role_description']
    )
    db.session.add(new_role)
    db.session.commit()
    return make_response(jsonify({'message': 'Role added', 'role_id': new_role.role_id}), 201)

#Updating a role
@app.route('/roles/<int:role_id>', methods=['PUT'])
def update_role(role_id):
    data = request.get_json()
    role = Role.query.get(role_id)
    if role:
        role.role_name = data.get('role_name', role.role_name)
        role.role_description = data.get('role_description', role.role_description)
        db.session.commit()
        return make_response(jsonify({'message': 'Role updated'}), 200)
    return make_response(jsonify({'message': 'Role not found'}), 404)

#Deleting a role
@app.route('/roles/<int:role_id>', methods=['DELETE'])
def delete_role(role_id):
    role = Role.query.get(role_id)
    if role:
        db.session.delete(role)
        db.session.commit()
        return make_response(jsonify({'message': 'Role deleted'}), 200)
    return make_response(jsonify({'message': 'Role not found'}), 404)

###############################Squads#########################################
@app.route('/squads', methods=['GET'])
def get_squads():
    squads = Squad.query.all()  # Query all squads
    results = []
    
    for squad in squads:
        squad_data = {
            'squad_id': squad.squad_id,
            'squad_name': squad.squad_name,
            'squad_size': squad.squad_size,
            'created_at': squad.created_at.isoformat(),
            'last_update': squad.last_update.isoformat(),
            'unit_id': squad.unit_id,
            'personnels': [personnel.id for personnel in squad.personnels]
        }
        results.append(squad_data)

    return jsonify(results), 200

# Get squad by ID
@app.route('/squads/<int:squad_id>', methods=['GET'])
def get_squad(squad_id):
    squad = Squad.query.get(squad_id)
    if not squad:
        return jsonify({'message': 'Squad not found'}), 404

    squad_data = {
        'squad_id': squad.squad_id,
        'squad_name': squad.squad_name,
        'squad_size': squad.squad_size,
        'created_at': squad.created_at.isoformat(),
        'last_update': squad.last_update.isoformat(),
        'unit_id': squad.unit_id,
        'personnels': [personnel.id for personnel in squad.personnels]
    }
    
    return jsonify(squad_data), 200

# Adding a new squad
@app.route('/squads', methods=['POST'])
def add_squad():
    data = request.get_json()
    new_squad = Squad(
        squad_name=data['squad_name'],
        squad_size=data['squad_size'],
        unit_id=data['unit_id'],
        created_at=datetime.utcnow(),
        last_update=datetime.utcnow()
    )
    
    db.session.add(new_squad)
    db.session.commit()
    
    return jsonify({
        'squad_id': new_squad.squad_id,
        'message': 'Squad created successfully'
    }), 201

#Updatig a squad
@app.route('/squads/<int:squad_id>', methods=['PUT'])
def update_squad(squad_id):
    data = request.get_json()
    squad = Squad.query.get(squad_id)
    
    if not squad:
        return jsonify({'message': 'Squad not found'}), 404

    squad.squad_name = data.get('squad_name', squad.squad_name)
    squad.squad_size = data.get('squad_size', squad.squad_size)
    squad.unit_id = data.get('unit_id', squad.unit_id)
    squad.last_update = datetime.utcnow()

    db.session.commit()

    return jsonify({'message': 'Squad updated successfully'}), 200

#Deleting a squad
@app.route('/squads/<int:squad_id>', methods=['DELETE'])
def delete_squad(squad_id):
    squad = Squad.query.get(squad_id)
    
    if not squad:
        return jsonify({'message': 'Squad not found'}), 404

    db.session.delete(squad)
    db.session.commit()

    return jsonify({'message': 'Squad deleted successfully'}), 200

############################## Operstions ##########################################
@app.route('/operations', methods=['GET'])
def get_operations():
    operations = Operations.query.all()  # Query all operations
    results = []
    
    for operation in operations:
        operation_data = {
            'operations_id': operation.operations_id,
            'operations_name': operation.operations_name,
            'operations_description': operation.operations_description,
            'operations_type': operation.operations_type,
            'start_date': operation.start_date,
            'end_date': operation.end_date,
            'operations_status': operation.operations_status,
            'updated_at': operation.updated_at.isoformat()
        }
        results.append(operation_data)

    return jsonify(results), 200

# Get operation by ID
@app.route('/operations/<int:operation_id>', methods=['GET'])
def get_operation(operation_id):
    operation = Operations.query.get(operation_id)
    if operation is None:
        abort(404)
    
    operation_data = {
        'operations_id': operation.operations_id,
        'operations_name': operation.operations_name,
        'operations_description': operation.operations_description,
        'operations_type': operation.operations_type,
        'start_date': operation.start_date,
        'end_date': operation.end_date,
        'operations_status': operation.operations_status,
        'updated_at': operation.updated_at.isoformat()
    }
    return jsonify(operation_data), 200

# Adding a new operation
@app.route('/operations', methods=['POST'])
def add_operation():
    data = request.json
    new_operation = Operations(
        operations_name=data['operations_name'],
        operations_description=data['operations_description'],
        operations_type=data['operations_type'],
        start_date=data['start_date'],
        end_date=data['end_date'],
        operations_status=data['operations_status']
    )
    db.session.add(new_operation)
    db.session.commit()
    
    return jsonify({'operations_id': new_operation.operations_id}), 201

# Updating an operation
@app.route('/operations/<int:operation_id>', methods=['PUT'])
def update_operation(operation_id):
    operation = Operations.query.get(operation_id)
    if operation is None:
        abort(404)

    data = request.json
    operation.operations_name = data.get('operations_name', operation.operations_name)
    operation.operations_description = data.get('operations_description', operation.operations_description)
    operation.operations_type = data.get('operations_type', operation.operations_type)
    operation.start_date = data.get('start_date', operation.start_date)
    operation.end_date = data.get('end_date', operation.end_date)
    operation.operations_status = data.get('operations_status', operation.operations_status)
    
    db.session.commit()
    return jsonify({'message': 'Operation updated successfully'}), 200

# Deleting an operation
@app.route('/operations/<int:operation_id>', methods=['DELETE'])
def delete_operation(operation_id):
    operation = Operations.query.get(operation_id)
    if operation is None:
        abort(404)

    db.session.delete(operation)
    db.session.commit()
    return jsonify({'message': 'Operation deleted successfully'}), 200

############################### Droprequest #########################################

@app.route('/droprequests', methods=['GET'])
def get_all_droprequests():
    droprequests = Droprequest.query.all()
    results = [
        {
            "drop_request_id": req.drop_request_id,
            "drop_request_location": req.drop_request_location,
            "drop_request_time": req.drop_request_time,
            "drop_request_description": req.drop_request_description,
            "drop_request_status": req.drop_request_status,
            "created_at": req.created_at,
            "updated_at": req.updated_at
        }
        for req in droprequests
    ]
    return {"droprequests": results}, 200


if __name__ == "__main__":
    app.run(port=5555, debug=True)