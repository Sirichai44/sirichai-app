import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const useFormReact = (schema: yup.ObjectSchema<any>) => {
  return useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });
};

export default useFormReact;
