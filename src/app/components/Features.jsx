import Image from 'next/image';

async function getAdvantages() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}allAdvantages`, { 
      next: { revalidate: 60 },
      headers: { 'lang': 'ar' }
    }); 

    if (!response.ok) {
      throw new Error(`Failed to fetch Advantages. Status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data?.data?.data) ? data.data.data : [];
  } catch (error) {
    console.error("❌ Error fetching data:", error.message);
    return [];
  }
}

async function getAdvantageText() { 
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}about-us/section-two`, { 
      next: { revalidate: 60 }, // ✅ Instead of cache: 'no-store'
      headers: { 'lang': 'ar' } 
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



export default async function Features() {
  const advantages = await getAdvantages();
  const advantageText = await getAdvantageText(); 

  return (
    <div>
      <div className='flex flex-col justify-center items-center text-center my-6'>
        <h1 className='font-bold text-2xl py-4'>
          {advantageText?.title || "Default Title"}
        </h1>
        <p className='text-lg max-w-lg leading-7 text-[#6D7280]'>
          {advantageText?.body || "Default description goes here."}
        </p>
      </div>

      <div className='flex py-6  justify-center flex-wrap gap-6 my-6'>
        {advantages.length > 0 ? (
          advantages.map((advantage) => (
            <div key={advantage.id} className='flex flex-col justify-center text-center items-center space-y-4 '>
              <Image 
                alt='Advantage Logo' 
                src={advantage.img} 
                width={50} 
                height={50} 
                priority={true} 
              />
              <h3 className='font-semibold'>{advantage.title}</h3>
              <p className='text-[#6D7280] text-md max-w-xs'>{advantage.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No advantages available.</p>
        )}
      </div>
    </div>
  );
}
