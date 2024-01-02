import { toast } from 'react-toastify';

export const byId = (id: string) => document.getElementById(id);

export const inputNode = id => document.getElementById(id) as HTMLInputElement;

export const cleanInputs = (tagId: string) => {
  // todo textarea
  const inputs = document.getElementsByTagName('input');

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.includes(tagId)) {
      inputs[i].value = inputs[i].value.replace(tagId, '');
    }
  }
};

export const resetNumberInput = (inputName: string) => {
  const input = document.getElementsByName(inputName)[0] as HTMLInputElement;
  if (input) {
    input.value = '';
  }
};

export const downloadXlsFile = (data: Blob, fileName: string) => {
  if (!data.size) {
    toast.info('No data for these days');
    return;
  }
  const url = window.URL.createObjectURL(data);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = `${fileName}.xlsx`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
