/* eslint-disable prettier/prettier */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#1C1C1C",
    width: "100%",
    borderRadius: 20,
  },
  "& .MuiDialogContent-root": {
    border: 0,
    padding: "20px 32px",
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 3,
        textAlign: "center",
        color: "#fff",
        fontWeight: "700",
        fontSize: "18px",
        lineHeight: "21px",
        boxShadow:
          "0 5px 8px 0 rgba(0,0,0,0.2),0 5px 8px 0 rgba(0,0,0,0.19) !important",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#fff",
            fontSize: 40,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export interface CustomizedDialogsProps {
  title: string;
  children?: React.ReactNode;
  open: boolean;
  large: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CustomizedDialogs(props: CustomizedDialogsProps) {

  const { title, children, open, setOpen, large} = props;
  return (
    <div>
      <BootstrapDialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={large ? "lg" : "sm"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={() => setOpen(false)}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </BootstrapDialog>
    </div>
  );
}
