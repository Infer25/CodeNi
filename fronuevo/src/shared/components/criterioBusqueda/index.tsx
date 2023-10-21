import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
  } from "@mui/material";
  import React from "react";


  type ModelRadioItem = {
        id: number,
      valor: string,
      label: string,
      placeholder:string
    
  };
  type ModelRadio = {
    handleChangeRadio: (event: React.ChangeEvent<HTMLInputElement>) => void;
    valueRadio: string;
    handleClose: () => void;
    itemList:ModelRadioItem[]

  };
  export const RadioGrupCriterio: React.FC<ModelRadio> = ({
    handleChangeRadio,
    valueRadio,
    handleClose,
    itemList
  }) => {
    return (
      <FormControl sx={{ paddingX: 3 }} >
        <FormLabel id="demo-radio-buttons-group-label">
          Criterios de busqueda
        </FormLabel>
        <RadioGroup
         //aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="_"
          name="radio-buttons-groupColum"
          onChange={handleChangeRadio}
          value={valueRadio}
          onClick={handleClose}
        >
          {itemList.map((x) => (
            <FormControlLabel
              key={x.id}
              value={x.valor}
              control={<Radio color="success"    />}
              label={x.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  };
  