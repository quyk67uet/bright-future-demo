import React, { useState } from "react";
import { Input } from "@/components/ui/input";

const ImageUpload = () => {
  const [images, setImages] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages((prevImages) => [...prevImages, ...fileArray]);
    }
  };

  const handleImageClick = (image: File) => {
    setSelectedImage(URL.createObjectURL(image));
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="mt-4">
      <Input
        type="file"
        accept="image/*"
        multiple
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        onChange={handleFileChange}
      />

      {/* Hiển thị hình ảnh đã tải lên */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg shadow-md cursor-pointer"
              onClick={() => handleImageClick(image)}
            />
            <button
              onClick={() =>
                setImages((prevImages) =>
                  prevImages.filter((_, i) => i !== index)
                )
              }
              className="absolute top-2 right-2 bg-red-500 text-[10px] text-white rounded-full p-1 hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Modal hiển thị ảnh phóng to */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-full"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-white text-black rounded-full p-1 hover:bg-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
