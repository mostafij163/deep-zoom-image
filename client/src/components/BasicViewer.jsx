import { forwardRef, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const maxResolution = 2500;

export default function BasicViewer() {
  const maxScale = Math.round(maxResolution / window.innerWidth);

  const imgRef = useRef();
  const scaleRef = useRef({
    scale: 1,
    positionX: 0,
    positionY: 0,
  });

  function onTransformEnd() {
    const deviceWidth = window.innerWidth;
    const scaledWidth = deviceWidth * scaleRef.current.scale;
    const scaledVW = (100 / deviceWidth) * scaledWidth;

    const urlFragments = imgRef.current.currentSrc.split("/");
    const imgName = urlFragments[urlFragments.length - 1];
    const nameFragments = imgName.split("_");
    const sizeFragments = nameFragments[nameFragments.length - 1].split(".");

    const currentSrcWidth = isNaN(Number(sizeFragments[0]))
      ? imgRef.current.naturalWidth
      : Number(sizeFragments[0]);

    console.log("curr src width", currentSrcWidth);
    console.log("scaled vw", scaledVW);
    console.log(
      "pixel ratio",
      currentSrcWidth / scaledWidth,
      window.devicePixelRatio
    );

    if (currentSrcWidth / scaledWidth < window.devicePixelRatio) {
      imgRef.current.sizes = scaledVW + "vw";
    }
  }

  return (
    <TransformWrapper
      initialScale={1}
      maxScale={maxScale}
      onTransformed={(_, state) => {
        scaleRef.current = state;
      }}
      onZoomStop={onTransformEnd}
    >
      <ImgComponent ref={imgRef} />
    </TransformWrapper>
  );
}

const ImgComponent = forwardRef(function (_, ref) {
  //   const imgRef = useRef();

  //   useImperativeHandle(
  //     ref,
  //     () => {

  //       console.log("img src: ", currentSrcWidth);

  //       return {
  //         currentSrcWidth: currentSrcWidth,
  //         setSizes(sizes) {
  //           if (isNaN(sizes) && sizes <= 0) return;
  //           imgRef.current.sizes = sizes + "vw";
  //         },
  //       };
  //     },
  //     []
  //   );

  return (
    <TransformComponent>
      <img
        ref={ref}
        src="/../../public/images/cell.jpg"
        alt="Basic zoom"
        sizes="100vw"
        srcSet="
                ./../../public/images/cell_400.webp 400w,
                ./../../public/images/cell_800.webp 800w,
                ./../../public/images/cell_1200.webp 1200w,
                ./../../public/images/cell_2500.webp 2500w"
      />
    </TransformComponent>
  );
});
