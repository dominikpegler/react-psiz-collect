from sqlalchemy.orm import Session

from . import models, schemas


def get_assignment(db: Session, assignment_id: int):
    return (
        db.query(models.Assignment)
        .filter(models.Assignment.id == assignment_id)
        .first()
    )


def get_assignment_by_worker_id(db: Session, worker_id: str):
    return (
        db.query(models.Assignment)
        .filter(models.Assignment.worker_id == worker_id)
        .first()
    )


def get_assignments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Assignment).offset(skip).limit(limit).all()


def create_assignment(db: Session, assignment: schemas.AssignmentCreate):
    db_assignment = models.Assignment(worker_id=assignment.worker_id)
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment


def get_trials(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Trial).offset(skip).limit(limit).all()


def create_assignment_trial(
    db: Session, trial: schemas.TrialCreate, assignment_id: int
):
    db_trial = models.Trial(**trial.dict(), owner_id=assignment_id)
    db.add(db_trial)
    db.commit()
    db.refresh(db_trial)
    return db_trial
