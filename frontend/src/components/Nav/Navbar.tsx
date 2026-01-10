interface NavbarProps {
  companyLogoSrc?: string; // URL for the Company Name image
  companyName?: string; // Fallback text if image fails or isn't provided
}

const Navbar = ({ companyLogoSrc, companyName = "Company" }: NavbarProps) => {
  return (
    // Apple Style: Compact padding (p-4 to p-6) and absolute positioning with elegant background
    <nav className="absolute top-0 left-0 w-full z-50 p-4 lg:p-6 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50">
      <div className="flex items-center">
        {companyLogoSrc ? (
          <img
            src={companyLogoSrc}
            alt="Company Logo"
            // Auto width preserves aspect ratio; h-8 to h-10 is standard for wordmarks
            className="h-10 sm:h-18 w-auto object-contain"
          />
        ) : (
          <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {companyName}
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
