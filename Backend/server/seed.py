from app import app
from datetime import datetime
from models import db, Personnel, Unit, Role


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

    print("Seeding units")

    units = [
        Unit(unit_name="Company", unit_type="Navy", unit_location="Mombasa", created_at=datetime(2001,10,1),),
        Unit(unit_name="Battalion", unit_type="Army",unit_location="Gilgil", created_at=datetime(2005,10,1)),
        Unit(unit_name="Corps", unit_type="Marines",unit_location="Mombasa", created_at=datetime(2010,10,7)),
        Unit(unit_name="Regiments", unit_type="Air-Force", unit_location="Nanyuki", created_at=datetime(1999,4,20)),
        Unit(unit_name="Brigade", unit_type="Navy", unit_location="Kilifi", created_at=datetime(2013,7,20)),
        Unit(unit_name="Company", unit_type="Army",unit_location="Nakuru", created_at=datetime(2012,1,2)),
        Unit(unit_name="Division", unit_type="Marines",unit_location="Likoni", created_at=datetime(2018,5,17)),
        Unit(unit_name="Platoon", unit_type="Air-Force", unit_location="Nyeri", created_at=datetime(2020,7,10))

    ]

    db.session.add_all(units)
    db.session.commit()

    print ("Seeding roles")

    roles = [
        Role(role_name="Captain", role_description="The leader of a unit"),
        Role(role_name="Cadet", role_description="The soldier on the ground"),
        Role(role_name="Lieutenant", role_description="The first in command"),
        Role(role_name="Med", role_description="The Medic on the ground"),
    ]

    db.session.add_all(roles)
    db.session.commit()

