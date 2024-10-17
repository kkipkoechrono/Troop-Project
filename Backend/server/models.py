from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, ForeignKey

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

class Personnel(db.Model):
    __tablename__ = 'personnels'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.String(30), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    joining_date = db.Column(db.DateTime, nullable=False)
    last_update = db.Column(db.DateTime, nullable=False)

    unit_id = db.Column(db.Integer, db.ForeignKey('units.unit_id'))
    role_id = db.Column(db.Integer, db.ForeignKey('roles.role_id'))
    squad_id = db.Column(db.Integer, db.ForeignKey('squads.squad_id'))

    squad = db.relationship('Squad', back_populates='personnels')
    role = db.relationship('Role', back_populates='personnels', foreign_keys=[role_id])
    unit = db.relationship('Unit', back_populates='personnels', foreign_keys=[unit_id])

    def __repr__(self):
        return f'<Personnel {self.first_name} {self.last_name}>'

class Unit(db.Model):
    __tablename__ = 'units'

    unit_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    unit_name = db.Column(db.String(10), nullable=False)
    unit_type = db.Column(db.Enum('Navy', 'Army', 'Air Force', 'Marines'), nullable=False)
    unit_location = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    squads = db.relationship('Squad', back_populates='unit')
    personnels = db.relationship('Personnel', back_populates='unit')

    def __repr__(self):
        return f'<Unit {self.unit_name}>'

class Role(db.Model):
    __tablename__ = 'roles'

    role_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    role_name = db.Column(db.String(10), nullable=False)
    role_description = db.Column(db.String, nullable=False)

    personnels = db.relationship('Personnel', back_populates='role')

    def __repr__(self):
        return f'<Role {self.role_name}>'

class Squad(db.Model):
    __tablename__ = 'squads'

    squad_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    squad_name = db.Column(db.String(100), nullable=False)
    squad_size = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    last_update = db.Column(db.DateTime, nullable=False)

    unit_id = db.Column(db.Integer, db.ForeignKey('units.unit_id'))

    unit = db.relationship('Unit', back_populates='squads')
    personnels = db.relationship('Personnel', back_populates='squad')

    def __repr__(self):
        return f'<Squad {self.squad_name}>'

class Droprequest(db.Model):
    __tablename__ = 'droprequest'

    drop_request_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    drop_request_location = db.Column(db.String(50), nullable=False)
    drop_request_time = db.Column(db.Integer, nullable=False)
    drop_request_description = db.Column(db.String(200), nullable=False)
    drop_request_status = db.Column(db.Enum('Pending', 'Approved', 'Rejected', name='drop_status'), default='Pending', nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f'<Droprequest {self.drop_request_id}, Location:{self.drop_request_location}, status:{self.drop_request_status}>'

class Operations(db.Model):
    __tablename__ = 'operations'

         operations_id =  db.Column(db.Integer, primary_key=True, autoincrement=True)
         operations_name = db.Column(db.String(200), nullable=False)
         operations_description = db.Column(db.Text, nullable=False)
         operations_type = db.Column(db.Enum('Reconnaissance', 'Combat', 'Rescue', 'Logistics', 'Training', 'Other', name='operation_type_enum'), nullable=False)
         start_date = db.Column(db.DateTime, nullable=False)
         end_date = db.Column(db.DateTime, nullable=False)
         operations_status = db.Column(db.Enum('Planned', 'Ongoing', 'Completed', 'Aborted', name='operation_status_enum'), default='Planned', nullable=False)
         updated_at = db.Column(db.DateTime, nullable=False)
         
       
def __repr__(self):
        return f'<Operation {self.operation_name} (ID: {self.operation_id})>'
