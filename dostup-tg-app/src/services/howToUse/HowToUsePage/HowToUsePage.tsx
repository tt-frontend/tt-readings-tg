import { Logo } from "@/components/Logo";
import slide1 from "./assets/slide_1.png";
import slide2 from "./assets/slide_2.png";
import slide3 from "./assets/slide_3.png";
import { useEffect, useState } from "react";
import {
  CurrentSlideIndex,
  SlideArrow,
  SlideImg,
  SlideIndexStep,
  SlideIndexText,
  SlideWrapper,
  XSc,
} from "./HowToUsePage.styled";
import {
  ArrowLeftCircleFill,
  ArrowRightCircleFill,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export const HowToUsePage = () => {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      img: slide1,
    },
    {
      img: slide2,
    },
    { img: slide3 },
  ];

  const currentSlide = slides[slideIndex];

  useEffect(() => {
    Telegram.WebApp.expand();
  }, []);

  return (
    <div>
      <div className="h-6 flex justify-end">
        <XSc onClick={() => navigate("/")} />
      </div>
      <div className="flex justify-center">
        <Logo />
      </div>
      <SlideWrapper>
        {slideIndex !== 0 && (
          <SlideArrow
            pos="left"
            onClick={() => setSlideIndex((prev) => prev - 1)}
          >
            <ArrowLeftCircleFill />
          </SlideArrow>
        )}
        {slideIndex !== 2 && (
          <SlideArrow
            pos="right"
            onClick={() => setSlideIndex((prev) => prev + 1)}
          >
            <ArrowRightCircleFill />
          </SlideArrow>
        )}
        <CurrentSlideIndex>
          <SlideIndexText>{slideIndex + 1}</SlideIndexText>
          <SlideIndexStep>шаг</SlideIndexStep>
        </CurrentSlideIndex>
        <SlideImg src={currentSlide.img} />
      </SlideWrapper>
    </div>
  );
};
