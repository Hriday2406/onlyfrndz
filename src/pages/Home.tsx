import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Home: React.FC = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div className="flex h-screen flex-col items-center pt-36 md:pt-24">
      <BackgroundBeams />
      {/* <Vortex
        backgroundColor="#010101"
        particleCount={50}
        rangeY={800}
        baseHue={170}
        rangeSpeed={0.5}
        rangeRadius={1}
        className="flex h-full w-full flex-col items-center"
      > */}
      <BackgroundGradient>
        <Card className="relative rounded-[20px] p-5 md:w-[750px]">
          <CardContent className="flex flex-col gap-4 px-0 md:flex-row">
            <div className="flex w-full flex-col gap-5">
              <Input
                type="text"
                placeholder="Title of the post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Type your message here."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <CardTitle className="text-center font-mono text-xl font-bold">
                CREATE POST
              </CardTitle>
              <Button className="cursor-pointer font-mono text-base font-bold md:h-16">
                CREATE
              </Button>
            </div>
          </CardContent>
        </Card>
      </BackgroundGradient>
      {/* </Vortex> */}
    </div>
  );
};

export default Home;
