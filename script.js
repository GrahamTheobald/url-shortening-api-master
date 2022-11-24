const resultTemplate = document.querySelector('#result_div')
const input = document.querySelector('[data-input]')
const inputWrapper = input.closest('.input__url-wrapper')
const submit = document.querySelector('[data-submit]')

const URL = `https://api.shrtco.de/v2/shorten?url=`
const LOCAL_STORAGE_KEY = 'url-shortening-api-'

submit.addEventListener('click', () => {
	shortenLink(input.value)
})
input.addEventListener('input', removeInvalid)

async function shortenLink(link) {
	removeInvalid()
	if (!link) {
		inputWrapper.classList.add('invalid')
	}
}

async function apiCall(link) {
	const response = await fetch(`${URL}${link}`)
	const data = await response.json()
	const { ok, result } = data
	if (!ok) return false
	return result
}

function removeInvalid() {
	inputWrapper.classList.remove('invalid')
}
const resultClone = resultTemplate.content.firstElementChild.cloneNode(true)