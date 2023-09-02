import { AddConfigIcon } from "@/components/icons/AddConfigIcon";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { BillInfo } from "./BillInfo";
import { Infoicon } from "@/components/icons/InfoIcon";
import { HowToUseConfigBadge } from "./HowToUseConfigBadge";

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Logo />
        <Button
          radius="full"
          isIconOnly
          color="secondary"
          aria-label="Like"
          size="sm"
        >
          <Infoicon />
        </Button>
      </div>
      <BillInfo />
      <div className="flex items-center justify-between">
        <div className="text-darkBlue font-medium">Мои доступы</div>
        <Button
          size="sm"
          radius="full"
          color="primary"
          variant="flat"
          className="font-bold bg-lightBlueTr text-darkBlue"
          startContent={<AddConfigIcon />}
          onClick={() => navigate("/addConfig")}
        >
          Создать доступ
        </Button>
      </div>
      <HowToUseConfigBadge />
    </div>
  );
};
