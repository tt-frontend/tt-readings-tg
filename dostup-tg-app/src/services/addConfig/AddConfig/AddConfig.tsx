import { Header } from "@/components/Header/Header";
import { InputSC } from "./AddConfig.styled";
import { useEffect, useState } from "react";

export const AddConfig = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const mainButton = Telegram.WebApp.MainButton;

    if (name && !mainButton.isVisible) {
      mainButton.setText("Создать доступ");
      mainButton.show();
    }

    if (mainButton.isVisible && !name) {
      mainButton.hide();
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
    </div>
  );
};
