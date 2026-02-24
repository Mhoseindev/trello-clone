import React from "react";

type PropsType = {
  title: string;
};

const Index = ({ title }: PropsType) => {
  return (
    <div className={"column"}>
      <h3 className={"column-title"}>{title}</h3>

      <div className={"flex justify-end"}>
        <button className={"column-action"}>comments</button>
      </div>
    </div>
  );
};

export default Index;
