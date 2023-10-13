import yaml
import json
import subprocess
import time
import io

trials = []


def run(opened_door, replaning, index):
    compose_name = 'experiment_trials_' + index + '.yaml'
    with open(f'./trials/{compose_name}', 'w') as file:
        yaml.dump(get_compose_file(opened_door, replaning), file)

    file = open(f'./logs/%s.log' % (index), 'w')
    filePlansys2 = open(f'./logs/plansys2.log', 'w')
    print('Running simulation %s' % (index))
    print('Starting planner %s' % (index))
    up_docker_plansys2_str = f'lima nerdctl compose -f ./trials/{compose_name} up plansys2'
    pPlansys2 = subprocess.Popen([up_docker_plansys2_str], stdout=filePlansys2, stderr=filePlansys2, shell=True, text=True, encoding='utf-8',)
    while (check_planner_ready()): 
         i = 1

    print('Starting controller %s' % (index))
    up_docker_controller_str = f'lima nerdctl compose -f ./trials/{compose_name} up controller'
    pController = subprocess.Popen([up_docker_controller_str], stdout=file, stderr=file, shell=True, text=True, encoding='utf-8',)

    print('Monitoring simulation %s' % (index))
    start = time.time()
    runtime = time.time()
    simulation_timeout_s = 5*60
    while (runtime - start) <= simulation_timeout_s and not check_end_simulation(index):
        runtime = time.time()
    print('simulation %s ended' % (index))
    end = time.time()
    trial_result = {
        'name': index,
        'simulation_time': end - start,
        'task_time': check_task_time(index),
        'status': check_simulation_status(index)
    }
    print(trial_result)
    trials.append(trial_result)
    print('Stopping simulation %s' % (index))

    stop_docker_controller_str = f'lima nerdctl compose -f ./trials/{compose_name} down'
    subprocess.run(stop_docker_controller_str, shell=True)


def get_compose_file(opened_door, replaning):
    return {
        'version': "2.3",
        'services': {
            'plansys2':  {
                'image': 'planner_nodes',
                'command': 'ros2 launch labsample_plansys2 planning.launch.py',
                'networks': ['ros'],
                'environment': ['REPLAN=' + str(replaning), 'PROBLEM_RATE=' + str(opened_door)]
            },
            'controller':  {
                'image': 'planner_nodes',
                'command': 'ros2 run labsample_plansys2 controller_node --ros-args -p "replan:=%s" -p problem_rate:=%s' % (replaning, opened_door),
                'networks': ['ros'],
            },
            'all':  {
                'image': 'planner_nodes',
                'command': 'bash -c "cd src/planner/launch && ros2 launch planner planning.launch.py"',
                'networks': ['ros'],
                'environment': ['REPLAN=' + str(replaning), 'PROBLEM_RATE=' + str(opened_door)]
            },
        },
        'networks': {
            'ros': {},
        }
    }


def check_end_simulation(index):
    with open(f'./logs/%s.log' % (index), 'r') as file:
        lines = file.readlines()
        alllines = ''
        for line in lines:
            alllines = alllines+line
            if "ENDSIM" in line or "i/o timeout" in line:
                return True
    return False

def check_planner_ready():
    with open(f'./logs/plansys2.log', 'r') as file:
        lines = file.readlines()
        alllines = ''
        for line in lines:
            alllines = alllines+line
            if "[executor_lc_mngr]: Node executor_lc_mngr has current state active." in line:
                return False
    return True

def check_simulation_status(index):
    with open(f'./logs/%s.log' % (index), 'r') as file:
        lines = file.readlines()
        alllines = ''
        for line in lines:
            alllines = alllines+line
            if "Achieved" in line or "Successful finished" in line:
                return 'Success'
    return 'Failed'

def check_task_time(index):
    with open(f'./logs/%s.log' % (index), 'r') as file:
        lines = file.readlines()
        alllines = ''
        for line in lines:
            alllines = alllines+line
            if "The time of execution of above program is" in line:
                print(line.split(':'))
                return float(line.split(':')[1])
    return False

print('10% closed doors')
for i in range(5):
    run(100, True, '%s_%s_replan' % (i + 1, 100))
    run(100, False, '%s_%s_no_replan' % (i + 1, 100))

# print('30% closed doors')
# for i in range(30):
#     run(30, True, '%s_%s_replan' % (i + 1, 30))
#     run(30, False, '%s_%s_no_replan' % (i + 1, 30))

# print('50% closed doors')
# for i in range(30):
#     run(50, True, '%s_%s_replan' % (i + 1, 50))
#     run(50, False, '%s_%s_no_replan' % (i + 1, 50))

# print('70% closed doors')
# for i in range(30):
#     run(70, True, '%s_%s_replan' % (i + 1, 70))
#     run(70, False, '%s_%s_no_replan' % (i + 1, 70))


with open(f'./result.json', 'w') as file:
    json.dump(trials, file)