import { useEffect, useState } from "react";
import { ExternalLink, Github, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { trackGithubClick } from "../lib/analytics";

interface GithubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

const USERNAME = "Jialin-Tu";
const PROFILE_URL = `https://github.com/${USERNAME}`;

/** Load public GitHub data and let visitors retry a failed request. */
export function GitHubIntegration() {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    let timedOut = false;
    const controller = new AbortController();

    const timeout = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 15000);

    /** Fetch both resources together and handle HTTP errors before reading data. */
    async function loadGithubData() {
      setLoading(true);
      setError(null);

      try {
        const options = { signal: controller.signal };
        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`, options),
          fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`, options),
        ]);

        if (profileResponse.status === 403 || profileResponse.status === 429 || reposResponse.status === 403 || reposResponse.status === 429) {
          throw new Error("GitHub has limited or refused this request. Please try again later or open my profile directly.");
        }

        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error("GitHub data could not be loaded. Please try again.");
        }

        const profileData: GithubProfile = await profileResponse.json();
        const repoData: GithubRepo[] = await reposResponse.json();

        if (!active) return;

        setProfile(profileData);
        setRepos(repoData);
      } catch (requestError) {
        if (!active) return;

        if (timedOut) {
          setError("The GitHub request took too long. Please check your connection and try again.");
        } else {
          setError(requestError instanceof Error ? requestError.message : "GitHub could not be reached. Please try again.");
        }

        controller.abort();
      } finally {
        window.clearTimeout(timeout);

        if (active) {
          setLoading(false);
        }
      }
    }

    void loadGithubData();

    // Stop unfinished requests when leaving the page or starting another attempt.
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);

  return (
    <section className="py-20 px-4 bg-background min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">GitHub Integration</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">My public GitHub profile and recently updated repositories, loaded from the GitHub API.</p>
        </div>

        {loading && (
          <div role="status" className="text-center text-muted-foreground py-16">Loading GitHub profile and repositories...</div>
        )}

        {error && !loading && (
          <Card>
            <CardContent className="p-8 text-center space-y-4">
              <p role="alert">{error}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button type="button" onClick={() => setAttempt((current) => current + 1)}>Try again</Button>
                <Button variant="outline" asChild>
                  <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackGithubClick()}>Open GitHub Profile</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {profile && !loading && !error && (
          <>
            <Card className="mb-8 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-wrap items-center gap-8">
                  <img src={profile.avatar_url} alt={`${profile.login}'s avatar`} width={96} height={96} className="rounded-full border" style={{ width: "96px", height: "96px", objectFit: "cover", flexShrink: 0 }} />

                  <div style={{ flex: "1 1 240px", minWidth: 0 }}>
                    <div className="flex items-center gap-3 mb-3">
                      <Github className="w-6 h-6" aria-hidden="true" />
                      <h2 className="text-2xl font-semibold">{profile.name ?? profile.login}</h2>
                    </div>

                    <p className="text-muted-foreground mb-6">{profile.bio ?? "Software engineering projects and learning."}</p>

                    <div className="flex flex-wrap gap-6 mb-6">
                      <p><strong>{profile.public_repos}</strong> repositories</p>
                      <p><strong>{profile.followers}</strong> followers</p>
                      <p><strong>{profile.following}</strong> following</p>
                    </div>

                    <Button asChild>
                      <a href={profile.html_url} target="_blank" rel="noopener noreferrer" onClick={() => trackGithubClick()}>
                        Open GitHub Profile
                        <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {repos.length === 0 ? (
              <p role="status" className="text-center text-muted-foreground py-8">No public repositories are available.</p>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {repos.map((repo) => (
                  <Card key={repo.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between gap-4">
                        <span style={{ overflowWrap: "anywhere" }}>{repo.name}</span>
                        <Star className="w-5 h-5 text-muted-foreground" style={{ flexShrink: 0 }} aria-hidden="true" />
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{repo.description ?? "No repository description provided."}</p>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-sm mb-4">
                        <span>{repo.language ?? "Not specified"}</span>
                        <span>{repo.stargazers_count} stars</span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs text-muted-foreground">Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                        <Button variant="outline" size="sm" asChild>
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label={`View ${repo.name} on GitHub`} onClick={() => trackGithubClick()}>View</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}