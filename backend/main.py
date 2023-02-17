###########
# IMPORTS #
###########

from fastapi import Depends, FastAPI, Body
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
from . import crud, models, schemas
from .database import SessionLocal, engine
from .survey import write_survey_to_db
import os


models.Base.metadata.create_all(bind=engine)


###############
# LOAD CONFIG #
###############

CONFIG_PATH = "config.json"  # is defined a second time in database.py

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
    allow_credentials=True,  # if set to True origins can't be set to "*"
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

# TODO currently this list is in the frontend ... but could also by a glob-like thing in JS
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
    """
    Creates a new assignment for a new participant and returns it.
    If there exists already an assignment for a participant,
    no new assignment will created and the existing assignment will be returned.
    """

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
        consent = db_assignment.consent
        survey_complete = db_assignment.survey_complete
        strategy = db_assignment.strategy
    else:
        trials_completed = 0
        assignment_id = crud.create_assignment(
            db=db, assignment=assignment
        ).assignment_id
        consent = False
        survey_complete = False
        strategy = ""

    return JSONResponse(
        {
            "assignment_id": assignment_id,
            "trials_completed": trials_completed,
            "consent": consent,
            "survey_complete": survey_complete,
            "strategy": strategy,

        }
    )


@app.post("/update-assignment/", response_model=schemas.Assignment)
def update_assignment(
    assignment_update: schemas.AssignmentUpdate, db: Session = Depends(get_db)
):
    """
    Updates status and end time of a specific assignment
    """

    assignment_updated = crud.update_assignment(
        db=db,
        assignment_id=assignment_update.assignment_id,
        end_hit=assignment_update.end_hit,
        status_code=assignment_update.status_code,
        consent=assignment_update.consent,
        survey_complete=assignment_update.survey_complete,
        strategy=assignment_update.strategy,
    )

    return JSONResponse({"assignment_id": assignment_updated.assignment_id})


@app.post("/create-trial/", response_model=schemas.Trial)
def create_trial(trial: schemas.TrialCreate, db: Session = Depends(get_db)):
    """
    stores the participant's trial response in the database
    """

    return crud.create_trial(db=db, trial=trial)


@app.post("/send-survey-responses-by-assignment/")
def create_survey_data(assignment_id: int = Body(...), project_id: str = Body(...), selection: dict = Body(...)) -> None:

    import logging

    write_survey_to_db(project_id, assignment_id, selection, config['DATABASE_URL'])

    return JSONResponse(
        {
            "assignment_id": assignment_id,
            "project_id": project_id
        }
    )

# DB - READ #


# TODO: currently not in use
@app.get(
    "/assignments-by-project-id/{project_id}", response_model=list[schemas.Assignment]
)
def read_assignments_by_project_id(project_id: str, db: Session = Depends(get_db)):
    assignments = crud.get_assignments_by_project_id(db, project_id=project_id)
    return assignments


# JSON FILES - READ #


@app.get("/get-surveys-by-project-id/{project_id}")
def read_surveys_by_project_id(project_id: str):

    f = open("api/projects/" + project_id + ".json")
    surveys_list = json.load(f)["surveys"]

    surveys_content = []

    for s in surveys_list:
        f = open("api/projects/surveys/" + s + ".json")
        survey = json.load(f)
        surveys_content.append(survey)

    return surveys_content


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
