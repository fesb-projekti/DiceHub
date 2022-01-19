import "./message.css";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://akns-images.eonline.com/eol_images/Entire_Site/2017210/rs_600x600-170310083229-600.avatar-1.31017.jpg?fit=around%7C1080:1080&output-quality=90&crop=1080:1080;center,top"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{(message.createdAt)}</div>
    </div>
  );
}