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

		(robot_has_sample ?robot - robot)
		(nurse_has_sample ?nurse - nurse)
		(arm_has_sample ?a - arm)
	)

	(:action navto
		:parameters (?robot - robot ?room - room)
		:precondition (and
			(not (robot_at ?robot ?room))
			(opened_door ?room)	
		)
		:effect (robot_at ?robot ?room)
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
		:parameters (?robot - robot ?nurse - nurse)
		:precondition (not (robot_near_nurse ?robot ?nurse))
		:effect (robot_near_nurse ?robot ?nurse)
	)
	(:action authenticate_nurse
		:parameters (?robot - robot ?nurse - nurse)
		:precondition (not (nurse_auth_robot ?robot ?nurse))
		:effect (nurse_auth_robot ?robot ?nurse)
	)
	(:action open_drawer
		:parameters (?robot - robot ?nurse - nurse)
		:precondition (and 
			(not (robot_drawer ?robot))
			(robot_near_nurse ?robot ?nurse)
			(nurse_auth_robot ?robot ?nurse)
		)
		:effect (and
			(robot_drawer ?robot)
		)
	)
	(:action close_drawer
		:parameters (?robot - robot ?nurse - nurse)
		:precondition (robot_drawer ?robot)
		:effect (and
			(not (robot_drawer ?robot))	
			(not (robot_near_nurse ?robot ?nurse))
			(not (nurse_auth_robot ?robot ?nurse))
		)
	)
	(:action deposit
		:parameters (?nurse - nurse ?robot - robot ?room - room)
		:precondition (and
			(robot_at ?robot ?room)
			(nurse_at ?nurse ?room)
			(nurse_has_sample ?nurse)
		)
		:effect (and
			(robot_has_sample ?robot)
			(not (nurse_has_sample ?nurse))
		)
	)
	(:action approach_arm
		:parameters (?robot - robot ?arm - arm)
		:precondition (not (robot_near_arm ?robot ?arm))
		:effect (robot_near_arm ?robot ?arm)
	)
	(:action pick_up_sample
		:parameters (?a - arm ?robot - robot ?room - room)
		:precondition (and
			(robot_at ?robot ?room)
			(arm_at ?a ?room)
			(robot_has_sample ?robot)
		)
		:effect (and
			(arm_has_sample ?arm)
			(not (robot_has_sample ?robot))
			(not (robot_near_arm ?robot))
		)
	)
)