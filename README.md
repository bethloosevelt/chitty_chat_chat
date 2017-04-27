# Chitty Chat Chat

*By **Nikita Buyevich** and **Dale Wesa***

Basic useful feature list:

 * Join a global chatroom and talk with others!
 * Encrypted messages sent back and forth
 * Emoji support
 * Anonymous name generation
 * Quick and easy
 

**Hosted on: [http://chitty-chat-chat.herokuapp.com/](http://chitty-chat-chat.herokuapp.com/)**

**To Run the Application locally:**

```bash
Run the command ./start
```
or
```bash
mvn package
mvn exec:java -Dexec.mainClass="Chat"
```


### Made with:

 * [Spark](http://spark.apache.org/) for the back-end of the app 
 * [j2html](https://j2html.com/) generate our chat messages
 * [Maven](https://maven.apache.org/) for running the Spark server