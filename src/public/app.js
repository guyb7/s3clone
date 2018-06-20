/* global axios, Blob, FormData */

const parseForm = e => {
  const elements = e.target.querySelectorAll('[name]')
  const form = {
    user: document.getElementById('user').value
  }
  for (let el of elements) {
    form[el.name] = el.value
    if (el.tagName === 'INPUT') {
      if (el.type === 'file') {
        form[el.name] = {
          file: el.files[0],
          value: el.value
        }
      } else if (el.type === 'checkbox') {
        form[el.name] = !!el.checked
      }
    }
  }
  return form
}

const uploadEl = document.getElementById('upload')
uploadEl.addEventListener('submit', async e => {
  e.preventDefault()
  const form = parseForm(e)
  if (!form.file.file) {
    return
  }
  const data = new FormData()
  data.append('file', form.file.file)
  try {
    const url = `/api/${form.user}/${form.file.file.name}?${form.public ? 'public=true' : ''}`
    clearOutput()
    const res = await axios({
      method: 'post',
      url,
      data,
      headers: {
        'X-AUTH': form.user
      }
    })
    showOutput(res)
  } catch (e) {
    showError(e)
  }
})

const downloadEl = document.getElementById('download')
downloadEl.addEventListener('submit', async e => {
  e.preventDefault()
  const form = parseForm(e)
  try {
    const url = `/api/${form.file}`
    clearOutput()
    const res = await axios({
      method: 'get',
      url,
      headers: {
        'X-AUTH': form.user
      },
      responseType: 'blob'
    })
    const blob = new Blob([res.data])
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = res.headers['x-filename']
    link.click()
  } catch (e) {
    showError(e)
  }
})

const metadataEl = document.getElementById('metadata')
metadataEl.addEventListener('submit', async e => {
  e.preventDefault()
  const form = parseForm(e)
  try {
    const url = `/api/${form.file}`
    clearOutput()
    const res = await axios({
      method: 'get',
      url,
      headers: {
        'X-AUTH': form.user
      },
      params: {
        metadata: 'true'
      }
    })
    showOutput(res)
  } catch (e) {
    showError(e)
  }
})

const modifyEl = document.getElementById('modify')
modifyEl.addEventListener('submit', async e => {
  e.preventDefault()
  const form = parseForm(e)
  try {
    const url = `/api/${form.file}`
    clearOutput()
    const res = await axios({
      method: 'put',
      url,
      params: {
        public: form.public
      },
      headers: {
        'X-AUTH': form.user
      }
    })
    showOutput(res)
  } catch (e) {
    showError(e)
  }
})

const deleteEl = document.getElementById('delete')
deleteEl.addEventListener('submit', async e => {
  e.preventDefault()
  const form = parseForm(e)
  try {
    const url = `/api/${form.file}`
    clearOutput()
    const res = await axios({
      method: 'delete',
      url,
      headers: {
        'X-AUTH': form.user
      }
    })
    showOutput(res)
  } catch (e) {
    showError(e)
  }
})

const outputEl = document.getElementById('output')

const clearOutput = () => {
  outputEl.innerHTML = ''
  outputEl.classList.remove('uk-form-success')
  outputEl.classList.remove('uk-form-danger')
}

const showError = e => {
  console.error(e)
  const res = e.response
  console.error(res)
  outputEl.classList.add('uk-form-danger')
  outputEl.classList.remove('uk-form-success')
  outputEl.innerHTML = `
${res.status} ${res.statusText}
${JSON.stringify(res.data, null, 2)}
  `
}

const showOutput = res => {
  console.log(res)
  outputEl.classList.add('uk-form-success')
  outputEl.classList.remove('uk-form-danger')
  outputEl.innerHTML = `
${res.status} ${res.statusText}
${JSON.stringify(res.data, null, 2)}
  `
}
