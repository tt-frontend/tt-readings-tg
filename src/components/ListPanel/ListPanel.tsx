import React, { FC } from "react";
import { Line, LineItem, Wrapper } from "./ListPanel.styled";
import { Props } from "./ListPanel.types";

export const ListPanel: FC<Props> = ({ items }) => {
  return (
    <Wrapper>
      {items.map((elem, index) => (
        <React.Fragment key={elem.key}>
          <LineItem>
            <div className="list-item-key">{elem.key}</div>
            <div>{elem.value || "—"}</div>
          </LineItem>
          {items.length - 1 !== index && <Line />}
        </React.Fragment>
      ))}
    </Wrapper>
  );
};
