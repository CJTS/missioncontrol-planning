import os

from ament_index_python.packages import get_package_share_directory

from launch import LaunchDescription
from launch.actions import IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch_ros.actions import Node
from launch.actions import DeclareLaunchArgument
from launch.substitutions import EnvironmentVariable, LaunchConfiguration


def generate_launch_description():
    # Get the launch directory
    example_dir = get_package_share_directory('plansys2_labsample')

    problem_rate_launch_arg = DeclareLaunchArgument(
        'problem_rate', default_value=EnvironmentVariable('PROBLEM_RATE')
    )

    plansys2_cmd = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(os.path.join(
            get_package_share_directory('plansys2_bringup'),
            'launch',
            'plansys2_bringup_launch_monolithic.py')),
        launch_arguments={'model_file': example_dir + '/pddl/labsample.pddl'}.items()
        )

    # Specify the actions
    approach_arm_cmd = Node(
        package='plansys2_labsample',
        executable='approach_arm_action_node',
        name='approach_arm_action_node',
        output='screen',
        parameters=[])

    approach_nurse_cmd = Node(
        package='plansys2_labsample',
        executable='approach_nurse_action_node',
        name='approach_nurse_action_node',
        output='screen',
        parameters=[])

    authenticate_nurse_cmd = Node(
        package='plansys2_labsample',
        executable='authenticate_nurse_action_node',
        name='authenticate_nurse_action_node',
        output='screen',
        parameters=[])

    close_drawer_for_nurse_cmd = Node(
        package='plansys2_labsample',
        executable='close_drawer_for_nurse_action_node',
        name='close_drawer_for_nurse_action_node',
        output='screen',
        parameters=[])

    close_drawer_for_arm_cmd = Node(
        package='plansys2_labsample',
        executable='close_drawer_for_arm_action_node',
        name='close_drawer_for_arm_action_node',
        output='screen',
        parameters=[])

    deposit_cmd = Node(
        package='plansys2_labsample',
        executable='deposit_action_node',
        name='deposit_action_node',
        output='screen',
        parameters=[])

    nav_to_cmd = Node(
        package='plansys2_labsample',
        executable='nav_to_action_node',
        name='nav_to_action_node',
        output='screen',
        parameters=[{
            'problem_rate': LaunchConfiguration('problem_rate'),
        }])

    nav_to_nurse_cmd = Node(
        package='plansys2_labsample',
        executable='nav_to_nurse_action_node',
        name='nav_to_nurse_action_node',
        output='screen',
        parameters=[])

    open_door_cmd = Node(
        package='plansys2_labsample',
        executable='open_door_action_node',
        name='open_door_action_node',
        output='screen',
        parameters=[])

    open_drawer_for_nurse_cmd = Node(
        package='plansys2_labsample',
        executable='open_drawer_for_nurse_action_node',
        name='open_drawer_for_nurse_action_node',
        output='screen',
        parameters=[])

    open_drawer_for_arm_cmd = Node(
        package='plansys2_labsample',
        executable='open_drawer_for_arm_action_node',
        name='open_drawer_for_arm_action_node',
        output='screen',
        parameters=[])

    pick_up_sample_cmd = Node(
        package='plansys2_labsample',
        executable='pick_up_sample_action_node',
        name='pick_up_sample_action_node',
        output='screen',
        parameters=[])

    charge_cmd = Node(
        package='plansys2_labsample',
        executable='charge_action_node',
        name='charge_action_node',
        output='screen',
        parameters=[])

    askcharge_cmd = Node(
        package='plansys2_labsample',
        executable='askcharge_action_node',
        name='askcharge_action_node',
        output='screen',
        parameters=[])

    # Create the launch description and populate
    ld = LaunchDescription([problem_rate_launch_arg])

    # Declare the launch options
    ld.add_action(plansys2_cmd)
    ld.add_action(approach_arm_cmd)
    ld.add_action(approach_nurse_cmd)
    ld.add_action(authenticate_nurse_cmd)
    ld.add_action(close_drawer_for_nurse_cmd)
    ld.add_action(close_drawer_for_arm_cmd)
    ld.add_action(deposit_cmd)
    ld.add_action(nav_to_cmd)
    ld.add_action(nav_to_nurse_cmd)
    ld.add_action(open_door_cmd)
    ld.add_action(open_drawer_for_nurse_cmd)
    ld.add_action(open_drawer_for_arm_cmd)
    ld.add_action(pick_up_sample_cmd)
    ld.add_action(charge_cmd)
    ld.add_action(askcharge_cmd)

    return ld