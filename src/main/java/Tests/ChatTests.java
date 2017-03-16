package Tests;

import org.junit.Test;
import App.Chat;
import org.joda

public class ChatTests {

    @Test
    public void confirmHTMLFormatting() {

        DateTimeUtils.setCurrentMillisFixed(123);
        Chat testChat = new Chat();
        System.out.println(testChat.createHtmlMessageFromSender("someUser", "oh hey guys"));
    }
}
