#include <bits/stdc++.h>

#include <chrono>
#include <memory>

#include "lifecycle_msgs/msg/state.hpp"
#include "plansys2_executor/ActionExecutorClient.hpp"
#include "rclcpp/rclcpp.hpp"
#include "rclcpp_action/rclcpp_action.hpp"

using namespace std::chrono_literals;
using namespace std;

class Solution {
   public:
    int n;
    vector<int> v;
    Solution(vector<int> &w) {
        srand(time(NULL));
        n = w[0];
        for (int i = 1; i < w.size(); i++) {
            w[i] += w[i - 1];
            n = w[i];
        }
        v = w;
    }
    int pickIndex() {
        return upper_bound(v.begin(), v.end(), rand() % v.back()) - v.begin();
    }
};

class NavTo : public plansys2::ActionExecutorClient {
   public:
    NavTo() : plansys2::ActionExecutorClient("nav_to", 0s) {
        this->declare_parameter<int>("problem_rate", rclcpp::PARAMETER_INTEGER);
        closed_door_percentage = this->get_parameter("problem_rate");
        std::cout << "closed_door_percentage: "
                  << closed_door_percentage.as_int() << std::endl;
        vector<int> v = {closed_door_percentage.as_int(),
                         100 - closed_door_percentage.as_int()};
        Solution ob(v);
        choosedDoor = ob.pickIndex();
        std::cout << choosedDoor << std::endl;
        if (choosedDoor == 0) {
            doors[2] = false;
        }
    }

    rclcpp_lifecycle::node_interfaces::LifecycleNodeInterface::CallbackReturn
    on_activate(const rclcpp_lifecycle::State &previous_state) {
        progress_ = 0.0;
        return ActionExecutorClient::on_activate(previous_state);
    }

    rclcpp_lifecycle::node_interfaces::LifecycleNodeInterface::CallbackReturn
    on_deactivate(const rclcpp_lifecycle::State &previous_state) {
        return ActionExecutorClient::on_deactivate(previous_state);
    }

   private:
    void do_work() {
        string to = get_arguments()[1];
        string from = get_arguments()[2];

        std::cout << from << ": " << chooseIndex(from) << std::endl;

        if (doors[chooseIndex(from)]) {
            finish(true, 1.0, "Nav To completed");
        } else {
            std::cout << "Closed door." << std::endl;
            finish(false, 0.0, "Nav To failed");
        }
    }

    int chooseIndex(string room) {
        if (room == "room1") {
            return 0;
        } else if (room == "room2") {
            return 1;
        } else if (room == "room3") {
            return 2;
        }
    }

    bool doors[3] = {true, true, true};
    float progress_;
    rclcpp::Parameter closed_door_percentage;
    int choosedDoor;
};

int main(int argc, char **argv) {
    rclcpp::init(argc, argv);
    auto node = std::make_shared<NavTo>();
    node->set_parameter(rclcpp::Parameter("action_name", "nav_to"));
    node->trigger_transition(
        lifecycle_msgs::msg::Transition::TRANSITION_CONFIGURE);
    rclcpp::spin(node->get_node_base_interface());
    rclcpp::shutdown();
    return 0;
}