import { MDXComponents } from "@/components/mdx/MDXComponents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SITE_CONFIG } from "@/lib/metadata";
import fs from "fs/promises";
import matter from "gray-matter";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  Edit,
  GitBranch,
  Home,
  MessageSquare,
  User,
} from "lucide-react";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";

export async function generateStaticParams() {
  const baseDir = path.join(process.cwd(), "content", "wiki");

  const mdxFiles: string[] = [];

  async function findMdxFiles(dir: string) {
    const files = await fs.readdir(dir, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) {
        await findMdxFiles(filePath);
      } else if (file.isFile() && filePath.endsWith(".mdx")) {
        const relativePath = path.relative(baseDir, filePath);
        mdxFiles.push(relativePath);
      }
    }
  }

  await findMdxFiles(baseDir);

  return mdxFiles.map((filePath) => {
    const slug = filePath.replace(/\.mdx$/, "").split(path.sep);

    if (slug[slug.length - 1] === "index") {
      slug.pop();
    }

    return { slug };
  });
}

async function getPost({ slug }: { slug: string[] }) {
  const relativeBasePath = path.join("content", "wiki", ...slug);

  const possiblePaths = [
    `${relativeBasePath}.mdx`,
    `${relativeBasePath}/index.mdx`,
  ];

  for (const relativePath of possiblePaths) {
    try {
      const fullPath = path.join(process.cwd(), relativePath);
      const fileContents = await fs.readFile(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        meta: data,
        content: content,
        filePath: relativePath,
      };
    } catch (error) {
      continue;
    }
  }
  return null;
}

// --- GENERATE METADATA ---
export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const post = await getPost({ slug });

  if (!post) {
    return {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  return {
    title: `${post.meta.title} - ${SITE_CONFIG.name}`,
    description: post.meta.description || SITE_CONFIG.description,
  };
}

export default async function WikiArticle({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const post = await getPost({ slug });

  if (!post) {
    notFound();
  }

  const gitlabEditUrl = `${SITE_CONFIG.social.gitlab}/linux/prismlinux/websites/prismlinux.org/-/edit/master/${post.filePath}`;

  // These plugins are dynamically imported to resolve the diagnostic errors within the given constraints.
  const { default: remarkGfm } = await import("remark-gfm");
  const { default: rehypeSlug } = await import("rehype-slug");

  const MdxContent = (
    <MDXRemote
      source={post.content}
      components={MDXComponents}
      options={{
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 scroll-smooth">
      <div className="container py-8">
        <div className="mb-6">
          <Link href="/wiki">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Wiki
            </Button>
          </Link>
        </div>

        <WikiBreadcrumb slug={slug} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                {post.meta.title}
              </h1>
              {post.meta.description && (
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {post.meta.description}
                </p>
              )}
            </div>

            <ArticleMetadata meta={post.meta} content={post.content} />

            <Separator className="mb-8" />

            <Card className="bg-background/50 backdrop-blur border-border/50">
              <CardContent className="p-8">
                <article className="wiki-content prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-primary prose-pre:bg-muted/50 prose-pre:border prose-blockquote:border-l-primary prose-blockquote:bg-muted/20 prose-blockquote:pl-6 prose-blockquote:py-4 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-table:text-sm prose-th:bg-muted/50 prose-td:border-border prose-th:border-border">
                  {MdxContent}
                </article>
              </CardContent>
            </Card>

            <div className="mt-8 flex justify-end">
              <div className="text-sm text-muted-foreground">
                Last updated:{" "}
                {post.meta.lastModified
                  ? new Date(post.meta.lastModified).toLocaleDateString()
                  : "Recently"}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <TableOfContents content={post.content} />

            <Card className="bg-gradient-to-br from-primary/5 to-blue-400/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <GitBranch className="h-5 w-5 mr-2" />
                  Improve this page
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Help make our documentation better by contributing to this
                  page.
                </p>
                <div className="space-y-2">
                  <Button
                    asChild
                    size="sm"
                    className="w-full"
                    variant="outline"
                  >
                    <Link
                      href={gitlabEditUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit on GitLab
                    </Link>
                  </Button>
                  <Button size="sm" className="w-full" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Report Issue
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link
                  href={SITE_CONFIG.social.discord}
                  className="flex items-center p-3 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                >
                  <MessageSquare className="h-5 w-5 mr-3" />
                  <div>
                    <div className="font-medium">Discord Community</div>
                    <div className="text-xs text-muted-foreground">
                      Get real-time help
                    </div>
                  </div>
                </Link>
                <Link
                  href="/wiki/troubleshooting"
                  className="flex items-center p-3 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                >
                  <BookOpen className="h-5 w-5 mr-3" />
                  <div>
                    <div className="font-medium">Troubleshooting</div>
                    <div className="text-xs text-muted-foreground">
                      Common solutions
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function WikiBreadcrumb({ slug }: { slug: string[] }) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Wiki", href: "/wiki" },
  ];
  let currentPath = "/wiki";
  slug.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === slug.length - 1;
    breadcrumbItems.push({
      label: segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      href: isLast ? "" : currentPath,
    });
  });
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {index === 0 ? (
            <Home className="h-4 w-4 mr-2" />
          ) : (
            <ChevronRight className="h-4 w-4 mx-2" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

function TableOfContents({ content }: { content: string }) {
  const headings = content
    .split("\n")
    .filter((line) => line.match(/^#{2,4}\s/))
    .map((line) => {
      const text = line.replace(/^#+\s/, "").trim();
      const level = line.match(/^#+/)?.[0].length || 0;
      const id = text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, "");
      return { level, text, id };
    })
    .slice(0, 10);
  if (headings.length === 0) return null;
  return (
    <div className="static">
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Table of Contents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block text-sm hover:text-primary transition-colors ${
                heading.level === 2
                  ? "ml-0 font-medium"
                  : heading.level === 3
                    ? "ml-4"
                    : "ml-8"
              }`}
            >
              {heading.text}
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function ArticleMetadata({ meta, content }: { meta: any; content: string }) {
  const readingTime = Math.ceil(content.length / 1500) || 1;
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
      {meta.author && (
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          {meta.author}
        </div>
      )}
      {meta.lastModified && (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {new Date(meta.lastModified).toLocaleDateString()}
        </div>
      )}
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-1" />
        {readingTime} min read
      </div>
      {meta.category && (
        <Badge variant="secondary" className="ml-auto">
          {meta.category}
        </Badge>
      )}
    </div>
  );
}
