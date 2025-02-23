import ChatHeader from "@/app/components/chatComponents/ChatHeader";
import ChatInput from "@/app/components/chatComponents/ChatInput";
import ChatMessages from "@/app/components/chatComponents/ChatMessages";
import ContactList from "@/app/components/chatComponents/ContactList";

const HelpCenter = () => {
  return (
    <section className="flex flex-col md:px-4 px-6">
      <div className="border-[1px] border-[#E4E7E9] border-solid md:text-lg text-md h-full w-full">
        <div className="border-b-[1px] border-solid border-[#E4E7E9] py-4 px-6 flex items-center">
          <h1 className="font-semibold">مركز المساعدة</h1>
        </div>
        <div className="flex  h-screen">
          {/* Sidebar */}
          <div className="md:w-1/4 w-full bg-white border-b md:border-b-0 md:border-r border-gray-200">
            <div className="overflow-y-auto h-full">
              <ContactList />
            </div>
          </div>
          {/* Chat Section */}
          <div className="flex-1 flex flex-col">
            <ChatHeader />
            <ChatMessages />
            <ChatInput />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpCenter;
