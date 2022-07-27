import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material";
import Root from "routes";
import { lightTheme } from "theme/lightTheme";
import PrerenderTailwind from "views/prerender/PrerenderTailwind";
import "rsuite/dist/rsuite.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "App.css";
import "style/index.scss";
import { toast, ToastContainer } from "react-toastify";
import Loader from "views/layout/Loader";

import "functions/Setup";

function App() {
  const loading = useSelector((state) => state?.data?.loading ?? false);
  const title = useSelector((state) => state?.data?.title ?? "");

  return (
    <>
      <PrerenderTailwind />
      <ThemeProvider theme={lightTheme}>
        <Root />
      </ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Loader statusTitle={title} isLoading={loading}/>
    </>
  );
}

export default App;
