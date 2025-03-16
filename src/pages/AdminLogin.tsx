import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="flex h-screen items-center justify-center">
      <BackgroundBeams />
      <BackgroundGradient>
        <Card className="bg-background relative w-[300px] rounded-[20px] sm:w-[400px]">
          <CardHeader>
            <CardTitle className="font-display text-center text-4xl font-bold">
              Admin Log In
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="mt-3 cursor-pointer">Log In</Button>
          </CardContent>
        </Card>
      </BackgroundGradient>
    </section>
  );
};

export default AdminLogin;
