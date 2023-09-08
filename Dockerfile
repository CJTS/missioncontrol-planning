ARG FROM_IMAGE=ros:humble
ARG OVERLAY_WS=/opt/ros/overlay_ws

# multi-stage for caching
FROM $FROM_IMAGE AS cacher

# clone overlay source
ARG OVERLAY_WS
WORKDIR $OVERLAY_WS
COPY src/ src/

# copy manifests for caching
WORKDIR /opt
RUN mkdir -p /tmp/opt && \
  find ./ -name "package.xml" | \
  xargs cp --parents -t /tmp/opt && \
  find ./ -name "COLCON_IGNORE" | \
  xargs cp --parents -t /tmp/opt || true

# multi-stage for building
FROM $FROM_IMAGE AS builder

# install overlay dependencies
ARG OVERLAY_WS
WORKDIR $OVERLAY_WS
COPY --from=cacher /tmp/$OVERLAY_WS/src ./src
RUN . /opt/ros/$ROS_DISTRO/setup.sh && \
  apt-get update && rosdep install -y -r -q --from-paths \
  --from-paths \
  src \
  --ignore-src \
  --rosdistro $ROS_DISTRO \
  && rm -rf /var/lib/apt/lists/*

RUN apt update && apt install ros-$ROS_DISTRO-plansys2-*

# build overlay source
COPY --from=cacher $OVERLAY_WS/src ./src
ARG OVERLAY_MIXINS="release"
# RUN . /opt/ros/$ROS_DISTRO/setup.sh && \
#   colcon build \
#   --symlink-install \
#   --mixin $OVERLAY_MIXINS

RUN . /opt/ros/$ROS_DISTRO/setup.sh && \
  colcon build \
  --packages-select \
  interfaces \
  planner \
  # plansys2_bringup \
  # plansys2_bt_actions \
  # plansys2_core \
  # plansys2_domain_expert \
  # plansys2_executor \
  # plansys2_lifecycle_manager \
  # plansys2_msgs \
  # plansys2_pddl_parser \
  # plansys2_planner \
  # plansys2_popf_plan_solver \
  # plansys2_problem_expert \
  # plansys2_terminal \
  # plansys2_tests \
  # plansys2_tools \
  labsample_plansys2 \
  --symlink-install \
  --mixin $OVERLAY_MIXINS

# source entrypoint setup
ENV OVERLAY_WS $OVERLAY_WS
RUN sed --in-place --expression \
  '$isource "$OVERLAY_WS/install/setup.bash"' \
  /ros_entrypoint.sh

RUN apt-get update && \
  apt-get install -y python3 python3-pip
RUN pip3 install -r ./src/planner/requirements.txt

ENV PYTHONPATH "${PYTHONPATH}:./src/planner/planner"
