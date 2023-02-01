# Run

To run the project first you need to build the docker image

```$ docker build -t planner_nodes .```


Then you can use docker-compose to run all nodes

```$ docker-compose up```

## Tests
To run all the tests, first you build the image and then run:

```$ python ./test.py```