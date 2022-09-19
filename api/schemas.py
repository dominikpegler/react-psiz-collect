from pydantic import BaseModel


class TrialBase(BaseModel):
    title: str
    description: str | None = None


class TrialCreate(TrialBase):
    pass


class Trial(TrialBase):
    trial_id: int
    assignment_id: int

    class Config:
        orm_mode = True


class AssignmentBase(BaseModel):
    worker_id: str


class AssignmentCreate(AssignmentBase):
    pass


class Assignment(AssignmentBase):
    assignment_id: int
    trial_id: list[Trial] = []

    class Config:
        orm_mode = True
