(define (problem sample)
    (:domain hospital)
    (:objects 
        r - robot 
        a - arm 
        n - nurse 
        room1 - room
        room2 - room
        room3 - room
        chargingnRoom - room
    )
    (:init
        (nurse_at n room1)
        (robot_at r room2)
        (arm_at a room3)
        (nurse_has_sample n)
        (opened_door room1)
        (opened_door room2)
        (opened_door room3)
        (opened_door chargingnRoom)
        (charging_point_at chargingnRoom)
    )
    (:goal (and
            (arm_has_sample a)
        )
    )
)