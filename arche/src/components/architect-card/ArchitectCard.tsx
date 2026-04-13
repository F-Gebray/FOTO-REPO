import React from "react";

interface ArchitectCardProps {
  name: string;
  title: string;
}

const ArchitectCard: React.FC<ArchitectCardProps> = ({ name, title }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div>
      <h3 className="font-cormorant text-[22px] font-light text-[#f0ede6] mb-5">
        The Architect
      </h3>
      <div className="flex items-center gap-4 p-5 bg-[#161612] border-l-[1.5px] border-[#c9a96e]">
        <div className="w-12 h-12 rounded-full bg-[#2a2418] flex items-center justify-center flex-shrink-0">
          <span className="font-cormorant text-lg text-[#c9a96e]">{initials}</span>
        </div>
        <div>
          <p className="font-cormorant text-[17px] font-light text-[#f0ede6] mb-1">
            {name}
          </p>
          <p className="text-[9px] tracking-[2px] uppercase text-white/35">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default ArchitectCard;
