from app import app
from datetime import datetime, date
from models import db, Personnel, Unit, Role, Squad, Operations, Droprequest


with app.app_context():
    print("Creating database")
    db.session.query(Personnel).delete()
    db.session.query(Unit).delete()
    db.session.query(Role).delete()
    db.session.query(Squad).delete()
    db.session.query(Operations).delete()
    db.session.query(Droprequest).delete()
    db.session.commit()


    # Retrieve the IDs of the first unit, role, and squad for assignment
    unit_ids = [unit.id for unit in Unit.query.all()]
    role_ids = [role.id for role in Role.query.all()]
    squad_ids = [squad.id for squad in Squad.query.all()]



    print("Seeding personnels")

    personnels = [
        Personnel(first_name="Quincy", last_name="Mwangi", age=35, rank="Second Lieutenant", phone_number="+123-456-789-", email="example@example.com", joining_date=datetime.now(), last_update=datetime.now(), unit_id=unit_ids[0], role_id=role_ids[0], squad_id=squad_ids[0]),
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

    print("Seeding squads")
    squads = [
        Squad(squad_name="Company 1", squad_size=20, created_at=datetime(2013,12,20), last_update=datetime.now()),
        Squad(squad_name="Company 2", squad_size=18, created_at=datetime(2002,5,15), last_update=datetime.now()),
        Squad(squad_name="Battalion 1", squad_size=2, created_at=datetime(2012,1,1), last_update=datetime.now()),
        Squad(squad_name="Battalion 2", squad_size=3, created_at=datetime(2015,5,20), last_update=datetime.now()),
        Squad(squad_name="Corps 1", squad_size=15, created_at=datetime(2003,7,7), last_update=datetime.now()),
        Squad(squad_name="Corps 2", squad_size=12, created_at=datetime(2007,6,25), last_update=datetime.now()),
        Squad(squad_name="Regiment 1", squad_size=10, created_at=datetime(2018,9,23), last_update=datetime.now()),
        Squad(squad_name="Regiment 2", squad_size=5, created_at=datetime(2020,5,6), last_update=datetime.now()),
        Squad(squad_name="Brigade 1", squad_size=10, created_at=datetime(2005,7,29), last_update=datetime.now()),
        Squad(squad_name="Brigade 2", squad_size=10, created_at=datetime(2010,2,22), last_update=datetime.now()),
        Squad(squad_name="Company 3", squad_size=22, created_at=datetime(2008,5,26), last_update=datetime.now()),
        Squad(squad_name="Battalion 3", squad_size=3, created_at=datetime(2023,7,20), last_update=datetime.now()),
        Squad(squad_name="Corps 3", squad_size=15, created_at=datetime(2024,8,9), last_update=datetime.now()),
    ]

    db.session.add_all(squads)
    db.session.commit()
   

    print("Seeding operations") 
    
    operations = [
        Operations(operations_name="Operation Desert Storm", operations_type="Combat", operations_description="Fighting terrosists in somalia", start_date=datetime(2020,1,1), end_date=datetime(2024,12,31), operations_status="Aborted", updated_at=datetime.now()),
        Operations(operations_name="Operation Line Breaker", operations_type="Other", operations_description="Protecting water borders", start_date=datetime(2020,12,31), end_date=datetime(2024,7,21), operations_status="Completed", updated_at=datetime.now()),
        Operations(operations_name="Operation Iron Justice ", operations_type="Training", operations_description="Providing protection to citizens", start_date=datetime(2021,1,1), end_date=datetime(2024,12,31), operations_status="Ongoing", updated_at=datetime.now()), 
        Operations(operations_name="Operation Byonet Lightning ", operations_type="Combat", operations_description="Bombing border enemies", start_date=date(2021,12,31), end_date=datetime(2024,11,21), operations_status="Ongoing", updated_at=datetime.now()),
        Operations(operations_name="Operation Red Waters", operations_type="Combat", operations_description="Pushing back pirates", start_date=datetime(2022,10,12), end_date=datetime(2024,9,12), operations_status="Completed", updated_at=datetime.now()),
    ]

    db.session.add_all(operations)

    db.session.commit()

    print("Seeding droprequest")

    droprequest = [
        Droprequest(drop_request_location="Nakuru", drop_request_time=datetime(2024,4,3), drop_request_description="Training drop for new soldiers",  drop_request_status="Completed", created_at=datetime(2024,9,7), updated_at=datetime.now()),
        Droprequest(drop_request_location="Nairobi", drop_request_time=datetime(2024,10,11), drop_request_description="Combat drop for injured soldiers", drop_request_status="Ongoing", created_at=datetime(2024,5,6), updated_at=datetime.now()),
        Droprequest(drop_request_location="Mombasa", drop_request_time=datetime(2024,9,6),drop_request_description="Other drop for citizens", drop_request_status="Ongoing",  created_at=datetime(2024,7,2), updated_at=datetime.now()),
        Droprequest(drop_request_location="Naivasha", drop_request_time=datetime(2024,11,11), drop_request_description="Training drop for new soldiers", drop_request_status="Completed", created_at=datetime(2024,3,5), updated_at=datetime.now()),
        Droprequest(drop_request_location="Machakos", drop_request_time=datetime(2024,10,6), drop_request_description="Combat drop for injured soldiers", drop_request_status="Completed", created_at=datetime(2024,2,1), updated_at=datetime.now()),
        
        
    ]
    db.session.add_all(droprequest)
    db.session.commit()
