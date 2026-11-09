import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Mail, MapPin, Send, Linkedin, Github } from "lucide-react";

const CONTACT_EMAIL = "13430732168@163.com";

const EMPTY_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Jialin-Tu",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jialin-tu-9a1218400/",
  },
];

/**
 * Contact form and public contact details.
 * FormSubmit handles delivery because GitHub Pages has no mail server.
 */
export function Contact() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /**
   * Submit the message and only clear it after the service accepts it.
   * Acceptance does not confirm delivery to the recipient's inbox.
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSending) return;

    const fields = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    if (Object.values(fields).some((value) => value === "")) {
      setHasError(true);
      setStatus("Please complete all fields.");
      return;
    }

    setIsSending(true);
    setHasError(false);
    setStatus("");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...fields,
            _subject: `Portfolio enquiry: ${fields.subject}`,
            _replyto: fields.email,
            _template: "table",
          }),
          signal: controller.signal,
        }
      );

      const result = await response.json();

      if (
        !response.ok ||
        (result.success !== true && result.success !== "true")
      ) {
        throw new Error("The service did not accept the submission.");
      }

      setFormData(EMPTY_FORM);
      setStatus(
        "Your message was submitted. Thank you for getting in touch."
      );
    } catch {
      setHasError(true);
      setStatus(
        "The submission could not be confirmed. Your text has been kept. " +
          "You can try again or contact me by email."
      );
    } finally {
      window.clearTimeout(timeout);
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-background min-h-screen"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Contact</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            If you would like to discuss software development, projects
            or collaboration, feel free to get in touch.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
              </CardHeader>

              <CardContent>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  aria-busy={isSending}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Name</Label>
                      <Input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        maxLength={100}
                        disabled={isSending}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email address"
                        maxLength={254}
                        disabled={isSending}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">Subject</Label>
                    <Input
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Message subject"
                      maxLength={150}
                      disabled={isSending}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message..."
                      rows={6}
                      maxLength={5000}
                      disabled={isSending}
                      required
                    />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    This form uses FormSubmit to process your message.
                    Please do not include sensitive information.
                  </p>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSending}
                  >
                    <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                    {isSending ? "Sending..." : "Send Message"}
                  </Button>

                  {status && (
                    <p
                      role={hasError ? "alert" : "status"}
                      className="text-sm"
                    >
                      {status}
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Location
                    </p>
                    <p>Limerick, Ireland</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail
                    className="w-5 h-5 shrink-0"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">
                      Email
                    </p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-sm underline break-all"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Find Me Online</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;

                    return (
                      <Button
                        key={social.label}
                        variant="outline"
                        size="icon"
                        asChild
                      >
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                        >
                          <Icon
                            className="w-4 h-4"
                            aria-hidden="true"
                          />
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="mb-2">About Me</h2>
                <p className="text-sm text-muted-foreground">
                  I am studying for a Master's degree in Software
                  Engineering at the University of Limerick. I am
                  interested in software development, web applications
                  and backend technologies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}