import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  createUserResponse,
  updateUserResponse,
  getUserResponseBySessionId,
  getAllUserResponses,
} from "./supabase";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Questionnaire responses router
  responses: router({
    create: publicProcedure
      .input(
        z.object({
          session_id: z.string(),
          city: z.string().optional(),
          website: z.string().optional(),
          offer: z.string().optional(),
          avg_price: z.string().optional(),
          has_price_table: z.boolean().optional(),
          volume: z.string().optional(),
          objections: z.string().optional(),
          flow: z.string().optional(),
          hours: z.string().optional(),
          payment_methods: z.array(z.string()).optional(),
          system: z.string().optional(),
          key_message: z.string().optional(),
          ai_capabilities: z.array(z.string()).optional(),
          ai_restrictions: z.string().optional(),
          tone: z.string().optional(),
          main_function: z.string().optional(),
          manual_tasks: z.string().optional(),
          funnel_columns: z.any().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await createUserResponse(input);
      }),
    update: publicProcedure
      .input(
        z.object({
          id: z.string(),
          data: z.object({
            city: z.string().optional(),
            website: z.string().optional(),
            offer: z.string().optional(),
            avg_price: z.string().optional(),
            has_price_table: z.boolean().optional(),
            volume: z.string().optional(),
            objections: z.string().optional(),
            flow: z.string().optional(),
            hours: z.string().optional(),
            payment_methods: z.array(z.string()).optional(),
            system: z.string().optional(),
            key_message: z.string().optional(),
            ai_capabilities: z.array(z.string()).optional(),
            ai_restrictions: z.string().optional(),
            tone: z.string().optional(),
            main_function: z.string().optional(),
            manual_tasks: z.string().optional(),
            funnel_columns: z.any().optional(),
          }),
        })
      )
      .mutation(async ({ input }) => {
        return await updateUserResponse(input.id, input.data);
      }),
    getBySessionId: publicProcedure
      .input(z.object({ session_id: z.string() }))
      .query(async ({ input }) => {
        return await getUserResponseBySessionId(input.session_id);
      }),
    getAll: publicProcedure.query(async () => {
      return await getAllUserResponses();
    }),
  }),
});

export type AppRouter = typeof appRouter;
