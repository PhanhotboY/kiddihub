import { useFetcher, useLoaderData } from '@remix-run/react';

import { loader, action } from '~/routes/cmsdesk+/pages+/new';
import { IPage, IPageDetail } from '~/interfaces/page.interface';
import Wrapper from './Wrapper';
import { useEffect, useState } from 'react';
import ImageInput from '../ImageInput';
import QuillEditor from '../QuillEditor/index.client';
import Hydrated from '../Hydrated';
import Select from '../../widgets/Select/index';
import TextInput from '../TextInput';

export default function LandingPageEditor({
  page,
  type,
  template,
  setTemplate,
}: {
  page?: IPageDetail;
  type: 'update' | 'create';
  template: string;
  setTemplate: (template: string) => void;
}) {
  const { pageTemplates, pageCategories } = useLoaderData<typeof loader>();

  const [isChanged, setIsChanged] = useState(false);
  const [content, setContent] = useState(page?.pst_content || '');
  const [title, setTitle] = useState(page?.pst_title || '');
  const [thumbnail, setThumbnail] = useState(page?.pst_thumbnail || '');
  const [category, setCategory] = useState(
    page?.pst_category._id || pageCategories[0].id
  );

  useEffect(() => {
    if (page) {
      setIsChanged(
        page.pst_title !== title ||
          JSON.stringify(JSON.parse(page.pst_content || '{}')?.blocks || []) !==
            JSON.stringify(JSON.parse(content || '{}')?.blocks || []) ||
          page.pst_thumbnail !== thumbnail ||
          page.pst_category._id !== category ||
          page.pst_template._id !== template
      );
    }
  }, [page, content, title, thumbnail, category, template]);

  return (
    <Wrapper fetcherKey={page?.id || 'new'} type={type} isChanged={isChanged}>
      <div className='col-span-12'>
        <TextInput
          label='Title'
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={(value) => setTitle(value)}
          autoComplete='title'
        />
      </div>

      {/* Thumbnail */}
      <div className='col-span-6 row-span-2'>
        <ImageInput
          label='Thumbnail'
          name='thumbnail'
          id='thumbnail'
          value={thumbnail}
          onChange={(value) => setThumbnail(value)}
        />
      </div>

      <div className='col-span-6'>
        <Select
          className='w-full'
          label='Danh mục'
          name='category'
          defaultValue={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {pageCategories.map((cat, i) => (
            <option key={i} value={cat.id}>
              {cat.pct_name}
            </option>
          ))}
        </Select>
      </div>

      <div className='col-span-6'>
        <Select
          className='w-full'
          label='Template'
          name='template'
          defaultValue={template}
          onChange={(e) => setTemplate(e.target.value)}
        >
          {pageTemplates.map((tem, i) => (
            <option key={i} value={tem.id}>
              {tem.ptp_name}
            </option>
          ))}
        </Select>
      </div>

      <div className='col-span-12'>
        <label className='block text-sm font-semibold leading-6 text-black'>
          Content
        </label>

        <Hydrated fallback={<div>Loading...</div>}>
          {() => (
            <QuillEditor
              value={content}
              onChange={(c) => {
                setContent(c);
              }}
            />
          )}
        </Hydrated>
        <input type='hidden' name='content' value={content} />
      </div>
    </Wrapper>
  );
}
