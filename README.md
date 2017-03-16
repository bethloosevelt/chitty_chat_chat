# Chitty App.Chat App.Chat

*By **Nikita Buyevich** and **Dale Wesa***

Basic useful feature list:

 * Create private/public chatrooms to share with others
 * Have moderator commands to control other users (kick, ban, mute, etc.)
 * Encrypted messages sent back and forth
 * Quick and easy
 


**To Run the Application locally:**

```bash
mvn package
mvn exec:java -Dexec.mainClass="App.Chat"
```


### Stuff used to make this:

 * [Spark](http://spark.apache.org/) for the back-end of the app 
 * [j2html](https://j2html.com/) generate our chat messages
 * [Maven](https://maven.apache.org/) for running the Spark server