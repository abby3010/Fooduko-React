import Axios from 'axios';

let config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
}

export const uploadNewRecipe = async (data) => {
    let response, error;
    await Axios.post("http://127.0.0.1:5000/new", data, config).then((res) => {
        response = res.data;
    }).catch((err) => {
        error = err;
    });
    return { response, error };
}

export const addNewUser = async (data) => {
    await Axios.post("http://127.0.0.1:5000/newuser", data, config).then((response) => {
        var data = response.data;
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });
}

export const getUserProfile = async (uid) => {
    let data = null;
    await Axios.get("http://127.0.0.1:5000/getuser/" + uid, config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'ContentType': 'application/json'
        }
    }).then((response) => {
        data = response.data.data;
    }).catch((error) => {
        console.log(error);
    });
    return data;
}

export const updateProfileImage = async (data) => {
    let success = false;
    let message = '';
    await Axios.post("http://127.0.0.1:5000/updateuserimage", data, config).then((response) => {
        let data = response.data;
        success = data.success
        message = data.message
    }).catch((error) => {
        console.log(error);
    });
    return { success, message }
}

export const getRecipe = async (id) => {
    let success = false;
    let message = '';
    let recipe;
    await Axios.get("http://127.0.0.1:5000/getrecipe/" + id, config).then((response) => {
        let data = response.data;
        success = data.success;
        message = data.message;
        recipe = data.recipe;
    }).catch((error) => {
        console.log(error);
    });
    return { success, message, recipe }
}

export const updateRecipe = async (data) => {
    let success = false;
    let message = '';
    await Axios.post("http://127.0.0.1:5000/updaterecipe", data, config).then((response) => {
        let data = response.data;
        success = data.success
        message = data.message
    }).catch((error) => {
        console.log(error);
    });
    return { success, message }
}

export const uploadContactDetails = async (data) => {
    let success = false;
    let message = '';
    await Axios.post("http://127.0.0.1:5000/contact", data, config).then((response) => {
        let data = response.data;
        success = data.success
        message = data.message
    }).catch((error) => {
        console.log(error);
    });
    return { success, message }
}

export const deleteRecipe = async (data) => {
    let success = false;
    let message = '';
    await Axios.post("http://127.0.0.1:5000/delete", data, config).then((response) => {
        let data = response.data;
        success = data.success
        message = data.message
    }).catch((error) => {
        console.log(error);
    });
    return { success, message }
}