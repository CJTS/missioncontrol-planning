#include <memory>
#include "plansys2_executor/ActionExecutorClient.hpp"
#include "rclcpp/rclcpp.hpp"
#include "rclcpp_action/rclcpp_action.hpp"
#include "lifecycle_msgs/msg/state.hpp"

using namespace std::chrono_literals;

class ApproachNurse : public plansys2::ActionExecutorClient
{
public:
  ApproachNurse() : plansys2::ActionExecutorClient("approach_nurse", 1s) {}

  rclcpp_lifecycle::node_interfaces::LifecycleNodeInterface::CallbackReturn
  on_activate(const rclcpp_lifecycle::State &previous_state)
  {
    progress_ = 0.0;
    return rclcpp_lifecycle::node_interfaces::LifecycleNodeInterface::CallbackReturn::SUCCESS;
  }

  rclcpp_lifecycle::node_interfaces::LifecycleNodeInterface::CallbackReturn
  on_deactivate(const rclcpp_lifecycle::State &previous_state)
  {
    return ActionExecutorClient::on_deactivate(previous_state);
  }

private:
  void do_work()
  {
    if (progress_ < 1.0)
    {
      progress_ += 0.1;
    }
    else
    {
      finish(true, 1.0, "Approach Arm completed");
    }
  }

  float progress_;
};

int main(int argc, char **argv)
{
  rclcpp::init(argc, argv);
  auto node = std::make_shared<ApproachNurse>();
  node->set_parameter(rclcpp::Parameter("action_name", "approach_nurse"));
  node->trigger_transition(lifecycle_msgs::msg::Transition::TRANSITION_CONFIGURE);
  rclcpp::spin(node->get_node_base_interface());
  rclcpp::shutdown();
  return 0;
}