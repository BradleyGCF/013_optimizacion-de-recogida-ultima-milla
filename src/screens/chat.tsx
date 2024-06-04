/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import Parse from "parse";
import { useParams } from "react-router-dom";
import { getLocalStorage } from "../hooks/getLocalStorage";

const Chat = () => {
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const [usernameAdmin, setUsernameAdmin] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const localStorage = getLocalStorage("Parse/013/currentUser");
    const vehicle = getLocalStorage("vehicle");
    if (localStorage?.objectId) {
      setUserId(localStorage.objectId);
    }
    if (!localStorage?.objectId && vehicle?.driverId) {
      setUserId(vehicle.driverId);
      setIsAdmin(false);
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!isAdmin && !usernameAdmin && messages.length > 0) {
      const admin = messages?.find(
        (mess) => mess?.clientId?.objectId?.attributes?.type_user === "admin"
      );
      if (admin) {
        setUsernameAdmin(admin?.clientId?.objectId?.attributes?.username);
      }
    }
  }, [isAdmin, messages]);

  Parse.initialize("013");
  Parse.serverURL = "http://localhost:2337/server";
  const LiveQueryClient = Parse.LiveQueryClient;
  const client = new LiveQueryClient({
    applicationId: "013",
    serverURL: "ws://localhost:2337",
    masterKey: "Yzhl06W5O7Vhf8iwlYBQCxs6hY8Fs2PQewNGjsl0",
  });

  client.open("open", () => {
    console.log("connect");
  });

  client.on("error", (error) => {
    console.log(error);
  });

  const ChatMessage = Parse.Object.extend("Chat_Message");
  const query = new Parse.Query(ChatMessage);
  query.include("clientId");
  query.equalTo("chatroomId", id);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const subscription = client.subscribe(query);
    subscription.on("create", (message) => {
      setMessages((prevMessages) => {
        const newMessage = {
          content: message.get("content"),
          clientId: {
            __type: "Pointer",
            className: "_User",
            objectId: message.get("clientId"),
          },
          id: message.id,
        };

        const allMessages = [...prevMessages, newMessage];

        const uniqueMessages = Array.from(
          new Set(allMessages.map((msg) => msg.id))
        ).map((id) => allMessages.find((msg) => msg.id === id));

        return uniqueMessages;
      });
    });

    if (messages.length === 0) {
      query.find().then((data) => {
        const messArray = data.map((mess) => {
          return {
            id: mess.id,
            content: mess.get("content"),
            clientId: {
              __type: "Pointer",
              className: "_User",
              objectId: mess.get("clientId"),
            },
          };
        });
        setMessages(messArray);
      });
    }

    //Notificacion
    subscription.on("update", () => {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          new Notification("Notificacion update");
        }
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const sendMessage = (content) => {
    const message = new ChatMessage();
    message.set("content", content);
    message.set("clientId", {
      __type: "Pointer",
      className: "_User",
      objectId: userId,
    });
    message.set("chatroomId", id);
    message.save().catch((error) => {
      console.log("Error al enviar mensaje: ", error);
    });
  };
  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div>
      <div>{usernameAdmin || "usuario"}</div>
      <hr />
      <div>
        chat
        {console.log({ messages })}
        {messages.map((message, index) => (
          <p key={index}>
            <strong>{message?.clientId?.objectId?.attributes?.username}</strong>
            : {message.content}
          </p>
        ))}
      </div>
      <hr />
      <div>
        input
        <form onSubmit={handleFormSubmit}>
          <textarea value={newMessage} onChange={handleInputChange} />
          <button type="submit">Enviar mensaje</button>
        </form>
      </div>
    </div>
  );
};
export default Chat;
