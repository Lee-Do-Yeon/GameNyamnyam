from mongoengine import Document, IntField, StringField, ListField

# game table
class Game(Document):
    appid = IntField()
    name = StringField(max_length=500)
    short_description = StringField(max_length=500)
    price = IntField()
    categories = ListField(StringField(max_length=500))
    genres = ListField(StringField(max_length=500))
    recommendations = IntField(null=True)
    release_date = StringField()
    developers = StringField()
    metacritic = IntField(null=True)
    image = StringField()
    about_the_game = StringField(null=True)
    screenshots = StringField()

