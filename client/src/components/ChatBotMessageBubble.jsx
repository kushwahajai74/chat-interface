const ChatBotMessageBubble = ({ message }) => {
  return (
    <div className="flex mb-4 justify-start">
      <p className=" bg-white inline-block max-w-[15rem] px-4 py-2 rounded-2xl text-sm rounded-tl-none shadow-md">
        {message.content}
      </p>
    </div>
  );
};

export default ChatBotMessageBubble;
