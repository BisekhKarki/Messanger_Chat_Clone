"use client";

import Image from "next/image";
import React, { useState } from "react";
import { RxCross2, RxReset, RxZoomIn, RxZoomOut } from "react-icons/rx";

interface Props {
  imageSrc: string;
  setShowFullImage: (value: boolean) => void;
}

const ShowImageFull = ({ imageSrc, setShowFullImage }: Props) => {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0,
    positionX: 0,
    positionY: 0,
  });

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      positionX: position.x,
      positionY: position.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    const newX = dragStart.positionX + deltaX / scale;
    const newY = dragStart.positionY + deltaY / scale;
    // console.log({
    //   deltaX,
    //   deltaY,
    //   newX,
    //   newY,
    // });

    setPosition({ x: newX, y: newY });
    // console.log(position);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];

    setIsDragging(true);
    setDragStart({
      x: touch.clientX,
      y: touch.clientY,
      positionX: position.x,
      positionY: position.y,
    });
    // console.log(dragStart);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];

    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    const newX = dragStart.positionX + deltaX / scale;
    const newY = dragStart.positionY + deltaY / scale;
    setPosition({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-center items-center p-4">
      <div className="w-full h-full">
        <div className="absolute right-4 top-4 flex gap-2 z-10">
          <button
            aria-label="Zoom in"
            className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
            onClick={(e) => {
              e.stopPropagation();
              zoomIn();
            }}
          >
            <RxZoomIn size={20} />
          </button>
          <button
            aria-label="Zoom Out"
            className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
            onClick={(e) => {
              e.stopPropagation();
              zoomOut();
            }}
          >
            <RxZoomOut size={20} />
          </button>
          <button
            onClick={resetZoom}
            className="px-3 py-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition text-sm flex items-center gap-1"
          >
            <RxReset size={16} />
            {Math.round(scale * 100)}%
          </button>
          <button
            aria-label="Close"
            onClick={() => setShowFullImage(false)}
            className="p-2 bg-black/50 text-white rounded-full hover:bg-red-600 transition ml-2 cursor-pointer"
          >
            <RxCross2 />
          </button>
        </div>

        <div className="relative overflow-hidden h-full w-full">
          <div
            className="h-full w-full transition-transform duration-200 ease-in-out flex items-center justify-center"
            style={{
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              transition: isDragging ? "none" : "transform 0.2s ease",
              transformOrigin: "center center",
              cursor: isDragging ? "grabbing" : scale > 1 ? "grab" : "default",
              userSelect: isDragging ? "none" : "auto",
              WebkitUserSelect: isDragging ? "none" : "auto",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={imageSrc}
              alt="Full screen image"
              width={1500}
              height={1000}
              className="object-contain max-h-[80vh] max-w-[90vw] select-none"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowImageFull;
