from app.models import Badge, db

def seed_badges():
    badge1=Badge(
        beer_id=1,
        brewery_id=None,
        user_id=1,
        icon='randomstring',
        description='randomstring'
    )
    badge2=Badge(
        beer_id=None,
        brewery_id=1,
        user_id=1,
        icon='randomstring',
        description='randomstring'
    )
    badge3=Badge(   
        beer_id=2,
        brewery_id=None,
        user_id=1,
        icon='randomstring',
        description='randomstring'

    )
    db.session.add(badge1)
    db.session.add(badge2)
    db.session.add(badge3)
    db.session.commit()

def undo_badges():
    # db.session.execute('TRUNCATE badges RESTART IDENTITY CASCADE;')
    db.session.execute('DELETE FROM badges')

    db.session.commit()