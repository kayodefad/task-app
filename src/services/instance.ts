import axios from 'axios';

const API = 'https://stage.api.sloovi.com';

const admin = axios.create({
	baseURL: API,
});

const access_token =
	'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTc4NzUxNDgsIm5iZiI6MTY1Nzg3NTE0OCwianRpIjoiZmI4MDUyYjUtNDVlZC00NGI0LWE5MTktN2RkMzY5MjZkNzI3IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.EcGSWIN8mYfWLxrxUrFAX43ROudbyOmv1D985EFXMTo';

admin.defaults.headers.post['Content-Type'] = 'application/json';
admin.defaults.headers.post['Accept'] = 'application/json';

admin.interceptors.request.use(
	(config) => {
		if (config.headers) {
			config.headers['Authorization'] = `Bearer ${access_token}`;
			return config;
		}
	},
	(err) => {
		return Promise.reject(err);
	}
);

export default admin;
