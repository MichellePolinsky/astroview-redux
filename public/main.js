let missions = []
let currentIndex = 0

// image api
const createUrl = nasaSite => {
  const API_URL = `https://sdg-astro-api.herokuapp.com/api/Nasa/apod`
  return API_URL
}
// spacex api
const createSpaceXUrl = spaceXSite => {
  const SPACE_API_URL = `https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming`
  return SPACE_API_URL
}
// json image response
const getImage = async nasaSite => {
  const response = await fetch(createUrl(nasaSite))
  const nasaData = await response.json()
  console.log(nasaData)
  const mainImage = (document.querySelector(
    '.nasa-image'
  ).style.backgroundImage = `url(${nasaData.url})`)
  document.querySelector('.copyright').textContent = nasaData.copyright
  document.querySelector('.image-title').textContent = nasaData.title
}
// json spacex response
const getLaunchCard = async spaceXSite => {
  const response = await fetch(createSpaceXUrl(spaceXSite))
  const spaceXData = await response.json()

  console.log(spaceXData)

  missions = spaceXData

  //  populate launch card
  document.querySelector('.launch-card').textContent =
    missions[currentIndex].mission_name
  document.querySelector('.launch-info').textContent =
    missions[currentIndex].details || 'no description available yet.'
  document.querySelector('.location').textContent =
    missions[currentIndex].launch_site.site_name_long
}

const nextMissionButton = () => {
  if (currentIndex > missions.length - 2) {
    currentIndex = 0
  } else {
    currentIndex++
  }
  getLaunchCard()
}
const previousMissionButton = () => {
  if (currentIndex > 0) {
    currentIndex--
  } else {
    currentIndex = missions.length - 1
  }
  getLaunchCard()
}
const main = () => {
  createUrl()
  getImage()
  createSpaceXUrl()
  getLaunchCard()
}
document.addEventListener('DOMContentLoaded', main)
document
  .querySelector('.right-arrow')
  .addEventListener('click', nextMissionButton)
document
  .querySelector('.left-arrow')
  .addEventListener('click', previousMissionButton)
