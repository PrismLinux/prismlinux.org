import ScreenshotCard from "./ui/screenshot-card";

export function ScreenshotsSection() {
  const screenshots = [
    {
      src: "/screenshots/desktop.jpg",
      alt: "PrismLinux desktop environment with clean workspace, dock panel, and customizable widgets",
      label: "Main Desktop",
      ratio: "1680/1050",
    },
    {
      src: "/screenshots/gaming.png",
      alt: "PrismLinux gaming setup with Steam, performance monitor, and RGB lighting control",
      label: "Gaming Experience",
      ratio: "1680/1050",
    },
    {
      src: "/screenshots/development.jpg",
      alt: "Development environment with VS Code, terminal split views, and Git integration",
      label: "Developer Workspace",
      ratio: "1680/1050",
    },
    {
      src: "/screenshots/content-creation.jpg",
      alt: "Content creation setup with DaVinci Resolve, GIMP, and resource monitor",
      label: "Creative Suite",
      ratio: "1680/1050",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/20">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Beautiful{" "}
            <span className="text-foreground">Desktop Environment</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience a modern, customizable desktop that adapts to your
            workflow with pixel-perfect screenshots
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {screenshots.map((screenshot, index) => (
            <ScreenshotCard
              key={index}
              {...screenshot}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            All screenshots captured on real hardware with{" "}
            <span className="text-foreground font-medium">PrismLinux</span>.
            Experience the same performance on your machine.
          </p>
        </div>
      </div>
    </section>
  );
}
