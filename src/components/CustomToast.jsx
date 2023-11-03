import { toast } from 'react-toastify';

function CustomToasty({ text, status }) {
  if (status === "success") {
    toast.success(text, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } else if (status === "error") {
    toast.error(text, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } else {
    
  }

  return null;
}

export default CustomToasty;
