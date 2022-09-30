from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import json
import os

# SQLALCHEMY_DATABASE_URL = "sqlite:///./psiz-collect.db"

if os.environ.get("SQLALCHEMY_DATABASE_URL") == None:
    with open("config.json") as fp:
        config = json.load(fp)
    SQLALCHEMY_DATABASE_URL = config["SQLALCHEMY_DATABASE_URL"]
else:
    SQLALCHEMY_DATABASE_URL = os.environ.get("SQLALCHEMY_DATABASE_URL")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    # connect_args={"check_same_thread": False} # for sqlite
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
