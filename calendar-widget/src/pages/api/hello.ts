// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import data from "./program.json";
import missedData from "./program_with_missed.json";
import staggeredData from "./program_with_missed_stagger.json";
import { ProgramSchedule } from "@/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProgramSchedule>
) {
  switch (req.query.type) {
    case "missed":
      res.status(200).json(missedData as ProgramSchedule);
      break;
    case "staggered":
      res.status(200).json(staggeredData as ProgramSchedule);
      break;
    default:
      res.status(200).json(data as ProgramSchedule);
      break;
  }
  if (req.query.type === "normal")
    res.status(200).json(data as ProgramSchedule);
  else res.status(200).json(missedData as ProgramSchedule);
}
