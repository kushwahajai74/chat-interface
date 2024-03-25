const UserMessageBubble = ({ message }) => {
  return (
    <div className="flex  mb-4 justify-end">
      <p className=" bg-violet-900 max-w-[15rem] text-white px-4 py-2 rounded-2xl text-sm rounded-tr-none shadow-md">
        {message.content}
      </p>
    </div>
  );
};

export default UserMessageBubble;
