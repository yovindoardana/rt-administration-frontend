// src/lib/form.ts
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { TextField, SelectField, SubmitButton } from '~our-app/ui-library'; // sesuaikan path sebenarnya

// bikin context
export const { fieldContext, formContext } = createFormHookContexts();

// sekali saja: generator useAppForm dengan komponen UI kita
export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    SelectField, // komponen untuk <select>
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
