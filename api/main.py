###########
# IMPORTS #
###########

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

##############
# CREATE API #
##############

app = FastAPI()

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

# DB - WRITE #


@app.post("/assignment/", response_model=schemas.Assignment)
def create_assignment(
    assignment: schemas.AssignmentCreate, db: Session = Depends(get_db)
):
    db_assignment = crud.get_assignment_by_worker_id(db, worker_id=assignment.worker_id)
    if db_assignment:
        raise HTTPException(status_code=400, detail="Worker already assigned")
    return crud.create_worker(db=db, assignment=assignment)


@app.post("/assignment/{assignment_id}/trial/", response_model=schemas.Trial)
def create_trial(
    assignment_id: int, trial: schemas.TrialCreate, db: Session = Depends(get_db)
):
    return crud.create_trial(db=db, item=trial, assignment_id=assignment_id)


# DB - READ #


@app.get("/assignments-by-project-id/{project_id}", response_model=list[schemas.Assignment])
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
