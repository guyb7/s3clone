/* global axios */

axios.get('/api/status')
.then(res => {
  console.log(res.data)
})
.catch(err => {
  console.log(err)
})

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
    const res = await axios.post(url, data)
    console.log(res)
  } catch (e) {
    console.error(e)
  }
})
