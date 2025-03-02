"use client"; // Add this line at the top

import React, { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/custom/AppSideBar";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ActionContext } from "@/context/ActionContext";
import { useRouter } from "next/navigation";

function Provider({ children }) {
  const [messages, setMessages] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [queryClient] = useState(() => new QueryClient());
  const router=useRouter();
  const convex = useConvex();
  const [action, setAction] = useState({ actionType: null, timeStamp: null });


  useEffect(() => {
    const fetchUser = async () => {
      await IsAutheicated();
    };
    fetchUser();
  }, []);

  const IsAutheicated = async () => {
    if (typeof window !== "undefined") {
      const userString = localStorage.getItem("user");
      if (!userString) {
        console.warn("No user found in localStorage");
        router.push("/");
        return;
      }

      const user = JSON.parse(userString);
      console.log("User from localStorage:", user);

      if (user?.email) {
        try {
          const result = await convex.query(api.users.GetUser, {
            email: user?.email,
          });

          console.log("Fetched user from Convex:", result);

          if (result) {
            setUserDetail(result);
          } else {
            console.warn("User not found in database");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLINT_ID }}>
        <QueryClientProvider client={queryClient}>
          <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <MessagesContext.Provider value={{ messages, setMessages }}>
              <ActionContext.Provider value={{ action, setAction }}>
                <NextThemesProvider
                  attribute="class"
                  defaultTheme="dark"
                  enableSystem
                  disableTransitionOnChange
                >
                  {/* Move SidebarProvider to wrap Header */}
                  <SidebarProvider defaultOpen={false}>
                    <Header />
                    <AppSideBar />
                    {children}
                  </SidebarProvider>
                </NextThemesProvider>
              </ActionContext.Provider>
            </MessagesContext.Provider>
          </UserDetailContext.Provider>
        </QueryClientProvider>
      </PayPalScriptProvider>
    </GoogleOAuthProvider>
  );
  
}

export default Provider;

// "use client";

// import React, { useState, useEffect } from "react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import Header from "@/components/custom/Header";
// import { MessagesContext } from "@/context/MessagesContext";
// import { UserDetailContext } from "@/context/UserDetailContext";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import React Query
// import { useConvex } from "convex/react"; // ✅ Correct import
// import { api } from "@/convex/_generated/api";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import AppSideBar from "@/components/custom/AppSideBar";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// function Provider({ children }) {
//   const [messages, setMessages] = useState([]);
//   const [userDetail, setUserDetail] = useState({});
//   const [queryClient] = useState(() => new QueryClient()); // React Query Client
//   const convex = useConvex();
//   const [action, setAction]=useState();

//   useEffect(() => {
//     const fetchUser = async () => {
//       await IsAutheicated();
//     };
//     fetchUser();
//   }, []);

//   const IsAutheicated = async () => {
//     if (typeof window !== "undefined") {
//       const userString = localStorage.getItem("user");
//       if (!userString) {
//         console.warn("No user found in localStorage");
//         return;
//       }

//       const user = JSON.parse(userString);
//       console.log("User from localStorage:", user);

//       if (user?.email) {
//         try {
//           const result = await convex.query(api.users.GetUser, {
//             email: user?.email,
//           });

//           console.log("Fetched user from Convex:", result);

//           if (result) {
//             setUserDetail(result);
//           } else {
//             console.warn("User not found in database");
//           }
//         } catch (error) {
//           console.error("Error fetching user:", error);
//         }
//       }
//     }
//   };

//   return (
//     <GoogleOAuthProvider
//       clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}>
//        <PayPalScriptProvider options={{ clientId:process.env.NEXT_PUBLIC_PAYPAL_CLINT_ID }}>
//       <QueryClientProvider client={queryClient}>
//         <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
//           <MessagesContext.Provider value={{ messages, setMessages }}>
//             <ActionContext.Provider value={{ action, setAction }}>
//             <NextThemesProvider
//               attribute="class"
//               defaultTheme="dark"
//               enableSystem
//               disableTransitionOnChange
//             >
//               <Header />
//               <SidebarProvider defaultOpen={false}>
//                 <AppSideBar />
//                 {children}
//               </SidebarProvider>
//             </NextThemesProvider>
//             </ActionContext.Provider>
//           </MessagesContext.Provider>
//         </UserDetailContext.Provider>
//       </QueryClientProvider>
//       </PayPalScriptProvider>
//     </GoogleOAuthProvider>
//   );
// }

// export default Provider;
