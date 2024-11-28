import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';

import 'quill/dist/quill.snow.css';
import './index.css';
import { useNavigate } from '@remix-run/react';

export default function QuillEditor({
  value,
  onChange,
}: {
  value: any;
  onChange: (...args: any[]) => any;
}) {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const [quill, setQuill] = useState<Quill | null>(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (quillRef.current && !quill) {
      const editor = document.createElement('div');
      quillRef.current.appendChild(editor);

      const quillInstance = new Quill(editor, {
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['color', 'background'],
              ['link', 'image'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['clean'], // remove formatting
            ],
          },
        },
      });

      // Custom image upload handler
      (quillInstance.getModule('toolbar') as any).addHandler('image', () => {
        handleImageUpload(quillInstance); // Pass quillInstance directly
      });

      quillInstance.clipboard.dangerouslyPasteHTML(value);
      setLength(quillInstance.getLength() - 1);

      quillInstance.on('text-change', (delta) => {
        onChange(quillInstance.root.innerHTML);
        setLength(quillInstance.getLength() - 1);
      });
      setQuill(quillInstance);

      return () => {
        quillRef.current = document.createElement('div');
      };
    }
  }, [quillRef, quill, onChange]);

  // Custom image handler for Cloudinary
  const handleImageUpload = (quill: Quill) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('name', 'img');
    input.setAttribute('accept', 'image/*');

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        try {
          const range = quill.getSelection();
          const placeholderUrl = '/loading.gif'; // Replace with your placeholder image URL

          // Save the placeholder position to replace it later
          const placeholderIndex = range?.index || 0;

          // Insert placeholder image at the current selection
          quill.insertEmbed(placeholderIndex, 'image', placeholderUrl);

          const formData = new FormData();
          formData.append('img', file);
          formData.append('folder', 'blog');

          const res = await fetch('/images/upload', {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();

          quill.deleteText(placeholderIndex, 1); // Remove placeholder

          const altText = prompt('Enter alt text for the image:');
          const img = `<p><img src="${data.imageUrl}" alt="${
            altText || ''
          }" />${altText || ''}</p>`;

          quill.clipboard.dangerouslyPasteHTML(range?.index || 0, img);
        } catch (error) {
          console.error('Image upload failed:', error);
        }
      }
    };

    input.click();
  };

  return (
    <div id='quill-container' className='quill-container'>
      <div className='overflow-auto' ref={quillRef} />

      <div className='border border-t-0 border-zinc-300 text-sm py-2 flex justify-between items-center px-4'>
        {/* <label>
          Read Only:{' '}
          <input
            type="checkbox"
            value={readOnly}
            onChange={(e) => setReadOnly(e.target.checked)}
          />
        </label> */}
        <span className='controls-right'>{length} characters</span>
      </div>
    </div>
  );
}
