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

class Solution
{
public:
  int n;
  vector<int> v;
  Solution(vector<int> &w)
  {
    srand(time(NULL));
    n = w[0];
    for (int i = 1; i < w.size(); i++)
    {
      w[i] += w[i - 1];
      n = w[i];
    }
    v = w;
  }
  int pickIndex()
  {
    return upper_bound(v.begin(), v.end(), rand() % v.back()) - v.begin();
  }
};

class Controller : public rclcpp::Node
{
public:
  Controller() : rclcpp::Node("controller"), state_(STARTING)
  {
    this->declare_parameter<bool>("replan", rclcpp::PARAMETER_BOOL);
    this->declare_parameter<int>("problem_rate", rclcpp::PARAMETER_INTEGER);
  }

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
    replan_param = this->get_parameter("replan");
    closed_door_percentage = this->get_parameter("problem_rate");

    std::cout << "replan:" << replan_param.as_bool() << std::endl;
    std::cout << "closed_door_percentage:" << closed_door_percentage.as_int() << std::endl;

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

      if (!plan.has_value())
      {
        std::cout << "Could not find plan to reach goal " << parser::pddl::toString(problem_expert_->getGoal()) << std::endl;
        break;
      }

      beg = high_resolution_clock::now();
      if (executor_client_->start_plan_execution(plan.value()))
      {
        state_ = PICK_SAMPLE;
        vector<int> v = {closed_door_percentage.as_int(), 100 - closed_door_percentage.as_int()};
        Solution ob(v);
        choosedDoor = ob.pickIndex();
        std::cout << choosedDoor << std::endl;
        if (choosedDoor == 0)
        {
          std::cout << "Closed door." << std::endl;
          problem_expert_->removePredicate(plansys2::Predicate("(opened_door room3)"));
        }
      }
    }
    break;
    case PICK_SAMPLE:
    {
      std::cout << "PICK_SAMPLE" << std::endl;
      auto feedback = executor_client_->getFeedBack();

      for (const auto &action_feedback : feedback.action_execution_status)
      {
        std::cout << "[" << action_feedback.action << " " << action_feedback.completion * 100.0 << "%]";
      }
      std::cout << std::endl;

      if (!executor_client_->execute_and_check_plan() && executor_client_->getResult())
      {
        std::cout << '1' << std::endl;
        if (executor_client_->getResult().value().success)
        {
          std::cout << "Successful finished " << std::endl;
          auto end = high_resolution_clock::now();
          auto duration = duration_cast<microseconds>(end - beg) / 100000;
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
              std::cout << "[" << action_feedback.action << "] finished with error: " << action_feedback.message_status << std::endl;
            }
          }

          // Replan
          if (replan_param.as_bool())
          {
            auto domain = domain_expert_->getDomain();
            auto problem = problem_expert_->getProblem();
            auto plan = planner_client_->getPlan(domain, problem);

            if (!plan.has_value())
            {
              std::cout << "Unsuccessful replan attempt to reach goal " << parser::pddl::toString(problem_expert_->getGoal()) << std::endl;
              break;
            }

            // Execute the plan
            executor_client_->start_plan_execution(plan.value());
          }
          else
          {
            auto end = high_resolution_clock::now();
            auto duration = duration_cast<microseconds>(end - beg) / 100000;
            std::cout << "The time of execution of above program is:" << duration.count() << std::endl;
            std::cout << "ENDSIM" << std::endl;
          }
        }
      }
      else
      {
        if (replan_param.as_bool())
          {
            auto domain = domain_expert_->getDomain();
            auto problem = problem_expert_->getProblem();
            auto plan = planner_client_->getPlan(domain, problem);

            if (!plan.has_value())
            {
              std::cout << "Unsuccessful replan attempt to reach goal " << parser::pddl::toString(problem_expert_->getGoal()) << std::endl;
              break;
            }

            // Execute the plan
            executor_client_->start_plan_execution(plan.value());
          } else {
            auto end = high_resolution_clock::now();
            auto duration = duration_cast<microseconds>(end - beg) / 100000;
            std::cout << "The time of execution of above program is:" << duration.count() << std::endl;
            std::cout << "ENDSIM" << std::endl;
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
  rclcpp::Parameter replan_param;
  rclcpp::Parameter closed_door_percentage;
  int choosedDoor;
  std::chrono::time_point<std::chrono::high_resolution_clock> beg;
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