const RecentVideos = () => {
    const videos = [
      { title: "Exciting vlog.mp4", size: "3.75 MB", uploadedOn: "24/08/2023 08:42 AM", earned: "Profile" },
      { title: "Funny cat videos.mp4", size: "1.5 MB", uploadedOn: "24/08/2023 11:23 PM", earned: "My videos" },
      { title: "Tutorial.mp4", size: "1.2 MB", uploadedOn: "21/08/2023 07:09 AM", earned: "Subscriptions" },
      { title: "Earnings report.xls", size: "500 KB", uploadedOn: "21/08/2023 06:10 AM", earned: "Manage users" },
      { title: "Top 10 videos.mp4", size: "50 KB", uploadedOn: "20/08/2023 03:55 AM", earned: "Manage videos" }
    ];
  
    return (
      <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Recent Videos</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="pb-2">Title</th>
              <th className="pb-2">Size</th>
              <th className="pb-2">Uploaded On</th>
              <th className="pb-2">Earned</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="py-2">{video.title}</td>
                <td className="py-2">{video.size}</td>
                <td className="py-2">{video.uploadedOn}</td>
                <td className="py-2">{video.earned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default RecentVideos;
  