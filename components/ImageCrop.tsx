"use client";
import React, { useState, useRef } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { canvasPreview } from "./CanvasPreview";
import { useDebounceEffect } from "./EffectCrop";



function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}
export default function ImageCrop({
  close,
  img,
  formik,
  name,
}: {
  close: any;
  img: any;
  formik: any;
  name: any;
}) {
  // const onCloseModal = () => {
  //     close(false, croppedImageUrl); // Pass croppedImageUrl when closing the modal
  // };
  //   const [src, setSrc] = useState<any>(null || undefined);
  //   const imgRef = useRef(null);
  //   // const [imge,setImge] =  useState()
  //   const [crop, setCrop] = useState<any>({
  //     unit: "%", // Can be 'px' or '%'
  //     x: 25,
  //     y: 25,
  //     width: 50,
  //     height: 50,
  //   });
  //   const [croppedImageUrl, setCroppedImageUrl] = useState<any>(null);
  //   const [selectedFile, setSelectedFile] = useState<any>(null);
  //   // const [aspectRatio,setAspectRatio] =useState(4/3)

  //   const onSelectFile = (e: any) => {
  //     if (e.target.files && e.target.files.length > 0) {
  //       const file = e.target.files[0];
  //       setSelectedFile(file);
  //       const reader = new FileReader();
  //       reader.addEventListener("load", () => setSrc(reader.result));
  //       // console.log(src);

  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   const onCropChange = (crop: any) => {
  //     setCrop(crop);
  //   };
  //   function centerAspectCrop(
  //     mediaWidth: number,
  //     mediaHeight: number,
  //     aspect: number,
  //   ) {
  //     return centerCrop(
  //       makeAspectCrop(
  //         {
  //           unit: '%',
  //           width: 90,
  //         },
  //         aspect,
  //         mediaWidth,
  //         mediaHeight,
  //       ),
  //       mediaWidth,
  //       mediaHeight,
  //     )
  //   }
  //   const onImageCrop = () => {
  //     const canvas = document.createElement("canvas");
  //     const image = new Image();
  //     image.src = src;
  //     image.onload = () => {
  //       const scaleX = image.naturalWidth / image.width;
  //       const scaleY = image.naturalHeight / image.height;
  //       const ctx: any = canvas.getContext("2d");
  //       canvas.width = crop.width;
  //       canvas.height = crop.height;
  //       ctx.drawImage(
  //         image,
  //         crop.x * scaleX,
  //         crop.y * scaleY,
  //         crop.width * scaleX,
  //         crop.height * scaleY,
  //         0,
  //         0,
  //         crop.width,
  //         crop.height
  //       );
  //       const croppedImage = canvas.toDataURL("image/jpeg");
  //       setCroppedImageUrl(croppedImage);
  //       const base64WithoutPrefix = croppedImage.replace(
  //         /^data:image\/(jpeg|jpg);base64,/,
  //         ""
  //       );

  //       // Decode base64 to binary
  //       const binaryData = atob(base64WithoutPrefix);

  //       // Create a Uint8Array to hold binary data
  //       const arrayBuffer = new ArrayBuffer(binaryData.length);
  //       const uint8Array = new Uint8Array(arrayBuffer);

  //       // Populate the Uint8Array with binary data
  //       for (let i = 0; i < binaryData.length; i++) {
  //         uint8Array[i] = binaryData.charCodeAt(i);
  //       }

  //       // Create Blob object from Uint8Array
  //       const blob = new Blob([uint8Array], { type: "image/jpeg" });
  //       const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
  //       formik.setFieldValue(name, file);
  //       img(croppedImage);
  //       close(false);
  //     };
  //   };
  //   const handleDownload = () => {
  //     const a = document.createElement('a');
  //     a.href = src;
  //     a.download = 'cropped_image.jpg';
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   };
  // console.log(croppedImageUrl);
  // const handleRatioChange = (event: any) => {
  //   setAspectRatio(event.target.value);
  // };

  // ------------------React Crop ---------------------------

  const [imgSrc, setImgSrc] = useState<any>();
  const [croppedImageUrl, setCroppedImageUrl] = useState<any>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<any>();
  const [completedCrop, setCompletedCrop] = useState<any>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onDownloadCropClick() {
    const canvas = document.createElement("canvas");
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });
    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
          formik.setFieldValue(name, file);



      //     const croppedImage = canvas.toDataURL("image/jpeg");
      // setCroppedImageUrl(croppedImage);
      // const base64WithoutPrefix = croppedImage.replace(
      //   /^data:image\/(jpeg|jpg);base64,/,
      //   ""
      // );

      // // Decode base64 to binary
      // const binaryData = atob(base64WithoutPrefix);

      // // Create a Uint8Array to hold binary data
      // const arrayBuffer = new ArrayBuffer(binaryData.length);
      // const uint8Array = new Uint8Array(arrayBuffer);

      // // Populate the Uint8Array with binary data
      // for (let i = 0; i < binaryData.length; i++) {
      //   uint8Array[i] = binaryData.charCodeAt(i);
      // }

      // // Create Blob object from Uint8Array
      // const blobs = new Blob([uint8Array], { type: "image/jpeg" });
      // const files = new File([blobs], 'image.jpg', { type: 'image/jpeg' });
      // // formik.setFieldValue(name, files);
      img(file);
      close(false);



    // if (blobUrlRef.current) {
    //   URL.revokeObjectURL(blobUrlRef.current);
    // }
    // blobUrlRef.current = URL.createObjectURL(blob);

    // if (hiddenAnchorRef.current) {
    //   hiddenAnchorRef.current.href = blobUrlRef.current;
    //   hiddenAnchorRef.current.click();
    // }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(16 / 9);

      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, 16 / 9);
        setCrop(newCrop);
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  }

  /////////////////////////////////////////////////////

  return (
    <dialog id="my_modal_3" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Select & Crop Image</h3>
        <form method="dialog">
          <button
            onClick={() => close(false)}
            className="p-2 w-fit h-fit rounded-xl bg-zinc-200 absolute right-4 top-4"
          >
            <MdClose />
          </button>

          {/* -------------------react-crop--------------------------------------- */}

          <div className="Crop-Controls">
            <input
              className="mt-5"
              type="file"
              accept="image/*"
              onChange={onSelectFile}
            />
            {imgSrc && <div className="crop-div flex items-center justify-around p-4 rounded-xl bg-zinc-100 my-3">
              <div className="flex items-center gap-2">
                <label htmlFor="scale-input">Scale: </label>
                <input
                  id="scale-input"
                  type="number"
                  step="0.1" className=""
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                />
              </div>
              <div  className="flex items-center gap-2">
                <label htmlFor="rotate-input">Rotate: </label>
                <input
                  id="rotate-input"
                  type="number"
                  value={rotate}
                  onChange={(e) =>
                    setRotate(
                      Math.min(180, Math.max(-180, Number(e.target.value)))
                    )
                  }
                />
              </div>
              <div  className="flex gap-2">
                <label htmlFor="rotate-input">Toggle </label>
                <input type="checkbox" className="toggle" checked={!aspect} onChange={handleToggleAspectClick}/>
              </div>
              
            </div>}
            
          </div>
          {!!imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_:any, percentCrop:any) => setCrop(percentCrop)}
              onComplete={(c:any) => setCompletedCrop(c)}
              aspect={aspect}
              // minWidth={400}
              minHeight={100}
              // circularCrop
            >
              <Image width={400} height={400}
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
          {!!completedCrop && (
            <>
            <div className="p-2 bg-zinc-100 rounded-xl text-center my-2">Preview</div>
              <div>
                <canvas 
                  ref={previewCanvasRef}
                  style={{
                    border: "1px solid black",
                    objectFit: "contain",
                    width: completedCrop.width,
                    height: completedCrop.height,
                  }}
                />
                {/* <Image width={400} hi src={croppedImageUrl} alt="" /> */}
              </div>
              <div>
                <div className="flex justify-center w-full">
              <button
                type="button"
                className="p-2 px-10 text-white font-semibold rounded-md bg-zinc-900 mt-4"
                onClick={onDownloadCropClick}
              >
                Conform Edit
              </button>
              
            </div>
              </div>
            </>
          )}

          {/* -------------------react-crop--------------------------------------- */}
        </form>
        {/* {src && (
          <>
            <ReactCrop crop={crop} onChange={onCropChange}>
              <img src={src} />
            </ReactCrop>
            
            <div className="flex justify-center w-full">
              <button
                type="button"
                className="p-2 px-10 text-white font-semibold rounded-3xl bg-blue-500 mt-4"
                onClick={onImageCrop}
              >
                Crop Image
              </button>
              
            </div>
          </>
        )} */}
      </div>
    </dialog>
  );
}
