import * as React from "react";
import { Tweet } from "react-twitter-widgets";
import { Skeleton } from "./ui/skeleton";

export interface XEmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string;
  width?: string | number;
  height?: string | number;
  linkText?: string;
  placeholderImageUrl?: string;
  placeholderDisabled?: boolean;
}

export const XEmbed: React.FC<XEmbedProps> = ({
  url,
  width,
  height,
  linkText = "View post on X",
  placeholderImageUrl,
  placeholderDisabled = false,
  style,
  ...divProps
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const postId = url.substring(url.lastIndexOf("/") + 1).replace(/[?].*$/, "");

  return (
    <div
      {...divProps}
      style={{
        overflow: "hidden",
        width: width ?? "100%",
        height: height ?? "auto",
        ...style,
      }}
    >
      {isLoading && (
        <div className="w-full space-y-3 p-4 border border-gray-200 rounded-lg bg-white">
          {/* Tweet header skeleton */}
          <div className="flex items-center space-x-3">
            <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-gray-200" />
              <Skeleton className="h-3 w-16 bg-gray-200" />
            </div>
          </div>
          
          {/* Tweet content skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-3/4 bg-gray-200" />
            <Skeleton className="h-4 w-1/2 bg-gray-200" />
          </div>
          
          {/* Tweet footer skeleton */}
          <div className="flex justify-between pt-2">
            <Skeleton className="h-4 w-8 bg-gray-200" />
            <Skeleton className="h-4 w-8 bg-gray-200" />
            <Skeleton className="h-4 w-8 bg-gray-200" />
            <Skeleton className="h-4 w-8 bg-gray-200" />
          </div>
        </div>
      )}
      
      <div>
        <Tweet 
          tweetId={postId}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};