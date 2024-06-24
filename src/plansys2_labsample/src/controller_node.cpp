#include <plansys2_pddl_parser/Utils.h>

#include <memory>
#include <bits/stdc++.h>
#include <chrono>

#include "plansys2_msgs/msg/action_execution_info.hpp"
#include "plansys2_msgs/msg/plan.hpp"

#include "plansys2_domain_expert/DomainExpertClient.hpp"
#include "plansys2_executor/ExecutorClient.hpp"
#include "plansys2_planner/PlannerClient.hpp"
#include "plansys2_problem_expert/ProblemExpertClient.hpp"

#include "rclcpp/rclcpp.hpp"
#include "rclcpp_action/rclcpp_action.hpp"

using namespace std;
using namespace chrono;

class Controller : public rclcpp::Node
{
public:
  Controller() : rclcpp::Node("controller"), state_(STARTING) {}

  void init()
  {
    domain_expert_ = std::make_shared<plansys2::DomainExpertClient>();
    planner_client_ = std::make_shared<plansys2::PlannerClient>();
    problem_expert_ = std::make_shared<plansys2::ProblemExpertClient>();
    executor_client_ = std::make_shared<plansys2::ExecutorClient>();
    init_knowledge();
  }

  void init_knowledge()
  {
    problem_expert_->addInstance(plansys2::Instance{"r", "robot"});
    problem_expert_->addInstance(plansys2::Instance{"a", "arm"});
    problem_expert_->addInstance(plansys2::Instance{"n", "nurse"});
    problem_expert_->addInstance(plansys2::Instance{"room1", "room"});
    problem_expert_->addInstance(plansys2::Instance{"room2", "room"});
    problem_expert_->addInstance(plansys2::Instance{"room3", "room"});
    
    problem_expert_->addPredicate(plansys2::Predicate("(nurse_at n room1)"));
    problem_expert_->addPredicate(plansys2::Predicate("(robot_at r room2)"));
    problem_expert_->addPredicate(plansys2::Predicate("(arm_at a room3)"));
    problem_expert_->addPredicate(plansys2::Predicate("(nurse_has_sample n)"));
    problem_expert_->addPredicate(plansys2::Predicate("(opened_door room1)"));
    problem_expert_->addPredicate(plansys2::Predicate("(opened_door room2)"));
    problem_expert_->addPredicate(plansys2::Predicate("(opened_door room3)"));
  }

  void step()
  {
    switch (state_)
    {
    case STARTING:
    {
      // Set the goal for next state
      problem_expert_->setGoal(plansys2::Goal("(and(arm_has_sample a))"));

      // Compute the plan
      auto domain = domain_expert_->getDomain();
      auto problem = problem_expert_->getProblem();
      auto plan = planner_client_->getPlan(domain, problem);

      // for (const auto &item : plan.value().items)
      // {
      //   std::cout << item.action << std::endl;
      // }

      if (!plan.has_value())
      {
        std::cout << "Could not find plan to reach goal " << parser::pddl::toString(problem_expert_->getGoal()) << std::endl;
        break;
      }

      beg = high_resolution_clock::now();
      if (executor_client_->start_plan_execution(plan.value()))
      {
        state_ = PICK_SAMPLE;
      }
    }
    break;
    case PICK_SAMPLE:
    {
      // std::cout << "PICK_SAMPLE" << std::endl;
      // batteryCharge--;
      // if(batteryCharge <= 0) {
      //     problem_expert_->removePredicate(plansys2::Predicate("(battery_full r)"));
      // }

      auto feedback = executor_client_->getFeedBack();

      // for (const auto &action_feedback : feedback.action_execution_status)
      // {
      //   std::cout << "[" << action_feedback.action << " " << action_feedback.completion * 100.0 << "% - " << action_feedback.message_status << " - " << action_feedback.status << "] ";
      //   std::cout << action_feedback.status << std::endl;
      // }
      // std::cout << std::endl;

      if (!executor_client_->execute_and_check_plan() && executor_client_->getResult())
      {
        // std::cout << "1" << std::endl;
        if (executor_client_->getResult().value().success)
        {
          std::cout << "Successful finished " << std::endl;
          auto end = high_resolution_clock::now();
          chrono::duration<double> elapsed_seconds = end - beg;
          auto duration = duration_cast<seconds>(elapsed_seconds);
          std::cout << "The time of execution of above program is:" << duration.count() << std::endl;
          std::cout << "ENDSIM" << std::endl;

          // Cleanning up
          problem_expert_->removePredicate(plansys2::Predicate("(arm_has_sample a)"));
          problem_expert_->clearGoal();
          problem_expert_->clearKnowledge();
        }
        else
        {
          for (const auto &action_feedback : feedback.action_execution_status)
          {
            if (action_feedback.status == plansys2_msgs::msg::ActionExecutionInfo::FAILED)
            {
              // std::cout << "[" << action_feedback.action << "] finished with error: " << action_feedback.message_status << std::endl;
              if (action_feedback.action == "nav_to" && action_feedback.arguments[2] == "room3")
              {
                // std::cout << "Updating predicates" << std::endl;
                problem_expert_->removePredicate(plansys2::Predicate("(opened_door room3)"));
                // problem_expert_->removePredicate(plansys2::Predicate("(robot_at r room3)"));
                // problem_expert_->addPredicate(plansys2::Predicate("(robot_at r room2)"));
              }
            }
          }

          // auto predicates = problem_expert_->getPredicates();
          // for (const auto &predicate : predicates)
          // {
          //   std::cout << "(" << predicate.name << ": " << std::endl;
          //   for (const auto &params : predicate.parameters)
          //   {
          //     std::cout << params.name << std::endl;
          //   }
          //   std::cout << ")" << std::endl;
          // }

          // Replan
          // std::cout << "Replan" << std::endl;
          auto domain = domain_expert_->getDomain();
          auto problem = problem_expert_->getProblem();
          auto plan = planner_client_->getPlan(domain, problem);

          if (!plan.has_value())
          {
            std::cout << "Unsuccessful replan attempt to reach goal " << parser::pddl::toString(problem_expert_->getGoal()) << std::endl;
            break;
          }

          for (const auto &item : plan.value().items)
          {
            std::cout << item.action << std::endl;
          }

          // Execute the plan
          executor_client_->start_plan_execution(plan.value());
        }
      }
    }
    break;
    default:
      break;
    }
  }

private:
  typedef enum
  {
    STARTING,
    PICK_SAMPLE
  } StateType;
  StateType state_;

  std::shared_ptr<plansys2::DomainExpertClient> domain_expert_;
  std::shared_ptr<plansys2::PlannerClient> planner_client_;
  std::shared_ptr<plansys2::ProblemExpertClient> problem_expert_;
  std::shared_ptr<plansys2::ExecutorClient> executor_client_;
  std::chrono::time_point<std::chrono::high_resolution_clock> beg;
  int batteryCharge = 5;
};

int main(int argc, char **argv)
{
  rclcpp::init(argc, argv);
  auto node = std::make_shared<Controller>();

  node->init();

  rclcpp::Rate rate(5);
  while (rclcpp::ok())
  {
    node->step();
    rate.sleep();
    rclcpp::spin_some(node->get_node_base_interface());
  }

  rclcpp::shutdown();

  return 0;
}