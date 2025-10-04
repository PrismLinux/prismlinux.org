import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: imagePath } = await params;

  try {
    const fullPath = path.join(process.cwd(), "content", ...imagePath);
    const imageBuffer = await fs.readFile(fullPath);

    const ext = path.extname(imagePath[imagePath.length - 1]).toLowerCase();
    const contentType =
      {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".webp": "image/webp",
        ".svg": "image/svg+xml",
      }[ext] || "image/png";

    return new NextResponse(imageBuffer as unknown as BodyInit, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Image not found:", imagePath);
    return new NextResponse("Not Found", { status: 404 });
  }
}
