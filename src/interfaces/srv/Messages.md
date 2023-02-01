Messages:
Health Professional - Coordinator (Has Sample/hasSample.srv):
int64 roomId
int64 nurseId
---
string ok

Coordinator - Planner (Need Plan/needPlan.srv):
int64 robotId
int64 roomId
int64 nurseId
---
Action[] plan

Coordinator - Agents (Send Plan/sendPlan.srv):
Action[] plan
---
string ok

Agent - Coordinator (Error/error.srv):
string error
---
string ok

Coordinator - Planner (Replan/replan.srv):
string error
---
string ok