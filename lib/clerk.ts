import { clerkClient } from "@clerk/nextjs/server";

/**
 * Marks a user as paid by setting publicMetadata.isPaid to true.
 * This persists across all server contexts and survives dev-mode restarts.
 */
export async function markUserAsPaid(userId: string): Promise<void> {
  const client = await clerkClient();
  await client.users.updateUser(userId, {
    publicMetadata: { isPaid: true },
  });
}

/**
 * Checks if a user has paid by reading publicMetadata.isPaid.
 */
export async function isUserPaid(userId: string): Promise<boolean> {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user.publicMetadata?.isPaid === true;
}
