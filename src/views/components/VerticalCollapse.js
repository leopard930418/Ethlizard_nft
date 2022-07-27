import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import * as React from "react";

export default function VerticalCollapse({
  children = null,
  position = "right",
  isOpen = false,
}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [position]: open });
  };

  React.useEffect(() => {
    setState((s = {}) => ({ ...(s ?? {}), [position]: isOpen }));
  }, [position, isOpen]);

  return (
    <div>
      <Drawer
        anchor={position}
        open={Boolean(state[position])}
        onClose={toggleDrawer(false)}
      >
        <div>{children}</div>
      </Drawer>
    </div>
  );
}
