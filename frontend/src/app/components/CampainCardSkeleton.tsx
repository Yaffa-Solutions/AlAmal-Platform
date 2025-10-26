export default function CampaignCardSkeleton() {
  return (
    <div className="bg-gray-200 border border-gray-200 rounded-xl w-80 animate-pulse ml-8">
      <div className="w-full p-4 h-40 rounded-3xl object-cover bg-gray-200"></div>
      <div className="px-4 py-2">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-2 bg-gray-200 rounded mb-3 relative overflow-hidden">
          <div className="h-2 bg-gray-300 rounded absolute right-0 top-0"></div>
        </div>
        <div className="h-8 bg-gray-300 rounded mb-4"></div>
      </div>
    </div>
  );
}
