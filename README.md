# instagram-basic-display
> An unofficial implementation of the new instagram basic display API

## Getting Started
View https://developers.facebook.com/docs/instagram-basic-display-api/getting-started for a quick-start tutorial on how to create an instagram app.

## Example code
```javascript
const ig = new InstagramBasicDisplayApi({
    appId: '12345678910',
    redirectUri: 'https://example.org/',
    appSecret: '0123456765432134567876543'
})

console.log(ig.authorizationUrl)
// -> generates a user-code after successfull authorization

const code = 'usercode...'

ig.retrieveToken(code).then(data => {
    const token = data.access_token

    ig.retrieveUserNode(token).then(data => {
        console.log(data)
    })
})
```