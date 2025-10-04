"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  Check,
  CheckCircle,
  Copy,
  Download,
  ExternalLink,
  Info as InfoIcon,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";

// Type for components with children
type WithChildren = { children: ReactNode };

// Type for TableCell with optional header
type TableCellProps = { children: ReactNode; header?: boolean };

// Warning callout
export function Warning({ children, title = "Warning" }: { children: ReactNode; title?: string }) {
  return (
    <Alert className="border-yellow-500/50 bg-yellow-500/10 my-6">
      <AlertTriangle className="h-4 w-4 text-yellow-500" />
      <AlertTitle className="text-yellow-700 dark:text-yellow-400">{title}</AlertTitle>
      <AlertDescription className="text-yellow-600 dark:text-yellow-300">
        {children}
      </AlertDescription>
    </Alert>
  );
}

// Info callout
export function Info({ children, title = "Info" }: { children: ReactNode; title?: string }) {
  return (
    <Alert className="border-blue-500/50 bg-blue-500/10 my-6">
      <InfoIcon className="h-4 w-4 text-blue-500" />
      <AlertTitle className="text-blue-700 dark:text-blue-400">{title}</AlertTitle>
      <AlertDescription className="text-blue-600 dark:text-blue-300">{children}</AlertDescription>
    </Alert>
  );
}

// Success callout
export function Success({ children, title = "Success" }: { children: ReactNode; title?: string }) {
  return (
    <Alert className="border-green-500/50 bg-green-500/10 my-6">
      <CheckCircle className="h-4 w-4 text-green-500" />
      <AlertTitle className="text-green-700 dark:text-green-400">{title}</AlertTitle>
      <AlertDescription className="text-green-600 dark:text-green-300">{children}</AlertDescription>
    </Alert>
  );
}

// Error callout
export function Error({ children, title = "Error" }: { children: ReactNode; title?: string }) {
  return (
    <Alert className="border-red-500/50 bg-red-500/10 my-6">
      <XCircle className="h-4 w-4 text-red-500" />
      <AlertTitle className="text-red-700 dark:text-red-400">{title}</AlertTitle>
      <AlertDescription className="text-red-600 dark:text-red-300">{children}</AlertDescription>
    </Alert>
  );
}

// Code block with copy functionality
export function CodeBlock({ children, ...props }: { children: ReactNode; [key: string]: any }) {
  const [copied, setCopied] = useState(false);

  // Extract language from className (e.g., ‘language-js’)
  const language = props.className?.replace(/language-/, "") || "bash";

  const copyToClipboard = () => {
    if (typeof children === "string") {
      navigator.clipboard.writeText(children.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative my-6 rounded-lg border bg-slate-950 text-slate-50 font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <Badge variant="outline" className="text-xs text-slate-400 border-slate-700">
          {language}
        </Badge>
        <Button
          size="icon"
          variant="ghost"
          onClick={copyToClipboard}
          className="h-8 w-8 text-slate-400 hover:bg-slate-800 hover:text-slate-50"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}

// Download button
export function DownloadButton({
  href,
  children,
  filename,
}: {
  href: string;
  children: ReactNode;
  filename?: string;
}) {
  return (
    <div className="my-6">
      <Button asChild className="w-full sm:w-auto">
        <Link href={href} download={filename}>
          <Download className="h-4 w-4 mr-2" />
          {children}
        </Link>
      </Button>
    </div>
  );
}

// External link with icon
export function ExternalLinkButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Button asChild variant="outline" className="my-2">
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <ExternalLink className="h-4 w-4 ml-2" />
      </Link>
    </Button>
  );
}

// Table wrapper with better styling
export function Table({ children }: WithChildren) {
  return (
    <div className="my-6 overflow-x-auto border border-border rounded-lg shadow-sm">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

// Enhanced table header
export function TableHeader({ children }: WithChildren) {
  return <thead className="bg-muted/50 text-foreground">{children}</thead>;
}

// Enhanced table row
export function TableRow({ children }: WithChildren) {
  return <tr className="border-b border-border hover:bg-muted/30 transition-colors">{children}</tr>;
}

// Enhanced table cell
export function TableCell({ children, header = false }: TableCellProps) {
  const Tag = header ? "th" : "td";
  return (
    <Tag className={`p-3 text-left ${header ? "font-semibold" : "text-muted-foreground"}`}>
      {children}
    </Tag>
  );
}

// Step-by-step guide component
export function Steps({ children }: WithChildren) {
  return <div className="my-8 space-y-4">{children}</div>;
}

export function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-blue-400/10">
        <CardTitle className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
            {number}
          </div>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  );
}

// Tabs component
export function Tabs({ children }: WithChildren) {
  return <div className="my-6">{children}</div>;
}

export function Tab({
  title,
  children,
  active = false,
}: {
  title: string;
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <Card className={`${active ? "ring-2 ring-primary" : ""} transition-all`}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

// Feature grid
export function FeatureGrid({ children }: WithChildren) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">{children}</div>
  );
}

export function Feature({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

// Export all components for MDX
export const MDXComponents = {
  Warning,
  Info,
  Success,
  Error,
  DownloadButton,
  ExternalLinkButton,
  Steps,
  Step,
  Tabs,
  Tab,
  FeatureGrid,
  Feature,
  // Override default HTML elements to use our custom components
  table: Table,
  thead: TableHeader,
  tr: TableRow,
  td: (props: TableCellProps) => <TableCell {...props} />,
  th: (props: TableCellProps) => <TableCell {...props} header />,
  hr: () => <Separator className="my-8" />,
  pre: (props: any) => <CodeBlock {...props} />,
};
