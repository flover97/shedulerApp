import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TicketEditModal = ({ open, closeModal }) => {
  return (
    <Modal 
      open={open}
      onClose={closeModal}
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Text in a modal
        </Typography>
      </Box>
    </Modal>
  );
}

export default TicketEditModal;