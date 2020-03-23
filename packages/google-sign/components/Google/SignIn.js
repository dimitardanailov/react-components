import React, {useEffect, useState} from 'react'

function GoogleSignIn() {
  const [googleApi, setApi] = useState(null)

  useEffect(() => {
    console.log('promise ....')
    setup()
  }, [googleApi])

  return <div id="react-google-sign" />
}

/**
 * File follow recomendations from google:
 * https://developers.google.com/identity/sign-in/web/build-button
 */
function setup() {
  window.gapi.load('auth2', () => {
    window.gapi.auth2
      .init({
        client_id: process.env.GOOGLE_CLIENT_SECRET,
      })
      .then(() => {
        window.gapi.signin2.render('react-google-sign', {
          scope: 'profile email',
          width: 250,
          height: 50,
          longtitle: false,
          theme: 'dark',
          onsuccess: onSuccess,
          onfailure: onFailure,
        })
      })
  })
}

function onSuccess(googleUser) {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName())
  console.log('Email: ' + googleUser.getBasicProfile().getEmail())
}
function onFailure(error) {
  console.log(error)
}

export default GoogleSignIn
