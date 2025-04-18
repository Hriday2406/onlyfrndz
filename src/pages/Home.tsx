import {
  CustomCard,
  DummyCard,
  MessageType,
  WarningCard,
} from "@/components/customCards";
import NewMessage from "@/components/NewMessage";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMessages() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://onlyfrndz-backend.onrender.com/api/message/all",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("Authorization")}`,
            },
          },
        );
        if (response.data.status === 200) {
          setMessages(response.data.messages);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    fetchMessages();
  }, [flag]);

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden px-5 pt-36 md:pt-24">
      <BackgroundBeams className="fixed top-0 left-0 -z-10 h-screen" />

      {localStorage.getItem("Authorization") ? (
        <NewMessage setFlag={setFlag} />
      ) : (
        <BackgroundGradient containerClassName="w-full sm:w-fit">
          <Card className="relative rounded-[20px] p-5 md:w-[750px]">
            <CardContent className="flex flex-col gap-5 px-2">
              <CardTitle className="text-center font-mono sm:text-base">
                Login to write a message or Sign up if you dont have an account.
              </CardTitle>
              <Button
                className="cursor-pointer p-5 font-mono font-bold sm:text-base"
                onClick={() => navigate("/login")}
              >
                Login / Signup
              </Button>
            </CardContent>
          </Card>
        </BackgroundGradient>
      )}

      <div className="relative mx-auto my-10 w-full antialiased md:w-[750px]">
        {messages.map((message: MessageType, index) => (
          <CustomCard
            key={index}
            item={message}
            handleDelete={async () => {
              try {
                const response = await axios.delete(
                  `https://onlyfrndz-backend.onrender.com/api/message/${message.id}`,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `${localStorage.getItem("Authorization")}`,
                    },
                  },
                );
                if (response.data.status === 200) {
                  setFlag(!flag);
                }
              } catch (error) {
                console.error(`Error deleting message with id ${message.id}:`);
              }
            }}
          />
        ))}
        {loading && (
          <>
            <WarningCard />
            <DummyCard />
            <DummyCard />
            <DummyCard />
            <DummyCard />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
