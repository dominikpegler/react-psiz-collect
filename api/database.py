from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import json
import os

CONFIG_PATH = "config.json" # is defined a second time in main.py

if os.environ.get("DATABASE_URL") == None:
    with open(CONFIG_PATH) as fp:
        config = json.load(fp)
    DATABASE_URL = config["DATABASE_URL"]
else:
    DATABASE_URL = os.environ.get("DATABASE_URL")
    DATABASE_URL = DATABASE_URL.replace("postgres:", "postgresql:")

engine = create_engine(
    DATABASE_URL,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
