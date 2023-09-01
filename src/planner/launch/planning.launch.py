from launch import LaunchDescription
from launch_ros.actions import Node
 
def generate_launch_description():
    return LaunchDescription([
        Node(
            package='planner',
            executable='arm',
            name='arm',
        ),
        Node(
            package='planner',
            executable='coordinator',
            name='coordinator',
            parameters='True'
        ),
        Node(
            package='planner',
            executable='environment',
            name='environment',
            parameters='10'
        ),
        Node(
            package='planner',
            executable='nurse',
            name='nurse'
        ),
        Node(
            package='planner',
            executable='planner',
            name='planner'
        ),
        Node(
            package='planner',
            executable='robot',
            name='robot'
        ),
    ])