import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.jetty.websocket.api.*;
import org.eclipse.jetty.websocket.api.annotations.*;

import java.io.IOException;

@WebSocket
public class ChatWebSocketHandler {

    private String sender, msg;

    @OnWebSocketClose
    public void onClose(Session sessionUser, int statusCode, String reason) {
        User user = Chat.userUsernameMap.get(sessionUser);
        Chat.userUsernameMap.remove(sessionUser);
        Chat.broadcastMessage(sender = "Server", msg = (user.Username + " left the chat"));
    }

    @OnWebSocketMessage
    public void onMessage(Session sessionUser, String message) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            User user = mapper.readValue(message, User.class);
            Chat.userUsernameMap.put(sessionUser, user);
            if (user.NewUser) {
                Chat.broadcastMessage(sender = "Server", msg = (user.Username + " joined the chat"));
            } else {
                Chat.broadcastMessage(sender = user.Username, msg = user.Text);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
