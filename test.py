import yaml
import json
import subprocess
import time

trials = []


def run(opened_door, replaning, index):
    compose_name = 'experiment_trials.yaml'
    with open(f'./{compose_name}', 'w') as file:
        yaml.dump(get_compose_file(opened_door, replaning), file)

    file = open(f'./logs/%s.log' % (index), 'w')
    up_docker_str = 'docker-compose -f experiment_trials.yaml up'
    print('Running simulation %s' % (index))
    subprocess.Popen(up_docker_str, stdout=file, stderr=file)
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

    stop_docker_str = 'docker-compose -f experiment_trials.yaml down'
    subprocess.run(stop_docker_str, stdout=file, stderr=file)


def get_compose_file(opened_door, replaning):
    return {
        'version': "2.3",
        'services': {
            'planner':  {
                'image': 'planner_nodes',
                'command': 'ros2 run planner planner',
                'networks': ['ros']
            },
            'coordinator':  {
                'image': 'planner_nodes',
                'command': 'ros2 run planner coordinator %s' % (replaning),
                'networks': ['ros']
            },
            'robot':  {
                'image': 'planner_nodes',
                'command': 'ros2 run planner robot',
                'networks': ['ros']
            },
            'arm':  {
                'image': 'planner_nodes',
                'command': 'ros2 run planner arm',
                'networks': ['ros']
            },
            'nurse':  {
                'image': 'planner_nodes',
                'command': 'ros2 run planner nurse',
                'networks': ['ros']
            },
            'environment':  {
                'image': 'planner_nodes',
                'command': 'ros2 run planner environment %s' % (opened_door),
                'networks': ['ros']
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


def check_simulation_status(index):
    with open(f'./logs/%s.log' % (index), 'r') as file:
        lines = file.readlines()
        alllines = ''
        for line in lines:
            alllines = alllines+line
            if "Achieved" in line:
                return 'Success'
    return 'Failed'

def check_task_time(index):
    with open(f'./logs/%s.log' % (index), 'r') as file:
        lines = file.readlines()
        alllines = ''
        for line in lines:
            alllines = alllines+line
            if "The time of execution of above program is" in line:
                return float(line.split(':')[2])
    return False


print('10% closed doors')
for i in range(30):
    run(10, True, '%s_%s_replan' % (i + 1, 10))
    run(10, False, '%s_%s_no_replan' % (i + 1, 10))

print('30% closed doors')
for i in range(30):
    run(30, True, '%s_%s_replan' % (i + 1, 30))
    run(30, False, '%s_%s_no_replan' % (i + 1, 30))

print('50% closed doors')
for i in range(30):
    run(50, True, '%s_%s_replan' % (i + 1, 50))
    run(50, False, '%s_%s_no_replan' % (i + 1, 50))

print('70% closed doors')
for i in range(30):
    run(70, True, '%s_%s_replan' % (i + 1, 70))
    run(70, False, '%s_%s_no_replan' % (i + 1, 70))


with open(f'./result.json', 'w') as file:
    json.dump(trials, file)