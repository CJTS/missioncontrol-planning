#include <memory>
#include "plansys2_executor/ActionExecutorClient.hpp"
#include "rclcpp/rclcpp.hpp"
#include "rclcpp_action/rclcpp_action.hpp"
#include "lifecycle_msgs/msg/state.hpp"

using namespace std::chrono_literals;

class OpenDoorForArm : public plansys2::ActionExecutorClient
{
public:
  OpenDoorForArm() : plansys2::ActionExecutorClient("open_drawer_for_arm", 1s) {}

  rclcpp_lifecycle::node_interfaces::LifecycleNodeInterface::CallbackReturn
  on_activate(const rclcpp_lifecycle::State &previous_state)
  {
    progress_ = 0.0;
    return ActionExecutorClient::on_activate(previous_state);
  }

  rclcpp_lifecycle::node_interfaces::LifecycleNodeInterface::CallbackReturn
  on_deactivate(const rclcpp_lifecycle::State &previous_state)
  {
    return ActionExecutorClient::on_deactivate(previous_state);
  }

private:
  void do_work()
  {
    finish(true, 1.0, "Open door for arm completed");
  }

  float progress_;
};

int main(int argc, char **argv)
{
  rclcpp::init(argc, argv);
  auto node = std::make_shared<OpenDoorForArm>();
  node->set_parameter(rclcpp::Parameter("action_name", "open_drawer_for_arm"));
  node->trigger_transition(lifecycle_msgs::msg::Transition::TRANSITION_CONFIGURE);
  rclcpp::spin(node->get_node_base_interface());
  rclcpp::shutdown();
  return 0;
}