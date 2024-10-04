"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import "./styles/image-loader.css";
const ImageLoader = ({ src }: { src: string | null }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const loader = ({
    src,
    quality,
    width,
  }: {
    src: string;
    quality?: number;
    width: number;
  }) => {
    const props = [`w=${width}`];
    if (quality) props.push(`q=${quality}`);
    const queryString = props.join("&");

    return `${process.env.NEXT_PUBLIC_URL}/api/user/image?src=${src}&${queryString}`;
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <Image
          sizes="10px"
          width={100}
          height={100}
          priority
          alt="Thumbnail"
          src={src || ""}
          className={`object-contain w-full h-full`}
          loader={({ src }) =>
            `${process.env.NEXT_PUBLIC_URL}/api/user/image?src=${src}&thumbnail=true`
          }
        />
      )}
      <Image
        width={100}
        height={100}
        alt="Main Image"
        quality={100}
        src={src || ""}
        className={`object-contain w-full h-full transition-opacity duration-150 ease-in-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        loader={loader}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default ImageLoader;
