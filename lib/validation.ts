import { z } from "zod"

export const QuestionsSchema = z.object({
title:z.string().min(5,{message:"please insert properly"}).max(130),
explanation :z.string().min(100),
tags:z.array(z.string().min(1).max(15)).min(1).max(3)
    })