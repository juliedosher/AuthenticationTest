document.getElementById("btnGoogleSignIn").addEventListener("click", oauthSignIn);
document.getElementById("btnSignOut").addEventListener("click", signOut)

var auth2 = null

function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);
  
    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': '268242090257-pveleseck8f2fiu9a2kl84mp4b7krtfe',
                  'redirect_uri': 'https://thankful-meadow-02695d210.3.azurestaticapps.net',
                  'response_type': 'token',
                  'scope': 'https://www.googleapis.com/auth/userinfo.profile',
                  'include_granted_scopes': 'true',
                  'state': 'pass-through value'};
  
    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }
  
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
    console.log("reached")
  }

function init() {
  gapi.load('auth2', function() {
    auth2 = gapi.auth2.init();
  });
}


function signOut() {
  auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  auth2 = null
}
  
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());

  document.getElementById("pProfile").innerText = "Welcome, " + profile.getGivenName();
} else {
  document.getElementById("pProfile").innerText = "You are not currently logged in";
}
