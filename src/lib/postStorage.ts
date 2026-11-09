import type { PostItem, CommentItem } from "../store/postsSlice";

const STORAGE_KEY = "postfeed.posts";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isComment(value: unknown): value is CommentItem {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.author === "string" &&
    typeof value.content === "string" &&
    typeof value.createdAt === "string" &&
    Number.isFinite(Date.parse(value.createdAt))
  );
}

function isPost(value: unknown): value is PostItem {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.author === "string" &&
    typeof value.content === "string" &&
    typeof value.createdAt === "string" &&
    Number.isFinite(Date.parse(value.createdAt)) &&
    (value.image === undefined ||
      value.image === null ||
      typeof value.image === "string") &&
    (value.comments === undefined ||
      (Array.isArray(value.comments) && value.comments.every(isComment))) &&
    (value.likedBy === undefined ||
      (Array.isArray(value.likedBy) &&
        value.likedBy.every((name) => typeof name === "string")))
  );
}

/**
 * Read existing posts without overwriting invalid saved data.
 * Let the page explain storage errors to the visitor.
 */
export function loadPosts(): PostItem[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === null) return [];

  const parsed: unknown = JSON.parse(raw);

  if (!Array.isArray(parsed) || !parsed.every(isPost)) {
    throw new Error("Invalid saved posts.");
  }

  return parsed;
}

/**
 * Save before updating Redux.
 * If storage is full or blocked, the page keeps its current data.
 */
export function savePosts(posts: PostItem[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}