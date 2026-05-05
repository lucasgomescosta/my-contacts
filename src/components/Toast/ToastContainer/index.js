import { useEffect } from "react";
import { Container } from "./styles";
import ToastMessage from "../ToastMessage";
import { toastEventManager } from "../../../utils/toast";
import useAnimatedList from "../../../hooks/useAnimatedList";

export default function ToastContainer() {
  const {
    setItems: setMessages,
    handleRemoveItem,
    renderList
  } = useAnimatedList();

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prevState) => [...prevState, { id: Math.random(), type, text }]);
    }
    toastEventManager.on('addtoast', handleAddToast);
    return () => {
      toastEventManager.removeEventListener('addtoast', handleAddToast);
    }

  }, [setMessages]);



  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
      <ToastMessage
        key={message.id}
        message={message}
        onRemoveMessage={handleRemoveItem}
        isLeaving={isLeaving}
        animatedRef={animatedRef}
      />
    ))}
    </Container>
  )
}
