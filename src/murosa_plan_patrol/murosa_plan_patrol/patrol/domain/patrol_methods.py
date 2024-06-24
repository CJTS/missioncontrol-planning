#!/usr/bin/env python
"""
File Description: Hospital methods file. All the methods for Hospital planning domain are defined here.
"""
# ******************************************    Libraries to be imported    ****************************************** #
from ipyhop import Methods

# ******************************************        Method Definitions      ****************************************** #
methods = Methods()

def patrol_all(state, robot_):
    return [
        ('m_patrol', robot_, 'wp1'),
        ('m_patrol', robot_, 'wp2'),
        ('m_patrol', robot_, 'wp3'),
        ('m_patrol', robot_, 'wp4'),
    ]
methods.declare_task_methods('m_patrol_all', [patrol_all])

def patrol(state, robot_, location_):
    return [('m_goto', robot_, location_), ('a_patrol', robot_)]
methods.declare_task_methods('m_patrol', [patrol])

def goto(state, robot_, location_):
    if state.loc[robot_] in state.connected[location_]:
        return [('a_move', robot_, location_)]
    else:
        return [('a_move', robot_, 'wp_control'), ('a_move', robot_, location_)]
methods.declare_task_methods('m_goto', [goto])


# ******************************************    Demo / Test Routine         ****************************************** #
if __name__ == '__main__':
    raise NotImplementedError(
        "Test run / Demo routine for Hospital Mod Methods isn't implemented.")
