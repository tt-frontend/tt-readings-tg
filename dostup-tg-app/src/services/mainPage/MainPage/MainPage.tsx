import { AddConfigIcon } from "@/components/icons/AddConfigIcon";
import { Button } from "@nextui-org/react";
import { BillInfo } from "./BillInfo";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <BillInfo />
      <div className="flex items-center justify-between mt-4">
        <div className="text-darkBlue text-xl font-medium">Конфиги</div>
        <Button
          size="sm"
          radius="full"
          color="primary"
          variant="flat"
          className="font-bold bg-lightBlueTr text-darkBlue"
          startContent={<AddConfigIcon />}
          onClick={() => navigate("/addConfig")}
        >
          Создать конфиг
        </Button>
      </div>
    </div>
  );
};
