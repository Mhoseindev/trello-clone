import React from "react";

type PropsType = {
  title: string;
};

const Index = ({ title }: PropsType) => {
  return (
    <div className={"card"}>
      <h3 className={"card-title"}>{title}</h3>

      <div className={"flex justify-end"}>
        <button className={"card-action"}>comments</button>
      </div>
    </div>
  );
};

export default Index;
