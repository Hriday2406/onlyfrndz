import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";

const NewMessage: React.FC<{
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  async function handleCreate() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/message/",
        {
          title,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        },
      );
      if (response.data.status === 200) {
        setTitle("");
        setMessage("");
        props.setFlag((prev) => !prev);
      }
    } catch (error) {
      console.error("Error creating message:", error);
    }
  }

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
            <Button
              className="cursor-pointer font-mono text-base font-bold md:h-16"
              onClick={handleCreate}
            >
              CREATE
            </Button>
          </div>
        </CardContent>
      </Card>
    </BackgroundGradient>
  );
};

export default NewMessage;
