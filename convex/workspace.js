import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { query } from "./_generated/server";

export const CreateWorkspace = mutation({
  args: {
    messages: v.any(),
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspaces", {
      messages: args.messages,
      user: args.user,
      fileData: null, // Ensure fileData exists in schema
    });
    return workspaceId;
  },
});

export const GetWorkspace = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.workspaceId);
  },
});

export const UpdateMessages = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    messages: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.workspaceId, {
      messages: args.messages,
    });
  },
});


export const updateFiles = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    file: v.any(), // Ensure this matches the schema field
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.workspaceId, {
      fileData: args.file, // This should match Convex schema
    });
  },
});


export const GetAllWorkspaces = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("user"), args.userId))
      .collect();
    return result;
  },
});