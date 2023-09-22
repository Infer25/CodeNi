import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { ListCriterio } from "./item";

type ModelRadio = {
  handleChangeRadio: (event: React.ChangeEvent<HTMLInputElement>) => void;
  valueRadio: string;
  handleClose: () => void;
};
export const RadioGrupColum: React.FC<ModelRadio> = ({
  handleChangeRadio,
  valueRadio,
  handleClose,
}) => {
  return (
    <FormControl sx={{ paddingX: 3 }}>
      <FormLabel id="demo-radio-buttons-group-label">
        Criterios de busqueda
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="id"
        name="radio-buttons-groupColum"
        onChange={handleChangeRadio}
        value={valueRadio}
        onClick={handleClose}
      >
        {ListCriterio.map((x) => (
          <FormControlLabel
            key={x.id}
            value={x.valor}
            control={<Radio color="success"  />}
            label={x.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
