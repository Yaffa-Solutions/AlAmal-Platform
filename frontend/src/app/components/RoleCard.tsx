'use client';
import React from 'react';

type RoleCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onClick?: () => void;
};
const RoleCard: React.FC<RoleCardProps> = ({
  icon,
  title,
  description,
  color,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-6 bg-white rounded-xl shadow-md hover:shadow-2xl hover: cursor-pointer transition-shadow duration-200 w-46"
    >
      <div
        className="bg-gray-100 p-4 rounded-full w-15 h-15 flex items-center justify-center"
        style={{ color }}
      >
        {icon}
      </div>
      <h2 className="text-black font-bold text-lg">{title}</h2>
      <span className="text-gray-500 text-sm text-center">{description}</span>
    </div>
  );
};

export default RoleCard;
