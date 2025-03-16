import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="flex h-screen items-center justify-center">
      <Card className="bg-background mx-5 mt-5 w-[400px]">
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
    </section>
  );
};

export default AdminLogin;
