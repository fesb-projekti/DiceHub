import classes from "./Conversation.module.css";

export default function Conversation({ conversation, currentUser }) {
  
  return (
    <div className={classes.conversation}>
      <span className={classes.conversationName}>{currentUser}</span>
      <span>{conversation}</span>
    </div>
  );
}