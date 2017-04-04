import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class User {
    @JsonProperty("type")
    public String Type;

    @JsonProperty("username")
    public String Username;

    @JsonProperty("newUser")
    public boolean NewUser;

    @JsonProperty("text")
    public String Text;

    @JsonProperty("id")
    public String Id;

    @JsonProperty("date")
    public Date Date;
}
