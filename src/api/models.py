from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String, unique=False, nullable=True)
    last_name = db.Column(db.String, unique=False, nullable=True)
    phone = db.Column(db.String, unique=False, nullable=True)


    def __repr__(self):
        return f'<User: {self.email} - {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,
                "is_active": self.is_active,
                "first_name": self.first_name,
                "last_name": self.last_name,
                "phone": self.phone}


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=False, nullable=False)
    description = db.Column(db.String, unique=False, nullable=True)
    body = db.Column(db.String, unique=False, nullable=False)
    date = db.Column(db.Date, unique=False, nullable=False, default=datetime.utcnow)
    image_url = db.Column(db.String, unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('posts_to', lazy='select'))

    def __repr__(self):
            return f'<Post: {self.id} - {self.title}>'
    
    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                'body ': self.body,
                'date ': self.date,
                'image': self.image_url,
                'user_id': self.user_id,}


class Medias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    media_type = db.Column(db.Enum('image', 'video', 'podcast', name='media_type'), unique=False, nullable=False)
    url = db.Column(db.String, unique=False, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), unique=True)
    post_to = db.relationship('Posts', foreign_keys=[post_id], backref=db.backref('media_to', lazy='select'))

    def serialize(self):
        return {'id': self.id,
                'media_type': self.media_type,
                'url': self.url,
                'post_id ': self.post_id}


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('user_comment_to', lazy='select'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts', foreign_keys=[post_id], backref=db.backref('post_comment_to', lazy='select'))

    def serialize(self):
        return {'id': self.id,
                'body': self.body,
                'user_id': self.user_id,
                'post_id ': self.post_id}


class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_to = db.relationship('Users', foreign_keys=[follower_id], backref=db.backref('followers_to', lazy='select'))
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_to = db.relationship('Users', foreign_keys=[following_id], backref=db.backref('followings_to', lazy='select'))

    def serialize(self):
        return {'id': self.id,
                'follower_id': self.follower_id,
                'following_id': self.following_id}

    def __repr__(self):
        return f'<Follower: {self.follower_id} - Following {self.following_id}>'


class CharacterFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('favorite_character', lazy='select'))
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    character_to = db.relationship('Characters', foreign_keys=[character_id], backref=db.backref('characters_to', lazy='select'))

    def serialize(self):
        return {'id': self.id,
                'user_id': self.user_id,
                'character_id': self.character_id}

    def __repr__(self):
        return f'<User: {self.user_id} - Following {self.character_id}>'


class PlanetFavorites(db.Model):
    __tablename__ = 'planet_favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('favorite_planet', lazy='select'))
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'))
    planet_to = db.relationship('Planets', foreign_keys=[planet_id], backref=db.backref('planets_to', lazy='select'))

    def serialize(self):
        return {'id': self.id,
                'user_id': self.user_id,
                'planet_id': self.planet_id}

    def __repr__(self):
        return f'<User: {self.user_id} - Following {self.planet_id}>'


class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    height = db.Column(db.String, unique=False, nullable=False)
    mass = db.Column(db.String, unique=False, nullable=False)
    hair_color = db.Column(db.String, unique=False, nullable=False)
    skin_color = db.Column(db.String, unique=False, nullable=False)
    eye_color = db.Column(db.String, unique=False, nullable=False)
    birth_year = db.Column(db.String, unique=False, nullable=False)
    gender = db.Column(db.String, unique=False, nullable=False)

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'height': self.height,
                'mass ': self.mass,
                'hair_color ': self.hair_color,
                'skin_color': self.skin_color,
                'eye_color': self.eye_color,
                'birth_year ': self.birth_year,
                'gender': self.gender,}


class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    diameter = db.Column(db.String, unique=False, nullable=False)
    rotation_period = db.Column(db.String, unique=False, nullable=False)
    orbital_period = db.Column(db.String, unique=False, nullable=False)
    gravity = db.Column(db.String, unique=False, nullable=False)
    population = db.Column(db.String, unique=False, nullable=True)
    climate = db.Column(db.String, unique=False, nullable=False)
    terrain = db.Column(db.String, unique=False, nullable=False)

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'diameter': self.diameter,
                'rotation_period ': self.rotation_period,
                'orbital_period ': self.orbital_period,
                'gravity': self.gravity,
                'population': self.population,
                'climate ': self.climate,
                'terrain': self.terrain}
