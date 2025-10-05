"use client";

import { useEffect } from "react";

export function ImageZoom() {
  useEffect(() => {
    let zoomedImage: HTMLImageElement | null = null;
    let currentScale = 1;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;

    function createZoomModal(imgSrc: string, imgAlt: string) {
      const modal = document.createElement("div");
      modal.className =
        "fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm opacity-0 transition-opacity duration-300";

      modal.innerHTML = `
        <div class="absolute inset-0 zoom-backdrop"></div>
        <div class="absolute top-4 right-4 flex gap-2 z-[10001]">
          <button class="zoom-btn zoom-in" title="Zoom In">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          </button>
          <button class="zoom-btn zoom-out" title="Zoom Out">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          </button>
          <button class="zoom-btn zoom-reset" title="Reset">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
          </button>
          <button class="zoom-btn zoom-close bg-red-500/20 border-red-500/30 hover:bg-red-500/30" title="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="absolute inset-0 flex items-center justify-center p-8 z-[10000] overflow-hidden">
          <img src="${imgSrc}" alt="${imgAlt}" class="max-w-[90%] max-h-[90vh] object-contain transition-transform duration-200 select-none" draggable="false">
        </div>
      `;

      document.body.appendChild(modal);
      document.body.style.overflow = "hidden";

      zoomedImage = modal.querySelector("img");

      setTimeout(() => modal.classList.replace("opacity-0", "opacity-100"), 10);

      setupControls(modal);
      setupInteractions(modal);

      return modal;
    }

    function setupControls(modal: HTMLElement) {
      const zoomInBtn = modal.querySelector(".zoom-in");
      const zoomOutBtn = modal.querySelector(".zoom-out");
      const resetBtn = modal.querySelector(".zoom-reset");
      const closeBtn = modal.querySelector(".zoom-close");
      const backdrop = modal.querySelector(".zoom-backdrop");

      zoomInBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        currentScale = Math.min(currentScale + 0.5, 4);
        updateTransform();
      });

      zoomOutBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        currentScale = Math.max(currentScale - 0.5, 1);
        updateTransform();
      });

      resetBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        currentScale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
      });

      closeBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        closeModal(modal);
      });

      backdrop?.addEventListener("click", () => closeModal(modal));

      const escapeHandler = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeModal(modal);
          document.removeEventListener("keydown", escapeHandler);
        }
      };
      document.addEventListener("keydown", escapeHandler);
    }

    function setupInteractions(_modal: HTMLElement) {
      if (!zoomedImage) return;

      // Mouse drag
      zoomedImage.addEventListener("mousedown", (e) => {
        if (currentScale > 1) {
          isDragging = true;
          startX = e.clientX - translateX;
          startY = e.clientY - translateY;
          zoomedImage!.style.cursor = "grabbing";
        }
      });

      document.addEventListener("mousemove", (e) => {
        if (isDragging) {
          translateX = e.clientX - startX;
          translateY = e.clientY - startY;
          updateTransform();
        }
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
        if (zoomedImage) {
          zoomedImage.style.cursor = currentScale > 1 ? "grab" : "zoom-in";
        }
      });

      // Mouse wheel zoom
      zoomedImage.addEventListener("wheel", (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.2 : 0.2;
        currentScale = Math.max(1, Math.min(4, currentScale + delta));
        updateTransform();
      });

      // Touch support
      let initialDistance = 0;

      zoomedImage.addEventListener("touchstart", (e) => {
        if (e.touches.length === 2) {
          initialDistance = getDistance(e.touches[0], e.touches[1]);
        }
      });

      zoomedImage.addEventListener("touchmove", (e) => {
        if (e.touches.length === 2) {
          e.preventDefault();
          const currentDistance = getDistance(e.touches[0], e.touches[1]);
          const scale = currentDistance / initialDistance;
          currentScale = Math.max(1, Math.min(4, currentScale * scale));
          initialDistance = currentDistance;
          updateTransform();
        }
      });
    }

    function getDistance(touch1: Touch, touch2: Touch): number {
      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }

    function updateTransform() {
      if (zoomedImage) {
        zoomedImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
        zoomedImage.style.cursor = currentScale > 1 ? "grab" : "zoom-in";
      }
    }

    function closeModal(modal: HTMLElement) {
      modal.classList.replace("opacity-100", "opacity-0");
      document.body.style.overflow = "";
      currentScale = 1;
      translateX = 0;
      translateY = 0;
      zoomedImage = null;

      setTimeout(() => modal.remove(), 300);
    }

    // Click handler for images
    const handleImageClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const img = target.closest(".wiki-content img") as HTMLImageElement;

      if (img && !target.closest(".image-zoom-modal")) {
        e.preventDefault();
        e.stopPropagation();
        createZoomModal(img.src, img.alt || "Zoomed image");
      }
    };

    document.addEventListener("click", handleImageClick);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleImageClick);
    };
  }, []);

  return (
    <style jsx global>{`
      .zoom-btn {
        width: 40px;
        height: 40px;
        border-radius: 0.5rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        backdrop-filter: blur(10px);
      }

      .zoom-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.3);
        transform: scale(1.05);
      }

      .wiki-content img {
        cursor: zoom-in;
        border-radius: 0.5rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.2s;
      }

      .wiki-content img:hover {
        border-color: rgba(var(--primary), 0.5);
      }

      @media (max-width: 640px) {
        .zoom-btn {
          width: 36px;
          height: 36px;
        }
      }
    `}</style>
  );
}
