import css from '@styled-system/css';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react';
import styled from 'styled-components';
import {flexbox} from 'styled-system';

/**
 * Renders an `<Input/>` component.
 * @param {} props
 * @param {string} [props.children] - `<label/>` text.
 * @param {string} [props.id] - The `id` attribute for `<Input>` and `for` attribute for `<label>`.
 * @param {func} [props.onChange] - `useState` hook to call when updating `<Input>`.
 * @param {func} [props.onSubmit] - Handler to call when submitting `<Input>` (enables submission using Enter keydown).
 * @param {string} [props.type] - The `type` attribute for `<Input>`.
 */
function TextInput({
  children,
  id,
  onChange,
  onSubmit,
  type,
  ...props
}) {
  const onKeyDownCallback = useCallback((event) => {
    if (event.key === 'Enter' && onSubmit) {
      onSubmit(event.target.value);
    }
  }, [onSubmit]);

  const onChangeCallback = useCallback(
    (event) => onChange && onChange(event.target.value),
    [onChange],
  );

  return (
    <label htmlFor={id}>
      {children}
      <Input
        {...props}
        id={id}
        onChange={onChangeCallback}
        onKeyDown={onSubmit && onKeyDownCallback}
        type={type}
      />
    </label>
  );
}

TextInput.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  type: PropTypes.string,
};

TextInput.defaultProps = {
  id: null,
  onChange: null,
  onSubmit: null,
  type: 'text',
};

const Input = styled.input(
  flexbox,
  css({
    fontSize: [3],
    mx: [2],
    '&:focus': {
      outline: 'none',
    },
  }),
);

export default TextInput;
