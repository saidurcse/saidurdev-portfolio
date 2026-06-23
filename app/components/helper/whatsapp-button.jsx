"use client";

import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";

function WhatsAppButton() {
  const phoneNumber = "8801754448346";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <IoLogoWhatsapp size={36} />
    </Link>
  );
}

export default WhatsAppButton;
