"use client";
import React, { useState } from "react";
import { createCommentAction } from "./actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Room } from "@/db/schema";

const Comments = ({ id: roomId }: Pick<Room, "id">) => {
  const [comment, setComment] = useState<string>("");
  const submitComment = () => {
    createCommentAction(comment, roomId);
    setComment("");
  };
  return (
    <>
      <Textarea
        className="border-transparent focus:border-transparent focus:ring-0 w-full resize-none overflow-y-scroll "
        placeholder="Add a comment....."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        onClick={() => submitComment()}
        variant="link"
        className={`text-blue-400 hover:text-gray-400 hover:no-underline ${comment ? "visible" : "invisible"}`}
      >
        Post
      </Button>
    </>
  );
};

export default Comments;
