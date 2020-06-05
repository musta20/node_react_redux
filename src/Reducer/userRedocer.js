import {FETCH_POSTS,NEW_POST,GET_POST ,DELETE_POST ,UPDATE_POST} from "../Action/types";

const initialState = {
    items: [],
    item: {},
    itemdd: {},
    itemp:{}
}

export default function(state = initialState,action){
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                items:action.payload
            };

        case NEW_POST:
            return {
                ...state,
                item:action.payload
            };

        case GET_POST:
                return {
                    ...state,
                    itemp:action.payload
                };
            
        case DELETE_POST:
                    return {
                        ...state,
                        items:action.payload
                    };
         case UPDATE_POST:
                    return {
                        ...state,
                       items:action.payload
                        };
          
                    
        default:
            return state;
    }

}