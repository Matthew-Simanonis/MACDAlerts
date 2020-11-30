from src import application

#Load this config object for development mode
application.config.from_object('configurations.ProductionConfig')


if __name__ == "__main__":
    application.run()