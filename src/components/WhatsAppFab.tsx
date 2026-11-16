import { MessageCircle } from "lucide-react";
import { waLink } from "../data/site";

export default function WhatsAppFab() {
  return (
    <a href={waLink()} target="_blank" rel="noreferrer" aria-label="Chat WhatsApp" className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-soft transition-transform hover:scale-105">
      <MessageCircle size={22} />
    </a>
  );
}
