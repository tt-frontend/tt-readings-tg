import { AddConfigIcon } from "@/components/icons/AddConfigIcon";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { HowToUseConfigBadge } from "./HowToUseConfigBadge";
import { ConfigsListContainer } from "@/services/configsList";
import { InfoCircleFillSC } from "./MainPage.styled";

export const MainPage = () => {
  const navigate = useNavigate();

  const isHowToUsePassed =
    localStorage.getItem("is_how_to_use_done") === "true";

  return (
    <div className="flex flex-col gap-6 pb-2">
      <div className="flex items-center justify-between">
        <Logo />
        <Button
          radius="full"
          isIconOnly
          color="secondary"
          aria-label="Like"
          size="sm"
          onClick={() => navigate("/howToUse")}
        >
          <InfoCircleFillSC />
        </Button>
      </div>
      {/* <BillInfo /> */}
      <div className="flex items-center justify-between">
        {/* <div className="text-darkBlue font-medium">Мои доступы</div> */}
        <Button
          fullWidth
          size="md"
          radius="md"
          color="primary"
          variant="flat"
          className="font-bold bg-lightBlueTr text-darkBlue"
          startContent={<AddConfigIcon />}
          onClick={() => {
            navigate("/addConfig");
          }}
        >
          Создать доступ
        </Button>
      </div>
      <ConfigsListContainer />
      {!isHowToUsePassed && <HowToUseConfigBadge />}
    </div>
  );
};
