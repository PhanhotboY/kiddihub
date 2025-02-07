import { useEffect, useState } from 'react';

import { IImage } from '~/interfaces/image.interface';
import { getImageUrl, toVnDateString } from '~/utils';

export default function ImageMetadata({ image }: { image: IImage }) {
  const [dimension, setDimension] = useState('0x0');
  const [size, setSize] = useState(0);
  const [type, setType] = useState('image/jpeg');

  useEffect(() => {
    (async () => {
      const img = new Image();
      const res = await fetch(getImageUrl(image.img_name));
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      img.onload = () => {
        setDimension(`${img.naturalWidth}x${img.naturalHeight}`);
        setSize(blob.size / 1024);
        setType(blob.type);
      };
      img.src = url;
    })();
  });

  return (
    <div className='flex flex-col gap-2'>
      <p>
        <b>Đã tải lên vào lúc: </b>
        {toVnDateString(image.createdAt)}
      </p>

      <p>
        <b>Tên tệp tin: </b>
        {image.img_name}
      </p>
      <p>
        <b>Loại tệp tin: </b>
        {type}
      </p>
      <p>
        <b>Dung lượng tệp: </b>
        {size.toFixed(1)} KB
      </p>
      <p>
        <b>Kích thước: </b>
        {dimension} px
      </p>
    </div>
  );
}
