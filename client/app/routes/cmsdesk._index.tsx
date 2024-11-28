import { toast as notify } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { json, useFetcher, useLoaderData } from '@remix-run/react';

import { getAppSettings } from '~/services/app.service';
import TextInput from '~/components/TextInput';
import ImageInput from '~/components/ImageInput';

export const meta = [
  {
    title: 'Cms Desk',
  },
];

export const loader = async () => {
  const appSettings = await getAppSettings();

  return json({ appSettings });
};

export default function CmsDesk() {
  const { appSettings } = useLoaderData<typeof loader>();

  const fetcher = useFetcher<any>();
  const faviconFetcher = useFetcher<any>({ key: 'favicon' });
  const logoFetcher = useFetcher<any>({ key: 'logo' });

  const [email, setEmail] = useState(appSettings.app_contact.email);
  const [phone, setPhone] = useState(appSettings.app_contact.phone);
  const [address, setAddress] = useState(appSettings.app_contact.address);
  const [logo, setLogo] = useState(appSettings.app_logo);
  const [title, setTitle] = useState(appSettings.app_meta.title);
  const [description, setDescription] = useState(
    appSettings.app_meta.description
  );
  const [keywords, setKeywords] = useState(appSettings.app_meta.keywords);
  const [favicon, setFavicon] = useState(appSettings.app_favicon);
  const [facebook, setFacebook] = useState(appSettings.app_social.facebook);
  const [instagram, setInstagram] = useState(appSettings.app_social.instagram);
  const [taxCode, setTaxCode] = useState(appSettings.app_taxCode);
  const [analytics, setAnalytics] = useState(appSettings.app_google.analytics);
  const [reCaptcha, setReCaptcha] = useState(appSettings.app_google.reCaptcha);

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(
      email !== appSettings.app_contact.email ||
        phone !== appSettings.app_contact.phone ||
        address !== appSettings.app_contact.address ||
        title !== appSettings.app_meta.title ||
        description !== appSettings.app_meta.description ||
        keywords !== appSettings.app_meta.keywords ||
        facebook !== appSettings.app_social.facebook ||
        instagram !== appSettings.app_social.instagram ||
        taxCode !== appSettings.app_taxCode ||
        analytics !== appSettings.app_google.analytics ||
        reCaptcha !== appSettings.app_google.reCaptcha
    );
  }, [
    email,
    phone,
    address,
    logo,
    title,
    description,
    keywords,
    favicon,
    facebook,
    instagram,
    taxCode,
    analytics,
    reCaptcha,
  ]);

  const toastIdRef = useRef<any>(null);

  useEffect(() => {
    switch (fetcher.state) {
      case 'submitting':
        toastIdRef.current = notify.loading('Loadding...', {
          autoClose: false,
        });

        break;

      case 'idle':
        if (fetcher.data?.toast && toastIdRef.current) {
          const { toast: toastData } = fetcher.data as any;
          notify.update(toastIdRef.current, {
            render: toastData.message,
            type: toastData.type || 'success', // Default to 'success' if type is not provided
            autoClose: 3000,
            isLoading: false,
          });
          toastIdRef.current = null;
          setIsChanged(false);
          break;
        }

        notify.update(toastIdRef.current, {
          render: fetcher.data?.toast.message,
          autoClose: 3000,
          isLoading: false,
          type: 'error',
        });

        break;
    }
  }, [fetcher.state]);

  useEffect(() => {
    switch (faviconFetcher.state) {
      case 'submitting':
        toastIdRef.current = notify.loading('Loadding...', {
          autoClose: false,
        });

        break;

      case 'idle':
        if (faviconFetcher.data?.toast && toastIdRef.current) {
          const { toast: toastData } = faviconFetcher.data as any;
          notify.update(toastIdRef.current, {
            render: toastData.message,
            type: toastData.type || 'success', // Default to 'success' if type is not provided
            autoClose: 3000,
            isLoading: false,
          });
          toastIdRef.current = null;
          fetch('/cmsdesk', {
            method: 'POST',
            body: new URLSearchParams({
              favicon: faviconFetcher.data?.imageUrl,
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          setFavicon(faviconFetcher.data?.imageUrl);
          break;
        }

        notify.update(toastIdRef.current, {
          render: faviconFetcher.data?.toast.message,
          autoClose: 3000,
          isLoading: false,
          type: 'error',
        });

        break;
    }
  }, [faviconFetcher.state]);

  useEffect(() => {
    switch (logoFetcher.state) {
      case 'submitting':
        toastIdRef.current = notify.loading('Loadding...', {
          autoClose: false,
        });

        break;

      case 'idle':
        if (logoFetcher.data?.toast && toastIdRef.current) {
          const { toast: toastData } = logoFetcher.data as any;
          notify.update(toastIdRef.current, {
            render: toastData.message,
            type: toastData.type || 'success', // Default to 'success' if type is not provided
            autoClose: 3000,
            isLoading: false,
          });
          toastIdRef.current = null;
          fetch('/cmsdesk', {
            method: 'POST',
            body: new URLSearchParams({ logo: logoFetcher.data?.imageUrl }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          setLogo(logoFetcher.data?.imageUrl);
          break;
        }

        notify.update(toastIdRef.current, {
          render: logoFetcher.data?.toast.message,
          autoClose: 3000,
          isLoading: false,
          type: 'error',
        });

        break;
    }
  }, [logoFetcher.state]);

  return (
    <div className='container grid grid-cols-12 gap-8'>
      <div className='col-span-4 flex flex-col gap-4'>
        <ImageInput
          name='logo'
          label='Logo'
          value={logo}
          fetcherKey='logo'
          action='/images/upload'
          onChange={(f) => {
            setLogo(f);
          }}
        />

        <ImageInput
          name='favicon'
          label='Favicon'
          value={favicon}
          fetcherKey='favicon'
          action='/images/upload'
          onChange={(f) => {
            setFavicon(f);
          }}
        />
      </div>

      <fetcher.Form
        className='col-span-8 grid grid-cols-8 gap-8'
        method='POST'
        action='/cmsdesk'
      >
        <div className='meta col-span-4 flex flex-col gap-4'>
          <div className='meta flex flex-col gap-4'>
            <TextInput
              name='title'
              value={title}
              label='Title'
              onChange={(t) => setTitle(t)}
            />
            <TextInput
              name='description'
              value={description}
              label='Description'
              onChange={(d) => setDescription(d)}
            />
            <TextInput
              name='keywords'
              value={keywords}
              label='Keywords'
              onChange={(k) => setKeywords(k)}
            />
          </div>

          <div className='contact flex flex-col gap-4'>
            <TextInput
              name='email'
              value={email}
              type='email'
              label='Email'
              onChange={(e) => setEmail(e)}
            />
            <TextInput
              name='phone'
              value={phone}
              label='Phone'
              pattern='[0-9]{10}'
              onChange={(p) => setPhone(p)}
            />
            <TextInput
              name='address'
              value={address}
              label='Address'
              onChange={(a) => setAddress(a)}
            />
          </div>
        </div>

        <div className='logo col-span-4 flex flex-col gap-4'>
          <TextInput
            name='analytics'
            value={analytics}
            label='Analytics'
            onChange={(a) => setAnalytics(a)}
          />

          <TextInput
            name='reCaptcha'
            value={reCaptcha}
            label='reCaptcha'
            onChange={(r) => setReCaptcha(r)}
          />

          <TextInput
            name='facebook'
            value={facebook}
            label='Facebook'
            onChange={(f) => setFacebook(f)}
          />
          <TextInput
            name='instagram'
            value={instagram}
            label='Instagram'
            onChange={(i) => setInstagram(i)}
          />

          <TextInput
            name='taxCode'
            value={taxCode}
            label='MST'
            onChange={(t) => setTaxCode(t)}
          />
        </div>

        <button
          className='middle col-span-8 none center w-full rounded-lg bg-blue-500 py-3 px-6 font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
          type='submit'
          disabled={!isChanged}
        >
          Cập nhật
        </button>
      </fetcher.Form>
    </div>
  );
}
