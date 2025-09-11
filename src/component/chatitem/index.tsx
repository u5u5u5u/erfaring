import { ChevronRight } from "lucide-react";
import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import ChatIcon from "../ChatIcon";
import ChatSpeechBubble from "../ChatSpeechBubble";

interface ChatitemProps {
  name: string;
  icon: string;
  text: string;
  time: string;
}

const Chatitem = ({ name, icon, text, time }: ChatitemProps) => {
  return (
    <div className={styles.chatitem}>
      <ChatIcon icon={icon} name={name}></ChatIcon>
      <ChatSpeechBubble text={text} time={time}></ChatSpeechBubble>
    </div>
  );
};

export default Chatitem;
