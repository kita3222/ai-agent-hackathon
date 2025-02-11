"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Presentational from "./presentational";

export default function ProjectCreationContainer() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/app/projects/suggest?goal=${encodeURIComponent(
        title
      )}&deadline=${encodeURIComponent(
        targetDate
      )}&description=${encodeURIComponent(description)}`
    );
  };

  const handleCancel = () => {
    router.push("/app/projects");
  };

  return (
    <Presentational
      title={title}
      description={description}
      targetDate={targetDate}
      onTitleChange={setTitle}
      onDescriptionChange={setDescription}
      onTargetDateChange={setTargetDate}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
