import Image from "next/image";
import { joystick, JoyStickBg } from "../../../../public";
import Features from "../Features";



const WhyChooseJoyStick = async () => {

  return (
    <section className="lg:max-w-screen-2xl w-full container mx-auto py-6 flex flex-col justify-center items-center p-4">
      <div className="relative w-full">
        <Image
          alt="Joy stick background"
          width={700}
          height={700}
          className="object-cover w-full h-auto"
          src={JoyStickBg}
        />
      </div>
      <div>
        <Features />
      </div>
    </section>
  );
};

export default WhyChooseJoyStick;
