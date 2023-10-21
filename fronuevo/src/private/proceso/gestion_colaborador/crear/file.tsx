import { Button } from '@mui/material';
import  { ChangeEvent, forwardRef } from 'react';

interface FileInputProps {
  value: FileList;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({ onChange }, ref) => {

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onChange(event); // Llama al controlador onChange cuando se selecciona un archivo
      console.log(event.target.files)
    }

  };

  return (
    <Button variant="contained" component="label">
      Subir Archivo
      <input type="file" hidden onChange={handleFileChange} ref={ref}  multiple/>
    </Button>
  );
});
