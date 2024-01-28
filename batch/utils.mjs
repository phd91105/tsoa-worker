export const uploadFile = async ({ file, url, id, auth }) => {
  const myHeaders = new Headers();
  myHeaders.append('accept', '*/*');
  myHeaders.append('authorization', auth);

  const formdata = new FormData();
  formdata.append('file', new Blob([file]), `${new Date().valueOf()}.pdf`);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata
  };
  const result = await fetch(`${url}/fileUpload/${id}`, requestOptions);

  if (result.status !== 204) {
    throw new Error('Upload failed');
  }
};

export const updateStatus = async ({ url, id, auth, status }) => {
  return fetch(`${url}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth
    },
    body: JSON.stringify({
      status
    })
  });
};
