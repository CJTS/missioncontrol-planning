import yaml
import json
import subprocess
import time
import io

trials = []

def runPlansys2(opened_door, index):
    compose_name = 'experiment_trials_' + index + '.yaml'
    with open(f'./trials/{compose_name}', 'w') as file:
        yaml.dump(get_compose_file(opened_door, False), file)

    file = open(f'./logs/%s.log' % (index), 'w')
    filePlansys2 = open(f'./logs/plansys2.log', 'w')
    print('Running simulation %s' % (index))
    print('Starting planner %s' % (index))
    up_docker_plansys2_str = f'lima docker compose -f ./trials/{compose_name} up plansys2'
    subprocess.Popen([up_docker_plansys2_str], stdout=filePlansys2, stderr=filePlansys2, shell=True, text=True, encoding='utf-8',)
    start = time.time()
    runtime = time.time()
    simulation_timeout_s = 60
    while (runtime - start) <= simulation_timeout_s and check_planner_ready(): 
        i = 1
        runtime = time.time()
        # print('simulation_timeout_s: %s - %s = %s' % (start, runtime, runtime - start))

    print('Starting controller %s' % (index))
    up_docker_controller_str = f'lima docker compose -f ./trials/{compose_name} up controller'
    subprocess.Popen([up_docker_controller_str], stdout=file, stderr=file, shell=True, text=True, encoding='utf-8',)

    print('Monitoring simulation %s' % (index))
    start = time.time()
    runtime = time.time()
    simulation_timeout_s = 60
    while (runtime - start) <= simulation_timeout_s and not check_end_simulation(index):
        runtime = time.time()
        # print('simulation_timeout_s' % (simulation_timeout_s))
    print('simulation %s ended' % (index))
    end = time.time()
    trial_result = {
        'name': index,
        'simulation_time': end - start,
        'task_time': check_task_timePlansys2(index),
        'status': check_simulation_status(index),
        'replan': check_simulation_replan_need(index)
    }
    print(trial_result)
    trials.append(trial_result)
    print('Stopping simulation %s' % (index))

    stop_docker_controller_str = f'lima docker compose -f ./trials/{compose_name} down'
    subprocess.run(stop_docker_controller_str, shell=True)
    subprocess.run('lima docker stop $(lima docker ps -a -q)', shell=True)
    subprocess.run('lima docker rm $(lima docker ps -a -q)', shell=True)

def runPlansys2Patrol(index):
    compose_name = 'experiment_trials_' + index + '.yaml'
    with open(f'./trials/{compose_name}', 'w') as file:
        yaml.dump(get_compose_file(10, False), file)

    file = open(f'./logs/%s.log' % (index), 'w')
    filePlansys2 = open(f'./logs/plansys2.log', 'w')
    print('Running simulation %s' % (index))
    print('Starting planner %s' % (index))
    up_docker_plansys2_str = f'lima docker compose -f ./trials/{compose_name} up patrol'
    subprocess.Popen([up_docker_plansys2_str], stdout=filePlansys2, stderr=filePlansys2, shell=True, text=True, encoding='utf-8',)
    start = time.time()
    runtime = time.time()
    simulation_timeout_s = 60
    while (runtime - start) <= simulation_timeout_s and check_planner_ready(): 
        i = 1
        runtime = time.time()

    print('Starting controller %s' % (index))
    up_docker_controller_str = f'lima docker compose -f ./trials/{compose_name} up patrolController'
    subprocess.Popen([up_docker_controller_str], stdout=file, stderr=file, shell=True, text=True, encoding='utf-8',)

    print('Monitoring simulation %s' % (index))
    start = time.time()
    runtime = time.time()
    simulation_timeout_s = 60
    while (runtime - start) <= simulation_timeout_s and not check_end_simulation(index):
        runtime = time.time()
        # print('simulation_timeout_s' % (simulation_timeout_s))
    print('simulation %s ended' % (index))
    end = time.time()
    trial_result = {
        'name': index,
        'simulation_time': end - start,
        'task_time': check_task_timePlansys2(index),
        'status': check_simulation_status(index),
        'replan': check_simulation_replan_need(index)
    }
    print(trial_result)
    trials.append(trial_result)
    print('Stopping simulation %s' % (index))

    stop_docker_controller_str = f'lima docker compose -f ./trials/{compose_name} down'
    subprocess.run(stop_docker_controller_str, shell=True)
    subprocess.run('lima docker stop $(lima docker ps -a -q)', shell=True)
    subprocess.run('lima docker rm $(lima docker ps -a -q)', shell=True)

def runMuRoSAPlan(opened_door, replaning, index):
    compose_name = 'experiment_trials_' + index + '.yaml'
    with open(f'./trials/{compose_name}', 'w') as file:
        yaml.dump(get_compose_file(opened_door, replaning), file)

    file = open(f'./logs/%s.log' % (index), 'w')
    print('Running simulation %s' % (index))

    up_docker_controller_str = f'lima docker compose -f ./trials/{compose_name} up all'
    subprocess.Popen([up_docker_controller_str], stdout=file, stderr=file, shell=True, text=True, encoding='utf-8',)

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
        'task_time': check_task_timeMuRoSAPlan(index),
        'status': check_simulation_status(index),
        'replan': check_simulation_replan_need(index)
    }
    print(trial_result)
    trials.append(trial_result)
    print('Stopping simulation %s' % (index))

    stop_docker_controller_str = f'lima docker compose -f ./trials/{compose_name} down'
    subprocess.run(stop_docker_controller_str, shell=True)
    subprocess.run('lima docker stop $(lima docker ps -a -q)', shell=True)
    subprocess.run('lima docker rm $(lima docker ps -a -q)', shell=True)

