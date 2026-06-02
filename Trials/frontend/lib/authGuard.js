export const requireAuth = (router) => {
  const token = getToken();

  if (!token) {
    router.push("/admin/login");
    return false;
  }

  return true;
};