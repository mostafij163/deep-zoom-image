import { useEffect } from "react";
import OpenSeadragon from "openseadragon";

export default function DziViewer() {
  useEffect(() => {
    var viewer = OpenSeadragon({
      id: "openseadragon1",
      prefixUrl: "/openseadragon/images/",
      tileSources: "/path/to/my/image.dzi",
    });
  }, []);

  return <div id="openseadragon1"></div>;
}
