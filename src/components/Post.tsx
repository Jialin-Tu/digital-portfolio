import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Save, Eye } from "lucide-react";

export function Post() {
  const [formData, setFormData] = useState({
    title: "",
    author: "Jialin Tu",
    content: "",
    image: null as File | null,
  });

  const [preview, setPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Post submitted:", formData);

    alert("Post submitted successfully.");
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handlePreview = () => {
    setPreview(true);
  };

  return (
    <section
      id="post"
      className="py-20 px-4 bg-background min-h-screen"
    >
      <div className="container mx-auto max-w-2xl">

        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">
            Create a New Post
          </h1>

          <p className="text-muted-foreground">
            Share your experience, projects and learning in software
            engineering.
          </p>
        </div>

        {preview ? (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>
                {formData.title || "Post Preview"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Author: {formData.author}
              </div>

              {formData.image && (
                <div className="text-sm text-muted-foreground">
                  Image: {formData.image.name}
                </div>
              )}

              <div className="whitespace-pre-wrap leading-relaxed">
                {formData.content || "No content yet."}
              </div>

              <Button
                variant="outline"
                onClick={() => setPreview(false)}
              >
                Back to Edit
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

                  {/* Post Title */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="title"
                      className="text-base"
                    >
                      Post Title
                    </Label>

                    <Input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="w-full"
                      placeholder="Enter post title"
                      required
                    />
                  </div>

                  {/* Author */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="author"
                      className="text-base"
                    >
                      Author
                    </Label>

                    <Input
                      id="author"
                      type="text"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          author: e.target.value,
                        }))
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="content"
                      className="text-base"
                    >
                      Content
                    </Label>

                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      className="w-full min-h-[200px] resize-y"
                      placeholder="Write your post content here..."
                      required
                    />
                  </div>

                  {/* Upload Image */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="image"
                      className="text-base"
                    >
                      Upload Image
                    </Label>

                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />

                    {formData.image && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Selected: {formData.image.name}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6">
                    <Button
                      type="submit"
                      className="flex-1"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Publish Post
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={handlePreview}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Post Settings */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">
                  Post Settings
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                <div className="grid grid-cols-2 gap-4">

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category
                    </Label>

                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="software-engineering">
                          Software Engineering
                        </SelectItem>

                        <SelectItem value="web-development">
                          Web Development
                        </SelectItem>

                        <SelectItem value="backend">
                          Backend Development
                        </SelectItem>

                        <SelectItem value="academic">
                          Academic
                        </SelectItem>

                        <SelectItem value="personal">
                          Personal
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <Label htmlFor="status">
                      Status
                    </Label>

                    <Select defaultValue="draft">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="draft">
                          Draft
                        </SelectItem>

                        <SelectItem value="published">
                          Published
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags">
                    Tags
                  </Label>

                  <Input
                    id="tags"
                    placeholder="software engineering, web development, programming"
                    className="w-full"
                  />
                </div>

              </CardContent>
            </Card>
          </>
        )}
      </div>
    </section>
  );
}
