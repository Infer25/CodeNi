import { useMutation } from "@tanstack/react-query";
import { ServicesLogin } from "../service";

const { auth } = ServicesLogin;

export function useFetchAuth() {
  return useMutation({
    mutationFn: auth,
  });
}
