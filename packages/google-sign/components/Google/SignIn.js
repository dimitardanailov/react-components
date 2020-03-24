import React, {useEffect} from 'react'

function GoogleSignIn() {
  useEffect(() => {
    const cb = buttonSetup.bind({
      onSuccess,
      onFailure,
    })
    const promise = gapiSetup()
    promise.then(cb)
  }, [])

  return <div id="react-google-sign" />
}

/**
 * File follow recomendations from google:
 * https://developers.google.com/identity/sign-in/web/build-button
 */
function gapiSetup() {
  const promise = new Promise(resolve => {
    window.gapi.load('auth2', () => {
      const response = window.gapi.auth2.init({
        client_id: process.env.GOOGLE_ClIENT_ID,
      })

      resolve(response)
    })
  })

  return promise
}

function buttonSetup() {
  const setup = window.gapi.signin2.render('react-google-sign', {
    scope: 'profile email',
    width: 250,
    height: 50,
    longtitle: false,
    theme: 'dark',
    onsuccess: this.onSuccess,
    onfailure: this.onFailure,
  })

  return setup
}

/**
 * Documentation https://developers.google.com/identity/sign-in/web/people
 * @param {Object} googleUser
 */
function onSuccess(googleUser) {
  var profile = googleUser.getBasicProfile()
  console.log('ID: ' + profile.getId())
  console.log('Full Name: ' + profile.getName())
  console.log('Given Name: ' + profile.getGivenName())
  console.log('Family Name: ' + profile.getFamilyName())
  console.log('Image URL: ' + profile.getImageUrl())
  console.log('Email: ' + profile.getEmail())
}
function onFailure(error) {
  console.log(error)
}

export default GoogleSignIn
