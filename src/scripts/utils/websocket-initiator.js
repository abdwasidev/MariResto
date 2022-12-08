import NotificationHelper from './notification-helper';
import CONFIG from '../global/config';

const WebSocketInitiator = {
    init(url) {
            const webSocket = new WebSocket(url);
            webSocket.onmessage = this._onMessageHandler;
    },

    _onMessageHandler(message) {
        const restaurant = JSON.parse(message.data);

        NotificationHelper.sendNotification({
            title: `${restaurant.name} added in website catalog!`,
            options: {
                    body: restaurant.description,
                    image: `${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}`,
            },
        });
    },
};

export default WebSocketInitiator;
