import { useState, useEffect, useCallback } from "react";
import { Container } from "./styles";
import ToastMessage from "../ToastMessage";
import { toastEventManager } from "../../../utils/toast";

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prevState) => [...prevState, { id: Math.random(), type, text }]);
    }
    toastEventManager.on('addtoast', handleAddToast);
    return () => {
      toastEventManager.removeEventListener('addtoast', handleAddToast);
    }

  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setMessages(prevState => prevState.filter(message => message.id !== id));
  }, [])

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          id={message.id}
          type={message.type}
          text={message.text}
          onRemove={handleRemoveMessage}
        />
      ))}
    </Container>
  )
}
