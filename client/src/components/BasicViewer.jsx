import { useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const responsiveSizes = [400, 800, 1200, 2500];

export default function BasicViewer() {
  const imgRef = useRef();
  function onTransform() {}

  return (
    <TransformWrapper
      initialScale={1}
      //   initialPositionX={0}
      //   initialPositionY={110}
      //   minPositionX={200}
      //   minPositionY={400}
      //   onZoom={(ref, e) => console.log("on zoom: ", e)}
      //   onWheelStop={(ref, e) => console.log("on wheel", e)}
      onTransformed={(_, e) => {
        const deviceWidth = window.innerWidth;
        const scaledWidth = deviceWidth * e.scale;

        if (800 / scaledWidth < window.devicePixelRatio) {
          const nextImgSize = responsiveSizes.find(
            (size) => size / scaledWidth >= window.devicePixelRatio
          );

          if (imgRef.current) {
            imgRef.current.src = `/../../public/images/cell_${nextImgSize}.webp`;
          }
        }
      }}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <TransformComponent>
          <img
            ref={imgRef}
            src="/../../public/images/cell_800.webp"
            alt="Basic zoom"
            // sizes="100vw"
            // srcSet="
            //     ./../../public/images/cell_400.webp 400w,
            //     ./../../public/images/cell_800.webp 800w,
            //     ./../../public/images/cell_1200.webp 1200w,
            //     ./../../public/images/cell_2500.webp 2500w"
          />
        </TransformComponent>
      )}
    </TransformWrapper>
  );
}
