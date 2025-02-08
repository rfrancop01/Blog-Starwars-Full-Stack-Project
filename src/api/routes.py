"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Posts, Medias, Comments, Followers, Characters, Planets, CharacterFavorites, PlanetFavorites
import requests
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None)
    password = request.json.get("password", None)
    row = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if not row:
        response_body['message'] = 'User not found'
        return response_body, 401
    user = row.serialize()
    claims = {'user_id': user['id'],
              'is_active': user['is_active']}
    print(claims)
    access_token = create_access_token(identity=email, additional_claims=claims)
    response_body['access_token'] = access_token
    response_body['message'] = "User logged"
    response_body['results'] = user
    return response_body, 200


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    current_user = get_jwt_identity()
    additional_claims = get_jwt()
    print(current_user)
    print(additional_claims)
    response_body['message'] = 'El token es válido'
    return response_body, 200


@api.route('/users', methods=['GET', 'POST'])
def users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        result = [ row.serialize() for row in rows ]
        response_body['message'] = 'Listado de usuarios:'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        print(data)
        row = Users(first_name=data.get('first_name'),
                    last_name=data['last_name'],
                    phone=data['phone'],
                    email=data['email'],
                    is_active=True,
                    password=data['password'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'El user ha sido creado correctamente'
        response_body['results'] = row.serialize()
        return response_body, 200
    

@api.route('/users/<int:user_id>/posts', methods=['GET'])
def users_posts(user_id):
    response_body = {}
    rows = db.session.execute(db.select(Posts).where(Posts.user_id == user_id)).scalars()
    response_body['results'] = [ row.serialize() for row in rows ]
    response_body['message'] = 'Todos los posts de un usuario'
    return response_body, 200


@api.route('/users/<int:id>', methods=['GET'])
@jwt_required()
def user_get(id):
    response_body = {}
    additional_claims = get_jwt()
    print(id)
    print('additional', additional_claims['user_id'])
    if id != additional_claims['user_id']:
        response_body['message'] = 'No tiene autorización'
        return response_body, 401
    row = row = db.session.execute(db.select(Users).where(Users.id == id)).scalar()
    response_body['results'] = row.serialize()
    return response_body, 200


@api.route('/posts/<int:post_id>/comments', methods=['GET'])
def posts_comments(post_id):
    response_body = {}
    rows = db.session.execute(db.select(Comments).where(Comments.post_id == post_id)).scalars()
    response_body['results'] = [ row.serialize() for row in rows ]
    response_body['message'] = 'Todos los comentarios de una publicación'
    return response_body, 200

@api.route('/users/<int:user_id>/comments', methods=['GET'])
def user_comments(user_id):
    response_body = {}
    rows = db.session.execute(db.select(Comments).where(Comments.user_id == user_id)).scalars()
    response_body['results'] = [ row.serialize() for row in rows ]
    response_body['message'] = 'Todos los comentarios de un usuario'
    return response_body, 200


@api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()       
        result = [ row.serialize() for row in rows ]
        response_body['message'] = 'Listado de todas las publicaciones'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Posts(title=data.get('title'),
                    description=data['description'],
                    body=data['body'],
                    image_url=data['image_url'],
                    user_id=data['user_id'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'El post ha sido publicado correctamente'
        response_body['results'] = row.serialize()
        return response_body, 200
    

@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def post(id):
    response_body = {}
    row = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
    if not row:
        response_body['message'] = f'El id: {id} no existe en nuestro registro'
        return response_body, 400
    if request.method == 'GET':
        response_body['message'] = f'Respuesta desde el GET {request.method} para el id: {id}'
        response_body['result'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.title = data['title']
        row.description =['description']
        row.body =['body']
        row.image_url = data['image_url']
        row.user_id = data['user_id']
        db.session.commit()
        response_body['message'] = f'Respuesta desde el PUT {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el DELETE {request.method} para el id: {id}'
        return response_body, 200


@api.route('/medias', methods=['GET', 'POST'])
def medias():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Medias)).scalars()
        response_body['message'] = 'Listado de medias'
        response_body['results'] = [row.serialize() for row in rows]
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        media = Medias(
            media_type = data.get('media_type'),
            url = data.get('url'),
            post_id = data.get('post_id'),
        )
        db.session.add(media)
        db.session.commit()
        response_body['message'] = 'Media creada correctamente'
        response_body['results'] = media.serialize()
        return response_body, 201


@api.route('/medias/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def media(id):
    response_body = {}
    row = db.session.execute(db.select(Medias).where(Medias.id == id)).scalar()
    # Validar si el id exite
    if not row:
        response_body['message'] =  f'La media con id: {id} no existe'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Media con id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.media_type = data.get('media_type')
        row.url = data.get('url')
        row.post_id = data.get('post_id')
        db.session.commit()
        response_body['message'] = f'Actualizada la media con id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Eliminada la media con id: {id}'
        return response_body, 200


@api.route('/comments', methods=['GET', 'POST'])
def comments():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Comments)).scalars()
        response_body['message'] = 'Listado de comments'
        response_body['results'] = [row.serialize() for row in rows]
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        comment = Comments(
            body = data.get('body'),
            user_id = data.get('user_id'),
            post_id = data.get('post_id'),
        )
        db.session.add(comment)
        db.session.commit()
        response_body['message'] = 'Comment creado correctamente'
        response_body['results'] = comment.serialize()
        return response_body, 201


@api.route('/comments/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def comment(id):
    response_body = {}
    row = db.session.execute(db.select(Comments).where(Comments.id == id)).scalar()
    # Validar si el id exite
    if not row:
        response_body['message'] =  f'El comment con id: {id} no existe'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Comment con id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.body = data.get('body')
        row.user_id = data.get('user_id')
        row.post_id = data.get('post_id')
        db.session.commit()
        response_body['message'] = f'Actualizado el comment con id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Eliminado el comment con id: {id}'
        return response_body, 200


@api.route('/followers', methods=['GET', 'POST'])
def followers():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Followers)).scalars()
        response_body['message'] = 'Listado de followers'
        response_body['results'] = [row.serialize() for row in rows]
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        follower = Followers(
            follower_id = data.get('follower_id'),
            following_id = data.get('following_id'),
        )
        db.session.add(follower)
        db.session.commit()
        response_body['message'] = 'Follower creado correctamente'
        response_body['results'] = follower.serialize()
        return response_body, 201


@api.route('/followers/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def follower(id):
    response_body = {}
    row = db.session.execute(db.select(Followers).where(Followers.id == id)).scalar()
    # Validar si el id exite
    if not row:
        response_body['message'] =  f'El registro con id: {id} no existe'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Registro con id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.body = data.get('body')
        row.follower_id = data.get('follower_id')
        row.following_id = data.get('following_id')
        db.session.commit()
        response_body['message'] = f'Actualizado el registro con id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Eliminado el registro con id: {id}'
        return response_body, 200


@api.route('/characters', methods=['GET'])
def characters():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Characters)).scalars()
        response_body['message'] = 'Listado de personajes'
        response_body['results'] = [row.serialize() for row in rows]
        return response_body, 200
    if request.method == 'POST':
        pass

