// hooks
import { useState, useEffect } from 'react';

// utils
import PropTypes from 'prop-types';

const PasswordInput = ({
  id,
  label = 'Password',
  isInvalid,
  ...props
}: {
  id: string;
  label?: string;
  isInvalid?: boolean;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (e: any) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    props.value === '' && setIsPasswordVisible(false);
  }, [props.value]);

  return (
    <div className='field-wrapper'>
      <label
        className='block text-sm font-semibold leading-6 text-black'
        htmlFor={id}
      >
        {label}
      </label>
      <div className='relative'>
        <input
          id={id}
          name={id}
          type={isPasswordVisible ? 'text' : 'password'}
          autoComplete='current-password'
          className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 focus:outline-none'
          {...props}
        />
        <button
          className='field-btn'
          onClick={togglePasswordVisibility}
          type='button'
          aria-label='Toggle password visibility'
        >
          <i
            className={`icon icon-eye${
              isPasswordVisible ? '-regular' : '-slash-regular'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

PasswordInput.propTypes = {
  innerRef: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  isInvalid: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default PasswordInput;
