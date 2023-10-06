import { useState } from "react";
import {
  PageWrapper,
  Title,
  WindowWrapper,
} from "./AddPersonalNumberPage.styled";
import { Select } from "@/components/Select";
import { Button } from "antd";

const cities = ["Казань", "Москва", "Ильназвильск"];

export const AddPersonalNumberPage = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  return (
    <PageWrapper>
      <WindowWrapper>
        <Title>Выберите город</Title>
        <Select
          value={selectedCity}
          placeholder="город"
          onChange={(value) => setSelectedCity(value)}
          allowClear
        >
          {cities.map((city) => (
            <Select.Option value={city}>{city}</Select.Option>
          ))}
        </Select>
        <Button>Продолжить</Button>
      </WindowWrapper>
    </PageWrapper>
  );
};
