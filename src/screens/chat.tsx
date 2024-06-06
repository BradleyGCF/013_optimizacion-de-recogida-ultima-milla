import type React from "react";
import { useState, useEffect } from "react";
import Parse from "parse";
import { useParams } from "react-router-dom";
import { getLocalStorage } from "../hooks/getLocalStorage";
import Maps from "../screens/maps";
import { Card, CardContent, Box } from "@mui/material";

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

export const styleCardMap = {
  height: { xs: "100vh" },
  width: { md: "100%" },
  borderRadius: "10px",
  backgroundImage: "none",
  backgroundColor: "background.default",
  boxShadow:
    " 0px 2.76726px 2.21381px 0px rgba(0, 98, 188, 0.02), 0px 6.6501px 5.32008px 0px rgba(0, 98, 188, 0.03), 0px 12.52155px 10.01724px 0px rgba(0, 98, 188, 0.04), 0px 22.33631px 17.86905px 0px rgba(0, 98, 188, 0.04), 0px 41.77761px 33.42209px 0px rgba(0, 98, 188, 0.05), 0px 100px 80px 0px rgba(0, 98, 188, 0.07)",
};

export const styleCardContentMap = {
  height: "100%",
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  gap: { xs: "20px", md: "0px" },
  p: { xs: "10px", md: "10px" },
  "&:last-child": {
    paddingBottom: { xs: "10px", md: "10px" },
  },
};

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

  return (
    <div>
      <div>{usernameAdmin || "user"}</div>
      <hr />
      <div>
        chat
        {messages.map((message) => (
          <p key={message.id}>
            <strong>{message.clientId?.attributes?.username}</strong>:{" "}
            {message.content}
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
      <Card sx={styleCardMap}>
        <CardContent sx={styleCardContentMap}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Maps />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
