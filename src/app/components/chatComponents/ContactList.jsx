import Image from "next/image";
import { chatImage1, chatImage2 } from "../../../../public";

const ContactList = () => {
    const contacts = [
        {
            id: 1,
            name: 'مستخدم 1',
            lastMessage: 'أهلا!',
            profileImage: chatImage1, 
        },
        {
            id: 2,
            name: 'مستخدم 2',
            lastMessage: 'كيف يمكنني مساعدتك؟',
            profileImage: chatImage2, 
        },
    ];

    return (
        <ul className="p-4 space-y-3 w-full">
            {contacts.map((contact) => (
                <li key={contact.id} className="p-3 w-full flex items-center bg-white rounded-md shadow-sm hover:bg-gray-100 cursor-pointer">
                    <Image
                        src={contact.profileImage}
                        alt={`${contact.name}'s profile`}
                        width={30}
                        height={30}
                        className="rounded-full " 
                    />
                        <p className="font-semibold text-gray-900 text-sm">{contact.name}</p>
                </li>
            ))}
        </ul>
    );
};

export default ContactList;
