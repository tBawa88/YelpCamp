//This component only contains the action function and no component

import { redirect } from "react-router-dom";

export const action = async () => {
    localStorage.removeItem('token');
    //and also remove the expiry date
    return redirect('/campgrounds')
}