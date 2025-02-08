import React from "react";
import { XEmbed } from "react-social-media-embed";

interface TwitterEmbedProps {
  tweetUrl: string;
}

const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ tweetUrl }) => {
  return (
    <div className="flex justify-center">
      <XEmbed url={`${tweetUrl}`} width={325} />
    </div>
  );
};

export default TwitterEmbed;
