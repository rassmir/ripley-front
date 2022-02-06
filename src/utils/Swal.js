import swal from 'sweetalert';

export const successfull = (text = '') => {
    swal({
        title: 'Hecho!',
        text: text === '' ? 'Creado Correctamente' : text,
        icon: 'success',
        timer: 2000,
        button: false
    });
};

export const fail = (text = '') => {
    swal({
        title: 'Error!',
        text: text === '' ? 'Algo salio mal, intentelo de nuevo' : text,
        icon: 'error',
        timer: 2000,
        button: false
    });
};
