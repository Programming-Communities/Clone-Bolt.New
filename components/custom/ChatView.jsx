"use client";

import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const { toggleSidebar } = useSidebar();
  const UpdateTokens = useMutation(api.users.UpdateToken);

  const countToken = (inputText) => {
    return inputText.trim().split(/\s+/).filter((word) => word).length;
  };

  useEffect(() => {
    if (id) {
      GetWorkspaceData();
    }
  }, [id]);

  const GetWorkspaceData = async () => {
    try {
      const result = await convex.query(api.workspace.GetWorkspace, {
        workspaceId: id,
      });
      setMessages(result?.messages || []);
    } catch (error) {
      console.error("Error fetching workspace data:", error);
    }
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    setLoading(true);
    try {
      const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
      const result = await axios.post("/api/ai-chat", {
        prompt: PROMPT,
      });

      const aiResp = {
        role: "ai",
        content: result.data.result,
      };
      setMessages((prev) => [...prev, aiResp]);

      await UpdateMessages({
        messages: [...messages, aiResp],
        workspaceId: id,
      });

      const token = Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
      setUserDetail(prev=>({
        ...prev,
        token:token
      }))
      await UpdateTokens({
        userId: userDetail?._id,
        token: token,
      });
    } catch (error) {
      console.error("Error generating AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  const onGenerate = (input) => {
    if (userDetail?.token < 10)
      {
            toast('You dont have enough tokens !');
                return;
      }
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput("");
  };

  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll scrollbar-hide px-5">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className="p-3 rounded-lg mb-2 gap-2 items-center"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            {msg?.role == "user" && (
              <Image
                src={userDetail?.picture}
                alt="userImage"
                width={35}
                height={35}
                className="rounded-full"
              />
            )}
            <div className="flex flex-col">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center justify-center gap-2">
            <Loader2Icon className="animate-spin" />
            <h2>Generating Response...</h2>
          </div>
        )}
      </div>
      <div className="flex gap-2 items-end">
        {userDetail && (
          <Image
            src={userDetail?.picture}
            onClick={toggleSidebar}
            alt="userImage"
            width={35}
            height={35}
            className="rounded-full cursor-pointer"
          />
        )}
        <div
          className="p-5 border rounded-xl max-w-xl w-full mt-3 leading-7"
          style={{ backgroundColor: Colors.BACKGROUND }}
        >
          <div className="flex gap-2">
            <textarea
              placeholder={Lookup.INPUT_PLACEHOLDER}
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
              className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
            />
            {userInput && (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer"
              />
            )}
          </div>
          <div>
            <Link className="h-5 w-5 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatView;
// "use client";

// import { MessagesContext } from "@/context/MessagesContext";
// import { UserDetailContext } from "@/context/UserDetailContext";
// import { api } from "@/convex/_generated/api";
// import Colors from "@/data/Colors";
// import Lookup from "@/data/Lookup";
// import Prompt from "@/data/Prompt";
// import axios from "axios";
// import { useConvex, useMutation } from "convex/react";
// import { ArrowRight, Link, Loader2Icon } from "lucide-react";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import React, { useContext, useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { useSidebar } from "../ui/sidebar";

// function ChatView() {
//   const { id } = useParams();
//   const convex = useConvex();
//   const { userDetail, setUserDetail } = useContext(UserDetailContext);
//   const { messages, setMessages } = useContext(MessagesContext);
//   const [userInput, setUserInput] = useState();
//   const [loading, setLoading] = useState(false);
//   const UpdateMessages = useMutation(api.workspace.UpdateMessages);
//   const { toggleSidebar } = useSidebar();
//   const UpdateTokens=useMutation(api.users.UpdateToken);

//   const countToken = (inputText) => {
//     return inputText.trim().split(/\s+/).filter(word => word).length;
//   };

//   useEffect(() => {
//     if (id) {
//       GetWorkspaceData();
//     }
//   }, [id]);

//   /**
//    * Used to get workspace data using workspace ID
//    */
//   const GetWorkspaceData = async () => {
//     try {
//       const result = await convex.query(api.workspace.GetWorkspace, {
//         workspaceId: id,
//       });

//       setMessages(result?.messages || []);
//       console.log(result);
//     } catch (error) {
//       console.error("Error fetching workspace data:", error);
//     }
//   };

//   useEffect(() => {
//     if (messages?.length > 0) {
//       const role = messages[messages?.length - 1].role;
//       if (role == "user") {
//         GetAiResponse();
//       }
//     }
//   }, [messages]);

//   const GetAiResponse = async () => {
//     setLoading(true);
//     const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
//     const result = await axios.post("/api/ai-chat", {
//       prompt: PROMPT,
//     });

//     const aiResp = {
//       role: 'ai',
//       content: result.data.result
//     }
//     setMessages(prev => [...prev, aiResp])
  

//     await UpdateMessages({
//       messages: [...messages, aiResp],
//       workspaceId: id
//     })

//     const token=Number(userDetail?.token)-Number(countToken(JSON.stringify(aiResp)));
//     //update token in database
//     await UpdateTokens({
//       userId:userDetail?._id,
//       token:token
//     })
//     setLoading(false);
//   };


//   const onGenerate = (input) => {
//     if(userDetail?.token?.token<10)
//       {
//         return ;

//       }
//     setMessages(prev => [...prev, {
//       role: 'user',
//       content: input
//     }]);
//     setUserInput('');
//       }
//   }

//   return (
//     <div className="relative h-[85vh] flex flex-col">
//       <div className="flex-1 overflow-y-scroll scrollbar-hide px-5">
//         {messages?.map((msg, index) => (
//           <div
//             key={index}
//             className="p-3 rounded-lg mb-2 gap-2 items-center"
//             style={{
//               backgroundColor: Colors.CHAT_BACKGROUND,
//             }}
//           >
//             {msg?.role == "user" && (
//               <Image
//                 src={userDetail?.picture}
//                 alt="userImage"
//                 width={35}
//                 height={35}
//                 className="rounded-full"
//               />
//             )}
//             <div className="flex flex-col">
//               <ReactMarkdown>{msg.content}</ReactMarkdown>
//             </div>

//           </div>
//         ))}
//         {loading && <div className="flex items-center justify-center gap-2">
//           <Loader2Icon className="animate-spin" />
//           <h2>Generating Response...</h2>
//         </div>}
//       </div>
//       {/*  Imput Section */}
//       <div className="flex gap-2 items-end ">
//         {userDetail &&<Image src={userDetail?.picture}
//         onClick={toggleSidebar}
//          alt="userImage" width={35} height={35} className="rounded-full cursor-pointer"  />}
//       <div
//         className="p-5 border rounded-xl max-w-xl w-full mt-3 leading-7"
//         style={{ backgroundColor: Colors.BACKGROUND }}
//       >
//         <div className="flex gap-2">
//           <textarea
//             placeholder={Lookup.INPUT_PLACEHOLDER}
//             value={userInput}
//             onChange={(event) => setUserInput(event.target.value)}
//             className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
//           />
//           {userInput && (
//             <ArrowRight
//               onClick={() => onGenerate(userInput)}
//               className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer"
//             />
//           )}
//         </div>
//         <div>
//           <Link className="h-5 w-5 cursor-pointer" />
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// }

// export default ChatView;
