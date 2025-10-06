"use client";

import { useState, useEffect } from "react";
import { GitBranch, GitCommit, User, Calendar, ExternalLink, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Commit {
  id: string;
  short_id: string;
  title: string;
  message: string;
  author_name: string;
  author_email: string;
  committed_date: string;
  project_path: string;
}

export default function GitCommitClient() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllCommits = async () => {
      const projectPaths = [
        "crystalnetwork-studio/linux/prismlinux/os-build/crystallize",
        "crystalnetwork-studio/linux/prismlinux/os-build/crystallize-gui",
        "crystalnetwork-studio/linux/prismlinux/os-build/iso-profile",
        "crystalnetwork-studio/linux/prismlinux/packages/cinnamon-settings",
        "crystalnetwork-studio/linux/prismlinux/packages/cosmic-settings",
        "crystalnetwork-studio/linux/prismlinux/packages/fish-themes",
        "crystalnetwork-studio/linux/prismlinux/packages/gaming-meta",
        "crystalnetwork-studio/linux/prismlinux/packages/gnome-settings",
        "crystalnetwork-studio/linux/prismlinux/packages/graphics",
        "crystalnetwork-studio/linux/prismlinux/packages/hyprland-settings",
        "crystalnetwork-studio/linux/prismlinux/packages/plasma-settings",
        "crystalnetwork-studio/linux/prismlinux/packages/rate-mirrors",
        "crystalnetwork-studio/linux/prismlinux/packages/settings",
        "crystalnetwork-studio/linux/prismlinux/core-components/about",
        "crystalnetwork-studio/linux/prismlinux/core-components/grub",
        "crystalnetwork-studio/linux/prismlinux/core-components/grub-theme",
        "crystalnetwork-studio/linux/prismlinux/core-components/hooks",
        "crystalnetwork-studio/linux/prismlinux/core-components/mirrorlist",
        "crystalnetwork-studio/linux/prismlinux/core-components/prism",
        "crystalnetwork-studio/linux/prismlinux/core-components/prismlinux-iso",
      ];

      try {
        const allCommitsPromises = projectPaths.map(async (path) => {
          const projectId = encodeURIComponent(path);
          const response = await fetch(
            `https://gitlab.com/api/v4/projects/${projectId}/repository/commits?per_page=5`
          );

          if (!response.ok) {
            return [];
          }

          const data = await response.json();
          return data.map((commit: any) => ({
            ...commit,
            project_path: path,
          }));
        });

        const allCommitsArrays = await Promise.all(allCommitsPromises);
        let allCommits = allCommitsArrays.flat();

        // Сортируем по дате (новые сверху)
        allCommits.sort((a, b) =>
          new Date(b.committed_date).getTime() - new Date(a.committed_date).getTime()
        );

        setCommits(allCommits);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCommits();
  }, []);

  if (loading) {
    return (
      <div className="container py-20 flex justify-center items-center">
        <div className="text-center">
          <GitCommit className="h-12 w-12 text-primary mx-auto animate-pulse" />
          <p className="text-lg text-muted-foreground mt-4">Loading commits...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-20 flex justify-center items-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="text-lg text-red-500 mt-4">Error: {error}</p>
        </div>
      </div>
    );
  }


  const groupedCommits = commits.reduce((acc, commit) => {
    if (!acc[commit.project_path]) {
      acc[commit.project_path] = [];
    }
    acc[commit.project_path].push(commit);
    return acc;
  }, {} as Record<string, Commit[]>);

  return (
    <div className="container py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Recent Commits
        </h1>
        <p className="text-lg text-muted-foreground">
          Latest changes across all <span className="text-primary">PrismLinux</span> subprojects
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {Object.entries(groupedCommits).length > 0 ? (
          Object.entries(groupedCommits).map(([projectPath, projectCommits]) => (
            <Card
              key={projectPath}
              className="hover:shadow-xl transition-all duration-300 group border-l-4 border-primary"
            >
              <CardHeader className="flex flex-row items-center gap-3">
                <GitBranch className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">
                  <code className="bg-primary/10 px-2 py-1 rounded text-sm font-mono">
                    {projectPath}
                  </code>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {projectCommits.map((commit) => (
                  <div
                    key={`${commit.project_path}-${commit.id}`}
                    className="p-4 rounded-lg bg-muted/30 hover:bg-accent transition-colors duration-200 border border-border"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {commit.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            <span>{commit.author_name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>
                              {new Date(commit.committed_date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <a
                        href={`https://gitlab.com/${commit.project_path}/-/commit/${commit.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                      >
                        <span className="font-mono text-sm">{commit.short_id}</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                    {commit.message && commit.message !== commit.title && (
                      <p className="mt-2 text-muted-foreground text-sm whitespace-pre-line">
                        {commit.message}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <GitCommit className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground mt-4">No commits found.</p>
          </div>
        )}
      </div>
    </div>
  );
}