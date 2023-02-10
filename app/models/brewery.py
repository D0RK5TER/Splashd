from .db import db

class Brewery(db.Model):
    __tablename__ = "breweries"


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    city_state = db.Column(db.String(255), nullable=False)
    brewery_type = db.Column(db.String(255), nullable=False)
    brewery_logo = db.Column(db.String(255), nullable=False, unique=True)

    brewery_beer = db.relationship("Beer", back_populates="beer_brewery")
    brewery_user = db.relationship("User", back_populates="user_brewery")
    brewery_badge = db.relationship("Badge", back_populates="badge_brewery")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'city_state': self.city_state,
            'brewery_type': self.brewery_type,
            'brewery_logo': self.brewery_logo
        }