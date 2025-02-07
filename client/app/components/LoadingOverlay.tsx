export default function LoadingOverlay() {
  return (
    <div className='fixed inset-0 bg-white/70 z-[9999]'>
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div role='status'>
          <div className='w-32 h-32'>
            <img
              className='w-full h-full object-contain'
              src='/assets/loading.gif'
              alt='Loading...'
            />
          </div>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    </div>
  );
}
