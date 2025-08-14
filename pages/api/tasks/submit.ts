import type { NextApiRequest, NextApiResponse } from "next";
import { Task } from "../../../types/task";

const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg"];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const { task, screenshots } = req.body as {
    task: Task;
    screenshots: { mime: string }[];
  };

  const requirements = task?.screenshotRequirements;
  if (!requirements) {
    return res.status(400).json({ error: "Missing screenshot requirements" });
  }

  const { count } = requirements;
  if (typeof count !== "number" || count < 0 || count > 2) {
    return res.status(400).json({ error: "Invalid screenshot count" });
  }

  if (!Array.isArray(screenshots) || screenshots.length !== count) {
    return res.status(400).json({ error: "Incorrect number of screenshots" });
  }

  for (const file of screenshots) {
    if (!ALLOWED_MIME_TYPES.includes(file.mime)) {
      return res.status(400).json({ error: "Unsupported screenshot type" });
    }
  }

  return res.status(200).json({ success: true });
}
