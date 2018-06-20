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
  const data = new FormData()
  data.append('file', form.file.file)
  try {
    const url = `/api/${form.user}/${form.file.file.name}?${form.public ? 'public=true' : ''}`
    await axios.post(url, data)
  } catch (e) {
    console.error(e)
  }
})

const downloadEl = document.getElementById('download')
downloadEl.addEventListener('submit', async e => {
  e.preventDefault()
  const form = parseForm(e)
  try {
    const url = `/api/${form.file}`
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
    console.error(e)
  }
})

const modifyEl = document.getElementById('modify')
modifyEl.addEventListener('submit', async e => {
  e.preventDefault()
  const form = parseForm(e)
  try {
    const url = `/api/${form.file}`
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
    console.log(res)
  } catch (e) {
    console.error(e)
  }
})
