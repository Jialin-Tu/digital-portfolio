import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { PostItem } from "../store/postsSlice";
import { setPosts } from "../store/postsSlice";
import { loadPosts, savePosts } from "../lib/postStorage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";

const MAX_IMAGE_SIZE = 500 * 1024;

/**
 * Local post feed demonstration.
 * Posts belong to this browser and are not published or shared.
 */
export function PostFeed() {
  const posts = useSelector((state: RootState) => state.posts.items);
  const dispatch = useDispatch();

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [readingImage, setReadingImage] = useState(false);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const [hasError, setHasError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileReadId = useRef(0);

  useEffect(() => {
    try {
      dispatch(setPosts(loadPosts()));
      setReady(true);
    } catch {
      setHasError(true);
      setNotice(
        "Saved posts could not be read. No saved data has been changed. " +
          "Check that browser storage is available before reloading."
      );
    }
  }, [dispatch]);

  /**
   * Save first so failed writes do not appear as successful changes.
   */
  const commitPosts = (updated: PostItem[], message: string): boolean => {
    if (!ready) return false;

    try {
      savePosts(updated);
      dispatch(setPosts(updated));
      setHasError(false);
      setNotice(message);
      return true;
    } catch {
      setHasError(true);
      setNotice(
        "The change could not be saved. Browser storage may be full or " +
          "blocked. Try a smaller image or check your browser settings."
      );
      return false;
    }
  };

  const removeImage = () => {
    fileReadId.current += 1;
    setReadingImage(false);
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /** Read small image files without uploading them to a server. */
  const selectImage = (file?: File) => {
    removeImage();
    if (!file) return;

    if (
      !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
        file.type
      ) ||
      file.size > MAX_IMAGE_SIZE
    ) {
      setHasError(true);
      setNotice("Choose a JPG, PNG, WebP or GIF image up to 500 KB.");
      return;
    }

    const readId = fileReadId.current;
    const reader = new FileReader();
    setReadingImage(true);
    setNotice("");

    reader.onload = () => {
      if (fileReadId.current !== readId) return;

      setReadingImage(false);

      if (typeof reader.result === "string") {
        setImage(reader.result);
        setHasError(false);
      }
    };

    reader.onerror = () => {
      if (fileReadId.current !== readId) return;

      setReadingImage(false);
      setHasError(true);
      setNotice("This image could not be read. Please try another file.");
    };

    reader.readAsDataURL(file);
  };

  const submitPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content.trim() || !ready || readingImage) return;

    const post: PostItem = {
      id: crypto.randomUUID(),
      author: author.trim() || "You",
      content: content.trim(),
      createdAt: new Date().toISOString(),
      image,
      comments: [],
      likedBy: [],
      _local: true,
    };

    if (commitPosts([post, ...posts], "Post saved in this browser.")) {
      setContent("");
      removeImage();
    }
  };

  const toggleLike = (postId: string) => {
    const updated = posts.map((post) => {
      if (post.id !== postId) return post;

      const likes = post.likedBy ?? [];

      return {
        ...post,
        likedBy: likes.includes("You")
          ? likes.filter((name) => name !== "You")
          : [...likes, "You"],
      };
    });

    commitPosts(updated, "Like updated in this browser.");
  };

  const addComment = (
    postId: string,
    name: string,
    text: string
  ): boolean => {
    if (!text.trim()) return false;

    const updated = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...(post.comments ?? []),
              {
                id: crypto.randomUUID(),
                author: name.trim() || "You",
                content: text.trim(),
                createdAt: new Date().toISOString(),
              },
            ],
          }
        : post
    );

    return commitPosts(updated, "Comment saved in this browser.");
  };

  const deletePost = (postId: string) => {
    if (!window.confirm("Delete this post and its comments from this browser?")) {
      return;
    }

    commitPosts(
      posts.filter((post) => post.id !== postId),
      "Post deleted from this browser."
    );
  };

  return (
    <section className="py-20 px-4 container mx-auto max-w-3xl">
      <h1 className="text-4xl mb-4">Post Feed</h1>

      <p className="text-muted-foreground mb-6">
        A local interaction demo. Posts, images, comments and likes are
        saved only in this browser. They are not sent to me or visible
        to other visitors. Clearing browser data removes them.
      </p>

      <Card className="mb-6">
        <CardContent className="p-6">
          <form onSubmit={submitPost} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="post-author">Display name (optional)</Label>
              <Input
                id="post-author"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                maxLength={80}
                placeholder="Your name"
                disabled={!ready}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="post-content">Your post</Label>
              <Textarea
                id="post-content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows={4}
                maxLength={3000}
                placeholder="Write a local demo post..."
                disabled={!ready}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="post-image">Image (optional, up to 500 KB)</Label>
              <input
                ref={fileInputRef}
                id="post-image"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(event) => selectImage(event.target.files?.[0])}
                disabled={!ready}
                style={{ display: "block", maxWidth: "100%" }}
              />
            </div>

            {readingImage && <p role="status">Reading image...</p>}

            {image && (
              <div className="space-y-2">
                <img
                  src={image}
                  alt="Selected image preview"
                  style={{ maxWidth: "100%", maxHeight: "160px" }}
                />
                <Button type="button" variant="outline" onClick={removeImage}>
                  Remove image
                </Button>
              </div>
            )}

            <Button
              type="submit"
              disabled={!ready || !content.trim() || readingImage}
            >
              Save local post
            </Button>
          </form>
        </CardContent>
      </Card>

      {notice && (
        <p
          role={hasError ? "alert" : "status"}
          className="text-sm mb-6"
        >
          {notice}
        </p>
      )}

      {ready && posts.length === 0 && (
        <p className="text-muted-foreground">
          No local posts yet. Add one above to try the demo.
        </p>
      )}

      <div className="space-y-6">
        {ready && posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-wrap justify-between gap-2">
                <strong>{post.author}</strong>
                <time
                  dateTime={post.createdAt}
                  className="text-sm text-muted-foreground"
                >
                  {new Date(post.createdAt).toLocaleString()}
                </time>
              </div>

              <p style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
                {post.content}
              </p>

              {post.image && (
                <img
                  src={post.image}
                  alt={`Image attached to ${post.author}'s post`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    maxHeight: "320px",
                    objectFit: "contain",
                  }}
                />
              )}

              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="outline"
                  aria-pressed={(post.likedBy ?? []).includes("You")}
                  onClick={() => toggleLike(post.id)}
                >
                  {(post.likedBy ?? []).includes("You") ? "Unlike" : "Like"}
                  {" "}({(post.likedBy ?? []).length})
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => deletePost(post.id)}
                >
                  Delete local post
                </Button>
              </div>

              <h2 className="text-lg">
                Comments ({(post.comments ?? []).length})
              </h2>

              {(post.comments ?? []).map((comment) => (
                <div key={comment.id} className="p-3 bg-muted rounded">
                  <p className="text-sm font-medium">{comment.author}</p>
                  <p
                    className="text-sm"
                    style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
                  >
                    {comment.content}
                  </p>
                </div>
              ))}

              <CommentForm
                postId={post.id}
                onAdd={(name, text) => addComment(post.id, name, text)}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

/** Keep a comment draft until it has been saved successfully. */
function CommentForm({
  postId,
  onAdd,
}: {
  postId: string;
  onAdd: (author: string, content: string) => boolean;
}) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onAdd(author, content)) {
      setContent("");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor={`comment-name-${postId}`}>Name (optional)</Label>
        <Input
          id={`comment-name-${postId}`}
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          maxLength={80}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`comment-text-${postId}`}>Comment</Label>
        <Input
          id={`comment-text-${postId}`}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          maxLength={1000}
          required
        />
      </div>

      <Button type="submit" variant="outline" disabled={!content.trim()}>
        Save comment
      </Button>
    </form>
  );
}