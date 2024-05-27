import { CreateRoomForm } from "./create-room-form";

export default function CreateRoomPage() {
  return (
    <div className="container flex flex-col gap-8 pt-12 pb-24 px-36 ">
      <h1 className="text-4xl font-bold">Create Room</h1>
      <p className="text-gray-400">
        A room contains all project repo information that is linked to git, as
        well as those involved in contributing to this project. Users will be
        able to follow this rooma and request access in order to be involved
        with any active developments within the room.
      </p>

      <CreateRoomForm />
    </div>
  );
}
