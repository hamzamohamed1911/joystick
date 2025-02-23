const ChatMessages = () => {
  const messages = [
    { id: 1, text: 'مرحباً، كيف يمكنني مساعدتك؟', sender: 'support' },
    { id: 2, text: 'أحتاج إلى مساعدة بشأن طلبي.', sender: 'user' },
    { id: 3, text: 'بالطبع، هل يمكنني الحصول على رقم الطلب؟', sender: 'support' },
    { id: 4, text: 'رقم الطلب هو 12345.', sender: 'user' },
    { id: 5, text: 'لحظة من فضلك، سأتحقق من الطلب.', sender: 'support' },
    { id: 6, text: 'شكرًا على مساعدتك.', sender: 'user' },
    { id: 7, text: 'لقد وجدت طلبك. يبدو أنه سيصل خلال 3 أيام.', sender: 'support' },
    { id: 8, text: 'هل يمكنك تسريع عملية الشحن؟', sender: 'user' },
    { id: 9, text: 'سأرى ما يمكنني فعله. سأعود إليك قريبًا.', sender: 'support' },
    { id: 10, text: 'أشكركم على تفهمكم.', sender: 'user' },
    { id: 11, text: 'لقد تم تسريع الطلب وسيصل خلال يومين.', sender: 'support' },
    { id: 12, text: 'هذا رائع! شكرًا جزيلًا.', sender: 'user' },
    { id: 13, text: 'هل تحتاج إلى أي مساعدة أخرى؟', sender: 'support' },
    { id: 14, text: 'لا، هذا كل شيء. شكرًا لك.', sender: 'user' },
    { id: 15, text: 'على الرحب والسعة، نحن هنا لمساعدتك دائمًا.', sender: 'support' },
    { id: 16, text: 'أراكم قريبًا. وداعًا.', sender: 'user' },
    { id: 17, text: 'إلى اللقاء، يومك سعيد!', sender: 'support' },
    { id: 18, text: 'هل توجد أي عروض حالية؟', sender: 'user' },
    { id: 19, text: 'نعم، لدينا خصومات تصل إلى 20% على بعض المنتجات.', sender: 'support' },
    { id: 20, text: 'سأتحقق منها. شكرًا مرة أخرى!', sender: 'user' },
  ];
  
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-Secondary">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-3 max-w-xs rounded-lg ${
            msg.sender === 'user' 
              ? 'bg-primary text-white self-end ml-auto' 
              : 'bg-gray-200 text-gray-800 self-start mr-auto'
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
