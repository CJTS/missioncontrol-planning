cmake_minimum_required(VERSION 3.5)
project(labsample_plansys2)

find_package(ament_cmake REQUIRED)
find_package(rclcpp REQUIRED)
find_package(rclcpp_action REQUIRED)
find_package(plansys2_msgs REQUIRED)
find_package(plansys2_domain_expert REQUIRED)
find_package(plansys2_executor REQUIRED)
find_package(plansys2_planner REQUIRED)
find_package(plansys2_problem_expert REQUIRED)
find_package(plansys2_pddl_parser REQUIRED)

set(CMAKE_CXX_STANDARD 17)

set(dependencies
    rclcpp
    rclcpp_action
    plansys2_msgs
    plansys2_domain_expert
    plansys2_executor
    plansys2_planner
    plansys2_problem_expert
    plansys2_pddl_parser
)

add_executable(approach_arm_action_node src/approach_arm_action_node.cpp)
ament_target_dependencies(approach_arm_action_node ${dependencies})

add_executable(approach_nurse_action_node src/approach_nurse_action_node.cpp)
ament_target_dependencies(approach_nurse_action_node ${dependencies})

add_executable(authenticate_nurse_action_node src/authenticate_nurse_action_node.cpp)
ament_target_dependencies(authenticate_nurse_action_node ${dependencies})

add_executable(close_drawer_for_nurse_action_node src/close_drawer_for_nurse_action_node.cpp)
ament_target_dependencies(close_drawer_for_nurse_action_node ${dependencies})

add_executable(close_drawer_for_arm_action_node src/close_drawer_for_arm_action_node.cpp)
ament_target_dependencies(close_drawer_for_arm_action_node ${dependencies})

add_executable(controller_node src/controller_node.cpp)
ament_target_dependencies(controller_node ${dependencies})

add_executable(deposit_action_node src/deposit_action_node.cpp)
ament_target_dependencies(deposit_action_node ${dependencies})

add_executable(navto_action_node src/navto_action_node.cpp)
ament_target_dependencies(navto_action_node ${dependencies})

add_executable(open_door_action_node src/open_door_action_node.cpp)
ament_target_dependencies(open_door_action_node ${dependencies})

add_executable(open_drawer_for_nurse_action_node src/open_drawer_for_nurse_action_node.cpp)
ament_target_dependencies(open_drawer_for_nurse_action_node ${dependencies})

add_executable(open_drawer_for_arm_action_node src/open_drawer_for_arm_action_node.cpp)
ament_target_dependencies(open_drawer_for_arm_action_node ${dependencies})

add_executable(pick_up_sample_action_node src/pick_up_sample_action_node.cpp)
ament_target_dependencies(pick_up_sample_action_node ${dependencies})

install(DIRECTORY launch pddl DESTINATION share/${PROJECT_NAME})

install(TARGETS
  approach_arm_action_node
  approach_nurse_action_node
  authenticate_nurse_action_node
  close_drawer_for_nurse_action_node
  close_drawer_for_arm_action_node
  controller_node
  deposit_action_node
  navto_action_node
  open_door_action_node
  open_drawer_for_nurse_action_node
  open_drawer_for_arm_action_node
  pick_up_sample_action_node
  ARCHIVE DESTINATION lib
  LIBRARY DESTINATION lib
  RUNTIME DESTINATION lib/${PROJECT_NAME}
)

if(BUILD_TESTING)
  find_package(ament_lint_auto REQUIRED)
  ament_lint_auto_find_test_dependencies()

  find_package(ament_cmake_gtest REQUIRED)
endif()

ament_export_dependencies(${dependencies})

ament_package()