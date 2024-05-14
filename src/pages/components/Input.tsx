import { Input, FormControl } from '@mui/joy';
import { styled } from '@mui/joy/styles';
import { CSSProperties, FC, forwardRef, useId } from 'react';
// import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { Controller } from 'react-hook-form';

export interface InputProps {
  control: any;
  trigger: any;
  nameField: string;
  type: string;
  error: any;
  disabled: boolean;
  defaultValue: string;
  innerLabel: boolean;
  triggerField?: string;
  placeholder?: string;
  style?: CSSProperties;
}

const GenInput: FC<InputProps> = (props) => {
  return (
    <Controller
      key={props.nameField}
      name={props.nameField}
      control={props.control}
      render={({ field }) => (
        <FormControl error={false}>
          <Input
            onChange={(e) => {
              field.onChange(e.target.value);
              if (props.triggerField) {
                props.trigger(props.triggerField);
              }
            }}
            disabled={props.disabled}
            error={!!props.error}
            defaultValue={props.defaultValue}
            // endDecorator={props.error !== '' ? ErrorInput(props.error) : null}
            // slots={{ input: InnerInput }}
            slots={{ input: props.innerLabel ? InnerInput : undefined }}
            slotProps={{
              input: {
                name: props.nameField.replace('_', ' '), // replace underscore with space
                placeholder: props.placeholder || '',
                type: props.type
              }
            }}
            size="sm"
            sx={{
              '--Input-minHeight': '36px',
              '--Input-radius': '6px',
              width: props.style?.width || '240px',
              margin: props.style?.margin
            }}
            className={`my-3 capitalize ${props.error !== '' ? 'input-focused-highlight-error' : 'input-focused-highlight'}`}
          />

          {props.error !== '' && (
            <div className="mt-1 text-xs font-light text-red-400 dark:text-red-600 max-w-60">
              {props.error}
            </div>
          )}
        </FormControl>
      )}
    />
  );
};

export default GenInput;

// const ErrorInput = (error: string) => {
//   return (
//     <Tooltip title={error} placement="top-end" variant="outlined" sx={{ maxWidth: '240px' }} arrow>
//       <InfoOutlined style={{ color: '#f87171' }} />
//     </Tooltip>
//   );
// };
const StyledInput = styled('input')({
  border: 'none', // remove the native input border
  minWidth: 0, // remove the native input width
  outline: 0, // remove the native input outline
  padding: 0, // remove the native input padding
  paddingTop: '1em',
  flex: 1,
  color: 'inherit',
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontStyle: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  textOverflow: 'ellipsis',
  '&::placeholder': {
    opacity: 0,
    transition: '0.1s ease-out'
  },
  '&:focus::placeholder': {
    opacity: 1
  },
  '&:focus ~ label, &:not(:placeholder-shown) ~ label, &:-webkit-autofill ~ label': {
    top: '0.2rem',
    fontSize: '0.75rem'
  },
  '&:focus ~ label': {
    color: 'var(--Input-focusedHighlight)'
  },

  '&:-webkit-autofill': {
    alignSelf: 'stretch', // to fill the height of the root slot
    transition: 'background-color 5000s ease-in-out 0s',
    WebkitTextFillColor: 'var(--text-color)'
  },
  '&:-webkit-autofill:not(* + &)': {
    marginInlineStart: 'calc(-1 * var(--Input-paddingInline))',
    paddingInlineStart: 'var(--Input-paddingInline)',
    borderTopLeftRadius: 'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
    borderBottomLeftRadius: 'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))'
  }
});

const StyledLabel = styled('label')(({ theme }) => ({
  position: 'absolute',
  lineHeight: 1,
  top: 'calc((var(--Input-minHeight) - 0.75em) / 2)',
  // color: theme.vars.palette.text.tertiary,
  color: 'var(--Input-focusedHighlight)',
  fontWeight: theme.vars.fontWeight.sm,
  fontSize: '0.9rem'
  // transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)'
}));

const InnerInput = forwardRef<HTMLInputElement, JSX.IntrinsicElements['input']>(
  function InnerInput(props, ref) {
    const id = useId();
    return (
      <>
        <StyledInput {...props} ref={ref} id={id} />
        <StyledLabel htmlFor={id}>{props.name}</StyledLabel>
      </>
    );
  }
);
