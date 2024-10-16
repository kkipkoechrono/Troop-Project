from app import app
from datetime import datetime
from models import db, Personnel


with app.app_context():
    print("Creating database")
    db.session.query(Personnel).delete()
    db.session.commit()


    print("Seeding personnels")

    personnels = [
        Personnel(first_name="Quincy", last_name="Mwangi", age=35, rank="Second Lieutenant", phone_number="+123-456-789-", email="example@example.com", joining_date=datetime.now(), last_update=datetime.now()),
        Personnel(first_name="John", last_name="Doe", age=40, rank="Captain", phone_number="+987-654-3210", email="johndoe@example.com", joining_date=datetime.now(), last_update=datetime.now()),
        Personnel(first_name="Jane", last_name="Smith", age=28, rank="Cadet", phone_number="+456-789-0123", email="janesmith@example.com", joining_date=datetime.now(), last_update=datetime.now()),
        Personnel(first_name="Alex", last_name="Johnson", age=32, rank="Cadet", phone_number="+789-012-3456", email="alexjohnson@example.com", joining_date=datetime.now(), last_update=datetime.now()),
        Personnel(first_name="Sarah", last_name="Williams", age=25, rank="Cadet", phone_number="+789-345-6788", email="wilson@example.com", joining_date=datetime.now(), last_update=datetime.now()),
        Personnel(first_name="Michael", last_name="Brown", age=37, rank="Cadet", phone_number="+123-456-7890", email="michaelbrown@example.com", joining_date=datetime.now(), last_update=datetime.now()),
        Personnel(first_name="David", last_name="Davis", age=33, rank="Cadet", phone_number="+546-234-6758", email="David@example.com", joining_date=datetime.now(), last_update=datetime.now()),
        Personnel(first_name="Sarah", last_name="Miller", age=31, rank="Cadet", phone_number="+987-654-3210", email="miller@example.com", joining_date=datetime.now(), last_update=datetime.now()),
        Personnel(first_name="John", last_name="Wilson", age=39, rank="Cadet", phone_number="+467-587-9876", email="john@example.com", joining_date=datetime.now(), last_update=datetime.now()),
        Personnel(first_name="Emily", last_name="Taylor", age=27, rank="Cadet", phone_number="+987-654-3210", email="taylor@example.com", joining_date=datetime.now(), last_update=datetime.now()),
        
    ]

    db.session.add_all(personnels)
    db.session.commit()