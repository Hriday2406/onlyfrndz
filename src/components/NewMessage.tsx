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
        "https://onlyfrndz-backend.onrender.com/api/message/",
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
    <BackgroundGradient containerClassName="w-full sm:w-2/3 md:w-fit">
      <Card className="relative rounded-[20px] p-5 md:w-[750px]">
        <CardContent className="flex flex-col gap-5 px-0">
          <div className="flex flex-col-reverse items-center gap-5 md:grid md:grid-cols-[1fr_140px]">
            <Input
              type="text"
              placeholder="Title of the post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <CardTitle className="text-center font-mono text-xl font-bold select-none">
              CREATE POST
            </CardTitle>
          </div>
          <div className="grid items-center gap-5 md:grid-cols-[1fr_140px]">
            <Textarea
              placeholder="Type your message here."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              className="h-12 cursor-pointer font-mono text-xl font-bold md:h-full"
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
