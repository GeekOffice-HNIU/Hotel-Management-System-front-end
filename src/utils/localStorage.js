const util = {
    setCookie(name, value, expiresDay = 3) {
        let date = new Date();
        date.setTime(date.getTime() + (expiresDay * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires;
    },

    getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    removeCookie(name) {
        let date = new Date();
        date.setTime(date.getTime() - 1);
        let expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + ";" + expires;
    }
}

export default util