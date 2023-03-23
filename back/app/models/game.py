from mongoengine import Document, IntField, StringField, ListField


class Game(Document):
    appid = IntField()
    name = StringField()
    short_description = StringField()
    price = IntField()
    categories = StringField(max_length=200)
    genres = StringField(max_length=200)
    recommendations = IntField(null=True)
    release_date = StringField()
    developers = StringField()
    metacritic = IntField(null=True)
    image = StringField()
    about_the_game = StringField()
    screenshots = StringField()
