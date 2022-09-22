from pydantic import BaseModel
from datetime import datetime


class TrialBase(BaseModel):
    assignment_id: int


class TrialCreate(TrialBase):
    n_select: int
    is_ranked: bool
    q_idx: int
    r1_idx: int
    r2_idx: int
    r3_idx: int
    r4_idx: int
    r5_idx: int
    r6_idx: int
    r7_idx: int
    r8_idx: int
    c1_idx: int
    c2_idx: int
    c3_idx: int
    c4_idx: int
    c5_idx: int
    c6_idx: int
    c7_idx: int
    c8_idx: int
    start_ms: datetime
    c1_rt_ms: float
    c2_rt_ms: float
    c3_rt_ms: float
    c4_rt_ms: float
    c5_rt_ms: float
    c6_rt_ms: float
    c7_rt_ms: float
    c8_rt_ms: float
    submit_rt_ms: float
    is_catch_trial: bool
    rating: str


class Trial(TrialBase):
    trial_id: int

    class Config:
        orm_mode = True


class AssignmentBase(BaseModel):
    project_id: str
    protocol_id: str
    worker_id: str


class AssignmentCreate(AssignmentBase):
    amt_assignment_id: str
    amt_hit_id: str
    browser: str
    platform: str
    begin_hit: datetime
    end_hit: datetime
    status_code: int
    ver: int


class AssignmentUpdate(BaseModel):
    assignment_id: int
    end_hit: datetime
    status_code: int


class Assignment(AssignmentBase):
    assignment_id: int
    trial_id: list[Trial] = []

    class Config:
        orm_mode = True
