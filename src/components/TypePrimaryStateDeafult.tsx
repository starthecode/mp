import { FunctionComponent, useMemo, type CSSProperties } from "react";

type TypePrimaryStateDeafultType = {
  buttonText?: string;

  /** Style props */
  typePrimaryStateDeafultBackground?: CSSProperties["background"];
  typePrimaryStateDeafultBorder?: CSSProperties["border"];
  buttonTextColor?: CSSProperties["color"];
};

const TypePrimaryStateDeafult: FunctionComponent<
  TypePrimaryStateDeafultType
> = ({
  buttonText,
  typePrimaryStateDeafultBackground,
  typePrimaryStateDeafultBorder,
  buttonTextColor,
}) => {
  const typePrimaryStateDeafultStyle: CSSProperties = useMemo(() => {
    return {
      background: typePrimaryStateDeafultBackground,
      border: typePrimaryStateDeafultBorder,
    };
  }, [typePrimaryStateDeafultBackground, typePrimaryStateDeafultBorder]);

  const buttonTextStyle: CSSProperties = useMemo(() => {
    return {
      color: buttonTextColor,
    };
  }, [buttonTextColor]);

  return (
    <div
      className="rounded-xl [background:linear-gradient(104.42deg,_#4745d0,_#2a27c9)] shadow-[-4px_-4px_4px_rgba(0,_0,_0,_0.1)_inset,_4px_4px_4px_rgba(255,_255,_255,_0.1)_inset] flex flex-row items-center justify-start py-4 px-6 text-center text-base text-rest-white font-display-120"
      style={typePrimaryStateDeafultStyle}
    >
      <div
        className="relative tracking-[0.2px] font-semibold"
        style={buttonTextStyle}
      >
        {buttonText}
      </div>
    </div>
  );
};

export default TypePrimaryStateDeafult;
