import { forwardRef, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const maxResolution = 2500;

const maxScale = Math.floor(
  maxResolution / (window.innerWidth * window.devicePixelRatio)
);

console.log(maxScale);

export default function BasicViewer() {
  const imgRef = useRef();
  const scaleRef = useRef({
    scale: 1,
    positionX: 0,
    positionY: 0,
  });

  function onTransformEnd() {
    const deviceWidth = window.innerWidth;
    const dpr = window.devicePixelRatio || 1;

    const scaledWidth = deviceWidth * scaleRef.current.scale;
    const requiredImgWidth = scaledWidth * dpr;

    const viewportWidth = (100 / deviceWidth) * scaledWidth;

    const urlFragments = imgRef.current.currentSrc.split("/");
    const imgName = urlFragments[urlFragments.length - 1];
    const nameFragments = imgName.split("_");
    const sizeFragments = nameFragments[nameFragments.length - 1].split(".");

    const currentSrcWidth = isNaN(Number(sizeFragments[0]))
      ? imgRef.current.naturalWidth
      : Number(sizeFragments[0]);

    console.log(
      "curr src width: ",
      currentSrcWidth,
      "\n required width: ",
      requiredImgWidth,
      "\n viewport: ",
      viewportWidth,
      "\n scale: ",
      scaleRef.current.scale,
      "\n device width: ",
      deviceWidth,
      "\n dpr",
      dpr
    );
    if (currentSrcWidth < requiredImgWidth) {
      imgRef.current.sizes = viewportWidth + "vw";
    }
  }

  return (
    <TransformWrapper
      initialScale={1}
      maxScale={maxScale < 1 ? 1 : maxScale}
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
