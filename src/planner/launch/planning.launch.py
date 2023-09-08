from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import EnvironmentVariable, LaunchConfiguration
from launch_ros.actions import Node
 
def generate_launch_description():
    replan_launch_arg = DeclareLaunchArgument(
        'replan', default_value=EnvironmentVariable('REPLAN')
    )
    problem_rate_launch_arg = DeclareLaunchArgument(
        'problem_rate', default_value=EnvironmentVariable('PROBLEM_RATE')
    )

    return LaunchDescription([
        replan_launch_arg,
        problem_rate_launch_arg,
        Node(
            package='planner',
            executable='arm',
            name='arm',
        ),
        Node(
            package='planner',
            executable='coordinator',
            name='coordinator',
            parameters=[{
                'replan': LaunchConfiguration('replan'),
            }]
        ),
        Node(
            package='planner',
            executable='environment',
            name=['environment'],
            parameters=[{
                'problem_rate': LaunchConfiguration('problem_rate'),
            }]
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