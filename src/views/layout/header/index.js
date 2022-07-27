import { useDispatch, useSelector } from "react-redux";
import { Container, Drawer, Grid } from "@mui/material";
import Web3 from "web3";
import web3Modal from "functions/Web3Modal";
import { toast } from "react-toastify";
import LOGO from "assets/images/logo.svg";
import Vector from "assets/images/Vector.png";
import PhoneMenuIcon from "assets/images/PhoneMenu.svg";
import CloseIcon from "assets/images/closeIcon.svg";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CustomImage from "views/components/CustomImage";
import CustomText from "views/components/CustomText";
import { getGasPrice, loadCouncilData } from "functions/Utility";
import Badge from "@mui/material/Badge";

export default function Header({ ...props }) {
  const [phoneMenuShow, setPhoneMenuShow] = useState(false);
  const [phoneMenuClose, setPhoneMenuClsoe] = useState(false);
  const isAirDrop = false;
  const toggleDrawer = (show) => () => {
    setPhoneMenuShow(show);
  };
  const [invisible, setInvisible] = useState(false);
  const [navs, setNavs] = useState([
    { to: "/home", label: "Dashboard" },
    { to: "/investments", label: "Vault Investments" },
    { to: "/staking", label: "Staking" },
    { to: "/rewards", label: "Rewards" },
    { to: "/claim", label: "Burn Claim" },
    { to: "/airdrop", label: "Airdrop" },
  ]);

  useEffect(() => {
    setNavs((prev) => {
      if (isAirDrop) {
        let i = prev.findIndex((nav) => nav.to === "/airdrop");
        prev[i] = { ...prev[i], badge: true };
      }
      return [...prev];
    });
  }, [isAirDrop]);

  const NetID = 0x4;
  const [gasPrice, setGasPrice] = useState(0);
  const dispatch = useDispatch();
  const connectStatus = useSelector(
    (state) => state?.app?.isWalletConnect ?? false
  );
  const walletAddress = useSelector(
    (state) => state?.app?.coinbaseAddress ?? ""
  );
  const correctNet = useSelector((state) => state?.app?.isCorrectNet ?? false);
  const pathname = useLocation().pathname;

  const [active, setActive] = useState({ to: pathname });

  const handleActive = (value = {}) => setActive(value);
  const isWeb3Object = useSelector(
    (state) => state?.data?.isWeb3Object ?? false
  );

  const connectWallet = async () => {
    try {
      //  Web3Modal Connect
      const provider = await web3Modal.connect();
      //  Create Web3 instance
      const web3Object = new Web3(provider);
      window.web3Object = web3Object;
      dispatch({
        type: "SET_DATA",
        payload: (prev = {}) => ({
          ...(prev ?? {}),
          isWeb3Object: true,
        }),
      });
      const accounts = await web3Object.eth.getAccounts();
      const chainId = await web3Object.eth.net.getId();

      dispatch({
        type: "SET_APP",
        payload: (prev = {}) => ({
          ...(prev ?? {}),
          coinbaseAddress: accounts[0],
        }),
      });

      dispatch({
        type: "SET_APP",
        payload: (prev = {}) => ({ ...(prev ?? {}), isWalletConnect: true }),
      });

      dispatch({
        type: "SET_APP",
        payload: (prev = {}) => ({
          ...(prev ?? {}),
          isCorrectNet: chainId == NetID,
        }),
      });

      provider.on("accountsChanged", (accounts) => {
        dispatch({
          type: "SET_APP",
          payload: (prev = {}) => ({
            ...(prev ?? {}),
            coinbaseAddress: accounts[0],
          }),
        });
        dispatch({
          type: "SET_DATA",
          payload: (prev = {}) => ({
            ...(prev ?? {}),
            burnLizards: [],
          }),
        });

        dispatch({
          type: "SET_DATA",
          payload: (prev = {}) => ({
            ...(prev ?? {}),
            stakingLizards: [],
          }),
        });
      });

      provider.on("chainChanged", async (chainId) => {
        setGasPrice(await getGasPrice());
        dispatch({
          type: "SET_APP",
          payload: (prev = {}) => ({
            ...(prev ?? {}),
            isCorrectNet: chainId == NetID,
          }),
        });
      });
    } catch (e) {
      console.error(e);
      throw new Error("User denied wallet connection!");
    }
  };

  const handleConnection = async () => {
    try {
      if (!connectStatus) {
        await web3Modal.clearCachedProvider();
        await connectWallet();
        toast.success("Wallet Connected Successfully!");
      } else {
        dispatch({
          type: "RESET_APP",
        });
        localStorage.clear();
        toast.success("Wallet Disconnected Successfully!");
      }
    } catch (e) {
      toast.error(e);
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }],
      });
    } catch (e) {
      toast.error(e);
    }
  };

  const initData = async () => {
    await loadCouncilData(dispatch);
  };

  const initGasPrice = async () => {
    if (isWeb3Object) setGasPrice(await getGasPrice());
  };

  useEffect(() => {
    initGasPrice();
  }, [isWeb3Object]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
    initData();
  }, []);

  return (
    <div className="h-[64px] flex items-center">
      {phoneMenuShow !== true ? (
        <Container sx={{ maxWidth: 1200 }}>
          <Grid container className="items-center">
            <Grid item lg={2} md={2} sm={4} xs={4}>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <CustomImage src={LOGO} className="h-8"></CustomImage>
              </Grid>
            </Grid>
            <Grid
              item
              lg={7}
              md={7}
              // sm={0}
              // xs={0}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Grid container spacing={3} justifyContent="end">
                {navs.map((item, itemIndex) =>
                  item.badge ? (
                    <Grid item key={itemIndex}>
                      <Badge
                        variant="dot"
                        color="primary"
                        style={{ top: "-2px" }}
                      >
                        <Link
                          to={item?.to ?? "#"}
                          onClick={() => handleActive(item)}
                        >
                          <CustomText
                            transparent={
                              active?.to === item?.to && !!item?.to
                                ? false
                                : true
                            }
                            color="white"
                            className="text-baseft"
                          >
                            {item?.label ?? ""}
                          </CustomText>
                        </Link>
                      </Badge>
                    </Grid>
                  ) : (
                    <Grid item key={itemIndex}>
                      <Link
                        to={item?.to ?? "#"}
                        onClick={() => handleActive(item)}
                      >
                        <CustomText
                          transparent={
                            active?.to === item?.to && !!item?.to ? false : true
                          }
                          color="white"
                          className="text-baseft font-sans"
                        >
                          {item?.label ?? ""}
                        </CustomText>
                      </Link>
                    </Grid>
                  )
                )}
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              justifyContent={"flex-end"}
              lg={3}
              md={3}
              sm={8}
              xs={8}
            >
              <Grid
                item
                lg={7}
                md={7}
                sm={8}
                xs={8}
                className="flex justify-center"
              >
                {connectStatus && !correctNet && (
                  <button
                    onClick={switchNetwork}
                    className="border-solid border rounded-md border-btncolor px-3 py-2"
                  >
                    <CustomText>Switch Network</CustomText>
                  </button>
                )}
                {connectStatus && correctNet && (
                  <button
                    onClick={handleConnection}
                    className="border-solid border rounded-md bg-btncolor border-btncolor px-3 py-2"
                  >
                    <CustomText>
                      {walletAddress.substr(0, 5) +
                        "........." +
                        walletAddress.substr(-5)}
                    </CustomText>
                  </button>
                )}
                {!connectStatus && (
                  <button
                    onClick={handleConnection}
                    className="border-solid border rounded-md border-btncolor px-3 py-2"
                    // className={`border-solid border rounded-md bg-btncolor px-3 py-2 ${
                    //   buttonActive == "3" ? "bg-btncolor" : "bg-white bg-opacity-5"
                    // }`}
                  >
                    <CustomText>Connect Wallet</CustomText>
                  </button>
                )}
              </Grid>
              <Grid
                item
                container
                justifyContent={"space-around"}
                lg={3}
                md={3}
                // sm={0}
                // xs={0}
                sx={{ display: { xs: "none", md: "flex" } }}
                className="items-center border-solid border rounded-md border-btncolor px-3 py-1"
              >
                <Grid item>
                  <CustomImage src={Vector}></CustomImage>
                </Grid>
                <Grid item>
                  <CustomText>{parseInt(gasPrice / 10 ** 9)}</CustomText>
                </Grid>
              </Grid>
              <Grid
                item
                // lg={0}
                // md={0}
                sm={2}
                xs={2}
                sx={{
                  display: { xs: "flex", sm: "none" },
                  justifyContent: "flex-end",
                }}
              >
                {isAirDrop ? (
                  <Badge variant="dot" color="primary">
                    <CustomImage
                      src={PhoneMenuIcon}
                      onClick={() => {
                        setPhoneMenuShow(!phoneMenuShow);
                        console.log("PhoneMenushow", phoneMenuShow);
                      }}
                    ></CustomImage>
                  </Badge>
                ) : (
                  <CustomImage
                    src={PhoneMenuIcon}
                    onClick={() => {
                      setPhoneMenuShow(!phoneMenuShow);
                      console.log("PhoneMenushow", phoneMenuShow);
                    }}
                  ></CustomImage>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      ) : null}

      {phoneMenuShow == true ? (
        // <Drawer open={phoneMenuShow} onClose={toggleDrawer(false)}>
        <div className="fixed top-0 h-full w-full">
          <div className="fixed bg-blackmenu w-full">
            <div className="flex justify-end pr-4 py-3">
              <CustomImage
                src={CloseIcon}
                className="h-8"
                // onClick={() => {
                //   setPhoneMenuShow(!phoneMenuShow);
                // }}
                onClick={toggleDrawer(false)}
              ></CustomImage>
            </div>
            {navs.map((item, itemIndex) =>
              item.badge ? (
                <div
                  className="mx-4 py-4 border-b border-blue_gray border-opacity-10"
                  key={itemIndex}
                >
                  <Badge variant="dot" color="primary">
                    <Link
                      to={item?.to ?? "#"}
                      onClick={() => {
                        handleActive(item);
                        setPhoneMenuShow(!phoneMenuShow);
                      }}
                    >
                      <CustomText
                        align="left"
                        transparent={true}
                        bold={active?.to === item?.to && !!item?.to}
                        size="lg"
                      >
                        {item?.label ?? ""}
                      </CustomText>
                    </Link>
                  </Badge>
                  {/* <CustomImage src={border} className="w-full px-1 py-1"></CustomImage> */}
                </div>
              ) : (
                <div
                  className="mx-4 py-4 border-b border-blue_gray border-opacity-10"
                  key={itemIndex}
                >
                  <Link
                    to={item?.to ?? "#"}
                    onClick={() => {
                      handleActive(item);
                      setPhoneMenuShow(!phoneMenuShow);
                    }}
                  >
                    <CustomText
                      align="left"
                      transparent={true}
                      bold={active?.to === item?.to && !!item?.to}
                      size="lg"
                    >
                      {item?.label ?? ""}
                    </CustomText>
                  </Link>
                  {/* <CustomImage src={border} className="w-full px-1 py-1"></CustomImage> */}
                </div>
              )
            )}
          </div>
        </div>
        // </Drawer>
      ) : null}
    </div>
  );
}
