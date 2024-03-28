const serverUrl = "http://localhost:3000";
import axios from "axios";

export const getAlldataByGroupe = async (setAllData) => {
    try {
        const result = await axios.post(`${serverUrl}/data/groupes`);
        setAllData(result.data);
    } catch (error) {
        console.error("Error fetching data by group:", error);
    }
};

export const getAlldataByCountry = async (setDataByCountries) => {
    try {
        const result = await axios.post(`${serverUrl}/data/countries`);
        setDataByCountries(result.data);
    } catch (error) {
        console.error("Error fetching data by country:", error);
    }
};

export const signUpUser = async (email, password, name) => {
    try {
        await axios.post(`${serverUrl}/user/signup`, { email, password, name });
    } catch (error) {
        console.error("Error signing up user:", error);
    }
};

export const signInUser = async (email, password) => {
    try {
        const response = await axios.post(`${serverUrl}/user/signin`, { email, password });
        localStorage.setItem('token', response.data.token);
        window.location.reload();
    } catch (error) {
        console.error("Error signing in user:", error);
    }
};

export const authUserToken = async (token) => {
    try {
        const response = await axios.post(`${serverUrl}/user/auth`, { token });
        return response.data;
    } catch (error) {
        console.error("Error authenticating user token:", error);
        return null;
    }
};

export const logoutUser = () => {
    localStorage.removeItem("token");
    window.location.reload();
};

export const calculateAverageWinPercentage = (countryData) => {
    const totalTeams = 31;
    let totalWins = 0;
    countryData.forEach(team => {
        totalWins += parseInt(team.won);
    });
    const averageWinPercentage = (totalWins / (countryData.length * 6)) * 100;
    return averageWinPercentage.toFixed(2);
};

export const getFlagImageUrl = (countryName) => {
    if (countryName === "England") {
        return "/england_flag.png";
    }
    const countries = {
        "Germany": "DE",
        "Denmark": "DK",
        "Turkey": "TR",
        "England": "EN",
        "Netherlands": "NL",
        "France": "FR",
        "Spain": "ES",
        "Italy": "IT",
        "Portugal": "PT",
        "Austria": "AT",
        "Scotland": "SC",
        "Switzerland": "CH",
        "Serbia": "RS",
        "Belgium": "BE",
        "Ukraine": "UA"
    };

    const countryCode = countries[countryName];
    if (countryCode) {
        return `https://flagsapi.com/${countryCode}/flat/64.png`;
    } else {
        console.error("Unknown country:", countryName);
        return null; // or any default flag image URL or error handling logic
    }
};

export const editUser = async (data) => {
    const dataWithToken = { ...data, token: localStorage.getItem("token") };
    const res = await axios.put(`${serverUrl}/user/edit`, dataWithToken);
    localStorage.setItem("token", res.data.token);
    console.log(res.data);
};
