import { useState } from "react";
import {
  PageWrapper,
  Select,
  Title,
  WindowWrapper,
} from "./AddPersonalNumberPage.styled";

const cities = ["Казань", "Москва", "Ильназвильск"];

export const AddPersonalNumberPage = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  return (
    <PageWrapper>
      <WindowWrapper>
        <Title>Выберите город</Title>
        <Select
          value={selectedCity || undefined}
          placeholder="город"
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="город" style={{ color: "lightgray" }}>
            Город
          </option>
          {cities.map((city) => (
            <option value={city}>{city}</option>
          ))}
        </Select>
      </WindowWrapper>
    </PageWrapper>
  );
};
