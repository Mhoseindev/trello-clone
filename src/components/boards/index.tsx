import React from "react";
import Column from "@/src/components/boards/column";

const Index = () => {
  return (
    <div className={"boards"}>
      <div className={"header"}>
        <h2 className={"header-title"}>ToDo</h2>
      </div>
      <div className={"body"}>
        <Column />
      </div>
      <button className={"board-action"}>Add Another Card</button>
    </div>
  );
};

export default Index;