@api.route('/swapi/characters', methods=['GET'])
def characters_swapi():
    response_body = {}
    url = 'https://swapi.tech/api/people'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = 'Listado de personajes importados de la SWAPI'
        next = data.get('next')
        while True:
            results = data['results']
            for result in results:
                character_response = requests.get(result['url'])
                if character_response.status_code == 200:
                    character_data = character_response.json().get('result').get('properties')
                    character = Characters(
                        id = character_data.get('id'),
                        name = character_data.get('name'),
                        height = character_data.get('height'),
                        mass = character_data.get('mass'),
                        eye_color = character_data.get('eye_color'),
                        hair_color = character_data.get('hair_color'),
                        skin_color = character_data.get('skin_color'),
                        birth_year = character_data.get('birth_year'),
                        gender = character_data.get('gender'))
                    db.session.add(character)
                else:
                    response_body['message'] = 'Error al importart personajes desde SWAPI'
                    db.session.rollback()
            if next is None:
                    break
            else:
                next_response = requests.get(next)
                data = next_response.json()
                next = data.get('next')
        db.session.commit()
        return response_body, 200
    return response_body, 400

@api.route('/planets', methods=['GET'])
def planets():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Planets)).scalars()
        response_body['message'] = 'Listado de planetas'
        response_body['results'] = [row.serialize() for row in rows]
        return response_body, 200
    if request.method == 'POST':
        pass


