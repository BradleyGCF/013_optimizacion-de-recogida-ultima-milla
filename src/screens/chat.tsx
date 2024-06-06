import type React from "react";
import { useState, useEffect } from "react";
import Parse from "parse";
import { useParams } from "react-router-dom";
import { getLocalStorage } from "../hooks/getLocalStorage";
import { Box, TextField, Button, Avatar } from "@mui/material";

// Define los type
interface ClientAttributes {
  username?: string;
  type_user?: string;
}

interface Client {
  objectId?: string;
  attributes?: ClientAttributes;
}

interface Message {
  id?: string;
  content?: string;
  clientId?: Client;
}

const Chat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userId, setUserId] = useState<string | null>(null);
  const [usernameAdmin, setUsernameAdmin] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(true);

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

  useEffect(() => {
    if (!isAdmin && !usernameAdmin && messages.length > 0) {
      const admin = messages.find(
        (mess) => mess?.clientId?.attributes?.type_user === "admin"
      );
      if (admin) {
        setUsernameAdmin(admin.clientId?.attributes?.username || null);
      }
    }
  }, [isAdmin, messages, usernameAdmin]);

  Parse.initialize("013");
  Parse.serverURL = "http://localhost:2337/server";
  const LiveQueryClient = Parse.LiveQueryClient;
  const client = new LiveQueryClient({
    applicationId: "013",
    serverURL: "ws://localhost:2337",
    masterKey: "Yzhl06W5O7Vhf8iwlYBQCxs6hY8Fs2PQewNGjsl0",
  });

  client.open();

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  client.on("error", (error: any) => {
    console.error(error);
  });

  const ChatMessage = Parse.Object.extend("Chat_Message");
  const query = new Parse.Query(ChatMessage);
  query.include("clientId");
  query.equalTo("chatroomId", id);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const subscription = client.subscribe(query);

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    subscription.on("create", (message: any) => {
      setMessages((prevMessages) => {
        const newMessage: Message = {
          id: message.id,
          content: message.get("content"),
          clientId: {
            objectId: message.get("clientId")?.id,
            attributes: {
              username: message.get("clientId")?.get("username"),
              type_user: message.get("clientId")?.get("type_user"),
            },
          },
        };

        const allMessages = [...prevMessages, newMessage];

        const uniqueMessages = Array.from(
          new Set(allMessages.map((msg) => msg.id))
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
        ).map((id) => allMessages.find((msg) => msg.id === id)!);

        return uniqueMessages;
      });
    });

    if (messages.length === 0) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      query.find().then((data: any) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const messArray = data.map((mess: any) => ({
          id: mess.id,
          content: mess.get("content"),
          clientId: {
            objectId: mess.get("clientId")?.id,
            attributes: {
              username: mess.get("clientId")?.get("username"),
              type_user: mess.get("clientId")?.get("type_user"),
            },
          },
        }));
        setMessages(messArray);
      });
    }

    subscription.on("update", () => {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          new Notification("notification update");
        }
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [client, id, messages.length, query]);

  const sendMessage = (content: string) => {
    const message = new ChatMessage();
    message.set("content", content);
    message.set("clientId", {
      __type: "Pointer",
      className: "_User",
      objectId: userId,
    });
    message.set("chatroomId", id);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    message.save().catch((error: any) => {
      console.error("Error send error: ", error);
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(newMessage);
    setNewMessage("");
  };

  const getInitial = (username?: string) => {
    return username ? username[0] : "?";
  };

  return (
    <div>
      <div>{usernameAdmin || "user"}</div>
      <hr />
      <div>
        {messages.map((message) => (
          <div style={{ paddingRight: "4em" }} key={message.id}>
            {message.clientId?.attributes?.type_user === "admin" ? (
              <Box display="flex" justifyContent="flex-start" mb={2}>
                <Avatar>
                  {getInitial(message.clientId?.attributes?.username)}
                </Avatar>
                <Box bgcolor="#e0e0e0" borderRadius="10px" p={1} ml={2}>
                  <strong>{message.clientId?.attributes?.username}</strong>:{" "}
                  {message.content}
                </Box>
              </Box>
            ) : (
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <Box bgcolor="#b3d9ff" borderRadius="10px" p={1} mr={2}>
                  <strong>{message.clientId?.attributes?.username}</strong>:{" "}
                  {message.content}
                </Box>
                <Avatar>
                  {getInitial(message.clientId?.attributes?.username)}
                </Avatar>
              </Box>
            )}
          </div>
        ))}
      </div>
      <hr />
      <div>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Message"
            variant="outlined"
            value={newMessage}
            onChange={handleInputChange}
            fullWidth
          />
          <Button
            style={{ marginTop: "6px" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
