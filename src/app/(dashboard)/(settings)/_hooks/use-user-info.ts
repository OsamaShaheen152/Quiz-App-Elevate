import { getUserInfo } from "@/lib/apis/user.api";
import { useQuery } from "@tanstack/react-query";

export function useUserInfo() {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });
}
