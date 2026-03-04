import RevealText from "./RevealText";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/tybulszewicz/",
    label: "Linkedin",
    className: "w-full min-w-full lg:w-auto lg:min-w-0 px-8 lg:pr-48 lg:pl-8 py-1 border border-[#FFF4EB] rounded-full bg-transparent text-[#FFF4EB] font-inter-tight text-lg hover:bg-[#FFF4EB] hover:text-[#121212] transition-all duration-300 text-left inline-block",
    external: true,
  },
  {
    href: "https://github.com/tylerbulszewicz",
    label: "Github",
    className: "w-full min-w-full lg:w-auto lg:min-w-0 px-8 lg:pr-24 lg:pl-8 py-1 border border-[#FFF4EB] rounded-full bg-transparent text-[#FFF4EB] font-inter-tight text-lg hover:bg-[#FFF4EB] hover:text-[#121212] transition-all duration-300 text-left inline-block",
    external: true,
  },
  {
    href: "https://www.instagram.com/ty.bulszewicz/",
    label: "Instagram",
    className: "w-full min-w-full lg:w-auto lg:min-w-0 px-8 lg:pr-36 lg:pl-8 py-1 lg:mr-24 border border-[#FFF4EB] rounded-full bg-transparent text-[#FFF4EB] font-inter-tight text-lg hover:bg-[#FFF4EB] hover:text-[#121212] transition-all duration-300 text-left inline-block",
    external: true,
  },
  {
    href: "mailto:tbulszewicz@gmail.com",
    label: "Email",
    className: "w-full min-w-full lg:w-auto lg:min-w-0 px-8 lg:pr-12 lg:pl-8 py-1 lg:mr-48 border border-[#FFF4EB] rounded-full bg-transparent text-[#FFF4EB] font-inter-tight text-lg hover:bg-[#FFF4EB] hover:text-[#121212] transition-all duration-300 text-left inline-block",
    external: false,
  },
] as const;

const Footer = () => {
  return (
    <footer id="contact" className="bg-[--foreground] min-h-screen flex items-center px-4 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <RevealText as="div" stagger={0.1}>
              <h3 className="font-sentient-variable text-3xl md:text-4xl font-bold text-[#FFF4EB] mb-8 italic">
                Let&apos;s Talk...
              </h3>
            </RevealText>
            
            <div className="space-y-8">
              <RevealText as="div" stagger={0.1}>
                <p className="text-[#FFF4EB] text-lg lg:text-xl leading-relaxed font-inter-tight">
                  Feel free to reach out to my email for any inquires. I&apos;m looking forward to making your wildest dreams come true...
                </p>
              </RevealText>
              
              <RevealText as="div" stagger={0.1}>
                <p className="text-[#FFF4EB] text-lg lg:text-xl leading-relaxed font-inter-tight">
                  <span className="text-[#FFF4EB] italic">Sincerely, </span>
                  <span className="text-[#FFF4EB] italic">yours truly.</span>
                </p>
              </RevealText>
            </div>
          </div>

          {/* Right Column - Buttons */}
          <div className="flex flex-col space-y-4 w-full lg:items-end">
            {socialLinks.map((link) => (
              <RevealText as="div" stagger={0.1} key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={link.className}
                >
                  {link.label}
                </a>
              </RevealText>
            ))}
          </div>
        </div>
      </div>
      
      {/* Layer4 SVG Background */}
      <div 
        className="absolute bottom-0 right-0 w-full h-full pointer-events-none z-0 opacity-5 overflow-hidden translate-y-12"
        style={{
          filter: 'invert(1)',
          backgroundImage: 'url(/layer4.svg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </footer>
  );
};

export default Footer;
