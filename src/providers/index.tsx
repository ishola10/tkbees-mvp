import StoreProvider from "./StoreProvider";
//This is for all global states providers that will be used across the app
export default function index({ children }: any) {
  return <StoreProvider>{children}</StoreProvider>;
}
