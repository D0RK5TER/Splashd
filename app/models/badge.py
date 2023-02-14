from .db import db, environment, SCHEMA, add_prefix_for_prod
from .userbadge import userbadges

class Badge(db.Model):
    __tablename__ = 'badges'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    beer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("beers.id")))
    brewery_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("breweries.id")))
    icon = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)

    # todo:add cascade delete
    badge_beer = db.relationship("Beer", back_populates="beer_badge")
    badge_brewery = db.relationship("Brewery", back_populates="brewery_badge")
    # badge_user = db.relationship("User", secondary=userbadges, back_populates="user_badge")
    badge_users = db.relationship("User", secondary=userbadges, back_populates="user_badges")



    def to_dict(self):
        return {
            'id': self.id,
            'beer_id': self.beer_id,
            'brewery_id': self.brewery_id,
            'icon': self.icon,
            'description': self.description
        }

    def create_badge_info(self):
        return {
            'id': self.id,
            'beer_id': self.beer_id,
            'brewery_id': self.brewery_id,
            'icon': self.icon,
            'description': self.description,
            # 'beer_id': self.badge_beer,
            # 'brewery_id': self.badge_brewery
        }