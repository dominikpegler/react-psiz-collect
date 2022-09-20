from sqlalchemy.orm import Session

from . import models, schemas


# not in psiz-collect implemented. maybe delete
#-----------------------------------------------
def get_assignment(db: Session, assignment_id: int):
    return (db.query(models.Assignment).get(assignment_id)
    )


# not in psiz-collect implemented, but makes sense to allow for contiuation of interrupted assignments
#-----------------------------------------------
def get_assignment_by_worker_id(db: Session, worker_id: str):
    return (
        db.query(models.Assignment)
        .filter(models.Assignment.worker_id == worker_id)
        .first()
    )


# Retrieve protocol history from database for specified project  (from initialize.php).
# ----------------------------------------------
# query = "SELECT protocol_id FROM assignment WHERE project_id=? AND (status_code=0 OR status_code=1)";
def get_assignments_by_project_id(db: Session, project_id: str):
    return (
        db.query(models.Assignment)
        .filter(models.Assignment.project_id == project_id)
        .all()
    )


# TODO insert ALL fields!
# Create a new assignment entry in database (from initialize.php).
# ----------------------------------------------
# query = "INSERT INTO assignment (worker_id, project_id, protocol_id, amt_assignment_id, amt_hit_id, browser, platform) VALUES (?, ?, ?, ?, ?, ?, ?)";
def create_assignment(db: Session, assignment: schemas.AssignmentCreate):
    db_assignment = models.Assignment(worker_id=assignment.worker_id)
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment


# update assignment status (from postObs.php)
# ----------------------------------------------
# query = "UPDATE assignment SET status_code = 1, end_hit = CURRENT_TIME() WHERE assignment_id=?";
def update_assignment(db: Session, assignment_id: int, end_hit, status_code):
    db_assignment = db.query(models.Assignment).get(assignment_id)
    db_assignment.status_code = status_code
    db_assignment.end_git = end_hit
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment


# not in psiz-collect implemented. maybe delete
#-----------------------------------------------
# def get_trials(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.Trial).offset(skip).limit(limit).all()


# TODO insert ALL fields!
# Save trial responses (from postObs.php)
# ----------------------------------------------
# query = "INSERT INTO trial (assignment_id, n_select, is_ranked, q_idx, ".
#     "r1_idx, r2_idx, r3_idx, r4_idx, r5_idx, r6_idx, r7_idx, r8_idx, ".
#     "c1_idx, c2_idx, c3_idx, c4_idx, c5_idx, c6_idx, c7_idx, c8_idx, ".
#     "start_ms, c1_rt_ms, c2_rt_ms, c3_rt_ms, c4_rt_ms, c5_rt_ms, c6_rt_ms, ".
#     "c7_rt_ms, c8_rt_ms, submit_rt_ms, is_catch_trial".
#     ") VALUES ".
#     "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ".
#     "?, ?, ?, ?, ?, ?, ?, ?)";
def create_trial(
    db: Session, trial: schemas.TrialCreate, assignment_id: int
):
    db_trial = models.Trial(**trial.dict(), owner_id=assignment_id)
    db.add(db_trial)
    db.commit()
    db.refresh(db_trial)
    return db_trial


#######################
# in post-voucher.php #
#######################

# necessary???

# To prevent abuse, check if the worker (workerId) already has a voucher for
# the particular assignment (assignmentId).
# ----------------------------------------------
# query = "SELECT COUNT(voucher_id) AS 'count' FROM voucher WHERE amt_assignment_id=? AND amt_worker_id=?";

# Insert newly created voucher into table.
# query = "INSERT INTO voucher (amt_is_live, amt_assignment_id, amt_worker_id, amt_hit_id, voucher_hash) VALUES (?, ?, ?, ?, ?)";
