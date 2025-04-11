import ThemeProvider from "./ThemeProvider";
// import { useDispatch } from "react-redux";
// import { useGetUserByTokenQuery } from "../../redux/features/Users/userApi";
// import { setUser } from "../../redux/features/Auth/authSlice";

const AuthProvider = ({ children }) => {
  //   const dispatch = useDispatch();
  //   const { data, isLoading, error } = useGetUserByTokenQuery();

  //   useEffect(() => {
  //     if (!isLoading && data) {
  //       dispatch(
  //         setUser({
  //           user: data?.data || null,
  //         })
  //       );
  //     }
  //   }, [data, isLoading]);

  // Add loading and error UI logic when implementing the query
  // if (isLoading) return <LoadingSpinner />;
  // if (error) return <ErrorMessage />;

  return <ThemeProvider>{children}</ThemeProvider>;
};

export default AuthProvider;
