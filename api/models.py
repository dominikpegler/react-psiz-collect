from sqlalchemy import Column, Boolean, ForeignKey, Integer, String, DateTime, Float
from sqlalchemy.orm import relationship

from .database import Base


class Assignment(Base):
    __tablename__ = "assignment"

    assignment_id = Column(Integer, primary_key=True, index=True)
    project_id = Column(String, unique=False, index=False)
    protocol_id = Column(String, unique=False, index=False)
    worker_id = Column(String, unique=False, index=False)
    amt_assignment_id = Column(String, unique=False, index=False)
    amt_hit_id = Column(String, unique=False, index=False)
    browser = Column(String, unique=False, index=False)
    platform = Column(String, unique=False, index=False)
    begin_hit = Column(DateTime, unique=False, index=False)
    end_hit = Column(DateTime, unique=False, index=False)
    status_code = Column(Integer, unique=False, index=False)
    ver = Column(Integer, unique=False, index=False)

    trial = relationship("Trial", back_populates="assignment")


class Trial(Base):
    __tablename__ = "trial"
    trial_id = Column(Integer, primary_key=True, index=True)
    assignment_id = Column(Integer, ForeignKey("assignment.assignment_id"))
    n_select = Column(Integer, unique=False, index=False)
    is_ranked = Column(Boolean, unique=False, index=False)
    q_idx = Column(Integer, unique=False, index=False)
    r1_idx = Column(Integer, unique=False, index=False)
    r2_idx = Column(Integer, unique=False, index=False)
    r3_idx = Column(Integer, unique=False, index=False)
    r4_idx = Column(Integer, unique=False, index=False)
    r5_idx = Column(Integer, unique=False, index=False)
    r6_idx = Column(Integer, unique=False, index=False)
    r7_idx = Column(Integer, unique=False, index=False)
    r8_idx = Column(Integer, unique=False, index=False)
    c1_idx = Column(Integer, unique=False, index=False)
    c2_idx = Column(Integer, unique=False, index=False)
    c3_idx = Column(Integer, unique=False, index=False)
    c4_idx = Column(Integer, unique=False, index=False)
    c5_idx = Column(Integer, unique=False, index=False)
    c6_idx = Column(Integer, unique=False, index=False)
    c7_idx = Column(Integer, unique=False, index=False)
    c8_idx = Column(Integer, unique=False, index=False)
    start_ms = Column(DateTime, unique=False, index=False)
    c1_rt_ms = Column(Float, unique=False, index=False)
    c2_rt_ms = Column(Float, unique=False, index=False)
    c3_rt_ms = Column(Float, unique=False, index=False)
    c4_rt_ms = Column(Float, unique=False, index=False)
    c5_rt_ms = Column(Float, unique=False, index=False)
    c6_rt_ms = Column(Float, unique=False, index=False)
    c7_rt_ms = Column(Float, unique=False, index=False)
    c8_rt_ms = Column(Float, unique=False, index=False)
    submit_rt_ms = Column(Float, unique=False, index=False)
    is_catch_trial = Column(Boolean, unique=False, index=False)
    rating = Column(Integer, unique=False, index=False)

    assignment = relationship("Assignment", back_populates="trial")
