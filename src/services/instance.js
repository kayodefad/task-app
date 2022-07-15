import axios from "axios";
import * as authService from "./authService";

const API = "https://stage.api.sloovi.com";

const admin = axios.create({
	baseURL: API,
});

admin.defaults.headers.post["Content-Type"] = "application/json";
admin.defaults.headers.post["Accept"] = "application/json";

admin.interceptors.request.use(
	(config) => {
		const token = authService.getToken();
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

export default admin;
