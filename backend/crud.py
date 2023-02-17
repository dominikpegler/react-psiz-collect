from sqlalchemy.orm import Session
from datetime import datetime

from . import models, schemas


def get_assignment_by_worker_id(db: Session, worker_id: str, project_id: str):
    return (
        db.query(models.Assignment)
        .filter(
            models.Assignment.worker_id == worker_id,
            models.Assignment.project_id == project_id,
        )
        .first()
    )


# Keep?
# Retrieve protocol history from database for specified project  (from initialize.php).
# ----------------------------------------------
# query = "SELECT protocol_id FROM assignment WHERE project_id=? AND (status_code=0 OR status_code=1)";
def get_assignments_by_project_id(db: Session, project_id: str):
    return (
        db.query(models.Assignment)
        .filter(models.Assignment.project_id == project_id)
        .all()
    )


def create_assignment(db: Session, assignment: schemas.AssignmentCreate):
    db_assignment = models.Assignment(**assignment.dict())
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment


def update_assignment(
    db: Session,
    assignment_id: int,
    end_hit: datetime,
    status_code: int,
    consent: bool,
    survey_complete: bool,
    strategy: str,
):
    db_assignment = db.query(models.Assignment).get(assignment_id)
    db_assignment.status_code = status_code
    db_assignment.end_hit = end_hit
    db_assignment.consent = consent
    db_assignment.survey_complete = survey_complete
    db_assignment.strategy = strategy
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment


def create_trial(db: Session, trial: schemas.TrialCreate):
    db_trial = models.Trial(**trial.dict())
    db.add(db_trial)
    db.commit()
    db.refresh(db_trial)
    return db_trial


def get_trials_by_assignment_id(db: Session, assignment_id: int):
    return (
        db.query(models.Trial).filter(models.Trial.assignment_id == assignment_id).all()
    )
