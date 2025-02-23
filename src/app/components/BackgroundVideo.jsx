

async function getVideo() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}about-us/video`, { 
      next: { revalidate: 60 } // ✅ Fetches fresh data every 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch. Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data?.data || {};
  } catch (error) {
    console.error("❌ Error fetching data:", error.message);
    return {};
  }
}


const BackgroundVideo = async () => {
  const video = await getVideo();

  return (
    <div className="flex justify-center items-center sm:w-full max-w-screen-md h-full overflow-hidden my-8 rounded-lg">
      <video controls className="w-full h-full max-w-full max-h-full object-cover rounded-lg">
        <source src={video.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

  );
};

export default BackgroundVideo;
