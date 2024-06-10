from src import create_app

if __name__ == "__main__":
    config_name = "development"
    app = create_app(config_name)
    app.run(host="0.0.0.0", port=5555)
