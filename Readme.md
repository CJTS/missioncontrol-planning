# Run

To run the project first you need to build the docker image

```$ docker build -t planner_nodes .```


Then you can use docker-compose to run all nodes

```$ docker-compose up```

## Tests
To run all the tests, first you build the image and then run:

```$ python ./test.py```
lima docker compose  -f experiment_trials.yaml up
s
lima docker build -t planner_nodes .
lima docker stop $(lima docker ps -a -q)
lima docker rm $(lima docker ps -a -q)
lima docker compose  -f experiment_trials.yaml up plansys2
lima docker compose  -f experiment_trials.yaml up controller
lima docker compose  -f experiment_trials.yaml up popf
lima docker compose  -f experiment_trials.yaml up patrol
lima docker compose  -f experiment_trials.yaml up patrolController
lima docker compose  -f experiment_trials.yaml up ipyhop-patrol
lima docker compose  -f experiment_trials.yaml up all-patrol
lima docker compose  -f experiment_trials.yaml up all

python3 test.py