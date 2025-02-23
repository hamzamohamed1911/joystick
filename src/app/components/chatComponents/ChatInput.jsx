"use client";
import { FiSend } from 'react-icons/fi';

const ChatInput = () => {
  let message = ''; 
  let textareaRef = null; 

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      message = ''; 
      if (textareaRef) {
        textareaRef.value = ''; 
        textareaRef.style.height = 'auto'; 
      }
    }
  };

  const handleInput = (e) => {
    message = e.target.value; 
    if (textareaRef) {
      textareaRef.style.height = 'auto'; 
      textareaRef.style.height = `${Math.min(textareaRef.scrollHeight, 120)}px`; 
    }
  };

  return (
    <div className="py-4 bg-white border-t border-[#E4E7E9] flex items-center">
      <textarea
        ref={(ref) => (textareaRef = ref)} 
        onInput={handleInput} 
        className="flex-1 border-none rounded-lg py-2 px-4 bg-gray-100 focus:outline-none resize-none overflow-y-auto"
        placeholder="اكتب رسالة..."
        rows={1} 
        style={{ maxHeight: '150px' }} 
      />
      <button onClick={handleSend} className="text-primary mx-4">
        <FiSend size={24} />
      </button>
    </div>
  );
};

export default ChatInput;
