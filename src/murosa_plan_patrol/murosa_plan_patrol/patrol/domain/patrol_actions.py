#!/usr/bin/env python
"""
File Description: Hospital actions file. All the actions for Hospital planning domain are defined here.
"""
# ******************************************    Libraries to be imported    ****************************************** #
from ipyhop import Actions

# ******************************************        Action Definitions      ****************************************** #
actions = Actions()

# robot navigate to a location
def a_move(state, robot_, loc_):
    if state.loc[robot_] in state.connected[loc_]:
        state.loc[robot_] = loc_
        return state

# robot opens to a location
def a_patrol(state, robot_):
    state.patroled[state.loc[robot_]] = True
    return state

actions.declare_actions([a_move, a_patrol])

# ******************************************    Demo / Test Routine         ****************************************** #
if __name__ == '__main__':
    raise NotImplementedError(
        "Test run / Demo routine for Hospital Mod Commands isn't implemented.")
