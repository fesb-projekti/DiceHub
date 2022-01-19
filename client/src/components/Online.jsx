import "./online.css";

export default function Online({user}) {
  

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}