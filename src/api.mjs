export function fetchUser() {
  return fetch('/user').then((res) => {
    if (res.ok) return res.json();
    return res.json().then((err) => {
      throw new Error(`Request failed with status ${res.status}`);
    });
  });
}
