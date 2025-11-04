import React from 'react'

type WhoCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  backgroundColor:string;
   width?: string;
};
const WhoCard: React.FC<WhoCardProps> = ({
  icon,
  title,
  description,
  backgroundColor,
  width

}) => {
  return (
    <div>
      <div
      className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
  style={{ maxWidth: width }}
    >
      <div
        className="white p-4 rounded-full w-15 h-15 flex items-center justify-center"
        style={{ backgroundColor }}

      >
        {icon}
      </div>
      <h2 className="text-black font-bold text-lg">{title}</h2>
      <span className="text-gray-700 text-sm text-center">{description}</span>
    </div>
    </div>
  )
}
export default WhoCard;