(define (domain hospital)
	(:requirements :strips :typing :adl :fluents :durative-actions)

	(:types
		robot arm nurse room sample - object
	)

	(:predicates
		(opened_door ?room - room)

		(robot_at ?robot - robot ?room - room)
		(nurse_at ?nurse - nurse ?room - room)
		(arm_at ?arm - arm ?room - room)

		(robot_near_nurse ?robot - robot ?nurse - nurse)
		(robot_near_arm ?robot - robot ?arm - arm)

		(nurse_auth_robot ?robot - robot ?nurse - nurse)

		(robot_drawer ?robot - robot)
		(robot_opening_drawer ?robot - robot)

		(robot_has_sample ?robot - robot)
		(nurse_has_sample ?nurse - nurse)
		(arm_has_sample ?arm - arm)

		(battery_full ?robot - robot)
		(charging_point_at ?room - room)
	)

	(:durative-action nav_to
		:parameters (?robot - robot ?from - room ?to - room)
		:duration( = ?duration 1)
		:condition (and
			(over all(battery_full ?robot))
			(at start(robot_at ?robot ?from))
			(at start(opened_door ?from))
			(at start(opened_door ?to))
		)
		:effect (and
			(at start(not (robot_at ?robot ?from)))
			(at end(robot_at ?robot ?to))
		)
	)
	(:durative-action nav_to_nurse
		:parameters (?nurse - nurse ?from - room ?to - room)
		:duration( = ?duration 1)
		:condition (and
			(at start(nurse_at ?nurse ?from))
		)
		:effect (and
			(at start(not (nurse_at ?nurse ?from)))
			(at end(nurse_at ?nurse ?to))
		)
	)
	(:durative-action open_door
		:parameters (?nurse - nurse ?room - room)
		:duration( = ?duration 1)
		:condition (and
			(at start(nurse_at ?nurse ?room))
		)
		:effect (at end(opened_door ?room))
	)
	(:durative-action approach_nurse
		:parameters (?robot - robot ?nurse - nurse ?room - room)
		:duration( = ?duration 1)
		:condition (and
			(over all(battery_full ?robot))
			(at start(robot_at ?robot ?room))
			(at start(nurse_at ?nurse ?room))
		)
		:effect (and
			(at end(robot_near_nurse ?robot ?nurse))
			(at end(robot_opening_drawer ?robot))
		)
	)
	(:durative-action authenticate_nurse
		:parameters (?robot - robot ?nurse - nurse ?room - room)
		:duration( = ?duration 1)
		:condition (and
			(over all(battery_full ?robot))
			(at start(robot_at ?robot ?room))
			(at start(nurse_at ?nurse ?room))
			(at start(robot_near_nurse ?robot ?nurse))
		)
		:effect (at end(nurse_auth_robot ?robot ?nurse))
	)
	(:durative-action open_drawer_for_nurse
		:parameters (?robot - robot ?nurse - nurse)
		:duration( = ?duration 1)
		:condition (and
			(over all(battery_full ?robot))
			(at start(nurse_auth_robot ?robot ?nurse))
		)
		:effect (and
			(at end(robot_drawer ?robot))
		)
	)
	(:durative-action open_drawer_for_arm
		:parameters (?robot - robot ?arm - arm)
		:duration( = ?duration 1)
		:condition (and
			(over all(battery_full ?robot))
			(at start(robot_near_arm ?robot ?arm))
		)
		:effect (and
			(at end(robot_drawer ?robot))
		)
	)
	(:durative-action close_drawer_for_nurse
		:parameters (?robot - robot ?nurse - nurse)
		:duration( = ?duration 1)
		:condition (and
			(over all(battery_full ?robot))
			(at start(nurse_auth_robot ?robot ?nurse))
			(at start(robot_drawer ?robot))
		)
		:effect (and
			(at end(not (robot_drawer ?robot)))
			(at end(not (robot_near_nurse ?robot ?nurse)))
			(at end(not (nurse_auth_robot ?robot ?nurse)))
			(at end(not (robot_opening_drawer ?robot)))
		)
	)
	(:durative-action close_drawer_for_arm
		:parameters (?robot - robot ?arm - arm)
		:duration( = ?duration 1)
		:condition (and
			(over all(battery_full ?robot))
			(at start(robot_near_arm ?robot ?arm))
			(at start(robot_drawer ?robot))
		)
		:effect (and
			(at end(not (robot_drawer ?robot)))
			(at end(not (robot_near_arm ?robot ?arm)))
			(at end(not (robot_opening_drawer ?robot)))
		)
	)
	(:durative-action deposit
		:parameters (?nurse - nurse ?robot - robot ?room - room)
		:duration( = ?duration 1)
		:condition (and
			(over all(battery_full ?robot))
			(at start(robot_drawer ?robot))
			(at start(robot_at ?robot ?room))
			(at start(nurse_at ?nurse ?room))
			(at start(nurse_has_sample ?nurse))
			(at start(nurse_auth_robot ?robot ?nurse))
		)
		:effect (and
			(at end(robot_has_sample ?robot))
			(at end(not (nurse_has_sample ?nurse)))
		)
	)
	(:durative-action approach_arm
		:parameters (?robot - robot ?arm - arm ?room - room)
		:duration( = ?duration 1)
		:condition (and
			(over all(battery_full ?robot))
			(at start(robot_at ?robot ?room))
			(at start(arm_at ?arm ?room))
		)
		:effect (and
			(at end(robot_near_arm ?robot ?arm))
			(at end(robot_opening_drawer ?robot))
		)
	)
	(:durative-action pick_up_sample
		:parameters (?arm - arm ?robot - robot ?room - room)
		:duration( = ?duration 1)
		:condition (and
			(over all(battery_full ?robot))
			(at start(robot_drawer ?robot))
			(at start(robot_at ?robot ?room))
			(at start(arm_at ?arm ?room))
			(at start(robot_has_sample ?robot))
			(at start(robot_near_arm ?robot ?arm))
		)
		:effect (and
			(at end(arm_has_sample ?arm))
			(at end(not (robot_has_sample ?robot)))
			(at end(not (robot_near_arm ?robot ?arm)))
			(at end(not (robot_opening_drawer ?robot)))
		)
	)
	(:durative-action pick_up_sample
		:parameters (?arm - arm ?robot - robot ?room - room)
		:duration( = ?duration 1)
		:condition (and
			(over all(battery_full ?robot))
			(at start(robot_drawer ?robot))
			(at start(robot_at ?robot ?room))
			(at start(arm_at ?arm ?room))
			(at start(robot_has_sample ?robot))
			(at start(robot_near_arm ?robot ?arm))
		)
		:effect (and
			(at end(arm_has_sample ?arm))
			(at end(not (robot_has_sample ?robot)))
			(at end(not (robot_near_arm ?robot ?arm)))
			(at end(not (robot_opening_drawer ?robot)))
		)
	)

	(:durative-action askcharge
		:parameters (?r - robot ?from ?to - room)
		:duration ( = ?duration 1)
		:condition (and
			(at start(robot_at ?r ?from))
			(at start(charging_point_at ?to))
		)
		:effect (and
			(at start(not(robot_at ?r ?from)))
			(at end(robot_at ?r ?to))
		)
	)

	(:durative-action charge
		:parameters (?robot - robot ?romm - room)
		:duration ( = ?duration 1)
		:condition (and
			(at start(robot_at ?robot ?romm))
			(at start(charging_point_at ?romm))
		)
		:effect (and
			(at end(battery_full ?robot))
		)
	)

)