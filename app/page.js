import Hero from "@/components/custom/Hero";
import { MessagesProvider } from "@/context/MessagesContext";

export default function Home() {
  return (
   <div>
     <MessagesProvider>
   <Hero />
   </MessagesProvider>
   </div>
  );
}
