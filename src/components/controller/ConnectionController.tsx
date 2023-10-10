import React from "react";

import ConnectionView from "../view/ConnectionView";

import { User } from "../entity/User";
import config from "../../config";

  interface Props {
    user: User | null;
    setUser: (user: User | null) => void;
  }

const ConnectionController: React.FC<Props> = (props) => {
   // const backUrl = "http://localhost:8089/api/auth";
    const backUrl = `${config.apiUrl}/auth`

    function fetchUser(login: string, password: string) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: login, password: password })
        };
        fetch(`${backUrl}/login`, requestOptions)
            .then(response => response.json())
            .then(json => {
                const userObject = {
                token: json.token,
                id: json.id,
                username: json.username,
                firstName: json.firstName,
                lastName: json.lastName,
                roles: json.roles.map((role: { id: number; name: string }) => ({ id: role.id, name: role.name })),
                enabled: json.enabled,
                tokenType: json.tokenType,
                savedAt: new Date().getTime()  // sauvegarder le timestamp actuel
                }
                localStorage.setItem('user', JSON.stringify(userObject))
                props.setUser(userObject)
            } )    
    }

    return (
        <ConnectionView fetchUser={fetchUser} />
    )
}

export default ConnectionController;
