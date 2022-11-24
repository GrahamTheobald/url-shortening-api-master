const resultTemplate = document.querySelector('#result_div')
const input = document.querySelector('[data-input]')
const inputWrapper = input.closest('.input__url-wrapper')
const submit = document.querySelector('[data-submit]')
const menuButton = document.querySelector('.nav__toggle-menu')
const menu = document.querySelector('.nav__containers')
const resultsContainer = document.querySelector('.input__results-container')

const URL = `https://api.shrtco.de/v2/shorten?url=`
const LOCAL_STORAGE_KEY = 'url-shortening-api-'

submit.addEventListener('click', () => {
	shortenLink(input.value)
})
input.addEventListener('input', removeInvalid)
menuButton.addEventListener('click', toggleMenu)

const storedUrls = getFromLocalStorage()
storedUrls.length > 0 &&
	storedUrls.forEach((url) => renderResult(url.short, url.original))

async function shortenLink(link) {
	removeInvalid()
	if (!link) {
		inputWrapper.classList.add('invalid')
		return
	}
	const data = await apiCall(link)
	if (!data) return
	const { full_short_link, original_link } = data
	renderResult(full_short_link, original_link)
	addToLocalStorage(full_short_link, original_link)
	clearInput()
}

function renderResult(short, original) {
	const resultClone = resultTemplate.content.firstElementChild.cloneNode(true)
	const _short = resultClone.querySelector('.result__return')
	const _original = resultClone.querySelector('.result__initial')
	_short.innerText = short
	_original.innerText = original
	resultsContainer.appendChild(resultClone)
}

async function apiCall(link) {
	const response = await fetch(`${URL}${link}`)
	const data = await response.json()
	const { ok, result } = data
	if (!ok) return false
	return result
}

function addToLocalStorage(short, original) {
	const urls = getFromLocalStorage()
	urls.push({ short, original })
	localStorage.setItem(`${LOCAL_STORAGE_KEY}-urls`, JSON.stringify(urls))
}

function getFromLocalStorage() {
	let urls = JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_KEY}-urls`))

	urls = urls ? urls : []
	return urls
}

function clearInput() {
	input.value = ''
}

function removeInvalid() {
	inputWrapper.classList.remove('invalid')
}

function toggleMenu() {
	menu.classList.toggle('reveal')
}
