import { getMessages } from "@/services/messagesApi";
import { getDate } from "@/utils/getDate.";
import { useQuery } from "react-query";

function MessagesPage() {
  const { data: messagesData } = useQuery(["messages"], () => getMessages());
  const messages = messagesData?.data ?? [];
  const totalMessages = messagesData?.total ?? 0;

  return (
    <section className="p-4 sm:p-12 max-w-7xl xl:mx-auto">
      <div className=" bg-white  font-inter p-4 sm:p-8 rounded ">
        {messages.map(({ _id, name, subject, email, message, createdAt }, index) => (
          <div key={_id} className={`${index === 0 ? "" : "border-t"} border-gray-200 py-6 `}>
            <div className="flex items-center">
              <h5 className="capitalize font-medium">{name}</h5>
              <h6 className="ml-4 text-blue-500 text-sm">{email}</h6>
              <span className="ml-auto text-secondary text-sm">{getDate(createdAt)}</span>
            </div>
            <div className="mt-1">
              <h6>{subject}</h6>
            </div>
            <div>
              <p className="text-sm text-[#333333] line-clamp-5 !overflow-auto">{message}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MessagesPage;
