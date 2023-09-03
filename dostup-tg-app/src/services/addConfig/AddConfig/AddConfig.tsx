import { Header } from "@/components/Header/Header";
import { ButtonWrapper, InputSC } from "./AddConfig.styled";
import { useCallback, useState } from "react";
import { api } from "@/api";
import { PayType } from "@/api/types";
import { Button } from "@nextui-org/react";

export const AddConfig = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateConfig = useCallback(async () => {
    try {
      const payload = {
        peerName: name,
        telegramId: Telegram.WebApp.initDataUnsafe.user?.id,
        type: PayType.NewPersonal,
      };

      setIsLoading(true);

      const { data } = await api.configBuyConfigCreate(payload);

      setIsLoading(false);

      if (data.paymentUri) window.location.assign(data.paymentUri);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  }, [name]);

  return (
    <div>
      <Header title="Добавление доступа" />
      <div className="mt-6">
        <InputSC
          value={name}
          onChange={(e) => setName(e.target.value)}
          onClear={() => setName("")}
          label="Название"
          isClearable
          color="primary"
          size="lg"
        />
      </div>
      {name && (
        <ButtonWrapper>
          <Button
            onClick={handleCreateConfig}
            color="secondary"
            fullWidth
            size="lg"
            isDisabled={isLoading}
          >
            Создать доступ
          </Button>
        </ButtonWrapper>
      )}
    </div>
  );
};
