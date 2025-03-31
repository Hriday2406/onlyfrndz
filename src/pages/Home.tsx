import { CustomCard, DummyCard, WarningCard } from "@/components/customCards";
import NewMessage from "@/components/NewMessage";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { TracingBeam } from "@/components/ui/tracing-beam";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMessages() {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/message/all",
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
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden px-5 pt-36 md:pt-24">
      <BackgroundBeams className="fixed top-0 left-0 -z-10 h-screen" />

      {localStorage.getItem("Authorization") ? (
        <NewMessage />
      ) : (
        <BackgroundGradient>
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

      <TracingBeam className="mb-20">
        <div className="relative mx-auto my-10 w-2/3 antialiased md:w-[750px]">
          {messages.map((message, index) => (
            <CustomCard key={index} item={message} />
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
      </TracingBeam>
    </div>
  );
};

export default Home;
