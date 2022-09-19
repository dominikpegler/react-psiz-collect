from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/assignment/", response_model=schemas.Assignment)
def create_assignment(
    assignment: schemas.AssignmentCreate, db: Session = Depends(get_db)
):
    db_assignment = crud.get_assignment_by_worker_id(db, worker_id=assignment.worker_id)
    if db_assignment:
        raise HTTPException(status_code=400, detail="Worker already assigned")
    return crud.create_user(db=db, assignment=assignment)


@app.get("/assignment/", response_model=list[schemas.Assignment])
def read_assignment(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    assignment = crud.get_assignment(db, skip=skip, limit=limit)
    return assignment


@app.get("/assignment/{assignment_id}", response_model=schemas.Assignment)
def read_user(assignment_id: int, db: Session = Depends(get_db)):
    db_assignment = crud.get_user(db, assignment_id=assignment_id)
    if db_assignment is None:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return db_assignment


@app.post("/assignment/{assignment_id}/trial/", response_model=schemas.Trial)
def create_trial_for_assignment(
    assignment_id: int, trial: schemas.TrialCreate, db: Session = Depends(get_db)
):
    return crud.create_assignment_trial(db=db, item=trial, assignment_id=assignment_id)


@app.get("/trial/", response_model=list[schemas.Trial])
def read_trial(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    trial = crud.get_trial(db, skip=skip, limit=limit)
    return trial
