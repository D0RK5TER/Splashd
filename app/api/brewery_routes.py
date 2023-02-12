from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Brewery, db
from app.forms import BreweryForm
from app.api.auth_routes import validation_errors_to_error_messages

brewery_routes = Blueprint('brewery', __name__)

@brewery_routes.route('/all')
def brewerys():
    """
    Query for all brewerys and returns them in a list of brewery dictionaries
    """
    breweries = Brewery.query.all()
    # return {'breweries': [brewery.to_dict() for brewery in breweries]}
    return {'breweries':[brewery.to_dict() for brewery in breweries]}

@brewery_routes.route('/<int:id>')
def brewery(id):
    """
    Query for all brewerys and returns them in a list of brewery dictionaries
    """
    brewery = Brewery.query.get(id)
    return  brewery.to_dict()

@brewery_routes.route('', methods=['POST'])
@login_required
def addbrewery():
    form = BreweryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data, '!^!^!^!^!^!^^!^!^!^^!^!^!^!^^!^!^!^!^!^')
    print(current_user, current_user.id, '@^@^@^@^@^^@^@^@^@^@^^@^@^^@^@^@^^@@')
    if form.validate_on_submit():

        newbrewery = Brewery(
            name=form.data['name'],
            owner_id=current_user.id,
            city_state=form.data['city_state'],
            brewery_type=form.data['brewery_type'],
            brewery_logo=form.data['brewery_logo']
        )
        print(newbrewery, '*^*^*^*^*^*^*^*^*^*^**^*^*^*^*^*')
        db.session.add(newbrewery)
        db.session.commit()
        return  newbrewery.to_dict()
    print(form.errors, '&#&#&#&#&#&#&#&#&#&#&&#&#&#&#&#&#&&#')
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401