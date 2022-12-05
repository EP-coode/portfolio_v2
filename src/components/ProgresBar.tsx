import React from "react";

type Props = {
  progress: number;
};

const ProggresBar = ({ progress }: Props) => {
  return (
    <div className="h-full w-full bg-transparent">
      <div
        className="h-full ml-0 bg-gradient-to-r from-cyan-500 to-blue-500"
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
  );
};

export default ProggresBar;
