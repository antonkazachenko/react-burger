export function setCookie(
  name: string,
  value: string,
  props: { [key: string]: string | number | Date | boolean } = {},
) {
  // eslint-disable-next-line no-param-reassign
  props = {
    path: '/',
    ...props,
  };

  let exp = props.expires;
  if (exp && typeof exp === 'number') {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    // eslint-disable-next-line no-multi-assign,no-param-reassign
    exp = props.expires = d;
  }

  if (exp && exp instanceof Date) {
    // eslint-disable-next-line no-param-reassign
    props.expires = exp.toUTCString();
  }
  // eslint-disable-next-line no-param-reassign
  value = encodeURIComponent(value);
  let updatedCookie = `${name}=${value}`;
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const propName in props) {
    updatedCookie += `; ${propName}`;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, '', { expires: -1 });
}
