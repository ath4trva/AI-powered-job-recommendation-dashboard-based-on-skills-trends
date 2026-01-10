import React from "react";

interface NavbarProps {
  companyLogoSrc?: string; // URL for the Company Name image
  companyName?: string;    // Fallback text if image fails or isn't provided
}

const Navbar = ({ companyLogoSrc, companyName = "Company" }: NavbarProps) => {
  return (
    // Apple Style: Generous padding (p-6 to p-8) and absolute positioning
    <nav className="absolute top-0 left-0 w-full z-50 p-6 lg:p-8">
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