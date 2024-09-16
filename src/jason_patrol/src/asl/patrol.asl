/* Initial beliefs and rules */
init(r2d2).
at(r2d2).
visit(r2d2,wp1).
visit(r2d2,wp2).
visit(r2d2,wp3).
visit(r2d2,wp4).

/* Initial goals */

!patrol.

/* Plans */

+!patrol : at(Loc) & visit(Loc,WP) & not moving(_) <- print("Moving to waypoint ",WP); +moving(WP); move(WP).

+!patrol : init(Base) & not at(Base) <- print("Moving back to initial position."); +moving(Base); move(Base).

// if we got here it means we have visited all waypoints, time to add them back
+!patrol : init(Base) <- +visit(Base,wp1); +visit(Base,wp2); +visit(Base,wp3); +visit(Base,wp4); !patrol.

+movebase_result(3) : moving(WP) <- print("Movement completed, resuming patrol."); -moving(WP); -visit(_,WP); -at(_); +at(WP); !patrol.

// movement failed, maybe here we can call the planner.
+movebase_result(2) : moving(WP) <- print("Movement ended with failure."); -moving(WP).
