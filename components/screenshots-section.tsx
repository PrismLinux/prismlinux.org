import ScreenshotCard from "./ui/screenshot-card";

export function ScreenshotsSection() {
  const screenshots = [
    {
      src: "/screenshots/desktop.png",
      alt: "PrismLinux desktop environment with clean workspace, dock panel, and customizable widgets",
      label: "Main Desktop",
      ratio: "1920/1080",
    },
    {
      src: "/screenshots/gaming.png",
      alt: "PrismLinux gaming setup with Steam, performance monitor, and RGB lighting control",
      label: "Gaming Experience",
      ratio: "1680/1050",
    },
    {
      src: "/screenshots/development.png",
      alt: "Development environment with Zed Editor, terminal split views, and Git integration",
      label: "Developer Workspace",
      ratio: "16/10",
    },
    // {
    //   src: "/screenshots/content-creation.jpg",
    //   alt: "Content creation setup with DaVinci Resolve, GIMP",
    //   label: "Creative Suite",
    //   ratio: "2560/1600",
    // },
  ];

  // Helper function to determine grid layout based on ratio
  const getGridLayout = (
    screenshotList: {
      src: string;
      alt: string;
      label: string;
      ratio: string;
    }[],
  ) => {
    const ratioTypes = screenshotList.map((screenshot) => {
      const [w, h] = screenshot.ratio.split("/").map(Number);
      const aspectRatio = w / h;

      if (aspectRatio > 2) return "ultrawide"; // 21:9 and wider
      if (aspectRatio > 1.7) return "widescreen"; // 16:9
      if (aspectRatio > 1.5) return "standard"; // 16:10, 3:2
      return "square"; // 4:3, 1:1, etc.
    });

    return ratioTypes;
  };

  const layoutTypes = getGridLayout(screenshots);

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

        {/* Responsive grid that adapts to different aspect ratios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {screenshots.map((screenshot, index) => {
            const layoutType = layoutTypes[index];

            // Determine if this should span full width
            const spanFullWidth =
              layoutType === "ultrawide" ||
              (layoutType === "widescreen" &&
                screenshots.length % 2 === 1 &&
                index === screenshots.length - 1);

            return (
              <div
                key={index}
                className={spanFullWidth ? "md:col-span-2" : "col-span-1"}
              >
                <ScreenshotCard
                  {...screenshot}
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            );
          })}
        </div>

        {/* Enhanced footer with ratio information */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            All screenshots captured on real hardware on{" "}
            <span className="text-foreground font-medium">PrismLinux</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
