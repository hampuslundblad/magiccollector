import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import {
  FormControl,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  fetchCardPrice,
  fetchCardPriceAndName,
  formatMutateQuery,
} from "../services/add-card-service";
import { useMutation } from "@apollo/client";
import { EDIT_COLLECTION } from "../api/queries";

type AddCardDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};
export const AddCardDialog = (props: AddCardDialogProps) => {
  const [open, setOpen] = useState(false);
  const [foil, setFoil] = useState("false");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const [editCollection, { data, loading, error }] =
    useMutation(EDIT_COLLECTION);

  useEffect(() => setOpen(props.isOpen), [props.isOpen]);

  const handleFoilChange = (event: SelectChangeEvent) => {
    setFoil(event.target.value as string);
  };
  const handleNameChange = (event: any) => {
    setName(event.target.value as string);
  };
  const handleQuantityChange = (event: any) => {
    setQuantity(event.target.value as string);
  };
  const handleClose = () => {
    props.handleClose();
    setOpen(false);
  };
  const handleAdd = async () => {
    handleClose();
    const response = await fetchCardPriceAndName(name);
    const query = formatMutateQuery(response.name, quantity, foil, response.price);
    editCollection({ variables: query });
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add card</DialogTitle>
        <DialogContent>
          <DialogContentText>Name</DialogContentText>
          <Input
            required
            autoFocus
            margin="dense"
            id="name"
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>Quantity</DialogContentText>
          <Input margin="dense" id="Quantity" onChange={handleQuantityChange} />
        </DialogContent>
        <DialogContent>
          <DialogContentText>Foil</DialogContentText>

          <FormControl sx={{ mt: 2, minWidth: 120 }} margin="dense" required>
            <Select value={foil} label="" onChange={handleFoilChange}>
              <MenuItem value="false">false</MenuItem>
              <MenuItem value="true">true</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddCardDialog;
