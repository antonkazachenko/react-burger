import request from '../../utils/apiUtils';

export const PASSWORD_RESET__REQUEST = 'PASSWORD_RESET__REQUEST';
export const PASSWORD_RESET__SUCCESS = 'PASSWORD_RESET__SUCCESS';
export const PASSWORD_RESET__FAILURE = 'PASSWORD_RESET__FAILURE';

export function passwordResetRequest(email) {
  return function (dispatch) {
    dispatch({
      type: PASSWORD_RESET__REQUEST,
    });
    request('/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (res.success) {
          dispatch({
            type: PASSWORD_RESET__SUCCESS,
          });
        } else {
          dispatch({
            type: PASSWORD_RESET__FAILURE,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: PASSWORD_RESET__FAILURE,
        });
      });
  };
}
