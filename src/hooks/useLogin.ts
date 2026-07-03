import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/authApi";

export function useLogin() {
    return useMutation({
        mutationFn: loginUser,
    });
}
//logging is a POST request, so useMutation is a correct choice.
