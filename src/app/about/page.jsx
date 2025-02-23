import Features from "../components/Features";
import Image from "next/image";
import BackgroundVideo from "../components/BackgroundVideo";

async function fetchAboutJoyStick() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}about-us/section-one`, { 
      next: { revalidate: 60 } 
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

export default async function About() {
  const aboutJoyStick = await fetchAboutJoyStick();

  return (
    <section className="lg:max-w-screen-2xl w-full container mx-auto py-6 flex flex-col justify-center items-center p-4">
      <div className="flex lg:flex-row flex-col gap-6 w-full my-8">
        <div className="lg:w-1/3 w-full">
          {aboutJoyStick.image && (
            <Image
              className="w-full h-auto rounded-xl "
              alt="About Image"
              width={600}
              height={600}
              src={aboutJoyStick.image}
            />
          )}
        </div>
        <div className="lg:w-2/3 w-full space-y-8 flex flex-col justify-center p-4">
          <h1 className="font-bold md:text-3xl text-2xl">
            {aboutJoyStick.title || "Default Title"}
          </h1>
          <p className="text-[#3D3D3D] md:text-lg text-md font-normal max-w-3xl">
            {aboutJoyStick.body || "Default description goes here."}
          </p>
        </div>
      </div>
      <Features />
      <BackgroundVideo />
    </section>
  );
}
