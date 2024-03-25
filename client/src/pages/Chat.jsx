import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../Provider/AuthProvider";
import logout from "../assets/logout.svg";
import io from "socket.io-client";
import ChatBotMessageBubble from "../components/ChatBotMessageBubble";
import UserMessageBubble from "../components/UserMessageBubble";
import toast from "react-hot-toast";

const Chat = () => {
  const [delay, setDelay] = useState("1000");
  const socket = useMemo(
    () =>
      io("https://coral-app-wu5hd.ondigitalocean.app", {
        auth: {
          token: localStorage.getItem("token"),
        },
        query: {
          delay,
        },
      }),
    [delay]
  );

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesColumnRef = useRef(null); // Add this

  const { setIsAuthenticated, setUser, setToken } = useAuth();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });
    socket.on("welcomeMessages", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleLogout = function () {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    toast.success("Logged Out Successfully");
  };

  const handleSendMessage = function () {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "User", content: input },
    ]);
    socket.emit("sendMessage", input);
    setInput("");
  };

  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <div className="text-black bg-gradient w-full h-[100vh] box-border">
        <button
          type="button"
          onClick={handleLogout}
          className=" absolute font-extrabold  bg-gray-300 shadow-md rounded-lg px-6 py-4 m-4 hover:bg-gray-400 hover:text-white duration-300 ease-in-out"
        >
          <div className="flex gap-2">
            Logout
            <img src={logout} alt="icon" className="w-6" />
          </div>
        </button>
        <div className="max-w-[60%] m-auto h-screen p-6 flex flex-col justify-between ">
          <div
            ref={messagesColumnRef}
            className="h-[calc(85vh-2rem)] overflow-auto scroll-smooth"
          >
            {messages.map((message, index) =>
              message.sender === "Wysa" ? (
                <ChatBotMessageBubble key={index} message={message} />
              ) : (
                <UserMessageBubble key={index} message={message} />
              )
            )}
          </div>
          <form
            className="h-[3rem] flex w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className="text-white min-w-[70%] px-3 "
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
            />
            <select
              name="delay"
              id="delay"
              value={delay}
              onChange={(e) => setDelay(e.target.value)}
              className="bg-gray-300 shadow-lg rounded-lg px-4 py-2 mx-8"
            >
              <option value="1000">1s</option>
              <option value="2000">2s</option>
              <option value="3000">3s</option>
              <option value="4000">4s</option>
              <option value="5000">5s</option>
            </select>
            <button
              type="submit"
              onClick={handleSendMessage}
              className="font-extrabold bg-gray-300 px-6 py-2 shadow-md rounded-lg  hover:bg-gray-400 hover:text-white duration-300 ease-in-out "
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
