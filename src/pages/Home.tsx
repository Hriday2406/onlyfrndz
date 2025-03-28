import NewMessage from "@/components/NewMessage";
import { BackgroundBeams } from "@/components/ui/background-beams";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Delete } from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden pt-36 md:pt-24">
      <BackgroundBeams className="fixed top-0 left-0 h-screen" />

      <NewMessage />

      <TracingBeam className="mb-20">
        <div className="relative mx-auto my-10 w-2/3 antialiased md:w-[750px]">
          {dummyContent.map((item, index) => (
            <Card
              className="relative mt-20 rounded-[20px] border bg-white/0 p-5 font-bold md:w-[750px] md:backdrop-blur-xs dark:font-medium"
              key={index}
            >
              <GlowingEffect
                blur={1}
                borderWidth={3}
                spread={100}
                glow={true}
                disabled={false}
                proximity={100}
                inactiveZone={0.1}
              />
              <CardHeader className="px-0">
                <CardTitle className="font-writing text-2xl tracking-wider uppercase dark:font-medium">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="font-writing flex flex-col gap-3 px-0 text-xl tracking-widest">
                {item.description}
              </CardContent>
              <CardFooter className="flex justify-between px-0">
                <div className="flex gap-2 font-mono text-gray-500">
                  <span className="uppercase">Anonymous</span>
                  <span>@</span>
                  <span>09:20 - 22/03/2025</span>
                </div>
                <Delete className="ease size-6 cursor-pointer text-red-500 transition-all duration-300 hover:scale-125" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </TracingBeam>
    </div>
  );
};

const dummyContent = [
  {
    title: "This is the title of the message that you wrote.",
    description:
      "Hey guys, just wanted to share my latest music video with you all! I've been working on it for weeks and I'm so proud of how it turned out. Check it out and let me know what you think!",
  },
  {
    title: "This is the title of the message that you wrote.",
    description:
      "Hey guys, just wanted to share my latest music video with you all! I've been working on it for weeks and I'm so proud of how it turned out. Check it out and let me know what you think!",
  },
  {
    title: "This is the title of the message that you wrote.",
    description:
      "Hey guys, just wanted to share my latest music video with you all! I've been working on it for weeks and I'm so proud of how it turned out. Check it out and let me know what you think!",
  },
  {
    title: "This is the title of the message that you wrote.",
    description:
      "Hey guys, just wanted to share my latest music video with you all! I've been working on it for weeks and I'm so proud of how it turned out. Check it out and let me know what you think!",
  },
  {
    title: "This is the title of the message that you wrote.",
    description:
      "Hey guys, just wanted to share my latest music video with you all! I've been working on it for weeks and I'm so proud of how it turned out. Check it out and let me know what you think!",
  },
];

export default Home;
