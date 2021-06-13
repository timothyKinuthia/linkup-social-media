

export const sendNotifications = (body, icon, url, title) => {
    let options = {
        body, icon
    }

    let n = new Notification(title, options);

    n.onclick = evt => {
        evt.preventDefault();
        
        window.open(url, '_blank')
    }
}