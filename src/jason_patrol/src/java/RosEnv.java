import jason.asSyntax.*;
import jason.environment.*;
import java.util.logging.*;
import ros.Publisher;
import ros.RosBridge;
import ros.RosListenDelegate;
import ros.SubscriptionRequestMsg;
import ros.msgs.move_base_msgs.MoveBaseActionResult;
import ros.msgs.std_msgs.PrimitiveMsg;
import ros.tools.MessageUnpacker;
import com.fasterxml.jackson.databind.JsonNode;

public class RosEnv extends Environment {

    private Logger logger = Logger.getLogger("hello_ros."+RosEnv.class.getName());
    
    RosBridge bridge = new RosBridge();

    /** Called before the MAS execution with the args informed in .mas2j */
    @Override
    public void init(String[] args) {
        super.init(args);
		bridge.connect("ws://localhost:9090", true);
		logger.info("Environment started, connection with ROS established.");
	
		bridge.subscribe(SubscriptionRequestMsg.generate("/move_base/result") // Carlos, we have to update the name of the topic here.
				.setType("move_base_msgs/MoveBaseActionResult"), // Carlos, we have to update the message type of the topic here.
//				.setThrottleRate(1)
//				.setQueueLength(1),
			new RosListenDelegate() {
				public void receive(JsonNode data, String stringRep) {
					MessageUnpacker<MoveBaseActionResult> unpacker = new MessageUnpacker<MoveBaseActionResult>(MoveBaseActionResult.class);
					MoveBaseActionResult msg = unpacker.unpackRosMessage(data);
					clearPercepts();
//					System.out.println("Frame id: "+msg.header.frame_id);
//					System.out.println("Stamp sec: "+msg.header.stamp.secs);
//					System.out.println("Seq: "+msg.header.seq);
//					System.out.println("Goal: "+msg.status.goal_id.id);
//					System.out.println("Stamp sec: "+msg.status.goal_id.stamp.secs);
//					System.out.println("Status: "+msg.status.status);
//					System.out.println("Text: "+msg.status.text);
//					
//					System.out.println();
					Literal movebase_result = new Literal("movebase_result");
					movebase_result.addTerm(new NumberTermImpl(msg.status.status));
					addPercept(movebase_result);
				}
			}
	    );
    }

    @Override
    public boolean executeAction(String agName, Structure action) {
		if (action.getFunctor().equals("move")) {
			move(act.getTerm(0).toString());
		}
		else {
			logger.info("executing: "+action+", but not implemented!");
		}
        informAgsEnvironmentChanged();
        return true; // the action was executed with success
    }
    
	public void move(String waypoint) {
		Publisher navigation = new Publisher("topic?", "messagetype?", bridge); // Carlos, we have to update the names of the topic and message type here.
		navigation.publish(new Type(waypoint)); // Carlos, update Type with the type of message, we may have to create a new Java message type for it if it is not a standard message. In this case let me know and I will create it.
	}

    /** Called before the end of MAS execution */
    @Override
    public void stop() {
        super.stop();
    }
}
