import random
from threading import Thread
import rclpy
from rclpy.node import Node
from interfaces.srv import HasSample, SendPlan, Action
from murosa_plan_patrol.helper import action_string_to_tuple

class Robot(Node):
    def __init__(self):
        super().__init__('Robot')
        self.local_plan = []

        self.current_action_tuple = ()
        self.new_plan = False

    def start_server(self):
        self.get_logger().info('Starting Robot server')
        self.robot_server = self.create_service(
            SendPlan, 'robot_server', self.receive_message
        )
        self.robot_communication_sync_server = self.create_service(
            Action, 'robot_communication_sync_server', self.receive_sync_message
        )
        self.get_logger().info('Robot server started')

    def receive_message(self, request, response):
        self.get_logger().info('Receiving message.')
        self.get_logger().info("Robot's actions:")
        self.new_plan = True
        self.local_plan = list(map(action_string_to_tuple, request.plan))
        for action in self.local_plan:
            self.get_logger().info(action[0])
        response.ok = 'Okay!'
        return response

    def receive_sync_message(self, request, response):
        self.get_logger().info('Receiving sync message. %s' % (request.action))
        actionTuple = tuple(request.action.split(','))
        response.observation = 'success'
        return response

    def start_client(self):
        self.get_logger().info('Starting Robots clients')
        self.coordinator_communication_sync_client = self.create_client(
            Action, 'coordinator_communication_sync_server'
        )
        while not self.coordinator_communication_sync_client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('coordinator sync service not available, waiting again...')

        self.environment_client = self.create_client(
            Action, 'environment_server'
        )
        while not self.environment_client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('environment service not available, waiting again...')
        self.get_logger().info('Robots clients started')

    def notifySuccess(self):
        self.action_request = Action.Request()
        self.action_request.action = ','.join(('action_complete', self.current_action))
        return self.coordinator_communication_sync_client.call(
            self.action_request
        )

    def notifyError(self, error):
        self.action_request = Action.Request()
        self.action_request.action = error
        return self.coordinator_communication_sync_client.call(
            self.action_request
        )

    def run(self):
        while rclpy.ok():
            # local plan
            if len(self.local_plan) > 0:
                self.current_action_tuple = self.local_plan.pop(0)
                self.get_logger().info(
                    "Action: %s" % (self.current_action_tuple[0])
                )
                ok = self.choose_action(self.current_action_tuple)
                self.get_logger().info("Action result: %s" % (ok))

                if ok :
                    self.notifySuccess()

                if not ok and not self.new_plan:
                    self.local_plan.insert(0, self.current_action_tuple)
                self.new_plan = False

    # ACTIONS
    def choose_action(self, actionTuple):
        self.current_action = actionTuple[0]
        if actionTuple[0] == 'a_move':
            self.get_logger().info('Doing a_move')
            response = self.a_move(actionTuple[1], actionTuple[2])
            self.get_logger().info(response.observation)
            if response.observation == 'success':
                self.pos = actionTuple[2]
        elif actionTuple[0] == 'a_patrol':
            self.get_logger().info('Doing a_patrol')
            response = self.a_patrol(actionTuple[1])
            self.get_logger().info(response.observation)
        return True

    def a_move(self, robot, room):
        self.action_request = Action.Request()
        self.action_request.action = ','.join(('a_move', robot, room))
        return self.environment_client.call(self.action_request)

    def a_patrol(self, robot):
        self.action_request = Action.Request()
        self.action_request.action = ','.join(('a_patrol', robot))
        return self.environment_client.call(self.action_request)

    def a_authenticate_nurse(self, robot, nurse):
        if not self.nurseId == nurse:
            self.get_logger().info('wating for %s to authenticate to %s' % (nurse, robot))
            return False
        return True

    def a_open_drawer(self, robot):
        possibilityChoices = [True, False]
        # self.drawer = random.choice(possibilityChoices)
        self.drawer = True
        return 'success'

    def a_close_drawer(self, robot):
        self.drawer = False
        return 'success'

    def a_approach_arm(self, robot, arm):
        self.action_request = Action.Request()
        self.action_request.action = ','.join(('a_approach_arm', robot, arm))
        return self.environment_client.call(self.action_request)

    def a_deposit(self, nurse, robot):
        if not self.has_sample:
            self.get_logger().info('wating for %s to deposit in %s' % (nurse, robot))
            return False
        return True

    def a_pick_up_sample(self, arm, robot):
        if self.has_sample:
            self.get_logger().info('wating for %s to pick up from %s' % (arm, robot))
            return False
        return True


def main():
    rclpy.init()
    robot = Robot()
    robot.start_server()
    robot.start_client()
    spin_thread = Thread(target=rclpy.spin, args=(robot,))
    spin_thread.start()
    robot.run()
    robot.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
