import { Paper } from "@mui/material";

type ModelFormContainer = {
  children: JSX.Element | JSX.Element[];
};
export const FormContainer: React.FC<ModelFormContainer> = ({ children }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 4,
        marginX: 1,
        overflow:'auto'
      }}
      elevation={0}
    >
      {children}
    </Paper>
  );
};