@api.route('/swapi/planets', methods=['GET'])
def planets_swapi():
    response_body = {}
    url = 'https://swapi.tech/api/planets'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = 'Listado de planetas importados de la SWAPI'
        next = data.get('next')
        while True:
            results = data['results']
            for result in results:
                planet_response = requests.get(result['url'])
                if planet_response.status_code == 200:
                    planet_data = planet_response.json().get('result').get('properties')
                    planet = Planets(
                        id = planet_data.get('id'),
                        name = planet_data.get('name'),
                        diameter = planet_data.get('diameter'),
                        rotation_period = planet_data.get('rotation_period'),
                        orbital_period = planet_data.get('orbital_period'),
                        gravity = planet_data.get('gravity'),
                        population = planet_data.get('population'),
                        climate = planet_data.get('climate'),
                        terrain = planet_data.get('terrain'))
                    db.session.add(planet)
                else:
                    response_body['message'] = 'Error al importar los planetas desde SWAPI'
                    db.session.rollback()
            if next is None:
                break
            else:
                next_response = requests.get(next)
                data = next_response.json()
                next = data.get('next')
        db.session.commit()
        return response_body, 200
    return response_body, 400

@api.route('/character-favorites', methods=['GET', 'POST'])
def character_favorites():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(CharacterFavorites)).scalars()
        response_body['message'] = 'Listado de los personajes favoritos por cada usuario'
        response_body['results'] = [row.serialize() for row in rows]
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        character_favorite = CharacterFavorites(
            user_id = data.get('user_id'),
            character_id = data.get('character_id')
        )
        db.session.add(character_favorite)
        db.session.commit()
        response_body['message'] = 'Personaje favorito creado correctamente'
        response_body['results'] = character_favorite.serialize()
        return response_body, 201


@api.route('/character-favorites/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def character_favorite(id):
    response_body = {}
    row = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.id == id)).scalar()
    # Validar si el id exite
    if not row:
        response_body['message'] =  f'El registro con id: {id} no existe'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Registro con id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.user_id = data.get('user_id')
        row.character_id = data.get('character_id')
        db.session.commit()
        response_body['message'] = f'Actualizado el registro con id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Eliminado el registro con id: {id}'
        return response_body, 200


@api.route('/planet-favorites', methods=['GET', 'POST'])
def planet_favorites():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(PlanetFavorites)).scalars()
        response_body['message'] = 'Listado de los planetas favoritos por cada usuario'
        response_body['results'] = [row.serialize() for row in rows]
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        favorite_planet = PlanetFavorites(
            user_id = data.get('user_id'),
            planet_id = data.get('planet_id')
        )
        db.session.add(favorite_planet)
        db.session.commit()
        response_body['message'] = 'Planeta favorito creado correctamente'
        response_body['results'] = favorite_planet.serialize()
        return response_body, 201


@api.route('/planet-favorites/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def planet_favorite(id):
    response_body = {}
    row = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.id == id)).scalar()
    # Validar si el id exite
    if not row:
        response_body['message'] =  f'El registro con id: {id} no existe'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Registro con id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.user_id = data.get('user_id')
        row.planet_id = data.get('planet_id')
        db.session.commit()
        response_body['message'] = f'Actualizado el registro con id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Eliminado el registro con id: {id}'
        return response_body, 200



