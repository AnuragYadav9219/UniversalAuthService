package com.univ.auth_service.auth.helpers;

import java.util.UUID;

public class UserHelper {

    public static UUID parseUUId(String uuid) {
        return UUID.fromString(uuid);
    }
}
