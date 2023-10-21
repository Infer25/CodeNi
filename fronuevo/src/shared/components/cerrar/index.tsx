import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  ruta: string;
}
export const CerrarBtn: React.FC<Props> = ({ ruta }) => {
  const navigate = useNavigate();

  return (
    <Tooltip title={"Cerrar"}>
      <IconButton
        onClick={() => navigate(ruta, { replace: true })}
        size="large"
        sx={{
          border: 1,
          bgcolor: "red",
          color: "white",
          ":hover": {
            bgcolor: "red",
          },
        }}
      />
    </Tooltip>
  );
};


