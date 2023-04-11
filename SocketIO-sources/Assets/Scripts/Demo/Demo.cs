using UnityEngine;
using KyleDulce.SocketIo;

[System.Serializable]
public class ActionEvent
{
    public string ActionType;
    public float TimeElapsed;
}

public class Demo : MonoBehaviour
{
    Socket s;

    // Start is called before the first frame update
    void Start()
    {

        #if UNITY_WEBGL && !UNITY_EDITOR
            s = SocketIo.establishSocketConnection(Application.absoluteURL);
        #else 
            s = SocketIo.establishSocketConnection("URL of your server goes here");
        #endif
        s.connect();

        // define reception callbacks here
        s.on("connectionstatus", call);
    }

    void call(string d) {
        
        s.emit("connectionstatus",  "confirmed"); 

    }

    void Update()
    {

        // dummy method to send a JSON structure each time the space bar is pressed
        // the server must have a method socket.on("ActionEvent") to receive and process this event.
        if (Input.GetKeyDown(KeyCode.Space))
        {
            ActionEvent respObject = new ActionEvent();
            respObject.ActionType="jump";
            respObject.TimeElapsed=Time.realtimeSinceStartup;
            string respJson = JsonUtility.ToJson(respObject);
            s.emit("ActionEvent", respJson); 
        }
    }

    void OnDestroy()
    {
        s.close();
    }

}
