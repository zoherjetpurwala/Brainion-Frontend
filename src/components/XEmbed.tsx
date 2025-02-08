import * as React from "react";
import { Tweet } from "react-twitter-widgets";

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
      <Tweet tweetId={postId} />
    </div>
  );
};
