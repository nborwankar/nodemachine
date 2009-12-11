var sys = require('sys');

exports.testScenarios = [
	{
		name: "v3b13 false",
		appConfig: { canHandleResource: true, serviceAvailable: false },
		method: "GET",
		path: "/",
		headers: {},
		checkStatus: 503,
		checkStack: ["v3b13"],
//		checkHeaders: null,
//		checkBody: null
	},
	{
		name: "v3b12 false",
		appConfig: { canHandleResource: true, getKnownMethods: ["HEAD", "POST"] },
		method: "GET",
		path: "/",
		headers: {},
		checkStatus: 501,
		checkStack: ["v3b13", "v3b12"],
	},
	{
		name: "v3b12 true",
		appConfig: { canHandleResource: true, getKnownMethods: ["GET", "HEAD", "POST"], uriTooLong: true },
		method: "GET",
		path: "/",
		headers: {},
		checkStatus: 414,
		checkStack: ["v3b13", "v3b12", "v3b11"],
	},
	{
		name: "v3b11 true",
		appConfig: { canHandleResource: true, uriTooLong: true },
		method: "GET",
		path: "/",
		headers: {},
		checkStatus: 414,
		checkStack: ["v3b13", "v3b12", "v3b11"],
	},
	{
		name: "v3b10 false",
		appConfig: { canHandleResource: true, getAllowedMethods: ["HEAD", "POST"] },
		method: "GET",
		path: "/",
		headers: {},
		checkStatus: 405,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10"],
	},
	{
		name: "v3b10 true",
		appConfig: { canHandleResource: true, getAllowedMethods: ["GET", "HEAD", "POST"], malformedRequest: true },
		method: "GET",
		path: "/",
		headers: {},
		checkStatus: 400,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9"],
	},
	{
		name: "v3b9 true",
		appConfig: { canHandleResource: true, malformedRequest: true },
		method: "GET",
		path: "/",
		headers: {},
		checkStatus: 400,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9"],
	},
	{
		name: "v3b8 false",
		appConfig: { canHandleResource: true, isAuthorized: false, getAuthenticationHeader: "Basic realm=\"Test\"" },
		method: "GET",
		path: "/",
		headers: {},
		checkStatus: 401,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8"],
		checkHeaders: function (headers) { return(headers["www-authenticate"] == "Basic realm=\"Test\""); },
	},
	{
		name: "v3b7 true",
		appConfig: { canHandleResource: true, isForbidden: true },
		method: "GET",
		path: "/",
		headers: {},
		checkStatus: 403,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7"],
	},
	{
		name: "v3b6 true",
		appConfig: { canHandleResource: true, validContentHeaders: false },
		method: "GET",
		path: "/",
		headers: {},
		checkStatus: 501,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6"],
	},
	{
		name: "v3b5 false",
		appConfig: { canHandleResource: true, getAllowedMethods: ["PUT"], contentTypesAccepted: ["text/plain"] },
		method: "PUT",
		path: "/",
		headers: { "Content-type": "application/javascript" },
		checkStatus: 415,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5"],
	},
	{
		name: "v3b5 true",
		appConfig: { canHandleResource: true, getAllowedMethods: ["PUT"], contentTypesAccepted: ["application/octet-stream", "text/plain"], validEntityLength: false },
		method: "PUT",
		path: "/",
		headers: { "Content-type": "text/plain" },
		checkStatus: 413,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4"],
	},
	{
		name: "v3b5 true (*/*)",
		appConfig: { canHandleResource: true, getAllowedMethods: ["PUT"], contentTypesAccepted: ["application/octet-stream", "*/*"], validEntityLength: false },
		method: "PUT",
		path: "/",
		headers: { "Content-type": "text/plain" },
		checkStatus: 413,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4"],
	},
	{
		name: "v3b5 true ([])",
		appConfig: { canHandleResource: true, getAllowedMethods: ["PUT"], contentTypesAccepted: [], validEntityLength: false },
		method: "PUT",
		path: "/",
		headers: { "Content-type": "application/octet-stream" },
		checkStatus: 413,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4"],
	},
	{
		name: "v3b5 true (no content-type)",
		appConfig: { canHandleResource: true, getAllowedMethods: ["PUT", "GET"], contentTypesAccepted: ["application/octet-stream", "text/plain"], validEntityLength: false },
		method: "PUT",
		path: "/",
		headers: {},
		checkStatus: 413,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4"],
	},
	{
		name: "v3b4 false",
		appConfig: { canHandleResource: true, validEntityLength: false },
		method: "GET",
		path: "/",
		headers: {},
		checkStatus: 413,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4"],
	},
	{
		name: "v3b4 true",
		appConfig: { canHandleResource: true, validEntityLength: true, getAllowedMethods: ["OPTIONS", "GET"] },
		method: "OPTIONS",
		path: "/",
		headers: {},
		checkStatus: 200,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3"],
	},
	{
		name: "v3b3 true",
		appConfig: { canHandleResource: true, getAllowedMethods: ["OPTIONS", "GET"] },
		method: "OPTIONS",
		path: "/",
		headers: {},
		checkStatus: 200,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3"],
	},
	{
		name: "v3c4 false",
		appConfig: { canHandleResource: true, contentTypesProvided: ["text/plain", "text/html"] },
		method: "GET",
		path: "/",
		headers: { "Accept": "application/javascript" },
		checkStatus: 406,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3c4"],
	},
	{
		name: "v3c4 true (*/*)",
		appConfig: { canHandleResource: true, contentTypesProvided: ["text/plain", "text/html"], languagesProvided: ["de"] },
		method: "GET",
		path: "/",
		headers: { "Accept": "*/*", "Accept-language": "en" },
		checkStatus: 406,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3c4", "v3d4", "v3d5"],
	},
	{
		name: "v3c4 true ([])",
		appConfig: { canHandleResource: true, contentTypesProvided: [], languagesProvided: ["de"] },
		method: "GET",
		path: "/",
		headers: { "Accept": "text/html", "Accept-language": "en" },
		checkStatus: 406,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3c4", "v3d4", "v3d5"],
	},
	{
		name: "v3d5 false",
		appConfig: { canHandleResource: true, languagesProvided: ["de", "fr"] },
		method: "GET",
		path: "/",
		headers: { "Accept-language": "en" },
		checkStatus: 406,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3d5"],
	},
	{
		name: "v3d5 true",
		appConfig: { canHandleResource: true, languagesProvided: ["de", "fr"], charsetsProvided: ["iso-8859-5"] },
		method: "GET",
		path: "/",
		headers: { "Accept-language": "fr", "Accept-charset": "utf-8" },
		checkStatus: 406,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3d5", "v3e5", "v3e6"],
	},
	{
		name: "v3d5 true (*)",
		appConfig: { canHandleResource: true, languagesProvided: ["de", "fr"], charsetsProvided: ["iso-8859-5"] },
		method: "GET",
		path: "/",
		headers: { "Accept-language": "*", "Accept-charset": "utf-8" },
		checkStatus: 406,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3d5", "v3e5", "v3e6"],
	},
	{
		name: "v3d5 true ([])",
		appConfig: { canHandleResource: true, languagesProvided: [], charsetsProvided: ["iso-8859-5"] },
		method: "GET",
		path: "/",
		headers: { "Accept-language": "en", "Accept-charset": "utf-8" },
		checkStatus: 406,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3d5", "v3e5", "v3e6"],
	},
	{
		name: "v3e6 false",
		appConfig: { canHandleResource: true, charsetsProvided: ["iso-8859-5", "unicode-1-1"] },
		method: "GET",
		path: "/",
		headers: { "Accept-charset": "utf-8" },
		checkStatus: 406,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3e6"],
	},
	{
		name: "v3e6 true",
		appConfig: { canHandleResource: true, charsetsProvided: ["iso-8859-5", "unicode-1-1"], encodingsProvided: ["chunked"] },
		method: "GET",
		path: "/",
		headers: { "Accept-charset": "unicode-1-1", "Accept-encoding": "deflate" },
		checkStatus: 406,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3e6", "v3f6", "v3f7"],
	},
	{
		name: "v3e6 true (*)",
		appConfig: { canHandleResource: true, charsetsProvided: ["iso-8859-5", "unicode-1-1"], encodingsProvided: ["chunked"] },
		method: "GET",
		path: "/",
		headers: { "Accept-charset": "*", "Accept-encoding": "deflate" },
		checkStatus: 406,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3e6", "v3f6", "v3f7"],
	},
	{
		name: "v3e6 true ([])",
		appConfig: { canHandleResource: true, charsetsProvided: [], encodingsProvided: ["chunked"] },
		method: "GET",
		path: "/",
		headers: { "Accept-charset": "unicode-1-1", "Accept-encoding": "deflate" },
		checkStatus: 406,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3e6", "v3f6", "v3f7"],
	},
	{
		name: "v3f7 false",
		appConfig: { canHandleResource: true, encodingsProvided: ["chunked", "deflate"] },
		method: "GET",
		path: "/",
		headers: { "Accept-encoding": "compress" },
		checkStatus: 406,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3f7"],
	},
	{
		name: "v3f7 true",
		appConfig: { canHandleResource: true, encodingsProvided: ["chunked", "deflate"], resourceExists: false },
		method: "GET",
		path: "/",
		headers: { "Accept-encoding": "deflate", "If-match": "*" },
		checkStatus: 412,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3f7", "v3g7", "v3h7"],
	},
	{
		name: "v3f7 true (*)",
		appConfig: { canHandleResource: true, encodingsProvided: ["chunked", "deflate"], resourceExists: false },
		method: "GET",
		path: "/",
		headers: { "Accept-encoding": "*", "If-match": "*" },
		checkStatus: 412,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3f7", "v3g7", "v3h7"],
	},
	{
		name: "v3f7 true ([])",
		appConfig: { canHandleResource: true, encodingsProvided: [], resourceExists: false },
		method: "GET",
		path: "/",
		headers: { "Accept-encoding": "deflate", "If-match": "*" },
		checkStatus: 412,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3f7", "v3g7", "v3h7"],
	},
	{
		name: "v3g7 false",
		appConfig: { canHandleResource: true, resourceExists: false },
		method: "GET",
		path: "/",
		headers: { "If-match": "*" },
		checkStatus: 412,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3h7"],
	},
	{
		name: "v3h7 true",
		appConfig: { canHandleResource: true, resourceExists: false },
		method: "GET",
		path: "/",
		headers: { "If-match": "*" },
		checkStatus: 412,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3h7"],
	},
//	{//TODO
//		name: "v3h7 false",
//	},
	{
		name: "v3g7 true",
		appConfig: { canHandleResource: true, resourceExists: true, resourceEtag: "yyy" },
		method: "GET",
		path: "/",
		headers: { "If-match": "xxx" },
		checkStatus: 412,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3g9", "v3g11"],
	},
	{
		name: "v3g9 false",
		appConfig: { canHandleResource: true, resourceExists: true, resourceEtag: "yyy" },
		method: "GET",
		path: "/",
		headers: { "If-match": "xxx" },
		checkStatus: 412,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3g9", "v3g11"],
	},
	{
		name: "v3g9 true",
		appConfig: { canHandleResource: true, resourceExists: true, lastModified: new Date("2009/11/28 5:23:02 AM") },
		method: "GET",
		path: "/",
		headers: { "If-match": "*", "If-Unmodified-Since": "Fri, 28 Nov 1975 10:23:02 GMT" },
		checkStatus: 412,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3g9", "v3h10", "v3h11", "v3h12"],
	},
	{
		name: "v3g11 false",
		appConfig: { canHandleResource: true, resourceExists: true, resourceEtag: "yyy" },
		method: "GET",
		path: "/",
		headers: { "If-match": "xxx" },
		checkStatus: 412,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3g9", "v3g11"],
	},
	{
		name: "v3g11 true",
		appConfig: { canHandleResource: true, resourceExists: true, resourceEtag: "xxx", lastModified: new Date("2009/11/28 5:23:02 AM") },
		method: "GET",
		path: "/",
		headers: { "If-match": "xxx", "If-Unmodified-Since": "Fri, 28 Nov 1975 10:23:02 GMT" },
		checkStatus: 412,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3g9", "v3g11", "v3h10", "v3h11", "v3h12"],
	},
	{
		name: "v3h11 false",
		appConfig: { canHandleResource: true, resourceExists: true, getAllowedMethods: ["POST"] },
		method: "POST",
		path: "/",
		headers: { "If-Unmodified-Since": "kshfkjsdhfkdsjhfs", "If-None-Match": "*" },
		checkStatus: 412,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3h11", "v3i12", "v3i13", "v3j18"],
	},
	{
		name: "v3h12 true",
		appConfig: { canHandleResource: true, resourceExists: true, resourceEtag: "xxx", lastModified: new Date("2009/11/28 5:23:02 AM") },
		method: "GET",
		path: "/",
		headers: { "If-match": "xxx", "If-Unmodified-Since": "Fri, 28 Nov 1975 10:23:02 GMT" },
		checkStatus: 412,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3g9", "v3g11", "v3h10", "v3h11", "v3h12"],
	},
	{
		name: "v3h12 false",
		appConfig: { canHandleResource: true, lastModified: new Date("1975/11/28 5:23:02 AM") },
		method: "GET",
		path: "/",
		headers: { "If-Unmodified-Since": "Sat, 28 Nov 2009 10:23:02 GMT", "If-None-Match": "*" },
		checkStatus: 304,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3h11", "v3h12", "v3i12", "v3i13", "v3j18"],
	},
	{
		name: "v3i13 true",
		appConfig: { canHandleResource: true },
		method: "GET",
		path: "/",
		headers: { "If-None-Match": "*" },
		checkStatus: 304,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3i13", "v3j18"],
	},
	{
		name: "v3i13 false",
		appConfig: { canHandleResource: true, resourceEtag: "xxx" },
		method: "GET",
		path: "/",
		headers: { "If-None-Match": "xxx" },
		checkStatus: 304,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3i13", "v3k13", "v3j18"],
	},
	{
		name: "v3k13 true",
		appConfig: { canHandleResource: true, resourceEtag: "xxx" },
		method: "GET",
		path: "/",
		headers: { "If-None-Match": "xxx" },
		checkStatus: 304,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3i13", "v3k13", "v3j18"],
	},
	{
		name: "v3j18 false",
		appConfig: { canHandleResource: true, getAllowedMethods: ["POST"] },
		method: "POST",
		path: "/",
		headers: { "If-None-Match": "*" },
		checkStatus: 412,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3i13", "v3j18"],
	},
	{
		name: "v3j18 true (GET)",
		appConfig: { canHandleResource: true },
		method: "GET",
		path: "/",
		headers: { "If-None-Match": "*" },
		checkStatus: 304,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3i13", "v3j18"],
	},
	{
		name: "v3j18 true (HEAD)",
		appConfig: { canHandleResource: true },
		method: "HEAD",
		path: "/",
		headers: { "If-None-Match": "*" },
		checkStatus: 304,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3i13", "v3j18"],
	},
	{
		name: "v3k13 false",
		appConfig: { canHandleResource: true, resourceEtag: "yyy", lastModified: new Date("1975/11/28 5:23:02 AM") },
		method: "GET",
		path: "/",
		headers: { "If-None-Match": "xxx", "If-Modified-Since": "Sat, 28 Nov 2009 10:23:02 GMT" },
		checkStatus: 304,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3i13", "v3k13", "v3l13", "v3l14", "v3l15", "v3l17"],
	},
	{
		name: "v3l14 false",
		appConfig: { canHandleResource: true, getAllowedMethods: ['DELETE'], deleteResource: true, deleteComplete: false },
		method: "DELETE",
		path: "/",
		headers: { "If-Modified-Since": "smdgfshdgfhjsgdfjsnfd" },
		checkStatus: 202,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3l14", "v3m16", "v3m20", "v3m20b"],
	},
	{
		name: "v3l15 true",
		appConfig: { canHandleResource: true, getAllowedMethods: ['DELETE'], deleteResource: true, deleteComplete: false },
		method: "DELETE",
		path: "/",
		headers: { "If-Modified-Since": "Wed, 28 Nov 2029 10:23:02 GMT" },
		checkStatus: 202,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3l14", "v3l15", "v3m16", "v3m20", "v3m20b"],
	},
	{
		name: "v3l17 true",
		appConfig: { canHandleResource: true, lastModified: new Date("2009/11/28 5:23:02 AM"), getAllowedMethods: ['DELETE'], deleteResource: true, deleteComplete: false },
		method: "DELETE",
		path: "/",
		headers: { "If-Modified-Since": "Fri, 28 Nov 1975 10:23:02 GMT" },
		checkStatus: 202,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3l14", "v3l15", "v3l17", "v3m16", "v3m20", "v3m20b"],
	},
	{
		name: "v3l17 false",
		appConfig: { canHandleResource: true, lastModified: new Date("1975/11/28 5:23:02 AM") },
		method: "GET",
		path: "/",
		headers: { "If-Modified-Since": "Sat, 28 Nov 2009 10:23:02 GMT" },
		checkStatus: 304,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3l14", "v3l15", "v3l17"],
	},
	{
		name: "v3m16 true",
		appConfig: { canHandleResource: true, getAllowedMethods: ['DELETE'], deleteResource: true, deleteComplete: false },
		method: "DELETE",
		path: "/",
		headers: { },
		checkStatus: 202,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3m16", "v3m20", "v3m20b"],
	},
	{
		name: "v3m16 false",
		appConfig: { canHandleResource: true, deleteResource: true, deleteComplete: false },
		method: "GET",
		path: "/",
		headers: { },
		checkStatus: 200,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3m16", "v3n16", "v3o16", "v3o18"],
	},
	{
		name: "v3n16 false",
		appConfig: { canHandleResource: true, deleteResource: true, deleteComplete: false },
		method: "GET",
		path: "/",
		headers: { },
		checkStatus: 200,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3m16", "v3n16", "v3o16", "v3o18"],
	},
	{
		name: "v3n16 true",
		appConfig: { canHandleResource: true, deleteResource: true, deleteComplete: false, getAllowedMethods: ['POST'], postIsCreate: true, createPath: '/items' },
		method: "POST",
		path: "/",
		headers: { },
		checkStatus: 303,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3m16", "v3n16", "v3n11"],
	},
	{
		name: "v3n11 true",
		appConfig: { canHandleResource: true, deleteResource: true, deleteComplete: false, getAllowedMethods: ['POST'], postIsCreate: true, createPath: '/items' },
		method: "POST",
		path: "/",
		headers: { },
		checkStatus: 303,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3m16", "v3n16", "v3n11"],
	},
//	{//TODO
//		name: "v3n11 false",
//	},
	{
		name: "v3o16 false",
		appConfig: { canHandleResource: true, deleteResource: true, deleteComplete: false },
		method: "GET",
		path: "/",
		headers: { },
		checkStatus: 200,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3m16", "v3n16", "v3o16", "v3o18"],
	},
	{
		name: "v3o16 true",
		appConfig: { canHandleResource: true, deleteResource: true, deleteComplete: false, getAllowedMethods: ['PUT'], isConflict: true },
		method: "PUT",
		path: "/",
		headers: { },
		checkStatus: 409,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3m16", "v3n16", "v3o16", "v3o14"],
	},
	{
		name: "v3o14 true",
		appConfig: { canHandleResource: true, deleteResource: true, deleteComplete: false, getAllowedMethods: ['PUT'], isConflict: true },
		method: "PUT",
		path: "/",
		headers: { },
		checkStatus: 409,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3m16", "v3n16", "v3o16", "v3o14"],
	},
//	{//TODO
//	name: "v3o14 false",
//},
	{
		name: "v3o18 false",
		appConfig: { canHandleResource: true, deleteResource: true, deleteComplete: false },
		method: "GET",
		path: "/",
		headers: { },
		checkStatus: 200,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3m16", "v3n16", "v3o16", "v3o18"],
	},
	{
		name: "v3o18 true",
		appConfig: { canHandleResource: true, deleteResource: true, deleteComplete: false, multipleChoices: true },
		method: "GET",
		path: "/",
		headers: { },
		checkStatus: 300,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3m16", "v3n16", "v3o16", "v3o18"],
	},
	{
		name: "v3m20 false",
		appConfig: { canHandleResource: true, getAllowedMethods: ['DELETE'], deleteResource: true, deleteComplete: false },
		method: "DELETE",
		path: "/",
		headers: { },
		checkStatus: 202,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3m16", "v3m20", "v3m20b"],
	},
	{
		name: "v3o20 false",
		appConfig: { canHandleResource: true, getAllowedMethods: ['DELETE'], deleteResource: true, deleteComplete: true, responseEntityExists: false },
		method: "DELETE",
		path: "/",
		headers: { },
		checkStatus: 204,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3m16", "v3m20", "v3m20b", "v3o20"],
	},
	{
		name: "v3o20 true",
		appConfig: { canHandleResource: true, getAllowedMethods: ['DELETE'], deleteResource: true, deleteComplete: true, responseEntityExists: true },
		method: "DELETE",
		path: "/",
		headers: { },
		checkStatus: 200,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3m16", "v3m20", "v3m20b", "v3o20", "v3o18"],
	},
	{
		name: "Send ETag",
		appConfig: { canHandleResource: true, resourceEtag: "xxx" },
		method: "GET",
		path: "/",
		headers: { },
		checkStatus: 200,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3m16", "v3n16", "v3o16", "v3o18"],
		checkHeaders: function (headers) {
			return(headers["etag"] == "xxx");
		}
	},
	{
		name: "Send Expires",
		appConfig: { canHandleResource: true, resourceExpiration: new Date("Fri, 28 Nov 1975 10:23:02 GMT") },
		method: "GET",
		path: "/",
		headers: { },
		checkStatus: 200,
		checkStack: ["v3b13", "v3b12", "v3b11", "v3b10", "v3b9", "v3b8", "v3b7", "v3b6", "v3b5", "v3b4", "v3b3", "v3c3", "v3d4", "v3e5", "v3f6", "v3g7", "v3g8", "v3h10", "v3i12", "v3l13", "v3m16", "v3n16", "v3o16", "v3o18"],
		checkHeaders: function (headers) {
			return(headers["expires"] == "Fri, 28 Nov 1975 10:23:02 GMT");
		}
	},
];
//"Fri, 28 Nov 1975 10:23:02 GMT"
//"1975/11/28 5:23:02 AM"
//"Sat, 28 Nov 2009 10:23:02 GMT"
//"2009/11/28 5:23:02 AM"
