import type { PostItem } from "../store/postsSlice";
import { isPost } from "./postStorage";

/** Download the current posts in a versioned backup file. */
export function exportPostBackup(posts: PostItem[]): void {
  const exportedAt = new Date().toISOString();

  const backup = {
    app: "jialin-portfolio-posts",
    version: 1,
    exportedAt,
    posts,
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `jialin-posts-${exportedAt.slice(0, 10)}.json`;

  try {
    document.body.appendChild(link);
    link.click();
  } finally {
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

export interface PostBackup {
  app: "jialin-portfolio-posts";
  version: 1;
  exportedAt: string;
  posts: PostItem[];
}

/** Read a backup and reject unsupported formats before changing saved posts. */
export async function readPostBackup(file: File): Promise<PostBackup> {
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Choose a backup file smaller than 5 MB.");
  }

  let data: unknown;

  try {
    data = JSON.parse(await file.text());
  } catch {
    throw new Error("This file could not be read as JSON.");
  }

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    throw new Error("This file does not contain a portfolio backup.");
  }

  const backup = data as Record<string, unknown>;

  if (backup.app !== "jialin-portfolio-posts") {
    throw new Error("Choose a backup exported from this portfolio.");
  }

  if (backup.version !== 1) {
    throw new Error("This backup version is not supported.");
  }

  if (typeof backup.exportedAt !== "string" || !Number.isFinite(Date.parse(backup.exportedAt))) {
    throw new Error("The backup has an invalid export date.");
  }

  if (!Array.isArray(backup.posts) || !backup.posts.every(isPost)) {
    throw new Error("The backup contains invalid post data.");
  }

  const ids = backup.posts.map((post) => post.id);

  if (ids.some((id) => id.trim() === "") || new Set(ids).size !== ids.length) {
    throw new Error("The backup contains missing or duplicate post IDs.");
  }

  return {
    app: "jialin-portfolio-posts",
    version: 1,
    exportedAt: backup.exportedAt,
    posts: backup.posts,
  };
}

/** Keep existing posts and skip backup entries that have the same ID. */
export function mergeBackupPosts(currentPosts: PostItem[], importedPosts: PostItem[]): PostItem[] {
  const existingIds = new Set(currentPosts.map((post) => post.id));
  const addedPosts = importedPosts.filter((post) => !existingIds.has(post.id));
  return [...currentPosts, ...addedPosts].sort((first, second) => Date.parse(second.createdAt) - Date.parse(first.createdAt));
}