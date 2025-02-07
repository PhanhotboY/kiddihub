import React, { useEffect, useState } from 'react';
import ImagePreview from '../ImagePreview';
import { IImage } from '~/interfaces/image.interface';
import ImageUploader from './ImageUploader';
import { getImageUrl } from '~/utils';

interface ImagePickerProps {
  multiple?: boolean;
  selected?: string[];
  defaultActiveTab?: number;
  onClose: () => void;
  onSelect: (selectedImages: string[]) => void;
}

export default function ImagePicker({
  selected = [],
  multiple = false,
  defaultActiveTab = 2,
  onClose,
  onSelect,
}: ImagePickerProps) {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>(selected);
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleImageClick = (image: string) => {
    if (multiple) {
      setSelectedImages(
        (prev) =>
          prev.includes(image)
            ? prev.filter((img) => img !== image) // Deselect if already selected
            : [...prev, image] // Add to selection
      );
    } else {
      setSelectedImages([image]); // Allow only one selection
    }
  };

  const handleConfirm = () => {
    onSelect(selectedImages);
    onClose();
  };

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/data?getter=getImages');
      const images = (await res.json()) as IImage[];

      // setImages(images);
      setImages(images.map((image) => image.img_name));
    })();

    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', escapeHandler);

    return () => {
      document.removeEventListener('keydown', escapeHandler);
    };
  }, []);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-8 z-50'>
      <div className='flex flex-col bg-white gap-4 p-6 rounded-lg shadow-lg w-full h-full overflow-y-auto'>
        <div className='flex-grow grid grid-cols-12 divide-x divide-zinc-200 gap-4'>
          <div className='col-span-10 flex-grow w-full h-full divide-y divide-zinc-200'>
            <div className='w-full flex gap-4 px-4'>
              <button
                className={`-mb-[1px] rounded-t px-2 py-1 border-zinc-200 ${
                  activeTab === 1 ? 'border border-b-white' : ''
                }`}
                onClick={() => setActiveTab(1)}
                type='button'
              >
                Tải lên tệp mới
              </button>
              <button
                className={`-mb-[1px] rounded-t px-2 py-1 border-zinc-200 ${
                  activeTab === 2 ? 'border border-b-white' : ''
                }`}
                onClick={() => setActiveTab(2)}
                type='button'
              >
                Chọn từ thư viện Media
              </button>
            </div>

            {activeTab === 1 && (
              <ImageUploader
                handleImageUploaded={(images) => {
                  handleImageClick(images[0].img_name);
                  setImages((prev) => [...prev, images[0].img_name]);
                  setActiveTab(2);
                }}
              />
            )}
            {activeTab === 2 && (
              <div className='grid grid-cols-8 gap-4 pt-4'>
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-lg aspect-square cursor-pointer flex justify-center items-center transition-all ${
                      selectedImages.includes(image)
                        ? 'border-blue-500'
                        : 'border-gray-300'
                    }`}
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`Image ${index + 1}`}
                      className='max-w-full max-h-full'
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='col-span-2 h-full pl-4'>
            <ImagePreview src={selectedImages[0]} />
          </div>
        </div>

        <div className='h-fit flex justify-between'>
          <button
            onClick={onClose}
            className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition'
            type='button'
          >
            Hủy bỏ
          </button>

          <button
            onClick={handleConfirm}
            className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'
            type='button'
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
