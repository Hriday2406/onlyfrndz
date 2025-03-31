import { Delete } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { GlowingEffect } from "./ui/glowing-effect";
import { Skeleton } from "./ui/skeleton";

export interface MessageType {
  id: number;
  user_id: number;
  title: string;
  message: string;
  created_at: string;
  username: string;
  can_delete: boolean;
}

const CustomCard: React.FC<{
  item: MessageType;
  handleDelete: () => void;
}> = (props) => {
  return (
    <Card className="relative mt-20 rounded-[20px] border bg-white/0 p-5 font-bold md:w-[750px] md:backdrop-blur-xs dark:font-medium">
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
          {props.item.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="font-writing flex flex-col gap-3 px-0 text-xl tracking-widest">
        {props.item.message}
      </CardContent>
      <CardFooter className="flex justify-between px-0">
        <div className="flex gap-2 font-mono text-gray-500">
          <span className="uppercase">{props.item.username}</span>
          <span>@</span>
          <span>{props.item.created_at}</span>
        </div>
        {props.item.can_delete && (
          <Delete
            className="ease size-6 cursor-pointer text-red-500 transition-all duration-300 hover:scale-125"
            onClick={props.handleDelete}
          />
        )}
      </CardFooter>
    </Card>
  );
};

const WarningCard: React.FC = () => {
  return (
    <Card className="relative mt-20 rounded-[20px] border bg-white/0 p-5 font-bold md:w-[750px] md:backdrop-blur-xs dark:font-medium">
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
          Please wait for 60 secs while the server starts
        </CardTitle>
      </CardHeader>
      <CardContent className="font-writing flex flex-col gap-3 px-0 text-xl tracking-widest">
        The backend of this website is deployed on 'render' and it shuts down
        after inactivity, please wait for 60 secs while the server starts back
        up.
      </CardContent>
      <CardFooter className="flex justify-between px-0">
        <div className="flex gap-2 font-mono text-gray-500">
          <span className="uppercase">OnlyFrndz</span>
          <span>@</span>
          <span> --:-- - --/--/---- </span>
        </div>
      </CardFooter>
    </Card>
  );
};

const DummyCard: React.FC = () => {
  return (
    <Card className="relative mt-20 rounded-[20px] border bg-white/0 p-5 font-bold md:w-[750px] md:backdrop-blur-xs dark:font-medium">
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
        <Skeleton className="h-10 w-full" />
      </CardHeader>
      <CardContent className="px-0">
        <Skeleton className="h-24 w-full" />
      </CardContent>
      <CardFooter className="px-0">
        <Skeleton className="h-8 w-56" />
      </CardFooter>
    </Card>
  );
};
export { CustomCard, DummyCard, WarningCard };
