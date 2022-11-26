###########
# IMPORTS #
###########

from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
from . import crud, models, schemas
from .database import SessionLocal, engine
import os


models.Base.metadata.create_all(bind=engine)


###############
# LOAD CONFIG #
###############

CONFIG_PATH = "config.json" # is defined a second time in database.py

if os.path.exists(CONFIG_PATH):
    with open(CONFIG_PATH) as fp:
            config = json.load(fp)
    ORIGINS = config["ORIGINS"]
else:
    ORIGINS = ["http://localhost", "localhost"]

##############
# CREATE API #
##############

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True, # if set to True origins can't be set to "*"
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

#########################
# SQLAlchemy Dependency #
#########################


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


#######################################################
# Retreive list of available stimuli for the project #
#######################################################

# TODO
def get_stimulus_list():
    return None


#############
# API CALLS #
#############

# DB - TEST #


@app.get("/test-backend-connection/")
def test_assignment():
    return JSONResponse(
        {
            "status": "ok",
        }
    )


# DB - WRITE #


@app.post("/create-assignment/", response_model=schemas.Assignment)
def create_assignment(
    assignment: schemas.AssignmentCreate, db: Session = Depends(get_db)
):
    db_assignment = crud.get_assignment_by_worker_id(
        db, worker_id=assignment.worker_id, project_id=assignment.project_id
    )
    if db_assignment:
        print(
            f"INFO:     Worker {db_assignment.worker_id} already assigned. Continuing with trials"
        )
        db_trial = crud.get_trials_by_assignment_id(
            db, assignment_id=db_assignment.assignment_id
        )
        trials_completed = len(db_trial)
        assignment_id = db_assignment.assignment_id
    else:
        trials_completed = 0
        assignment_id = crud.create_assignment(
            db=db, assignment=assignment
        ).assignment_id

    return JSONResponse(
        {
            "assignment_id": assignment_id,
            "trials_completed": trials_completed,
        }
    )


@app.post("/update-assignment/", response_model=schemas.Assignment)
def update_assignment(
    assignment_update: schemas.AssignmentUpdate, db: Session = Depends(get_db)
):

    assignment_updated = crud.update_assignment(
        db=db,
        assignment_id=assignment_update.assignment_id,
        end_hit=assignment_update.end_hit,
        status_code=assignment_update.status_code,
    )

    return JSONResponse({"assignment_id": assignment_updated.assignment_id})


@app.post("/create-trial/", response_model=schemas.Trial)
def create_trial(trial: schemas.TrialCreate, db: Session = Depends(get_db)):
    return crud.create_trial(db=db, trial=trial)


# DB - READ #


@app.get(
    "/assignments-by-project-id/{project_id}", response_model=list[schemas.Assignment] 

)
def read_assignments_by_project_id(project_id: str, db: Session = Depends(get_db)):
    assignments = crud.get_assignments_by_project_id(db, project_id=project_id)
    return assignments


# @app.get("/assignment/{assignment_id}", response_model=schemas.Assignment)
# def read_worker(assignment_id: int, db: Session = Depends(get_db)):
#     db_assignment = crud.get_worker(db, assignment_id=assignment_id)
#     if db_assignment is None:
#         raise HTTPException(status_code=404, detail="Assignment not found")
#     return db_assignment


# @app.get("/trial/", response_model=list[schemas.Trial])
# def read_trial(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     trial = crud.get_trial(db, skip=skip, limit=limit)
#     return trial
