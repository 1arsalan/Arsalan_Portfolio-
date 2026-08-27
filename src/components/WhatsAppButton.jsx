import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton({ url }) {
  if (!url) return null
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed z-50 flex items-center justify-center rounded-full
                 w-12 h-12 sm:w-14 sm:h-14
                 bottom-5 right-5 sm:bottom-6 sm:right-6
                 bg-[#25D366] text-bg shadow-glow hover:scale-105 active:scale-95 transition-transform"
    >
      <FaWhatsapp className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px]" />
    </a>
  )
}
