import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${process.env.REACT_APP_API_URL}/chatHub`)
    .withAutomaticReconnect()
    .build();

connection.start().catch(err => console.error(err));

export const sendMessage = (user, message) => {
    connection.invoke("SendMessage", user, message).catch(err => console.error(err));
};

export const onReceiveMessage = (callback) => {
    connection.on("ReceiveMessage", callback);
};

export const cleanupConnection = () => {
    connection.off("ReceiveMessage");
};

export { connection };
