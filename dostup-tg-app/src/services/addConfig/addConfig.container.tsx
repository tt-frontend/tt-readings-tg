import { Code } from "@nextui-org/react";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";

export const AddConfigContainer = () => {
  const data = Telegram.WebApp.initData;

  const navigate = useNavigate();

  const parsedData = queryString.parse(data);

  const back = (
    Telegram.WebApp as unknown as {
      BackButton: { show(): void; onClick(cb: () => void): void };
    }
  ).BackButton;

  back.show();
  back.onClick(() => navigate(-1));

  return <Code>{JSON.stringify(parsedData)}</Code>;
};
