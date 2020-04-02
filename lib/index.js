const axios = require('axios')
const querystring = require('querystring')

const INSTAGRAM_OAUTH_BASE_URL = 'https://api.instagram.com/oauth'
const INSTAGRAM_GRAPH_BASE_URL = 'https://graph.instagram.com'

class InstagramBasicDisplayApi {
	constructor(config) {
		this._appId = config.appId
		this._redirectUri = config.redirectUri
		this._appSecret = config.appSecret

		this._authorizationUrl = `${INSTAGRAM_OAUTH_BASE_URL}/authorize?${querystring.stringify({
			client_id: this._appId,
			redirect_uri: this._redirectUri,
			scope: 'user_profile,user_media',
			response_type: 'code'
		})}`
	}

	get authorizationUrl() {
		return this._authorizationUrl
	}

	retrieveToken(userCode) {
		const requestData = {
			client_id: this._appId,
			client_secret: this._appSecret,
			grant_type: 'authorization_code',
			redirect_uri: this._redirectUri,
			code: userCode
		}
		return axios
			.post(`${INSTAGRAM_OAUTH_BASE_URL}/access_token`, querystring.stringify(requestData))
			.then((res) => res.data)
	}

	retrieveLongLivedToken(accessToken) {
		const requestData = {
			grant_type: 'ig_exchange_token',
			client_secret: this._appSecret,
			access_token: accessToken
		}

		return axios
			.get(`${INSTAGRAM_GRAPH_BASE_URL}/access_token?${querystring.stringify(requestData)}`)
			.then((res) => res.data)
	}

	retrieveUserNode(accessToken, fields = 'id,username,account_type,media_count,media') {
		const requestData = {
			fields,
			access_token: accessToken
		}

		return axios.get(`${INSTAGRAM_GRAPH_BASE_URL}/me?${querystring.stringify(requestData)}`).then((res) => res.data)
	}

	retrieveUserMedia(
		accessToken,
		fields = 'caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username'
	) {
		const requestData = {
			fields,
			access_token: accessToken
		}

		return axios
			.get(`${INSTAGRAM_GRAPH_BASE_URL}/me/media?${querystring.stringify(requestData)}`)
			.then((res) => res.data)
	}

	retrieveMediaData(
		accessToken,
		mediaId,
		fields = 'caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username'
	) {
		const requestData = {
			fields,
			access_token: accessToken
		}

		return axios.get(`${INSTAGRAM_GRAPH_BASE_URL}/${mediaId}?${querystring.stringify(requestData)}`)
	}
}

module.exports = InstagramBasicDisplayApi