def runMuRoSAPlanPatrol(index):
    compose_name = 'experiment_trials_' + index + '.yaml'
    with open(f'./trials/{compose_name}', 'w') as file:
        yaml.dump(get_compose_file(10, False), file)

    file = open(f'./logs/%s.log' % (index), 'w')
    print('Running simulation %s' % (index))

    up_docker_controller_str = f'lima docker compose -f ./trials/{compose_name} up all-patrol'
    subprocess.Popen([up_docker_controller_str], stdout=file, stderr=file, shell=True, text=True, encoding='utf-8',)

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
        'task_time': check_task_timeMuRoSAPlan(index),
        'status': check_simulation_status(index),
        'replan': check_simulation_replan_need(index)
    }
    print(trial_result)
    trials.append(trial_result)
    print('Stopping simulation %s' % (index))

    stop_docker_controller_str = f'lima docker compose -f ./trials/{compose_name} down'
    subprocess.run(stop_docker_controller_str, shell=True)
    subprocess.run('lima docker stop $(lima docker ps -a -q)', shell=True)
    subprocess.run('lima docker rm $(lima docker ps -a -q)', shell=True)

def get_compose_file(opened_door, replaning):
    return {
        'version': "2.3",
        'services': {
            'plansys2':  {
                'image': 'planner_nodes',
                'command': 'ros2 launch plansys2_labsample planning.launch.py',
                'networks': ['ros'],
                'environment': ['PROBLEM_RATE=' + str(opened_door)]
            },
            'controller':  {
                'image': 'planner_nodes',
                'command': 'ros2 run plansys2_labsample controller_node',
                'networks': ['ros'],
            },
            'all':  {
                'image': 'planner_nodes',
                'command': 'bash -c "cd src/murosa_plan_health/launch && ros2 launch murosa_plan_health planning.launch.py"',
                'networks': ['ros'],
                'environment': ['REPLAN=' + str(replaning), 'PROBLEM_RATE=' + str(opened_door)]
            },
            'all-patrol':  {
                'image': 'planner_nodes',
                'command': 'bash -c "cd src/murosa_plan_patrol/launch && ros2 launch murosa_plan_patrol planning.launch.py"',
                'networks': ['ros'],
                'environment': ['REPLAN=' + str(replaning), 'PROBLEM_RATE=' + str(opened_door)]
            },
            'patrol':  {
                'image': 'planner_nodes',
                'command': 'ros2 launch plansys2_patrol_navigation_example patrol_example_fakesim_launch.py',
                'networks': ['ros'],
            },
            'patrolController':  {
                'image': 'planner_nodes',
                'command': 'ros2 run plansys2_patrol_navigation_example patrolling_controller_node',
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

def check_simulation_replan_need(index):
    with open(f'./logs/%s.log' % (index), 'r') as file:
        lines = file.readlines()
        alllines = ''
        for line in lines:
            alllines = alllines+line
            if "Plan Failed" in line or "Found a problem" in line:
                return 'Replan'
    return 'NoReplan'

def check_task_timePlansys2(index):
    with open(f'./logs/%s.log' % (index), 'r') as file:
        lines = file.readlines()
        alllines = ''
        for line in lines:
            alllines = alllines+line
            if "The time of execution of above program is" in line:
                return float(line.split(':')[1])
    return False

def check_task_timeMuRoSAPlan(index):
    with open(f'./logs/%s.log' % (index), 'r') as file:
        lines = file.readlines()
        alllines = ''
        for line in lines:
            alllines = alllines+line
            if "The time of execution of above program is" in line:
                return float(line.split(':')[2])
    return False


print('Testing')
# runPlansys2(10, 'plansys2_%s_%s' % (0, 10))
# runMuRoSAPlan(10, True, 'murosaplan_%s_%s_replan' % (0, 10))
# runMuRoSAPlan(10, False, 'murosaplan_%s_%s_no_replan' % (0, 10))
# runPlansys2Patrol('plansys2_patrol_%s' % (0))
# runMuRoSAPlanPatrol('murosaplan_patrol_%s' % (0))

print('10% closed doors')
for i in range(30):
    runPlansys2(10, 'plansys2_%s_%s' % (i + 1, 10))
    runMuRoSAPlan(10, True, 'murosaplan_%s_%s_replan' % (i + 1, 10))
    runMuRoSAPlan(10, False, 'murosaplan_%s_%s_no_replan' % (i + 1, 10))

print('30% closed doors')
for i in range(30):
    runPlansys2(30, 'plansys2_%s_%s' % (i + 1, 30))
    runMuRoSAPlan(30, True, 'murosaplan_%s_%s_replan' % (i + 1, 30))
    runMuRoSAPlan(30, False, 'murosaplan_%s_%s_no_replan' % (i + 1, 30))

print('50% closed doors')
for i in range(30):
    runPlansys2(50, 'plansys2_%s_%s' % (i + 1, 50))
    runMuRoSAPlan(50, True, 'murosaplan_%s_%s_replan' % (i + 1, 50))
    runMuRoSAPlan(50, False, 'murosaplan_%s_%s_no_replan' % (i + 1, 50))

print('70% closed doors')
for i in range(30):
    runPlansys2(70, 'plansys2_%s_%s' % (i + 1, 70))
    runMuRoSAPlan(70, True, 'murosaplan_%s_%s_replan' % (i + 1, 70))
    runMuRoSAPlan(70, False, 'murosaplan_%s_%s_no_replan' % (i + 1, 70))

# for i in range(100):
#     runPlansys2Patrol('plansys2_patrol_%s' % (i + 1))
#     runMuRoSAPlanPatrol('murosaplan_patrol_%s' % (i + 1))

with open(f'./result.json', 'w') as file:
    json.dump(trials, file)