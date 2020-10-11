import swal from 'sweetalert';
export const notify = (title, text) => (swal({
    title,
    text,
    buttons: {
        cancel: "Close",
    },
}))