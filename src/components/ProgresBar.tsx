import React from "react";

type Props = {
  progress: number;
};

const ProggresBar = ({ progress }: Props) => {
  return (
    <div className="h-1.5 w-full fixed top-0 left-0 bg-transparent z-30">
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
