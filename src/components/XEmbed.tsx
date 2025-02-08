import * as React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

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
  linkText = 'View post on X',
  placeholderImageUrl,
  placeholderDisabled = false,
  style,
  ...divProps
}) => {
  const postId = url.substring(url.lastIndexOf('/') + 1).replace(/[?].*$/, '');
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div
      {...divProps}
      style={{
        overflow: 'hidden',
        width: width ?? '100%',
        height: height ?? 'auto',
        position: 'relative',
        ...style,
      }}
    >
      {!isLoaded && (
        <div
          style={{
            width: '100%',
            height: height ?? 350,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f2f5',
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: 12,
            animation: 'pulse 1.5s infinite',
          }}
        >
          <p style={{ color: '#657786', fontSize: 14 }}>Loading tweet...</p>
        </div>
      )}
      <TwitterTweetEmbed tweetId={postId} onLoad={() => setIsLoaded(true)} />
    </div>
  );
};

const styles = `
@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}`;

document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);
