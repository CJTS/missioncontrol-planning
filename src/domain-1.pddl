(define (domain hospital)
	(:requirements :strips :typing :adl :fluents)
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
	)

	(:action navto
		:parameters (?robot - robot ?from - room ?to - room)
		:precondition (and
			(robot_at ?robot ?from)
			(not (robot_at ?robot ?to))
			(opened_door ?from)
			(opened_door ?to)
			(not(robot_drawer ?robot))
			(not(robot_opening_drawer ?robot))
		)
		:effect (and
			(robot_at ?robot ?to)
			(not(robot_at ?robot ?from))
		)
	)
	(:action open_door
		:parameters (?nurse - nurse ?room - room)
		:precondition (and
			(not (opened_door ?room))
			(nurse_at ?nurse ?room)
		)
		:effect (opened_door ?room)
	)
	(:action approach_nurse
		:parameters (?robot - robot ?nurse - nurse ?room - room)
		:precondition (and
			(robot_at ?robot ?room)
			(nurse_at ?nurse ?room)
			(not(robot_near_nurse ?robot ?nurse))
		)
		:effect (and
			(robot_near_nurse ?robot ?nurse)
			(robot_opening_drawer ?robot)
		)
	)
	(:action authenticate_nurse
		:parameters (?robot - robot ?nurse - nurse ?room - room)
		:precondition (and
			(robot_at ?robot ?room)
			(nurse_at ?nurse ?room)
			(robot_near_nurse ?robot ?nurse)
			(not (nurse_auth_robot ?robot ?nurse))
		)
		:effect (nurse_auth_robot ?robot ?nurse)
	)
	(:action open_drawer_for_nurse
		:parameters (?robot - robot ?nurse - nurse)
		:precondition (and
			(not (robot_drawer ?robot))
			(nurse_auth_robot ?robot ?nurse)
		)
		:effect (and
			(robot_drawer ?robot)
		)
	)
	(:action open_drawer_for_arm
		:parameters (?robot - robot ?arm - arm)
		:precondition (and
			(not (robot_drawer ?robot))
			(robot_near_arm ?robot ?arm)
		)
		:effect (and
			(robot_drawer ?robot)
		)
	)
	(:action close_drawer_for_nurse
		:parameters (?robot - robot ?nurse - nurse)
		:precondition (and
			(nurse_auth_robot ?robot ?nurse)
			(robot_drawer ?robot)
		)
		:effect (and
			(not (robot_drawer ?robot))
			(not (robot_near_nurse ?robot ?nurse))
			(not (nurse_auth_robot ?robot ?nurse))
			(not (robot_opening_drawer ?robot))
		)
	)
	(:action close_drawer_for_arm
		:parameters (?robot - robot ?arm - arm)
		:precondition (and
			(robot_near_arm ?robot ?arm)
			(robot_drawer ?robot)
		)
		:effect (and
			(not (robot_drawer ?robot))
			(not (robot_near_arm ?robot ?arm))
			(not (robot_opening_drawer ?robot))
		)
	)
	(:action deposit_nurse
		:parameters (?nurse - nurse ?robot - robot ?room - room)
		:precondition (and
			(robot_drawer ?robot)
			(robot_at ?robot ?room)
			(nurse_at ?nurse ?room)
			(nurse_has_sample ?nurse)
			(nurse_auth_robot ?robot ?nurse)
		)
		:effect (and
			(robot_has_sample ?robot)
			(not (nurse_has_sample ?nurse))
		)
	)
	(:action approach_arm
		:parameters (?robot - robot ?arm - arm ?room - room)
		:precondition (and
			(robot_at ?robot ?room)
			(arm_at ?arm ?room)
			(not (robot_near_arm ?robot ?arm))
		)
		:effect (and
			(robot_near_arm ?robot ?arm)
			(robot_opening_drawer ?robot)
		)
	)
	(:action pick_up_sample
		:parameters (?arm - arm ?robot - robot ?room - room)
		:precondition (and
			(robot_drawer ?robot)
			(robot_at ?robot ?room)
			(arm_at ?arm ?room)
			(robot_has_sample ?robot)
			(robot_near_arm ?robot ?arm)
		)
		:effect (and
			(arm_has_sample ?arm)
			(not (robot_has_sample ?robot))
			(not (robot_near_arm ?robot ?arm))
			(not (robot_opening_drawer ?robot))
		)
	)
)