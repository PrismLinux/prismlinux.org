{
  description = "PrismLinux.org flake by Volodia Kraplich";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        # Use latest Bun from nixpkgs-unstable
        bunLatest = pkgs.bun;

        # Pin to a specific LTS version of Node.js for stability
        nodejs = pkgs.nodejs_20;

      in
      {
        # The single, default development environment for Next.js
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Core runtime
            bunLatest
            nodejs # Use the pinned Node.js version

            # Language servers for a rich editor experience
            nodePackages.typescript-language-server
            nodePackages.vscode-langservers-extracted # Provides HTML, CSS, JSON, ESLint servers
            nodePackages."@tailwindcss/language-server"
            nodePackages.yaml-language-server

            # Core development tools
            nodePackages.prettier
            nodePackages.eslint
            nodePackages.typescript

            # Build tools that Next.js or its dependencies might need
            python3
            pkg-config

            # Common system dependencies
            openssl
            libiconv # For character encoding support

            # Image optimization tools
            imagemagick

            # Essential utilities
            git
            curl
            wget
            jq

            # Testing tools
            playwright-driver.browsers # Provides browser binaries for Playwright
          ];

          shellHook = ''
            echo "📦 Bun version: $(bun --version)"
            echo "📋 Node.js version: $(node --version)"

            # Add node_modules/.bin to PATH to find project-local binaries like 'next'
            export PATH="$PWD/node_modules/.bin:$PATH"

            echo ""
            echo "🎯 Common Commands:"
            echo "  bun install      - Install dependencies"
            echo "  bun run dev      - Start the development server"
            echo "  bun run build    - Build for production"
            echo "  bun run start    - Start the production server"
            echo "  bun run lint     - Run the linter"
            echo ""

            # Set up environment variables for development
            export NODE_ENV=development
            export FORCE_COLOR=1
            export COLORTERM=truecolor
            export NEXT_TELEMETRY_DISABLED=1

            # Configure paths and settings for tools
            export PLAYWRIGHT_BROWSERS_PATH=${pkgs.playwright-driver.browsers}
            export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true

            # Ensure bun's cache directory exists
            mkdir -p ~/.bun/cache

            # Automatically install dependencies if they are missing
            if [ -f "package.json" ] && [ ! -d "node_modules" ]; then
              echo "📦 package.json found. Installing dependencies with Bun..."
              bun install
            fi

            # Check if it's a Next.js project and provide helpful info
            if [ -f "next.config.js" ] || [ -f "next.config.mjs" ]; then
              echo "✅ Next.js project detected!"
              if [ -d ".next" ]; then
              else
                echo "💡 Run 'bun run dev' once to generate initial types and build artifacts."
              fi
            fi
          '';

          # Environment variables to be set in the shell
          env = {
            BUN_INSTALL = ".bun";
            NODE_OPTIONS = "--max-old-space-size=8192";
            NEXT_TELEMETRY_DISABLED = "1";
            NPM_CONFIG_FUND = "false";
            NPM_CONFIG_AUDIT = "false";
          };
        };
      }
    );
}
