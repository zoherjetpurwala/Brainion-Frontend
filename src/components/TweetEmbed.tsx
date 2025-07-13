import React from "react";
import { XEmbed } from "./XEmbed";

interface TwitterEmbedProps {
  tweetUrl: string;
}

const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ tweetUrl }) => {
  return (
    <div className="flex justify-center">
      <XEmbed url={`${tweetUrl}`} width={356} />
    </div>
  );
};

export default TwitterEmbed;