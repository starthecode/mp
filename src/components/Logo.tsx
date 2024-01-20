import { FunctionComponent, useMemo, type CSSProperties } from "react";

type LogoType = {
  nFTMarket?: string;
  sygnet?: string;

  /** Style props */
  logoPosition?: CSSProperties["position"];
  logoTop?: CSSProperties["top"];
  logoLeft?: CSSProperties["left"];
};

const Logo: FunctionComponent<LogoType> = ({
  nFTMarket,
  sygnet,
  logoPosition,
  logoTop,
  logoLeft,
}) => {
  const logoStyle: CSSProperties = useMemo(() => {
    return {
      position: logoPosition,
      top: logoTop,
      left: logoLeft,
    };
  }, [logoPosition, logoTop, logoLeft]);

  return (
    <div className="w-[213px] h-[34px]" style={logoStyle}>
      <img
        className="absolute h-[59.9%] w-[75.2%] top-[18.09%] right-[0.59%] bottom-[22.01%] left-[24.2%] max-w-full overflow-hidden max-h-full object-cover"
        alt=""
        src={nFTMarket}
      />
      <img
        className="absolute h-full w-[15.96%] top-[0%] right-[84.04%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
        alt=""
        src={sygnet}
      />
    </div>
  );
};

export default Logo;
