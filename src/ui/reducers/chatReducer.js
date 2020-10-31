import produce from 'immer';
import {
    OPEN_CHAT,
} from '../actions/chatActions';

const initialState = {
    currentChatId: null,
    currentChatType: null,
    currentContactId: null,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {

        case OPEN_CHAT: {
            return produce(state, (draft) => {
                draft.currentChatId = action.payload.chatId;
                draft.currentChatType = action.payload.type;
                draft.currentContactId = action.payload.contactId;
            });
        }

        default: {
            return state;
        }
    }
};

export default chatReducer;
