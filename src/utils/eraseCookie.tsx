const eraseCookie = (key: any) => {
  document.cookie = key + "=; Max-Age=0 path=/; domain=" + window.location.host;
};

export default eraseCookie;
