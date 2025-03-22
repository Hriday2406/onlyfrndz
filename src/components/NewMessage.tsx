import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";

const NewMessage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  return (
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
  );
};

export default NewMessage;
