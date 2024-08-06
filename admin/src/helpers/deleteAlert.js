import Swal from 'sweetalert2';
import callFetch from './callFetch';

function deleteAlert(e, url, id, t) {
    e.preventDefault();

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary me-2',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    return swalWithBootstrapButtons.fire({
        title: t('Are you sure?'),
        text: t("You won't be able to revert this!"),
        // icon: 'warning',
        showCancelButton: true,
        confirmButtonText: t('Yes, do it!'),
        cancelButtonText: t('Cancel')
    }).then((result) => {
        if (result.isConfirmed) {
            return callFetch(url + '/' + id, "POST", { '_method': 'DELETE' }, null).then((res) => {
                /*if (res.ok)
                    swalWithBootstrapButtons.fire(
                        t('Success!'),
                        t('Your action has succeeded.'),
                        'success'
                    );
                else
                    swalWithBootstrapButtons.fire(
                        t('Error!'),
                        t('Unable to complete your action'),
                        'error'
                    );*/
            });
        }
    });
};

export default deleteAlert;
